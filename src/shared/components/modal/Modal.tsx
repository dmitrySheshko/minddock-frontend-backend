'use client'

import {FC, useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";
import { X } from "lucide-react";
import {ModalProps} from "./Modal.types";
import {useLocalizedRouter} from "@/modules/i18n/hooks/useLocalizedRouter";

const Modal: FC<ModalProps> = ({
    children,
    hideModal,
}) => {
    const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const route = useLocalizedRouter();
    const hideModalHandler = hideModal ? hideModal : () => route.back();

    useEffect(() => {
        if (!portalElement) {
            return;
        }
        const dialog = dialogRef.current;
        if (dialog && !dialog.open) {
            dialog.showModal();
        }

        return () => {
            if (dialog?.open) {
                dialog.close();
            }
        };
    }, [portalElement]);
    useEffect(() => {
        setPortalElement(
            document.getElementById('app-modal'),
        );
    }, []);

    if (!portalElement) {
        return null;
    }

    return createPortal(
        <dialog
            ref={dialogRef}
            className="m-auto p-0 rounded-2xl max-w-md w-full"
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
            onCancel={(event) => {
                event.preventDefault();
                hideModalHandler();
            }}
        >
            <button
                type="button"
                aria-label="Close modal"
                onClick={hideModalHandler}
                className="fixed inset-0 cursor-default bg-black/50"
            />
            <div className="w-full rounded-2xl border border-gray-200 bg-white p-8 shadow-sm relative">
                {children}
                <button
                    className="absolute right-[6px] top-[6px] cursor-pointer"
                    onClick={hideModalHandler}
                >
                    <X/>
                </button>
            </div>
        </dialog>,
        portalElement);
};
export default Modal;