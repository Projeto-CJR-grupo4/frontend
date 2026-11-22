"use client";

import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function ProdutoPage() {
    const { id } = useParams<{ id: string }>();

    return (
        <main className="min-h-screen bg-[#F6F3E4]">
            <Navbar />

            <section className="p-10 text-black">
                <h1 className="text-3xl font-semibold">
                    Página do Produto
                </h1>

                <p>Produto selecionado: {id}</p>
            </section>
        </main>
    );
}