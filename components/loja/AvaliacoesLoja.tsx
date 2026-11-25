'use client';
import { useEffect, useState } from "react";
import { Estrelas } from "./Estrelas";
import { getReviewsStore, media, type ReviewStore } from "@/lib/loja";
import ModalAvaliacao from "./ModalAvaliacao";
function fotoDe(url: string | null) {
    return url && (url.startsWith("http") || url.startsWith("/")) ? url : "/images/foto_de_perfil.png";
}

type ReviewsStoreProps = {
    lojaId: number;
    nomeLoja: string;
    logado: boolean;
};

export default function ReviewsStore({
    lojaId,
    nomeLoja,
    logado
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
            {logado && (
                <button
                    type="button"
                    onClick={() => setModalAberto(true)}
                    className="mt-12 w-full max-w-4xl cursor-pointer rounded-full bg-[#6A38F3] py-3 text-2xl text-white hover:brightness-110 md:text-4xl"
                >
                    Adicionar Review
                </button>
            )}

            {reviews.length === 0 ? (
                <p className="mt-6 text-gray-400">Esta loja ainda não tem avaliações.</p>
            ) : (
                <>
                    <p className="mt-6 text-5xl md:text-6xl">{notaMedia.toFixed(2)}</p>
                    <div className="mt-4 flex justify-center">
                        <Estrelas nota={notaMedia} className="h-10 w-10" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <a href="#" className="text-[#6A38F3] hover:underline">ver mais</a>
                    </div>

                    <div className="mt-4 flex snap-x gap-6 overflow-x-auto pb-4 text-left [scrollbar-width:none]">
                        {reviews.map((a) => (
                            <article
                                key={a.id}
                                className="flex w-[85%] shrink-0 snap-start gap-6 rounded-[35px] bg-[#F6F3E4] p-6 text-black md:w-[720px]"
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
                                    <a href="#" className="mt-auto self-end text-[#6A38F3] hover:underline">ver mais</a>
                                </div>
                            </article>
                        ))}
                    </div>
                </>
            )}
            {logado && modalAberto && (
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