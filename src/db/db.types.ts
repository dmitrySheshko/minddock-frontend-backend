import {AI_MESSAGE_ROLE} from "@/modules/ai/ai.constants";

export type CreateDocumentParams = {
    userId: string;
    name: string;
    mimeType: string;
    size: number;
};
export type CreateChunk = {
    documentId: string;
    userId: string;
    chunkIndex: number;
    pageNumber: number | null;
    content: string;
    embedding: number[];
};
export type CreateMessageParams = {
    chatId: string;
    role: Exclude<typeof AI_MESSAGE_ROLE[keyof typeof AI_MESSAGE_ROLE], typeof AI_MESSAGE_ROLE.SYSTEM>;
    content: string;
};
export type CreateMessageSource = {
    messageId: string;
    documentId: string;
    chunkId: string;
    documentName: string;
    chunkIndex: number;
    pageNumber: number | null;
    content: string;
    similarity: number;
};