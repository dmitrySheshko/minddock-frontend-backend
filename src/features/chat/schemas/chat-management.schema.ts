import { z } from 'zod';
import {CHAT_TITLE_MAX_LENGTH} from "@/shared/constants/app";

export const renameChatSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, 'Title is required')
        .max(CHAT_TITLE_MAX_LENGTH, 'Title is too long'),
});