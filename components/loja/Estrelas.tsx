import { Star } from "lucide-react";

type EstrelasProps = { nota: number; className?: string };

export function Estrelas({ nota, className = "h-6 w-6"}: EstrelasProps) {
    return (
         <div className="flex gap-1" aria-label={`${nota.toFixed(1)} de 5 estrelas`}>
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    className={`${className} ${
                        i < Math.round(nota) ? "fill-[#FFE500] text-[#FFE500]" : "text-gray-500"
                    }`}
                />
            ))}
        </div>
    );
}  