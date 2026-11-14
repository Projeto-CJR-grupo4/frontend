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