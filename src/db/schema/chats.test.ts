import {describe, expect, it} from 'vitest';
import {getTableColumns} from 'drizzle-orm';

import {chats} from './chats';

describe('chats schema', () => {
    it('defines required chat columns', () => {
        const columns = getTableColumns(chats);

        expect(columns.id.name).toBe('id');
        expect(columns.id.primary).toBe(true);
        expect(columns.userId.notNull).toBe(true);
        expect(columns.title.notNull).toBe(true);
        expect(columns.createdAt.notNull).toBe(true);
        expect(columns.updatedAt.notNull).toBe(true);
    });
});