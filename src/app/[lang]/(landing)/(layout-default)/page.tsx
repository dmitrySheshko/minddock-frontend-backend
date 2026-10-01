import {Brain} from "lucide-react";
import {ROUTES} from "@/shared/constants/routes";
import {authServerService} from "@/features/auth/services/auth.server.service";
import FeaturesSection from "@/app/[lang]/(landing)/(layout-default)/_components/features-section";
import {getLanguage} from "@/modules/i18n/server/get-language";
import {getDictionary} from "@/modules/i18n/server/get-dictionary";
import {LocalizedLink} from "@/modules/i18n/components/LocalizedLink";

const HomePage = async () => {
    const session = await authServerService.getSession();
    const language = await getLanguage();
    const dictionary = await getDictionary(language);

    const homePage = dictionary?.pages?.home;
    const common = dictionary?.common;

    return (
        <>
            <section className="px-6 py-28">
                <div className="mx-auto max-w-4xl text-center">
                    <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                        <Brain size={28} />
                    </div>

                    <h1 className="text-5xl font-semibold tracking-tight text-gray-950">
                        {homePage?.headingPart1}
                        <span className="text-indigo-600">
                            {homePage?.headingPart2}
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
                        {homePage?.description}
                    </p>

                    <div className="mt-8 flex justify-center gap-3">
                        {
                            session ? (
                                <LocalizedLink
                                    href={ROUTES.DASHBOARD}
                                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                                >
                                    {common?.goToDashboard}
                                </LocalizedLink>
                            ) : (
                                <>
                                    <LocalizedLink
                                        href={ROUTES.REGISTRATION}
                                        className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700"
                                    >
                                        {common?.getStarted}
                                    </LocalizedLink>
                                    <LocalizedLink
                                        href={ROUTES.LOGIN}
                                        className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        {common?.signIn}
                                    </LocalizedLink>
                                </>
                            )
                        }
                    </div>
                </div>
            </section>
            <FeaturesSection />
        </>
    );
};
export default HomePage;