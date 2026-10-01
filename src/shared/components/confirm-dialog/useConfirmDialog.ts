import {MouseEvent, useEffect} from "react";
import {ConfirmDialogProps} from "./ConfirmDialog.types";

export default function useConfirmDialog({ isPending, open, onCancel}: ConfirmDialogProps) {
    function handelOnMouseDown(event: MouseEvent) {
        if (event.target === event.currentTarget && !isPending) {
            onCancel();
        }
    }
    useEffect(() => {
        if (!open) {
            return;
        }
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && !isPending) {
                onCancel();
            }
        }
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [
        open,
        isPending,
        onCancel,
    ]);
    return {
        handelOnMouseDown,
    };
}