import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    vi,
} from 'vitest';

import {AI_MESSAGE_ROLE} from '@/modules/ai/ai.constants';
import {OllamaProvider} from './ollama.provider';

describe('OllamaProvider', () => {
    const fetchMock = vi.fn();

    beforeEach(() => {
        vi.stubGlobal('fetch', fetchMock);

        vi.stubEnv(
            'OLLAMA_BASE_URL',
            'http://localhost:11434',
        );

        vi.stubEnv(
            'OLLAMA_CHAT_MODEL',
            'test-chat-model',
        );

        vi.stubEnv(
            'OLLAMA_UTILITY_MODEL',
            'test-utility-model',
        );
    });

    afterEach(() => {
        vi.clearAllMocks();
        vi.unstubAllEnvs();
        vi.unstubAllGlobals();
    });

    it('sends correct request when streaming chat', async () => {
        const stream = createOllamaStream([
            {
                message: {
                    content: 'Hello',
                },
            },
        ]);

        fetchMock.mockResolvedValue({
            ok: true,
            body: stream,
        });

        const provider = new OllamaProvider();

        const messages = [
            {
                role: AI_MESSAGE_ROLE.USER,
                content: 'Hi',
            },
        ];

        const result = await provider.streamText({
            messages,
            stream: true,
            options: {
                numPredict: 100,
            },
        });

        await collectStream(result);

        expect(fetchMock).toHaveBeenCalledOnce();

        expect(
            fetchMock,
        ).toHaveBeenCalledWith(
            'http://localhost:11434/api/chat',
            expect.objectContaining({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        );

        const requestOptions = fetchMock.mock.calls[0][1];

        expect(
            JSON.parse(
                requestOptions.body,
            ),
        ).toEqual({
            model: 'test-chat-model',
            messages,
            stream: true,
            options: {
                num_predict: 100,
            },
        });
    });

    it('parses streamed Ollama response', async () => {
        const stream = createOllamaStream([
            {
                message: {
                    content: 'MindDock ',
                },
            },
            {
                message: {
                    content: 'Premium costs ',
                },
            },
            {
                message: {
                    content: '29 euros.',
                },
            },
        ]);

        fetchMock.mockResolvedValue({
            ok: true,
            body: stream,
        });

        const provider = new OllamaProvider();

        const result = await provider.streamText({
            messages: [
                {
                    role: AI_MESSAGE_ROLE.USER,
                    content: 'How much does Premium cost?',
                },
            ],
        });

        const text = await collectStream(result);
        expect(text).toBe('MindDock Premium costs 29 euros.');
    });

    it('ignores chunks without message content', async () => {
        const stream = createOllamaStream([
            {
                message: {
                    content: '',
                    thinking: 'internal reasoning',
                },
            },
            {
                message: {
                    content: 'Final answer',
                },
            },
        ]);

        fetchMock.mockResolvedValue({
            ok: true,
            body: stream,
        });

        const provider = new OllamaProvider();

        const result = await provider.streamText({
            messages: [
                {
                    role: AI_MESSAGE_ROLE.USER,
                    content: 'Question',
                },
            ],
        });

        const text = await collectStream(result);

        expect(text).toBe('Final answer');
    });

    it('throws when Ollama returns an error', async () => {
        fetchMock.mockResolvedValue({
            ok: false,
            status: 500,
        });

        const provider = new OllamaProvider();
        await expect(
            provider.streamText({
                messages: [
                    {
                        role: AI_MESSAGE_ROLE.USER,
                        content: 'Hello',
                    },
                ],
            }),
        ).rejects.toThrow(
            'Ollama request failed: 500',
        );
    });

    it('throws when streaming response body is empty', async () => {
        fetchMock.mockResolvedValue({
            ok: true,
            body: null,
        });

        const provider = new OllamaProvider();

        await expect(provider.streamText({
            messages: [
                {
                    role: AI_MESSAGE_ROLE.USER,
                    content: 'Hello',
                },
            ],
        }),
        ).rejects.toThrow(
            'Ollama response body is empty',
        );
    });

    it('generates text using utility model and trims response', async () => {
        fetchMock.mockResolvedValue({
            ok: true,
            json: vi.fn()
                .mockResolvedValue({
                    message: {
                        content: '  Premium Pricing  ',
                    },
                }),
        });

        const provider = new OllamaProvider();

        const result = await provider.generateText('Generate a title');

        expect(result).toBe('Premium Pricing',);

        expect(
            fetchMock,
        ).toHaveBeenCalledWith(
            'http://localhost:11434/api/chat',
            expect.objectContaining({
                method: 'POST',
            }),
        );

        const requestOptions = fetchMock.mock.calls[0][1];

        expect(
            JSON.parse(requestOptions.body),
        ).toEqual({
            model: 'test-utility-model',
            messages: [
                {
                    role: AI_MESSAGE_ROLE.USER,
                    content: 'Generate a title',
                },
            ],
            stream: false,
            options: {
                num_predict: 20,
                temperature: 0.2,
            },
        });
    });

    it('throws when utility model request fails', async () => {
        fetchMock.mockResolvedValue({
            ok: false,
            status: 503,
        });

        const provider = new OllamaProvider();

        await expect(provider.generateText('Generate a title')).rejects.toThrow(
            'Ollama request failed: 503',
        );
    });
});

function createOllamaStream(chunks: unknown[]): ReadableStream<Uint8Array> {
    const encoder = new TextEncoder();
    return new ReadableStream({
        start(controller) {
            for (const chunk of chunks) {
                controller.enqueue(
                    encoder.encode(
                        `${JSON.stringify(chunk)}\n`,
                    ),
                );
            }
            controller.close();
        },
    });
}

async function collectStream(stream: AsyncIterable<string>): Promise<string> {
    let result = '';
    for await (const chunk of stream) {
        result += chunk;
    }
    return result;
}