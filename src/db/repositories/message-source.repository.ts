import 'server-only';

import { inArray } from 'drizzle-orm';

import { db } from '@/db/client';
import { messageSources } from '@/db/schema';
import {CreateMessageSource} from "@/db/db.types";

export const messageSourceRepository = {
    async createMany(sources: CreateMessageSource[]) {
        if (sources.length === 0) {
            return [];
        }

        return db
            .insert(messageSources)
            .values(sources)
            .returning();
    },

    async findByMessageIds(messageIds: string[]) {
        if (messageIds.length === 0) {
            return [];
        }

        return db
            .select()
            .from(messageSources)
            .where(inArray(messageSources.messageId, messageIds));
    },
};