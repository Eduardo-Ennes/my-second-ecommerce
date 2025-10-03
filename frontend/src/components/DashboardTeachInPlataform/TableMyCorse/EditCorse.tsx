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

// Icone, imagens ou video
import maltaVideo from '../../../media/malta.mp4'
import iconX from '../../../assets/cross.png'
import ArrowRight from '../../../assets/arrow-small-right.png'

// Templates ou components react
import { Link } from 'react-router-dom'
import ModalEditCorse from "../ModalEditCorse";
import ReactPlayer from "react-player";


function EditCorse() {
    // const handleUpdateDescriptionCorse = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault()
    //     console.log("DESCRIÇÃO DO CURSO: ", description)
    // }

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
                <ModalEditCorse args={"edit_order_modules"}/>
                <ScrollArea className="h-[31rem] pr-4">
                    <Accordion
                    type="single" collapsible className="rounded w-[99%]">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="flex flex-wrap items-center text-base cursor-pointer">
                                <p className="w-[13rem] truncate text-sm" title="Introdução">Introdução a programação orientada</p>
                                <ModalEditCorse args={"edit_module"}/>
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
                                    <ModalEditCorse args={"add_leasson"}/>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </ScrollArea>
            </aside>
        </main>

        <section className="pl-[2rem] pt-[1rem] mb-20">
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
    </>
  )
}

export default EditCorse