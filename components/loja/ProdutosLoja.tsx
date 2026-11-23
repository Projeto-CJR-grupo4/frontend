'use client'
import { useEffect, useState } from "react";
import ProdutoCard from "@/components/ProdutoCard";
import { getProductsStore, media, type ProductStore } from "@/lib/loja";

const POR_PAGINA = 15;

function Cabecalho({ complemento }: { complemento: string }) {
    return (
        <div className="flex items-baseline justify-between">
            <h2 className="text-black">
                <span className="text-3xl md:text-4xl">Produtos</span>{" "}
                <span className="text-sm">{complemento}</span>
            </h2>
            <a href="#" className="text-sm text-[#6A38F3] hover:underline">ver mais</a>
        </div>
    );
}

type CardProps = {
    produto: ProductStore;
    ehDono: boolean;
    onEditar: (produto: ProductStore) => void;
};

function Card({ produto }: CardProps) {
    const card = (
        <ProdutoCard
            id={produto.id}
            name={produto.name}
            image_url={produto.images[0]?.image_url ?? null}
            logo_url={null}
            price={produto.price}
            stock={produto.stock}
        />
    );

        return card;
}

type ProdutosLojaProps = { 
    lojaId: number; 
    nomeLoja: string;
    ehDono: boolean;
    atualizacao: number;
    onEditar: (produto: ProductStore) => void; 
};

export default function ProductsStore({ lojaId, nomeLoja, ehDono, atualizacao, onEditar }: ProdutosLojaProps) {
    const [products, setProducts] = useState<ProductStore[]>([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        let cancelado = false;
        getProductsStore(lojaId)
            .then((dados) => { if (!cancelado) setProducts(dados); })
            .catch(console.error);
        return () => { cancelado = true; };
    }, [lojaId, atualizacao]);

    const notaDe = (p: ProductStore) => media(p.productRatings.map((r) => r.rating));
    const melhores = [...products]
        .filter((p) => p.productRatings.length > 0)
        .sort((a, b) => notaDe(b) - notaDe(a))
        .slice(0,10);

    const totalPages = Math.max(1, Math.ceil(products.length / POR_PAGINA));
    const paginaAtual = Math.min(page, totalPages);
    const daPagina = products.slice((paginaAtual - 1) * POR_PAGINA, paginaAtual * POR_PAGINA);

    return (
          <section className="mx-auto max-w-[1440px] bg-[#F6F3E4] px-4 py-12 md:px-20">
            {melhores.length > 0 && (
                <div className="mb-12">
                    <Cabecalho complemento="melhor avaliados" />
                    <div className="mt-8 flex gap-6 overflow-x-auto pb-4 [scrollbar-width:none]">
                        {melhores.map((p) => <Card key={p.id} produto={p} ehDono={ehDono} onEditar={onEditar} />)}
                    </div>
                </div>
            )}

            <Cabecalho complemento={`de ${nomeLoja.toLowerCase()}`} />

            {products.length === 0 ? (
                <p className="mt-8 text-gray-600">Esta loja ainda não tem produtos.</p>
            ) : (
                <div className="mt-8 grid grid-cols-[repeat(auto-fill,229px)] justify-center gap-4">
                    {daPagina.map((p) => <Card key={p.id} produto={p} ehDono={ehDono} onEditar={onEditar} />)}
                </div>
            )}

            {totalPages > 1 && (
                <nav className="mt-10 flex items-center justify-center gap-6 text-3xl text-black" aria-label="Paginação">
                    <button type="button" aria-label="Página anterior" disabled={paginaAtual === 1}
                        onClick={() => setPage(paginaAtual - 1)} className="disabled:opacity-30">&lt;</button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                        <button key={n} type="button" onClick={() => setPage(n)}
                            aria-current={n === paginaAtual ? "page" : undefined}
                            className={n === paginaAtual ? "font-bold" : "font-light"}>{n}</button>
                    ))}
                    <button type="button" aria-label="Próxima página" disabled={paginaAtual === totalPages}
                        onClick={() => setPage(paginaAtual + 1)} className="disabled:opacity-30">&gt;</button>
                </nav>
            )}
        </section>
    );
}