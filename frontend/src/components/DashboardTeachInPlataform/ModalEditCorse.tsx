// Este arquivo é responsável pela atualização e dos campos dos cursos, modulo, aulas e materiais. Nele se tem três modais que estão dividos por condicionais, um para ordernar os modulos, outro para atualização do nome do modulo e ordem das aulas e modal para atualização da aula, nome, arquivo para o video, e materiais da aula


import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import iconAdd from '../../assets/add.png'
import iconEdit from '../../assets/edit.png'
import ArrowRight from '../../assets/arrow-small-right.png'
import iconEditModules from '../../assets/list-check.png'
import { Link } from "react-router-dom"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"

type ModalEditionLeassons = {
    args: string
    // id: number
}

function ModalEditCorse({args /* adicionar id como parametro depois */ }: ModalEditionLeassons) {

    const [listMaterials, setListMaterials] = useState<Array<{id: number, name: string}>>([
        {id: 1, name: "Arquivo.mundo"},
    ])
    const [url, setUrl] = useState<string>("")
    const [file, setFile] = useState<string>("")

    const handleAddFileOrUrlInListMaterials = (event: React.MouseEvent<HTMLButtonElement>, fileOrUrl: string) => {
        event.preventDefault()
        console.log(fileOrUrl)
        if(fileOrUrl){
            const id = listMaterials.length + 1
            setListMaterials([
                ...listMaterials,
                {id: id, name: fileOrUrl}
            ])

            setUrl("")
        }
    }

    const handleRemoveFileOrUrl = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
        event.preventDefault()
        const newListMaterials = listMaterials.filter((item) => item.id != id)

        setListMaterials(newListMaterials)
    }

  return (
    <>
        <Dialog>
            <form onClick={(e) => e.stopPropagation()}>
                

                {/* Condição de editar as ordens dos móodulos */}
                {args === "edit_order_modules" && 
                    <DialogTrigger asChild>
                            <Link to="#" className="flex flex-wrap items-center gap-x-2 p-1 hover:bg-zinc-900 hover:pl-3 transition-[2s] rounded">
                                <img src={iconEditModules} alt="Icone de adição"/>
                                <p>Edit order modules</p>
                            </Link>
                    </DialogTrigger>
                }

                {/* Condição para editar o nome do módulo e ordem das aulas*/}
                {args === "edit_module" && 
                    <DialogTrigger asChild>
                        <Link to="#">
                            <img src={iconEdit} alt="Icone de adição" />
                        </Link>
                    </DialogTrigger>
                }

                {/* Condição para atualizar as aulas */}
                {args === "add_leasson" && 
                    <DialogTrigger asChild>
                        <Button variant="outline" className="flex flex-wrap items-center mt-8 ml-auto mr-auto bg-zinc-800 cursor-pointer border-gray-600 hover:bg-zinc-700 transition-[2s] hover:text-gray-200">
                            <img src={iconAdd} alt="Icone de adição" />
                            <p>Add new leasson</p>
                        </Button>
                    </DialogTrigger>
                }
                <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-gray-500 text-gray-200">

                    {/* Modal para ordenação dos modulos */}
                    {args === "edit_order_modules" && 
                        <>
                            <DialogHeader>
                                <DialogTitle>Edit order modules</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4">
                                <ScrollArea className="mt-10 mb-10 h-[15rem]">
                                    <div className="flex flex-wrap items-center gap-x-2 mb-3">
                                        <Input type="number" id="position" name="position" defaultValue="10" className="w-[4rem]" onClick={(e) => e.stopPropagation()}/>
                                        <p className="w-[18rem] truncate" title="Alguma coisa">Nome da aula</p>
                                    </div>
                                </ScrollArea>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button 
                                        type="button"
                                        className="rounded cursor-pointer bg-red-500 hover:bg-red-600 px-4 py-2 text-base text-zinc-900" onClick={(e) => e.stopPropagation()}>
                                        Cancel
                                    </Button>
                                </DialogClose>

                                <DialogClose asChild>
                                    <Button 
                                        type="button"
                                        className="rounded cursor-pointer bg-zinc-700 hover:bg-zinc-800 px-4 py-2 text-base text-gray-200" onClick={(e) => e.stopPropagation()}>
                                        Send
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </>
                    }



                    {/* modal para editar módulo e ordenar aulas */}
                    {args === "edit_module" && 
                        <>
                            <DialogHeader>
                                <DialogTitle>Edit module</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" name="name" defaultValue="Nome do módulo" onClick={(e) => e.stopPropagation()}/>
                                </div>

                                <ScrollArea className="mt-10 mb-10 h-[15rem]">
                                    <div className="flex flex-wrap items-center gap-x-2 mb-3">
                                        <Input type="number" id="position" name="position" defaultValue="10" className="w-[4rem]" onClick={(e) => e.stopPropagation()}/>
                                        <p className="w-[18rem] truncate" title="Alguma coisa">Name leasson</p>
                                    </div>
                                </ScrollArea>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button 
                                        type="button"
                                        className="rounded cursor-pointer bg-red-500 hover:bg-red-600 px-4 py-2 text-base text-zinc-900" onClick={(e) => e.stopPropagation()}>
                                        Cancel
                                    </Button>
                                </DialogClose>

                                <DialogClose asChild>
                                    <Button 
                                        type="button"
                                        className="rounded cursor-pointer bg-zinc-700 hover:bg-zinc-800 px-4 py-2 text-base text-gray-200" onClick={(e) => e.stopPropagation()}>
                                        Send
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </>
                    }



                    {/* modal para atualizar uma determinada aula */}
                    {args === "add_leasson" && 
                        <>
                            <DialogHeader>
                                <DialogTitle>Add new leasson</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="name">Name</Label>
                                    <Input 
                                    id="name" 
                                    name="name"  
                                    placeholder="Name leasson"
                                    onClick={(e) => e.stopPropagation()}/>
                                </div>

                                <div className="grid w-full max-w-sm items-center gap-3">
                                    <Label htmlFor="leasson">Leasson</Label>
                                    <Input id="leasson" type="file" className="bg-gray-200 text-black" onClick={(e) => e.stopPropagation()}/>
                                </div>
                                <ScrollArea className="h-[10rem]">
                                    <ul className='flex flex-col gap-y-3'>

                                        {listMaterials.map((item) => (
                                            <li key={item.id}>
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <img src={ArrowRight} alt="Icone flecha de demostração" />
                                                    <Button 
                                                    className="bg-zinc-900 block hover:bg-zinc-700 text-blue-700 w-[21rem] text-start truncate cursor-pointer" 
                                                    title={item.name}
                                                    onClick={(e) => handleRemoveFileOrUrl(e, item.id)}
                                                    >
                                                        {item.name}
                                                    </Button>
                                                </div>
                                            </li>
                                        ))}

                                    </ul>
                                </ScrollArea>

                                <div className="flex flex-col gap-y-5 mb-15">
                                    <div className="flex w-full max-w-sm items-center gap-2 text-gray-200">
                                        <Input 
                                        type="url" 
                                        placeholder="https://exemplo.com" 
                                        required 
                                        value={url}
                                        className="text-gray-200"
                                        onChange={(e) => setUrl(e.target.value)}/>

                                        <Button 
                                        type="button" 
                                        variant="outline" 
                                        className="rounded cursor-pointer bg-zinc-700 hover:bg-zinc-800 px-4 py-2 text-base text-gray-200 border-none"
                                        onClick={(e) => handleAddFileOrUrlInListMaterials(e, url)}>
                                            Add
                                        </Button>
                                    </div>

                                    <div className="flex w-full max-w-sm items-center gap-2 text-gray-200">
                                        <Input 
                                        type="file" 
                                        placeholder="https://exemplo.com" 
                                        onChange={(e) => setFile(e.target.value)}
                                        required 
                                        className="bg-gray-200 text-black"
                                        />
                                        <Button 
                                        type="button" 
                                        variant="outline" 
                                        onClick={(e) => handleAddFileOrUrlInListMaterials(e, file)}
                                        className="rounded cursor-pointer bg-zinc-700 hover:bg-zinc-800 px-4 py-2 text-base text-gray-200 border-none"
                                        >
                                            Add
                                        </Button>
                                    </div>
                                </div>

                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button 
                                        type="button"
                                        className="rounded cursor-pointer bg-red-500 hover:bg-red-600 px-4 py-2 text-base text-zinc-900">
                                        Cancel
                                    </Button>
                                </DialogClose>

                                <DialogClose asChild>
                                    <Button 
                                        type="button"
                                        className="rounded cursor-pointer bg-zinc-700 hover:bg-zinc-800 px-4 py-2 text-base text-gray-200">
                                        Send
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </>
                    }
                </DialogContent>
            </form>
        </Dialog>
    </>
  )
}

export default ModalEditCorse