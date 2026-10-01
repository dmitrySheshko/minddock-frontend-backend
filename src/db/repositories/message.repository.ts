import 'server-only';
import {asc, eq} from 'drizzle-orm';

import { db } from '@/db/client';
import { messages } from '@/db/schema';
import {CreateMessageParams} from "@/db/db.types";

export const messageRepository = {
    async create(params: CreateMessageParams) {
        const [message] = await db
            .insert(messages)
            .values(params)
            .returning();
        return message;
    },

    async findByChat(chatId: string) {
        return db
            .select()
            .from(messages)
            .where(eq(messages.chatId, chatId))
            .orderBy(asc(messages.createdAt));
    },
};