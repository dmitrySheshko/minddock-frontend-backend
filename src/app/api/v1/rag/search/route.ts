import { z } from 'zod';

import { documentChunkRepository } from '@/db/repositories/document-chunk.repository';
import { authServerService } from '@/features/auth/services/auth.server.service';
import {embeddingService} from "@/modules/embeddings/embedding.service";

const schema = z.object({
    query: z
        .string()
        .trim()
        .min(1)
        .max(1000),
});

export async function POST(request: Request) {
    const session = await authServerService.getSession();

    if (!session) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const result = schema.safeParse(body);

    if (!result.success) {
        return Response.json({ error: 'Invalid query' }, { status: 400 });
    }

    const embedding = await embeddingService.embedQuery(result.data.query);
    const chunks = await documentChunkRepository.findSimilar(session.user.id, embedding);

    return Response.json({chunks});
}