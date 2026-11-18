"use client";
import { FileUp } from "lucide-react";
type CampoUploadProps = {
    titulo: string;
    descricao: string;
    accept: string;
    arquivo: File | null;
    aoSelecionar: (arquivo: File | null) => void;
};

export default function CampoUpload({
    titulo,
    descricao,
    accept,
    arquivo,
    aoSelecionar
}: CampoUploadProps) {
    return (
        <div>
            <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#6A38F3] bg-transparent px-4 py-3 text-center">

                <FileUp
                    size={38}
                    className="text-[#6A38F3]"
                />

                <span className="break-all text-sm text-black">
                    {arquivo ? arquivo.name : descricao}
                </span>

                <input
                    type="file"
                    accept={accept}
                    aria-label={titulo}
                    onChange={(e) => aoSelecionar(e.target.files?.[0] ?? null)}
                    className="sr-only"
                />
            </label>
        </div>
    );
}