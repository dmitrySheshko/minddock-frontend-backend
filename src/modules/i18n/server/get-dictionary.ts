import 'server-only';

import {Language} from "@/modules/i18n/i18n.types";
import {Dictionary} from "@/modules/i18n/dictionary/dictionary.types";

const dictionaries: Record<Language, () => Promise<Dictionary>> = {
    en: async () => {
        const dictionaryModule = await import('../dictionaries/en');
        return dictionaryModule.en;
    },
    es: async () => {
        const dictionaryModule = await import('../dictionaries/es');
        return dictionaryModule.es;
    },
    pl: async () => {
        const dictionaryModule = await import('../dictionaries/pl');
        return dictionaryModule.pl;
    },
};

export function getDictionary(language: Language): Promise<Dictionary> {
    return dictionaries[language]();
}