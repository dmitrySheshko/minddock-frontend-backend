import 'server-only';

import { documentChunkRepository } from '@/db/repositories/document-chunk.repository';
import { embeddingService } from '@/modules/embeddings/embedding.service';

const RAG_TOP_K = 5;

export const ragService = {
    async retrieve(userId: string, query: string) {
        const embedding = await embeddingService.embedQuery(query);
        return documentChunkRepository.findSimilar(
            userId,
            embedding,
            RAG_TOP_K,
        );
    },
};