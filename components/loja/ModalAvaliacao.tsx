"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import Modal from "@/components/Modal";

type ModalAvaliacaoProps = {
    nomeLoja: string;
    onClose: () => void;
};

export default function ModalAvaliacao({
    nomeLoja,
    onClose
}: ModalAvaliacaoProps) {
    const [nota, setNota] = useState(0);
    const [comentario, setComentario] = useState("");

    return (
        <Modal
            label="Avaliar loja"
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
                                className={`h-9 w-9 md:h-16 md:w-16 ${
                                    valor <= nota
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
                    placeholder="Avaliação da loja"
                    aria-label="Avaliação da loja"
                    className="h-56 w-full resize-none rounded-2xl bg-white p-6 text-black outline-none focus:ring-2 focus:ring-[#6A38F3] md:h-80"
                />

                <button
                    type="button"
                    disabled={nota === 0}
                    className="mx-auto h-12 w-full max-w-[480px] cursor-pointer rounded-full bg-[#6A38F3] text-lg text-white shadow-md hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    Avaliar
                </button>

            </div>
        </Modal>
    );
}   