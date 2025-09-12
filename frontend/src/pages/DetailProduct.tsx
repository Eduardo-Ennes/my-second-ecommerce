import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useParams } from "react-router-dom"
import { Button } from '@headlessui/react'
import imageTeste from '../media/imagem-python.jpg'
import Header from '../components/Header'
import Footer from "@/components/Footer"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"

function DetailProduct() {
    const params = useParams<{ id: string }>()
    const [valueApren, setValueApren] = useState<string | undefined>(undefined)
    const [valueDesc, setValueDesc] = useState<string | undefined>(undefined)
  return (
    <>
        <Header />

        <div className="p-[1rem]">
            <div className="group flex flex-wrap gap-3">
                <div>
                    <img
                    src={imageTeste}
                    alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                    className="aspect-square w-[28rem] h-[14rem] rounded-lg bg-gray-200 object-cover xl:aspect-7/8"
                    />
                </div>
                <div>
                    <h3 className="text-2xl font-medium text-gray-100">Formação na linguagem de programação python</h3>
                    <p className="mt-3 text-sm text-gray-100">Nome do instrutor</p>
                    <div className="flex flex-wrap items-center mt-3 gap-x-2">
                        <p>
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 text-yellow-400"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        </p>
                        <p className="text-gray-100">4.9</p>
                        <p className="text-gray-100">14 (avaliações)</p>
                    </div>
                    <div className="flex flex-wrap gap-x-0.5 ">
                        <p className="mt-3 text-lg font-medium text-gray-100">$19,90</p>
                        <p className="mt-3 font-medium text-gray-100 text-base line-through">R$100,00</p>
                    </div>
                </div>

                <div className="w-[18rem] flex flex-col justify-end items-center gap-3">
                    <Button 
                    type="button" 
                    className="rounded cursor-pointer bg-zinc-900 px-4 py-2 text-sm text-white data-active:bg-sky-700 data-hover:bg-zinc-800 w-full">
                    Adicionar ao carrinho
                    </Button>
                
                    <Button 
                    type="button"
                    className="w-full rounded cursor-pointer bg-fuchsia-900 px-4 py-2 text-sm text-white data-hover:bg-fuchsia-950">
                    Lista de favoritos
                    </Button>
                </div>
            </div>

            {/* Tags do curso */}
            <div className="flex flex-col gap-y-2 pl-3 mt-[3rem]">
                <h2 className="text-gray-200 font-bold text-xl mb-2">Temas relacionados</h2>
                <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="text-base p-2 text-zinc-900 bg-gray-200">JavaScript</Badge>
                </div>
            </div>


            {/* Requisitos para o curso */}
            <div className="flex flex-wrap justify-around">
                <div className="w-[48%] mt-[3rem] pl-[1rem] p-2">
                    <h2 className="text-gray-200 text-xl font-bold">O que você irá aprender</h2>
                    <ul className="grid grid-cols-2 gap-x-8 gap-y-4 list-disc list-inside text-gray-200 mt-3">
                        <li>JavaScript</li>
                        <li>Programação orientada a objetos</li>
                    </ul>
                </div>
                

                <div className="w-[48%] mt-[3rem] pl-[1rem] p-2 border-l border-gray-700">
                    <h2 className="text-gray-200 text-xl font-bold">Requisitos para o curso</h2>
                    <ul className="grid grid-cols-2 gap-x-8 gap-y-4 list-disc list-inside text-gray-200 mt-3">
                        <li>JavaScript</li>
                        <li>Programação orientada a objetos</li>
                    </ul>
                </div>
            </div>
            


            <div className="mt-[5rem]">
                {/* Descrição do curso */}
                <section className="mt-5">
                    <Accordion type="single" collapsible className="rounded w-full bg-zinc-900" value={valueDesc} onValueChange={setValueDesc}>
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="text-lg cursor-pointer text-gray-200 pl-3">Descrição</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance text-white p-5">
                                <div className="text-justify leading-relaxed text-gray-200 text-base">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut adipisci repellat ullam dignissimos atque illo reiciendis porro tenetur, pariatur similique, autem necessitatibus alias eum omnis dolorum consequuntur temporibus vitae inventore amet. Ipsam voluptate commodi, quisquam a laborum, laudantium distinctio odio vel sit. </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </section>
            </div>


            {/* Área da biografia do professor */}
            <div className="flex flex-wrap justify-between">
                <div className="w-[50%] mt-[5rem] max-h-[40em]"> 
                    <div className="flex flex-wrap items-center gap-5 pl-[1rem]">
                        <div>
                            <Avatar className="w-25 h-25">
                                <AvatarImage />
                                <AvatarFallback className="text-zinc-900">CN</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="text-gray-200">
                            <p>Eduardo Ennes</p>
                            <p>(4,9) Classificação</p>
                            <p>(50.000) avaliações</p>
                            <p>(200.000) alunos</p>
                            <p>(150) cursos</p>
                        </div>
                    </div>
                    
                    <div className="max-h-[37rem] mt-2 p-4 text-white leading-relaxed w-full">
                        A tecnologia mudou profundamente a forma como vivemos e nos comunicamos. Ferramentas digitais permitem hoje resolver tarefas em minutos que antes exigiam horas de trabalho. A internet trouxe acesso quase ilimitado à informação e possibilitou a criação de relações e oportunidades de trabalho em ambientes virtuais. Ao mesmo tempo, essa facilidade trouxe desafios, como a dependência excessiva de dispositivos e a necessidade de filtrar informações confiáveis em meio a tanto conteúdo disponível.
                    </div>
                </div>


                {/* Área de oferta do curso do professor */}
                <div className="w-[50%] mt-[5rem]">
                    <h2 className="text-gray-200 ml-3 w-[90%] text-xl font-bold text-center bg-zinc-900 rounded-3xl p-1">Cursos Eduardo Ennes</h2>
                    <ScrollArea className="max-h-[40rem] p-4">
                        <div className="flex flex-col gap-7">
                            <div className="group flex flex-wrap gap-2">
                                <div>
                                    <img
                                    src={imageTeste}
                                    alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                                    className="aspect-square w-[13rem] h-[8rem] rounded-lg bg-gray-200 object-cover xl:aspect-7/8"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-base font-medium text-gray-100">Formação na linguagem de programação python</h3>
                                    <p className="mt-2 text-sm text-gray-100">Nome do instrutor</p>
                                    <div className="flex flex-wrap items-center mt-2 gap-x-2">
                                        <p>
                                            <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-4 h-4 text-yellow-400"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            >
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
                                            </svg>
                                        </p>
                                        <p className="text-gray-100">4.9</p>
                                        <p className="text-gray-100">14 (avaliações)</p>
                                    </div>
                                    <div className="flex flex-wrap gap-x-0.5 ">
                                        <p className="mt-3 text-lg font-medium text-gray-100">$19,90</p>
                                        <p className="mt-3 font-medium text-gray-100 text-base line-through">R$100,00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </div>
            </div>


            {/* Área de avaliação do produto */}
            <div className="text-gray-200 mt-[5rem] mb-[2rem] pl-[2rem] text-3xl font-bold flex flex-wrap items-center gap-x-3">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-yellow-400"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <h2>Classificação: 4.9</h2>
            </div>
            <div className="pl-[2rem] w-full flex flex-wrap items-center justify-start gap-y-5 gap-x-5">
                <article className="w-[45%]">
                    <Separator orientation="horizontal" className="bg-gray-700"/>
                    <div className="flex flex-wrap items-center gap-5 mt-3 text-base text-gray-200">
                        <div>
                            <Avatar className="w-15 h-15">
                                <AvatarImage  />
                                <AvatarFallback className="text-zinc-900">CN</AvatarFallback>
                            </Avatar>
                        </div>
                        <div>
                            <p>Nome do usuário</p>
                            <p>4.9 Avaliação</p>
                        </div>
                    </div>
                    <ScrollArea className="max-h-[12rem] p-4 text-white leading-relaxed w-full">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, fuga.
                    </ScrollArea>        
                </article>
            </div>

            <Dialog>
                <DialogTrigger className="pl-5 mt-5">
                    <Button 
                        type="button"
                        className="w-full rounded cursor-pointer bg-gray-200 px-4 py-2 text-base text-zinc-900">
                        Todas as avaliações
                    </Button>
                </DialogTrigger>
                <DialogContent className="h-[40rem] bg-gray-100">
                    <DialogHeader>
                    <DialogTitle className="font-bold text-xl">Todas as classificações: 4,9</DialogTitle>
                    <DialogDescription>
                        <ScrollArea className="h-[35rem] p-2">
                            <Separator orientation="horizontal" className="bg-zinc-600 mt-[1rem]"/>
                            <div className="flex flex-wrap items-center gap-x-4">
                                <Avatar className="w-15 h-15 mt-5">
                                    <AvatarImage />
                                    <AvatarFallback className="text-gray-200 bg-zinc-900">CN</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h2 className="text-zinc-900 font-bold text-lg">Eduardo Ennes</h2>
                                    <div className="flex flex-wrap items-center gap-x-1 text-zinc-900 text-base">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-4 h-4 text-yellow-400"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            >
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                        <p>4,9</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 text-justify text-zinc-900">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, qui assumenda unde accusantium quo dignissimos impedit rerum praesentium voluptas nulla.
                            </div>
                            <div className="pl-5 mt-3">
                                <p className="bg-zinc-600 text-gray-200 w-[9rem] text-center rounded">Resposta do instrutor</p>
                                <h2 className="text-zinc-900 font-bold text-lg">Eduardo Ennes</h2>
                                <div className="text-justify text-zinc-900">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim tempora quibusdam quos nemo assumenda praesentium officiis deserunt, voluptatum odit eius nobis.</div>
                            </div>
                        </ScrollArea>
                    </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
        <Footer />
    </>
  )
}

export default DetailProduct