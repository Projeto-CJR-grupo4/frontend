"use client";

import { useState } from "react";
import Image from "next/image";
type Categoria = {
    id: number;
    nome: string;
    icone: string;
};

type FiltroLojasProps = {
    categorias: Categoria[];
};

export default function FiltroLojas({ categorias }: FiltroLojasProps) {
    const [aberto, setAberto] = useState(false);

    return (
        <div className="relative w-full">

            <button
                type="button"
                onClick={() => setAberto(!aberto)}
                aria-expanded={aberto}
                aria-controls="menu-filtros-lojas"
                className="flex h-12 w-full items-center justify-between rounded-full bg-white px-6 text-xl text-[#B496FF]"
            >
                <span>filtros</span>

                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                    className={`transition-transform duration-300 ease-in-out ${aberto ? "rotate-180" : ""
                        }`}
                >
                    <path
                        d="m5 8 5 5 5-5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            <div
                id="menu-filtros-lojas"
                aria-hidden={!aberto}
                inert={!aberto}
                className={`absolute right-0 top-full z-20 mt-2 w-full origin-top rounded-3xl bg-white p-6 shadow-md transition-all duration-300 ease-in-out ${aberto
                        ? "translate-y-0 scale-100 opacity-100 pointer-events-auto"
                        : "-translate-y-2 scale-95 opacity-0 pointer-events-none"
                    }`}
            >
                <div className="flex flex-col gap-3">

                    {categorias.map((categoria) => (
                        <label
                            key={categoria.id}
                            className="flex cursor-pointer items-center gap-2 text-[#6A38F3]"
                        >
                            <input
                                type="checkbox"
                                value={categoria.nome}
                                className="h-6 w-6 shrink-0 cursor-pointer accent-[#6A38F3]"
                            />

                            <span className="text-base">
                                {categoria.nome}
                            </span>

                            <Image
                                src={categoria.icone}
                                alt=""
                                width={18}
                                height={18}
                            />
                        </label>
                    ))}

                </div>
            </div>

        </div>
    );
}