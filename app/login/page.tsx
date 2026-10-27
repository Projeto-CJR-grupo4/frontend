"use client"

import Image from "next/image";
import { use, useState } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [mostrarSenha, setMostrarSenha] = useState(false);

function entrar(e: React.FormEvent) {
  e.preventDefault();

  if (!email || !senha) {
    toast.error("Preencha email e senha");
    return;
  }

  if (senha.length < 8) {
    toast.error("A senha deve ter pelo menos 8 caracteres");
    return;
  }

  toast.success("Login realizado!");
}

  return (
    <main className="bg-[#F6F3E4]">

    <Image 
      src="/logo.svg"
      alt="Stock.io"
      width={360}
      height={60}
      priority
      className="absolute left-24 top-8"
    />

    <Image
      src="/mascote1.svg"
      alt="Entregador segurando um caixa"
      width={380}
      height={520}
      priority
      className="absolute bottom-0 left-32"
    />

    <div className="bg-[#171918] px-66 py-84 max-w-lg ml-auto mt-32 mr-18 rounded-t-3xl ">
      <h1 className="absolute top-56 right-42 text-[#F6F3E4] text-3xl font-bold">BEM VINDO DE VOLTA!</h1>

      <form onSubmit={entrar} className="space-y-4">
        <div>
          <input 
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="absolute top-76 right-33 bg-[#F6F3E4] w-100 rounded-3xl px-3 py-2 text-gray-700 outline-none focus:ring-2 focus:ring-[#6938EF]"
          />
        </div>
        <div>
          <input 
            id="senha"
            type={mostrarSenha ? "text" : "password"}
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="absolute top-92 right-33 bg-[#F6F3E4] w-100 rounded-3xl px-3 py-2 text-gray-700 outline-none focus:ring-2 focus:ring-[#6938EF]"
          />
            <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                aria-label={mostrarSenha ? "OcultarSenha" : "MostrarSenha"}
                className="absolute right-36 top-97 -translate-y-1/2 cursor-pointer"
              >
                <Image
                  src={mostrarSenha ? "olho-fechado.svg" : "olho-aberto.svg"}
                  alt=""
                  width={23}
                  height={17}
                />

              </button>
        </div>
        <p className="text-center">
          <a href="#" className="absolute top-108 right-62 text-[#F6F3E4] hover:underline">Esqueceu sua senha?</a>
        </p>
        <button type="submit" className="absolute top-120 right-33 w-100 rounded-3xl bg-[#6A38F3] py-2 font-semibold hover:bg-purple-700">ENTRAR</button>
      </form>

      <p className="absolute top-136 right-66 text-[#F6F3E4]">
        Não possui uma conta? <a href="http://localhost:3000/cadastro" className="text-[#6A38F3] hover:underline">Cadastre-se</a>
      </p>
    </div>
    </main>
  );
}