"use client";

import { useState } from "react";

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

    return (
        <form className="flex flex-col gap-4">

            <div>
                <label htmlFor="nome-loja" className="text-black">
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
                <label htmlFor="categoria-loja" className="text-black">
                    Categoria
                </label>

                <select
                    id="categoria-loja"
                    value={category_id}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full rounded-full bg-white px-4 py-3 text-black"
                >
                    <option value="">Selecione uma categoria</option>

                    {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                            {categoria.name}
                        </option>
                    ))}
                </select>
            </div>

        </form>
    );
}