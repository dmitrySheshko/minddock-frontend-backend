import 'server-only';

import { headers } from 'next/headers';

import { auth } from '@/modules/auth/auth';
import {ROUTES} from "@/shared/constants/routes";
import {localizedRedirect} from "@/modules/i18n/server/localized-redirect";

type Session = NonNullable<Awaited<ReturnType<typeof auth.api.getSession>>>;

export const authServerService = {
    async getSession() {
        return auth.api.getSession({
            headers: await headers(),
        });
    },
    async requireSession(): Promise<Session> {
        const session = await this.getSession();
        if (!session) {
            return localizedRedirect(ROUTES.HOME);
        }
        return session;
    },
};