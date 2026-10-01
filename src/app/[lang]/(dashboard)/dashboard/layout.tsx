import {ReactNode} from "react";
import {authServerService} from "@/features/auth/services/auth.server.service";
import {chatServerService} from "@/features/chat/services/chat.server.service";
import DashboardSidebar from "@/widgets/dashboard/sidebar";
import {ChatProvider} from "@/features/chat/context/ChatProvider";

const DashboardLayout = async ({children}: { children: ReactNode }) => {
    const session = await authServerService.requireSession();
    const chats = await chatServerService.getUserChats(session.user.id);

    return (
        <ChatProvider initialChats={chats}>
            <div className="flex min-h-screen bg-gray-50">
                <DashboardSidebar />
                <main className="min-w-0 flex-1">
                    {children}
                </main>
            </div>
        </ChatProvider>

    );
};
export default DashboardLayout;