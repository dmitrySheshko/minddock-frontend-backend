import { defineConfig } from 'vitest/config';
import path from "node:path";

export default defineConfig({
    test: {
        environment: 'jsdom',
        setupFiles: ['./vitest/setup.ts'],
        globals: true,

        include: [
            'src/**/*.{test,spec}.{ts,tsx}',
        ],

        exclude: [
            'node_modules',
            '.next',
            'e2e',
        ],

        coverage: {
            reporter: [
                'text',
                'html',
            ],
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(import.meta.dirname, './src'),
        },
    },
});