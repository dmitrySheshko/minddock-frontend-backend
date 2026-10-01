import type { Metadata } from "next";
import {ReactNode} from "react";
import './global.css';
import {LANGUAGE} from "@/modules/i18n/i18n.constants";
import {isLanguage} from "@/modules/i18n/i18n.utils";
import {notFound} from "next/navigation";
import {LanguageProvider} from "@/modules/i18n/components/LanguageProvider";
import {TranslationProvider} from "@/modules/i18n/components/TranslationProvider";
import {getDictionary} from "@/modules/i18n/server/get-dictionary";

type LayoutProps = {
    children: ReactNode;
    modal: ReactNode;
    params: Promise<{ lang: string; }>;
};

//Statically generate routes at build time
// /en /es /pl
export function generateStaticParams() {
    return Object.values(LANGUAGE).map((lang) => ({lang}));
}

export const dynamicParams = false;

export async function generateMetadata({params}: LayoutProps): Promise<Metadata> {
    const { lang } = await params;
    if (!isLanguage(lang)) {
        return {};
    }
    const dictionary = await getDictionary(lang);
    return dictionary?.metadata?.home ?? {};
}

export default async function RootLayout({ children, modal, params }: LayoutProps) {
    const { lang } = await params;
    if (!isLanguage(lang)) {
        notFound();
    }
    const dictionary = await getDictionary(lang);

    return (
        <html lang={lang}>
            <body>
                <LanguageProvider language={lang}>
                    <TranslationProvider dictionary={dictionary}>
                        {children}
                        {modal}
                        <div id="app-modal"/>
                    </TranslationProvider>
                </LanguageProvider>
            </body>
        </html>
    );
}
