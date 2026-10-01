'use client';

import {SubmitEvent, useEffect, useRef, useState} from 'react';
import {Check, MoreHorizontal, Pencil, Trash2, X} from 'lucide-react';
import {usePathname} from 'next/navigation';
import { chatService } from '../services/chat.service';
import ConfirmDialog from '@/shared/components/confirm-dialog';
import {ROUTES} from "@/shared/constants/routes";
import {LocalizedLink} from "@/modules/i18n/components/LocalizedLink";
import {useLocalizedRouter} from "@/modules/i18n/hooks/useLocalizedRouter";
import {ChatHistoryItemProps} from "@/features/chat/types/chat.types";
import {CHAT_TITLE_MAX_LENGTH} from "@/shared/constants/app";
import {useLanguage} from "@/modules/i18n/components/useLanguage";
import {localizedPath} from "@/modules/i18n/i18n.utils";
import {useChatContext} from "@/features/chat/context/useChatContext";

export function ChatHistoryItem({
    id,
    title,
}: ChatHistoryItemProps) {
    const router = useLocalizedRouter();
    const pathname = usePathname();
    const { language } = useLanguage();
    const { removeChat } = useChatContext();
    const menuRef = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(title);
    const [isPending, setIsPending] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const href = localizedPath(language, `${ROUTES.CHAT}/${id}`);
    const isActive = pathname === href;

    useEffect(() => {
        if (!isMenuOpen) {
            return;
        }

        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setIsMenuOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isMenuOpen]);

    async function handleRename(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const newTitle = value.trim();

        if (!newTitle) {
            return;
        }

        if (newTitle === title) {
            setIsEditing(false);
            return;
        }

        try {
            setIsPending(true);

            await chatService.rename(id, newTitle);

            setIsEditing(false);

            router.refresh();
        } finally {
            setIsPending(false);
        }
    }

    function handleDeleteRequest() {
        setIsMenuOpen(false);
        setIsDeleteDialogOpen(true);
    }

    async function handleDelete() {
        try {
            setIsPending(true);
            await removeChat(id);
            setIsDeleteDialogOpen(false);
            if (isActive) {
                router.replace(ROUTES.CHAT);
            }
            router.refresh();
        } finally {
            setIsPending(false);
        }
    }

    function handleStartEditing() {
        setValue(title);
        setIsMenuOpen(false);
        setIsEditing(true);
    }

    function handleCancelEditing() {
        setValue(title);
        setIsEditing(false);
    }

    if (isEditing) {
        return (
            <form
                onSubmit={handleRename}
                className="flex items-center gap-1 px-1"
            >
                <input
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    disabled={isPending}
                    maxLength={CHAT_TITLE_MAX_LENGTH}
                    className="min-w-0 flex-1 rounded-md border border-indigo-300 px-2 py-1.5 text-sm outline-none focus:border-indigo-500"
                />

                <button
                    type="submit"
                    disabled={isPending || !value.trim()}
                    aria-label="Save title"
                    className="rounded p-1.5 hover:bg-gray-100 disabled:opacity-40"
                >
                    <Check size={15} />
                </button>

                <button
                    type="button"
                    disabled={isPending}
                    onClick={
                        handleCancelEditing
                    }
                    aria-label="Cancel"
                    className="rounded p-1.5 hover:bg-gray-100"
                >
                    <X size={15} />
                </button>
            </form>
        );
    }

    return (
        <>
            <div
                className={[
                    'group relative flex items-center rounded-lg',
                    isActive
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-950',
                ].join(' ')}
            >
                <LocalizedLink
                    href={href}
                    className="min-w-0 flex-1 px-2 py-2 text-sm"
                >
                <span className="block truncate">
                    {title}
                </span>
                </LocalizedLink>

                <div
                    ref={menuRef}
                    className="relative mr-1"
                >
                    <button
                        type="button"
                        disabled={isPending}
                        onClick={() =>
                            setIsMenuOpen((current) => !current)
                        }
                        aria-label="Chat options"
                        aria-expanded={isMenuOpen}
                        className={[
                            'rounded-md p-1.5 transition hover:bg-gray-200',
                            isMenuOpen
                                ? 'opacity-100'
                                : 'opacity-0 group-hover:opacity-100',
                        ].join(' ')}
                    >
                        <MoreHorizontal
                            size={16}
                        />
                    </button>

                    {isMenuOpen && (
                        <div
                            role="menu"
                            className="absolute right-0 top-full z-50 mt-1 w-40 overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg"
                        >
                            <button
                                type="button"
                                role="menuitem"
                                onClick={
                                    handleStartEditing
                                }
                                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                            >
                                <Pencil
                                    size={15}
                                />

                                Rename
                            </button>

                            <button
                                type="button"
                                role="menuitem"
                                onClick={handleDeleteRequest}
                                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                            >
                                <Trash2
                                    size={15}
                                />

                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <ConfirmDialog
                open={isDeleteDialogOpen}
                title="Delete chat?"
                description={`"${title}" and all its messages will be permanently deleted.`}
                confirmText="Delete chat"
                isPending={isPending}
                onConfirm={handleDelete}
                onCancel={() => setIsDeleteDialogOpen(false)}
            />
        </>
    );
}