const API = process.env.NEXT_PUBLIC_API_URL;

export type Store = {
    id: number;
    name: string;
    logo_url: string | null;
    category: { id: number; name: string };
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