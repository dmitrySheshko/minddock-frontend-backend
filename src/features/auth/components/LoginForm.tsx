'use client';

import { useLogin } from '../hooks/useLogin';

export function LoginForm() {
    const {
        error,
        isPending,
        handleSubmit,
    } = useLogin();

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
        >
            <div>
                <label
                    htmlFor="email"
                    className="text-sm font-medium"
                >
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    required
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
                    type="password"
                    name="password"
                    required
                    className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-indigo-500 bg-white"
                />
            </div>

            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}

            <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-lg bg-indigo-600 py-2.5 font-medium text-white hover:bg-indigo-700 cursor-pointer"
            >
                {isPending ? 'Signing in...' : 'Sign in'}
            </button>
        </form>
    );
}