import Image from "next/image";

type CategoriaCardProps = {
    nome: string;
    icone: string;
};

export default function CategoriaCard({ nome, icone }: CategoriaCardProps) {
    return (
        <div className="flex h-29 w-29 shrink-0 flex-col items-center justify-center gap-1 rounded-4xl bg-white">

            <Image
                src={icone}
                alt=""
                width={40}
                height={40}
            />

            <span className="text-sm font-medium text-black">
                {nome}
            </span>

        </div>
    );
}