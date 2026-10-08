import nextEnv from '@next/env';
import pg from 'pg';
import { z } from 'zod';
const { Pool } = pg;

const mode = process.argv[2] ?? 'development';
const isDevelopment = mode === 'development';
const configOnly = process.argv.includes('--config-only');

const { loadEnvConfig } = nextEnv;
// Load the same environment files as Next.js.
loadEnvConfig(process.cwd(), isDevelopment);

const envSchema = z.object({
    DATABASE_URL: z
        .url({
            protocol: /^postgres(ql)?$/,
        }),

    BETTER_AUTH_SECRET: z
        .string()
        .min(32, 'Must contain at least 32 characters'),

    BETTER_AUTH_URL: z.url({
        protocol: /^https?$/,
    }),
});

async function validateConfiguration() {
    const result = envSchema.safeParse(process.env);

    if (!result.success) {
        const errors = result.error.issues
            .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
            .join('\n');

        throw new Error(`Invalid environment configuration:\n${errors}`);
    }

    console.log('[startup] Configuration validated');

    return result.data;
}

async function checkDatabase(databaseUrl) {
    const pool = new Pool({
        connectionString: databaseUrl,
        connectionTimeoutMillis: 5000,
        query_timeout: 5000,
        max: 1,
    });

    try {
        await pool.query('SELECT 1');
        console.log('[startup] PostgreSQL connection OK');
    } finally {
        await pool.end();
    }
}

async function main() {
    console.log('[startup] Checking application dependencies...');
    const env = await validateConfiguration();
    if (!configOnly) {
        await checkDatabase(env.DATABASE_URL);
    }
    console.log('[startup] All startup checks passed');
}

try {
    await main();
} catch (error) {
    console.error('[startup] Startup failed:', error instanceof Error ? error.message : error);
    process.exitCode = 1;
}
