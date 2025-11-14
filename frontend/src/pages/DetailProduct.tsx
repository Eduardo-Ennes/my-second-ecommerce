// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '@headlessui/react'
import loading from '../media/carregando.jpg'
import Header from '../components/Header'
import Footer from "@/components/Footer"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
// import { ScrollArea } from "@/components/ui/scroll-area"
import { useCallback, useEffect, useState } from "react"
// import Avaliation from "@/components/Avaliation"
import { useParams, useNavigate } from "react-router-dom"
import DetailCourse from '../api/detailCourse/searchCourse'

// Esses são os dados que retornao do response.data
type Course = {
    id_course: number
    name: string
    description: string
    price: number 
    price_promotion: number 
    promotion: boolean
    owner: number
    image: string
    id_user: number 
    first_name: string
    last_name: string
    technologies: {id: number, tech: string}[]
    requisits: {id: number, requisit: string}[]
}

function DetailProduct() {
    const navigate = useNavigate()
    const params = useParams<{ id: string }>()
    // Aqui saberemos se tem um usuário logado, se sim retornará o id.
    const [idUser, setIdUser] = useState<number | null>()
    // Serve para controlar o estado do botão de add e del da lista de favoritos, id é usado como paramêtro para remoção
    const [favorite, setFavorite] = useState<{status: boolean, id: number}>()
    const [course, setCourse] = useState<Course>()


    // Busca os dados no backend, como ele vem dados da tabelas do curso, usuário e lista de favoritos
    const handleSearchDetailCourse = useCallback(async () => {
        try{ 
            if(!params) return;
            const response = await DetailCourse.searchCourse(Number(params.id))

            if(!response.data){
                window.alert(response.error)
                navigate('/')
                return;
            }

            setCourse(response.data)
            setIdUser(response.user)
            setFavorite(response.favorite)
        }catch(error){
            console.log(error)
            window.alert('Houve um erro de conexão com o servidor e não foi possivel buscar os detalhes do produto.')
            navigate('/')
        }
    }, [params, navigate])


    useEffect(() => {
        handleSearchDetailCourse()
    }, [params, navigate,handleSearchDetailCourse])


    // Adicionar um novo curso a lista de favoritos, usado como parametro o id do curso
    const handleAddInListFavorite = async (id: number) => {
        try{
            const response = await DetailCourse.addListFavorite(id)

            if(!response.status){
                window.alert(response.error)
                return;
            }

            handleSearchDetailCourse()
        }catch(error){
            console.log(error)
            window.alert('Houve um erro de conexão com a função que adiciona um curso na lista de favoritos.')
            navigate('/')
        }
    }


    // Remover da lista de favoritos, usado como paramêtro o proprio id da tabela 
    const handleDeleteInListFavorite = async (id: number) => {
        try{
            const response = await DetailCourse.deleteListFavorite(id)
            if(!response.status){
                window.alert(response.error)
                return;
            }            

            handleSearchDetailCourse()
        }catch(error){
            console.log(error)
            window.alert('Houve um erro de conexão com a função que remove um curso da lista de favoritos.')
            navigate('/')
        }
    }

    // Adiciona um curso ao carrinho de compras, id do curso usado como referência
    const handleAddCourseCard = async (id: number) => {
        try{    
            const response = await fetch(`http://localhost:3000/add/course/card/${id}`, {
                method: 'POST'
            })

            const data = await response.json()
            if(!data.status){
                window.alert(data.error)
                return;
            }

            navigate('/card')
        }catch(error){
            console.log(error)
            window.alert('Error ao adicionar o curso no carrinho. Falha na conexão com o servidor.')
            navigate(`/detail/product/${params}`)
        }
    }


    const [valueDesc, setValueDesc] = useState<string | undefined>(undefined)
  return (
    <>
        <Header args={"No"}/>

        <div className="p-[1rem]">
            <div className="group flex flex-wrap justify-between">
                <div className="flex flex-wrap gap-3">
                    <div>
                        {course?.image ? (
                            <img
                            src={`http://localhost:3000/search/course/image/${course.image}`}
                            alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                            className="aspect-square w-[28rem] h-[14rem] rounded-lg bg-gray-200 object-cover xl:aspect-7/8"
                            />
                        ):(
                            <img
                            src={loading}
                            alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                            className="aspect-square w-[28rem] h-[14rem] rounded-lg bg-gray-200 object-cover xl:aspect-7/8"
                            />
                        )}
                    </div>
                    <div>
                        <h3 className="text-2xl font-medium text-gray-100">{course?.name}</h3>
                        <p className="mt-3 text-sm text-gray-100">{course?.first_name} {course?.last_name}</p>
                        <div className="flex flex-wrap items-center mt-3 gap-x-2">
                            {/* Funcionalidade em desenvolvimento. */}
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
                            {course?.promotion ? (
                                <>
                                    <p className="mt-3 text-lg font-medium text-gray-100">R${course.price_promotion}</p>
                                    <p className="mt-3 font-medium text-gray-100 text-base line-through">R${course.price}</p>
                                </>
                            ):(
                                <p className="mt-3 text-lg font-medium text-gray-100">R${course?.price}</p>
                            )}
                        </div>
                    </div>
                </div>
                

                {/* if o dono(owner) do curso for diferente do id do usuário logado. Para que o usuário possa apenas ver os botões se o curso não for dele. */}
                {course?.owner !== idUser &&
                    <div className="w-[18rem] flex flex-col justify-end items-center gap-3">
                        <Button 
                        type="button" 
                        onClick={() => handleAddCourseCard(course?.id_course || 0)}
                        className="rounded cursor-pointer bg-zinc-900 px-4 py-2 text-sm text-white data-active:bg-sky-700 data-hover:bg-zinc-800 w-full">
                        Adicionar ao carrinho
                        </Button>
                    
                        {/* if o usuário logado for null, não mostra os botões de add e remove da lista de favoritos. */}
                        {idUser !== null && 
                            <>
                                {/*  esta condição verifica se o id do curso ésta no campo do course_id e id do usuário logado está no campo do id_user da tabela list_favorites retornado do backend, isso para verificar os estados do butão para adicionar ou remover um curso da lista de favoritos */}

                                {favorite?.status ?(
                                    <Button 
                                    type="button"
                                    onClick={() => handleDeleteInListFavorite(favorite.id)}
                                    className="w-full rounded cursor-pointer bg-red-600 px-4 py-2 text-sm text-white data-hover:bg-red-700">
                                    Remover dos favoritos
                                    </Button>
                                ):(
                                    <Button 
                                    type="button"
                                    onClick={() => handleAddInListFavorite(course?.id_course || 0)}
                                    className="w-full rounded cursor-pointer bg-fuchsia-900 px-4 py-2 text-sm text-white data-hover:bg-fuchsia-950">
                                    Lista de favoritos
                                    </Button>
                                )}
                            </>
                        }
                    </div>
                }
            </div>


            {/* TAGS */}
            <div className="flex flex-wrap justify-around">
                <div className="w-[48%] mt-[3rem] pl-[1rem] p-2">
                    <h2 className="text-gray-200 font-bold text-xl mb-2">Temas relacionados</h2>
                    <div className="flex flex-wrap items-center gap-2">
                        {course?.technologies.map(element => (
                            <Badge key={element.id} variant="secondary" className="text-base p-2 text-zinc-900 bg-gray-200">{element.tech}</Badge>
                        ))}
                    </div>
                </div>
                

                {/* REQUISITOS */}
                <div className="w-[48%] mt-[3rem] pl-[1rem] p-2 border-l border-gray-700">
                    <h2 className="text-gray-200 text-xl font-bold">Requisitos para o curso</h2>
                    <ul  className="grid grid-cols-2 gap-x-8 gap-y-4 list-disc list-inside text-gray-200 mt-3">
                        {course?.requisits.map(element => (
                            <li key={element.id}>{element.requisit}</li>
                        ))}
                    </ul>
                </div>
            </div>
            


            <div className="mt-[5rem]">
                {/* Descrição do curso */}
                <section className="mt-5">
                    <Accordion type="single" collapsible className="rounded w-full bg-zinc-900" value={valueDesc} onValueChange={setValueDesc}>
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="text-lg cursor-pointer text-gray-200 pl-3">Descrição</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance text-white p-5">
                                <div className="text-justify leading-relaxed text-gray-200 text-base">{course?.description}</div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </section>
            </div>


            {/* FUNCIONALIDADES EM DESENVOLVIMENTO */}
            {/* <div className="flex flex-wrap justify-between">
                <div className="w-[50%] mt-[5rem] max-h-[40em]"> 
                    <div className="flex flex-wrap items-center gap-5 pl-[1rem]">
                        <div>
                            <Avatar className="w-25 h-25">
                                <AvatarImage />
                                <AvatarFallback className="text-zinc-900">CN</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="text-gray-200">
                            <p>Eduardo Ennes</p>
                            <p>(4,9) Classificação</p>
                            <p>(50.000) avaliações</p>
                            <p>(200.000) alunos</p>
                            <p>(150) cursos</p>
                        </div>
                    </div>
                    
                    <div className="max-h-[37rem] mt-2 p-4 text-white leading-relaxed w-full">
                        A tecnologia mudou profundamente a forma como vivemos e nos comunicamos. Ferramentas digitais permitem hoje resolver tarefas em minutos que antes exigiam horas de trabalho. A internet trouxe acesso quase ilimitado à informação e possibilitou a criação de relações e oportunidades de trabalho em ambientes virtuais. Ao mesmo tempo, essa facilidade trouxe desafios, como a dependência excessiva de dispositivos e a necessidade de filtrar informações confiáveis em meio a tanto conteúdo disponível.
                    </div>
                </div>


                <div className="w-[50%] mt-[5rem]">
                    <h2 className="text-gray-200 ml-3 w-[90%] text-xl font-bold text-center bg-zinc-900 rounded-3xl p-1">Cursos Eduardo Ennes</h2>
                    <ScrollArea className="max-h-[40rem] p-4">
                        <div className="flex flex-col gap-7">
                            <div className="group flex flex-wrap gap-2">
                                <div>
                                    <img
                                    src={imageTeste}
                                    alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                                    className="aspect-square w-[13rem] h-[8rem] rounded-lg bg-gray-200 object-cover xl:aspect-7/8"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-base font-medium text-gray-100">Formação na linguagem de programação python</h3>
                                    <p className="mt-2 text-sm text-gray-100">Nome do instrutor</p>
                                    <div className="flex flex-wrap items-center mt-2 gap-x-2">
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
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </div>
            </div> */}

            {/* Área de avaliação do produto */}
            {/* <Avaliation args={false}/> */}

        </div>
        <Footer />
    </>
  )
}

export default DetailProduct