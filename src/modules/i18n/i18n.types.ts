import {LANGUAGE} from "@/modules/i18n/i18n.constants";
import {type ComponentProps, ReactNode} from "react";
import NextLink from "next/link";
import {Dictionary} from "@/modules/i18n/dictionary/dictionary.types";

export type Language = typeof LANGUAGE[keyof typeof LANGUAGE];

export type LanguageContextValue = {
    language: Language;
    setLanguage: (language: Language) => void;
    isLanguagePending: boolean;
};
export type LanguageContextProps = {
    children: ReactNode;
    language: Language;
};
type NextLinkProps = ComponentProps<typeof NextLink>;
export type LocalizedLinkProps = Omit<NextLinkProps, 'href'> & { href: string; };

export type TranslationProviderProps = {
    children: ReactNode;
    dictionary: Dictionary;
};