"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/axios";
import SecaoLojas from "@/components/SecaoLojas";
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
type LojasFeedProps = {
    pesquisa: string;
};

export default function LojasFeed({ pesquisa }: LojasFeedProps) {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [lojas, setLojas] = useState<Loja[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(false);
    useEffect(() => {
        async function buscarDados() {
            try {
                const [respostaLojas, respostaCategorias] = await Promise.all([
                    apiClient.get<Loja[]>("/lojas"),
                    apiClient.get<Categoria[]>("/categorias")
                ]);

                setLojas(respostaLojas.data);
                setCategorias(respostaCategorias.data);

            } catch (erro) {
                console.error("Erro ao buscar lojas e categorias:", erro);
                setErro(true);
            } finally {
                setCarregando(false);
            }
        }

        buscarDados();
    }, []);
    const lojasFiltradas = lojas.filter((loja) =>
        loja.name.toLowerCase().includes(pesquisa.trim().toLowerCase())
    );
    if (carregando) {
        return (
            <p className="mx-auto max-w-360 px-6 pt-16 text-black lg:px-18">
                Carregando lojas...
            </p>
        );
    }

    if (erro) {
        return (
            <p className="mx-auto max-w-360 px-6 pt-16 text-red-600 lg:px-18">
                Não foi possível carregar as lojas.
            </p>
        );
    }
    return (
        <SecaoLojas
            lojas={lojasFiltradas}
            categorias={categorias}
        />
    );
}