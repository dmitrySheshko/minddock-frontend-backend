import {Dispatch, ReactNode, SetStateAction} from "react";
import {AI_MESSAGE_ROLE} from "@/modules/ai/ai.constants";

export type ChatSource = {
    documentId: string | null;
    documentName: string;
    chunkIndex: number;
    pageNumber: number | null;
    similarity: number;
};

export type ChatMessage = {
    id: string;
    role: Exclude<typeof AI_MESSAGE_ROLE[keyof typeof AI_MESSAGE_ROLE], typeof AI_MESSAGE_ROLE.SYSTEM>;
    content: string;
    sources?: ChatSource[];
};

export type Chat = {
    id: string;
    title: string;
    messages: ChatMessage[];
};

export type ChatHistoryItemProps = {
    id: string;
    title: string;
};
export type ChatComponentProps = {
    chat?: Chat;
};
export type ChatContextValue = {
    chats: ChatListItem[];
    addChat: (chat: ChatListItem) => void;
    updateChat: (id: string, data: Partial<ChatListItem>) => void;
    removeChat: (id: string) => Promise<void>;
    activeChat: Chat | null;
    setActiveChat: Dispatch<SetStateAction<Chat | null>>;
    setMessages: Dispatch<SetStateAction<ChatMessage[]>>;
};
export type ChatListItem = {
    id: string;
    title: string;
};
export type ChatProviderProps = {
    children: ReactNode;
    initialChats: ChatListItem[];
};
//
export type ChatStreamSource = {
    documentId: string;
    documentName: string;
    chunkIndex: number;
    pageNumber: number | null;
    similarity: number;
};

export type ChatStreamEvent =
    | {
        type: 'content';
        content: string;
    } | {
        type: 'sources';
        sources: ChatStreamSource[];
    } | {
        type: 'done';
    } | {
        type: 'error';
        message: string;
    };