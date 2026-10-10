import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white p-8 w-full max-w-sm m-auto rounded-2xl">
      <h1 className="text-gray-900 mb-1 text-2xl font-bold">Entrar</h1>
      <p className="text-gray-500 mb-7 text-sm"> 
        Acesse sua conta
      </p>

      <form onSubmit={null} className="space-y-4">
        <div></div>
        <div></div>
        <button type="submit">Entrar</button>
      </form>

      <p>
        Não tem uma conta? <a href="#">Cadastre-se</a>
      </p>
    </div>
  );
}
