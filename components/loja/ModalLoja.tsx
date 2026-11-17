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
        >
            <h2 className="mb-4 text-center text-2xl font-semibold text-black">
                Adicionar loja
            </h2>

            <div className="max-h-[420px] overflow-y-auto pr-2">
                <FormularioLoja categorias={categorias} />
            </div>
        </Modal>
    );
}