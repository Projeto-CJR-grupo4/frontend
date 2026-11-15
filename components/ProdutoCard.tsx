import Image from "next/image";

type ProdutoCardProps = {
    name: string;
    image_url: string | null;
    logo_url: string | null;
    price: string;
    stock: number;
    porKg?: boolean;
};

export default function ProdutoCard({
    name,
    image_url,
    logo_url,
    price,
    stock,
    porKg
}: ProdutoCardProps) {

    const disponivel = stock > 0;

    const precoFormatado = Number(price).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    return (
        <div className="h-77.5 w-57.25 shrink-0 rounded-4xl bg-white">

            <div className="relative flex justify-center pt-4">

                {image_url ? (
                    <Image
                        src={image_url}
                        alt={name}
                        width={160}
                        height={160}
                        className="h-40 w-40 object-contain"
                    />
                ) : (
                    <div className="flex h-40 w-40 items-center justify-center text-sm text-gray-500">
                        Sem imagem
                    </div>
                )}

                {logo_url && (
                    <Image
                        src={logo_url}
                        alt="Logo da loja"
                        width={64}
                        height={64}
                        className="absolute right-4 top-4 h-16 w-16 rounded-full"
                    />
                )}

            </div>

            <div className="px-5 pt-3">

                <h3 className="text-lg font-semibold text-black">
                    {name}
                </h3>

                <p className="text-lg font-semibold text-black">
                    {precoFormatado}

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