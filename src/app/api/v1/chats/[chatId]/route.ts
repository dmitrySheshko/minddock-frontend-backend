import { chatRepository } from '@/db/repositories/chat.repository';
import { authServerService } from '@/features/auth/services/auth.server.service';
import { renameChatSchema } from '@/features/chat/schemas/chat-management.schema';
import {NextResponse} from "next/server";
import {messageRepository} from "@/db/repositories/message.repository";
import {messageSourceRepository} from "@/db/repositories/message-source.repository";

type RouteProps = { params: Promise<{ chatId: string; }>};
type RouteContext = { params: Promise<{ chatId: string; }>; };

export async function GET(_request: Request, { params }: RouteContext) {
    const session = await authServerService.getSession();

    if (!session) {
        return NextResponse.json(
            {
                error: 'Unauthorized',
            },
            {
                status: 401,
            },
        );
    }

    const { chatId } = await params;

    const chat = await chatRepository.findById(
        chatId,
        session.user.id,
    );

    if (!chat) {
        return NextResponse.json(
            {
                error: 'Chat not found',
            },
            {
                status: 404,
            },
        );
    }

    const messages = await messageRepository.findByChat(chatId);
    const messageIds = messages.map((message) => message.id);
    const messageSources = await messageSourceRepository.findByMessageIds(messageIds);

    const sourcesByMessage = new Map<string, typeof messageSources>();

    for (const source of messageSources) {
        const existing = sourcesByMessage.get(source.messageId) ?? [];
        existing.push(source);
        sourcesByMessage.set(source.messageId, existing);
    }

    return NextResponse.json({
        chat,
        messages: messages.map(
            (message) => ({
                ...message,
                sources: sourcesByMessage.get(message.id) ?? [],
            }),
        ),
    });
}

export async function PATCH(request: Request, { params }: RouteProps) {
    const session = await authServerService.getSession();

    if (!session) {
        return Response.json(
            { error: 'Unauthorized' },
            { status: 401 },
        );
    }

    const { chatId } = await params;
    const body = await request.json();
    const result = renameChatSchema.safeParse(body);

    if (!result.success) {
        return Response.json({error: result.error.issues[0]?.message ?? 'Invalid title'}, {status: 400});
    }

    const chat = await chatRepository.updateTitle(chatId, session.user.id, result.data.title);

    if (!chat) {
        return Response.json({error: 'Chat not found'}, {status: 404});
    }

    return Response.json(chat);
}

export async function DELETE(_request: Request, { params }: RouteProps) {
    const session = await authServerService.getSession();

    if (!session) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { chatId } = await params;

    const chat = await chatRepository.delete(chatId, session.user.id);

    if (!chat) {
        return Response.json({error: 'Chat not found'}, {status: 404});
    }

    return new Response(null, {status: 204});
}