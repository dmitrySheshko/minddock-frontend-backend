'use client';

import { ChatHistoryItem } from './ChatHistoryItem';
import {useChatContext} from "@/features/chat/context/useChatContext";

export function ChatHistory() {
    const {chats} = useChatContext();

    if (chats.length === 0) {
        return (
            <p className="px-2 py-2 text-sm text-gray-400">
                No chats yet
            </p>
        );
    }

    return (
        <div className="space-y-1">
            {chats.map((chat) => (
                <ChatHistoryItem
                    key={chat.id}
                    id={chat.id}
                    title={chat.title}
                />
            ))}
        </div>
    );
}