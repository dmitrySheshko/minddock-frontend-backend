'use client';

import {useTransition} from 'react';
import {usePathname, useRouter} from 'next/navigation';

import {Language, LanguageContextProps} from '../i18n.types';
import {changePathLanguage} from "@/modules/i18n/i18n.utils";
import { LanguageContext } from './LanguageContext';

export function LanguageProvider({
    children,
    language,
}: LanguageContextProps) {
    const router = useRouter();
    const pathname = usePathname();

    const [isLanguagePending, startTransition] = useTransition();

    function setLanguage(nextLanguage: Language) {
        if (nextLanguage === language) {
            return;
        }

        const nextPathname = changePathLanguage(pathname, nextLanguage);

        startTransition(() => {
            router.replace(`${nextPathname}${window.location.search}${window.location.hash}`);
        });
    }

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
                isLanguagePending,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}