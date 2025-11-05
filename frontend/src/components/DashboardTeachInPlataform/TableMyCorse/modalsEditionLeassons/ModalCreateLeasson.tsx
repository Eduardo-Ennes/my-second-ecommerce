import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Link } from "react-router-dom"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Add from '../../../../assets/add.png'
import ApiEditionCourse from '../../../../api/editionCourse/ApiCourseLeasson'

type createLeasson = {
    name: string
    video: string | File 
}

type Props = {
  idModule?: number | null
  reload: () => void
}

function ModalCreateLeasson({ idModule, reload }: Props) {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [error, seterror] = useState<string>('')
    const [leasson, setLeasson] = useState<createLeasson>({
        name: '',
        video: ''
    })

    const handleCreateLeasson = async () => {
        try{
            if(!idModule) return 
            const response = await ApiEditionCourse.createLeasson(idModule, leasson)
            if(!response.status){
                console.log('Daqui a pouco já será feito um error')
                return;
            }

            reload()
            setLeasson({
                name: '',
                video: ''
            })
            setOpen(false)
        }catch(error){
            console.log(error)
            window.alert('Error de conexão com a função da api, tente novamente.')
        }
    }

  return (
    <div>
        <Dialog open={open} onOpenChange={setOpen}>
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

                <DialogDescription className="text-white">
                    Preencha as informações abaixo para criar uma nova aula no módulo selecionado.
                </DialogDescription>

                <div className="grid gap-4 mt-3">
                    <div className="grid gap-3">
                        <label htmlFor="leasson">Nome</label>
                        <input 
                        name='leasson'
                        type="text" 
                        value={leasson.name}
                        onChange={(e) => setLeasson({...leasson, name: e.target.value})}
                        placeholder='Digite o nome da aula: '
                        className="rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"/>
                    </div>

                    <div className="grid gap-3 mt-3">
                        <Label htmlFor="position">Anexe o arquivo da aula</Label>
                        <Input 
                        name="file"
                        type="file" 
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                            setLeasson({ ...leasson, video: e.target.files[0] });
                            }
                        }}
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
                    <Button 
                    type="button"
                    onClick={() => handleCreateLeasson()}
                    className="rounded cursor-pointer bg-fuchsia-900 hover:bg-fuchsia-950 px-4 py-2 text-base text-gray-200 mt-10">
                        Criar aula
                    </Button>
                </DialogFooter>
            </DialogContent>
            </form>
        </Dialog>
    </div>
  )
}

export default ModalCreateLeasson