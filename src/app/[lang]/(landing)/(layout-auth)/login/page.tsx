import {Metadata} from "next";
import LoginPageContent from "@/features/auth/components/LoginPageContent";
import {AUTH_PAGE_MODE} from "@/features/auth/constants/auth.constants";
import {isLanguage} from "@/modules/i18n/i18n.utils";
import {getDictionary} from "@/modules/i18n/server/get-dictionary";

type PageProps = {
    params: Promise<{ lang: string; }>;
};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
    const { lang } = await params;
    if (!isLanguage(lang)) {
        return {};
    }
    const dictionary = await getDictionary(lang);
    return dictionary?.metadata?.login ?? {};
}

const LoginPage = () => {
    return (
        <LoginPageContent mode={AUTH_PAGE_MODE.PAGE} />
    );
};
export default LoginPage;