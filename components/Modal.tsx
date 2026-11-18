'use client';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, X } from 'lucide-react';

type Props = {
    label: string;
    onClose: () => void;
    onBack?: () => void;
    children: React.ReactNode;
    tamanho?: "padrao" | "loja";
};

export default function Modal({
    label,
    onClose,
    onBack,
    children,
    tamanho = "padrao"
}: Props) {
    useEffect(() => {
        const aoApertar = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', aoApertar);

        const overflowAnterior = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', aoApertar);
            document.body.style.overflow = overflowAnterior;
        };
    }, [onClose]);

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-label={label}
                onClick={(e) => e.stopPropagation()}
                className={`relative w-full rounded-3xl bg-[#EDEDED] px-8 pb-10 pt-11 shadow-xl ${tamanho === "loja"
                        ? "max-w-[750px] h-[750px] max-h-[calc(100dvh-2rem)]"
                        : "max-w-[500px] h-[570px]"
                    }`}
            >
                {onBack && (
                    <button
                        type="button"
                        onClick={onBack}
                        aria-label="Voltar"
                        className="absolute left-6 top-6 cursor-pointer text-black transition hover:opacity-60"
                    >
                        <ChevronLeft size={35} />
                    </button>
                )}
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Fechar"
                    className="absolute right-6 top-6 cursor-pointer text-black transition hover:opacity-60"
                >
                    <X size={35} />
                </button>

                {children}
            </div>
        </div>,
        document.body,
    );
}