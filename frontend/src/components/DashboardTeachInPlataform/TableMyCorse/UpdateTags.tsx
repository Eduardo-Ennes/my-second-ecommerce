import { Button } from '@headlessui/react'
import { ScrollArea } from "@/components/ui/scroll-area"
import ArrowRigthWhite from '../../../assets/arrow-right-white.png'
import { Link } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, AlertTitle } from '@/components/ui/alert'

import ApiTagsTechnologies from '../../../api/tags/ApiTagsTechnologies'
import ApiTagsRequisit from '../../../api/tags/ApiTgasRequisit'


function Update_tags({ id }: { id: number | null }) {
    const navigate = useNavigate()
    const [error, setError] = useState<string[]>([])

    const [filterTech, setFilterTech] = useState<Array<{id: number, tech: string}>>([])
    const [technologies, setTechnologies] = useState<Array<{id: number, tech: string}>>()

    const [tec, setTec] = useState('')
    const [listTec, setListTec] = useState<Array<{ref_id: number, tech_id: number, tech: string}>>([])

    const [requisit, setRequisit] = useState('')
    const [listReq, setListReq] = useState<Array<{id: number, requisit: string, course_id: number}>>([])


//   --------- Technologies ---------

    // Função API que busca as tags de tecnologias
    useEffect(() => {
        const fetchTechnologies = async () => {
            try{
                const response = await fetch('http://localhost:3000/search/technologies', {
                    method: 'GET',
                })
                const res = await response.json()
                setTechnologies(res.data) 

            }catch(error){
                console.log(error)
            }
        }
        fetchTechnologies()
    }, [])


    // função para buscar as tags de tecnologias referenciadas a um curso
    const fetchTechnologiesCourse = useCallback(async () => {
        try {
            const response = await ApiTagsTechnologies.search(id)

            if (!response.status) {
                navigate('/dashboard')
                return
            }

            setListTec(response.data)
        } catch (error) {
            console.log(error)
        }

    }, [id, navigate])

    useEffect(() => {
        fetchTechnologiesCourse()
    }, [fetchTechnologiesCourse])


    // Função que filtra as tags na lista technologies
    const handleFiltertech = (element: string) => {
        if(technologies == undefined) return []
        const filter = technologies.filter(tag => tag.tech.startsWith(element.toLowerCase()))
        setFilterTech(filter)
    }


    // Função que referencia tags de tecnologia
    const handleAddTech = async (idTech: number) => { 
        try{
            const response = await ApiTagsTechnologies.create(id, idTech)
            
            if(!response.status){
                window.alert(response.error)
                navigate('/dashboard')
                return;
            }
            
            setTec('')
            fetchTechnologiesCourse()
        }catch(error){
            console.log(error)
            setError((prev) => [
                ...prev,
                'Houve um erro ao chamar a função de criação da tag de tecnologia. Recarregue a página.'
            ])
        }
    }

    
    // Função para remover tag de tecnologia
    const handleDeleteTech = async (idTech: number) => {
        try{
            const response = await ApiTagsTechnologies.delete(idTech)

            if(!response.status){
                window.alert(response.error)
                navigate('/dashboard')
                return;
            }

            fetchTechnologiesCourse()
        }catch(error){
            console.log(error)
            setError((prev) => [
                ...prev,
                'Houve um erro ao chamar a função de deleção da tag de tecnologia. Recarregue a página.'
            ])
        }
    }



//   --------- REQUISITS ---------  

// Função para buscar requisitos de um curso
const fetchRequisitsCourse = useCallback(async () => {
        try {
            const response = await ApiTagsRequisit.search(id)

            if (!response.status) {
                window.alert(response.error)
                navigate('/dashboard')
                return;
            }

            setListReq(response.data)
            setRequisit('')
        } catch (error) {
            console.log(error)
        }

    }, [id, navigate])

    useEffect(() => {
        fetchRequisitsCourse()
    }, [fetchRequisitsCourse])


    // Função para criar uma tag de requisito
    const handleCreateRequisit = async (event: React.MouseEvent<HTMLButtonElement>, requisit: string) => {
        event.preventDefault()
        try{
            const response = await ApiTagsRequisit.create(id, requisit)

            if(!response.status){
                setError(response.error)
                return
            }

            fetchRequisitsCourse()
            return;
        }catch(error){
            console.log(error)
            setError((prev) => [
                ...prev,
                'Houve um erro ao chamar a função de criação da tag de requisito do curso. Recarregue a página.'
            ])
        }
    }


    // Função para remover tag de requisito
    const handleDeleteRequisit = async (idRequisit: number) => {
        try{
            const response = await ApiTagsRequisit.delete(idRequisit)

            if(!response.status){
                setError(response.error)
                return;
            }

            fetchRequisitsCourse()
            return;
        }catch(error){
            console.log(error)
            setError((prev) => [
                ...prev,
                'Houve um erro ao chamar a função de deleção da tag de requisito do curso. Recarregue a página.'
            ])
        }
    }


  return (
    <>
        {/* Inputs de tags */}
        <form action='#' className="flex flex-wrap gap-6 mt-6 mb-6 justify-center">
            <div className="flex flex-col items-start">
                <div className="flex flex-wrap items-center gap-x-5">
                    <div>
                        <label htmlFor="name" className="block text-sm/6 font-semibold text-white">
                        Tecnologias ensinadas no curso
                        </label>
                        <div className="mt-2.5 w-[30rem]">
                        <input
                        id="name"
                        type="text"
                        name="name"
                        autoComplete="given-name"
                        placeholder="Exemplo: Python, JavaScript, Docker..."
                        value={tec}
                        onChange={(e) => {
                            setTec(e.target.value)
                            handleFiltertech(tec)}}
                        className="block rounded-md w-[30rem] bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                        />
                        </div>
                    </div>
                </div>


                {tec.length > 0 ? (
                    <ScrollArea className="w-[30rem] h-[10rem] p-1 mt-2 flex flex-col">
                        {filterTech.length > 0 ? (
                            <>
                                {filterTech.map((element) => (
                                    <Link // cada item precisa de key única
                                    to="#"
                                    key={element.id}
                                    onClick={() => handleAddTech(element.id)}
                                    className="text-white p-1 rounded transition-colors duration-200 hover:bg-zinc-700 cursor-pointer block w-[100%]"
                                    >
                                        - {element.tech[0].toUpperCase() + element.tech.slice(1)}
                                    </Link>
                                ))}
                            </>
                        ): (
                            <div>
                                <p>
                                A tecnologia <strong>{tec}</strong> está digitada incorretamente ou não está registrada em nosso banco de dados.
                                </p>
                            </div>
                        )}
                    </ScrollArea>
                ):(
                <>
                    {listTec.length > 0 ? (
                        <ScrollArea className="w-[30rem] h-[10rem] p-1 mt-2">
                            <div  className='flex flex-wrap gap-x-3 gap-y-3'>
                                {listTec.map((element) => (
                                    <Button
                                        type="button"
                                        key={element.ref_id}
                                        onClick={() => handleDeleteTech(element.ref_id)}
                                        className="p-2 bg-gray-300 hover:bg-gray-400 text-black text-start rounded transition-colors duration-200 truncate cursor-pointer"
                                    >
                                        {element.tech}
                                    </Button>
                                ))}
                            </div>
                        </ScrollArea>
                    ):(
                        <ul className="p-1 h-[10rem]">
                            <li className="text-start">
                                <h2 className="text-gray-200 text-base p-[1rem] font-bold">
                                    Adicione as tecnologias abordadas no curso.
                                </h2>
                            </li>
                        </ul>
                    )}
                </>
                )}
            </div>

            <div className="flex flex-col items-start w-[30rem]">
                <div className="flex flex-wrap items-center gap-x-5">
                    <div>
                    <label htmlFor="name" className="block text-sm/6 font-semibold text-white">
                    Requisitos para cursar?
                    </label>
                    <div className="mt-2.5">
                    <input
                    id="name"
                    type="text"
                    name="name"
                    autoComplete="given-name"
                    placeholder="Ter conhecimento em..."
                    value={requisit}
                    onChange={(e) => setRequisit(e.target.value)}
                    className="block rounded-md w-[22rem] bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                    />
                    </div>
                </div>

                <Button 
                    type="button"
                    onClick={(e) => handleCreateRequisit(e, requisit)}
                    className="rounded cursor-pointer mt-9 bg-zinc-700 hover:bg-zinc-800 px-4 py-2 text-base text-gray-200" 
                    >
                    Adicionar
                </Button>
                </div>

                {listReq.length > 0 ?
                    <ScrollArea className="w-[30rem] h-[10rem] flex flex-col gap-x-1 mt-2">
                        {listReq.map((element) => (
                            <Link
                            to="#"
                            key={element.id}
                            onClick={() => handleDeleteRequisit(element.id)}
                            className="text-white flex flex-wrap gap-3 items-center break-words p-2 rounded transition-[2s] hover:bg-zinc-700 cursor-pointer w-[30rem]" 
                            >
                                <img src={ArrowRigthWhite} alt="Icone de flecha idicadora." />
                                <p className="w-[27rem]">
                                {element.requisit}
                                </p>
                            </Link>
                        ))}
                    </ScrollArea>
                :   
                    <ul className="p-1 h-[10rem]">
                        <li className="text-start">
                        <h2 className="text-gray-200 text-base p-[1rem] font-bold">Adicione os conhecimentos mínimos para cursa.</h2>
                        </li>
                    </ul>
                }
            </div>

            {error.length > 0 && 
                <>
                    {error.map(erro => (
                        <div className="sm:col-span-2 w-[70%]">
                            <div className="ml-auto mr-auto mt-2 mb-2">
                                <Alert variant="destructive" className="bg-red-500">
                                    <AlertTitle className="text-gray-200 text-base flex flex-wrap gap-x-3">
                                        <img src={ArrowRigthWhite} alt="#" />
                                            <p>
                                                {erro}
                                            </p>
                                    </AlertTitle>
                                </Alert>
                            </div>
                        </div>
                    ))}
                </>
            }

            <div className="flex justify-end w-[70%] ml-auto mr-auto mt-3">
                <Button 
                type="button"
                className="w-[20%] rounded cursor-pointer bg-fuchsia-900 hover:bg-fuchsia-950 px-4 py-2 text-base text-gray-200" onClick={(e) => e.stopPropagation()}>
                    Atualizar tags
                </Button>
            </div>
        </form>
    </>
  )
}

export default Update_tags