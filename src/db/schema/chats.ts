import {
    index,
    pgTable,
    text,
    timestamp,
    uuid,
} from 'drizzle-orm/pg-core';

import { users } from './auth';

export const chats = pgTable(
    'chats',
    {
        id: uuid('id')
            .defaultRandom()
            .primaryKey(),
        userId: text('user_id')
            .notNull()
            .references(() => users.id, {
                onDelete: 'cascade',
            }),
        title: text('title')
            .notNull()
            .default('New chat'),
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
        index('chats_user_id_idx').on(
            table.userId,
        ),
    ],
);