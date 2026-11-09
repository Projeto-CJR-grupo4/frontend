'use client';
import { Suspense } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import BannerLoja from "@/components/loja/BannerLoja";
import { useLogado } from "@/hooks/useLogado";
import { lojasMock } from "./mock";

function ConteudoLoja() {
    const { id } = useParams<{ id: string }>();
    const logado = useLogado();

    const loja = lojasMock.find((l) => l.id === Number(id));

    if (!loja) {
        return (
            <p className="py-24 text-center text-xl text-[#F6F3E4]">
                Loja não encontrada.
            </p>
        );
    }

    const ehDono = logado;

    return <BannerLoja loja={loja} ehDono={ehDono} />;
}

export default function LojaPage() {
    return (
        <div className="min-h-screen bg-black">
            <Suspense fallback={<div className="min-h-23 bg-black" />}>
                <Navbar />
            </Suspense>
            <main>
                <Suspense fallback={<div className="h-80 bg-[#2a1f3d] md:h-[630px]" />}>
                    <ConteudoLoja />
                </Suspense>
            </main>
        </div>
    );
}