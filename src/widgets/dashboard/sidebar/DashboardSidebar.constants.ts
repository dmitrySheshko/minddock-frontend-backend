import {ROUTES} from "@/shared/constants/routes";
import {FileText, Settings} from "lucide-react";
import {DashboardSidebarMenuItem} from "./DashboardSidebar.types";

export const DASHBOARD_SIDEBAR_NAVIGATION: DashboardSidebarMenuItem[] = [
    {
        href: ROUTES.DOCUMENTS,
        label: 'Documents',
        icon: FileText,
    },
    {
        href: ROUTES.SETTINGS,
        label: 'Settings',
        icon: Settings,
    },
];