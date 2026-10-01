import '@testing-library/jest-dom/vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';

import ConfirmDialog from './ConfirmDialog';

describe('ConfirmDialog', () => {
    it('renders dialog when open is true', () => {
        render(
            <ConfirmDialog
                open
                title="Delete chat?"
                description="This chat will be permanently deleted."
                onConfirm={vi.fn()}
                onCancel={vi.fn()}
            />,
        );

        expect(screen.getByRole('alertdialog')).toBeInTheDocument();
        expect(screen.getByText('Delete chat?')).toBeInTheDocument();
        expect(screen.getByText('This chat will be permanently deleted.')).toBeInTheDocument();
    });

    it('calls onConfirm when confirm button is clicked', () => {
        const onConfirm = vi.fn();
        render(
            <ConfirmDialog
                open
                title="Delete chat?"
                description="This chat will be permanently deleted."
                confirmText="Delete chat"
                onConfirm={onConfirm}
                onCancel={vi.fn()}
            />,
        );

        fireEvent.click(
            screen.getByRole(
                'button',
                {
                    name: 'Delete chat',
                },
            ),
        );

        expect(onConfirm).toHaveBeenCalledOnce();
    });

    it('does not render when open is false', () => {
        render(
            <ConfirmDialog
                open={false}
                title="Delete chat?"
                description="This chat will be permanently deleted."
                onConfirm={vi.fn()}
                onCancel={vi.fn()}
            />,
        );

        expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    });
});