import {Metadata} from "next";
import RegistrationPageContent from "@/features/auth/components/RegistrationPageContent";
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
    return dictionary?.metadata?.registration ?? {};
}

const RegistrationPage = () => {
    return (
        <RegistrationPageContent mode={AUTH_PAGE_MODE.PAGE} />
    );
};
export default RegistrationPage;