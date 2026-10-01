'use client';

import {useLanguage} from './useLanguage';
import {LANGUAGE} from "@/modules/i18n/i18n.constants";

export function LanguageSwitcher() {
    const {
        language,
        setLanguage,
        isLanguagePending,
    } = useLanguage();

    return (
        <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-1">
            {
                Object.values(LANGUAGE).map((lang) => (
                    <button
                        key={lang}
                        type="button"
                        disabled={isLanguagePending || language === lang}
                        onClick={() => setLanguage(lang)}
                        className="rounded-md px-2 py-1 text-xs disabled:opacity-50 cursor-pointer"
                    >
                        {lang.toUpperCase()}
                    </button>
                ))
            }
        </div>
    );
}