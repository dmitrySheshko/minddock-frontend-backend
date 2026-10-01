import {Metadata} from "next";
import {getLanguage} from "@/modules/i18n/server/get-language";
import {getDictionary} from "@/modules/i18n/server/get-dictionary";
import {isLanguage} from "@/modules/i18n/i18n.utils";

type PageProps = {
    params: Promise<{ lang: string; }>;
};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
    const { lang } = await params;
    if (!isLanguage(lang)) {
        return {};
    }
    const dictionary = await getDictionary(lang);
    return dictionary?.metadata?.terms ?? {};
}

const PageTerms = async () => {
    const language = await getLanguage();
    const dictionary = await getDictionary(language);
    const termsPage = dictionary?.pages?.terms;
    return (
        <article className="mx-auto max-w-3xl px-6 py-16">
            <h1 className="text-4xl font-semibold">
                {termsPage?.heading}
            </h1>
            <p className="mt-4 text-sm text-gray-500">
                {termsPage?.lastUpdate}
            </p>
            <div className="mt-10 space-y-8 leading-7 text-gray-700">
                {
                    termsPage?.items?.map(({ title, text }) => (
                        <section key={title}>
                            <h2 className="text-xl font-semibold text-gray-950">
                                {title}
                            </h2>
                            <p className="mt-2">
                                {text}
                            </p>
                        </section>
                    ))
                }
            </div>
        </article>
    );
};
export default PageTerms;