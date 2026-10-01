import { notFound } from 'next/navigation';

import { authServerService } from '@/features/auth/services/auth.server.service';
import { Chat } from '@/features/chat/components/Chat';
import { chatServerService } from '@/features/chat/services/chat.server.service';

type ChatPageProps = {
    params: Promise<{ chatId: string; }>;
};

export default async function ChatPage({ params }: ChatPageProps) {
    const { chatId } = await params;
    const session = await authServerService.requireSession();
    const result = await chatServerService.getChat(chatId, session.user.id);

    if (!result) {
        notFound();
    }

    return (
        <div className="h-screen">
            <Chat chat={result}/>
        </div>
    );
}