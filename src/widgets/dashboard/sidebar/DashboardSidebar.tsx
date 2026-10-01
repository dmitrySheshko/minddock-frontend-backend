import Logo from "@/shared/components/logo";
import {Plus} from "lucide-react";
import {ROUTES} from "@/shared/constants/routes";
import {ChatHistory} from "@/features/chat/components/ChatHistory";
import {LocalizedLink} from "@/modules/i18n/components/LocalizedLink";
import {DASHBOARD_SIDEBAR_NAVIGATION} from "./DashboardSidebar.constants";
import {ICON_DEFAULT_SIZE} from "@/shared/constants/app";
import {DashboardSidebarMenuItem} from "./DashboardSidebar.types";

const DashboardSidebar = () => {
    const renderMenuItem = (item: DashboardSidebarMenuItem) => {
        const Icon = item.icon;
        return (
            <LocalizedLink
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-gray-950"
            >
                <Icon size={ICON_DEFAULT_SIZE}/>
                {item.label}
            </LocalizedLink>
        );
    };
    return (
        <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-gray-200 bg-white p-4">
            <Logo/>

            <LocalizedLink
                href={ROUTES.CHAT}
                className="mt-8 flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
                <Plus size={ICON_DEFAULT_SIZE}/>
                New chat
            </LocalizedLink>

            <div className="mt-7">
                <p className="px-2 text-xs font-medium uppercase tracking-wide text-gray-400 mb-4">
                    Recent chats
                </p>
                <ChatHistory />
            </div>

            <nav className="mt-6 flex flex-col gap-1">
                {DASHBOARD_SIDEBAR_NAVIGATION.map(renderMenuItem)}
            </nav>

            <div className="mt-auto border-t border-gray-200 pt-4">
                <div className="flex items-center gap-3">
                    <div
                        className="flex size-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
                        U
                    </div>

                    <div>
                        <div className="text-sm font-medium">
                            User name
                        </div>

                        <div className="text-xs text-gray-500">
                            Free plan
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};
export default DashboardSidebar;