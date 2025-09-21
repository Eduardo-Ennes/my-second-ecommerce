import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import ArrowRight from '../../assets/arrow-small-right.png'

import {
  Alert,
  AlertTitle,
} from "@/components/ui/alert"



function CreateCorse() {
   const [error, seterror] = useState("")

  const [listWillLearn, setListWillLearn] = useState<Array<{name: string}>>([])
  const [varWillLearn, setVarWillLearn] = useState("")

  const [listRequists, setListRequisits] = useState<Array<{name: string}>>([])
  const [varRequisits, setVarRequisits] = useState("")
 

  const handleWillLearnAndRequists = (event: React.MouseEvent<HTMLButtonElement>, option: string, element: string) => {
    event.preventDefault()

    if(option === "willLearn"){
      setListWillLearn((prev) => [
        ...prev,
        { name: element }
      ])

       setVarWillLearn("")
    }

    if(option === "requisits"){
      setListRequisits([
        ...listRequists,
        {name: element}
      ])

      setVarRequisits("")
    }
  }

  return (
    <>
        <h2 className="text-gray-200 text-2xl font-bold mt-5 ml-auto mr-auto mb-5 text-center border-b border-zinc-700 w-[90%]">Create Corse</h2>

        <form action="#" className="w-[50%] m-auto flex flex-col gap-y-8 mb-30"> 
          <div>
            <label htmlFor="name" className="block text-sm/6 font-semibold text-white">
            Nome do curso
            </label>
            <div className="mt-2.5">
              <input
              id="name"
              type="text"
              name="name"
              autoComplete="organization"
              className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-x-3">
            <div className="flex-1">
              <label htmlFor="price" className="block text-sm/6 font-semibold text-white">
              Preço R$
              </label>
              <div className="mt-2.5">
                <input
                id="price"
                type="number"
                name="price"
                autoComplete="organization"
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                />
              </div>
            </div>

            <div className="flex-1">
              <label htmlFor="price_promotion" className="block text-sm/6 font-semibold text-white">
              Preço promocional R$
              </label>
              <div className="mt-2.5">
                <input
                id="price_promotion"
                type="number"
                name="price_promotion"
                autoComplete="organization"
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                />
              </div>
            </div>
          </div>

          <div>
            <div>
              <label htmlFor="isSale" className="block text-sm/6 font-semibold text-white">Começar com o preço promocional?</label>
              <div>
                <select
                id="isSale"
                name="isSale"
                autoComplete="isSale"
                aria-label="isSale"
                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white/5 py-2 pr-7 pl-3.5 text-base text-gray-400 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                >
                    <option className="text-black">Opção</option>
                    <option className="text-black">Sim</option>
                    <option className="text-black">Não</option>
                </select>
              </div>
            </div>
          </div>

          {/* formulário do que irá aprender */}
          <div>
            <ScrollArea className="h-[15rem] mt-5 border-1 border-gray-700 rounded-md p-1">
                <ul className='flex flex-wrap gap-x-3 gap-y-3 justify-start'>
                  {listWillLearn.length > 0 ?
                    listWillLearn.map((item) => (
                      <li>
                        {/* DEPOIS DEVE SE TROCAR ESTE MAP PARA OBJETO LITERAL */}
                        <div className="flex flex-wrap items-center gap-3">
                            <img src={ArrowRight} alt="Icone flecha de demostração" />
                            <Button 
                            type="button"
                            className="bg-zinc-900 block hover:bg-zinc-700 text-blue-700 w-[17rem] text-start truncate cursor-pointer" 
                            >
                              {item.name}
                            </Button>
                        </div>
                      </li>
                    ))
                  :
                    <li className="text-sm text-gray-500">
                      Adicione no campo abaixo tecnologias, funcionalidades ou outros assuntos que o usuário aprenderá neste curso.
                    </li>
                  }
                  
                </ul>
            </ScrollArea>

            <div className="flex flex-wrap gap-x-3 items-center justify-center mt-2.5">
              <input
                id="name"
                type="text"
                name="name"
                value={varWillLearn}
                autoComplete="organization"
                onChange={(e) => setVarWillLearn(e.target.value)}
                className="block rounded-md w-[30rem] bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                />

              <Button 
              type="button"
              className="rounded cursor-pointer bg-zinc-700 hover:bg-zinc-800 px-4 py-2 text-base text-gray-200" 
              onClick={(e) => handleWillLearnAndRequists(e, "willLearn", varWillLearn)}>
                Adicionar
              </Button>
            </div>
          </div>

          {/* formulário dos requisitos do curso */}
          <div>
            <ScrollArea className="h-[15rem] mt-5 border-1 border-gray-700 rounded-md p-1">
                <ul className='flex flex-wrap gap-x-3 gap-y-3 justify-start'>
                  {listRequists.length > 0 ?
                    listRequists.map((item) => (
                      <li>
                          <div className="flex flex-wrap items-center gap-3">
                              <img src={ArrowRight} alt="Icone flecha de demostração" />
                              <Button 
                              type="button"
                              className="bg-zinc-900 block hover:bg-zinc-700 text-blue-700 w-[17rem] text-start truncate cursor-pointer" 
                              >
                                {item.name}
                              </Button>
                          </div>
                      </li>
                    ))
                  :
                    <li className="text-sm text-gray-500">
                      Adicione no campo abaixo os requisitos mínimos para o usuário realizar este curso.
                    </li>
                  }
                  
                </ul>
            </ScrollArea>

            <div className="flex flex-wrap gap-x-3 items-center justify-center mt-5">
              <input
                id="name"
                type="text"
                name="name"
                autoComplete="organization"
                value={varRequisits}
                onChange={(e) => setVarRequisits(e.target.value)}
                className="block rounded-md w-[30rem] bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                />

              <Button 
              type="button"
              className="rounded cursor-pointer bg-zinc-700 hover:bg-zinc-800 px-4 py-2 text-base text-gray-200" 
              onClick={(e) => handleWillLearnAndRequists(e, "requisits", varRequisits)}>
                Adicionar
              </Button>
            </div>
          </div>


          <div className="mt-5">
              <Textarea 
              className="h-[10rem] block rounded-md bg-white/5 px-3.5 py-2 text-base text-white placeholder:text-gray-500 !border-gray-700" 
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

          <Button 
          type="submit"
          className="w-[25%] ml-auto rounded cursor-pointer bg-zinc-700 hover:bg-zinc-800 px-4 py-2 text-base text-gray-200" onClick={(e) => e.stopPropagation()}>
            Enviar
          </Button>
        </form>
    </>
  )
}

export default CreateCorse