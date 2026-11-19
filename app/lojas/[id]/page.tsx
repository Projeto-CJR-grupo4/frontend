'use client';
import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import BannerLoja from "@/components/loja/BannerLoja";
import ReviewsStore from "@/components/loja/AvaliacoesLoja"
import ProductsStore from "@/components/loja/ProdutosLoja"
import { userViewer } from "@/hooks/userViewer";
import { apiClient } from "@/lib/axios";
import type { Loja } from "@/types/loja"
import ModalLoja from "@/components/loja/ModalLoja";
import ModalProduto from "@/components/loja/ModalProduto";
import type { ProductStore } from "@/lib/loja";
import toast from "react-hot-toast";

type Categoria = {
    id: number;
    name: string;
};

type ModalProdutoAberto =
    | null
    | { tipo: "novo" }
    | { tipo: "editar"; produto: ProductStore };

type State =
    | { status: "carregando" }
    | { status: "erro" }
    | { status: "ok"; loja: Loja };

function ContentStore() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const { viewer } = userViewer();
    const [state, setState] = useState<State>({ status: "carregando" });
    const [modalEditarAberto, setModalEditarAberto] = useState(false);
    const [modalProduto, setModalProduto] = useState<ModalProdutoAberto>(null);
    const [atualizacaoProdutos, setAtualizacaoProdutos] = useState(0);
 
    useEffect(() => {
        let cancelado = false;
        apiClient
            .get<Loja>(`/lojas/${id}`)
            .then((res) => { if (!cancelado) setState({ status: "ok", loja: res.data }); })
            .catch(() => { if (!cancelado) setState({ status: "erro" }); })
        return () => { cancelado = true; };
    }, [id]);
    useEffect(() => {
        if (!modalEditarAberto) return;

        apiClient
            .get<Categoria[]>("/categorias")
            .then((res) => setCategorias(res.data))
            .catch((error) => console.error("Erro ao buscar categorias:", error));

    }, [modalEditarAberto]);

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
    async function atualizarLojaAposSalvar() {
        setModalEditarAberto(false);

        toast.success("Loja atualizada com sucesso!");
        try {
            const resposta = await apiClient.get<Loja>(`/lojas/${id}`);

            setState({
                status: "ok",
                loja: resposta.data,
            });
        } catch (error) {
            console.error("Erro ao atualizar dados da loja:", error);
        }
    }
    function aoDeletarLoja() {
        setModalEditarAberto(false);

        toast.success("Loja excluída com sucesso!");

        router.replace(`/perfil/${loja.user_id}`);
    }

    return (
        <>
            <BannerLoja
                loja={loja}
                ehDono={ehDono}
                onEditar={() => setModalEditarAberto(true)}
                onAdicionarProduto={() => setModalProduto({ tipo: "novo" })}
            />

            <ReviewsStore lojaId={loja.id} />

            <ProductsStore 
                lojaId={loja.id} 
                nomeLoja={loja.name}
                ehDono={ehDono}
                atualizacao={atualizacaoProdutos}
                onEditar={(produto) => setModalProduto({ tipo: "editar", produto })}
            />

            {ehDono && modalEditarAberto && (
                <ModalLoja
                    loja={loja}
                    categorias={categorias}
                    onClose={() => setModalEditarAberto(false)}
                    onSaved={atualizarLojaAposSalvar}
                    onDeleted={aoDeletarLoja}
                />
            )}

            {ehDono && modalProduto && (
                <ModalProduto
                    lojaId={loja.id}
                    categoriaLojaId={loja.category_id}
                    produto={modalProduto.tipo === "editar" ? modalProduto.produto : undefined}
                    onClose={() => setModalProduto(null)}
                    onSalvo={() => setAtualizacaoProdutos((n) => n + 1)}
                />
            )}
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