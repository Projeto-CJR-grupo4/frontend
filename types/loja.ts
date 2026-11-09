export type Loja = {
    id: number;
    user_id: number;
    name: string;
    description: string | null;
    banner_url: string | null;
    category: { name: string };
    user: { name: string };
};    
