'use client'

import { changePassword } from "@/lib/profile";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import { KeyRound } from "lucide-react";
import Image from "next/image";

type Propriedades = {
    onBack: () => void;
    onClose: () => void;
};

const campo = 'h-10 w-full rounded-full bg-white px-4 text-lg text-black outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#6A38F3]';

type CampoSenhaProps = {
    value: string;
    onChange: (valor: string) => void;
    placeholder: string;
    label: string;
    autoComplete: string;
    maxLength?: number;
};

function CampoSenha({ value, onChange, placeholder, label, autoComplete, maxLength }: CampoSenhaProps) {
    const [mostrar, setMostrar] = useState(false);

    return (
        <div className="relative">
            <input
                type={mostrar ? "text" : "password"}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                aria-label={label}
                autoComplete={autoComplete}
                maxLength={maxLength}
                className={campo}
            />
            <button
                type="button"
                onClick={() => setMostrar(!mostrar)}
                aria-label={mostrar ? "Ocultar senha" : "Mostrar senha"}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer transition hover:opacity-70"
            >
                <Image
                    src={mostrar ? "/olho-fechado.svg" : "/olho-aberto.svg"}
                    alt=""
                    width={23}
                    height={17}
                />
            </button>
        </div>
    );
}

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
        if (newPassword.length < 8) {
            setError('A nova senha deve ter pelo menos 8 caracteres.');
            return;
        }
        if (
            /\s/.test(newPassword) ||
            !/[A-Z]/.test(newPassword) ||
            !/[a-z]/.test(newPassword) ||
            !/[^A-Za-z\s]/.test(newPassword)
        ) {
            setError('A senha deve conter letras maiúsculas, minúsculas e pelo menos um número ou símbolo, sem espaços.');
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

                <div className="mt-8 flex w-full max-w-[350px] flex-col gap-3">
                    <CampoSenha
                        value={oldPassword}
                        onChange={setOldPassword}
                        placeholder="Senha Antiga"
                        label="Senha antiga"
                        autoComplete="current-password"
                    />
                    <CampoSenha
                        value={newPassword}
                        onChange={setNewPassword}
                        placeholder="Nova Senha"
                        label="Nova senha"
                        autoComplete="new-password"
                        maxLength={20}
                    />
                    <CampoSenha
                        value={confirm}
                        onChange={setConfirm}
                        placeholder="Confirmar Senha"
                        label="Confirmar senha"
                        autoComplete="new-password"
                        maxLength={20}
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