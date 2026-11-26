"use client";

import { mensagemDeErro } from "@/lib/loja";
import { deleteComment, updateComment } from "@/lib/reviews";
import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "../Modal";

type ModalEditarComentarioProps = {
    comentarioId: number;
    conteudoInicial: string;
    onClose: () => void;
    onSave: () => void;
    onDelete?: () => void;
};

export default function ModalEditarComentario({
    comentarioId,
    conteudoInicial,
    onClose,
    onSave,
    onDelete,
}: ModalEditarComentarioProps) {
    const [conteudo, setConteudo] = useState(conteudoInicial);
    const [salvando, setSalvando] = useState(false);
    const [deletando, setDeletando] = useState(false);

    const texto = conteudo.trim();
    const ocupado = salvando || deletando;

    async function salvarComentario() {
        if(!texto || salvando) return;

        setSalvando(true);

        try {
            await updateComment(comentarioId, texto);
            toast.success("Comentário atualizado com sucesso!");
            onClose();
            onSave();
        } catch(erro) {
            toast.error(mensagemDeErro(erro, "Erro ao atualizar comentário."));
        } finally {
            setSalvando(false);
        }
    }

    async function deletarComentario() {
        if(ocupado) return;

        setDeletando(true);

        try{
            await deleteComment(comentarioId);
            toast.success("Comentário deletado com sucesso!");
            onClose();
            onDelete?.();
        } catch(erro) {
            toast.error(mensagemDeErro(erro, "Erro ao deletar comentário."));
        } finally {
            setDeletando(false);
        }
    }

    return (
        <Modal
            label="Editar comentário"
            onClose={onClose}
            tamanho="comentario"
        >
            <div className="flex flex-col gap-8 pt-6">
                <textarea
                    value={conteudo}
                    onChange={(e) => setConteudo(e.target.value)}
                    placeholder="Comentário"
                    aria-label="Comentario"
                    className="h-56 w-full resize-none rounded-2xl bg-white p-6 text-black outline-none focus:ring-2 focus:ring-[#6A38F3] md:h-72"
                />
            
                <div className="flex flex-col items-center gap-4">
                    {onDelete && (
                        <button
                            type="button"
                            onClick={deletarComentario}
                            disabled={ocupado}
                            className="h-12 w-full max-w-[480px] cursor-pointer rounded-full bg-red-600 text-lg uppercase text-white shadow-md hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {deletando ? "Deletando" : "Deletar"}
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={salvarComentario}
                        disabled={!texto || salvando}
                        className="mx-auto h-12 w-full max-w-[480px] cursor-pointer rounded-full bg-[#6A38F3] text-lg text-white shadow-md hover-brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {salvando? "Salvando..." : "Salvar"}
                </button>
                </div>

            </div>
        </Modal>
    );
}