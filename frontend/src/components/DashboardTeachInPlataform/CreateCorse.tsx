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
  const [tag, setTag] = useState("")

  const [listTags, setListTags] = useState<Array<{name: string}>>([])

  const [error, seterror] = useState("")

  const [listWillLearn, setListWillLearn] = useState<Array<{name: string}>>([])
  const [varWillLearn, setVarWillLearn] = useState("")

  const [listRequists, setListRequisits] = useState<Array<{name: string}>>([])
  const [varRequisits, setVarRequisits] = useState("")
 

  const handleAddTags = (event: React.MouseEvent<HTMLButtonElement>, element: string) => {
    event.preventDefault()
    if(!listTags.some(tag => tag.name === element)){
      setListTags([
        ...listTags,
        {name: element} 
      ])
    }

    setTag("")
  }

  const handleDeleteTags = (event: React.MouseEvent<HTMLButtonElement>, element: string) => {
    event.preventDefault()
    const newTags = listTags.filter((tag) => tag.name != element)
    setListTags(newTags)
  }

  const handleWillLearnAndRequists = (event: React.ChangeEvent<HTMLSelectElement>, option: string, element: string) => {
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

        <form action="#" className="m-auto flex flex-col gap-y-8 mb-30"> 
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
                  autoComplete="isSale"
                  aria-label="isSale"
                  className="col-start-1 row-start-1 w-[10rem] rounded-md bg-white/5 py-2 pr-7 pl-3.5 text-base text-gray-400 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  >
                      <option className="text-black">Opção</option>
                      <option className="text-black">Sim</option>
                      <option className="text-black">Não</option>
                  </select>
                </div>
              </div>
          </div>


          {/* Inputs de tags */}
          <div className="flex flex-wrap items-center gap-x-5 w-[80%] ml-auto mr-auto">
            <div>
              <label htmlFor="name" className="block text-sm/6 font-semibold text-white">
              Tecnologias ensinadas
              </label>
              <div className="mt-2.5">
                <input
                id="name"
                type="text"
                name="name"
                autoComplete="given-name"
                placeholder="Tecnologias do curso"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="block rounded-md w-[15rem] bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                />
              </div>
            </div>

            <Button 
              type="button"
              
              onClick={(e) => handleAddTags(e, tag)}
              className="rounded cursor-pointer mt-9 bg-zinc-700 hover:bg-zinc-800 px-4 py-2 text-base text-gray-200" 
              >
                Adicionar
            </Button>
          </div>

          {listTags.length > 0 ?
            <ul className="w-[80%] flex flex-wrap gap-x-3 ml-auto mr-auto p-1">
              {listTags.map((element) => (
                <li key={element.name}>
                  <Button 
                  type="button"
                  onClick={(e) => handleDeleteTags(e, element.name)}
                  className="bg-gray-200 hover:bg-gray-400 text-black text-start truncate cursor-pointer" 
                  >
                   {element.name}
                  </Button>
                </li>
              ))}
            </ul>
          :   
            <ul className="w-[80%] rounded ml-auto mr-auto border-1 border-gray-800 p-1">
              <li>
                <h2 className="text-gray-200  text-base p-[1rem] font-bold">Digite as tecnologias ensinadas no curso</h2>
              </li>
            </ul>
          }
          


          {/* formulário do que irá aprender */}
          <div className="flex flex-wrap items-center justify-center gap-x-5">
            <div className="w-[45%]">
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
                  placeholder="Digite o que o aluno aprenderá..."
                  onChange={(e) => setVarWillLearn(e.target.value)}
                  className="block rounded-md w-[25rem] bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                  />

                <Button 
                type="button"
                className="rounded cursor-pointer bg-zinc-700 hover:bg-zinc-800 px-4 py-2 text-base text-gray-200" 
                onClick={(e) => handleWillLearnAndRequists(e, "willLearn", varWillLearn)}>
                  Adicionar
                </Button>
              </div>
            </div>

            <div className="w-[45%]">
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

              <div className="flex flex-wrap gap-x-3 items-center justify-center mt-2.5">
                <input
                  id="name"
                  type="text"
                  name="name"
                  autoComplete="organization"
                  placeholder="Requisitos mínimos..."
                  value={varRequisits}
                  onChange={(e) => setVarRequisits(e.target.value)}
                  className="block rounded-md w-[25rem] bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                  />

                <Button 
                type="button"
                className="rounded cursor-pointer bg-zinc-700 hover:bg-zinc-800 px-4 py-2 text-base text-gray-200" 
                onClick={(e) => handleWillLearnAndRequists(e, "requisits", varRequisits)}>
                  Adicionar
                </Button>
              </div>
            </div>
          </div>


          <div className="mt-5">
              <Textarea 
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
            type="button"
            className="w-[20%] rounded cursor-pointer bg-fuchsia-900 hover:bg-fuchsia-950 px-4 py-2 text-base text-gray-200" onClick={(e) => e.stopPropagation()}>
              Criar curso
            </Button>
          </div>
        </form>
    </>
  )
}

export default CreateCorse