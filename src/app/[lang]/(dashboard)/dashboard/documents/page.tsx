import { FileText } from 'lucide-react';

import { authServerService } from '@/features/auth/services/auth.server.service';
import { DocumentUpload } from '@/features/documents/components/DocumentUpload';
import { documentServerService } from '@/features/documents/services/document.server.service';
import {formatFileSize} from "@/shared/lib/format";
import {Document} from "@/modules/documents/document.types";

export default async function DocumentsPage() {
    const session = await authServerService.requireSession();
    const documents = await documentServerService.getUserDocuments(session.user.id);

    const renderDocument = (document: Document) => (
        <div
            key={document.id}
            className="flex items-center gap-4 border-b border-gray-100 p-4 last:border-0"
        >
            <FileText
                size={20}
                className="text-gray-400"
            />

            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{document.name}</p>
                <p className="mt-1 text-xs text-gray-400">{document.status}</p>
            </div>

            <span className="text-xs text-gray-400">
                {formatFileSize(document.size)}
            </span>
        </div>
    );
    return (
        <div>
            <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-8">
                <h1 className="font-semibold">
                    Documents
                </h1>
                <DocumentUpload/>
            </header>

            <div className="p-8">
                <div className="mx-auto max-w-5xl">
                    {documents.length === 0 ? (
                        <div
                            className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-gray-200 bg-white">
                            <FileText className="text-indigo-600"/>
                            <h2 className="mt-4 font-semibold">
                                No documents yet
                            </h2>
                            <p className="mt-2 text-sm text-gray-500">
                                Upload a TXT, PDF or Markdown document.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                            {documents.map(renderDocument)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}