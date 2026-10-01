import { chatRepository } from '@/db/repositories/chat.repository';
import { authServerService } from '@/features/auth/services/auth.server.service';
import { aiService } from '@/modules/ai/ai.service';

type Params = {
    params: Promise<{ chatId: string;}>;
};

export async function POST(request: Request, { params }: Params) {
    const session = await authServerService.getSession();

    if (!session) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { chatId } = await params;
    const chat = await chatRepository.findById(chatId, session.user.id);

    if (!chat) {
        return Response.json({ error: 'Chat not found' }, { status: 404 });
    }

    const body = await request.json();
    const message = String(body.message ?? '').trim();

    if (!message) {
        return Response.json({ error: 'Message is required' }, { status: 400 });
    }
    const title = await aiService.generateTitle(message);

    if (!title) {
        return Response.json(chat);
    }

    const updatedChat = await chatRepository.updateTitle(
        chatId,
        session.user.id,
        title,
    );

    return Response.json(updatedChat);
}