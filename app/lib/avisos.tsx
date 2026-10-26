import toast from "react-hot-toast";

export function aviso(mensagem: string, tipo: "erro" | "sucesso" = "erro") {
  const duracao = 4000; // em milissegundos
  const cor = tipo === "erro" ? "#EF4444" : "#22C55E";

  toast.custom(
    (t) => (
      <div
        className={`w-80 overflow-hidden rounded-xl bg-[#171918] text-[#F6F3E4] transition-opacity duration-300 ${
          t.visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ boxShadow: `0 8px 24px ${cor}59` }}
      >
        <p className="px-4 py-3">{mensagem}</p>

        {/* barra de tempo */}
        <div
          className="h-1"
          style={{
            background: cor,
            animation: `barra-tempo ${duracao}ms linear forwards`,
          }}
        />
      </div>
    ),
    { duration: duracao }
  );
}