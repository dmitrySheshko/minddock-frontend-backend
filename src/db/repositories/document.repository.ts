import 'server-only';

import {and, desc, eq} from 'drizzle-orm';

import { db } from '@/db/client';
import { documents } from '@/db/schema';
import {CreateDocumentParams} from "@/db/db.types";

export const documentRepository = {
    async create(params: CreateDocumentParams) {
        const [document] = await db
            .insert(documents)
            .values(params)
            .returning();
        return document;
    },

    async findByUser(userId: string) {
        return db
            .select()
            .from(documents)
            .where(eq(documents.userId, userId))
            .orderBy(desc(documents.createdAt));
    },

    async findById(documentId: string, userId: string) {
        const [document] = await db
            .select()
            .from(documents)
            .where(
                and(
                    eq(documents.id, documentId),
                    eq(documents.userId, userId),
                ),
            )
            .limit(1);
        return document ?? null;
    },

    async setReady(documentId: string, content: string) {
        const [document] = await db
            .update(documents)
            .set({
                content,
                status: 'ready',
                updatedAt: new Date(),
            })
            .where(eq(documents.id, documentId))
            .returning();
        return document;
    },

    async setFailed(documentId: string) {
        await db
            .update(documents)
            .set({
                status: 'failed',
                updatedAt: new Date(),
            })
            .where(eq(documents.id, documentId));
    },

    async delete(documentId: string, userId: string) {
        const [document] = await db
            .delete(documents)
            .where(
                and(
                    eq(documents.id, documentId),
                    eq(documents.userId, userId)
                ),
            )
            .returning();

        return document ?? null;
    },
};