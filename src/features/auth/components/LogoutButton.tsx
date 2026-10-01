'use client';

import { LogOut } from 'lucide-react';
import {ROUTES} from "@/shared/constants/routes";
import {authClientService} from "@/features/auth/services/auth.client.service";
import {useTranslation} from "@/modules/i18n/components/useTranslation";
import {useLocalizedRouter} from "@/modules/i18n/hooks/useLocalizedRouter";

export function LogoutButton() {
    const router = useLocalizedRouter();
    const dictionary = useTranslation();

    async function handleLogout() {
        await authClientService.logout();
        router.replace(ROUTES.HOME);
        router.refresh();
    }

    return (
        <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-950 cursor-pointer"
        >
            <LogOut size={16} />
            {dictionary?.common?.signOut}
        </button>
    );
}