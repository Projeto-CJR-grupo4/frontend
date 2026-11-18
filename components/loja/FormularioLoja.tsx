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
    loja?: DadosLoja;
};
export type DadosLoja = {
    id: number;
    name: string;
    category_id: number;
    sticker_url?: string | null;
    logo_url?: string | null;
    banner_url?: string | null;
};


export default function FormularioLoja({
    categorias,
    onSaved,
    loja
}: FormularioLojaProps) {
    const [name, setName] = useState(loja?.name ?? "");
    const [category_id, setCategoryId] = useState(
        loja?.category_id?.toString() ?? ""
    );
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
    async function salvarLoja(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setErro("");

        if (!name.trim() || !category_id) {
            setErro("Preencha o nome e a categoria da loja.");
            return;
        }

        if (enviando) return;

        setEnviando(true);

        try {
            const sticker_url = fotoPerfil
                ? await enviarImagem(fotoPerfil)
                : undefined;


            const logo_url = logo
                ? await enviarImagem(logo)
                : undefined;
            const banner_url = banner
                ? await enviarImagem(banner)
                : undefined;

            const dadosLoja = {
                name: name.trim(),
                category_id: Number(category_id),
                sticker_url,
                logo_url,
                banner_url,
            };

            if (loja) {
                await apiClient.patch(`/lojas/${loja.id}`, dadosLoja);
            } else {
                await apiClient.post("/lojas", dadosLoja);
            }

            onSaved?.();
        }
        catch (error) {
            console.error("Erro ao salvar loja:", error);

            setErro(
                loja
                    ? "Não foi possível atualizar a loja. Tente novamente."
                    : "Não foi possível cadastrar a loja. Tente novamente."
            );
        }
        finally {
            setEnviando(false);
        }

    }

    return (
        <form
            onSubmit={salvarLoja}
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
                descricao="Anexe a logo em SVG ou PNG de sua loja"
                accept=".svg,image/svg+xml,image/png"
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
                    {enviando
                        ? (loja ? "Salvando..." : "Adicionando...")
                        : (loja ? "Salvar" : "Adicionar")}
                </button>
            </div>

        </form>
    );
}