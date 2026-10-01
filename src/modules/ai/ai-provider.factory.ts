import type { AIProvider } from './ai.types';
import { OllamaProvider } from './providers/ollama.provider';

export function createAIProvider(): AIProvider {
    const provider = process.env.AI_PROVIDER ?? 'ollama';

    switch (provider) {
        case 'ollama':
            return new OllamaProvider();

        case 'openai':
            // return new OpenAIProvider();
        default:
            throw new Error(`Unsupported AI provider: ${provider}`);
    }
}