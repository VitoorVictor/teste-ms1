function Home () {
  return(
      <div className="min-h-screen bg-gray-200/90 flex items-center justify-center gap-2">
          <div className="flex flex-col items-center">
              <div className="flex gap-x-2 mb-16">
              <h2 className="text-xl font-bold">BEM-VINDO AO TESTE PARA A EMPRESA MS1 SISTEMAS</h2>
              <img src="/icon/icon.webp" width="24px"/>
              </div>
              <button className="px-4 py-2 border-2 border-amber-500 hover:bg-amber-500 text-amber-500 hover:text-black rounded-xl text-xl font-bold"><a href="/Home">Ir ao Projeto</a></button>
          </div>
          <div className="absolute bottom-0">
            <h2 className="font-bold">Desenvolvidor por: <a className="text-amber-500 hover:text-amber-600 cursor-pointer" href="https://github.com/VitoorVictor/">Vitor Victor</a></h2>
          </div>
      </div>
  )
}
export default Home;
