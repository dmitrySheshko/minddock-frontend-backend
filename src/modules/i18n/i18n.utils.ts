import {DEFAULT_LANGUAGE, LANGUAGE} from './i18n.constants';

import type {
    Language,
} from './i18n.types';

export function isLanguage(value: string): value is Language {
    return Object.values(LANGUAGE).some((lang) => lang === value);
}
export function changePathLanguage(pathname: string, language: Language): string {
    const segments = pathname
        .split('/')
        .filter(Boolean);

    const currentLanguage = segments[0];

    if (currentLanguage && isLanguage(currentLanguage)) {
        segments.shift();
    }

    const path = segments.length > 0 ? `/${segments.join('/')}` : '';

    if (language === DEFAULT_LANGUAGE) {
        return path || '/';
    }
    return `/${language}${path}`;
}
export function localizedPath(language: Language, href: string): string {
    // External URLs, mailto:, tel:, #section и т.д.
    if (/^(?:[a-z][a-z\d+\-.]*:|\/\/|#)/i.test(href)) {
        return href;
    }

    // API не локализуем TODO delete
    if (href === '/api' || href.startsWith('/api/')) {
        return href;
    }

    // Отделяем pathname от ?query и #hash TODO delete
    const suffixIndex = href.search(/[?#]/);

    const rawPathname = suffixIndex === -1 ? href : href.slice(0, suffixIndex);

    const suffix = suffixIndex === -1 ? '' : href.slice(suffixIndex);

    const pathname = rawPathname.startsWith('/') ? rawPathname : `/${rawPathname}`;

    const segments = pathname
        .split('/')
        .filter(Boolean);

    if (segments[0] && isLanguage(segments[0])) {
        segments.shift();
    }

    const basePath = segments.length > 0 ? `/${segments.join('/')}` : '/';

    if (language === DEFAULT_LANGUAGE) {
        return `${basePath}${suffix}`;
    }

    const localized = basePath === '/' ? `/${language}` : `/${language}${basePath}`;

    return `${localized}${suffix}`;
}