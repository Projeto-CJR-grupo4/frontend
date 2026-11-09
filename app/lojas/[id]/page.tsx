'use client';
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import BannerLoja from "@/components/loja/BannerLoja";
import { useLogado } from "@/hooks/useLogado";
import { lojaMock } from "./mock";

export default function LojaPage() {
    const logado = useLogado();

    const loja = lojaMock;

    const ehDono = logado;

    return (
        <div className="min-h-screen bg-black">
            <Suspense fallback={<div className="min-h-23 bg-black" />}>
                <Navbar />
            </Suspense>
            <main>
                <BannerLoja loja={loja} ehDono={ehDono} />
            </main>
        </div>
    );
}