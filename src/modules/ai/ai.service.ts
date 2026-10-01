import type {AIMessage, AIProvider} from './ai.types';
import {createAIProvider} from "@/modules/ai/ai-provider.factory";
import {createChatTitlePrompt} from "@/modules/ai/prompts/chat.prompt";

export class AIService {
    constructor(private readonly provider: AIProvider) {}

    stream(messages: AIMessage[], signal?: AbortSignal) {
        return this.provider.streamText({messages, signal});
    }
    async generateTitle(message: string): Promise<string> {
        const title = await this.provider.generateText(createChatTitlePrompt(message));

        return title
            .trim()
            .replace(/^["']|["']$/g, '')
            .slice(0, 80);
    }
}

// export const aiService = new AIService(new OpenAIProvider());
// export const aiService = new AIService(new OllamaProvider());
export const aiService = new AIService(createAIProvider());