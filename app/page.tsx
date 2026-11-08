import Image from "next/image";
export default function Home() {
  return (
    <main className="min-h-screen bg-[#F6F3E4]">

      <section className="bg-black lg:h-125 lg:overflow-hidden">
        <div className="mx-auto flex max-w-360 flex-col items-center justify-between gap-8 px-6 py-10 lg:h-full lg:flex-row lg:px-18 lg:py-0">
          <h1 className="max-w-2xl text-center text-4xl font-bold leading-tight text-white lg:text-5xl">
            Do CAOS à organização,
            <br />
            em alguns cliques
          </h1>

          <Image
            src="/stocklee-banner.svg"
            alt="Personagem StockLee com caixas"
            width={550}
            height={500}
            className="h-auto w-full max-w-137.5 lg:self-start"
          />

        </div>
      </section>

    </main>
  );
}