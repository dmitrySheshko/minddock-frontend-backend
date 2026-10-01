import 'server-only';

import type { EmbeddingProvider } from './embedding.types';
import { OllamaEmbeddingProvider } from './providers/ollama-embedding.provider';
import {BATCH_SIZE} from "@/shared/constants/app";

export class EmbeddingService {
    constructor(private readonly provider: EmbeddingProvider) {}

    async embedQuery(query: string): Promise<number[]> {
        const [embedding] = await this.provider.embed([`task: search result | query: ${query}`]);
        return embedding;
    }

    async embedDocuments(documents: { title: string; content: string; }[]): Promise<number[][]> {
        const inputs = documents.map(
            ({ title, content }) => `title: ${title || 'none'} | text: ${content}`
        );

        return this.embedBatches(inputs);
    }

    private async embedBatches(inputs: string[]): Promise<number[][]> {
        const embeddings: number[][] = [];

        for (let i = 0; i < inputs.length; i += BATCH_SIZE) {
            const batch = inputs.slice(i, i + BATCH_SIZE);

            const result = await this.provider.embed(batch);

            embeddings.push(...result);
        }
        return embeddings;
    }
}

export const embeddingService = new EmbeddingService(new OllamaEmbeddingProvider());