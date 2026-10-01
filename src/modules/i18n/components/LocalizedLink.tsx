'use client';

import NextLink from 'next/link';
import {localizedPath} from '@/modules/i18n/i18n.utils';
import {useLanguage} from './useLanguage';
import {LocalizedLinkProps} from "@/modules/i18n/i18n.types";

export function LocalizedLink({href, ...props}: LocalizedLinkProps) {
    const { language } = useLanguage();
    return (
        <NextLink
            href={localizedPath(language, href)}
            {...props}
        />
    );
}