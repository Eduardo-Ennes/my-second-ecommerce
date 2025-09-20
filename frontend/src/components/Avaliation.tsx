import { Button } from '@headlessui/react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

const values = [
    {id: 1, rating: "0.0"},
    {id: 2, rating: "0.5"},
    {id: 3, rating: "1.0"},
    {id: 4, rating: "1.5"},
    {id: 5, rating: "2.0"},
    {id: 6, rating: "2.5"},
    {id: 7, rating: "3.0"},
    {id: 8, rating: "3.5"},
    {id: 9, rating: "4.0"},
    {id: 10, rating: "4.5"},
    {id: 11, rating: "5.0"},
]

type AvaliationProps = {
  args: boolean;
};

function Avaliation({args}: AvaliationProps) {
    
  return (
    <>
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

        <div className='flex flex-wrap items-center gap-5'>
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


            {args && (
                <Dialog>
                    <form>
                        <DialogTrigger className="pl-5 mt-5">
                            <Button className="w-full rounded cursor-pointer bg-yellow-400 px-4 py-2 text-base text-zinc-900">Avaliar</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-gray-500 text-gray-200">
                        <DialogHeader>
                            <DialogTitle>Avaliar curso</DialogTitle>
                        </DialogHeader>
                            <div className="grid gap-4">
                                <Select>
                                    <SelectTrigger className="w-[7rem] border-gray-500">
                                        <SelectValue placeholder="Rating" className='text-gray-200'/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Raiting</SelectLabel>
                                            {values.map(({id, rating}) => (
                                                <SelectItem key={id} value={id.toString()}>{rating}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <Textarea
                                className='h-[8rem] border-gray-500'
                                placeholder="Type your message here." />
                            </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button 
                                    type="button"
                                    className="rounded cursor-pointer bg-red-500 hover:bg-red-600 px-4 py-2 text-base text-zinc-900">
                                    Cancelar
                                </Button>
                            </DialogClose>

                            <DialogClose asChild>
                                <Button 
                                    type="button"
                                    className="rounded cursor-pointer bg-zinc-700 hover:bg-zinc-800 px-4 py-2 text-base text-gray-200">
                                    Enviar
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                        </DialogContent>
                    </form>
                </Dialog>
            )}
        </div>
    </>
  )
}

export default Avaliation