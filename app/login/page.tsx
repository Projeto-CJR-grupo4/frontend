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
    <div className="bg-black p-8 max-w-lg rounded-2xl ">
      <h1 className="text-[beige] mb-1 text-2xl text-center font-bold">BEM VINDO DE VOLTA!</h1>
      <br></br>

      <form onSubmit={entrar} className="space-y-4">
        <div>
          <input 
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[beige] w-full rounded-3xl bg-bisque border border-bisque-500 px-3 py-2 text-gray-700 outline-none focus:border-blue-400"
          />
        </div>
        <div>
          <input 
            id="senha"
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="bg-[beige] w-full rounded-3xl border border-gray-500 px-3 py-2 text-gray-700 outline-none focus:border-blue-400"
          />
        </div>
        <p className="text-center">
          <a href="#" className="text-[beige] hover:underline">Esqueceu sua senha?</a>
        </p>
        <button type="submit" className="w-full rounded-3xl bg-blue-600 py-2 font-semibold">ENTRAR</button>
      </form>

      <p className="mt-6 text-center text-gray-500">
        Não possui uma conta? <a href="#" className="text-blue-500 hover:underline">Cadastre-se</a>
      </p>
    </div>
  );
}
