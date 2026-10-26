'use client';
import { useEffect, useState, type SubmitEvent } from 'react';
import { api } from '@/lib/api';
import type { Loja } from '@/types';
import NavCrud from '@/components/NavCrud';

const vazio = { nome: '', descricao: '' };

export default function LojasPage() {
  const [itens, setItens] = useState<Loja[]>([]);
  const [form, setForm] = useState(vazio);
  const [editId, setEditId] = useState<number | null>(null);
  const [erro, setErro] = useState('');

  async function carregar() {
    setItens(await api<Loja[]>('/lojas'));
  }

  useEffect(() => {
    api<Loja[]>('/lojas').then(setItens).catch(() => setErro('Backend fora do ar'));
  }, []);

  async function salvar(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro('');
    try {
      const body = JSON.stringify({ nome: form.nome, descricao: form.descricao || undefined });
      if (editId) await api(`/lojas/${editId}`, { method: 'PATCH', body });
      else await api('/lojas', { method: 'POST', body });
      setForm(vazio);
      setEditId(null);
      await carregar();
    } catch {
      setErro('Erro ao salvar loja (o nome já existe?)');
    }
  }

  async function excluir(id: number) {
    setErro('');
    try {
      await api(`/lojas/${id}`, { method: 'DELETE' });
      await carregar();
    } catch {
      setErro('Erro ao excluir loja');
    }
  }

  return (
    <main className="min-h-screen bg-[#F6F3E4] p-6 text-[#171918]">
      <div className="mx-auto max-w-2xl">
        <NavCrud />
        <h1 className="mb-4 text-2xl font-bold">Lojas</h1>

        <form onSubmit={salvar} className="mb-4 flex flex-col gap-2">
          <input className="rounded border bg-white p-2" placeholder="Nome" required
                 value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
          <input className="rounded border bg-white p-2" placeholder="Descrição"
                 value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} />
          <div className="flex gap-2">
            <button className="flex-1 rounded bg-[#171918] p-2 text-[#F6F3E4]">
              {editId ? 'Salvar' : 'Criar'}
            </button>
            {editId && (
              <button type="button" onClick={() => { setEditId(null); setForm(vazio); }}>Cancelar</button>
            )}
          </div>
        </form>

        {erro && <p className="mb-4 text-red-600">{erro}</p>}

        <ul className="divide-y rounded bg-white">
          {itens.map((l) => (
            <li key={l.id} className="flex items-center justify-between p-3">
              <div>
                <p className="font-medium">{l.nome}</p>
                <p className="text-sm opacity-70">{l.descricao}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => { setEditId(l.id); setForm({ nome: l.nome, descricao: l.descricao ?? '' }); }}>
                  Editar
                </button>
                <button className="text-red-600" onClick={() => excluir(l.id)}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}