import {AUTH_PAGE_MODE} from "@/features/auth/constants/auth.constants";

export type LoginCredentials = {
    email: string;
    password: string;
};
export type RegistrationCredentials = {
    name: string;
    email: string;
    password: string;
};
export type AuthPageMode = typeof AUTH_PAGE_MODE[keyof typeof AUTH_PAGE_MODE];
export type AuthPageContentProps = {
    mode: AuthPageMode;
};