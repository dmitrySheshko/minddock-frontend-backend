import type {EmbeddingProvider, OllamaEmbeddingResponse} from '../embedding.types';
import {
    DEFAULT_OLLAMA_EMBEDDING_MODEL,
    EMBEDDING_DIMENSIONS
} from "@/modules/embeddings/embedding.constants";
import {DEFAULT_OLLAMA_BASE_URL} from "@/modules/ai/ai.constants";

export class OllamaEmbeddingProvider implements EmbeddingProvider {
    private readonly baseUrl = process.env.OLLAMA_BASE_URL ?? DEFAULT_OLLAMA_BASE_URL;
    private readonly model = process.env.OLLAMA_EMBEDDING_MODEL ?? DEFAULT_OLLAMA_EMBEDDING_MODEL;

    async embed(input: string[]): Promise<number[][]> {
        const response = await fetch(
            `${this.baseUrl}/api/embed`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: this.model,
                    input,
                    truncate: false,
                }),
            },
        );

        if (!response.ok) {
            throw new Error(`Embedding request failed: ${response.status}`);
        }

        const data = await response.json() as OllamaEmbeddingResponse;

        if (data.embeddings.length !== input.length) {
            throw new Error('Unexpected embedding count');
        }

        for (const embedding of data.embeddings) {
            if (embedding.length !== EMBEDDING_DIMENSIONS) {
                throw new Error(`Unexpected embedding dimensions: ${embedding.length}`);
            }
        }

        return data.embeddings;
    }
}