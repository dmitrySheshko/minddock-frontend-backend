import Logo from "@/shared/components/logo";
import {ROUTES} from "@/shared/constants/routes";
import {LogoutButton} from "@/features/auth/components/LogoutButton";
import {authServerService} from "@/features/auth/services/auth.server.service";
import {getLanguage} from "@/modules/i18n/server/get-language";
import {getDictionary} from "@/modules/i18n/server/get-dictionary";
import {LocalizedLink} from "@/modules/i18n/components/LocalizedLink";

const LandingHeader = async () => {
    const session = await authServerService.getSession();
    const language = await getLanguage();
    const dictionary = await getDictionary(language);
    const header = dictionary?.header;
    const common = dictionary?.common;
    return (
        <header className="border-b border-gray-200">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <Logo/>

                <nav className="flex items-center gap-6">
                    <LocalizedLink
                        href="/#features"
                        className="text-sm text-gray-600 hover:text-gray-950"
                    >
                        {header?.features}
                    </LocalizedLink>
                    {
                        !session ? (
                            <>

                                <LocalizedLink
                                    href={ROUTES.LOGIN}
                                    className="text-sm font-medium text-gray-700 hover:text-gray-950"
                                >
                                    {common?.signIn}
                                </LocalizedLink>

                                <LocalizedLink
                                    href={ROUTES.REGISTRATION}
                                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                                >
                                    {common?.getStarted}
                                </LocalizedLink>
                            </>
                        ) : (
                            <>
                                <LogoutButton />
                                <LocalizedLink
                                    href={ROUTES.DASHBOARD}
                                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                                >
                                    {common?.dashboard}
                                </LocalizedLink>
                            </>
                        )
                    }
                </nav>
            </div>
        </header>
    );
};
export default LandingHeader;