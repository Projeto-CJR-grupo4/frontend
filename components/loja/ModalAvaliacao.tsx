"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import Modal from "@/components/Modal";
import { createStoreRating, mensagemDeErro } from "@/lib/loja";
import { updateReview, deleteReview, type ReviewType } from "@/lib/reviews";
import toast from "react-hot-toast";

type ModalAvaliacaoProps = {
    lojaId?: number;
    nomeLoja: string;
    onClose: () => void;
    onSalvo: () => void;
    type?: ReviewType;
    avaliacao?: { id: number; nota: number; comentario: string };
    onDeletado?: () => void;
};

export default function ModalAvaliacao({
    lojaId,
    nomeLoja,
    onClose,
    onSalvo,
    type = "loja",
    avaliacao,
    onDeletado,
}: ModalAvaliacaoProps) {
    const [nota, setNota] = useState(avaliacao?.nota ?? 0);
    const [comentario, setComentario] = useState(avaliacao?.comentario ?? "");
    const [enviando, setEnviando] = useState(false);
    const [deletando, setDeletando] = useState(false);

    const editando = avaliacao != null;
    const ocupado = enviando || deletando;
    const placeholder = type === "loja" ? "Avaliação da loja" : "Avaliação do produto";

    async function enviarAvaliacao() {
        if (nota === 0 || ocupado) return;
        if (!avaliacao && lojaId == null) return;

        setEnviando(true);

        try {
            if (avaliacao) {
                await updateReview(type, avaliacao.id, {
                    rating: nota,
                    comment: comentario.trim(),
                });
                toast.success("Avaliação atualizada com sucesso!");
            } else {
                await createStoreRating(lojaId as number, nota, comentario);
                toast.success("Avaliação cadastrada com sucesso!");
            }
            onClose();
            onSalvo();
        } catch (erro) {
            toast.error(
                mensagemDeErro(
                    erro,
                    avaliacao ? "Erro ao atualizar avaliação." : "Erro ao cadastrar avaliação.",
                ),
            );
        } finally {
            setEnviando(false);
        }
    }

    async function deletarAvaliacao() {
        if (!avaliacao || ocupado) return;

        setDeletando(true);

        try {
            await deleteReview(type, avaliacao.id);
            toast.success("Avaliação deletada com sucesso!");
            onClose();
            onDeletado?.();
        } catch (erro) {
            toast.error(mensagemDeErro(erro, "Erro ao deletar avaliação."));
        } finally {
            setDeletando(false);
        }
    }

    return (
        <Modal
            label={editando ? "Editar avaliação" : "Avaliar loja"}
            onClose={onClose}
            tamanho="avaliacao"
        >
            <div className="flex flex-col gap-8">

                <h2 className="pr-8 text-2xl text-black md:text-3xl">
                    Você está avaliando{" "}
                    <span className="font-semibold">
                        {nomeLoja}
                    </span>
                </h2>

                <div className="flex justify-center gap-2 md:gap-5">
                    {[1, 2, 3, 4, 5].map((valor) => (
                        <button
                            key={valor}
                            type="button"
                            onClick={() => setNota(valor)}
                            aria-label={`Avaliar com ${valor} estrelas`}
                            aria-pressed={nota === valor}
                            className="cursor-pointer text-[#6A38F3]"
                        >
                            <Star
                                strokeWidth={1}
                                className={`h-9 w-9 md:h-16 md:w-16 ${valor <= nota
                                    ? "fill-[#6A38F3]"
                                    : "fill-transparent"
                                    }`}
                            />
                        </button>
                    ))}
                </div>

                <textarea
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    placeholder={placeholder}
                    aria-label={placeholder}
                    className="h-56 w-full resize-none rounded-2xl bg-white p-6 text-black outline-none focus:ring-2 focus:ring-[#6A38F3] md:h-80"
                />

                <div className="flex flex-col items-center gap-4">
                    {editando && onDeletado && (
                        <button
                            type="button"
                            onClick={deletarAvaliacao}
                            disabled={ocupado}
                            className="h-12 w-full max-w-[480px] cursor-pointer rounded-full bg-red-600 text-lg uppercase text-white shadow-md hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {deletando ? "Deletando..." : "Deletar"}
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={enviarAvaliacao}
                        disabled={nota === 0 || ocupado}
                        className="h-12 w-full max-w-[480px] cursor-pointer rounded-full bg-[#6A38F3] text-lg text-white shadow-md hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {editando
                            ? enviando ? "Salvando..." : "Salvar"
                            : enviando ? "Enviando..." : "Avaliar"}
                    </button>
                </div>

            </div>
        </Modal>
    );
}