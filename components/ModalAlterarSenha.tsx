'use client'

import { changePassword } from "@/lib/profile";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import { KeyRound } from "lucide-react";

type Propriedades = {
    onBack: () => void;
    onClose: () => void;
};

const campo = 'h-10 w-full rounded-full bg-white px-4 text-lg text-black outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#6A38F3]';

export default function ModalAlterarSenha({ onBack, onClose }: Propriedades) {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');
    const [saving, setSaving] =useState(false);
    const [done, setDone] = useState(false);

    useEffect(() => {
        if(!done) return
        const timer = setTimeout(onBack, 1200);
        return () => clearTimeout(timer);
    }, [done, onBack]);

    async function salvar () {
        setError('');
        
        if(newPassword !== confirm) {
            setError('A confirmação não é igual à nova senha.');
            return;
        }

        setSaving(true);
        try {
            await changePassword({ oldPassword, newPassword });
            setDone(true);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Não foi possível alterar a senha');
        } finally {
            setSaving(false);
        }
    }

    return (
        <Modal label="Alterar senha" onClose={onClose} onBack={onBack}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    salvar();
                }}
                className="flex flex-col items-center"
            >
                <KeyRound size={100} strokeWidth={1.8} className="mt-10 text-[#6A38F3]"/>

                <div className="mt-8 flex w-full max-w-[300px] flex-col gap-3">
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder="Senha Antiga"
                        aria-label="Senha antiga"
                        autoComplete="current-password"
                        className={campo}
                    />
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Nova Senha"
                        aria-label="Nova senha"
                        autoComplete="new-password"
                        maxLength={20}
                        className={campo}
                    />
                    <input
                        type="password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        placeholder="Confirmar Senha"
                        aria-label="Confirmar senha"
                        autoComplete="new-password"
                        maxLength={20}
                        className={campo}
                    />
                </div>

                {error && (
                    <p role="alert" className="mt-3 max-w-[260px] text-center text-sm text-red-600">
                        {error}
                    </p>
                )}

                {done && (
                    <p role="status" className="mt-3 max-w-[260px] text-center text-sm text-green-700">
                        Senha alterada com sucesso!
                    </p>
                )}

                <button
                    type="submit"
                    disabled={saving || done || !oldPassword || !newPassword || !confirm}
                    className="mt-8 h-10 w-full max-w-[300px] cursor-pointer rounded-full bg-[#6A38F3] text-lg text-white shadow transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {saving ? 'Salvando...' : 'Salvar Senha'}
                </button>
            </form>
        </Modal>
    )
}