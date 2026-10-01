import 'server-only';

import {redirect} from 'next/navigation';
import {localizedPath} from '../i18n.utils';
import type {Language} from '../i18n.types';
import {getLanguage} from './get-language';

export async function localizedRedirect(href: string, language?: Language): Promise<never> {
    const currentLanguage = language ?? await getLanguage();
    redirect(localizedPath(currentLanguage, href));
}