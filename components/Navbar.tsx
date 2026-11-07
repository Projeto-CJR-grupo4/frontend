"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
type NavbarProps = {
    rotaSacola?: string;
    rotaLoja?: string;
};
type IconeNavbarProps = {
    icone: string;
    descricao: string;
    ativo: boolean;
};

function IconeNavbar({ icone, descricao, ativo }: IconeNavbarProps) {
    return (
        <button
            type="button"
            aria-label={descricao}
            className="group cursor-pointer"
        >
            <span
                aria-hidden="true"
                className={`block h-6.5 w-6.5 transition-colors duration-200 ${ativo
                    ? "bg-[#C6E700]"
                    : "bg-white group-hover:bg-[#C6E700]"
                    }`}
                style={{
                    maskImage: `url('${icone}')`,
                    maskSize: "contain",
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                }}
            />
        </button>
    );
}

export default function Navbar({ rotaSacola, rotaLoja }: NavbarProps) {
    const pathname = usePathname();

    const sacolaAtiva = rotaSacola
        ? pathname === rotaSacola
        : false;
    const lojaAtiva = rotaLoja
        ? pathname === rotaLoja
        : false;
    return (
        <nav className="w-full h-23 bg-black">
            <div className="mx-auto flex h-full max-w-360 items-center justify-between px-6 lg:px-18">

                <Link href="/">
                    <Image
                        src="/logo-navbar.svg"
                        alt="Stock.io"
                        width={180}
                        height={45}
                    />
                </Link>

                <div className="flex items-center gap-8">
                    <IconeNavbar
                        icone="/bag-icon.svg"
                        descricao="Ver produtos"
                        ativo={sacolaAtiva}
                    />
                    <IconeNavbar
                        icone="/store-icon.svg"
                        descricao="Ver lojas"
                        ativo={lojaAtiva}
                    />
                    <Link
                        href="/login"
                        className="text-sm font-medium text-white hover:text-[#6A38F3] transition-colors duration-200"
                    >
                        LOGIN
                    </Link>
                    <Link
                        href="/cadastro"
                        className="inline-flex h-7 items-center justify-center rounded-full bg-[#6A38F3] px-6 text-xs font-semibold text-white hover:bg-white hover:text-[#6A38F3] transition-colors duration-200"
                    >
                        CADASTRE-SE
                    </Link>
                </div>

            </div>
        </nav>
    );
}