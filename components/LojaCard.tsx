import Image from "next/image";

type LojaCardProps = {
    nome: string;
    logo: string;
    categoria: string;
};

export default function LojaCard({
    nome,
    logo,
    categoria
}: LojaCardProps) {
    return (
        <div className="flex w-40 shrink-0 flex-col items-center text-center">

            <Image
                src={logo}
                alt={`Logo da loja ${nome}`}
                width={136}
                height={136}
                className="h-34 w-34 rounded-full object-contain"
            />

            <h3 className="mt-2 text-lg font-medium text-black">
                {nome}
            </h3>

            <span className="text-sm text-[#6A38F3]">
                {categoria}
            </span>

        </div>
    );
}