import 'server-only';

import {extractText, getDocumentProxy} from 'unpdf';

import {MAX_PDF_PAGES, SUPPORTED_EXTENSIONS} from "@/shared/constants/app";
import {ExtractedDocument} from "@/modules/documents/document.types";

export function isSupportedDocument(file: File): boolean {
    const fileName = file.name.toLowerCase();
    return SUPPORTED_EXTENSIONS.some((extension) => fileName.endsWith(extension));
}

export async function extractDocument(file: File): Promise<ExtractedDocument> {
    const fileName = file.name.toLowerCase();

    if (fileName.endsWith('.txt') || fileName.endsWith('.md')) {
        return extractPlainText(file);
    }

    if (fileName.endsWith('.pdf')) {
        return extractPdf(file);
    }

    throw new Error(`Unsupported file type: ${file.type}`);
}

async function extractPlainText(file: File): Promise<ExtractedDocument> {
    const content = (await file.text()).trim();

    if (!content) {
        throw new Error('Document contains no text');
    }

    return {
        content,
        pages: [
            {
                pageNumber: null,
                content,
            },
        ],
    };
}

async function extractPdf(file: File): Promise<ExtractedDocument> {
    const buffer = await file.arrayBuffer();

    const pdf = await getDocumentProxy(new Uint8Array(buffer));

    if (pdf.numPages > MAX_PDF_PAGES) {
        throw new Error(`PDF contains too many pages. Maximum allowed: ${MAX_PDF_PAGES}`);
    }

    const { text } = await extractText(pdf, {mergePages: false});

    const pages = text
        .map((content, index) => ({
            pageNumber: index + 1,
            content: content.trim(),
        }))
        .filter((page) => page.content.length > 0);

    if (pages.length === 0) {
        throw new Error('PDF contains no extractable text');
    }

    return {
        content: pages
            .map((page) => page.content)
            .join('\n\n'),
        pages,
    };
}