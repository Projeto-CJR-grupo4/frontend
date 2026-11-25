import { get, send } from './profile';

export type ReviewType = 'loja' | 'produto';

export type ReviewUser = {
    id: number;
    name: string;
    username: string;
    profile_picture_url: string | null;
};

export type ReviewComment = {
    id: number;
    user_id: number;
    content: string;
    createdAt: string;
    is_store_owner: boolean;
    user: ReviewUser;
};

export type ReviewDetail = {
    id: number;
    user_id: number;
    rating: number;
    comment: string | null;
    createdAt: string;
    user: ReviewUser;
    comments: ReviewComment[];
};

const base = (type: ReviewType) =>
    type === 'loja' ? '/store-ratings' : '/product-ratings';

export const getReview = (type: ReviewType, id: number) =>
    get<ReviewDetail>(`${base(type)}/${id}`);

export const updateReview = (
    type: ReviewType,
    id: number,
    data: { rating?: number; comment?: string },
) => send<unknown>('PATCH', `${base(type)}/${id}`, data);

export const createComment = (type: ReviewType, ratingId: number, content: string) =>
    send<unknown>('POST', '/rating-comments', {
        content,
        ...(type === 'loja'
            ? { store_rating_id: ratingId }
            : { product_rating_id: ratingId }),
    });

export const updateComment = (id: number, content: string) =>
    send<unknown>('PATCH', `/rating-comments/${id}`, { content });