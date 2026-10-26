'use client';
import { useEffect, useState, type ChangeEvent, type SubmitEvent } from 'react';
import { api } from '@/lib/api';
import type { Categoria, Loja, Produto } from '@/types';
import NavCrud from '@/components/NavCrud';

const vazio = { nome: '', descricao: '', preco: '', estoque: '', lojaId: '', categoriaId: '' };

export default function ProdutosPage() {
  const [itens, setItens] = useState<Produto[]>([]);
  const [lojas, setLojas] = useState<Loja[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [form, setForm] = useState(vazio);
  const [editId, setEditId] = useState<number | null>(null);
  const [erro, setErro] = useState('');

  async function carregar() {
    setItens(await api<Produto[]>('/produtos'));
  }

  useEffect(() => {
    Promise.all([
      api<Produto[]>('/produtos').then(setItens),
      api<Loja[]>('/lojas').then(setLojas),
      api<Categoria[]>('/categorias').then(setCategorias),
    ]).catch(() => setErro('Backend fora do ar'));
  }, []);

  async function salvar(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro('');
    try {
      const body = JSON.stringify({
        nome: form.nome,
        descricao: form.descricao || undefined,
        preco: Number(form.preco),
        estoque: Number(form.estoque || 0),
        lojaId: Number(form.lojaId),
        categoriaId: Number(form.categoriaId),
      });
      if (editId) await api(`/produtos/${editId}`, { method: 'PATCH', body });
      else await api('/produtos', { method: 'POST', body });
      setForm(vazio);
      setEditId(null);
      await carregar();
    } catch {
      setErro('Erro ao salvar produto');
    }
  }

  function editar(p: Produto) {
    setEditId(p.id);
    setForm({
      nome: p.nome,
      descricao: p.descricao ?? '',
      preco: String(p.preco),
      estoque: String(p.estoque),
      lojaId: String(p.lojaId),
      categoriaId: String(p.categoriaId),
    });
  }

  async function excluir(id: number) {
    setErro('');
    try {
      await api(`/produtos/${id}`, { method: 'DELETE' });
      await carregar();
    } catch {
      setErro('Erro ao excluir produto');
    }
  }

  const set = (campo: keyof typeof vazio) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm({ ...form, [campo]: e.target.value });

  return (
    <main className="min-h-screen bg-[#F6F3E4] p-6 text-[#171918]">
      <div className="mx-auto max-w-2xl">
        <NavCrud />
        <h1 className="mb-4 text-2xl font-bold">Produtos</h1>

        <form onSubmit={salvar} className="mb-4 grid grid-cols-2 gap-2">
          <input className="col-span-2 rounded border bg-white p-2" placeholder="Nome" required
                 value={form.nome} onChange={set('nome')} />
          <input className="col-span-2 rounded border bg-white p-2" placeholder="Descrição"
                 value={form.descricao} onChange={set('descricao')} />
          <input className="rounded border bg-white p-2" type="number" step="0.01" min="0" placeholder="Preço" required
                 value={form.preco} onChange={set('preco')} />
          <input className="rounded border bg-white p-2" type="number" min="0" placeholder="Estoque"
                 value={form.estoque} onChange={set('estoque')} />
          <select className="rounded border bg-white p-2" required value={form.lojaId} onChange={set('lojaId')}>
            <option value="">Loja...</option>
            {lojas.map((l) => <option key={l.id} value={l.id}>{l.nome}</option>)}
          </select>
          <select className="rounded border bg-white p-2" required value={form.categoriaId} onChange={set('categoriaId')}>
            <option value="">Categoria...</option>
            {categorias.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}
          </select>
          <button className="col-span-2 rounded bg-[#171918] p-2 text-[#F6F3E4]">
            {editId ? 'Salvar' : 'Criar'}
          </button>
          {editId && (
            <button type="button" className="col-span-2" onClick={() => { setEditId(null); setForm(vazio); }}>
              Cancelar
            </button>
          )}
        </form>

        {erro && <p className="mb-4 text-red-600">{erro}</p>}

        <ul className="divide-y rounded bg-white">
          {itens.map((p) => (
            <li key={p.id} className="flex items-center justify-between p-3">
              <div>
                <p className="font-medium">{p.nome} — R$ {p.preco.toFixed(2)}</p>
                <p className="text-sm opacity-70">
                  {p.loja?.nome} · {p.categoria?.nome} · estoque {p.estoque}
                </p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => editar(p)}>Editar</button>
                <button className="text-red-600" onClick={() => excluir(p.id)}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}