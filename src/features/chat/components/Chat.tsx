'use client';

import ReactMarkdown from 'react-markdown';
import { ArrowUp, Square } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import type {ChatComponentProps, ChatMessage} from '../types/chat.types';
import {ICON_DEFAULT_SIZE} from "@/shared/constants/app";
import {AI_MESSAGE_ROLE} from "@/modules/ai/ai.constants";

export function Chat({ chat }: ChatComponentProps) {
    const {
        title,
        messages,
        stop,
        isPending,
        error,
        handleSubmit,
        message,
        setMessage,
        messagesContainerRef,
        bottomRef,
    } = useChat(chat);

    const renderMsg = (item: ChatMessage) => (
        <div key={item.id}>
            <div
                className={
                    item.role === 'user'
                        ? 'ml-auto max-w-[80%] rounded-2xl bg-indigo-600 px-4 py-3 text-white whitespace-break-spaces'
                        : 'max-w-[80%] px-4 py-3 whitespace-break-spaces'
                }
            >
                <ReactMarkdown>
                    {
                        item.content ? item.content : 'Thinking...'
                    }
                </ReactMarkdown>
            </div>
            {item.role === AI_MESSAGE_ROLE.ASSISTANT &&
                (item.sources && item.sources.length > 0) && (
                    <div className="mt-2 flex flex-wrap gap-2 px-4">
                        {[...new Map(item.sources.map((source) => [source.documentId, source])).values()].map((source) => (
                            <span
                                key={
                                    source.documentId
                                }
                                className="rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-xs text-gray-500"
                            >
                                {source.documentName}
                            </span>
                        ))}
                    </div>
                )}
        </div>
    );
    return (
        <div className="flex h-full flex-col">
            <header className="flex h-16 shrink-0 items-center border-b border-gray-200 bg-white px-6">
                <h1 className="truncate font-semibold">
                    {title}
                </h1>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-8">
                {messages.length === 0 ? (
                    <div className="flex h-full items-center justify-center">
                        <div className="text-center">
                            <h2 className="text-3xl font-semibold">
                                Ask MindDock
                            </h2>
                            <p className="mt-2 text-gray-500">
                                How can I help you today?
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="mx-auto max-w-3xl space-y-6" ref={messagesContainerRef}>
                        {messages.map(renderMsg)}
                        <div ref={bottomRef} />
                    </div>
                )}
            </div>
            <div className="border-t border-gray-200 bg-white p-6">
                <form
                    onSubmit={handleSubmit}
                    className="mx-auto max-w-3xl"
                >
                    <div className="flex items-end gap-3 rounded-2xl border border-gray-200 p-3 shadow-sm">
                        <textarea
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                            placeholder="Ask anything..."
                            rows={1}
                            disabled={isPending}
                            className="flex-1 resize-none outline-none"
                        />

                        {isPending ? (
                            <button
                                type="button"
                                onClick={stop}
                                className="flex size-9 items-center justify-center rounded-lg bg-gray-900 text-white"
                            >
                                <Square size={15}/>
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={!message.trim()}
                                className="flex size-9 items-center justify-center rounded-lg bg-indigo-600 text-white disabled:opacity-40"
                            >
                                <ArrowUp size={ICON_DEFAULT_SIZE} />
                            </button>
                        )}
                    </div>

                    {error && (
                        <p className="mt-2 text-sm text-red-600">
                            {error}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}