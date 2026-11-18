export type Loja = {
    id: number;
    user_id: number;
    name: string;
    category_id: number;
    description: string | null;
    banner_url: string | null;
    logo_url: string | null;
    sticker_url: string | null;
    category: { name: string };
    user: { id: number; name: string };
};