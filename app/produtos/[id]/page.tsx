"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { apiClient } from "@/lib/axios";

type Produto = {
    id: number;
    name: string;
};

export default function ProdutoPage() {
    const { id } = useParams<{ id: string }>();

    const [produto, setProduto] = useState<Produto | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(false);

    useEffect(() => {
        let cancelado = false;

        setCarregando(true);
        setErro(false);

        apiClient.get<Produto>(`/produtos/${id}`)
            .then((resposta) => {
                if (!cancelado) {
                    setProduto(resposta.data);
                }
            })
            .catch((erro) => {
                if (!cancelado) {
                    console.error("Erro ao buscar produto:", erro);
                    setErro(true);
                }
            })
            .finally(() => {
                if (!cancelado) {
                    setCarregando(false);
                }
            });

        return () => {
            cancelado = true;
        };
    }, [id]);

    return (
        <main className="min-h-screen bg-[#F6F3E4]">
            <Navbar />

            <section className="p-10 text-black">
                {carregando ? (
                    <p>Carregando produto...</p>
                ) : erro || !produto ? (
                    <p>Não foi possível carregar o produto.</p>
                ) : (
                    <>
                        <h1 className="text-3xl font-semibold">
                            Página do Produto
                        </h1>

                        <p>{produto.name}</p>
                    </>
                )}
            </section>
        </main>
    );
}