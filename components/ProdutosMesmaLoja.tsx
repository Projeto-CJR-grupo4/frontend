"use client";

import { useEffect, useState } from "react";
import ProdutoCard from "@/components/ProdutoCard";
import { getProductsStore, type ProductStore } from "@/lib/loja";

type Props = {
    lojaId: number;
    produtoAtualId: number;
    logoLoja: string | null;
};

export default function ProdutosMesmaLoja({
    lojaId,
    produtoAtualId,
    logoLoja
}: Props) {
    const [produtos, setProdutos] = useState<ProductStore[]>([]);

    useEffect(() => {
        let cancelado = false;

        getProductsStore(lojaId)
            .then((dados) => {
                if (!cancelado) {
                    setProdutos(dados);
                }
            })
            .catch((erro) => console.error("Erro ao buscar produtos:", erro));

        return () => {
            cancelado = true;
        };
    }, [lojaId]);

    const outrosProdutos = produtos.filter(
        (produto) => produto.id !== produtoAtualId
    );

    return (
        <section className="mt-16">
            <h2 className="mb-8 text-3xl font-semibold">
                Da mesma loja
            </h2>

            <div className="flex gap-8 overflow-x-auto pb-4">
                {outrosProdutos.map((produto) => (
                    <ProdutoCard
                        key={produto.id}
                        id={produto.id}
                        name={produto.name}
                        image_url={produto.images[0]?.image_url ?? null}
                        logo_url={logoLoja}
                        price={produto.price}
                        stock={produto.stock}
                    />
                ))}
            </div>
        </section>
    );
}