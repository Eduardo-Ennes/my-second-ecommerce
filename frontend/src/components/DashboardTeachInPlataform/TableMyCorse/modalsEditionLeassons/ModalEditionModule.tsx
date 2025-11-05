import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { Link } from "react-router-dom"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import MenuDots from '../../../../assets/menu-dots.png'
import ApiCourseModule from '../../../../api/editionCourse/ApiCourseModule';

type Props = {
  id: number | null 
  reload: () => void
}

type FormModule = {
  id: number | null
  name: string 
  position: number 
}

function ModalEditionModule({id, reload}: Props) {
  // O id passado é do módulo

  const navigate = useNavigate()
  const [error, setError] = useState('')

  // Esta variável controla o estado do dialog, pq quando se clica em um botão o comportamento padrão é encerrar automaticamente. Aqui é false como padrão, quando for aberto será setado para true diretamente do dialog, quando alguma api for bem sucedida será setado false para o encerramento da janela.
  const [open, setOpen] = useState(false);

  // Armazena os valores do objeto 
  const [module, setModule] = useState<FormModule>({
    id: null,
    name: '',
    position: 0
  });


  // Busca os dados do módulo
  const handleSearch = useCallback(async () => {
    try{
      if(!id) return;

      const response = await ApiCourseModule.searchModule(id)
      if(!response.status){
        window.alert(response.error)
        navigate('/dashboard')
        return;
      }

      console.log(response.data)

      setModule({
        id: response.data.id,
        name: response.data.name,
        position: response.data.position
      })
    }catch(error){
      console.log(error)
        window.alert('Houve um error de conexão com a função da api updateModule.')
        navigate('/dashboard')
    }
  }, [id, navigate])

  // Este effect é importante, sempre acionado uma vez quando o template é iniciado, depois só quando chamada a função de dependência.
  useEffect(() => {
    handleSearch()
  }, [handleSearch])

  // Atualiza o módulo
  const handleUpdate = async () => {
    try{
      const response = await ApiCourseModule.updateModule(module)
      if(!response.status){
        window.alert(response.error)
        navigate('/dashboard')
        return;
      }

      reload()
      setOpen(false)
    }catch(error){
      console.log(error)
        window.alert('Houve um error de conexão com a função da api updateModule.')
        navigate('/dashboard')
    }
  }

  // Deleta o Módulo
  const handleDelete = async () => {
    try{
      const response = await ApiCourseModule.deleteModule(id)
      if(!response.status){
        setError(response.error)
        return;
      }

      reload()
      setOpen(false)
    }catch(error){
      console.log(error)
        window.alert('Houve um error de conexão com a função da api.')
    }
  }

  return (
      <div>
        <Dialog open={open} onOpenChange={setOpen}>
          <form>
            <DialogTrigger asChild>
              <Link to='#'>
                <img src={MenuDots} alt="Video aula" className='mt-auto mb-auto'/>
              </Link>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-gray-500 text-gray-200">
              <DialogHeader>
                <DialogTitle>Edição do módulo</DialogTitle>
              </DialogHeader>

              <DialogDescription>
                {/* Este campo esta aqui apenas para o react não reclamar de erro */}
              </DialogDescription>

              <div className="grid gap-4 mt-3">
                <div className="grid gap-3">
                   <label htmlFor="module">Nome</label>
                    <input 
                    name='module'
                    type="text" 
                    value={module.name}
                    onChange={(e) => setModule({...module, name: e.target.value})}
                    placeholder='Colocar o nome do módulo'
                    className="rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"/>
                </div>

                <div className="grid gap-3 mt-3">
                  <Label htmlFor="position">Ordem</Label>
                  <Input  
                  type="number"
                  name="position"   
                  min={0}
                  onChange={(e) => setModule({...module, position: Number(e.target.value)})}
                  placeholder={`Posição atual: ${module.position}° módulo`} 
                  className="rounded-md bg-white/5 px-3.5 py-2 text-base text-white placeholder:text-gray-500 border-1 border-zinc-700"/>
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
                  <div className="flex flex-wrap gap-x-5">
                    <Button 
                    type="submit"
                    className="rounded cursor-pointer bg-red-600 hover:bg-red-700 px-4 py-2 text-base text-gray-200 mt-10" 
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete()
                      }}>
                      Deletar
                    </Button>

                    <Button 
                    type="submit"
                    className="rounded cursor-pointer bg-fuchsia-900 hover:bg-fuchsia-950 px-4 py-2 text-base text-gray-200 mt-10" 
                    onClick={(e) => {
                      e.stopPropagation()
                      handleUpdate()}}>
                      Atualizar
                    </Button>
                  </div>
                  
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </div>
  )
}

export default ModalEditionModule