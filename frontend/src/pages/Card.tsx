import Header from "@/components/Header"
import Footer from "@/components/Footer"
import iconLixeira from '../assets/trash.png'
import iconBook from '../assets/book.png'
import { Link } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DetailCourse from "../api/detailCourse/index"


type Course = {
    id: number
    image: string
    name: string
    price: number 
    price_promotion: number
    promotion: boolean
    owner: number
    first_name: string
    last_name: string
}[]

function Card() {
    const navigate = useNavigate()
    // Armazena a lista de cursos que estão no carrinho
    const [product, setProduct] = useState<Course>()
    // Valor do total, é uma string!!
    const [total, setTotal] = useState<string>('')


    // Busca o carrinho de compras
    const searchCourses = useCallback(async () => {
        const response = await DetailCourse.searchCard()

        if(!response.status){
            if(response.code === 401){
                window.alert(response.error)
                navigate('/login')
                return;
            }

            window.alert(response.error)
            return;
        }
        
        // Ambos os valores estão na mesma lista
        setProduct(response.card[0])
        // Porem, o total é um objeto ex: {total: 50.00}
        setTotal(response.card[1].total)
    }, [navigate])


    useEffect(() => {
        searchCourses()
    }, [searchCourses])


    // Deleta um produto, usado o id do curso como referência
    const delCourse = async (id: number) => {
        const response = await DetailCourse.deleteCourseInCard(id)

        if(!response.status){
            if(response.code === 401){
                window.alert(response.error)
                navigate('/login')
                return;
            }

            window.alert(response.error)
            return;
        }

        searchCourses()
    }

  return (
    <>
        <Header args={"No"}/>

        <h2 className="w-[30rem] text-gray-200 mt-5 text-4xl font-bold pl-[3rem] mb-1 ">Carrinho de compras</h2>

        <main className="grid grid-cols-5 p-[1rem] h-[22rem]">
            <section className="col-span-4">
                {(product?.length ?? 0) > 0 ?
                    <>
                        {product?.map(element => (
                            <div key={element.id} className="group flex flex-wrap gap-3 mt-3 mb-3">
                                <div className="mt-3 mb-3">
                                    <img
                                    src={`http://localhost:3000/search/course/image/${element.image}`}
                                    alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                                    className="aspect-square w-[14rem] h-[7rem] rounded-lg bg-gray-200 object-cover xl:aspect-7/8"
                                    />
                                </div>
                                <div className="flex flex-col gap-y-1 mt-3 mb-3 w-[40rem]">
                                    <h3 className="text-lg font-medium text-gray-100">{element.name}</h3>
                                    <p className="text-sm text-gray-100">{element.first_name} {element.last_name}</p>
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
                                        {element.promotion ? 
                                            <>
                                                <p className="text-lg font-medium text-gray-100">R${element.price_promotion}</p>
                                                <p className="font-medium text-gray-100 text-base line-through">R${element.price}</p>
                                            </>
                                        :
                                            <>
                                                <p className="text-lg font-medium text-gray-100">R${element.price}</p>
                                            </>
                                        }
                                        
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-end">
                                    <button
                                    type="button"
                                    onClick={() => delCourse(element.id)}
                                    >
                                        <img src={iconLixeira} alt="Icone de lixeira para remoção de produto" className="bg-red-500 p-2 rounded"/>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </>
                : 
                    <>
                        <div className="mt-[2rem]">
                            <img src={iconBook} alt="Icone livro" className="m-auto"/>
                            <h3 className="text-2xl font-medium text-gray-100 text-center">Carrinho vazio!</h3>
                        </div>
                        
                    </>
                }
            </section>

            <div className="col-span-1 h-auto">
                <div className="flex flex-col gap-5 pt-[2rem]">
                    <div>
                        <p className="text-gray-200">Total:</p>
                        <p className="text-gray-200 mt-2 text-2xl font-bold">R${total}</p>
                    </div>
                    <Link 
                        to="/finish/buy"
                        type="button"
                        className="w-full text-center rounded cursor-pointer bg-fuchsia-900 px-4 py-2 text-sm text-white hover:bg-fuchsia-950">
                        Finalizar compra
                    </Link>
                </div>
            </div>
        </main>

        <Footer />
    </>
  )
}

export default Card