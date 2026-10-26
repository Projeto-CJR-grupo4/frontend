'use client';
import { useEffect, useState, type SubmitEvent } from 'react';
import { api } from '@/lib/api';
import type { Categoria } from '@/types';
import NavCrud from '@/components/NavCrud';

export default function CategoriasPage() {
  const [itens, setItens] = useState<Categoria[]>([]);
  const [nome, setNome] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [erro, setErro] = useState('');

  async function carregar() {
    setItens(await api<Categoria[]>('/categorias'));
  }

  useEffect(() => {
    api<Categoria[]>('/categorias').then(setItens).catch(() => setErro('Backend fora do ar'));
  }, []);

  async function salvar(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro('');
    try {
      const body = JSON.stringify({ nome });
      if (editId) await api(`/categorias/${editId}`, { method: 'PATCH', body });
      else await api('/categorias', { method: 'POST', body });
      setNome('');
      setEditId(null);
      await carregar();
    } catch {
      setErro('Erro ao salvar categoria (o nome já existe?)');
    }
  }

  async function excluir(id: number) {
    setErro('');
    try {
      await api(`/categorias/${id}`, { method: 'DELETE' });
      await carregar();
    } catch {
      setErro('Não é possível excluir: a categoria tem produtos vinculados');
    }
  }

  return (
    <main className="min-h-screen bg-[#F6F3E4] p-6 text-[#171918]">
      <div className="mx-auto max-w-2xl">
        <NavCrud />
        <h1 className="mb-4 text-2xl font-bold">Categorias</h1>

        <form onSubmit={salvar} className="mb-4 flex gap-2">
          <input className="flex-1 rounded border bg-white p-2" placeholder="Nome"
                 value={nome} onChange={(e) => setNome(e.target.value)} required />
          <button className="rounded bg-[#171918] px-4 text-[#F6F3E4]">
            {editId ? 'Salvar' : 'Criar'}
          </button>
          {editId && (
            <button type="button" onClick={() => { setEditId(null); setNome(''); }}>Cancelar</button>
          )}
        </form>

        {erro && <p className="mb-4 text-red-600">{erro}</p>}

        <ul className="divide-y rounded bg-white">
          {itens.map((c) => (
            <li key={c.id} className="flex items-center justify-between p-3">
              {c.nome}
              <div className="flex gap-3">
                <button onClick={() => { setEditId(c.id); setNome(c.nome); }}>Editar</button>
                <button className="text-red-600" onClick={() => excluir(c.id)}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}