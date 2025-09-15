import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import ReactPlayer from "react-player";
import { Link } from 'react-router-dom'
import maltaVideo from '../media/malta.mp4'
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area"
import Footer from "../components/Footer";
import Avaliation from "@/components/Avaliation"
import DropdownMenuAvatar from "@/components/DropdownMenuAvatar";
import MaterialAndFeatures from "@/components/MaterialAndFeatures";
import LeassonsQuestionsResponse from "@/components/LeassonsQuestionsResponse";

export default function VideoCorses() {
    const [value, setValue] = useState<string | undefined>(undefined)
    const [component, setComponent] = useState<string>("")

  return (
    <>
        <header className="flex flex-wrap items-center justify-start p-[1rem] border-b border-zinc-700">
            <div className="flex flex-warp items-center text-gray-200 gap-x-8 w-[72rem]">
                <h1 className="text-2xl font-bold pr-8 border-r border-zinc-700 w-[11rem]">
                    <Link to="/">My Second <br /> E-commerce</Link>
                </h1>
                <p className="text-lg font-bold w-[45rem]">
                    Aprender tecnologias modernas 
                </p>
            </div>
            
            {/* Template do avatar menu */}
            <DropdownMenuAvatar />

        </header>
        <main className="grid grid-cols-4 grid-rows-4 pl-[1rem] pt-[1rem] pr-[1rem] h-[33rem]">
            <div className="col-span-3 row-span-4 border-1 border-zinc-600">
                <ReactPlayer 
                src={maltaVideo}
                controls 
                width="100%" 
                height="100%" />
            </div>
            <aside className="col-span-1 row-span-4 text-amber-50 pl-4">
                <ScrollArea className="h-[31rem] pr-4">
                    <Accordion
                    type="single" collapsible className="rounded w-full" value={value} onValueChange={setValue}
                    >
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="text-base cursor-pointer">Sobre Mim</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <div className="flex flex-wrap gap-x-3 items-center pl-4 text-base text-gray-200 border-b border-zinc-600 pb-1 hover:bg-zinc-900 hover:rounded">
                                    <Checkbox />
                                    <Link to={""} className="w-[90%] hover:pl-2 transition-[2s]">
                                        <p>1 função print</p>
                                    </Link>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </ScrollArea>
            </aside>
        </main>

        <section className="pl-[1rem] pr-[1rem]">
            <nav className="text-gray-200 flex flex-wrap gap-8 w-[75%]">
                <Link to="#" 
                className="p-2 hover:outline rounded"
                onClick={() => setComponent("avaliacao")}
                >Avaliação</Link>

                <Link to="#" 
                className="p-2 hover:outline rounded"
                onClick={() => setComponent("materiais e Recursos")}
                >materiais e Recursos</Link>

                <Link to="#" 
                className="p-2 hover:outline rounded"
                onClick={() => setComponent("perguntas")}
                >Perguntas e respostas</Link>
            </nav>
            
            <main className="p-[1rem] text-gray-200">
                {component === "avaliacao" && (
                    <Avaliation args={true}/>
                )}

                {component === "materiais e Recursos" && (
                    <MaterialAndFeatures />
                )}

                {component === "perguntas" && (
                    <LeassonsQuestionsResponse />
                )}
            </main>
        </section>
        <Footer />
    </>
  )
}
