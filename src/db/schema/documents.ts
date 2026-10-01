import {
    index,
    integer,
    pgEnum,
    pgTable,
    text,
    timestamp,
    uuid,
} from 'drizzle-orm/pg-core';

import { users } from './auth';

export const documentStatus = pgEnum(
    'document_status',
    [
        'processing',
        'ready',
        'failed',
    ],
);

export const documents = pgTable(
    'documents',
    {
        id: uuid('id')
            .defaultRandom()
            .primaryKey(),

        userId: text('user_id')
            .notNull()
            .references(() => users.id, {
                onDelete: 'cascade',
            }),

        name: text('name').notNull(),

        mimeType: text('mime_type').notNull(),

        size: integer('size').notNull(),

        content: text('content'),

        status: documentStatus('status')
            .notNull()
            .default('processing'),

        createdAt: timestamp('created_at', {
            withTimezone: true,
        })
            .defaultNow()
            .notNull(),

        updatedAt: timestamp('updated_at', {
            withTimezone: true,
        })
            .defaultNow()
            .notNull(),
    },
    (table) => [
        index('documents_user_id_idx').on(
            table.userId,
        ),
    ],
);