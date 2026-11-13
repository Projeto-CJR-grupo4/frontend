'use client';

import { useEffect, useState } from "react";
import Image from "next/image"
import { ChevronLeft, Plus, Star } from "lucide-react"
import Navbar from "@/components/Navbar";
import { getStores, Store } from "@/lib/profile";

type Profile = {
    id: number;
    name: string;
    username: string;
    email: string;
    profile_picture_url: string | null;
    createdAt: string;
    updatedAt: string;
};

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
    const [profile, setProfile] = useState<Profile | null>(null);
    const [error, setError] = useState('');
    const [stores, setStores] = useState<Store[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
            if(!res.ok) throw new Error(`Erro ${res.status}`);
            return res.json();
        })
        .then(setProfile)
        .catch((e) => setError(e.message));
    }, []);

    useEffect(() => {
        if(!profile) return;

        Promise.all([
            getStores(profile.id),
        ])
            .then(([s]) => {
                setStores(s);
            })
            .catch((e) => console.error(e));
    }, [profile] );

    if(error) return <p>{error}</p>;
    if(!profile) return <p>Carregando...</p>;

    const avatar = profile.profile_picture_url?.startsWith('http')
    ? profile.profile_picture_url
    : '/default-avatar.png';

    return(
        <main className="bg-[#F6F3E4]">
            <Navbar />
                <div className="relative bg-[#000000] h-[310px]">
                    <a href="/" className="absolute left-20 top-[185px] cursor-pointer text-white transition hover:opacity-70 active:scale-95">
                        <ChevronLeft size={100}/>
                    </a>
                </div>
                <div className="relative z-10 h-[230px] w-[230px] bg-white mt-[-170px] ml-[180px] rounded-full">
                    <img
                        src={avatar}
                        alt="foto de perfil"
                        className="h-full w-full rounded-full object-cover"
                    />
                </div>
                <h1 className="text-[#000000] text-5xl ml-[180px] mt-4 font-bold">{profile.name}</h1>
                
                <h2 className="text-gray-400 text-2xl ml-[180px] mt-3" >@ {profile.username}</h2>

                <div className="ml-[180px] mt-3 flex items-center gap-2">
                  <Image src="/images/email-icon.svg" alt="" width={24} height={24} />
                  <h3 className="text-2xl text-gray-400">{profile.email}</h3>
                </div>

                <div className="mt-[-190px] flex justify-end px-30">
                    <button 
                    type="submit"
                    className="bg-[#6A38F3] h-[46px] w-[324px] rounded-4xl shadow-md shadow-gray-500 hover:bg-purple-700 cursor-pointer">
                        <p className="text-white text-xl">Editar Perfil</p>
                    </button>
                </div>

                <section className="px-5 py-48">
                    <div className="mb-8 flex items-center justify-between">
                        <h2 className="ml-24 text-[#000000] text-3xl font-semibold">Produtos</h2>
                        <a href="#" className="mr-30 text-sm font-bold text-[#6A38F3] hover:underline">
                            ver mais
                        </a>
                    </div>

                    <div className="flex gap-6 ml-25 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
                                            src="/images/selo_rare.svg"
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

                <section className="px-5 mt-[-145px]">
                    <div className=" mb-100 flex items-center justify-between">
                        <h2 className="ml-24 text-[#000000] text-3xl font-semibold">Lojas</h2>
                        <button 
                            type="button"
                            aria-label="Adicionar loja"
                            className="mr-30 flex h-10 w-10 items-center justify-center cursor-pointer rounded-full bg-[#6C3CF5] text-white transition hover:brightness-110 active:scale-95"
                        >
                            <Plus size={30} strokeWidth={2.5} />

                            </button>
                    </div>

                    <div className="mt-[-370px] ml-24 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {stores.map((loja) => (
                            <article
                                key={loja.id}
                                className="flex w-[480px] h-38 shrink-0 snap-start items-center justify-between rounded-3xl bg-white p-6"
                            >
                                <div> 
                                    <h3 className="ml-3 font-sans text-4xl text-[#000000] font-light leading-tight">{loja.name}</h3>
                                    <p className="ml-3 font-sans text-3xl text-[#6C3BFF] font-semibold">{loja.category.name}</p>
                                </div>

                            {loja.logo_url && (
                                <img
                                    src={loja.logo_url}
                                    alt={loja.name}
                                    width={90}
                                    height={90}
                                    className="h-[90px] w-[90px] mr-5 shrink-0 rounded-full object-contain scale-125"
                                />
                            )}        
                            </article>
                        ))}
                    </div>
                </section>

                <section className="px-5 mt-10">
                    <div className=" mb-5 flex items-center justify-between">
                        <h2 className=" ml-24 text-[#000000] text-3xl font-semibold">Avaliações</h2>
                    </div>
                    <div className="flex items-center ml-24 mb-20 bg-white w-220 h-50 rounded-3xl">
                        <div className=" flex items-center ml-8 w-40">
                            <Image
                                src="/images/selena.svg"
                                alt="foto de perfil"
                                width={230}
                                height={230}
                            />
                        </div>
                        <div className="ml-5 mb-18 flex flex-col justify-start">
                            <h1 className="font-sans text-[#000000] text-xl font-medium">Selena Gomez</h1>
                            <p className="font-sans mt-2 text-lg text-gray-600">Não é por nada não, mas essa garota arrasa</p>
                        </div>
                        <div className="flex shrink-0 flex-col items-end justify-between">
                            <div className="flex gap-1 ml-25 mb-18 mt-3">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} className="h-8 w-8 fill-yellow-300 text-yellow-300"/>
                                ))}
                            </div>
                            <a href="#" className="mt-5 mr-3 text-[#6A38F3] cursor-pointer hover:underline">
                                ver mais
                            </a>
                        </div>
                            
                    </div>
                </section>
        </main>
    )
}