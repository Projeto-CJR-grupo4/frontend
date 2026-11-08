import Image from "next/image"

const produtos = [
    { nome: "Bronzer", preco: 254.99, disponivel: true, img: "/images/bronzer.svg" },
    { nome: "Blush", preco: 199.99, disponivel: false, img: "/images/blush.svg" },
    { nome: "Perfume Rare", preco: 599.90, disponivel: true, img: "/images/perfume_rare.svg" },
    { nome: "Iluminador", preco: 249.99, disponivel: true, img: "/images/iluminador.svg" },
    { nome: "Mini Blush", preco: 99.99, disponivel: false, img: "/images/mini_blush.svg" },
    { nome: "Lapis Labial", preco: 139.90, disponivel: true, img: "/images/lapis_labial.svg" },
    { nome: "Primer", preco: 259.90, disponivel: true, img: "/images/primer.svg" }
]

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

                    <div className="flex gap-6 overflow-x-auto snp-x snp-mandatory pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

                    </div>

                </section>
        </main>
    )
}