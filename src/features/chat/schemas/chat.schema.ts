import { z } from 'zod';

export const chatRequestSchema = z.object({
    chatId: z.uuid(),
    message: z
        .string()
        .trim()
        .min(1)
        .max(10_000),
});