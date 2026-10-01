'use client'

import {SubmitEvent, useState} from "react";
import {ROUTES} from "@/shared/constants/routes";
import {authClientService} from "@/features/auth/services/auth.client.service";
import {useLocalizedRouter} from "@/modules/i18n/hooks/useLocalizedRouter";

export function useRegistration() {
    const router = useLocalizedRouter();

    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState(false);

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        setError(null);
        setIsPending(true);

        const formData = new FormData(event.currentTarget);

        const name = String(formData.get('name'));
        const email = String(formData.get('email'));
        const password = String(formData.get('password'));

        const result = await authClientService.registration({
            name,
            email,
            password,
        });

        setIsPending(false);

        if (result.error) {
            setError(result.error.message ?? 'Registration failed');
            return;
        }

        router.replace(ROUTES.DASHBOARD);
        router.refresh();
    }
    return {
        error,
        isPending,
        handleSubmit,
    };
}