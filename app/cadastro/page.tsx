"use client";
import Image from "next/image"
import { useState, type SubmitEvent } from "react";

export default function Cadastro() {

    const [mostrarSenha, setMostrarSenha] = useState(false);

    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

    const [erroSenha, setErroSenha] = useState("");

    function validarCadastro(evento: SubmitEvent<HTMLFormElement>) {
        evento.preventDefault();

        const dados = new FormData(evento.currentTarget);

        const senha = dados.get("password");
        const confirmarSenha = dados.get("confirmarSenha");

        if (senha !== confirmarSenha) {
            setErroSenha ("As senhas não coincidem.");
        }
        else {
            setErroSenha("");
        }

    }
    return (
        <main className="min-h-screen bg-[#F6F3E4] text-[#171918] p-4 lg:p-8 flex justify-center items-center">

            <div className="flex flex-col lg:flex-row items-center gap-8 w-full max-w-6xl">

                <div className="w-full lg:flex-1 flex flex-col items-center gap-4 lg:gap-6 p-4 lg:p-8">
                    <Image
                        src="/images/logo-stock.svg"
                        alt="Logo da stock.io"
                        width={300}
                        height={100}
                    />
                    <p className="max-w-xs text-center text-base lg:text-xl font-medium text-neutral-700">
                        Organize seu estoque de forma simples.
                    </p>
                    <Image
                        src="/images/stocklee.png"
                        alt="Mascote Stocklee"
                        width={994}
                        height={1598}
                        className="w-[110px] lg:w-[250px] h-auto"
                    />

                </div>

                <div className="w-full lg:flex-1 bg-[#171918] rounded-3xl p-6 lg:p-10">
                    <h1 className="text-3xl font-bold text-white">
                        Crie sua conta
                    </h1>
                    <form className="mt-8 flex flex-col gap-4"
                        onSubmit={validarCadastro}
                    >
                        <div className="flex flex-col gap-2">
                            <label htmlFor="nome" className="text-white">
                                Nome completo
                            </label>

                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                placeholder="Nome completo"
                                required
                                className="rounded-xl bg-[#F6F3E4] p-3 text-[#171918] focus:outline-none focus:ring-2 focus:ring-[#6938EF]"
                            />
                        </div>
                        <div className="flex flex-col gap-2 ">
                            <label htmlFor="username" className="text-white"> Username</label>

                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Digite seu username"
                                required
                                className="rounded-xl bg-[#F6F3E4] p-3 text-[#171918] focus:outline-none focus:ring-2 focus:ring-[#6938EF]"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-white">E-mail</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Digite seu email"
                                required
                                className="rounded-xl bg-[#F6F3E4] p-3 text-[#171918] focus:outline-none focus:ring-2 focus:ring-[#6938EF]"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="password" className="text-white"> Senha </label>
                            <input
                                type={mostrarSenha ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Digite sua senha"
                                required
                                className="rounded-xl bg-[#F6F3E4] p-3 text-[#171918] focus:outline-none focus:ring-2 focus:ring-[#6938EF]"
                            />
                            <button
                                type="button"
                                onClick={() => setMostrarSenha(!mostrarSenha)}
                                className="text-sm text-[#A78BFA] cursor-pointer self-end"
                            >
                                {mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                            </button>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="confirmarSenha" className="text-white"> Confirmar senha </label>
                            <input
                                type={mostrarConfirmarSenha ? "text" : "password"}
                                id="confirmarSenha"
                                name="confirmarSenha"
                                placeholder="Confirme sua senha"
                                required
                                className="rounded-xl bg-[#F6F3E4] p-3 text-[#171918] focus:outline-none focus:ring-2 focus:ring-[#6938EF]"
                            />
                            <button
                                type="button"
                                onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                                className="text-sm text-[#A78BFA] cursor-pointer self-end"
                            >
                                {mostrarConfirmarSenha ? "Ocultar senha" : "Mostrar senha"}
                            </button>

                        </div>
                        {erroSenha && (
                            <p className="text-sm text-red-300" role="alert">
                                {erroSenha}
                            </p>
                        )}
                        <button /* Alterar para submit quando tive a integracao */
                            type="submit"
                            className="bg-[#6938EF] hover:bg-[#5428CF] active:bg-[#5428CF] transition-colors duration-200 text-white font-bold p-4 rounded-xl cursor-pointer"
                        >
                            CRIAR CONTA
                        </button>
                        <p className="text-center text-white text-sm">
                            Já possui uma conta?{" "}
                            <a href="/login" className="text-[#A78BFA] hover:underline">
                                Login
                            </a>
                        </p>
                    </form>
                </div>

            </div>
        </main>
    )
}