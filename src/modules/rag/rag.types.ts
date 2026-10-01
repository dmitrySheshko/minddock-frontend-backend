export type RagChunk = {
    documentName: string;
    pageNumber: number | null;
    chunkIndex: number;
    content: string;
};