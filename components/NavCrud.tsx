import Link from 'next/link';

export default function NavCrud() {
    return (
        <nav className = "mb-6 flex gap-6 border-b border[#171918]/20 pb-3 font-medium">
            <Link href="/categorias">Categorias</Link>
      <Link href="/lojas">Lojas</Link>
      <Link href="/produtos">Produtos</Link>
        </nav>
    );
}