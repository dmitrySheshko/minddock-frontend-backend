import type {
    AIProvider, OllamaChatChunk,
    StreamTextParams,
} from '../ai.types';
import {
    AI_MESSAGE_ROLE,
    DEFAULT_OLLAMA_BASE_URL,
    DEFAULT_OLLAMA_CHAT_MODEL,
    DEFAULT_OLLAMA_UTILITY_MODEL
} from "@/modules/ai/ai.constants";

export class OllamaProvider implements AIProvider {
    private readonly baseUrl = process.env.OLLAMA_BASE_URL ?? DEFAULT_OLLAMA_BASE_URL;
    private readonly model = process.env.OLLAMA_CHAT_MODEL ?? DEFAULT_OLLAMA_CHAT_MODEL;
    private readonly utilityModel = process.env.OLLAMA_UTILITY_MODEL ?? DEFAULT_OLLAMA_UTILITY_MODEL;

    async streamText({messages, signal, options, stream}: StreamTextParams): Promise<AsyncIterable<string>> {
        const response = await fetch(
            `${this.baseUrl}/api/chat`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: this.model,
                    messages,
                    stream: stream ?? true,
                    options: {
                        num_predict: options?.numPredict,
                    },
                }),
                signal,
            },
        );

        if (!response.ok) {
            throw new Error(`Ollama request failed: ${response.status}`);
        }
        if (!response.body) {
            throw new Error('Ollama response body is empty');
        }
        return this.parseStream(response.body);
    }

    private async *parseStream(stream: ReadableStream<Uint8Array>): AsyncIterable<string> {
        const reader = stream.getReader();
        const decoder = new TextDecoder();

        let buffer = '';
        try {
            while (true) {
                const { done, value } = await reader.read();

                if (done) {
                    break;
                }

                buffer += decoder.decode(value, {stream: true});

                const lines = buffer.split('\n');
                buffer = lines.pop() ?? '';

                for (const line of lines) {
                    if (!line.trim()) {
                        continue;
                    }
                    const chunk = JSON.parse(line) as OllamaChatChunk;
                    if (chunk.message?.content) {
                        yield chunk.message.content;
                    }
                }
            }
        } finally {
            reader.releaseLock();
        }
    }

    async generateText(prompt: string, signal?: AbortSignal): Promise<string> {
        const response = await fetch(
            `${this.baseUrl}/api/chat`,
            {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    model: this.utilityModel,

                    messages: [
                        {
                            role: AI_MESSAGE_ROLE.USER,
                            content: prompt,
                        },
                    ],

                    stream: false,

                    options: {
                        num_predict: 20,
                        temperature: 0.2,
                    },
                }),

                signal,
            },
        );

        if (!response.ok) {
            throw new Error(
                `Ollama request failed: ${response.status}`,
            );
        }

        const data = await response.json() as {
            message: {
                content: string;
            };
        };

        return data.message.content.trim();
    }
}