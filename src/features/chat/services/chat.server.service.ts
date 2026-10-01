import 'server-only';

import { chatRepository } from '@/db/repositories/chat.repository';
import { messageRepository } from '@/db/repositories/message.repository';
import {messageSourceRepository} from "@/db/repositories/message-source.repository";
import {Chat} from "@/features/chat/types/chat.types";

export const chatServerService = {
    getUserChats(userId: string) {
        return chatRepository.findByUser(userId);
    },

    async getChat(chatId: string, userId: string): Promise<Chat | null> {
        const chat = await chatRepository.findById(chatId, userId);

        if (!chat) {
            return null;
        }

        const messages = await messageRepository.findByChat(chatId);
        const sources = await messageSourceRepository.findByMessageIds(messages.map((message) => message.id));

        const sourcesByMessage = new Map<string, typeof sources>();

        for (const source of sources) {
            const current = sourcesByMessage.get(source.messageId) ?? [];
            current.push(source);
            sourcesByMessage.set(source.messageId, current);
        }
        return {
            ...chat,
            messages: messages.map(
                ({ id, role, content }) => ({
                    id,
                    role,
                    content,
                    sources: sourcesByMessage.get(id) ?? [],
                }),
            ),
        };
    },
};