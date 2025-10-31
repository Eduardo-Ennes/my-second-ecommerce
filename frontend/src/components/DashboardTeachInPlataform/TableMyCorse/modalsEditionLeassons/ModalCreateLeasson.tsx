import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Link } from "react-router-dom"
import Add from '../../../../assets/add.png'
import { Alert, AlertTitle } from "@/components/ui/alert"
import { useState } from "react"

function ModalCreateLeasson() {
    const [error, seterror] = useState<string>('')


  return (
    <div>
        <Dialog>
            <form>
            <DialogTrigger asChild>
                <Link to='#' className='flex flex-wrap justify-center gap-2 mt-5 p-1 hover:bg-zinc-800 rounded'>
                    <img src={Add} alt="Video aula" className='mt-auto mb-auto'/>
                    <p>Adicionar aula</p>
                </Link>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-gray-500 text-gray-200">
                <DialogHeader>
                <DialogTitle>Criação da aula</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 mt-3">
                    <div className="grid gap-3">
                        <label htmlFor="module">Nome</label>
                        <input 
                        name='module'
                        type="text" 
                        placeholder='Digite o nome da aula'
                        className="rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"/>
                    </div>

                    <div className="grid gap-3 mt-3">
                        <Label htmlFor="position">Ordem</Label>
                        <Input  
                        type="number"
                        name="position"   
                        min={0}
                        placeholder="Ordem da aula: 10"
                        className="rounded-md bg-white/5 px-3.5 py-2 text-base text-white placeholder:text-gray-500 border-1 border-zinc-700"/>
                    </div>

                    <div className="grid gap-3 mt-3">
                        <Label htmlFor="position">Anexe o arquivo da aula</Label>
                        <Input 
                        name="file"
                        type="file" 
                        placeholder="https://exemplo.com" 
                        required 
                        className="bg-gray-200 text-black cursor-pointer"
                        />
                    </div>

                    {error.length > 0 && 
                        <div className="grid gap-3 mt-5">
                        <div className="w-[90%] ml-auto mr-auto">
                            <Alert variant="destructive" className="bg-red-500">
                            <AlertTitle className="text-gray-200">{error}</AlertTitle>
                            </Alert>
                        </div>
                        </div>
                    }
                </div>

                <DialogFooter>
                <DialogClose asChild>
                    <Button 
                    type="submit"
                    className="rounded cursor-pointer bg-fuchsia-900 hover:bg-fuchsia-950 px-4 py-2 text-base text-gray-200 mt-10">
                    Criar aula
                    </Button>
                </DialogClose>
                </DialogFooter>
            </DialogContent>
            </form>
        </Dialog>
    </div>
  )
}

export default ModalCreateLeasson