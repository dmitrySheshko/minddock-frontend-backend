'use client';

import {TranslationProviderProps} from "@/modules/i18n/i18n.types";
import { TranslationContext } from "./TranslationContext";

export function TranslationProvider({
    children,
    dictionary,
}: TranslationProviderProps) {
    return (
        <TranslationContext.Provider
            value={dictionary}
        >
            {children}
        </TranslationContext.Provider>
    );
}