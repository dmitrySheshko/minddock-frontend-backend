import { chatRepository } from '@/db/repositories/chat.repository';
import { messageRepository } from '@/db/repositories/message.repository';
import { authServerService } from '@/features/auth/services/auth.server.service';
import { chatRequestSchema } from '@/features/chat/schemas/chat.schema';
import { aiService } from '@/modules/ai/ai.service';
import {ragService} from "@/modules/rag/rag.service";
import {buildRagContext} from "@/modules/rag/rag-context";
import {createChatSystemPrompt} from "@/modules/ai/prompts/chat.prompt";
import {AI_MESSAGE_ROLE} from "@/modules/ai/ai.constants";
import {messageSourceRepository} from "@/db/repositories/message-source.repository";
import {RagCitationFilter} from "@/modules/rag/rag-citation-filter";
import {encodeEvent} from "@/features/chat/helpers/chat-stream-helpers";

export async function POST(request: Request) {
    const session = await authServerService.getSession();

    if (!session) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const result = chatRequestSchema.safeParse(body);

    if (!result.success) {
        return Response.json({ error: 'Invalid request' }, { status: 400 });
    }

    const {chatId, message} = result.data;
    const chat = await chatRepository.findById(chatId, session.user.id);

    if (!chat) {
        return Response.json({ error: 'Chat not found' }, { status: 404 });
    }

    await messageRepository.create({chatId, role: AI_MESSAGE_ROLE.USER, content: message});
    await chatRepository.touch(chatId);

    const history = await messageRepository.findByChat(chatId);
    const relevantChunks = await ragService.retrieve(session.user.id, message);
    const context = buildRagContext(relevantChunks);
    const systemPrompt = createChatSystemPrompt(context);
    const aiStream = await aiService.stream(
        [
            {
                role: AI_MESSAGE_ROLE.SYSTEM,
                content: systemPrompt,
            },
            ...history.map(({ role, content }) => ({
                role,
                content,
            })),
        ],
        request.signal,
    );

    const stream = new ReadableStream({
        async start(controller) {
            try {
                const citationFilter = new RagCitationFilter();
                let assistantContent = '';
                for await (const chunk of aiStream) {
                    const visibleChunk = citationFilter.push(chunk);
                    if (!visibleChunk) {
                        continue;
                    }
                    assistantContent += visibleChunk;
                    controller.enqueue(
                        encodeEvent({
                            type: 'content',
                            content:
                            visibleChunk,
                        }),
                    );
                }

                const remaining = citationFilter.flush();

                if (remaining) {
                    assistantContent += remaining;
                    controller.enqueue(
                        encodeEvent({
                            type: 'content',
                            content:
                            remaining,
                        }),
                    );
                }

                const sourceNumbers = citationFilter.getSourceNumbers();
                const citedChunks = sourceNumbers
                    .map((sourceNumber) => relevantChunks[sourceNumber - 1])
                    .filter((chunk): chunk is NonNullable<typeof chunk> => Boolean(chunk));

                const assistantMessage = await messageRepository.create({
                    chatId,
                    role: AI_MESSAGE_ROLE.ASSISTANT,
                    content: assistantContent,
                });


                if (citedChunks.length) {
                    await messageSourceRepository.createMany(
                        citedChunks.map(
                            (chunk) => ({
                                messageId: assistantMessage.id,
                                documentId: chunk.documentId,
                                chunkId: chunk.id,
                                documentName: chunk.documentName,
                                chunkIndex: chunk.chunkIndex,
                                pageNumber: chunk.pageNumber,
                                content: chunk.content,
                                similarity: chunk.similarity,
                            }),
                        ),
                    );
                }

                const sources = citedChunks.map(
                    (chunk) => ({
                        documentId: chunk.documentId,
                        documentName: chunk.documentName,
                        chunkIndex: chunk.chunkIndex,
                        pageNumber: chunk.pageNumber ?? null,
                        similarity: chunk.similarity,
                    }),
                );
                controller.enqueue(
                    encodeEvent({type: 'sources', sources}),
                );
                controller.enqueue(
                    encodeEvent({type: 'sources', sources}),
                );

                await chatRepository.touch(chatId);

                controller.close();
            } catch {
                controller.enqueue(
                    encodeEvent({
                        type: 'error',
                        message: 'Unable to generate response.',
                    }),
                );
            } finally {
                controller.close();
            }
        },
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-cache',
        },
    });
}