import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,DialogTrigger } from "@/components/ui/dialog"
import { Link } from "react-router-dom"
import MenuDots from '../../../../assets/menu-dots.png'
import { Alert, AlertTitle } from "@/components/ui/alert"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ApiCourseLeasson from '../../../../api/editionCourse/ApiCourseLeasson';


type Props = {
  id?: number | null
  reload: () => void
}

type LeassonUpdate = {
  name: string 
  file: string | File 
  position: number
}

function ModalEditionLeasson({id, reload}: Props) {
  const navigate = useNavigate()
    const [error, setError] = useState<string>('')

    // Esta variável controla o estado do dialog, pq quando se clica em um botão o comportamento padrão é encerrar automaticamente. Aqui é false como padrão, quando for aberto será setado para true diretamente do dialog, quando alguma api for bem sucedida será setado false para o encerramento da janela.
    const [open, setOpen] = useState(false);

    // Armazena os valores do objeto
    const [leasson, setLeasson] = useState<LeassonUpdate>({
      name: '',
      file: '',
      position: 0
    })

    // Busca os dados da aula
    const handleSearch = useCallback(async () => {
      try{
        if(!id) return
        const response = await ApiCourseLeasson.searchDetailLeasson(id)
        if(!response.status){
          window.alert(response.error)
          navigate('/dashboard')
        }

        setLeasson(response.data)
        console.log(response.data)
      }catch(error){
        console.log(error)
        window.alert('Houve um error de conexão com a função da api searchLeasson.')
        navigate('/dashboard')
      }
    }, [id, navigate])

    // Este effect é importante, sempre acionado uma vez quando o template é iniciado, depois só quando chamada a função de dependência.
    useEffect(() => {
      handleSearch()
    }, [handleSearch])

    // Atualiza uma aula
    const handleUpdate = async () => {
      try{
        if(!id){
          window.alert('Houve um error! Id da aula undefined. Entre em contato com nossa equipe de atendimento.')
          navigate('/dashboard')
          return;
        }

        const response = await ApiCourseLeasson.updateLeasson(id, leasson)
        if(!response.status){
          if(response.code == 500){
            window.alert(response.error)
            navigate('/dashboard')
            return;
          }
          
          setError(response.error)
          return;
        }

        reload()
        setOpen(false)
      }catch(error){
        console.log(error)
        window.alert('Houve um error de conexão com a função da api updateLeasson.')
        navigate('/dashboard')
      }
    }

    // Deleta uma aula 
    const handleDelete = async () => {
      try{
        if(!id){
          window.alert('Houve um error! Id da aula undefined. Entre em contato com nossa equipe de atendimento.')
          navigate('/dashboard')
          return;
        }
        const response = await ApiCourseLeasson.deleteLeasson(id)
        if(!response.status){
          setError(response.error)
          return;
        }

        reload()
        setOpen(false)
      }catch(error){
        console.log(error)
        window.alert('Houve um error de conexão com a função da api deleteLeasson.')
        navigate('/dashboard')
      }
    }

  return (
    <div>
      {/* 
        open={open} = Valor padrão que é false, está armazenada na variável logo acima
        onOpenChange={setOpen} = seta para true quando é clicado no editionCourse
      */}
        <Dialog open={open} onOpenChange={setOpen}>
          <form>
            <DialogTrigger asChild>
              <Link to='#'>
                <img src={MenuDots} alt="Video aula" className='mt-auto mb-auto'/>
              </Link>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-gray-500 text-gray-200">
              <DialogHeader>
                <DialogTitle>Edição da aula</DialogTitle>
              </DialogHeader>

              <DialogDescription>
                  {/* Este campo esta aqui apenas para o react não reclamar de erro */}
              </DialogDescription>

              <div className="grid gap-4 mt-3">
                <div className="grid gap-3">
                    <label htmlFor="module">Nome</label>
                    <input 
                    name="module"
                    type="text" 
                    value={leasson.name}
                    onChange={(e) => setLeasson({...leasson, name: e.target.value})}
                    placeholder='Colocar o nome da aula'
                    className="rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"/>
                </div>

                <div className="grid gap-3 mt-3">
                    <Label htmlFor="position">Ordem</Label>
                    <Input  
                    type="number"
                    name="position"   
                    min={0}
                    onChange={(e) => setLeasson({...leasson, position: Number(e.target.value)})}
                    placeholder={`Posição atual: ${leasson.position}`}
                    className="rounded-md bg-white/5 px-3.5 py-2 text-base text-white placeholder:text-gray-500 border-1 border-zinc-700"/>
                </div>

                <div className="grid gap-3 mt-3">
                    <Label htmlFor="position">Anexe o arquivo da aula</Label>
                    <Input 
                    name="file"
                    type="file" 
                    onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                            setLeasson({ ...leasson, file: e.target.files[0] });
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
                    type="button"
                    className="rounded cursor-pointer bg-fuchsia-900 hover:bg-fuchsia-950 px-4 py-2 text-base text-gray-200 mt-10" 
                    onClick={(e) => {
                      e.stopPropagation()
                      handleUpdate()
                      }}>
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

export default ModalEditionLeasson