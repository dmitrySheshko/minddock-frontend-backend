import {describe, expect, it} from 'vitest';

import {LANGUAGE} from './i18n.constants';
import {isLanguage, localizedPath} from './i18n.utils';

describe('i18n utils', () => {
    describe('isLanguage', () => {
        it('returns true for supported languages', () => {
            expect(isLanguage('en')).toBe(true);
            expect(isLanguage('es')).toBe(true);
            expect(isLanguage('pl')).toBe(true);
        });

        it('returns false for unsupported languages', () => {
            expect(isLanguage('de')).toBe(false);
            expect(isLanguage('it')).toBe(false);
        });
    });

    describe('localizedPath', () => {
        it('does not add locale prefix for English', () => {
            expect(localizedPath(LANGUAGE.EN, '/chat')).toBe('/chat');
        });

        it('adds locale prefix for Polish', () => {
            expect(localizedPath(LANGUAGE.PL, '/chat')).toBe('/pl/chat');
        });

        it('adds locale prefix for Spanish', () => {
            expect(localizedPath(LANGUAGE.ES, '/documents')).toBe('/es/documents');
        });
    });
});