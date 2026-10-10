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
    <div className="bg-white p-8 w-full max-w-sm m-auto rounded-2xl">
      <h1 className="text-gray-900 mb-1 text-2xl font-bold">Entrar</h1>
      <p className="text-gray-500 mb-7 text-sm"> 
        Acesse sua conta
      </p>

      <form onSubmit={entrar} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm text-gray-700">
            E-mail
          </label>
          <input 
            id="email"
            type="email"
            placeholder="seu@email.com"
            className="w-full rounded-lg border border-gray-500 px-3 py-2 text-gray-900 outline-none focus:border-blue-400"
          />
        </div>
        <div>
          <label htmlFor="senha" className="mb-1 block text-sm text-gray-700">
            Senha
          </label>
          <input 
            id="senha"
            type="password"
            placeholder="*********"
            className="w-full rounded-lg border border-gray-500 px-3 py-2 text-gray-900 outline-none focus:border-blue-400"
          />
        </div>
        <button type="submit" className="w-full rounded-lg bg-blue-600 py-2 font-semibold">Entrar</button>
      </form>

      <p className="mt-6 text-center text-gray-500">
        Não tem uma conta? <a href="#" className="text-blue-500 hover:underline">Cadastre-se</a>
      </p>
    </div>
  );
}
