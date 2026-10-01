import {ROUTES} from "@/shared/constants/routes";
import {RegistrationForm} from "@/features/auth/components/RegistrationForm";
import {AuthPageContentProps} from "@/features/auth/types/auth.types";
import {FC} from "react";
import {AUTH_PAGE_MODE} from "@/features/auth/constants/auth.constants";
import {LocalizedLink} from "@/modules/i18n/components/LocalizedLink";
import {getLanguage} from "@/modules/i18n/server/get-language";
import {getDictionary} from "@/modules/i18n/server/get-dictionary";

const RegistrationPageContent: FC<AuthPageContentProps> = async ({ mode }) => {
    const language = await getLanguage();
    const dictionary = await getDictionary(language);
    const common = dictionary?.common;
    const signUpPage = dictionary?.pages?.singUp;

    return (
        <div className="w-full max-w-md">
            <div>
                {
                    mode === AUTH_PAGE_MODE.PAGE ? (
                        <h1 className="text-2xl font-semibold">
                            {signUpPage?.heading}
                        </h1>
                    ) : (
                        <h2 className="text-2xl font-semibold" id="dialog-title">
                            {signUpPage?.heading}
                        </h2>
                    )
                }
                <p className="mt-2 text-sm text-gray-500" id="dialog-description">
                    {signUpPage?.description}
                </p>

                <RegistrationForm/>

                <p className="mt-5 text-center text-xs text-gray-400">
                    {signUpPage?.agreementText}
                    <LocalizedLink
                        href={ROUTES.TERMS}
                        className="underline"
                    >
                        {signUpPage?.terms}
                    </LocalizedLink>{' '}
                    {signUpPage?.and}
                    <LocalizedLink
                        href={ROUTES.PRIVACY}
                        className="underline"
                    >
                        {signUpPage?.privacy}
                    </LocalizedLink>
                    .
                </p>

                <p className="mt-5 text-center text-sm text-gray-500">
                    {signUpPage?.alreadyHaveAcc}
                    {
                        mode === AUTH_PAGE_MODE.PAGE ? (
                            <a
                                href={ROUTES.LOGIN}
                                className="font-medium text-indigo-600"
                            >
                                {common?.signIn}
                            </a>
                        ) : (
                            <LocalizedLink
                                href={ROUTES.LOGIN}
                                className="font-medium text-indigo-600"
                                replace
                            >
                                {common?.signIn}
                            </LocalizedLink>
                        )
                    }
                </p>
            </div>
        </div>
    );
};
export default RegistrationPageContent;