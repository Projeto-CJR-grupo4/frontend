import ProdutoCard from "./ProdutoCard";

type Produto = {
    id: number;
    nome: string;
    imagem: string;
    logo: string;
    preco: string;
    disponivel: boolean;
    porKg?: boolean;
};

type SecaoProdutosProps = {
    categoria: string;
    produtos: Produto[];
};

export default function SecaoProdutos({
    categoria,
    produtos
}: SecaoProdutosProps) {
    return (
        <section className="mx-auto max-w-360 px-6 pt-16 lg:px-18">

            <div className="flex items-center justify-between">

                <h2 className="flex items-baseline gap-1">
                    <span className="text-3xl font-semibold text-black lg:text-4xl">
                        Produtos
                    </span>

                    <span className="text-sm text-black">
                        em
                    </span>

                    <span className="text-sm font-medium text-[#6A38F3]">
                        {categoria}
                    </span>
                </h2>

                <span className="text-sm font-medium text-[#6A38F3]">
                    ver mais
                </span>

            </div>

            <div className="mt-10 flex w-full max-w-330 gap-14 overflow-x-auto">
                {produtos.map((produto) => (
                    <ProdutoCard
                        key={produto.id}
                        nome={produto.nome}
                        imagem={produto.imagem}
                        logo={produto.logo}
                        preco={produto.preco}
                        disponivel={produto.disponivel}
                        porKg={produto.porKg}
                    />
                ))}
            </div>

        </section>
    );
}