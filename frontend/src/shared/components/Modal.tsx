'use client';

import { ReactNode } from 'react';
import { X } from 'lucide-react';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

const MODAL_WIDTHS: Record<ModalSize, string> = {
    sm: '500px',
    md: '700px',
    lg: '900px',
    xl: '1520px',
};

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    icon?: ReactNode;
    children: ReactNode;

    size?: ModalSize;

    /*
     * ID of the form that the submit button
     * should submit.
     *
     * Example:
     *
     * <form id="role-form">
     */
    submitFormId?: string;

    submitLabel?: string;
    submitIcon?: ReactNode;

    cancelLabel?: string;

    /*
     * Whether the modal should show
     * the primary submit button.
     */
    showSubmit?: boolean;

    width?: string;
}

export default function Modal({
    isOpen,
    onClose,
    title,
    icon,
    children,
    size = 'md',
    submitFormId,
    submitLabel = 'Save',
    submitIcon,
    cancelLabel = 'Cancel',
    showSubmit = true,
    width = '1120px',
}: ModalProps) {
    if (!isOpen) return null;

    return (
        <div
            className="modal-overlay"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            <div
                className="modal-panel"
                style={{
                    width: `min(${MODAL_WIDTHS[size]}, 100%)`,
                }}
            >
                {/* =========================
                    Header
                ========================== */}

                <div className="modal-header">
                    <div className="modal-header-left">
                        {icon && (
                            <span className="modal-header-icon">
                                {icon}
                            </span>
                        )}

                        <span className="modal-title">
                            {title}
                        </span>
                    </div>

                    <button
                        className="modal-close-btn"
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* =========================
                    Body
                ========================== */}

                <div className="modal-body">
                    {children}
                </div>

                {/* =========================
                    Footer
                ========================== */}

                <div className="modal-footer">
                    <button
                        className="btn-secondary"
                        type="button"
                        onClick={onClose}
                    >
                        {cancelLabel}
                    </button>

                    {showSubmit && submitFormId && (
                        <button
                            className="btn-primary"
                            type="submit"
                            form={submitFormId}
                        >
                            {submitIcon}
                            {submitLabel}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}