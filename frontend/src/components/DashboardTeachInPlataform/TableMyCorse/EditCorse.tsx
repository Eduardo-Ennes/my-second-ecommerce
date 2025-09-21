// Components shadcn ou tailwind 
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"

// Icone, imagens ou video
import maltaVideo from '../../../media/malta.mp4'
import iconX from '../../../assets/cross.png'
import ArrowRight from '../../../assets/arrow-small-right.png'

// Templates ou components react
import { Link } from 'react-router-dom'
import ModalEditCorse from "../ModalEditCorse";
import ReactPlayer from "react-player";
import { useState } from "react"


function EditCorse() {
    const [description, setDescription] = useState("Eu quero e peço muito para arrumar um trabalho e começar minha vida profissional, e encontrar um amor verdadeiro.")

    const handleUpdateDescriptionCorse = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log("DESCRIÇÃO DO CURSO: ", description)
    }

  return (
    <>
        <main className="grid grid-cols-4 grid-rows-4 w-[98%] pl-[1rem] pr-[1rem] mt-20 mr-auto ml-auto h-[33rem]">
            <div className="col-span-3 row-span-4 border-1 border-zinc-600">
                <ReactPlayer 
                src={maltaVideo}
                controls 
                width="100%" 
                height="100%" />
            </div>
            <aside className="col-span-1 row-span-4 text-amber-50 pl-4">
                <ModalEditCorse args={"edit_order_modules"} id={10}/>
                <ScrollArea className="h-[31rem] pr-4">
                    <Accordion
                    type="single" collapsible className="rounded w-[99%]">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="flex flex-wrap items-center text-base cursor-pointer">
                                <p className="w-[13rem] truncate text-sm" title="Introdução">Introdução a programação orientada</p>
                                <ModalEditCorse args={"edit_module"} id={10}/>
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-x-4 text-balance">
                                <div className="text-gray-200 border-b ">
                                    <Button 
                                    type="button"
                                    className="bg-zinc-950 block hover:bg-zinc-700 text-gray-200 w-[18rem] text-start truncate cursor-pointer"
                                    title="Nome da aula">
                                        Nome da aula
                                    </Button>
                                </div>
                                
                                <div>
                                    <ModalEditCorse args={"add_leasson"} id={10}/>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </ScrollArea>
            </aside>
        </main>

        <section className="pl-[2rem] pt-[1rem]">
            <h2 className="text-gray-200 mt-5 text-2xl font-bold">Materiais e recursos auxiliares da aula 01</h2>
            <ul className='p-[1rem] flex flex-col gap-y-3'>
                <li className="flex flex-wrap items-center gap-x-10">
                    <div className='flex flex-wrap items-center gap-3 pl-5'>
                        <img src={ArrowRight} alt="" />
                        <a href="#" className='text-base text-blue-600 hover:underline transition-[2s]'>Arquivo.pdf</a>
                    </div>
                    <div>
                        <Link to="#" title="Delete">
                            <img src={iconX} alt="Icone de exclusão" className="hover:bg-zinc-700 rounded p-1"/>
                        </Link>
                    </div>
                </li>
            </ul>

            <form className="flex flex-col gap-y-5 p-[1rem]">
                <div className="flex w-full max-w-sm items-center gap-2 text-gray-200">
                    <Input type="url" placeholder="https://exemplo.com" required className="text-gray-200"/>
                    <Button type="submit" variant="outline" className="rounded cursor-pointer bg-zinc-900 hover:bg-zinc-700 px-4 py-2 text-base text-gray-200 hover:text-gray-200 border-none">
                        Send
                    </Button>
                </div>

                <div className="flex w-full max-w-sm items-center gap-2 text-gray-200">
                    <Input type="file" placeholder="https://exemplo.com" required className="bg-gray-200 text-black"/>
                    <Button type="submit" variant="outline" className="rounded cursor-pointer bg-zinc-900 hover:bg-zinc-700 px-4 py-2 text-base text-gray-200 hover:text-gray-200 border-none">
                        Send
                    </Button>
                </div>
            </form>
        </section>

        <section className="flex flex-wrap justify-around mt-20 pl-[2rem] pt-[1rem]">
            <div className="flex flex-col gap-y-5 w-[48%]">
                <h2 className="text-gray-200 mt-5 text-2xl font-bold">O que você irá aprender</h2>
                <ScrollArea className="h-[10rem] p-2 border-1 border-gray-700 rounded-md">
                    <ul className="grid grid-cols-2 gap-x-8 gap-y-4 list-disc list-inside text-gray-200 mt-3">
                        <Link to="#" className="cursor-pointer px-4 py-2 text-base text-gray-200 hover:text-gray-200 border-none hover:bg-red-500 rounded-md transition-[2s]">
                                <li className="">
                                    Lorem, ipsum dolor sit amet 
                                </li>
                        </Link>
                    </ul>
                </ScrollArea>
                <div className="flex flex-wrap items-center gap-x-3">
                    <input
                    id="name"
                    type="text"
                    name="name"
                    autoComplete="organization"
                    placeholder="Quais são os requisitos mínimos?"
                    className="block rounded-md w-[30rem] bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                    />

                    <Button 
                    type="button"
                    className="rounded cursor-pointer bg-zinc-700 hover:bg-zinc-800 px-4 py-2 text-base text-gray-200">
                    Adicionar
                    </Button>
                </div>
            </div>
            
            <div className="flex flex-col gap-y-5 w-[48%]">
                <h2 className="text-gray-200 mt-5 text-2xl font-bold">O que você irá aprender</h2>
                <ScrollArea className="h-[10rem] p-2 border-1 border-gray-700 rounded-md">
                    <ul className="grid grid-cols-2 gap-x-8 gap-y-4 list-disc list-inside text-gray-200 mt-3">
                        <Link to="#" className="cursor-pointer px-4 py-2 text-base text-gray-200 hover:text-gray-200 border-none hover:bg-red-500 rounded-md transition-[2s]">
                                <li className="">
                                    Lorem, ipsum dolor sit amet 
                                </li>
                        </Link>
                    </ul>
                </ScrollArea>
                <div className="flex flex-wrap items-center gap-x-3">
                    <input
                    id="name"
                    type="text"
                    name="name"
                    autoComplete="organization"
                    placeholder="O que o aluno irá aprender no curso?"
                    className="block rounded-md w-[30rem] bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                    />

                    <Button 
                    type="button"
                    className="rounded cursor-pointer bg-zinc-700 hover:bg-zinc-800 px-4 py-2 text-base text-gray-200">
                    Adicionar
                    </Button>
                </div>
            </div>
        </section>

        <section className="w-[90%] ml-auto mr-auto mt-25 mb-20 flex flex-col gap-y-10 pl-[2rem]">
            <h2 className="text-gray-200 text-2xl font-bold">Descrição do curso: Programação em python</h2>
            <form onSubmit={handleUpdateDescriptionCorse} className="flex flex-col gap-y-10">
                <Textarea 
                className="h-[10rem] block ml-auto mr-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-gray-200 placeholder:text-gray-500 !border-gray-700" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Atualize a descrição do curso..." />  

                <Button 
                type="submit"
                className="w-[10%] ml-auto rounded cursor-pointer bg-zinc-700 hover:bg-zinc-800 px-4 py-2 text-base text-gray-200">
                    Enviar
                </Button>
            </form>
        </section>
    </>
  )
}

export default EditCorse