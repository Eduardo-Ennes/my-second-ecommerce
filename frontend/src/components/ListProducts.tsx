import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import ApiSearchCoursesAndTechnologies from '../api/course/ApiSearchCourses'

type Courses = {
    id_user: number
    id_course: number
    name: string
    price: number 
    price_promotion: number 
    promotion: boolean 
    image: string
    first_name: string
    last_name: string
}


type Props = {
    id: number | null 
    nameSearchCourses: string 
}

function ListProducts({id, nameSearchCourses}: Props) {
    console.log(id)
    const [courses, setCourses] = useState<Array<Courses>>([])

    const handleSearchAllCourses = useCallback(async () => {
        try{
            const response =  await ApiSearchCoursesAndTechnologies.SearchAllCourses()

            if(!response.status){
                window.alert(response.error)
                return;
            }

            setCourses(response.data)
        }catch(error){
            console.log(error)
            window.alert('Houve um erro de conexão com a função da api TAL.')
        }
    }, [])


    useEffect(() => {
        handleSearchAllCourses()
    }, [handleSearchAllCourses])


    useEffect(() => {
        const handleSearchCourseByTag = async () => {
            try{
                if(id == null) return;
                if(id === 0){
                    handleSearchAllCourses()
                    return;
                } 

                const response = await ApiSearchCoursesAndTechnologies.SearchCourseByTag(id)

                if(!response.status){
                    window.alert(response.error)
                    return;
                }

                setCourses(response.data)
            }catch(error){
                console.log(error)
                window.alert('Houve um erro ao buscar os cursos pelo filtro. Tente novamente.')
                handleSearchAllCourses()
            }
        }

        handleSearchCourseByTag()
    }, [id, handleSearchAllCourses])
    

    useEffect(() => {
        const handleSearchCoursesByName = async () => {
            try{
                if(!nameSearchCourses) return;

                const response = await ApiSearchCoursesAndTechnologies.SearchCoursesByName(nameSearchCourses)

                if(!response.status){
                    window.alert(response.error)
                    return;
                }

                setCourses(response.data)
            }catch(error){
                console.log(error)
                window.alert('Erro de conexão com a api de busca dos cursos pelo nome.')
            }
        }

        handleSearchCoursesByName()
    }, [nameSearchCourses])


  return (
    <>
        <div className=" bg-[oklch(14.5%_0_0)] mb-6">
            <div className="mx-auto p-[1rem]">
                <h2 className="sr-only text-white">Products</h2>

                <div className="grid grid-cols-3 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3 xl:gap-x-10">
                    {courses.map(element => (
                        
                        <Link to={`/detail/product/${element.id_course}`} key={element.id_course} className="group">
                            <img
                            src={`http://localhost:3000/search/course/image/${element.image}`}
                            alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                            className="aspect-square w-full h-[12rem] rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                            />
                            <h3 className="mt-3 text-base font-medium text-gray-100">{element.name}</h3>
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
                            {element.promotion ? (
                                <div className="flex flex-wrap gap-x-0.5 ">
                                    <p className="mt-3 text-lg font-medium text-gray-100">{element.price_promotion}</p>
                                    <p className="mt-3 font-medium text-gray-100 text-base line-through">{element.price}</p>
                                </div>
                            ):(
                                <div className="flex flex-wrap gap-x-0.5 ">
                                    <p className="mt-3 text-lg font-medium text-gray-100">{element.price}</p>
                                </div>
                            )}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    </>
  )
}

export default ListProducts