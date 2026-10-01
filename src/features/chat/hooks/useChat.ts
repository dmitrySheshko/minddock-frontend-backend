'use client';

import {SubmitEvent, useEffect, useLayoutEffect, useRef, useState} from 'react';
import { chatService } from '../services/chat.service';
import {Chat, ChatSource, ChatStreamEvent} from '../types/chat.types';
import {ROUTES} from "@/shared/constants/routes";
import {useLocalizedRouter} from "@/modules/i18n/hooks/useLocalizedRouter";
import {CHAT_TITLE_MAX_LENGTH} from "@/shared/constants/app";
import {useChatContext} from "@/features/chat/context/useChatContext";
import {AI_MESSAGE_ROLE} from "@/modules/ai/ai.constants";

export function useChat(chat: Chat | undefined) {
    const router = useLocalizedRouter();
    const { activeChat, addChat, setActiveChat, updateChat, setMessages } = useChatContext();

    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState('');

    const controllerRef = useRef<AbortController | null>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    function scrollToEnd() {
        requestAnimationFrame(() => {
            bottomRef.current?.scrollIntoView({
                behavior: 'instant',
                block: 'end',
            });
        });
    }
    async function sendMessage(message: string) {
        const text = message.trim();
        if (!text || isPending) {
            return;
        }
        setError(null);
        setIsPending(true);

        const userMessage = {
            id: crypto.randomUUID(),
            role: AI_MESSAGE_ROLE.USER,
            content: text,
        };

        let currentChatId = chat?.id ?? activeChat?.id;
        let isNewChat = false;

        const assistantId = crypto.randomUUID();
        const assistantResponseMsg = {
            id: assistantId,
            role: AI_MESSAGE_ROLE.ASSISTANT,
            content: '',
        }
        try {
            //new chat
            if (!currentChatId) {
                const chatTitle = text.slice(0, CHAT_TITLE_MAX_LENGTH);
                const { id: chatID } = await chatService.create(chatTitle);
                currentChatId = chatID;
                isNewChat = true;

                router.replace(`${ROUTES.CHAT}/${currentChatId}`);

                addChat({
                    id: chatID,
                    title: chatTitle,
                });

                setActiveChat({
                    id: chatID,
                    title: chatTitle,
                    messages: [
                        userMessage,
                        assistantResponseMsg,
                    ],
                });
            } else {
                setMessages((current) => [
                    ...current,
                    userMessage,
                    assistantResponseMsg,
                ]);
            }
            //streaming
            const controller = new AbortController();
            controllerRef.current = controller;

            const response = await chatService.send(currentChatId, text, controller.signal);

            if (!response.body) {
                throw new Error('Response body is empty');
            }
            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            let buffer = '';
            let content = '';
            let sources: ChatSource[] = [];
            const handleEvent = (event: ChatStreamEvent) => {
                switch (event.type) {
                    case 'content':
                        content += event.content;
                        setMessages((current) =>
                            current.map((item) =>
                                item.id === assistantId
                                    ? {
                                        ...item,
                                        content: item.content + event.content,
                                    } : item,
                            ),
                        );
                        break;
                    case 'sources':
                        sources = event.sources;
                        setMessages((current) =>
                            current.map((item) =>
                                item.id === assistantId
                                    ? {
                                        ...item,
                                        sources,
                                    }
                                    : item,
                            ),
                        );
                        break;
                    case 'error':
                        throw new Error(event.message);
                    case 'done':
                        break;
                }
            };
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    break;
                }
                buffer += decoder.decode(value, {stream: true});
                const lines = buffer.split('\n');
                buffer = lines.pop() ?? '';

                for (const line of lines) {
                    if (!line.trim()) {
                        continue;
                    }
                    const event = JSON.parse(line) as ChatStreamEvent;
                    handleEvent(event);
                }
            }
            //update chat title
            if (isNewChat) {
                void chatService.generateTitle(currentChatId, text)
                    .then(({ title }) => {
                        if (currentChatId) {
                            updateChat(currentChatId, {title});
                        }
                    });
                    // .catch((error) => {
                    //     console.error('Failed to generate title', error);
                    // });
            }

        } catch (error) {
            if (error instanceof DOMException && error.name === 'AbortError') {
                return;
            }
        } finally {
            setIsPending(false);
            controllerRef.current = null;
        }
    }

    function stop() {
        controllerRef.current?.abort();
    }

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setMessage('');
        await sendMessage(message);
    }

    useEffect(() => {
        if (chat) {
            setActiveChat((activeChat) => {
                if (!activeChat || activeChat.id !== chat.id) {
                    return chat;
                }
                return activeChat;
            });
        } else {
            setActiveChat(null);
        }
    }, [chat, setActiveChat]);
    useLayoutEffect(() => {
        scrollToEnd();
    }, [activeChat]);

    return {
        title: activeChat?.title ?? 'New Chat',
        messages: activeChat?.messages ?? [],
        stop,
        isPending,
        error,
        handleSubmit,
        message,
        setMessage,
        messagesContainerRef,
        bottomRef,
    };
}