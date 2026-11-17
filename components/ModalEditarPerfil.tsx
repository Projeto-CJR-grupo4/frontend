// codigo ModalEditarPerfil

'use client';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'lucide-react';
import Modal from '@/components/Modal';
import { updateMe, uploadAvatar, type User } from '@/lib/profile';

type Props = {
    profile: User;
    avatar: string;
    onClose: () => void;
    onSaved: (updated: Partial<User>) => void;
    onOpenPassword: () => void;
    onOpenDelete: () => void;
};

const TAMANHO_MAXIMO = 2 * 1024 * 1024;
const TIPOS = ['image/png', 'image/jpeg'];
const campo =
    'h-10 w-full rounded-full bg-white px-4 text-lg text-black outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#6A38F3]';

export default function ModalEditarPerfil({
    profile,
    avatar,
    onClose,
    onSaved,
    onOpenPassword,
    onOpenDelete,
}: Props) {
    const [name, setName] = useState(profile.name);
    const [username, setUsername] = useState(profile.username);
    const [email, setEmail] = useState(profile.email);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!file) {
            setPreview(null);
            return;
        }
        const url = URL.createObjectURL(file);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);

    function escolherArquivo(e: React.ChangeEvent<HTMLInputElement>) {
        const escolhido = e.target.files?.[0];
        e.target.value = '';
        if (!escolhido) return;

        if (!TIPOS.includes(escolhido.type)) {
            setError('Escolha uma imagem PNG ou JPG.');
            return;
        }
        if (escolhido.size > TAMANHO_MAXIMO) {
            setError('A imagem deve ter no máximo 2 MB.');
            return;
        }
        setError('');
        setFile(escolhido);
    }

    const alterouDados =
        name.trim() !== profile.name ||
        username.trim() !== profile.username ||
        email.trim() !== profile.email;

    const valido =
        name.trim().length >= 2 && username.trim().length >= 3 && email.includes('@');

    async function salvar() {
    if (!alterouDados && !file) {
        onClose();
        return;
    }

    setSaving(true);
    setError('');

    try {
        if (file) {
            const atualizado = await uploadAvatar(file);
            onSaved(atualizado);
            setFile(null);
        }

        if (alterouDados) {
            const atualizado = await updateMe({
                name: name.trim(),
                username: username.trim(),
                email: email.trim(),
            });
            onSaved(atualizado);
        }

        onClose();
    } catch (e) {
        setError(e instanceof Error ? e.message : 'Não foi possível salvar.');
    } finally {
        setSaving(false);
    }
}

    return (
        <Modal label="Editar perfil" onClose={onClose}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    salvar();
                }}
                className="flex flex-col items-center"
            >
                <div className="relative h-[130px] w-[130px]">
                    <img
                        src={preview ?? avatar}
                        alt="Sua foto de perfil"
                        className="h-full w-full rounded-full object-cover"
                    />
                    <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        aria-label="Trocar foto"
                        className="absolute -bottom-2 left-1/2 flex h-11 w-11 -translate-x-1/2 cursor-pointer items-center justify-center rounded-full bg-white shadow transition hover:scale-105"
                    >
                        <Camera className='text-black' size={30} />
                    </button>
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={escolherArquivo}
                        className="hidden"
                    />
                </div>

                <div className="mt-8 flex w-full max-w-[320px] flex-col gap-3">
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nome"
                        aria-label="Nome"
                        maxLength={60}
                        className={campo}
                    />
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        aria-label="Username"
                        maxLength={30}
                        className={campo}
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        aria-label="Email"
                        className={campo}
                    />
                </div>

                {error && (
                    <p role="alert" className="mt-3 max-w-[260px] text-center text-sm text-red-600">
                        {error}
                    </p>
                )}

                <div className="mt-6 flex w-full max-w-[320px] flex-col gap-2">
                    <button
                        type="button"
                        onClick={onOpenDelete}
                        className="h-10 cursor-pointer rounded-full border border-[#AF052A] text-lg text-[#AF052A] transition hover:bg-[#AF052A] hover:text-white shadow-lg"
                    >
                        Deletar conta
                    </button>
                    <button
                        type="button"
                        onClick={onOpenPassword}
                        className="h-10 cursor-pointer rounded-full border border-[#6A38F3] text-lg text-[#6A38F3] transition hover:bg-[#6A38F3] hover:text-white shadow-lg"
                    >
                        Alterar senha
                    </button>
                    <button
                        type="submit"
                        disabled={saving || !valido}
                        className="h-10 cursor-pointer rounded-full bg-[#6A38F3] text-lg text-white shadow transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60 shadow-lg"
                    >
                        {saving ? 'Salvando...' : 'Salvar'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
