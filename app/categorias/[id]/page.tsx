'use client';
import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import ProdutoCard from "@/components/ProdutoCard";
import Paginacao from "@/components/Paginacao";
import { apiClient } from "@/lib/axios";

type Categoria = {
    id: number;
    name: string;
    icon_url: string | null;
    parent_category_id: number | null;
};

type ProdutoDaCategoria = {
    id: number;
    name: string;
    price: string;
    stock: number;
    createdAt: string;
    images: { image_url: string }[];
    store: { logo_url: string | null };
    category: Categoria;
};

type Estado = 
    | { status: "carregando" }
    | { status: "erro" }
    | { status: "ok"; categorias: Categoria[]; produtos: ProdutoDaCategoria[] };

type Ordem = "recentes" | "menor-preco" | "maior-preco" | "nome";

const POR_PAGINA = 15;

type Frase = { inicio: string; destaque: string; fim: string };
const FRASES: Record<string, Frase> = {"eletrônicos": { inicio: "O universo da", destaque: "tecnologia", fim: "em um só lugar" }};

function ordenar(produtos: ProdutoDaCategoria[], ordem: Ordem) {
    const copia = [...produtos];
    if (ordem === "menor-preco") return copia.sort((a, b) => Number(a.price) - Number(b.price));
    if (ordem === "maior-preco") return copia.sort((a, b) => Number(b.price) - Number (a.price));
    if (ordem === "nome") return copia.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
    return copia.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

function ConteudoCategoria() {
    const { id } = useParams<{ id: string }>();
    const categoriaId = Number(id);

    const [estado, setEstado] = useState<Estado>({ status: "carregando" });
    const [pesquisa, setPesquisa] = useState("");
    const [subSelecionadas, setSubSelecionadas] = useState<number[]>([]);
    const [ordem, setOrdem] = useState<Ordem>("recentes");
    const [pagina, setPagina] = useState(1);

    useEffect(() => {
        let cancelado = false;
        Promise.all([
            apiClient.get<Categoria[]>("/categorias"),
            apiClient.get<ProdutoDaCategoria[]>("/produtos"),
        ])
            .then(([categorias, produtos]) => {
                if (!cancelado) setEstado({ status: "ok", categorias: categorias.data, 
                    produtos: produtos.data });
            })
            .catch(() => { if (!cancelado) setEstado({ status: "erro" });});
        return () => { cancelado = true; };
    }, []);

    if (estado.status === "carregando") {
        return <p className="py-24 text-center text-black">Carregando categoria...</p>;
    }

    const categoria = estado.status === "ok"
        ? estado.categorias.find((c) => c.id === categoriaId)
        : undefined;
    
    if (estado.status === "erro" || !categoria) {
        return <p className="py-24 text-center text-black">Categoria não encontrada.</p>;
    }

    const subcategorias = estado.categorias.filter((c) => c.parent_category_id === categoria.id);
    
    const daCategoria = estado.produtos.filter((p) => p.category.id === categoria.id || 
p.category.parent_category_id === categoria.id);

    const termo = pesquisa.trim().toLowerCase();
    const filtrados = daCategoria.filter((p) => p.name.toLocaleLowerCase().includes(termo)
&& (subSelecionadas.length === 0 || subSelecionadas.includes(p.category.id)));
    const ordenados = ordenar(filtrados, ordem);

    const totalPaginas = Math.max(1, Math.ceil(ordenados.length / POR_PAGINA));
    const paginaAtual = Math.min(pagina, totalPaginas);
    const daPagina = ordenados.slice((paginaAtual - 1) * POR_PAGINA, paginaAtual * POR_PAGINA);

    function alternarSub(subId: number) {
        setSubSelecionadas((atuais) => atuais.includes(subId) ? atuais.filter((x) => x !== subId) : [...atuais, subId]);
        setPagina(1);
    }

    const frase = FRASES[categoria.name.toLocaleLowerCase()] ?? { inicio: "O melhor de", destaque: categoria.name, fim: "em um só lugar" };

    return (
         <>
            <section className="overflow-hidden bg-black">
                <div className="relative mx-auto h-[447px] max-w-360">
                    <h1 className="absolute inset-x-6 top-12 text-center text-4xl font-semibold leading-tight text-white lg:inset-x-auto lg:left-[150px] lg:top-[124px] lg:w-[804px] lg:text-right lg:text-[69.59px]">
                        {frase.inicio} <span className="font-bold">{frase.destaque}</span>
                        <br />
                        {frase.fim}
                    </h1>
                    <Image
                        src="/mascote-categoria.svg"
                        alt=""
                        width={297}
                        height={766}
                        className="absolute left-1/2 top-44 h-auto w-40 -translate-x-1/2 lg:left-[953px] lg:top-[22px] lg:w-[296px] lg:translate-x-0"
                    />
                </div>
            </section>

            <section className="mx-auto max-w-360 px-6 pt-8 pb-24 lg:px-18">
                <div className="flex justify-end">
                    <div className="relative w-full max-w-150">
                        <input
                            type="search"
                            placeholder="Procurar por..."
                            aria-label={`Pesquisar produtos de ${categoria.name}`}
                            value={pesquisa}
                            onChange={(e) => { setPesquisa(e.target.value); setPagina(1); }}
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

                <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-wrap gap-3" aria-label="Subcategorias">
                        {subcategorias.map((sub) => {
                            const ativa = subSelecionadas.includes(sub.id);
                            return (
                                <button
                                    key={sub.id}
                                    type="button"
                                    onClick={() => alternarSub(sub.id)}
                                    aria-pressed={ativa}
                                    className={`cursor-pointer rounded-full px-6 py-2 text-sm transition ${
                                        ativa ? "bg-[#6A38F3] text-white" : "bg-white text-[#B496FF] hover:text-[#6A38F3]"
                                    }`}
                                >
                                    {sub.name}
                                </button>
                            );
                        })}
                    </div>

                    <select
                        value={ordem}
                        onChange={(e) => { setOrdem(e.target.value as Ordem); setPagina(1); }}
                        aria-label="Ordenar produtos"
                        className="h-12 w-full cursor-pointer rounded-full bg-white px-6 text-lg text-[#B496FF] outline-none focus:ring-2 focus:ring-[#6A38F3] lg:max-w-110"
                    >
                        <option value="recentes">ordenar por: mais recentes</option>
                        <option value="menor-preco">menor preço</option>
                        <option value="maior-preco">maior preço</option>
                        <option value="nome">nome (A–Z)</option>
                    </select>
                </div>

                {ordenados.length === 0 ? (
                    <p className="mt-12 text-center text-black">Nenhum produto encontrado.</p>
                ) : (
                    <div className="mt-10 grid grid-cols-[repeat(auto-fill,229px)] justify-center gap-6">
                        {daPagina.map((p) => (
                            <ProdutoCard
                                key={p.id}
                                id={p.id}
                                name={p.name}
                                image_url={p.images[0]?.image_url ?? null}
                                logo_url={p.store.logo_url}
                                price={p.price}
                                stock={p.stock}
                            />
                        ))}
                    </div>
                )}

                <Paginacao paginaAtual={paginaAtual} totalPaginas={totalPaginas} onMudar={setPagina} />
            </section>
        </>
    );
}

export default function CategoriaPage() {
    return (
        <main className="min-h-screen bg-[#F6F3E4]">
            <Suspense fallback={<div className="min-h-23 bg-black" />}>
                <Navbar />
            </Suspense>
            <Suspense fallback={<p className="py-24 text-center text-black">Carregando categoria...</p>}>
                <ConteudoCategoria />
            </Suspense>
        </main>
    );
}
