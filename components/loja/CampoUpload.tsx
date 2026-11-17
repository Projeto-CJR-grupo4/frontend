"use client";

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
        <div className="flex flex-col gap-2">
            <span className="text-black">
                {titulo}
            </span>

            <label className="flex min-h-24 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#6A38F3] bg-white px-4 py-3 text-center focus-within:ring-2 focus-within:ring-[#6A38F3]">

                <span className="break-all text-sm text-[#6A38F3]">
                    {arquivo ? arquivo.name : descricao}
                </span>

                <input
                    type="file"
                    accept={accept}
                    onChange={(e) => aoSelecionar(e.target.files?.[0] ?? null)}
                    className="sr-only"
                />
            </label>
        </div>
    );
}