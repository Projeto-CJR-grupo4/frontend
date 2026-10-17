//página raiz

"use client"

import Image from "next/image";
import { use, useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  /*async function handlesubmit(e: FormDataEvent) {
    e.preventDefault();
    if(!email || !senha){
      throw new Error;
      console.log("Coloque email e senha");
      return;
    }
    await new Promise((r) => setTimeout(r, 1000));
    console.log({email,senha});
  }*/

    function entrar(e: React.FormEvent) {
      e.preventDefault();
      alert(`Email: ${email}\nSenha: ${senha}`);
    }

  return (
    <>

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

    <div className="bg-[#171918] px-66 py-84 max-w-lg ml-auto mt-auto mr-18 rounded-t-3xl ">
      <h1 className="absolute top-56 right-42 text-[#F6F3E4] text-3xl font-bold">BEM VINDO DE VOLTA!</h1>

      <form onSubmit={entrar} className="space-y-4">
        <div>
          <input 
            id="email"
            type="email"
            placeholder="  Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="absolute top-76 right-33 bg-[#F6F3E4] w-100 rounded-4xl bg-bisque border border-bisque-500 px-3 py-2 text-gray-700 outline-none focus:border-blue-400"
          />
        </div>
        <div>
          <input 
            id="senha"
            type="password"
            placeholder="  Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="absolute top-92 right-33 bg-[#F6F3E4] w-100 rounded-3xl border border-gray-500 px-3 py-2 text-gray-700 outline-none focus:border-blue-400"
          />
        </div>
        <p className="text-center">
          <a href="#" className="absolute top-108 right-62 text-[#F6F3E4] hover:underline">Esqueceu sua senha?</a>
        </p>
        <button type="submit" className="absolute top-120 right-33 w-100 rounded-3xl bg-[#6A38F3] py-2 font-semibold">ENTRAR</button>
      </form>

      <p className="absolute top-136 right-66 text-[#F6F3E4]">
        Não possui uma conta? <a href="#" className="text-[#6A38F3] hover:underline">Cadastre-se</a>
      </p>
    </div>
    </>
  );
}
