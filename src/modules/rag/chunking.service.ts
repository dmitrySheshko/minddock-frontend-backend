import {CHUNK_OVERLAP, CHUNK_SIZE} from "@/shared/constants/app";

export function splitIntoChunks(text: string): string[] {
    const normalized = text.trim();

    if (!normalized) {
        return [];
    }

    const chunks: string[] = [];

    let start = 0;

    while (start < normalized.length) {
        let end = Math.min(start + CHUNK_SIZE, normalized.length);

        if (end < normalized.length) {
            const paragraphBreak = normalized.lastIndexOf('\n\n', end);
            const sentenceBreak = normalized.lastIndexOf('. ', end);
            const breakPoint = Math.max(paragraphBreak, sentenceBreak);

            if (breakPoint > start + CHUNK_SIZE * 0.6) {
                end = breakPoint + 1;
            }
        }

        const chunk = normalized.slice(start, end).trim();

        if (chunk) {
            chunks.push(chunk);
        }

        if (end >= normalized.length) {
            break;
        }

        const nextStart = end - CHUNK_OVERLAP;

        start = nextStart > start ? nextStart : end;
    }

    return chunks;
}