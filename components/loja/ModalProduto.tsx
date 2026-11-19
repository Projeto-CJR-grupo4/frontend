'use client';
import { useEffect, useMemo,useRef, useState } from "react";
import { Camera, ChevronDown, Minus, Plus, X } from "lucide-react";
import toast from "react-hot-toast";
import Modal from "@/components/Modal";
import { createProduct, deleteProduct, deleteProductImage, getCategorias, 
    mensagemDeErro, updateProduct, uploadProductImage, type Categoria, type ProductStore
} from "@/lib/loja";

const MAX_FOTOS = 4;
const TAMANHO_MAXIMO = 5 * 1024 * 1024;
const TIPOS = ["image/png", "image/jpeg", "image/webp"];

const campo = "h-12 w-full rounded-full bg-white px-6 text-lg text-black outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-[#6A38F3]";

type Foto = { chave: string, url: string; remover: () => void };

type ModalProdutoProps = {
    lojaId: number;
    categoriaLojaId: number;
    produto?: ProductStore;
    onClose: () => void;
    onSalvo: () => void;
};

export default function ModalProduto({ lojaId, categoriaLojaId, produto, onClose, onSalvo }: ModalProdutoProps) {
    const editando = produto !== undefined;

    const [nome, setNome] = useState(produto?.name ?? "");
    const [categoriaId, setCategoriaId] = useState(produto ? String(produto.category_id): "");
    const [descricao, setDescricao] = useState(produto?.description ?? "");
    const [preco, setPreco] = useState(produto ? Number(produto.price).toFixed(2).replace(".", ","): "");
    const [estoque, setEstoque] = useState(produto?.stock ?? 1);
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    const [imagensRemovidas, setImagensRemovidas] = useState<number[]>([]);
    const [novasFotos, setNovasFotos] = useState<File[]>([]);

    const [erro, setErro] = useState("");
    const [salvando, setSalvando] = useState(false);
    const [confirmandoExclusao, setConfirmandoExclusao] = useState(false);
    const inputFotos = useRef<HTMLInputElement>(null);

    useEffect(() => {
        let cancelado = false;
        getCategorias()
            .then((dados) => { if (!cancelado) setCategorias(dados);})
            .catch(console.error);
        return () => { cancelado = true; };
    }, []);

    const subcategorias = categorias.filter((c) => c.parent_category_id === categoriaLojaId);
    const opcoes = subcategorias.length > 0
        ? subcategorias
        : categorias.filter((c) => c.id === categoriaLojaId);
    
    const previas = useMemo(() => novasFotos.map((f) => URL.createObjectURL(f)), [novasFotos]);
    useEffect(() => () => previas.forEach((url) => URL.revokeObjectURL(url)), [previas]);

    const fotos: Foto[] = [
        ...(produto?.images ?? [])
            .filter((img) => !imagensRemovidas.includes(img.id))
            .map((img) => ({
                chave: `img-${img.id}`,
                url: img.image_url,
                remover: () => setImagensRemovidas((ids) => [...ids, img.id]),
            })),
        ...previas.map((url, i) => ({
            chave: `nova-${url}`,
            url,
            remover: () => setNovasFotos((arquivos) => arquivos.filter((_, j) => j !== i)), 
        }))
    ];
    const vagas = MAX_FOTOS- fotos.length;

    function escolherFotos(e: React.ChangeEvent<HTMLInputElement>) {
        const escolhidas = Array.from(e.target.files ?? []);
        e.target.value = "";
        if (escolhidas.some((f) => !TIPOS.includes(f.type))) {
            setErro("Escolha imagens PNG, JPG ou WEBP.");
            return;
        }
        if (escolhidas.some((f) => f.size > TAMANHO_MAXIMO)) {
            setErro("Cada imagem deve ter no máximo 5 MB.");
            return;
        }
        setErro("");
        setNovasFotos((atuais) => [...atuais, ...escolhidas].slice(0,atuais.length + vagas));
    }

    const precoNumero = Number(preco.replace(/[^\d,.]/g, "").replace(",", "."));
    const valido = nome.trim().length > 0 && categoriaId !== "" && preco.trim() !== "" && precoNumero >=0;

    async function salvar() {
        if (!valido) {
            setErro("Preencha nome, subcategoria e um preço válido.");
            return;
        }
        setSalvando(true);
        setErro("");
        try {
            const dados = {
                name: nome.trim(),
                description: descricao.trim(),
                price: precoNumero,
                stock: estoque,
                category_id: Number(categoriaId),
            };

            let produtoId: number;
            if (produto) {
                await updateProduct(produto.id, dados);
                produtoId = produto.id;
            } else {
                produtoId = (await createProduct(lojaId, dados)).id;
            }

            for (const imagemId of imagensRemovidas) {
                await deleteProductImage(produtoId, imagemId);
            }
            if (novasFotos.length > 0) {
                await uploadProductImage(produtoId, novasFotos);
            }

            toast.success(editando ? "Produto atualizado com sucesso!" : "Produto adicionado com sucesso!");
            onSalvo();
            onClose();
        } catch (e) {
            setErro(mensagemDeErro(e, "Não foi possível salvar o produto."));
            setSalvando(false);
        }
    }

    async function excluir() {
        if (!produto) return;
        setSalvando(true);
        setErro("");
        try {
            await deleteProduct(produto.id);
            toast.success("Produto excluído com sucesso!");
            onSalvo();
            onClose();
        } catch (e) {
            setErro(mensagemDeErro(e, "Não foi possível excluir o produto."));
            setSalvando(false);
        }
    }
    
    function slot(indice: number, grande: boolean) {
        const foto = fotos[indice];
        const tamanho = grande ? "h-36 col-span-3" : "h-24";

        if (foto) {
            return (
                <div key={foto.chave} className={`relative overflow-hidden rounded-2xl bg-white ${tamanho}`}>
                    <img src={foto.url} alt={`Foto ${indice + 1} do produto`} className="h-full w-full object-contain" />
                    <button
                        type="button"
                        onClick={foto.remover}
                        aria-label={`Remover foto ${indice + 1}`}
                        className="absolute right-2 top-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white hover:bg-black"
                    >
                        <X size={16} />
                    </button>
                </div>
            );
        }

        return (
            <button
                key={`vazio-${indice}`}
                type="button"
                onClick={() => inputFotos.current?.click()}
                aria-label="Adicionar fotos"
                className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#6A38F3] text-[#6A38F3] transition hover:bg-white/60 ${tamanho}`}
            >
                <Camera size={grande ? 44 : 32} />
                {grande && <span className="text-lg text-black">Anexe as fotos do seu produto</span>}
            </button>
        );
    }

    return (
        <Modal
            label={editando ? "Editar produto" : "Adicionar produto"}
            onClose={onClose}
            tamanho="produto"
        >
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    salvar();
                }}
                className="flex flex-col gap-4"
            >
                <h2 className="text-center text-3xl text-black md:text-4xl">
                    {editando ? "Editar Produto" : "Adicionar Produto"}
                </h2>

                <div className="grid grid-cols-3 gap-4">
                    {slot(0, true)}
                    {slot(1, false)}
                    {slot(2, false)}
                    {slot(3, false)}
                </div>
                <input
                    ref={inputFotos}
                    type="file"
                    multiple
                    accept={TIPOS.join(",")}
                    onChange={escolherFotos}
                    className="hidden"
                />

                <input
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Nome do produto"
                    aria-label="Nome do produto"
                    maxLength={80}
                    className={campo}
                />

                <div className="relative">
                    <select
                        value={categoriaId}
                        onChange={(e) => setCategoriaId(e.target.value)}
                        aria-label="Subcategoria"
                        className={`${campo} appearance-none pr-12 ${categoriaId === "" ? "text-gray-500" : ""}`}
                    >
                        <option value="" disabled>Subcategoria</option>
                        {opcoes.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-black" />
                </div>

                <textarea
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    placeholder="Descrição do produto"
                    aria-label="Descrição do produto"
                    rows={3}
                    className="w-full resize-none rounded-3xl bg-white px-6 py-3 text-lg text-black outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-[#6A38F3]"
                />

                <input
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    placeholder="Preço do produto"
                    aria-label="Preço do produto"
                    inputMode="decimal"
                    className={campo}
                />

                {editando && !confirmandoExclusao && (
                    <button
                        type="button"
                        onClick={() => setConfirmandoExclusao(true)}
                        disabled={salvando}
                        className="h-12 cursor-pointer rounded-full bg-[#FF0000] text-lg uppercase text-white transition hover:brightness-110 disabled:opacity-60"
                    >
                        Deletar
                    </button>
                )}

                {confirmandoExclusao && (
                    <div className="rounded-3xl bg-white p-4 text-center">
                        <p className="text-black">Excluir este produto? Essa ação não pode ser desfeita.</p>
                        <div className="mt-3 flex justify-center gap-3">
                            <button
                                type="button"
                                onClick={excluir}
                                disabled={salvando}
                                className="h-10 cursor-pointer rounded-full bg-[#AF052A] px-6 text-white disabled:opacity-60"
                            >
                                {salvando ? "Excluindo..." : "Sim, excluir"}
                            </button>
                            <button
                                type="button"
                                onClick={() => setConfirmandoExclusao(false)}
                                disabled={salvando}
                                className="h-10 cursor-pointer rounded-full border border-[#6A38F3] px-6 text-[#6A38F3]"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-center gap-10" aria-label="Quantidade em estoque">
                    <button
                        type="button"
                        onClick={() => setEstoque((q) => Math.max(0, q - 1))}
                        aria-label="Diminuir estoque"
                        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-[#6A38F3] text-[#6A38F3]"
                    >
                        <Minus />
                    </button>
                    <span className="min-w-12 text-center text-5xl text-[#6A38F3]" aria-live="polite">{estoque}</span>
                    <button
                        type="button"
                        onClick={() => setEstoque((q) => q + 1)}
                        aria-label="Aumentar estoque"
                        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-[#6A38F3] text-[#6A38F3]"
                    >
                        <Plus />
                    </button>
                </div>

                {erro && (
                    <p role="alert" className="text-center text-sm text-red-600">{erro}</p>
                )}

                <button
                    type="submit"
                    disabled={salvando}
                    className="mx-auto h-12 w-full max-w-[260px] cursor-pointer rounded-full bg-[#6A38F3] text-lg text-white shadow-lg transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {salvando ? "Salvando..." : editando ? "Salvar" : "Adicionar"}
                </button>
            </form>
        </Modal>
    );
}
