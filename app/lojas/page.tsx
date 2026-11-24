'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CategoriasFeed from "@/components/CategoriasFeed";
import FiltroLojas from "@/components/FiltroLojas";
import LojaCard from "@/components/LojaCard";
import Paginacao from "@/components/Paginacao";
import { apiClient } from "@/lib/axios";

type LojaDaLista = {
    id: number;
    name: string;
    logo_url: string | null;
    category: { id: number, name: string };
};

type Categoria = {
    id: number;
    name: string;
    icon_url: string | null;
};

type Estado =
    | { status: "carregando" }
    | { status: "erro" }
    | { status: "ok"; lojas: LojaDaLista[]; categorias: Categoria[] };

const POR_PAGINA = 15;

export default function LojasPage() {
    const [estado, setEstado] = useState<Estado>({ status: "carregando" });
    const [pesquisa, setPesquisa] = useState("");
    const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<string[]>([]);
    const [pagina, setPagina] = useState(1);

    useEffect (() => {
        let cancelado = false;
        Promise.all([
            apiClient.get<LojaDaLista[]>("/lojas"),
            apiClient.get<Categoria[]>("/categorias"),
        ])
            .then(([lojas, categorias]) => {
                if (!cancelado) setEstado({ status: "ok", lojas: lojas.data, categorias: categorias.data });
            })
            .catch(() => { if (!cancelado) setEstado({ status: "erro" });});
        return () => { cancelado = true; };
    }, []);

    function pesquisar(texto: string) {
        setPesquisa(texto);
        setPagina(1);
    }

    function filtrar(categorias: string[]) {
        setCategoriasSelecionadas(categorias);
        setPagina(1);
    }

    const lojas = estado.status === "ok" ? estado.lojas : [];
    const termo = pesquisa.trim().toLowerCase();
    const lojasFiltradas = lojas.filter((loja) => 
        loja.name.toLowerCase().includes(termo) && (categoriasSelecionadas.length === 0 || categoriasSelecionadas.includes(loja.category.name)));

    const totalPaginas = Math.max(1, Math.ceil(lojasFiltradas.length / POR_PAGINA));
    const paginaAtual = Math.min(pagina, totalPaginas);
    const daPagina = lojasFiltradas.slice((paginaAtual -1) * POR_PAGINA, paginaAtual * POR_PAGINA);

    return (
      <main className="min-h-screen bg-[#F6F3E4]">
            <Navbar />

            <section className="bg-black">
                <div className="mx-auto max-w-360 px-6 pt-8 pb-14 lg:px-18">
                    <h1 className="text-3xl font-semibold text-white lg:text-4xl">Categoria</h1>
                    <div className="mt-8 flex w-full gap-10 overflow-x-auto pb-2 [scrollbar-width:none]">
                        <CategoriasFeed />
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-360 px-6 pt-8 pb-24 lg:px-18">
                <div className="flex justify-end">
                    <div className="relative w-full max-w-110">
                        <input
                            type="search"
                            placeholder="Procurar por..."
                            aria-label="Pesquisar lojas"
                            value={pesquisa}
                            onChange={(e) => pesquisar(e.target.value)}
                            className="w-full rounded-full bg-white px-6 py-3 pr-14 text-black placeholder:text-[#B496FF] outline-none focus:ring-2 focus:ring-[#6A38F3]"
                        />
                        <Image
                            src="/search-icon.svg"
                            alt=""
                            width={24}
                            height={24}
                            className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2"
                        />
                    </div>
                </div>

                <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-3xl font-semibold text-black lg:text-4xl">Lojas</h2>
                    <div className="w-full sm:max-w-110">
                        <FiltroLojas
                            categorias={estado.status === "ok" ? estado.categorias : []}
                            onSelecionadasChange={filtrar}
                        />
                    </div>
                </div>

                {estado.status === "carregando" && (
                    <p className="mt-12 text-center text-black">Carregando lojas...</p>
                )}

                {estado.status === "erro" && (
                    <p className="mt-12 text-center text-red-600">Não foi possível carregar as lojas.</p>
                )}

                {estado.status === "ok" && lojasFiltradas.length === 0 && (
                    <p className="mt-12 text-center text-black">Nenhuma loja encontrada.</p>
                )}

                <ul className="mt-12 grid grid-cols-2 justify-items-center gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
                    {daPagina.map((loja) => (
                        <li key={loja.id}>
                            <Link
                                href={`/lojas/${loja.id}`}
                                className="block rounded-3xl transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-[#6A38F3]"
                            >
                                <LojaCard name={loja.name} logo_url={loja.logo_url} category={loja.category} />
                            </Link>
                        </li>
                    ))}
                </ul>

                <Paginacao paginaAtual={paginaAtual} totalPaginas={totalPaginas} onMudar={setPagina} />
            </section>
        </main>  
    );
}