import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
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
                    <Image
                        src="/bag-icon.svg"
                        alt="Sacola"
                        width={26}
                        height={26}
                    />
                    <Image
                        src="/store-icon.svg"
                        alt="Loja"
                        width={26}
                        height={26}
                    />
                    <Link
                        href="/login"
                        className="text-sm font-medium text-white"
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