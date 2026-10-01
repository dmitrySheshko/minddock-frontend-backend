import {Language} from "@/modules/i18n/i18n.types";

export const LANGUAGE = {
    EN: 'en',
    ES: 'es',
    PL: 'pl',
} as const;

export const DEFAULT_LANGUAGE: Language = LANGUAGE.EN;