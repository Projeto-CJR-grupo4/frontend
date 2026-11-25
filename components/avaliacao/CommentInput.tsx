'use client';
import { useState } from 'react';
import { Send } from 'lucide-react';

type Props = { onSend: (content: string) => Promise<boolean> };

export default function CommentInput({ onSend }: Props) {
    const [content, setContent] = useState('');
    const [sending, setSending] = useState(false);

    async function enviar() {
        const texto = content.trim();
        if (!texto || sending) return;
        setSending(true);
        const ok = await onSend(texto);
        setSending(false);
        if (ok) setContent('');
    }

    return (
        <div className="mx-auto mt-16 flex w-full max-w-[920px] items-center rounded-full bg-white px-6 py-3">
            <input
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && enviar()}
                placeholder="Adicionar comentário"
                className="flex-1 bg-transparent text-sm outline-none text-gray-900"
            />
            <button
                type="button"
                aria-label="Enviar comentário"
                onClick={enviar}
                disabled={sending}
                className="cursor-pointer text-gray-400 transition hover:text-[#6A38F3] disabled:opacity-50"
            >
                <Send size={20} />
            </button>
        </div>
    );
}