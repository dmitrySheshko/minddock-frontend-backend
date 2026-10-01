'use client';

import {useRegistration} from "@/features/auth/hooks/useRegistration";

export function RegistrationForm() {
    const {
        error,
        isPending,
        handleSubmit,
    } = useRegistration();
    return (
        <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
        >
            <div>
                <label
                    htmlFor="name"
                    className="text-sm font-medium"
                >
                    Name
                </label>
                <input
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-indigo-500 bg-white"
                />
            </div>
            <div>
                <label
                    htmlFor="email"
                    className="text-sm font-medium"
                >
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-indigo-500 bg-white"
                />
            </div>
            <div>
                <label
                    htmlFor="password"
                    className="text-sm font-medium"
                >
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    minLength={8}
                    autoComplete="new-password"
                    className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-indigo-500 bg-white"
                />
            </div>

            {error && (
                <p className="text-sm text-red-600">
                    {error}
                </p>
            )}

            <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-lg bg-indigo-600 py-2.5 font-medium text-white hover:bg-indigo-700 cursor-pointer"
            >
                {isPending ? 'Creating account...' : 'Create account'}
            </button>
        </form>
    );
}