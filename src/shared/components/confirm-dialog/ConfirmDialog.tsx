'use client';

import {ConfirmDialogProps} from "./ConfirmDialog.types";
import useConfirmDialog from "@/shared/components/confirm-dialog/useConfirmDialog";

export default function ConfirmDialog(props: ConfirmDialogProps) {
    const {
        open,
        title,
        description,
        confirmText = 'Delete',
        cancelText = 'Cancel',
        isPending = false,
        onConfirm,
        onCancel,
    } = props;
    const {
        handelOnMouseDown,
    } = useConfirmDialog(props);

    if (!open) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
            onMouseDown={handelOnMouseDown}
            role="presentation"
        >
            <div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="confirm-dialog-title"
                aria-describedby="confirm-dialog-description"
                className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl"
            >
                <h2
                    id="confirm-dialog-title"
                    className="text-lg font-semibold text-gray-950"
                >
                    {title}
                </h2>

                <p
                    id="confirm-dialog-description"
                    className="mt-2 text-sm leading-6 text-gray-500"
                >
                    {description}
                </p>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        disabled={isPending}
                        onClick={onCancel}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                    >
                        {cancelText}
                    </button>

                    <button
                        type="button"
                        disabled={isPending}
                        onClick={onConfirm}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                    >
                        {isPending ? 'Deleting...' : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}