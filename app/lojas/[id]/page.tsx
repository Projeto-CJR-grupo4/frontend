'use client';
import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import BannerLoja from "@/components/loja/BannerLoja";
import ReviewsStore from "@/components/loja/AvaliacoesLoja"
import ProductsStore from "@/components/loja/ProdutosLoja"
import { userViewer } from "@/hooks/userViewer";
import { apiClient } from "@/lib/axios";
import type { Loja } from "@/types/loja"

type State = 
    | { status: "carregando" }
    | { status: "erro" }
    | { status: "ok"; loja: Loja };

function ContentStore() {
    const { id } = useParams<{ id: string }>();
    const { viewer } = userViewer();
    const [state, setState] = useState<State>({ status: "carregando" });

    useEffect(() => {
        let cancelado = false;
        apiClient
            .get<Loja>(`/lojas/${id}`)
            .then((res) => { if (!cancelado) setState({ status: "ok", loja: res.data }); })
            .catch(() => { if (!cancelado) setState({ status: "erro" }); })
        return () => { cancelado = true; };
    }, [id]);

    if (state.status === "carregando") {
        return <div className="h-80 bg-[#2a1f3d] md:h-[630px]" />;
    }

    if (state.status === "erro") {
        return (
            <p className="py-24 text-center text-xl text-[#F6F3E4]">
                Loja não encontrada.
            </p>
        );
    }

    const loja = state.loja;
    const ehDono = viewer?.id === loja.user_id;

    return (
        <>
            <BannerLoja loja={loja} ehDono={ehDono} />
            <ReviewsStore lojaId={loja.id} />
            <ProductsStore lojaId={loja.id} nomeLoja={loja.name} />
        </>
    );
}

export default function LojaPage() {
    return (
      <div className="min-h-screen bg-black">
            <Suspense fallback={<div className="min-h-23 bg-black" />}>
                <Navbar />
            </Suspense>
            <main>
                <Suspense fallback={<div className="h-80 bg-[#2a1f3d] md:h-[630px]" />}>
                    <ContentStore />
                </Suspense>
            </main>
        </div>  
    );
}