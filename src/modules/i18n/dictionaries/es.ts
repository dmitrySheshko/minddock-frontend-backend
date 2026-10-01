import {Dictionary} from "@/modules/i18n/dictionary/dictionary.types";
import {APP_NAME} from "@/shared/constants/app";

export const es: Dictionary = {
    metadata: {
        home: {
            title: `${APP_NAME} — Asistente de conocimiento con IA`,
            description: 'Sube documentos, crea tu base de conocimiento privada y obtén respuestas contextuales impulsadas por IA.',
            keywords: [
                'asistente de conocimiento con IA',
                'documentos con IA',
                'RAG',
                'chat con documentos',
                'base de conocimiento',
                APP_NAME,
            ],
            openGraph: {
                title: `${APP_NAME} — Asistente de conocimiento con IA`,
                description: 'Convierte tus documentos en una base de conocimiento inteligente y haz preguntas utilizando IA.',
                type: 'website',
            },
        },
        terms: {
            title: 'Términos del servicio',
            description: `Lee los Términos del servicio que regulan el uso de ${APP_NAME} y sus funciones impulsadas por IA.`,
        },
        privacy: {
            title: 'Política de privacidad',
            description: `Descubre cómo ${APP_NAME} recopila, procesa, almacena y protege tus datos personales y el contenido que subes.`,
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
        signIn: 'Iniciar sesión',
        // signUp: '',
        signOut: 'Cerrar sesión',
        goToDashboard: 'Ir al panel',
        getStarted: 'Empezar',
        dashboard: 'Panel',
    },
    header: {
        features: 'Funciones',
    },
    footer: {
        copyright: `Copyright © 2026 ${APP_NAME}`,
        terms: 'Términos',
        privacy: 'Privacidad',
    },
    pages: {
        home: {
            headingPart1: 'Tu conocimiento,',
            headingPart2: ' potenciado por IA',
            description: `Sube tus documentos y haz preguntas. ${APP_NAME} encuentra la información relevante y genera respuestas contextuales utilizando IA.`,
            featuresSection: {
                heading: 'Trabaja con tu conocimiento de una forma diferente',
                description: 'De documentos a respuestas en segundos.',
                features: [
                    {
                        title: 'Sube tus documentos',
                        text: 'Añade documentos y crea tu base de conocimiento privada con IA.',
                        icon: 'Upload',
                    },
                    {
                        title: 'Haz preguntas',
                        text: 'Conversa de forma natural con tus documentos en lugar de buscar manualmente.',
                        icon: 'MessageSquareText',
                    },
                    {
                        title: 'Encuentra información relevante',
                        text: `${APP_NAME} recupera el contexto más relevante antes de generar una respuesta.`,
                        icon: 'FileSearch',
                    },
                ],
            },
        },
        terms: {
            heading: 'Términos del servicio',
            lastUpdate: 'Última actualización: 5 de septiembre de 2026',
            items: [
                {
                    title: '1. Aceptación de los términos',
                    text: `Al utilizar ${APP_NAME}, aceptas estos términos y condiciones.`,
                },
                {
                    title: '2. Uso del servicio',
                    text: `${APP_NAME} proporciona herramientas impulsadas por IA para interactuar con documentos y bases de conocimiento.`,
                },
                {
                    title: '3. Contenido generado por IA',
                    text: 'Las respuestas generadas por IA pueden contener errores. Los usuarios deben verificar de forma independiente la información importante.',
                },
            ],
        },
        privacy: {
            heading: 'Política de privacidad',
            lastUpdate: 'Última actualización: 5 de septiembre de 2026',
            items: [
                {
                    title: 'Información que recopilamos',
                    text: `${APP_NAME} puede procesar información de la cuenta, documentos subidos, conversaciones e información técnica necesaria para el funcionamiento del servicio.`,
                },
                {
                    title: 'Documentos subidos',
                    text: 'Los documentos se procesan para proporcionar funciones de búsqueda e IA asociadas a tu cuenta.',
                },
            ],
        },
        singIn: {
            heading: 'Bienvenido de nuevo',
            description: `Inicia sesión en tu cuenta de ${APP_NAME}.`,
            dontHaveAcc: '¿No tienes una cuenta? ',
            createOne: 'Crea una',
        },
        singUp: {
            heading: 'Crea tu cuenta',
            description: 'Empieza a crear tu base de conocimiento con IA.',
            agreementText: 'Al crear una cuenta, aceptas nuestros ',
            terms: 'Términos',
            and: 'y nuestra ',
            privacy: 'Política de privacidad',
            alreadyHaveAcc: '¿Ya tienes una cuenta? ',
        },
    },
};