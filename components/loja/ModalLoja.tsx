"use client";

import Modal from "@/components/Modal";
import FormularioLoja from "./FormularioLoja";
import type { DadosLoja } from "./FormularioLoja";

type Categoria = {
    id: number;
    name: string;
};

type ModalLojaProps = {
    onClose: () => void;
    onSaved: () => void;
    categorias: Categoria[];
    loja?: DadosLoja;
};

export default function ModalLoja({
    onClose,
    onSaved,
    categorias,
    loja
}: ModalLojaProps) {
    return (
        <Modal
            label={loja ? "Editar loja" : "Adicionar loja"}
            onClose={onClose}
            tamanho="loja"
        >
            <div className="flex h-full min-h-0 flex-col">
                <h2 className="mb-4 text-center text-2xl font-semibold text-black">
                    {loja ? "Editar loja" : "Adicionar loja"}
                </h2>

                <div className="min-h-0 flex-1 overflow-y-auto px-2 pt-2">
                    <FormularioLoja
                        categorias={categorias}
                        onSaved={onSaved}
                        loja={loja}
                    />
                </div>
            </div>
        </Modal>
    );
}