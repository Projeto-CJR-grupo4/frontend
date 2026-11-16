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

export default function LojasFeed() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [lojas, setLojas] = useState<Loja[]>([]);

    useEffect(() => {
        async function buscarLojas() {
            try {
                const resposta = await apiClient.get<Loja[]>("/lojas");
                setLojas(resposta.data);
            } catch (erro) {
                console.error("Erro ao buscar lojas:", erro);
            }
        }
        async function buscarCategorias() {
            try {
                const resposta = await apiClient.get<Categoria[]>("/categorias");
                setCategorias(resposta.data);
            } catch (erro) {
                console.error("Erro ao buscar categorias:", erro);
            }
        }

        buscarLojas();
        buscarCategorias();
    }, []);
    
   return (
    <SecaoLojas
        lojas={lojas}
        categorias={categorias}
    />
);
}