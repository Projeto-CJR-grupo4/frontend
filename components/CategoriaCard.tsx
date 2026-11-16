import Image from "next/image";

type CategoriaCardProps = {
    name: string;
    icon_url: string | null;
};

export default function CategoriaCard({
    name,
    icon_url
}: CategoriaCardProps) {
    return (
        <div className="flex h-29 w-29 shrink-0 flex-col items-center justify-center gap-1 rounded-4xl bg-white">

            {icon_url && (
                <Image
                    src={icon_url}
                    alt=""
                    width={40}
                    height={40}
                />
            )}

            <span className="text-sm font-medium text-black">
                {name}
            </span>

        </div>
    );
}