import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white p-8 w-full max-w-sm m-auto rounded-2xl">
      <h1 className="text-gray-900 mb-1 text-2xl font-bold">Entrar</h1>
      <p className="text-gray-500 mb-7 text-sm"> 
        Acesse sua conta
      </p>

      <form onSubmit={null} className="space-y-4">
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
        Não tem uma conta? <a href="#" className="text-blue-500">Cadastre-se</a>
      </p>
    </div>
  );
}
