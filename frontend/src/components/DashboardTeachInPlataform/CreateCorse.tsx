import { useState } from "react"
import { Button } from "@/components/ui/button"
// import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
// import ArrowRight from '../../assets/arrow-small-right.png'

import {
  Alert,
  AlertTitle,
} from "@/components/ui/alert"
import { Link } from "react-router-dom"



function CreateCorse() {
  const [tec, setTec] = useState("")
  const [listTec, setListTec] = useState<Array<{name: string}>>([])

  const [requisit, setRequisit] = useState("")
  const [listReq, setListReq] = useState<Array<{name: string}>>([])

  const [formCorse, setFormCorse] = useState({
    name: '',
    price: 0,
    price_promotion: 0,
    promotion: false,
    description: ''
  })

  const error = ""

  const handleFromCreateCorse = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const handleAddTags = (event: React.MouseEvent<HTMLButtonElement>, element: string) => {
    event.preventDefault()
    if(!listTec.some(tag => tag.name === element)){
      setListTec([
        ...listTec,
        {name: element} 
      ])
    }

    setTec("")
  }

  const handleDeleteTags = (event: React.MouseEvent<HTMLButtonElement>, element: string) => {
    event.preventDefault()
    const newTags = listTec.filter((tag) => tag.name != element)
    setListTec(newTags)
  }


  const handleAddRequisit = (event: React.MouseEvent<HTMLButtonElement>, element: string) => {
    event.preventDefault()
    if(!listReq.some(tag => tag.name === element)){
      setListReq([
        ...listReq,
        {name: element} 
      ])
    }

    setRequisit("")
  }

  const handleDeleteRequisit = (element: string) => {
    const newTags = listReq.filter((tag) => tag.name != element)
    setListReq(newTags)
  }


  return (
    <>
        <h2 className="text-gray-200 text-2xl font-bold mt-5 ml-auto mr-auto mb-5 text-center border-b border-zinc-700 w-[90%]">Create Corse</h2>

        <form onSubmit={(e) => handleFromCreateCorse(e)} className="m-auto flex flex-col gap-y-8 mb-30"> 
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
                onChange={(e) => setFormCorse({...formCorse, name: e.target.value})}
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
                  onChange={(e) => setFormCorse({...formCorse, price: Number(e.target.value)})}
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
                  onChange={(e) => setFormCorse({...formCorse, price_promotion: Number(e.target.value)})}
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
                  onChange={(e) => setFormCorse({...formCorse, promotion: Boolean(e.target.value)})}
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


          {/* Inputs de tags */}
          <div className="flex flex-wrap gap-6 mt-6 mb-6 justify-center">

            <div className="flex flex-col items-start w-[30rem]">
              <div className="flex flex-wrap items-center gap-x-5">
                <div>
                  <label htmlFor="name" className="block text-sm/6 font-semibold text-white">
                  Tecnologias ensinadas no curso
                  </label>
                  <div className="mt-2.5">
                    <input
                    id="name"
                    type="text"
                    name="name"
                    autoComplete="given-name"
                    placeholder="Exemplo: Python, JavaScript, Docker..."
                    value={tec}
                    onChange={(e) => setTec(e.target.value)}
                    className="block rounded-md w-[22rem] bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                    />
                  </div>
                </div>

                <Button 
                  type="button"
                  
                  onClick={(e) => handleAddTags(e, tec)}
                  className="rounded cursor-pointer mt-9 bg-zinc-700 hover:bg-zinc-800 px-4 py-2 text-base text-gray-200" 
                  >
                    Adicionar
                </Button>
              </div>

              {listTec.length > 0 ?
                <ul className="w-[100%] flex flex-wrap gap-x-1 p-1 mt-2">
                  {listTec.map((element) => (
                    <li key={element.name}>
                      <Button 
                      type="button"
                      onClick={(e) => handleDeleteTags(e, element.name)}
                      className="bg-gray-200 hover:bg-gray-400 text-black text-start truncate cursor-pointer mt-2" 
                      >
                      {element.name}
                      </Button>
                    </li>
                  ))}
                </ul>
              :   
                <ul className="p-1">
                  <li className="text-start">
                    <h2 className="text-gray-200 text-base p-[1rem] font-bold">Adicione as tecnologias aboradads no curso.</h2>
                  </li>
                </ul>
              }
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
                    placeholder="Tecnologias do curso"
                    value={requisit}
                    onChange={(e) => setRequisit(e.target.value)}
                    className="block rounded-md w-[22rem] bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                    />
                  </div>
                </div>

                <Button 
                  type="button"
                  
                  onClick={(e) => handleAddRequisit(e, requisit)}
                  className="rounded cursor-pointer mt-9 bg-zinc-700 hover:bg-zinc-800 px-4 py-2 text-base text-gray-200" 
                  >
                    Adicionar
                </Button>
              </div>

              {listReq.length > 0 ?
                <ul className="w-[100%] flex flex-col gap-y-1 p-1 mt-2">
                  {listReq.map((element) => (
                    <li key={element.name} className="list-decimal w-[97%] ml-auto">
                      <Link
                      to="#"
                      onClick={() => handleDeleteRequisit(element.name)}
                      className="text-white p-1 rounded transition-[2s] hover:bg-zinc-700 cursor-pointer w-[100%] block" 
                      >
                      {element.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              :   
                <ul className="p-1">
                  <li className="text-start">
                    <h2 className="text-gray-200 text-base p-[1rem] font-bold">Adicione as tecnologias aboradads no curso.</h2>
                  </li>
                </ul>
              }
            </div>

          </div>
          
          
          <div className="mt-5">
              <Textarea 
              onChange={(e) => setFormCorse({...formCorse, description: e.target.value})}
              className="h-[10rem] block w-[70%] ml-auto mr-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white placeholder:text-gray-500 !border-gray-700" 
              placeholder="Faça uma descrição detalhada sobre todo o curso, temas que serão abordados, matérias, tecnologias, o que esperar e etc." />      
          </div>

          {error.length > 0 && 
            <div className="sm:col-span-2">
              <div className="w-full ml-auto mr-auto mt-2 mb-2">
                  <Alert variant="destructive" className="bg-red-500">
                      <AlertTitle className="text-gray-200">Não há error</AlertTitle>
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