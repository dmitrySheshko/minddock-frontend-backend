import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { betterAuth } from 'better-auth';
import { expo } from '@better-auth/expo';

import { db } from '@/db/client';
import * as schema from '@/db/schema';

export const auth = betterAuth({
    basePath: '/api/v1/auth',
    database: drizzleAdapter(db, {
        provider: 'pg',
        schema,
        usePlural: true,
    }),
    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        expo(),
    ],
    trustedOrigins: [
        'minddock://',
        ...(process.env.NODE_ENV === 'development'
            ? [
                'exp://',
                'exp://**',
                'exp://172.16.*.*:*/**',
                'exp://192.168.*.*:*/**',
            ]
            : []),
    ],
});