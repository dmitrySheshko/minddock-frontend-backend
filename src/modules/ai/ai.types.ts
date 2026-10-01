import {AI_MESSAGE_ROLE} from "@/modules/ai/ai.constants";

export type AIMessage = {
    role: typeof AI_MESSAGE_ROLE[keyof typeof AI_MESSAGE_ROLE];
    content: string;
};
export type OllamaChatChunk = {
    message?: AIMessage;
    done: boolean;
};
//-------------
export type StreamTextParams = {
    messages: AIMessage[];
    signal?: AbortSignal;
    options?: {
        numPredict?: number;
    };
    stream?: boolean;
};

export interface AIProvider {
    streamText(params: StreamTextParams): Promise<AsyncIterable<string>>;
    generateText(prompt: string, signal?: AbortSignal): Promise<string>;
}