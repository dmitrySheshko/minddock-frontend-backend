import { authServerService } from '@/features/auth/services/auth.server.service';
import { documentService } from '@/modules/documents/document.service';
import {documentRepository} from "@/db/repositories/document.repository";

export const runtime = 'nodejs';

export async function POST(request: Request) {
    const session = await authServerService.getSession();
    if (!session) {
        return Response.json({error: 'Unauthorized'}, {status: 401});
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
        return Response.json({error: 'File is required'}, {status: 400});
    }

    try {
        const document = await documentService.upload(session.user.id, file);
        return Response.json(document, {status: 201});
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Upload failed';
        return Response.json({error: message}, {status: 400});
    }
}
export async function GET() {
    const session = await authServerService.getSession();

    if (!session) {
        return Response.json({error: 'Unauthorized'}, {status: 401});
    }

    const documents = await documentRepository.findByUser(session.user.id);

    return Response.json(documents);
}