import {
    beforeEach,
    describe,
    expect,
    it,
    vi,
} from 'vitest';

import {db} from '@/db/client';
import {chatRepository} from './chat.repository';

vi.mock('server-only', () => ({}));

vi.mock(
    '@/db/client',
    () => ({
        db: {
            select: vi.fn(),
        },
    }),
);

describe('chatRepository', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('returns chat by id and user id', async () => {
        const chat = {
            id: 'chat-1',
            userId: 'user-1',
            title: 'Test chat',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const limitMock = vi.fn().mockResolvedValue([chat]);

        const whereMock = vi.fn()
            .mockReturnValue({
                limit:
                limitMock,
            });

        const fromMock = vi.fn()
            .mockReturnValue({
                where:
                whereMock,
            });

        vi.mocked(db.select).mockReturnValue({from: fromMock} as never);

        const result = await chatRepository
            .findById(
                'chat-1',
                'user-1',
            );

        expect(result).toEqual(chat);
        expect(db.select).toHaveBeenCalledOnce();
        expect(fromMock).toHaveBeenCalledOnce();
        expect(whereMock).toHaveBeenCalledOnce();
        expect(limitMock).toHaveBeenCalledWith(1);
    });
});