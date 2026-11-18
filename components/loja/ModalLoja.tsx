"use client";

import Modal from "@/components/Modal";
import FormularioLoja from "./FormularioLoja";

type Categoria = {
    id: number;
    name: string;
};

type ModalLojaProps = {
    onClose: () => void;
    onSaved: () => void;
    categorias: Categoria[];
};

export default function ModalLoja({
    onClose,
    onSaved,
    categorias
}: ModalLojaProps) {
    return (
        <Modal
            label="Adicionar loja"
            onClose={onClose}
            tamanho="loja"
        >
            <div className="min-h-0 flex-1 overflow-y-auto px-2 pt-2">
                <h2 className="mb-4 text-center text-2xl font-semibold text-black">
                    Adicionar loja
                </h2>

                <div className="min-h-0 flex-1 overflow-y-auto pr-2">
                    <FormularioLoja
                        categorias={categorias}
                        onSaved={onSaved}
                    />
                </div>
            </div>
        </Modal>
    );
}