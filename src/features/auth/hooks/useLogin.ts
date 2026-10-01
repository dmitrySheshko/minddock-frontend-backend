'use client';

import {SubmitEvent, useState} from 'react';

import {authClientService} from '../services/auth.client.service';
import {ROUTES} from "@/shared/constants/routes";
import {LoginCredentials} from "@/features/auth/types/auth.types";
import {useLocalizedRouter} from "@/modules/i18n/hooks/useLocalizedRouter";

export function useLogin() {
    const router = useLocalizedRouter();

    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState(false);

    async function login(credentials: LoginCredentials) {
        setError(null);
        setIsPending(true);

        try {
            const result = await authClientService.login(credentials);

            if (result.error) {
                setError(result.error.message ?? 'Invalid email or password');
                return;
            }

            router.replace(ROUTES.DASHBOARD);
            router.refresh();
        } finally {
            setIsPending(false);
        }
    }
    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.target);

        await login({
            email: String(formData.get('email')),
            password: String(formData.get('password')),
        });
    }

    return {
        login,
        error,
        isPending,
        handleSubmit,
    };
}