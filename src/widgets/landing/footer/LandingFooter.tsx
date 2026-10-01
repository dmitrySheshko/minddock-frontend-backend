import {ROUTES} from "@/shared/constants/routes";
import {LanguageSwitcher} from "@/modules/i18n/components/LanguageSwitcher";
import {getLanguage} from "@/modules/i18n/server/get-language";
import {getDictionary} from "@/modules/i18n/server/get-dictionary";
import {LocalizedLink} from "@/modules/i18n/components/LocalizedLink";

const LandingFooter = async () => {
    const language = await getLanguage();
    const dictionary = await getDictionary(language);
    const footer = dictionary?.footer;
    return (
        <footer className="border-t border-gray-200 px-6 py-8">
            <div className="mx-auto flex max-w-7xl justify-between text-sm text-gray-500 items-center">
                <span>{footer?.copyright}</span>
                <div className="flex gap-5 items-center">
                    <LanguageSwitcher />
                    <LocalizedLink href={ROUTES.TERMS}>{footer?.terms}</LocalizedLink>
                    <LocalizedLink href={ROUTES.PRIVACY}>{footer?.privacy}</LocalizedLink>
                </div>
            </div>
        </footer>
    );
};
export default LandingFooter;