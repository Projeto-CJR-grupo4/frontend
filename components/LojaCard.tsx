import Image from "next/image";

type LojaCardProps = {
    name: string;
    logo_url: string | null;
    category: {
        id: number;
        name: string;
    };
};

export default function LojaCard({
    name,
    logo_url,
    category
}: LojaCardProps) {
    return (
        <div className="flex w-40 shrink-0 flex-col items-center text-center">

            {logo_url ? (
                <Image
                    src={logo_url}
                    alt={`Logo da loja ${name}`}
                    width={136}
                    height={136}
                    className="h-34 w-34 rounded-full object-contain"
                />
            ) : (
                <div className="flex h-34 w-34 items-center justify-center rounded-full bg-white text-sm text-gray-500">
                    Sem logo
                </div>
            )}

            <h3 className="mt-2 text-lg font-medium text-black">
                {name}
            </h3>

            <span className="text-sm text-[#6A38F3]">
                {category.name}
            </span>

        </div>
    );
}