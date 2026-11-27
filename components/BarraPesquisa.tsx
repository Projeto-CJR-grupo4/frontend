"use client";

import Image from "next/image";

type BarraPesquisaProps = {
    pesquisa: string;
    setPesquisa: (valor: string) => void;
};

export default function BarraPesquisa({ pesquisa, setPesquisa }: BarraPesquisaProps) {
    return (
        <section className="mx-auto max-w-360 px-6 pt-8 lg:px-18">
            <div className="flex justify-end">
                <div className="relative w-full max-w-150">
                    <input
                        type="search"
                        placeholder="Procurar por..."
                        aria-label="Pesquisar produtos e lojas"
                        value={pesquisa}
                        onChange={(e) => setPesquisa(e.target.value)}
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
    );
}