'use client';

import {ChangeEvent, useRef, useState} from 'react';
import { Upload } from 'lucide-react';

import { documentClientService } from '../services/document.service';
import {useLocalizedRouter} from "@/modules/i18n/hooks/useLocalizedRouter";

export function DocumentUpload() {
    const router = useLocalizedRouter();
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    async function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        setError(null);
        setIsPending(true);

        try {
            await documentClientService.upload(file);
            router.refresh();
        } catch (error) {
            setError(
                error instanceof Error ? error.message : 'Upload failed',
            );
        } finally {
            setIsPending(false);
            event.target.value = '';
        }
    }

    return (
        <>
            <input
                ref={inputRef}
                type="file"
                accept=".txt,.md,.pdf,text/plain,text/markdown,application/pdf"
                hidden
                onChange={handleChange}
            />

            <button
                type="button"
                disabled={isPending}
                onClick={() =>
                    inputRef.current?.click()
                }
                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
                <Upload size={17} />

                {isPending ? 'Uploading...' : 'Upload document'}
            </button>

            {error && (
                <p className="text-sm text-red-600">
                    {error}
                </p>
            )}
        </>
    );
}