import {
    index,
    integer,
    pgTable,
    real,
    text,
    uuid,
} from 'drizzle-orm/pg-core';

import { documentChunks } from './document-chunks';
import { documents } from './documents';
import { messages } from './messages';

export const messageSources = pgTable(
    'message_sources',
    {
        id: uuid('id')
            .defaultRandom()
            .primaryKey(),

        messageId: uuid('message_id')
            .notNull()
            .references(() => messages.id, {
                onDelete: 'cascade',
            }),

        documentId: uuid('document_id')
            .references(() => documents.id, {
                onDelete: 'set null',
            }),

        chunkId: uuid('chunk_id')
            .references(() => documentChunks.id, {
                onDelete: 'set null',
            }),

        documentName: text('document_name')
            .notNull(),

        chunkIndex: integer('chunk_index')
            .notNull(),

        pageNumber: integer('page_number'),

        content: text('content')
            .notNull(),

        similarity: real('similarity')
            .notNull(),
    },
    (table) => [
        index(
            'message_sources_message_id_idx',
        ).on(table.messageId),
    ],
);