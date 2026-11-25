import axios from "axios";
import { apiClient } from "@/lib/axios";

export type ProductStore = {
    id: number;
    name: string;
    description: string | null;
    price: string;
    stock: number;
    category_id: number;
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

export type Categoria = {
    id: number;
    name: string;
    parent_category_id: number | null;
};

export type DadosProduto = {
    name: string;
    description: string;
    price: number;
    stock: number;
    category_id: number;
};

export async function getProductsStore(lojaId: number) {
    const res = await apiClient.get<ProductStore[]>("/produtos", {params: { storeId: lojaId}});
    return res.data;
}

export async function getReviewsStore(lojaId: number) {
    const res = await apiClient.get<ReviewStore[]>("/store-ratings", {params: { storeId: lojaId}});
    return res.data;
}
export async function createStoreRating(
    lojaId: number,
    nota: number,
    comentario: string
) {
    await apiClient.post("/store-ratings", {
        store_id: lojaId,
        rating: nota,
        comment: comentario
    });
}

export async function getCategorias() {
    const res = await apiClient.get<Categoria[]>("/categorias");
    return res.data;
}

export async function createProduct(lojaId: number, dados: DadosProduto) {
    const res = await apiClient.post<{ id: number }>("/produtos", {...dados, store_id: lojaId});
    return res.data;
}

export async function updateProduct(id: number, dados: DadosProduto) {
    await apiClient.patch(`/produtos/${id}`, dados);
}

export async function deleteProduct(id: number) {
    await apiClient.delete(`/produtos/${id}`);
}

export async function  uploadProductImage(id: number, arquivos: File[]) {
    const form = new FormData();
    arquivos.forEach((arquivo) => form.append("files", arquivo));
    await apiClient.post(`/produtos/${id}/imagens`, form, { headers: { "Content-Type": undefined }});
}

export async function deleteProductImage(produtoId: number, imagemId: number) {
    await apiClient.delete(`/produtos/${produtoId}/imagens/${imagemId}`);
}

export function mensagemDeErro(erro: unknown, padrao: string) {
    if (axios.isAxiosError(erro)) {
        const mensagem = erro.response?.data?.message;
        if (Array.isArray(mensagem)) return mensagem[0];
        if (typeof mensagem === "string") return mensagem;
    }
    return padrao;
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