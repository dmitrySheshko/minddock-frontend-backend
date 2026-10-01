import {
    NextRequest,
    NextResponse,
} from 'next/server';

import {DEFAULT_LANGUAGE} from '@/modules/i18n/i18n.constants';

import {isLanguage} from '@/modules/i18n/i18n.utils';

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const segments = pathname
        .split('/')
        .filter(Boolean);

    const firstSegment = segments[0];

    if (firstSegment && isLanguage(firstSegment)) {
        return NextResponse.next();
    }

    const url = request.nextUrl.clone();

    url.pathname = pathname === '/' ? `/${DEFAULT_LANGUAGE}` : `/${DEFAULT_LANGUAGE}${pathname}`;

    return NextResponse.rewrite(url);
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
    ],
};