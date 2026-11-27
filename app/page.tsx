"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import ProdutosFeed from "@/components/ProdutosFeed";
import LojasFeed from "@/components/LojasFeed";
import CategoriasFeed from "@/components/CategoriasFeed";
import BarraPesquisa from "@/components/BarraPesquisa";
export default function Home() {
  const [pesquisa, setPesquisa] = useState("");

  return (
    <main className="min-h-screen bg-[#F6F3E4]">
      <Navbar />

      <section className="bg-black lg:h-125 lg:overflow-hidden">
        <div className="mx-auto flex max-w-360 flex-col items-center justify-between gap-8 px-6 py-10 lg:h-full lg:flex-row lg:px-18 lg:py-0">
          <h1 className="max-w-2xl text-center text-4xl font-bold leading-tight text-white lg:text-5xl">
            Do CAOS à organização,
            <br />
            em alguns cliques
          </h1>

          <Image
            src="/stocklee-banner.svg"
            alt="Personagem StockLee com caixas"
            width={550}
            height={500}
            className="h-auto w-full max-w-70 lg:max-w-137.5 lg:self-start"
          />

        </div>
      </section>
      <BarraPesquisa
        pesquisa={pesquisa}
        setPesquisa={setPesquisa}
      />
      <section className="mx-auto max-w-360 px-6 pt-4 lg:px-18">
        <h2 className="text-3xl font-semibold text-black lg:text-4xl">
          Categoria
        </h2>
        <div className="mt-10 flex w-full max-w-330 gap-16 overflow-x-auto">
          <CategoriasFeed />
        </div>
      </section>
      <ProdutosFeed pesquisa={pesquisa} />

      <LojasFeed pesquisa={pesquisa} />

    </main>
  );
}