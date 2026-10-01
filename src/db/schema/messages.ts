import {
    index,
    pgEnum,
    pgTable,
    text,
    timestamp,
    uuid,
} from 'drizzle-orm/pg-core';

import { chats } from './chats';

export const messageRole = pgEnum(
    'message_role',
    ['user', 'assistant'],
);

export const messages = pgTable(
    'messages',
    {
        id: uuid('id')
            .defaultRandom()
            .primaryKey(),

        chatId: uuid('chat_id')
            .notNull()
            .references(() => chats.id, {
                onDelete: 'cascade',
            }),

        role: messageRole('role')
            .notNull(),

        content: text('content')
            .notNull(),

        createdAt: timestamp('created_at', {
            withTimezone: true,
        })
            .defaultNow()
            .notNull(),
    },
    (table) => [
        index('messages_chat_id_idx').on(
            table.chatId,
        ),
    ],
);