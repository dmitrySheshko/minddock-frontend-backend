import {Dictionary} from "@/modules/i18n/dictionary/dictionary.types";
import {APP_NAME} from "@/shared/constants/app";

export const en: Dictionary = {
    metadata: {
        home: {
            title: `${APP_NAME} — AI Knowledge Assistant`,
            description: 'Upload documents, build your private knowledge base, and get contextual answers powered by AI.',
            keywords: [
                'AI knowledge assistant',
                'AI documents',
                'RAG',
                'document chat',
                'knowledge base',
                APP_NAME,
            ],
            openGraph: {
                title: `${APP_NAME} — AI Knowledge Assistant`,
                description: 'Turn your documents into an intelligent knowledge base and ask questions using AI.',
                type: 'website',
            },
        },
        terms: {
            title: 'Terms of Service',
            description: `Read the Terms of Service governing the use of ${APP_NAME} and its AI-powered features.`,
        },
        privacy: {
            title: 'Privacy Policy',
            description: `Learn how ${APP_NAME} collects, processes, stores, and protects your personal data and uploaded content.`,
        },
        login: {
            title: 'Sign In',
            description: 'Sign in to your MindDock account and access your AI-powered knowledge base.',
        },
        registration: {
            title: 'Create Account',
            description: 'Create your MindDock account and start building your AI-powered knowledge base.',
        },
    },
    common: {
        signIn: 'Sign In',
        // signUp: '',
        signOut: 'Sign Out',
        goToDashboard: 'Go to Dashboard',
        getStarted: 'Get Started',
        dashboard: 'Dashboard',
    },
    header: {
        features: 'Features',
    },
    footer: {
        copyright: `Copyright © 2026 ${APP_NAME}`,
        terms: 'Terms',
        privacy: 'Privacy',
    },
    pages: {
        home: {
            headingPart1: 'Your knowledge,',
            headingPart2: ' amplified by AI',
            description: `Upload your documents and ask questions. ${APP_NAME} finds the relevant information and generates contextual answers using AI.`,
            featuresSection: {
                heading: 'Work with your knowledge differently',
                description: 'From documents to answers in seconds.',
                features: [
                    {
                        title: 'Upload your documents',
                        text: 'Add documents and build your private AI knowledge base.',
                        icon: 'Upload',
                    },
                    {
                        title: 'Ask questions',
                        text: 'Chat naturally with your documents instead of searching manually.',
                        icon: 'MessageSquareText',
                    },
                    {
                        title: 'Find relevant information',
                        text: `${APP_NAME} retrieves the most relevant context before generating an answer.`,
                        icon: 'FileSearch',
                    },
                ],
            },
        },
        terms: {
            heading: 'Terms of Service',
            lastUpdate: 'Last updated: September 5, 2026',
            items: [
                {
                    title: '1. Acceptance of Terms',
                    text: `By using ${APP_NAME}, you agree to these terms and conditions.`,
                },
                {
                    title: '2. Use of the Service',
                    text: `${APP_NAME} provides AI-powered tools for interacting with documents and knowledge bases.`,
                },
                {
                    title: '3. AI-generated content',
                    text: 'AI-generated responses may contain errors. Users should independently verify important information.',
                },
            ],
        },
        privacy: {
            heading: 'Privacy Policy',
            lastUpdate: 'Last updated: September 5, 2026',
            items: [
                {
                    title: 'Information we collect',
                    text: `${APP_NAME} may process account information, uploaded documents, conversations and technical information required to operate the service.`,
                },
                {
                    title: 'Uploaded documents',
                    text: 'Documents are processed to provide search and AI functionality associated with your account.',
                },
            ],
        },
        singIn: {
            heading: 'Welcome back',
            description: `Sign in to your ${APP_NAME} account.`,
            dontHaveAcc: 'Don\'t have an account? ',
            createOne: 'Create one',
        },
        singUp: {
            heading: 'Create your account',
            description: 'Start building your AI knowledge base.',
            agreementText: 'By creating an account you agree to our ',
            terms: 'Terms',
            and: 'and ',
            privacy: 'Privacy Policy',
            alreadyHaveAcc: 'Already have an account? ',
        },
    },
};