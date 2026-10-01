import 'server-only';

import { documentRepository } from '@/db/repositories/document.repository';

import {
    extractDocument,
    isSupportedDocument,
} from './document-text-extractor';
import {MAX_FILE_SIZE} from "@/shared/constants/app";
import {splitIntoChunks} from "@/modules/rag/chunking.service";
import {embeddingService} from "@/modules/embeddings/embedding.service";
import {documentChunkRepository} from "@/db/repositories/document-chunk.repository";

export const documentService = {
    async upload(userId: string, file: File) {
        if (file.size > MAX_FILE_SIZE) {
            throw new Error('File is too large');
        }

        if (!isSupportedDocument(file)) {
            throw new Error('Unsupported file type');
        }

        const document = await documentRepository.create({
            userId,
            name: file.name,
            mimeType: file.type,
            size: file.size,
        });

        try {
            const extracted = await extractDocument(file);

            const chunks = extracted.pages.flatMap((page) =>
                splitIntoChunks(page.content).map((content) => ({
                    pageNumber: page.pageNumber,
                    content,
                }))
            );

            if (chunks.length === 0) {
                throw new Error('Document contains no text');
            }

            const embeddings = await embeddingService.embedDocuments(
                chunks.map((chunk) => ({
                    title: file.name,
                    content: chunk.content,
                })),
            );

            await documentChunkRepository.createMany(
                chunks.map(
                    (chunk, index) => ({
                        documentId: document.id,
                        userId,
                        chunkIndex: index,
                        pageNumber: chunk.pageNumber,
                        content: chunk.content,
                        embedding: embeddings[index],
                    }),
                ),
            );
            return documentRepository.setReady(document.id, extracted.content);
        } catch (error) {
            await documentRepository.setFailed(document.id);
            throw error;
        }
    },
};