import Image from "next/image";
import SecaoProdutos from "@/components/SecaoProdutos";
import CategoriaCard from "@/components/CategoriaCard";
const categorias = [
  {
    id: 1,
    nome: "Mercado",
    icone: "/categorias/mercado.svg"
  },
  {
    id: 2,
    nome: "Farmácia",
    icone: "/categorias/farmacia.svg"
  },
  {
    id: 3,
    nome: "Beleza",
    icone: "/categorias/beleza.svg"
  },
  {
    id: 4,
    nome: "Moda",
    icone: "/categorias/moda.svg"
  },
  {
    id: 5,
    nome: "Eletrônicos",
    icone: "/categorias/eletronicos.svg"
  },
  {
    id: 6,
    nome: "Jogos",
    icone: "/categorias/jogos.svg"
  },
  {
    id: 7,
    nome: "Brinquedos",
    icone: "/categorias/brinquedos.svg"
  },
  {
    id: 8,
    nome: "Casa",
    icone: "/categorias/casa.svg"
  }
];
const produtosMercado = [
  {
    id: 1,
    nome: "Brownie Meio A.",
    imagem: "/produtos/brownie-meio-amargo.png",
    logo: "/lojas/cjr.svg",
    preco: "R$4,70",
    disponivel: true
  },
  {
    id: 2,
    nome: "Brownie Trad.",
    imagem: "/produtos/brownie-tradicional.png",
    logo: "/lojas/cjr.svg",
    preco: "R$3,80",
    disponivel: false
  },
  {
    id: 4,
    nome: "Banana",
    imagem: "/produtos/banana.png",
    logo: "/lojas/maumar.svg",
    preco: "R$3,99",
    disponivel: true,
    porKg: true
  },
  {
    id: 5,
    nome: "Limão Siciliano",
    imagem: "/produtos/limao-siciliano.png",
    logo: "/lojas/maumar.svg",
    preco: "R$17,99",
    disponivel: false,
    porKg: true
  },
  {
    id: 6,
    nome: "Redbull",
    imagem: "/produtos/redbull.png",
    logo: "/lojas/cjr.svg",
    preco: "R$5,41",
    disponivel: true
  }
];
const produtosBeleza = [
  {
    id: 1,
    nome: "Limpador Facial",
    imagem: "/produtos/limpador-facial.png",
    logo: "/lojas/creamy.svg",
    preco: "R$74,99",
    disponivel: true
  },
  {
    id: 2,
    nome: "Blush",
    imagem: "/produtos/blush.png",
    logo: "/lojas/rare-beauty.svg",
    preco: "R$199,99",
    disponivel: false
  },
  {
    id: 3,
    nome: "Sérum Facial",
    imagem: "/produtos/serum-facial.png",
    logo: "/lojas/creamy.svg",
    preco: "R$99,90",
    disponivel: true
  },
  {
    id: 4,
    nome: "Iluminador",
    imagem: "/produtos/iluminador.png",
    logo: "/lojas/rare-beauty.svg",
    preco: "R$249,90",
    disponivel: true
  },
  {
    id: 5,
    nome: "Body Splash",
    imagem: "/produtos/body-splash.png",
    logo: "/lojas/roots.svg",
    preco: "R$179,99",
    disponivel: false
  }
];
export default function Home() {
  return (
    <main className="min-h-screen bg-[#F6F3E4]">

      <section className="bg-black lg:h-125 lg:overflow-hidden">
        <div className="mx-auto flex max-w-360 flex-col items-center justify-between gap-8 px-6 py-10 lg:h-full lg:flex-row lg:px-18 lg:py-0">
          <h1 className="max-w-2xl text-center text-4xl font-bold leading-tight text-white lg:text-5xl">
            Do CAOS à organização,
            <br />
            em alguns cliques
          </h1>

          <Image
            src="/stocklee-banner.svg"
            alt="Personagem StockLee com caixas"
            width={550}
            height={500}
            className="h-auto w-full max-w-137.5 lg:self-start"
          />

        </div>
      </section>
      <section className="mx-auto max-w-360 px-6 pt-8 lg:px-18">

        <div className="flex justify-end">
          <div className="relative w-full max-w-150">
            <input
              type="search"
              placeholder="Procurar por..."
              aria-label="Pesquisar produtos"
              className="w-full rounded-full bg-white px-6 py-3 pr-14 text-black placeholder:text-[#B496FF] outline-none focus:ring-2 focus:ring-[#6A38F3]"
            />

            <Image
              src="/search-icon.svg"
              alt=""
              width={24}
              height={24}
              className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2"
            />
          </div>
        </div>

      </section>
      <section className="mx-auto max-w-360 px-6 pt-4 lg:px-18">
        <h2 className="text-3xl font-semibold text-black lg:text-4xl">
          Categoria
        </h2>
        <div className="mt-10 flex w-full max-w-330 gap-16 overflow-x-auto">
          {categorias.map((categoria) => (
            <CategoriaCard
              key={categoria.id}
              nome={categoria.nome}
              icone={categoria.icone}
            />
          ))}
        </div>
      </section>
      <SecaoProdutos
        categoria="Mercado"
        produtos={produtosMercado}
      />
      <SecaoProdutos
        categoria="Beleza"
        produtos={produtosBeleza}
      />


    </main>
  );
}