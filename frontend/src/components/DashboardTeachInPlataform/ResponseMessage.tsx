import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom"
import { Button } from '@headlessui/react'
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"

function ResponseMessage() {
  return (
    <>
        <div className="pl-[2rem] w-full flex flex-wrap items-center justify-center gap-y-5 gap-x-5 ml-auto mr-auto mb-20">
            <article className="w-[49%]">
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
                    </div>
                </div>
                <Link to="#" className="block p-1 bg-zinc-900 rounded-md mt-3 underline
                hover:pl-3 transition-[2s]">
                    <strong>Curso: </strong> nome do curso, <strong>Módulo: </strong> módulo do curso, <strong>Aulla: </strong> aula 305
                </Link>
                <ScrollArea className="h-[12rem] p-4 text-white leading-relaxed w-full">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                </ScrollArea>   
                
                <Dialog>
                    <form>
                        <DialogTrigger asChild>
                        <Button className="w-[25%] block mt-3 ml-auto rounded cursor-pointer bg-zinc-700 hover:bg-zinc-800 px-4 py-2 text-base text-gray-200">Responder</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-gray-500 text-gray-200">

                            <Textarea 
                            className="h-[10rem] block rounded-md bg-white/5 px-3.5 py-2 text-base text-white placeholder:text-gray-500 !border-gray-500" 
                            placeholder="Responsa a pergunta do aluno aqui..." /> 
                            
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button 
                                    type="button"
                                    className="rounded cursor-pointer bg-red-500 hover:bg-red-600 px-4 py-2 text-base text-zinc-900" onClick={(e) => e.stopPropagation()}>
                                    Cancel
                                    </Button>
                                </DialogClose>
                                    <Button 
                                    type="button"
                                    className="rounded cursor-pointer bg-zinc-700 hover:bg-zinc-800 px-4 py-2 text-base text-gray-200" onClick={(e) => e.stopPropagation()}>
                                    Enviar
                                    </Button>
                            </DialogFooter>
                        </DialogContent>
                    </form>
                </Dialog>
            </article>
        </div>
    </>
  )
}

export default ResponseMessage