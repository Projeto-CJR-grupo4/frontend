"use client";

import { useState } from "react";
import CampoUpload from "./CampoUpload";
import { apiClient } from "@/lib/axios";
type Categoria = {
    id: number;
    name: string;
};

type FormularioLojaProps = {
    categorias: Categoria[];
    onSaved?: () => void;
};

export default function FormularioLoja({
    categorias,
    onSaved
}: FormularioLojaProps) {
    const [name, setName] = useState("");
    const [category_id, setCategoryId] = useState("");
    const [fotoPerfil, setFotoPerfil] = useState<File | null>(null);
    const [logo, setLogo] = useState<File | null>(null);
    const [banner, setBanner] = useState<File | null>(null);
    const [enviando, setEnviando] = useState(false);
    const [erro, setErro] = useState("");
    async function enviarImagem(arquivo: File): Promise<string> {
        const formData = new FormData();

        formData.append("file", arquivo);

        const resposta = await apiClient.post<{ url: string }>(
            "/lojas/upload",
            formData,
            {
                headers: {
                    "Content-Type": undefined,
                },
            }
        );

        return resposta.data.url;
    }
    async function adicionarLoja(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setErro("");

        if (!name.trim() || !category_id) {
            setErro("Preencha o nome e a categoria da loja.");
            return;
        }

        if (logo) {
            setErro("O upload de logo SVG ainda não está disponível.");
            return;
        }

        if (enviando) return;

        setEnviando(true);

        try {
            const logo_url = fotoPerfil
                ? await enviarImagem(fotoPerfil)
                : undefined;

            const banner_url = banner
                ? await enviarImagem(banner)
                : undefined;

            const resposta = await apiClient.post("/lojas", {
                name: name.trim(),
                category_id: Number(category_id),
                logo_url,
                banner_url,
            });

            console.log("Loja cadastrada:", resposta.data);
            onSaved?.();
        }
        catch (error) {
            console.error("Erro ao cadastrar loja:", error);
            setErro("Não foi possível cadastrar a loja. Tente novamente.");
        }
        finally {
            setEnviando(false);
        }

    }

    return (
        <form
            onSubmit={adicionarLoja}
            className="flex min-h-full flex-col gap-4"
        >

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
                    className="w-full rounded-full border-2 border-transparent bg-white px-4 py-3
                     text-black outline-none transition-colors duration-200 hover:border-[#6A38F3]/30 focus:border-[#6A38F3]"
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
                    className="w-full rounded-full bg-white px-4 py-3 text-black outline-none transition-all duration-200 hover:ring-2 hover:ring-[#6A38F3]/30 focus:ring-2 focus:ring-[#6A38F3]"
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
            {erro && (
                <p role="alert" className="text-center text-sm text-red-600">
                    {erro}
                </p>
            )}
            <div className="mt-2 flex justify-center pt-6">
                <button
                    type="submit"
                    disabled={enviando}
                    className="w-64 cursor-pointer rounded-full bg-[#6A38F3] py-2 text-white shadow-md transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {enviando ? "Adicionando..." : "Adicionar"}
                </button>
            </div>

        </form>
    );
}