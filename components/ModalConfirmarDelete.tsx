'use client';

import { deleteMe } from "@/lib/profile";
import { useRouter } from "next/router";
import { useState } from "react";
import Modal from "./Modal";
import { Trash2 } from "lucide-react";

type Props = {
    onBack: () => void;
    onClose: () => void;
};

export default function ModalConfirmarDelete({ onBack, onClose }: Props){
    const router = useRouter();
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState('');

    async function deletar() {
        setDeleting(true);
        setError('')
        try {
            await deleteMe
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Não foi possível deletar a conta.');
            setDeleting(false);
        }
    }

    return (
        <Modal label="Deletar conta" onClose={onClose} onBack={onBack}>
            <div className="flex flex-col items-center">
                <Trash2 size={64} strokeWidth={2} className="text[#AF052A]"/>

                <h2 className="mt-6 text-xl font-semibold text-black">Deletar conta?</h2>
                <p className="mt-2 max-w-[280px] text-center text-sm text-gray-600">
                    Sua conta, lojas, produtos e avaliações serão apagados. Essa ação não pode ser desfeita.
                </p>

                {error && (
                    <p role="alert" className="mt-3 max-w-[260px] text-center text-sm text-red-600">
                        {error}
                    </p>
                )}

                <div className="mt-8 flex w-full max-w-[260px] flex-col gap-2">
                    <button
                        type="button"
                        onClick={deletar}
                        disabled={deleting}
                        className="h-9 cursosr-pointer rounded-full bg-[#AF052A] text-sm text-white shadow transition hover-brightness-110 disabled: cursor-not-allowed disable:opacity-60"
                    >
                        {deleting ? 'Deletando...' : 'Sim, deletar minha conta'}
                    </button>
                    <button
                        type="button"
                        onClick={onBack}
                        disabled={deleting}
                        className="h-9 cursor-pointer rounded-full border border-[#6A38F3] transition hover:bg-[#6A38F3] hover:text-whte"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </Modal>
    )
}