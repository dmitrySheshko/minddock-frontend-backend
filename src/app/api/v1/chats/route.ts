import { authServerService } from '@/features/auth/services/auth.server.service';
import { chatRepository } from '@/db/repositories/chat.repository';
import {NextResponse} from "next/server";

export async function POST(request: Request) {
    const session = await authServerService.getSession();

    if (!session) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const chat = await chatRepository.create(
        session.user.id,
        body.title,
    );

    return Response.json(chat, {status: 201});
}
export async function GET() {
    const session = await authServerService.getSession();

    if (!session) {
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const chats = await chatRepository.findByUser(session.user.id);

    return NextResponse.json(chats);
}