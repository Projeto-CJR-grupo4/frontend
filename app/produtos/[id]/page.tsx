"use client";
import { userViewer } from "@/hooks/userViewer";
import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Pencil } from "lucide-react";
import Navbar from "@/components/Navbar";
import { apiClient } from "@/lib/axios";
import Image from "next/image";
import ProdutosMesmaLoja from "@/components/ProdutosMesmaLoja";
import ModalProduto from "@/components/loja/ModalProduto";
import axios from "axios";
type Produto = {
    id: number;
    category_id: number;
    name: string;
    description: string | null;
    price: string;
    stock: number;
    category: {
        id: number;
        name: string;
    };
    images: {
        id: number;
        image_url: string;
        order: number;
    }[];
    store: {
        id: number;
        name: string;
        logo_url: string | null;
        user_id: number;
        category_id: number;
    };
    productRatings: {
        rating: number;
    }[];
};

function ConteudoProduto() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const { viewer } = userViewer();
    const [produto, setProduto] = useState<Produto | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(false);
    const [imagemSelecionada, setImagemSelecionada] = useState(0);
    const [modalEditarAberto, setModalEditarAberto] = useState(false);

    useEffect(() => {
        let cancelado = false;

        setCarregando(true);
        setErro(false);

        apiClient.get<Produto>(`/produtos/${id}`)
            .then((resposta) => {
                if (!cancelado) {
                    setProduto(resposta.data);
                    setImagemSelecionada(0);
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
    const avaliacoes = produto?.productRatings ?? [];

    const quantidadeAvaliacoes = avaliacoes.length;

    const notaMedia = quantidadeAvaliacoes > 0
        ? avaliacoes.reduce((soma, avaliacao) => soma + avaliacao.rating, 0) / quantidadeAvaliacoes
        : 0;
    const ehDono = produto !== null &&
        viewer !== null &&
        viewer.id === produto.store.user_id;
    async function atualizarAposSalvar() {
        if (!produto) return;

        try {
            const resposta = await apiClient.get<Produto>(`/produtos/${produto.id}`);

            setProduto(resposta.data);
            setImagemSelecionada(0);
        } catch (erro) {
            if (axios.isAxiosError(erro) && erro.response?.status === 404) {
                router.replace(`/lojas/${produto.store.id}`);
            } else {
                console.error("Erro ao atualizar produto:", erro);
            }
        }
    }
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
                        <div className="flex flex-col gap-8 lg:flex-row">
                            <div className="w-full lg:w-1/2">
                                {produto.images.length > 0 ? (
                                    <div className=" flex flex-col gap-4 md:flex-row">
                                        <button
                                            type="button"
                                            onClick={() => router.back()}
                                            aria-label="Voltar"
                                            className="flex h-10 w-10 shrink-0 items-center justify-center text-black hover:text-[#6A38F3]"
                                        >
                                            <ChevronLeft size={36} strokeWidth={2} />
                                        </button>

                                        <div className="flex gap-3 overflow-x-auto md:w-28 md:shrink-0 md:flex-col md:overflow-visible">
                                            {produto.images.map((imagem, indice) => (
                                                <button
                                                    key={imagem.id}
                                                    type="button"
                                                    onClick={() => setImagemSelecionada(indice)}
                                                    aria-label={`Visualizar imagem ${indice + 1} de ${produto.name}`}
                                                    aria-pressed={imagemSelecionada === indice}
                                                    className={`flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 bg-white md:h-28 md:w-28 ${imagemSelecionada === indice
                                                        ? "border-[#6A38F3]"
                                                        : "border-transparent"
                                                        }`}
                                                >
                                                    <Image
                                                        src={imagem.image_url}
                                                        alt={`${produto.name} - imagem ${indice + 1}`}
                                                        width={112}
                                                        height={112}
                                                        className="h-full w-full object-contain p-2"
                                                    />
                                                </button>
                                            ))}
                                        </div>


                                        <div className="relative flex h-80 min-w-0 flex-1 items-center justify-center rounded-3xl bg-white md:h-[520px]">

                                            <Image
                                                src={
                                                    produto.images[imagemSelecionada]?.image_url ??
                                                    produto.images[0].image_url
                                                }
                                                alt={produto.name}
                                                width={480}
                                                height={480}
                                                className="h-full w-full object-contain p-6"
                                            />


                                            {produto.store.logo_url && (
                                                <Image
                                                    src={produto.store.logo_url}
                                                    alt={`Logo da loja ${produto.store.name}`}
                                                    width={64}
                                                    height={64}
                                                    className="absolute right-4 top-4 h-16 w-16 rounded-full object-contain"
                                                />
                                            )}

                                        </div>
                                    </div>
                                ) : (
                                    <p>Produto sem imagem.</p>
                                )}
                            </div>
                            <div className="w-full lg:w-1/2">
                                <div className="flex items-center gap-4">
                                    <h1 className="text-3xl font-semibold">
                                        {produto.name}
                                    </h1>

                                    {ehDono && (
                                        <button
                                            type="button"
                                            onClick={() => setModalEditarAberto(true)}
                                            aria-label="Editar produto"
                                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#6A38F3] text-white hover:brightness-110"
                                        >
                                            <Pencil size={18} />
                                        </button>
                                    )}
                                </div>

                                <div className="mt-2 flex flex-wrap items-center gap-6 text-sm">

                                    {quantidadeAvaliacoes > 0 ? (
                                        <span className="flex items-center gap-1">
                                            <span className="text-yellow-400">★</span>
                                            {notaMedia.toFixed(1)} | {quantidadeAvaliacoes} reviews
                                        </span>
                                    ) : (
                                        <span className="text-gray-500">Sem avaliações</span>
                                    )}

                                    <span className="text-[#6A38F3]">
                                        {produto.category.name}
                                    </span>

                                    <span className="text-[#6A38F3]">
                                        {produto.stock > 0
                                            ? `${produto.stock} disponíveis`
                                            : "Indisponível"}
                                    </span>

                                </div>
                                <p className="mt-4 text-4xl font-semibold">
                                    {Number(produto.price).toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL"
                                    })}
                                </p>

                                <div className="mt-8">
                                    <h2 className="text-xl font-medium">
                                        Descrição
                                    </h2>

                                    <p className="mt-3 whitespace-pre-line text-sm">
                                        {produto.description ?? "Sem descrição"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <ProdutosMesmaLoja
                            lojaId={produto.store.id}
                            produtoAtualId={produto.id}
                            logoLoja={produto.store.logo_url}

                        />
                        {ehDono && modalEditarAberto && (
                            <ModalProduto
                                lojaId={produto.store.id}
                                categoriaLojaId={produto.store.category_id}
                                produto={produto}
                                onClose={() => setModalEditarAberto(false)}
                                onSalvo={atualizarAposSalvar}
                            />
                        )}
                    </>
                )}
            </section>
        </main>
    );
}
export default function ProdutoPage() {
    return (
        <Suspense fallback={<p>Carregando página...</p>}>
            <ConteudoProduto />
        </Suspense>
    );
}