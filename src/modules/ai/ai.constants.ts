export const AI_MESSAGE_ROLE  = {
    SYSTEM: 'system',
    USER: 'user',
    ASSISTANT: 'assistant',
} as const;
export const DEFAULT_OLLAMA_BASE_URL = 'http://127.0.0.1:11434';
export const DEFAULT_OLLAMA_CHAT_MODEL = 'qwen3:4b';
export const DEFAULT_OLLAMA_UTILITY_MODEL = 'qwen3:4b-instruct';