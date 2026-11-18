"use client";

import { useState } from "react";
import CampoUpload from "./CampoUpload";
type Categoria = {
    id: number;
    name: string;
};

type FormularioLojaProps = {
    categorias: Categoria[];
};

export default function FormularioLoja({ categorias }: FormularioLojaProps) {
    const [name, setName] = useState("");
    const [category_id, setCategoryId] = useState("");
    const [fotoPerfil, setFotoPerfil] = useState<File | null>(null);
    const [logo, setLogo] = useState<File | null>(null);
    const [banner, setBanner] = useState<File | null>(null);

    return (
        <form className="flex flex-col gap-4">

            <div>
                <label htmlFor="nome-loja" className="sr-only">
                    Nome da loja
                </label>

                <input
                    id="nome-loja"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nome da loja"
                    className="w-full rounded-full bg-white px-4 py-3 text-black"
                />
            </div>

            <div>
                <label htmlFor="categoria-loja" className="sr-only">
                    Categoria
                </label>

                <select
                    id="categoria-loja"
                    value={category_id}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full rounded-full bg-white px-4 py-3 text-black"
                >
                    <option value="">Categoria</option>

                    {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                            {categoria.name}
                        </option>
                    ))}
                </select>
            </div>
            <CampoUpload
                titulo="Foto de perfil da loja"
                descricao="Anexe a foto de perfil de sua loja"
                accept="image/png,image/jpeg,image/webp"
                arquivo={fotoPerfil}
                aoSelecionar={setFotoPerfil}
            />

            <CampoUpload
                titulo="Logo da loja"
                descricao="Anexe a logo em SVG de sua loja"
                accept=".svg,image/svg+xml"
                arquivo={logo}
                aoSelecionar={setLogo}
            />

            <CampoUpload
                titulo="Banner da loja"
                descricao="Anexe o banner de sua loja"
                accept="image/png,image/jpeg,image/webp"
                arquivo={banner}
                aoSelecionar={setBanner}
            />

        </form>
    );
}