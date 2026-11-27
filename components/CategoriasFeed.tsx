"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(false);
    useEffect(() => {
        async function buscarCategorias() {
            try {
                const resposta = await apiClient.get<Categoria[]>("/categorias");

                setCategorias(resposta.data);
            } catch (erro) {
                console.error("Erro ao buscar categorias:", erro);
                setErro(true);
            } finally {
                setCarregando(false);
            }
        }

        buscarCategorias();
    }, []);
    if (carregando) {
        return <p className="text-black">Carregando categorias...</p>;
    }

    if (erro) {
        return <p className="text-red-600">Não foi possível carregar as categorias.</p>;
    }
    return (
        <>
            {categorias.filter((categoria) => categoria.parent_category_id === null).map((categoria) => (
                <Link
                    key={categoria.id}
                    href={`/categorias/${categoria.id}`}
                    className="shrink-0 rounded-4xl transition hover:scale-105"
                >
                    <CategoriaCard name={categoria.name} icon_url={categoria.icon_url} />
                </Link>
            ))}
        </>
    );
}