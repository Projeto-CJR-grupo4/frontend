const API = process.env.NEXT_PUBLIC_API_URL;

export type Store = {
    id: number;
    name: string;
    logo_url: string | null;
    category: { id: number; name: string };
};

export type Product = {
    id: number;
    name: string;
    price: string;
    stock: number;
    images: { id: number; image_url: string; order: number }[];
    store: { id: number; name: string; logo_url: string | null };
};

export type StoreReview = {
    id: number;
    rating: number;
    comment: string | null;
    createdAt: string;
    store: { id: number; name: string }
};

export type ProductReview = {
    id: number;
    rating: number;
    comment: string | null;
    createdAt: string;
    product: { id: number; name: string; store: { id: number; name: string } };
};

async function get<T>(path: string): Promise <T> {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API}${path}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if(!res.ok) throw new Error(`Erro ${res.status} em ${path}`);
    return res.json();
}

export const getStores = (userId: number) => get<Store[]>(`/lojas?userId=${userId}`);
export const getProducts = (userId: number) => get<Product[]>(`/produtos?userId=${userId}`);
export const getStoreReviews = (userId: number) => get<StoreReview[]>(`/store-ratings?userId=${userId}`);
export const getProductReviews = (userId: number) => get<ProductReview[]>(`/product-ratings?userId=${userId}`);

export type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    profile_picture_url: string | null
    createdAt: string;
    updatedAt: string;
};

async function send<T>(method:'PATCH' | 'DELETE', path: string, body?: unknown): Promise<T> {
    const token = localStorage.getItem('token');
    const ehArquivo = body instanceof FormData
    const res = await fetch(`${API}${path}`, {
        method,
        headers: {
            ...(body && !ehArquivo ? { 'Content-Type': 'application/json' } : {}),
            ...(token ? { Authorization: `Bearer ${token}` }: {}),
        },
        body: body ? (ehArquivo ? (body as FormData) : JSON.stringify(body)) : undefined,
    });

    const data = await res.json().catch(()=> null);

    if(!res.ok) {
        const msg = Array.isArray(data?.message) ? data.message.join(', ') : data?.message;
        throw new Error(msg || `Erro ${res.status} em ${path}`);
    }
    return data as T;
}

export const updateMe = (data: {
    name?: string;
    username?: string;
    email?: string;
    profilePictureUrl?: string;
}) => send<User>('PATCH', '/user/me', data);

export const uploadAvatar = (file: File) => {
    const form = new FormData();
    form.append('file', file);
    return send<User>('PATCH', '/user/me/avatar', form);
};

export const changePassword = (data: { oldPassword: string; newPasswrod: string }) => 
    send<{ message: string }>('PATCH', '/user/me/password', data);

export const deleteMe = () => send<unknown>('DELETE', '/user/me');