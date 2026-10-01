import {RagChunk} from "@/modules/rag/rag.types";

export function buildRagContext(chunks: RagChunk[]): string {
    if (chunks.length === 0) {
        return '';
    }
    return chunks
        .map(
            (chunk, index) => {
                const sourceId = `S${index + 1}`;
                return [
                    `[[${sourceId}]]`,
                    `Document: ${chunk.documentName}`,
                    chunk.pageNumber ? `Page: ${chunk.pageNumber}` : null,
                    `Content:`,
                    chunk.content,
                ]
                    .filter(Boolean)
                    .join('\n');
            },
        )
        .join('\n\n');
}