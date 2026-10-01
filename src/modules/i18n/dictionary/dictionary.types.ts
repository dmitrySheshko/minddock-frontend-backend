export type Dictionary = {
    metadata: {
        home: {
            title: string;
            description: string;
            keywords: string[];
            openGraph: {
                title: string;
                description: string;
                type: string;
            }
        };
        terms: {
            title: string;
            description: string;
        };
        privacy: {
            title: string;
            description: string;
        };
        login: {
            title: string;
            description: string;
        },
        registration: {
            title: string;
            description: string;
        },
    };
    common: {
        signIn: string;
        // signUp: string;
        signOut: string;
        goToDashboard: string;
        getStarted: string;
        dashboard: string;
    };
    header: {
        features: string;
    };
    footer: {
        copyright: string;
        terms: string;
        privacy: string;
    };
    pages: {
        home: {
            headingPart1: string;
            headingPart2: string;
            description: string;
            featuresSection: {
                heading: string;
                description: string;
                features: {
                    title: string;
                    text: string;
                    icon: 'Upload' | 'MessageSquareText' | 'FileSearch';
                }[];
            };
        };
        terms: {
            heading: string;
            lastUpdate: string;
            items: {
                title: string;
                text: string;
            }[];
        };
        privacy: {
            heading: string;
            lastUpdate: string;
            items: {
                title: string;
                text: string;
            }[];
        };
        singIn: {
            heading: string;
            description: string;
            dontHaveAcc: string;
            createOne: string;
        };
        singUp: {
            heading: string;
            description: string;
            agreementText: string;
            terms: string;
            and: string;
            privacy: string;
            alreadyHaveAcc: string;
        };
    };
};