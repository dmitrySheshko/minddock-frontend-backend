import {documentRepository} from '@/db/repositories/document.repository';
import {authServerService} from '@/features/auth/services/auth.server.service';

type RouteContext = { params: Promise<{ documentId: string; }>; };

export async function DELETE(_request: Request, {params,}: RouteContext) {
    const session = await authServerService.getSession();

    if (!session) {
        return Response.json({error: 'Unauthorized'}, {status: 401});
    }

    const {documentId} = await params;
    const deleted = await documentRepository.delete(documentId, session.user.id);

    if (!deleted) {
        return Response.json({error: 'Document not found'}, {status: 404});
    }

    return new Response(null, {status: 204});
}