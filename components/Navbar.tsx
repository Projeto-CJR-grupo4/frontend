"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
type NavbarProps = {
    rotaSacola?: string;
};

export default function Navbar({ rotaSacola }: NavbarProps) {
    const pathname = usePathname();

    const sacolaAtiva = rotaSacola
        ? pathname === rotaSacola
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
                    <button
                        type="button"
                        aria-label="Ver produtos"
                        className="group cursor-pointer"
                    >
                        <span
                            aria-hidden="true"
                            className={`block h-6.5 w-6.5 transition-colors duration-200 ${sacolaAtiva
                                    ? "bg-[#C6E700]"
                                    : "bg-white group-hover:bg-[#C6E700]"
                                }`}
                            style={{
                                maskImage: "url('/bag-icon.svg')",
                                maskSize: "contain",
                                maskRepeat: "no-repeat",
                                maskPosition: "center",
                            }}
                        />
                    </button>
                    <Image
                        src="/store-icon.svg"
                        alt="Loja"
                        width={26}
                        height={26}
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