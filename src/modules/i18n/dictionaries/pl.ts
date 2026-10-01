import {Dictionary} from "@/modules/i18n/dictionary/dictionary.types";
import {APP_NAME} from "@/shared/constants/app";

export const pl: Dictionary = {
    metadata: {
        home: {
            title: `${APP_NAME} — Asystent wiedzy oparty na AI`,
            description: 'Przesyłaj dokumenty, twórz swoją prywatną bazę wiedzy i uzyskuj kontekstowe odpowiedzi generowane przez AI.',
            keywords: [
                'asystent wiedzy AI',
                'dokumenty AI',
                'RAG',
                'czat z dokumentami',
                'baza wiedzy',
                APP_NAME,
            ],
            openGraph: {
                title: `${APP_NAME} — Asystent wiedzy oparty na AI`,
                description: 'Przekształć swoje dokumenty w inteligentną bazę wiedzy i zadawaj pytania za pomocą AI.',
                type: 'website',
            },
        },
        terms: {
            title: 'Warunki korzystania z usługi',
            description: `Zapoznaj się z Warunkami korzystania z usługi regulującymi korzystanie z ${APP_NAME} oraz funkcji opartych na AI.`,
        },
        privacy: {
            title: 'Polityka prywatności',
            description: `Dowiedz się, w jaki sposób ${APP_NAME} gromadzi, przetwarza, przechowuje i chroni Twoje dane osobowe oraz przesłane treści.`,
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
        signIn: 'Zaloguj się',
        // signUp: '',
        signOut: 'Wyloguj się',
        goToDashboard: 'Przejdź do panelu',
        getStarted: 'Rozpocznij',
        dashboard: 'Panel',
    },
    header: {
        features: 'Funkcje',
    },
    footer: {
        copyright: `Copyright © 2026 ${APP_NAME}`,
        terms: 'Warunki',
        privacy: 'Prywatność',
    },
    pages: {
        home: {
            headingPart1: 'Twoja wiedza,',
            headingPart2: ' wzmocniona przez AI',
            description: `Przesyłaj swoje dokumenty i zadawaj pytania. ${APP_NAME} znajduje odpowiednie informacje i generuje kontekstowe odpowiedzi za pomocą AI.`,
            featuresSection: {
                heading: 'Pracuj ze swoją wiedzą w nowy sposób',
                description: 'Od dokumentów do odpowiedzi w kilka sekund.',
                features: [
                    {
                        title: 'Przesyłaj swoje dokumenty',
                        text: 'Dodawaj dokumenty i twórz swoją prywatną bazę wiedzy opartą na AI.',
                        icon: 'Upload',
                    },
                    {
                        title: 'Zadawaj pytania',
                        text: 'Rozmawiaj ze swoimi dokumentami w naturalny sposób zamiast ręcznie wyszukiwać informacje.',
                        icon: 'MessageSquareText',
                    },
                    {
                        title: 'Znajduj istotne informacje',
                        text: `${APP_NAME} wyszukuje najbardziej odpowiedni kontekst przed wygenerowaniem odpowiedzi.`,
                        icon: 'FileSearch',
                    },
                ],
            },
        },
        terms: {
            heading: 'Warunki korzystania z usługi',
            lastUpdate: 'Ostatnia aktualizacja: 5 września 2026',
            items: [
                {
                    title: '1. Akceptacja warunków',
                    text: `Korzystając z ${APP_NAME}, akceptujesz niniejsze warunki.`,
                },
                {
                    title: '2. Korzystanie z usługi',
                    text: `${APP_NAME} udostępnia narzędzia oparte na AI umożliwiające pracę z dokumentami i bazami wiedzy.`,
                },
                {
                    title: '3. Treści generowane przez AI',
                    text: 'Odpowiedzi generowane przez AI mogą zawierać błędy. Użytkownicy powinni samodzielnie weryfikować ważne informacje.',
                },
            ],
        },
        privacy: {
            heading: 'Polityka prywatności',
            lastUpdate: 'Ostatnia aktualizacja: 5 września 2026',
            items: [
                {
                    title: 'Informacje, które gromadzimy',
                    text: `${APP_NAME} może przetwarzać informacje o koncie, przesłane dokumenty, rozmowy oraz informacje techniczne niezbędne do działania usługi.`,
                },
                {
                    title: 'Przesłane dokumenty',
                    text: 'Dokumenty są przetwarzane w celu zapewnienia funkcji wyszukiwania i AI powiązanych z Twoim kontem.',
                },
            ],
        },
        singIn: {
            heading: 'Witaj ponownie',
            description: `Zaloguj się na swoje konto ${APP_NAME}.`,
            dontHaveAcc: 'Nie masz konta? ',
            createOne: 'Utwórz je',
        },
        singUp: {
            heading: 'Utwórz konto',
            description: 'Zacznij tworzyć swoją bazę wiedzy opartą na AI.',
            agreementText: 'Tworząc konto, akceptujesz nasze ',
            terms: 'Warunki',
            and: 'oraz ',
            privacy: 'Politykę prywatności',
            alreadyHaveAcc: 'Masz już konto? ',
        },
    },
};