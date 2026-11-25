'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import { Estrelas } from "./Estrelas";
import { getReviewsStore, media, type ReviewStore } from "@/lib/loja";
import ModalAvaliacao from "./ModalAvaliacao";
import Link from "next/link";
function fotoDe(url: string | null) {
    return url && (url.startsWith("http") || url.startsWith("/")) ? url : "/images/foto_de_perfil.png";
}

type ReviewsStoreProps = {
    lojaId: number;
    nomeLoja: string;
    logado: boolean;
    paginaCompleta?: boolean;
};

export default function ReviewsStore({
    lojaId,
    nomeLoja,
    logado,
    paginaCompleta = false
}: ReviewsStoreProps) {
    const [reviews, setReviews] = useState<ReviewStore[]>([]);
    const [modalAberto, setModalAberto] = useState(false);

    useEffect(() => {
        let cancelado = false;
        getReviewsStore(lojaId)
            .then((dados) => { if (!cancelado) setReviews(dados); })
            .catch(console.error);
        return () => { cancelado = true; };
    }, [lojaId]);
    async function atualizarAvaliacoes() {
        try {
            const dados = await getReviewsStore(lojaId);
            setReviews(dados);
        } catch (erro) {
            console.error(erro);
        }
    }

    const notaMedia = media(reviews.map((r) => r.rating));

    return (
        <section className="mx-auto max-w-6xl px-4 py-12 text-center text-[#F6F3E4]">
            <h2 className="text-3xl md:text-5xl">Reviews e Comentários</h2>
            <p className="mt-6 text-5xl md:text-6xl">{notaMedia.toFixed(2)}</p>
            <div className="mt-4 flex justify-center">
                <Estrelas nota={notaMedia} className="h-10 w-10" />
            </div>

            {paginaCompleta && logado && (
                <button
                    type="button"
                    onClick={() => setModalAberto(true)}
                    className="mt-12 w-full max-w-4xl cursor-pointer rounded-full bg-[#6A38F3] py-3 text-2xl text-white hover:brightness-110 md:text-4xl"
                >
                    Adicionar Review
                </button>
            )}
            {!paginaCompleta && (
                <div className="mt-6 flex justify-end">
                    <Link
                        href={`/lojas/${lojaId}/avaliacoes`}
                        className="text-[#6A38F3] hover:underline"
                    >
                        {reviews.length === 0 ? "ver avaliações" : "ver mais"}
                    </Link>
                </div>
            )}
            {reviews.length === 0 ? (
                <p className="mt-6 text-gray-400">Esta loja ainda não tem avaliações.</p>
            ) : (
                <>

                    <div className={`mt-4 flex gap-6 pb-4 text-left ${paginaCompleta
                        ? "flex-col items-center"
                        : "snap-x overflow-x-auto [scrollbar-width:none]"
                        }`}>
                        {reviews.map((a) => (
                            <article
                                key={a.id}
                                className={`flex gap-6 rounded-[35px] bg-[#F6F3E4] p-6 text-black ${paginaCompleta
                                    ? "w-full max-w-4xl"
                                    : "w-[85%] shrink-0 snap-start md:w-[720px]"
                                    }`}
                            >
                                <img
                                    src={fotoDe(a.user.profile_picture_url)}
                                    alt={a.user.name}
                                    className="h-20 w-20 shrink-0 rounded-full object-cover md:h-28 md:w-28"
                                />
                                <div className="flex min-w-0 flex-1 flex-col">
                                    <div className="flex items-center justify-between gap-4">
                                        <h3 className="truncate text-xl md:text-2xl">{a.user.name}</h3>
                                        <Estrelas nota={a.rating} />
                                    </div>
                                    <p className="mt-2 line-clamp-3 text-lg">{a.comment}</p>
                                    <Link
                                        href={`/avaliacoes/loja/${a.id}`}
                                        className="mt-auto self-end pt-3 text-sm text-[#6A38F3] hover:underline"
                                    >
                                        ver mais
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </>
            )}
            {paginaCompleta && logado && modalAberto && (
                <ModalAvaliacao
                    lojaId={lojaId}
                    nomeLoja={nomeLoja}
                    onClose={() => setModalAberto(false)}
                    onSalvo={atualizarAvaliacoes}
                />
            )}
        </section>
    );
}