import Image from "next/image";

type ProdutoCardProps = {
    nome: string;
    imagem: string;
    logo: string;
    preco: string;
    disponivel: boolean;
    porKg?: boolean;
};

export default function ProdutoCard({
    nome,
    imagem,
    logo,
    preco,
    disponivel,
    porKg
}: ProdutoCardProps) {
    return (
        <div className="h-77.5 w-57.25 shrink-0 rounded-4xl bg-white">

            <div className="relative flex justify-center pt-4">

                <Image
                    src={imagem}
                    alt={nome}
                    width={160}
                    height={160}
                    className="h-40 w-40 object-contain"
                />

                <Image
                    src={logo}
                    alt="Logo da loja"
                    width={64}
                    height={64}
                    className="absolute right-4 top-4 h-16 w-16 rounded-full"
                />
            </div>
            <div className="px-5 pt-3">
                <h3 className="text-lg font-semibold text-black">
                    {nome}
                </h3>

                <p className="text-lg font-semibold text-black">
                    {preco}

                    {porKg && (
                        <span className="ml-2 text-sm font-medium text-[#6A38F3]">
                            /kg
                        </span>
                    )}
                </p>

                <p
                    className={
                        disponivel
                            ? "text-sm font-medium text-lime-500"
                            : "text-sm font-medium text-red-600"
                    }
                >
                    {disponivel ? "DISPONÍVEL" : "INDISPONÍVEL"}
                </p>
            </div>

        </div>
    );
}