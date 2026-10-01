'use client';

import {useRouter} from 'next/navigation';
import {localizedPath} from '../i18n.utils';
import {useLanguage} from '../components/useLanguage';

type Router = ReturnType<typeof useRouter>;
type PushOptions = Parameters<Router['push']>[1];
type ReplaceOptions = Parameters<Router['replace']>[1];
type PrefetchOptions = Parameters<Router['prefetch']>[1];

export function useLocalizedRouter() {
    const router = useRouter();
    const {language} = useLanguage();

    return {
        push(href: string, options?: PushOptions) {
            router.push(
                localizedPath(language, href),
                options,
            );
        },

        replace(href: string, options?: ReplaceOptions) {
            router.replace(
                localizedPath(language, href),
                options,
            );
        },

        prefetch(href: string, options?: PrefetchOptions) {
            router.prefetch(
                localizedPath(language, href),
                options,
            );
        },

        back() {
            router.back();
        },

        forward() {
            router.forward();
        },

        refresh() {
            router.refresh();
        },
    };
}