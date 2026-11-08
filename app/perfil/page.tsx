import Image from "next/image"

const produtos = [
    { nome: "Bronzer", preco: 254.99, disponivel: true, img: "/images/bronzer.svg" },
    { nome: "Blush", preco: 199.99, disponivel: false, img: "/images/blush.svg" },
    { nome: "Perfume Rare", preco: 599.90, disponivel: true, img: "/images/perfume_rare.svg" },
    { nome: "Iluminador", preco: 249.99, disponivel: true, img: "/images/iluminador.svg" },
    { nome: "Mini Blush", preco: 99.99, disponivel: false, img: "/images/mini_blush.svg" },
    { nome: "Lapis Labial", preco: 139.90, disponivel: true, img: "/images/lapis_labial.svg" },
    { nome: "Primer", preco: 259.90, disponivel: true, img: "/images/primer.svg" },
];

export default function Perfil() {
    return(
        <main className="bg-[#F6F3E4]">
                <div className="bg-[#000000] h-[357.25px] mt-[79.88px]"></div>
                <div className="h-[230px] w-[230px] bg-white mt-[-150px] ml-[180px] rounded-full"></div>
                <h1 className="text-[#000000] text-5xl ml-[180px] mt-4 font-bold">Selena Gomez</h1>
                <h2 className="text-gray-400 text-2xl ml-[180px] mt-3" >@ selenagomez</h2>
                <h3 className="text-gray-400 text-2xl ml-[180px] mt-3">selenamariegomez@rare.com</h3> 
                
                <div className="mt-[-200px] flex justify-end px-30">
                    <button 
                    type="submit"
                    className="bg-[#6A38F3] h-[46px] w-[324px] rounded-4xl shadow-md shadow-gray-500 hover:bg-purple-700">
                        <p className="text-white text-xl">Editar Perfil</p>
                    </button>
                </div>

                <section className="px-5 py-51">
                    <div className="mb-8 flex items-center justify-between">
                        <h2 className="ml-24 text-[#000000] text-3xl font-semibold">Produtos</h2>
                        <a href="#" className="mr-30 text-sm font-bold text-[#6A38F3] hover:underline">
                            ver mais
                        </a>
                    </div>

                    <div className="flex gap-6 ml-25 overflow-x-auto snp-x snp-mandatory pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {produtos.map((p) =>(
                                <article 
                                    key={p.nome}
                                    className="relative w-[182px] shrink-0 snap-start rounded-[2rem] bg-white p-4 pt-3"
                                >
                                    <div className="flex h-[160px] items-center justify-center">
                                        <img src={p.img} alt={p.nome} className="h-full  object-contain scale-110" />
                                    </div>
                                    <div className="absolute right-2 top-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#FDF1EC]">
                                        <Image
                                            src="/images/selo_rare.png"
                                            alt="Rare Beauty"
                                            width={64}
                                            height={64}
                                            className="h-full w-full object-contain scale-125"
                                        />
                                    </div>

                                    <h3 className="mt-6 text-xl text-[#000000] font-semibold">{p.nome}</h3>
                                    <p className="text-xl text-[#000000] font-semibold">
                                        {p.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                                    </p>
                                    <span
                                        className={`text-xs font-semibold uppercase ${
                                            p.disponivel? "text-lime-500" : "text-red-500"
                                        }`}
                                    >
                                        {p.disponivel ? "Disponível" : "Indisponível"}
                                    </span>
                                </article>
                                ))}
                    </div>

                </section>
        </main>
    )
}