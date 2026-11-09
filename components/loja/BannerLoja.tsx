import Image from "next/image";
import Link from "next/link";
import { IconeLapis, IconeMais } from "@/components/icones";
import type { Loja } from "@/types/loja";

type BannerLojaProps = {
    loja: Loja;
    ehDono: boolean;
};

export default function BannerLoja({ loja, ehDono }: BannerLojaProps) {
    return (
      <section className="relative flex h-80 items-center justify-center overflow-hidden bg-[#2a1f3d] md:h-[630px]">
      {loja.banner_url && (
        <Image src={loja.banner_url} alt="" fill priority className="object-cover" />
      )}
      <div className="absolute inset-0 bg-linear-to-b from-black via-black/40 to-black/40" />

      <div className="relative px-4 text-[#F6F3E4]">
        <h1 className="text-5xl leading-none md:text-8xl">{loja.name}</h1>
        <p className="text-lg md:text-3xl">{loja.category.name}</p>
      </div>

      <p className="absolute bottom-4 right-4 text-sm text-[#F6F3E4] md:bottom-6 md:right-28 md:text-lg">
        by <Link href="/" className="underline">{loja.user.name}</Link>
      </p>

      {ehDono && (
        <div className="absolute right-4 top-6 flex flex-col gap-3 md:right-28 md:top-14">
          <Link
            href={`/lojas/${loja.id}/editar`}
            aria-label="Editar loja"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#6938EF] text-white hover:bg-[#5428CF]"
          >
            <IconeLapis className="h-5 w-5" />
          </Link>
          <Link
            href={`/lojas/${loja.id}/produtos/novo`}
            aria-label="Adicionar produto"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#6938EF] text-white hover:bg-[#5428CF]"
          >
            <IconeMais className="h-6 w-6" />
          </Link>
        </div>
      )}
    </section>
  );
}
