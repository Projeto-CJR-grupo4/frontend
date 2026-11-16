import { apiClient } from "@/lib/axios";

export type ProductStore = {
    id: number;
    name: string;
    price: string;
    stock: number;
    images: { id: number; image_url: string; order: number }[];
    productRatings: { rating: number }[];
};

export type ReviewStore = {
    id: number;
    rating: number;
    comment: string | null;
    user: { id: number; name: string; username: string;
        profile_picture_url: string | null };
};

export async function getProductsStore(lojaId: number) {
    const res = await apiClient.get<ProductStore[]>("/produtos", {params: { storeId: lojaId}});
    return res.data;
}

export async function getReviewsStore(lojaId: number) {
    const res = await apiClient.get<ReviewStore[]>("/store-ratings", {params: { storeId: lojaId}});
    return res.data;
}

export function media(notas: number[]) {
    if (notas.length === 0) return 0;
        return notas.reduce((soma, n) => soma + n, 0) / notas.length;
}        

export function formatPrice(price: string) {
    return Number(price).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}