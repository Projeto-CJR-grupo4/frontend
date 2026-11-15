"use client";

import { useEffect, useState } from "react";
import CategoriaCard from "@/components/CategoriaCard";
import { apiClient } from "@/lib/axios";

type Categoria = {
    id: number;
    name: string;
    icon_url: string | null;
    parent_category_id: number | null;
};

export default function CategoriasFeed() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    useEffect(() => {
        async function buscarCategorias() {
            try {
                const resposta = await apiClient.get<Categoria[]>("/categorias");

                setCategorias(resposta.data);
                
            } catch (erro) {
                console.error("Erro ao buscar categorias:", erro);
            }
        }

        buscarCategorias();
    }, []);

    return (
        <>
            {categorias.map((categoria) => (
                <CategoriaCard
                    key={categoria.id}
                    nome={categoria.name}
                    icone={categoria.icon_url ?? "/categorias/mercado.svg"}
                />
            ))}
        </>
    );
}