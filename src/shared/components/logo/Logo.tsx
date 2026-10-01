import {Brain} from "lucide-react";
import {APP_NAME} from "@/shared/constants/app";
import {ROUTES} from "@/shared/constants/routes";
import {LocalizedLink} from "@/modules/i18n/components/LocalizedLink";

const Logo = () => {
    return (
        <LocalizedLink href={ROUTES.HOME} className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <Brain size={20}/>
            </div>
            <span className="text-lg font-semibold">
                {APP_NAME}
            </span>
        </LocalizedLink>
    );
};
export default Logo;
