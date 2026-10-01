import { authClient } from '@/shared/lib/auth-client';
import {LoginCredentials, RegistrationCredentials} from "@/features/auth/types/auth.types";

export const authClientService = {
    login(credentials: LoginCredentials) {
        return authClient.signIn.email(credentials);
    },

    logout() {
        return authClient.signOut();
    },

    registration(credentials: RegistrationCredentials) {
        return authClient.signUp.email(credentials);
    },
};