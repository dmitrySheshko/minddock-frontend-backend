import 'server-only';

import {cosineDistance, desc, eq, sql,} from 'drizzle-orm';

import { db } from '@/db/client';
import {documentChunks, documents} from '@/db/schema';
import {CreateChunk} from "@/db/db.types";

export const documentChunkRepository = {
    async createMany(chunks: CreateChunk[]) {
        if (chunks.length === 0) {
            return [];
        }
        return db
            .insert(documentChunks)
            .values(chunks)
            .returning();
    },

    async findSimilar(userId: string, embedding: number[], limit = 5) {
        const similarity = sql<number>`1 - (${cosineDistance(documentChunks.embedding, embedding)})`;

        return db
            .select({
                id: documentChunks.id,
                documentId: documentChunks.documentId,
                documentName: documents.name,
                chunkIndex: documentChunks.chunkIndex,
                pageNumber: documentChunks.pageNumber,
                content: documentChunks.content,
                similarity,
            })
            .from(documentChunks)
            .innerJoin(
                documents,
                eq(
                    documentChunks.documentId,
                    documents.id,
                )
            )
            .where(eq(documentChunks.userId, userId))
            .orderBy(desc(similarity))
            .limit(limit);
    }
};