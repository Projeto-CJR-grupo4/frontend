'use client';
import { useCallback, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import ReviewHeader from '@/components/avaliacao/ReviewHeader';
import CommentItem from '@/components/avaliacao/CommentItem';
import CommentInput from '@/components/avaliacao/CommentInput';
import ModalAvaliacao from '@/components/loja/ModalAvaliacao';
import { userViewer } from '@/hooks/userViewer';
import {
    getReview, createComment,
    type ReviewDetail, type ReviewType,
    ReviewComment,
} from '@/lib/reviews';
import ModalEditarComentario from '@/components/avaliacao/ModalEditarComentario';

export default function AvaliacaoPage() {
    const { type, id } = useParams<{ type: ReviewType; id: string }>();
    const router = useRouter();
    const { viewer } = userViewer();

    const [review, setReview] = useState<ReviewDetail | null>(null);
    const [error, setError] = useState('');
    const [editandoAvaliacao, setEditandoAvaliacao] = useState(false);
    const [editandoComentario, setEditandoComentario] = useState<ReviewComment | null>(null);

    const load = useCallback(async () => {
        try {
            setReview(await getReview(type, Number(id)));
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Erro ao carregar avaliação');
        }
    }, [type, id]);

    useEffect(() => {
        if (type !== 'loja' && type !== 'produto') return;
        load();
    }, [type, load]);

    async function executar(acao: () => Promise<unknown>, msgOk: string) {
        try {
            await acao();
            await load();
            toast.success(msgOk);
            return true;
        } catch (e) {
            toast.error(e instanceof Error ? e.message : 'Algo deu errado');
            return false;
        }
    }

    if (type !== 'loja' && type !== 'produto') return <p>Tipo de avaliação inválido.</p>;
    if (error) return <p>{error}</p>;
    if (!review) return <p>Carregando...</p>;

    const nomeAlvo =
        (type === 'loja' ? review.store?.name : review.product?.name) ?? '';

    return (
        <main className="min-h-screen bg-[#F6F3E4]">
            <Navbar />

            <ReviewHeader
                review={review}
                canEdit={viewer?.id === review.user_id}
                onEdit={() => setEditandoAvaliacao(true)}
            />

            <section className="px-20 py-10">
                <div className="ml-16 flex flex-col gap-6 border-l border-black pl-8">
                    {review.comments.map((c) => (
                        <CommentItem
                            key={c.id}
                            comment={c}
                            canEdit={viewer?.id === c.user_id}
                            onEdit={setEditandoComentario}
                        />
                    ))}
                </div>

                {viewer && (
                    <CommentInput
                        onSend={(content) =>
                            executar(
                                () => createComment(type, review.id, content),
                                'Comentário enviado!',
                            )
                        }
                    />
                )}
            </section>

            {editandoAvaliacao && (
                <ModalAvaliacao
                    type={type}
                    nomeLoja={nomeAlvo}
                    avaliacao={{
                        id: review.id,
                        nota: review.rating,
                        comentario: review.comment ?? '',
                    }}
                    onClose={() => setEditandoAvaliacao(false)}
                    onSalvo={load}
                    onDeletado={() => router.back()}
                />
            )}

            {editandoComentario && (
                <ModalEditarComentario
                    comentarioId={editandoComentario.id}
                    conteudoInicial={editandoComentario.content}
                    onClose={() => setEditandoComentario(null)}
                    onSave={load}
                    onDelete={load}
                />
            )}
        </main>
    );
}