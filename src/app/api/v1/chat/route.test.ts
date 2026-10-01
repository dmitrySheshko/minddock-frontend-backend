import {
    beforeEach,
    describe,
    expect,
    it,
    vi,
} from 'vitest';

import { POST } from './route';

import { chatRepository } from '@/db/repositories/chat.repository';
import { messageRepository } from '@/db/repositories/message.repository';
import { authServerService } from '@/features/auth/services/auth.server.service';
import { aiService } from '@/modules/ai/ai.service';
import { AI_MESSAGE_ROLE } from '@/modules/ai/ai.constants';
import { buildRagContext } from '@/modules/rag/rag-context';
import { ragService } from '@/modules/rag/rag.service';
import { createChatSystemPrompt } from '@/modules/ai/prompts/chat.prompt';

vi.mock(
    '@/features/auth/services/auth.server.service',
    () => ({
        authServerService: {
            getSession: vi.fn(),
        },
    }),
);

vi.mock(
    '@/db/repositories/chat.repository',
    () => ({
        chatRepository: {
            findById: vi.fn(),
            touch: vi.fn(),
        },
    }),
);

vi.mock(
    '@/db/repositories/message.repository',
    () => ({
        messageRepository: {
            create: vi.fn(),
            findByChat: vi.fn(),
        },
    }),
);

vi.mock(
    '@/db/repositories/message-source.repository',
    () => ({
        messageSourceRepository: {
            createMany: vi.fn(),
        },
    }),
);

vi.mock(
    '@/modules/rag/rag.service',
    () => ({
        ragService: {
            retrieve: vi.fn(),
        },
    }),
);

vi.mock(
    '@/modules/rag/rag-context',
    () => ({
        buildRagContext: vi.fn(),
    }),
);

vi.mock(
    '@/modules/ai/prompts/chat.prompt',
    () => ({
        createChatSystemPrompt: vi.fn(),
    }),
);

vi.mock(
    '@/modules/ai/ai.service',
    () => ({
        aiService: {
            stream: vi.fn(),
        },
    }),
);
//helpers
function createRequest(body: unknown) {
    return new Request(
        'http://localhost/api/v1/chat',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        },
    );
}

async function* createAIStream(chunks: string[]) {
    for (const chunk of chunks) {
        yield chunk;
    }
}
//tests
describe('POST /api/v1/chat', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    //Unauthorized → 401
    it('returns 401 when user is not authenticated', async () => {
        vi.mocked(authServerService.getSession).mockResolvedValue(null);

        const request = createRequest({
            chatId: '550e8400-e29b-41d4-a716-446655440000',
            message: 'Hello',
        });

        const response = await POST(request);
        expect(response.status).toBe(401);

        await expect(response.json()).resolves.toEqual({error: 'Unauthorized'});
        expect(chatRepository.findById).not.toHaveBeenCalled();
        expect(aiService.stream).not.toHaveBeenCalled();
    });
    //Invalid request → 400
    it('returns 400 when request body is invalid', async () => {
        vi.mocked(authServerService.getSession).mockResolvedValue({
            user: {
                id: 'user-1',
            },
        } as never);

        const request = createRequest({message: ''});
        const response = await POST(request);
        expect(response.status).toBe(400);

        await expect(response.json()).resolves.toEqual({error: 'Invalid request'});

        expect(chatRepository.findById).not.toHaveBeenCalled();
        expect(messageRepository.create).not.toHaveBeenCalled();
    });
    //404
    it('returns 404 when chat does not exist for the current user', async () => {
        vi.mocked(authServerService.getSession).mockResolvedValue({
            user: {
                id: 'user-1',
            },
        } as never);

        const chatId = '550e8400-e29b-41d4-a716-446655440000';
        const request = createRequest({chatId, message: 'Hello'});
        const response = await POST(request);

        expect(response.status).toBe(404);
        expect(chatRepository.findById).toHaveBeenCalledWith(chatId, 'user-1');

        await expect(response.json()).resolves.toEqual({error: 'Chat not found'});

        expect(messageRepository.create).not.toHaveBeenCalled();
        expect(aiService.stream).not.toHaveBeenCalled();
    });
    it('streams AI response and persists assistant message with sources', async () => {
        const chatId = '550e8400-e29b-41d4-a716-446655440000';
        const userId = 'user-1';
        const userMessage = 'How much does Premium cost?';

        vi.mocked(authServerService.getSession).mockResolvedValue({
            user: {
                id: userId,
            },
        } as never);

        vi.mocked(chatRepository.findById).mockResolvedValue({
            id: chatId,
            userId,
            title: 'New chat',
        } as never);

        vi.mocked(messageRepository.create)
            .mockResolvedValueOnce({
                id: 'user-message-1',
            } as never)
            .mockResolvedValueOnce({
                id: 'assistant-message-1',
            } as never);

        const history = [
            {
                role: AI_MESSAGE_ROLE.USER,
                content: userMessage,
            },
        ];

        vi.mocked(messageRepository.findByChat).mockResolvedValue(history as never);

        const relevantChunks = [
            {
                id: 'chunk-1',
                documentId: 'document-1',
                documentName: 'company.txt',
                chunkIndex: 0,
                pageNumber: null,
                content: 'MindDock Premium costs 29 euros per month.',
                similarity: 0.91,
            },
        ];

        vi.mocked(ragService.retrieve).mockResolvedValue(relevantChunks as never);
        vi.mocked(buildRagContext).mockReturnValue('RAG CONTEXT');
        vi.mocked(createChatSystemPrompt).mockReturnValue('SYSTEM PROMPT');

        vi.mocked(aiService.stream).mockResolvedValue(
            createAIStream([
                'MindDock Premium ',
                'costs 29 euros ',
                'per month.',
            ]) as never,
        );

        const request = createRequest({
            chatId,
            message: userMessage,
        });
        const response = await POST(request);

        expect(response.status).toBe(200);

        const responseText = await response.text();

        const events = responseText
            .trim()
            .split('\n')
            .map((line) => JSON.parse(line));

        const content = events
            .filter((event) => event.type === 'content')
            .map((event) => event.content)
            .join('');

        expect(content).toBe(
            'MindDock Premium costs 29 euros per month.',
        );

        expect(chatRepository.findById).toHaveBeenCalledWith(chatId, userId);

        expect(messageRepository.create).toHaveBeenNthCalledWith(
            1,
            {
                chatId,
                role: AI_MESSAGE_ROLE.USER,
                content: userMessage,
            },
        );

        expect(chatRepository.touch).toHaveBeenCalledWith(chatId);
        expect(messageRepository.findByChat).toHaveBeenCalledWith(chatId);
        expect(ragService.retrieve).toHaveBeenCalledWith(userId, userMessage);

        expect(buildRagContext).toHaveBeenCalledWith(relevantChunks);

        expect(createChatSystemPrompt).toHaveBeenCalledWith('RAG CONTEXT');

        expect(aiService.stream).toHaveBeenCalledWith(
            [
                {
                    role: AI_MESSAGE_ROLE.SYSTEM,
                    content: 'SYSTEM PROMPT',
                },
                {
                    role: AI_MESSAGE_ROLE.USER,
                    content: userMessage,
                },
            ],
            request.signal,
        );

        expect(messageRepository.create).toHaveBeenNthCalledWith(
            2,
            {
                chatId,
                role: AI_MESSAGE_ROLE.ASSISTANT,
                content: 'MindDock Premium costs 29 euros per month.',
            },
        );
        expect(chatRepository.touch).toHaveBeenCalledTimes(2);
    });
});