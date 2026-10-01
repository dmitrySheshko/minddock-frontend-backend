import {FC} from "react";
import {LoginForm} from "@/features/auth/components/LoginForm";
import {ROUTES} from "@/shared/constants/routes";
import {AuthPageContentProps} from "@/features/auth/types/auth.types";
import {AUTH_PAGE_MODE} from "@/features/auth/constants/auth.constants";
import {LocalizedLink} from "@/modules/i18n/components/LocalizedLink";
import {getLanguage} from "@/modules/i18n/server/get-language";
import {getDictionary} from "@/modules/i18n/server/get-dictionary";

const LoginPageContent: FC<AuthPageContentProps> = async ({ mode }) => {
    const language = await getLanguage();
    const dictionary = await getDictionary(language);
    const signInPage = dictionary?.pages?.singIn;

    return (
        <div className="w-full max-w-md">
            <div>
                {
                    mode === AUTH_PAGE_MODE.PAGE ? (
                        <h1 className="text-2xl font-semibold">
                            {signInPage?.heading}
                        </h1>
                    ) : (
                        <h2 className="text-2xl font-semibold" id="dialog-title">
                            {signInPage?.heading}
                        </h2>
                    )
                }
                <p className="mt-2 text-sm text-gray-500" id="dialog-description">
                    {signInPage?.description}
                </p>

                <LoginForm />

                <p className="mt-6 text-center text-sm text-gray-500">
                    {signInPage?.dontHaveAcc}
                    {
                        mode === AUTH_PAGE_MODE.PAGE ? (
                            <a
                                href={ROUTES.REGISTRATION}
                                className="font-medium text-indigo-600"
                            >
                                {signInPage?.createOne}
                            </a>
                        ) : (
                            <LocalizedLink
                                href={ROUTES.REGISTRATION}
                                className="font-medium text-indigo-600"
                                replace
                            >
                                {signInPage?.createOne}
                            </LocalizedLink>
                        )
                    }
                </p>
            </div>
        </div>
    );
};
export default LoginPageContent;