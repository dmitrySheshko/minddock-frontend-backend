import {
    index,
    integer,
    pgTable,
    text,
    uniqueIndex,
    uuid,
    vector,
} from 'drizzle-orm/pg-core';

import { users } from './auth';
import { documents } from './documents';

export const documentChunks = pgTable(
    'document_chunks',
    {
        id: uuid('id')
            .defaultRandom()
            .primaryKey(),
        documentId: uuid('document_id')
            .notNull()
            .references(() => documents.id, {
                onDelete: 'cascade',
            }),
        userId: text('user_id')
            .notNull()
            .references(() => users.id, {
                onDelete: 'cascade',
            }),
        chunkIndex: integer('chunk_index')
            .notNull(),
        pageNumber: integer('page_number'),
        content: text('content')
            .notNull(),
        embedding: vector('embedding', {
            dimensions: 768,
        }).notNull(),
    },
    (table) => [
        index('document_chunks_document_id_idx')
            .on(table.documentId),
        index('document_chunks_user_id_idx')
            .on(table.userId),
        uniqueIndex('document_chunks_document_chunk_idx')
            .on(table.documentId, table.chunkIndex),
        index('document_chunks_embedding_hnsw_idx')
            .using(
            'hnsw',
            table.embedding.op('vector_cosine_ops'),
        ),
    ],
);