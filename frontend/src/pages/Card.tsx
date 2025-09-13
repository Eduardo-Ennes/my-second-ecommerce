import Header from "@/components/Header"
import Footer from "@/components/Footer"
import imageTeste from '../media/imagem-python.jpg'
import { Button } from '@headlessui/react'

function Card() {
  return (
    <>
        <Header />

        <h2 className="w-[30rem] text-gray-200 text-4xl font-bold pl-[3rem] mt-3 mb-1 border-b border-zinc-700">Carrinho de compras</h2>

        <main className="grid grid-cols-5 p-[1rem] h-[22rem]">
            <section className="col-span-4">
                <div className="group flex flex-wrap gap-3 mt-3 mb-3">
                    <div className="mt-3 mb-3">
                        <img
                        src={imageTeste}
                        alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                        className="aspect-square w-[14rem] h-[7rem] rounded-lg bg-gray-200 object-cover xl:aspect-7/8"
                        />
                    </div>
                    <div className="flex flex-col gap-y-1 mt-3 mb-3">
                        <h3 className="text-lg font-medium text-gray-100">Formação na linguagem de programação python</h3>
                        <p className="text-sm text-gray-100">Nome do instrutor</p>
                        <div className="flex flex-wrap items-center gap-x-2">
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
                            <p className="text-lg font-medium text-gray-100">$19,90</p>
                            <p className="font-medium text-gray-100 text-base line-through">R$100,00</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="col-span-1 h-auto">
                <div className="flex flex-col gap-5 pt-[2rem]">
                    <div>
                        <p className="text-gray-200">Total:</p>
                        <p className="text-gray-200 mt-2 text-2xl font-bold">R$39,99</p>
                    </div>
                    <Button 
                    type="button"
                    className="w-full rounded cursor-pointer bg-fuchsia-900 px-4 py-2 text-sm text-white data-hover:bg-fuchsia-950">
                        Finalizar compra
                    </Button>
                </div>
            </div>
        </main>

        <Footer />
    </>
  )
}

export default Card