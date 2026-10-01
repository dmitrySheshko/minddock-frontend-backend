export type ConfirmDialogProps = {
    open: boolean;
    title: string;
    description: string;

    confirmText?: string;
    cancelText?: string;

    isPending?: boolean;

    onConfirm: () => void;
    onCancel: () => void;
};