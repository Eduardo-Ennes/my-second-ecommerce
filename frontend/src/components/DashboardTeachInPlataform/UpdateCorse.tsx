import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import ArrowRigthWhite from '../../assets/arrow-right-white.png'
import { useEffect } from "react"


import {
  Alert,
  AlertTitle,
} from "@/components/ui/alert"
import { Link } from "react-router-dom"

function UpdateCorse() {
  const error = ""
  const [technologies, setTechnologies] = useState<Array<{id: number, tech: string}>>()
  const [filterTech, setFilterTech] = useState<Array<{id: number, tech: string}>>([])

  const [tec, setTec] = useState("")
  const [listTec, setListTec] = useState<Array<{id: number, tech: string}>>([])

  const [requisit, setRequisit] = useState("")
  const [listReq, setListReq] = useState<Array<{name: string}>>([])

  // Função API que busca as tags de tecnologias
  useEffect(() => {
      const fetchTechnologies = async () => {
        try{
          const response = await fetch('http://localhost:3000/search/technologies', {
            method: 'GET',
          })
          const res = await response.json()
          console.log(res.data)
          setTechnologies(res.data) // Aqui é atribuida uma lista com valores 
        }catch(error){
          console.log(error)
        }
    }
    fetchTechnologies()
  }, [])

  // Função que filtra as tags na lista technologies
  const handleFiltertech = (element: string) => {
    if(technologies == undefined) return []
    console.log(technologies)
    const filter = technologies.filter(tag => tag.tech.startsWith(element.toLowerCase()))
    setFilterTech(filter)
  }

  // Função que adiciona tags a lista listTec
  const handleAddTech = (id: number, element: string) => { 
    if (!listTec.some(tag => tag.tech === element)) {
      setListTec([
        ...listTec,
        {id: id, tech: element}
      ])

      setTec("")
      return
    }

    window.alert(`A tecnologia ${element} já foi adicionada.`)
    return
  }

  // Função para remover tag de tecnologia
  const handleDeleteTech = (id: number) => {
    const newListTech = listTec.filter(tech => tech.id !== id)
    setListTec(newListTech)
  }


  // Função para adicionar tag de requisito
  const handleAddRequisit = (event: React.MouseEvent<HTMLButtonElement>, element: string) => {
    event.preventDefault()
    if(!listReq.some(tag => tag.name === element)){
      setListReq([
        ...listReq,
        {name: element} 
      ])
      setRequisit("")
      return;
    }

    window.alert(`O requisito ${element} já foi adicionado.`)
    setRequisit("")
  }


  // Função para remover tag de requisito
  const handleDeleteRequisit = (element: string) => {
    const newTags = listReq.filter((tag) => tag.name != element)
    setListReq(newTags)
  }

  return (
    <>
        <h2 className="text-gray-200 text-2xl font-bold mt-40 ml-auto mr-auto mb-20 text-center border-b border-zinc-700 w-[90%]">Formação na linguagem de programação python </h2>

        <form action="#" className="m-auto flex flex-col gap-y-8 mb-30"> 
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
                  <label htmlFor="isPromotion" className="block text-sm/6 font-semibold text-white">Preço promocional?</label>
                  <div className="mt-3">
                      <select
                      id="isPromotion"
                      name="isPromotion"
                      autoComplete="isSale"
                      aria-label="isSale"
                      className="col-start-1 row-start-1 w-[8rem] rounded-md bg-white/5 py-2 pr-7 pl-3.5 text-base text-gray-400 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                      >
                          <option className="text-black">Opção</option>
                          <option className="text-black">Sim</option>
                          <option className="text-black">Não</option>
                      </select>
                  </div>
              </div>

              <div>
                  <label htmlFor="isPromotion" className="block text-sm/6 font-semibold text-white">Status</label>
                  <div className="mt-3">
                      <select
                      id="isPromotion"
                      name="isPromotion"
                      autoComplete="isSale"
                      aria-label="isSale"
                      className="col-start-1 row-start-1 w-[8rem] rounded-md bg-white/5 py-2 pr-7 pl-3.5 text-base text-gray-400 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                      >
                          <option className="text-black">Opção</option>
                          <option className="text-black">Sim</option>
                          <option className="text-black">Não</option>
                      </select>
                  </div>
              </div>
          </div>


        {/* Inputs de tags */}
        <div className="flex flex-wrap gap-6 mt-6 mb-6 justify-center">
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
                <ScrollArea className="w-[30rem] h-[10rem] flex flex-wrap gap-x-1 p-1 mt-2">
                  {filterTech.length > 0 ? (
                    <>
                      {filterTech.map((element) => (
                        <Link // cada item precisa de key única
                          to="#"
                          key={element.id}
                          onClick={() => handleAddTech(element.id, element.tech)}
                          className="text-white p-1 rounded transition-colors duration-200 hover:bg-zinc-700 cursor-pointer w-[100%] block"
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
                    <ScrollArea className="w-[30rem] h-[10rem] flex flex-wrap gap-x-3 p-1 mt-2"> 
                      {listTec.map((element) => (
                        <Button
                            type="button"
                            key={element.id}
                            onClick={() => handleDeleteTech(element.id)}
                            className="bg-gray-200 hover:bg-gray-400 text-black text-start truncate cursor-pointer mt-2 ml-1"
                          >
                            {element.tech}
                          </Button>
                      ))}
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
                  onClick={(e) => handleAddRequisit(e, requisit)}
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
                        key={element.name}
                        onClick={() => handleDeleteRequisit(element.name)}
                        className="text-white flex flex-wrap gap-3 items-center break-words p-2 rounded transition-[2s] hover:bg-zinc-700 cursor-pointer w-[30rem]" 
                        >
                          <img src={ArrowRigthWhite} alt="Icone de flecha idicadora." />
                          <p className="w-[27rem]">
                            {element.name}
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
              Atualizar curso
            </Button>
          </div>
        </form>
    </>
  )
}

export default UpdateCorse