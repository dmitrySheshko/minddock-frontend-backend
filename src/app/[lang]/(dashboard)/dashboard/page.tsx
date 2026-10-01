import {ROUTES} from "@/shared/constants/routes";
import {localizedRedirect} from "@/modules/i18n/server/localized-redirect";

const DashboardPage = async () => {
    await localizedRedirect(ROUTES.CHAT);
}
export default DashboardPage;