export const chatService = {
    async create(title: string) {
        const response = await fetch(
            '/api/v1/chats',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({title}),
            },
        );

        if (!response.ok) {
            throw new Error('Failed to create chat');
        }

        return response.json() as Promise<{ id: string }>;
    },

    async send(chatId: string, message: string, signal?: AbortSignal) {
        const response = await fetch(
            '/api/v1/chat',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({chatId, message}),
                signal,
            },
        );

        if (!response.ok) {
            throw new Error(`Chat request failed: ${response.status}`);
        }

        return response;
    },

    async rename(chatId: string, title: string) {
        const response = await fetch(
            `/api/v1/chats/${chatId}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({title}),
            },
        );

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error ?? 'Failed to rename chat');
        }

        return response.json();
    },

    async delete(chatId: string) {
        const response = await fetch(
            `/api/v1/chats/${chatId}`,
            {
                method: 'DELETE',
            },
        );

        if (!response.ok) {
            throw new Error('Failed to delete chat');
        }
    },

    async generateTitle(chatId: string, message: string) {
        const response = await fetch(
            `/api/v1/chats/${chatId}/title`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message,
                }),
            },
        );

        if (!response.ok) {
            throw new Error('Failed to generate chat title');
        }

        return response.json();
    },
};