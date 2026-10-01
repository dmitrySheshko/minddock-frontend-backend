export interface EmbeddingProvider {
    embed(input: string[],): Promise<number[][]>;
}
export type OllamaEmbeddingResponse = {
    embeddings: number[][];
};