import 'server-only';

import {notFound} from 'next/navigation';
import {lang} from 'next/root-params';
import {Language} from "@/modules/i18n/i18n.types";
import {isLanguage} from "@/modules/i18n/i18n.utils";

export async function getLanguage(): Promise<Language> {
    const value = await lang();
    if (!isLanguage(value)) {
        notFound();
    }
    return value;
}