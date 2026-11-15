"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLogado } from "@/hooks/useLogado";
import { userViewer } from "@/hooks/userViewer";

type NavbarProps = {
    rotaSacola?: string;
    rotaLoja?: string;
    isLoggedIn?: boolean;
};

type IconeNavbarProps = {
    icone: string;
    descricao: string;
    ativo: boolean;
    corHover?: "verde" | "vermelho";
    aoClicar?: () => void;
};

function IconeNavbar({
    icone,
    descricao,
    ativo,
    corHover = "verde",
    aoClicar,
}: IconeNavbarProps) {
    return (
        <button
            type="button"
            aria-label={descricao}
            onClick={aoClicar}
            className="group cursor-pointer"
        >
            <span
                aria-hidden="true"
                className={`block h-6.5 w-6.5 transition-colors duration-200 ${
                    ativo
                        ? "bg-[#C6E700]"
                        : corHover === "vermelho"
                            ? "bg-white group-hover:bg-[#AF052A]"
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

export default function Navbar({
    rotaSacola,
    rotaLoja = "/lojas",
    isLoggedIn,
}: NavbarProps) {
    const logado = useLogado();
    const { viewer } = userViewer();
    const pathname = usePathname();
    const router = useRouter();

    const usuarioLogado = isLoggedIn ?? logado;

    const rotaMeuPerfil = viewer ? `/perfil/${viewer.id}` : null;

    const sacolaAtiva = rotaSacola 
    ? pathname === rotaSacola 
    : false;
    const lojaAtiva = rotaLoja 
    ? pathname === rotaLoja 
    : false;
    const perfilAtivo = rotaMeuPerfil 
    ? pathname === rotaMeuPerfil 
    : false;

    const fazerLogout = () => {
        localStorage.removeItem("token");
        window.dispatchEvent(new Event("auth-changed"));
        router.replace("/");
    };

    return (
        <nav className="w-full min-h-23 bg-black">
            <div className="mx-auto flex min-h-23 max-w-360 flex-col items-center justify-center gap-3 px-4 py-3 sm:flex-row sm:justify-between sm:gap-0 sm:px-6 sm:py-0 lg:px-18">

                <Link href="/" className="hidden sm:block">
                    <Image
                        src="/logo-navbar.svg"
                        alt="Stock.io"
                        width={180}
                        height={45}
                    />
                </Link>

                <div className={`flex items-center ${usuarioLogado ? "gap-6" : "gap-2"} sm:gap-8`}>
                    <IconeNavbar
                        icone="/bag-icon.svg"
                        descricao="Ver produtos"
                        ativo={sacolaAtiva}
                    />
                    <IconeNavbar
                        icone="/store-icon.svg"
                        descricao="Ver lojas"
                        ativo={lojaAtiva}
                        aoClicar={() => router.push(rotaLoja)}
                    />

                    {usuarioLogado ? (
                        <>
                            <IconeNavbar
                                icone="/profile-icon.svg"
                                descricao="Ver perfil"
                                ativo={perfilAtivo}
                                aoClicar={() => {
                                    if (rotaMeuPerfil) router.push(rotaMeuPerfil);
                                }}
                            />

                            <IconeNavbar
                                icone="/logout-icon.svg"
                                descricao="Sair"
                                ativo={false}
                                corHover="vermelho"
                                aoClicar={fazerLogout}
                            />
                        </>
                    ) : (
                        <>
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
                        </>
                    )}
                </div>

            </div>
        </nav>
    );
}