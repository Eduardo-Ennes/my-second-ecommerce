import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "@/components/Header"
import Pagineted from "@/components/Pagineted"
import iconHeart128 from '../assets/heart-128px.png'
import DetailCourse from '../api/detailCourse/index'

type Course = {
  id: number
  name: string
  price: string
  price_promotion: string
  promotion: string
  image: string | File
  first_name: string
  last_name: string
}[]

function Favorites() {
  const navigate = useNavigate()
  const [course, setCourse] = useState<Course>()

  useEffect(() => {
    const searchListFavorite = async () => {
      const response = await DetailCourse.searchListFavorite()
      if(!response.status){
        if(response.code === 401){
          window.alert(response.error)
          navigate('/login')
          return;
        }

        window.alert(response.error)
        return;
      }

      setCourse(response.data)
    }

    searchListFavorite()
  }, [navigate])


  
  return (
    <>
        <Header args={"No"}/>

        <h2 className="w-[30rem] text-gray-200 mt-5 text-4xl font-bold pl-[3rem] mb-1 ">Lista de favoritos</h2>

        {(course?.length ?? 0) > 0 ? (
            <>
              <article className="grid grid-cols-4 gap-x-3 gap-y-10 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-4 xl:gap-x-4 p-[1rem] mt-5">

                {course?.map(element => (
                  <Link key={element.id} to={`/detail/product/${element.id}`} className="group w-[20rem]">

                    <img
                      src={`http://localhost:3000/search/course/image/${element.image}`}
                      alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                      className="aspect-square w-[20rem] h-[10rem] rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                      />
                    
                    <h3 className="mt-3 text-base font-medium text-gray-100 h-[3rem]">{element.name}</h3>
                    <p className="mt-3 text-sm text-gray-100">{element.first_name} {element.last_name}</p>
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
                      {element.promotion ? (
                        <>
                          <p className="mt-3 text-lg font-medium text-gray-100">R${element.price_promotion}</p>
                          <p className="mt-3 font-medium text-gray-100 text-base line-through">R${element.price}</p>
                        </>
                      ):(
                        <p className="mt-3 text-lg font-medium text-gray-100">R${element.price}</p>
                      )}
                    </div>
                  </Link>
                ))}

              </article>
            </>
          ):(
            <>
                <div className="mt-[5rem] ml-auto mr-auto">
                    <img src={iconHeart128} alt="Icone livro" className="m-auto"/>
                    <h3 className="text-2xl font-medium text-gray-100 text-center">Carrinho vazio!</h3>
                </div>
            </>
          )}
        
        {(course?.length ?? 0) > 0 && 
          <Pagineted totalItems={10}/>
        } 
    </>
  )
}

export default Favorites