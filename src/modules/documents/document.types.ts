export type ExtractedDocumentPage = {
    pageNumber: number | null;
    content: string;
};

export type ExtractedDocument = {
    content: string;
    pages: ExtractedDocumentPage[];
};

export type Document = {
    id: string;
    name: string;
    status: string;
    size: number;
};