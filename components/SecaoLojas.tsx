"use client";

import { useState } from "react";
import FiltroLojas from "./FiltroLojas";
import LojaCard from "./LojaCard";

type Loja = {
    id: number;
    name: string;
    logo_url: string | null;
    category: {
        id: number;
        name: string;
    };
};

type Categoria = {
    id: number;
    name: string;
    icon_url: string | null;
};

type SecaoLojasProps = {
    lojas: Loja[];
    categorias: Categoria[];
};

export default function SecaoLojas({
    lojas,
    categorias
}: SecaoLojasProps) {

    const [categoriasSelecionadas, setCategoriasSelecionadas] =
        useState<string[]>([]);

    const lojasFiltradas = lojas.filter((loja) =>
        categoriasSelecionadas.length === 0 ||
        categoriasSelecionadas.includes(loja.category.name)
    );

    return (
        <section className="mx-auto max-w-360 px-6 pt-16 pb-24 lg:px-18">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <h2 className="text-3xl font-semibold text-black lg:text-4xl">
                    Lojas
                </h2>

                <div className="flex w-full items-center gap-3 lg:w-auto">

                    <div className="min-w-0 flex-1 lg:w-110 lg:flex-none">
                        <FiltroLojas
                            categorias={categorias}
                            onSelecionadasChange={setCategoriasSelecionadas}
                        />
                    </div>

                    <span className="shrink-0 text-sm font-medium text-[#6A38F3]">
                        ver mais
                    </span>

                </div>

            </div>

            <div className="mt-10 flex w-full gap-10 overflow-x-auto">

                {lojasFiltradas.map((loja) => (
                    <LojaCard
                        key={loja.id}
                        name={loja.name}
                        logo_url={loja.logo_url}
                        category={loja.category}
                    />
                ))}

            </div>

            {lojasFiltradas.length === 0 && (
                <p className="mt-6 text-black">
                    Nenhuma loja encontrada.
                </p>
            )}

        </section>
    );
}