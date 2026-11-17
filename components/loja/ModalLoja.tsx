"use client";

import Modal from "@/components/Modal";
import FormularioLoja from "./FormularioLoja";

type Categoria = {
    id: number;
    name: string;
};

type ModalLojaProps = {
    onClose: () => void;
    categorias: Categoria[];
};

export default function ModalLoja({
    onClose,
    categorias
}: ModalLojaProps) {
    return (
        <Modal
            label="Adicionar loja"
            onClose={onClose}
            tamanho="loja"
        >
            <div className="flex h-full min-h-0 flex-col">
                <h2 className="mb-4 text-center text-2xl font-semibold text-black">
                    Adicionar loja
                </h2>

                <div className="min-h-0 flex-1 overflow-y-auto pr-2">
                    <FormularioLoja categorias={categorias} />
                </div>
            </div>
        </Modal>
    );
}