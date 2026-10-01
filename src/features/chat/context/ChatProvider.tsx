'use client';

import {useState} from 'react';

import {Chat, ChatListItem, ChatMessage, ChatProviderProps} from '../types/chat.types';
import {chatService} from "@/features/chat/services/chat.service";
import { ChatContext } from './ChatContext';

export function ChatProvider({children, initialChats}: ChatProviderProps) {
    const [chats, setChats] = useState(initialChats);
    const [activeChat, setActiveChat] = useState<Chat | null>(null);

    function addChat(chat: ChatListItem) {
        setChats((current) => [chat, ...current]);
    }

    function updateChat(id: string, data: Partial<ChatListItem>) {
        setChats((current) =>
            current.map((chat) =>
                chat.id === id
                    ? {
                        ...chat,
                        ...data,
                    } : chat,
            ),
        );
        setActiveChat(activeChat => activeChat?.id === id ? {
            ...activeChat,
            ...data
        } : activeChat);
    }

    async function removeChat(id: string) {
        await chatService.delete(id);
        setChats((current) => current.filter((chat) => chat.id !== id));
        setActiveChat((current) => current?.id === id ? null : current);
    }

    function setMessages(updater: | ChatMessage[] | ((current: ChatMessage[]) => ChatMessage[])) {
        setActiveChat((current) => {
            if (!current) {
                return current;
            }

            const messages = typeof updater === 'function' ? updater(current.messages) : updater;

            return {
                ...current,
                messages,
            };
        });
    }

    return (
        <ChatContext.Provider
            value={{
                chats,
                addChat,
                updateChat,
                removeChat,
                activeChat,
                setActiveChat,
                setMessages,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}