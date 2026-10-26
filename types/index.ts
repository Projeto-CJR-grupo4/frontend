export type Categoria = {
    id: number;
    nome: string;
};

export type Loja = {
    id: number;
    nome: string;
    descricao: string | null;
};

export type Produto = {
  id: number;
  nome: string;
  descricao: string | null;
  preco: number;
  estoque: number;
  lojaId: number;
  categoriaId: number;
  loja?: Loja;
  categoria?: Categoria;
};