import Header from "@/components/Header"
import Pagineted from "@/components/Pagineted"
import { Link } from "react-router-dom"
import imageTeste from '../media/imagem-python.jpg'

function Favorites() {
  
  return (
    <>
        <Header args={"No"}/>

        <h2 className="w-[30rem] text-gray-200 text-4xl font-bold pl-[3rem] mt-3 mb-1 border-b border-zinc-700">Lista de favoritos</h2>

        <article className="grid grid-cols-4 gap-x-3 gap-y-10 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-4 xl:gap-x-4 p-[1rem] mt-5">
          <Link to="/detail/product/10" className="group w-[20rem]">
            <img
            src={imageTeste}
            alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
            className="aspect-square w-[20rem] h-[10rem] rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
            />
            <h3 className="mt-3 text-base font-medium text-gray-100 h-[3rem]">Formação na linguagem de programação python</h3>
            <p className="mt-3 text-sm text-gray-100">Nome do instrutor</p>
            <div className="flex flex-wrap items-center mt-3 gap-x-3">
                <p>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-yellow-400"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                </p>
                <p className="text-gray-100">4.9</p>
                <p className="text-gray-100">14 (avaliações)</p>
            </div>
            <div className="flex flex-wrap gap-x-0.5 ">
                <p className="mt-3 text-lg font-medium text-gray-100">$19,90</p>
                <p className="mt-3 font-medium text-gray-100 text-base line-through">R$100,00</p>
            </div>
          </Link>
        </article>
        <Pagineted totalItems={10}/>
    </>
  )
}

export default Favorites