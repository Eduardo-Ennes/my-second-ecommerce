import { Button } from "@/components/ui/button"
// import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
// import ArrowRight from '../../assets/arrow-small-right.png'
import {
  Alert,
  AlertTitle,
} from "@/components/ui/alert"
import ApiCourse from '../../api/course/ApiCouser.js'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import arrowRightWhite from '../../assets/arrow-right-white.png'


function CreateCorse({redirectTo}: {redirectTo: () => void}) {
  const navigate = useNavigate()
  const [error, setError] = useState("")

  const [formCourse, setFormCourse] = useState({
    name: '',
    price: 0,
    price_promotion: 0,
    promotion: '',
    description: ''
  })

  // Função para criar o curso
  const fetchCreateCorse = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const response = await ApiCourse.CreateCourse(formCourse)
    if(!response.status){
      if(response.code === 401){
        window.alert('Usuario não autenticado. Faça login novamente.')
        navigate('/login')
        return;
      }

      setError(response.error)
      return;
    }

    window.alert(response.message)
    setFormCourse({
      name: '',
      price: 0,
      price_promotion: 0,
      promotion: '',
      description: ''
    })
    redirectTo()
  }


  return (
    <>
        <h2 className="text-gray-200 text-2xl font-bold mt-5 ml-auto mr-auto mb-5 text-center border-b border-zinc-700 w-[90%]">Create Corse</h2>

        <form onSubmit={(e) => fetchCreateCorse(e)} className="m-auto flex flex-col gap-y-8 mb-30"> 
          <div className="w-[80%] ml-auto mr-auto flex flex-wrap items-center justify-between">
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
                placeholder="Nome do curso"
                onChange={(e) => setFormCourse({...formCourse, name: e.target.value})}
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
                  min={0}
                  onChange={(e) => setFormCourse({...formCourse, price: Number(e.target.value)})}
                  placeholder="R$49,99"
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
                  min={0}
                  onChange={(e) => setFormCourse({...formCourse, price_promotion: Number(e.target.value)})}
                  autoComplete="given-name"
                  placeholder="R$29,99"
                  className="block rounded-md w-[8rem] bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Input opção promoção */}
            <div>
                <label htmlFor="isPromotion" className="block text-sm/6 font-semibold text-white">Começar com preço promocional?</label>
                <div className="mt-3">
                  <select
                  id="isPromotion"
                  name="isPromotion"
                  onChange={(e) => setFormCourse({...formCourse, promotion: e.target.value})}
                  autoComplete="isSale"
                  aria-label="isSale"
                  className="col-start-1 row-start-1 w-[10rem] rounded-md bg-white/5 py-2 pr-7 pl-3.5 text-base text-gray-400 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  >
                      <option className="text-black">Opção</option>
                      <option value="true" className="text-black">Sim</option>
                      <option value="false" className="text-black">Não</option>
                  </select>
                </div>
              </div>
          </div>

          <div className="mt-5">
              <Textarea 
              onChange={(e) => setFormCourse({...formCourse, description: e.target.value})}
              className="h-[10rem] block w-[70%] ml-auto mr-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white placeholder:text-gray-500 !border-gray-700" 
              placeholder="Faça uma descrição detalhada sobre todo o curso, temas que serão abordados, matérias, tecnologias, o que esperar e etc." />      
          </div>

          {error.length > 0 && 
            <div className="sm:col-span-2">
                <div className="w-[70%] ml-auto mr-auto mt-2 mb-2">
                    <Alert variant="destructive" className="bg-red-500">
                        <AlertTitle className="text-gray-200 text-base flex flex-wrap gap-x-3">
                          <img src={arrowRightWhite} alt="#" />
                          <p>
                            {error}
                          </p>
                        </AlertTitle>
                    </Alert>
                </div>
            </div>
          }

          <div className="flex justify-end w-[70%] ml-auto mr-auto">
            <Button 
            type="submit"
            className="w-[20%] rounded cursor-pointer bg-fuchsia-900 hover:bg-fuchsia-950 px-4 py-2 text-base text-gray-200" onClick={(e) => e.stopPropagation()}>
              Criar curso
            </Button>
          </div>
        </form>
    </>
  )
}

export default CreateCorse