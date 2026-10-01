import 'server-only';

import {and, desc, eq} from 'drizzle-orm';

import { db } from '@/db/client';
import { chats } from '@/db/schema';

export const chatRepository = {
    async create(userId: string, title: string) {
        const [chat] = await db
            .insert(chats)
            .values({userId, title})
            .returning();

        return chat;
    },

    async findByUser(userId: string) {
        return db
            .select()
            .from(chats)
            .where(eq(chats.userId, userId))
            .orderBy(desc(chats.updatedAt));
    },

    async findById(chatId: string, userId: string) {
        const [chat] = await db
            .select()
            .from(chats)
            .where(
                and(
                    eq(chats.id, chatId),
                    eq(chats.userId, userId),
                ),
            )
            .limit(1);

        return chat ?? null;
    },

    async updateTitle(chatId: string, userId: string, title: string) {
        const [chat] = await db
            .update(chats)
            .set({
                title,
                updatedAt: new Date(),
            })
            .where(
                and(
                    eq(chats.id, chatId),
                    eq(chats.userId, userId),
                ),
            )
            .returning();

        return chat ?? null;
    },

    async delete(chatId: string, userId: string) {
        const [chat] = await db
            .delete(chats)
            .where(
                and(
                    eq(chats.id, chatId),
                    eq(chats.userId, userId),
                ),
            )
            .returning();

        return chat ?? null;
    },

    async touch(chatId: string) {
        await db
            .update(chats)
            .set({updatedAt: new Date()})
            .where(eq(chats.id, chatId));
    },
};