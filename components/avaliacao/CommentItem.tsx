'use client';
import { Pencil } from 'lucide-react';
import { avatarUrl } from '@/lib/avatar';
import { timeAgo } from '@/lib/timeAgo';
import type { ReviewComment } from '@/lib/reviews';

type Props = {
    comment: ReviewComment;
    canEdit: boolean;
    onEdit: (comment: ReviewComment) => void;
};

export default function CommentItem({ comment, canEdit, onEdit }: Props) {
    return (
        <article className="flex items-start gap-3">
            <img
                src={avatarUrl(comment.user.profile_picture_url)}
                alt={comment.user.name}
                className="h-10 w-10 shrink-0 rounded-full object-cover"
            />

            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                    <h3 className="font-medium text-black">{comment.user.name}</h3>
                    <span className="text-xs text-gray-500">{timeAgo(comment.createdAt)}</span>
                </div>
                {comment.is_store_owner && (
                    <span className="block text-[10px] leading-none text-[#6A38F3]">dono da loja</span>
                )}
                <p className="mt-1 text-sm text-gray-700">{comment.content}</p>
            </div>

            {canEdit && (
                <button
                    type="button"
                    aria-label="Editar comentário"
                    onClick={() => onEdit(comment)}
                    className="cursor-pointer text-gray-600 transition hover:opacity-70"
                >
                    <Pencil size={16} />
                </button>
            )}
        </article>
    );
}