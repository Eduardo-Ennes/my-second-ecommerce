import Header from "@/components/Header"
import Pagineted from "@/components/Pagineted"
import { Link, useParams } from "react-router-dom"
import imageTeste from '../media/imagem-python.jpg'

function MyCorses() {
  const params = useParams<{id: string}>()
  
  return (
    <>
        <Header />

        <h2 className="w-[30rem] text-gray-200 text-4xl font-bold pl-[3rem] mt-3 mb-1 border-b border-zinc-700">Meus cursos</h2>

        <article className="grid grid-cols-4 gap-x-3 gap-y-10 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-4 xl:gap-x-4 p-[1rem] mt-5 h-[27rem]">
          <Link to="/leassons/10" className="group w-[20rem]">
            <img
            src={imageTeste}
            alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
            className="aspect-square w-[20rem] h-[10rem] rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
            />
            <h3 className="mt-3 text-base font-medium text-gray-100 h-[3rem]">Formação na linguagem de programação python</h3>
            <p className="mt-3 text-sm text-gray-100">Nome do instrutor</p>
          </Link>
        </article>
        <Pagineted totalItems={10}/>
    </>
  )
}

export default MyCorses