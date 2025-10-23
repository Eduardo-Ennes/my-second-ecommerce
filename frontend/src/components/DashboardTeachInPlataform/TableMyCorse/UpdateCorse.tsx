// import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Alert,
  AlertTitle,
} from "@/components/ui/alert"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ApiCourse from '../../../api/course/ApiCouser'

type Course = {
  id: number
  name: string
  price: string
  price_promotion?: string
  promotion: string
  status: string
  description: string
}

function UpdateCorse({ id, reloadInfos }: { id: number | null; reloadInfos: () => void }) {
  const navigate = useNavigate()
  const [err, setErr] = useState('')
  const [course, setCourse] = useState<Course | null>(null)


   // Função de fetch memorável
  // Executa o fetch inicialmente
  useEffect(() => {
    const ApiSearchDeatilCourse = async () => {
      if(id === null) return;

      try {
        const response = await fetch(`http://localhost:3000/search/user/course/${id}`);
        const data = await response.json();

        if(data.data) setCourse(data.data);
        else {
          window.alert('Erro ao buscar curso');
          navigate('/dashboard');
        }
      } catch(error) {
        console.log(error);
      }
    }

    ApiSearchDeatilCourse()
  }, [id, navigate]);


  // função para atuzalizar um curso
  const handleUpdateCourse = async (event: React.FormEvent<HTMLFormElement>) => {
    try{
      event.preventDefault()
      if(!course) return 

      if(!id) {
        window.alert('ID do curso não encontrado. Tente novamente.')
        navigate('/dashboard')
        return
      } 

      const response = await ApiCourse.UpdateCourse(id, course)
      if(!response.status){
        setErr(response.error)
        return
      }

      window.alert(response.message)
      reloadInfos()
    }catch(error){
      console.log(error)
    }
  }

  return (
    <>
      {course && (
        <>
          <h2 className="text-gray-200 text-2xl font-bold mt-40 ml-auto mr-auto mb-20 text-center border-b border-zinc-700 w-[90%]">{course.name}</h2>

          <form onSubmit={(e) => {handleUpdateCourse(e)}} className="m-auto flex flex-col gap-y-8 mb-30"> 
            <div className="w-[90%] ml-auto mr-auto flex flex-wrap items-center justify-between">
                {/* Input nome do curso */}
                <div>
                    <label htmlFor="name" className="block text-sm/6 font-semibold text-white">
                Nome do curso
                </label>
                  <div className="mt-2.5">
                      <input
                      id="name"
                      type="text"
                      name="name"
                      value={course.name}
                      onChange={(e) => setCourse({...course, name: e.target.value})}
                      autoComplete="given-name"
                      className="block rounded-md w-[30rem] bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                      />
                  </div>
                </div>
                

                {/* Input Preço */}
                <div>
                  <div>
                      <label htmlFor="price" className="block text-sm/6 font-semibold text-white">
                      Preço R$
                      </label>
                      <div className="mt-2.5">
                      <input
                      id="price"
                      type="number"
                      name="price"
                      value={course.price}
                      onChange={(e) => setCourse({...course, price: e.target.value})}
                      autoComplete="organization"
                      className="block rounded-md w-[8rem] bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                      />
                      </div>
                  </div>
                </div>

                {/* Input preço promocional */}
                <div>
                  <div>
                      <label htmlFor="price_promotion" className="block text-sm/6 font-semibold text-white">
                      Preço promocional R$
                      </label>
                      <div className="mt-2.5">
                      <input
                      id="price_promotion"
                      type="number"
                      name="price_promotion"
                      autoComplete="given-name"
                      value={course.price_promotion}
                      onChange={(e) => setCourse({...course, price_promotion: e.target.value})}
                      className="block rounded-md w-[8rem] bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                      />
                      </div>
                  </div>
                </div>

                {/* Input opção promoção */}
                <div>
                    <label htmlFor="isPromotion" className="block text-sm/6 font-semibold text-white">Preço promocional?</label>
                    <div className="mt-3">
                        <select
                        autoComplete="isSale"
                        value={course.promotion}
                        onChange={(e) => setCourse({...course, promotion: e.target.value})}
                        aria-label="isSale"
                        className="col-start-1 row-start-1 w-[8rem] rounded-md bg-white/5 py-2 pr-7 pl-3.5 text-base text-gray-400 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        >
                            <option className="text-black">Opção</option>
                            <option className="text-black" value="true">Sim</option>
                            <option className="text-black" value="false">Não</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="status" className="block text-sm/6 font-semibold text-white">Status</label>
                    <div className="mt-3">
                        <select
                        id="status"
                        name="status"
                        value={course.status}
                        onChange={(e) => setCourse({...course, status: e.target.value})}
                        autoComplete="isSale"
                        aria-label="isSale"
                        className="col-start-1 row-start-1 w-[8rem] rounded-md bg-white/5 py-2 pr-7 pl-3.5 text-base text-gray-400 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        >
                            <option className="text-black">Opção</option>
                            <option className="text-black" value="true">Sim</option>
                            <option className="text-black" value="false">Não</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <Textarea 
                className="h-[10rem] block w-[70%] ml-auto mr-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white placeholder:text-gray-500 !border-gray-700" 
                placeholder="Faça uma descrição detalhada sobre todo o curso, temas que serão abordados, matérias, tecnologias, o que esperar e etc." 
                value={course.description}
                onChange={(e) => setCourse({...course, description: e.target.value})}/>      
            </div>

            {err.length > 0 && 
              <div className="sm:col-span-2">
                <div className="w-full ml-auto mr-auto mt-2 mb-2">
                    <Alert variant="destructive" className="bg-red-500">
                        <AlertTitle className="text-gray-200">{err}</AlertTitle>
                    </Alert>
                </div>
            </div>
            }

            <div className="flex justify-end w-[70%] ml-auto mr-auto">
              <Button 
              type="submit"
              className="w-[20%] rounded cursor-pointer bg-fuchsia-900 hover:bg-fuchsia-950 px-4 py-2 text-base text-gray-200" onClick={(e) => e.stopPropagation()}>
                Atualizar informações
              </Button>
            </div>
          </form>
        </>
      )}   
    </>
  )
}

export default UpdateCorse