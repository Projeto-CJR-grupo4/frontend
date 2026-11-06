export default function Perfil() {
    return(
        <main className="bg-[#F6F3E4]">
                <div className="bg-[#000000] h-[357.25px] mt-[79.88px]"></div>
                <div className="h-[230px] w-[230px] bg-white mt-[-150px] ml-[180px] rounded-full"></div>
                <h1 className="text-[#000000] text-5xl ml-[180px] mt-4 font-bold">Selena Gomez</h1>
                <h2 className="text-gray-400 text-2xl ml-[180px] mt-3" >@ selenagomez</h2>
                
                <div className="mt-[-155px] flex justify-end px-35">
                    <button 
                    type="submit"
                    className="bg-[#6A38F3] h-[46px] w-[324px] rounded-4xl shadow-md shadow-gray-500 hover:bg-purple-700">
                        <p className="text-white text-xl">Editar Perfil</p>
                    </button>
                </div>
        </main>
    )
}