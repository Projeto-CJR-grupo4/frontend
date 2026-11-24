type PaginacaoProps = {
    paginaAtual: number,
    totalPaginas: number,
    onMudar:(pagina: number) => void;
};

export default function Paginacao({ paginaAtual, totalPaginas, onMudar }: PaginacaoProps) {
    if (totalPaginas <= 1) return null;

    return (
         <nav className="mt-12 flex items-center justify-center gap-6 text-3xl text-black" aria-label="Paginação">
            <button
                type="button"
                aria-label="Página anterior"
                disabled={paginaAtual === 1}
                onClick={() => onMudar(paginaAtual - 1)}
                className="cursor-pointer disabled:cursor-default disabled:opacity-30"
            >
                &lt;
            </button>

            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
                <button
                    key={n}
                    type="button"
                    onClick={() => onMudar(n)}
                    aria-current={n === paginaAtual ? "page" : undefined}
                    className={`cursor-pointer ${n === paginaAtual ? "font-bold" : "font-light"}`}
                >
                    {n}
                </button>
            ))}

            <button
                type="button"
                aria-label="Próxima página"
                disabled={paginaAtual === totalPaginas}
                onClick={() => onMudar(paginaAtual + 1)}
                className="cursor-pointer disabled:cursor-default disabled:opacity-30"
            >
                &gt;
            </button>
        </nav>
    );
}