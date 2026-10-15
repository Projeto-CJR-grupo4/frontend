import Image from "next/image"
export default function Cadastro() {
    return (
        <main className="min-h-screen bg-[#F6F3E4] text-[#171918] p-8 flex justify-center items-center">
            
            <div className="flex gap-8 w-full max-w-6xl">

                <div className="flex-1 flex flex-col items-center gap-6 bg-purple-200 p-8">
                    <Image
                    src="/images/logo-stock.svg"
                    alt="Logo da stock.io"
                    width={300}
                    height ={100}>

                    </Image>

                    <Image
                    src="/images/stocklee.png"
                    alt="mascote stock.io"
                    width={250}
                    height={100}
                    >
                    </Image>
                </div>

                <div className="flex-1 bg-gray-300 p-8">
                    <h1>Area do formulario</h1>
                </div>

            </div>
        </main>
    )
}