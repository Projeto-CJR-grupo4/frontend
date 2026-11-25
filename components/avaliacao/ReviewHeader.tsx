'use client';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Pencil } from 'lucide-react';
import Stars from '@/components/Stars';
import { avatarUrl } from '@/lib/avatar';
import { timeAgo } from '@/lib/timeAgo';
import type { ReviewDetail } from '@/lib/reviews';

type Props = {
    review: ReviewDetail;
    canEdit: boolean;
    onEdit: () => void;
};

export default function ReviewHeader({ review, canEdit, onEdit }: Props) {
    const router = useRouter();

    return (
        <header className="bg-black px-20 pb-16 pt-10 text-white">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        aria-label="Voltar"
                        onClick={() => router.back()}
                        className="cursor-pointer transition hover:opacity-70 active:scale-95"
                    >
                        <ChevronLeft size={32} />
                    </button>
                    <img
                        src={avatarUrl(review.user.profile_picture_url)}
                        alt={review.user.name}
                        className="h-12 w-12 rounded-full object-cover"
                    />
                    <h1 className="text-xl">{review.user.name}</h1>
                    <span className="text-xs text-gray-400">{timeAgo(review.createdAt)}</span>
                </div>

                <div className="flex items-center gap-3">
                    <Stars value={review.rating} />
                    {canEdit && (
                        <button
                            type="button"
                            aria-label="Editar avaliação"
                            onClick={onEdit}
                            className="cursor-pointer transition hover:opacity-70"
                        >
                            <Pencil size={20} />
                        </button>
                    )}
                </div>
            </div>

            <p className="ml-20 mt-6">{review.comment}</p>
        </header>
    );
}