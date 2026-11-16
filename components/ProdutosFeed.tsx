"use client";
import SecaoProdutos from "@/components/SecaoProdutos";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/axios";

type Produto = {
    id: number;
    name: string;
    price: string;
    stock: number;

    images: {
        image_url: string;
        order: number;
    }[];

    store: {
        name: string;
        logo_url: string | null;
    };

    category: {
        id: number;
        name: string;
    };
};
type ProdutosFeedProps = {
    pesquisa: string;
};
export default function ProdutosFeed({ pesquisa }: ProdutosFeedProps) {
    const [produtos, setProdutos] = useState<Produto[]>([]);

    useEffect(() => {
        async function buscarProdutos() {
            try {
                const resposta = await apiClient.get<Produto[]>("/produtos");

                setProdutos(resposta.data);
            } catch (erro) {
                console.error("Erro ao buscar produtos:", erro);
            }
        }

        buscarProdutos();
    }, []);
    const produtosFiltrados = produtos.filter((produto) =>
        produto.name.toLowerCase().includes(pesquisa.trim().toLowerCase())
    );
    const idsCategorias = [
        ...new Set(produtosFiltrados.map((produto) => produto.category.id))
    ];
    return (
        <>
            {pesquisa.trim() !== "" && produtosFiltrados.length === 0 && (
                <p className="mx-auto max-w-360 px-6 pt-16 text-black lg:px-18">
                    Nenhum produto encontrado.
                </p>
            )}

            {idsCategorias.map((idCategoria) => {
                const produtosDaCategoria = produtosFiltrados.filter(
                    (produto) => produto.category.id === idCategoria
                );

                const nomeCategoria = produtosDaCategoria[0].category.name;

                const produtosFormatados = produtosDaCategoria.map((produto) => ({
                    id: produto.id,
                    name: produto.name,
                    image_url: produto.images[0]?.image_url ?? null,
                    logo_url: produto.store.logo_url,
                    price: produto.price,
                    stock: produto.stock
                }));

                return (
                    <SecaoProdutos
                        key={idCategoria}
                        categoria={nomeCategoria}
                        produtos={produtosFormatados}
                    />
                );
            })}
        </>
    );
}