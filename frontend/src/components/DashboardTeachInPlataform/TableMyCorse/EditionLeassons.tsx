
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from '@headlessui/react';
import ModalEditionModule from './modalsEditionLeassons/ModalEditionModule'
import ModalEditionLeasson from './modalsEditionLeassons/ModalEditionLeasson'
import ModalCreateLeasson from './modalsEditionLeassons/ModalCreateLeasson';
import FileLeassons from './modalsEditionLeassons/FileLeassons';
import ReactPlayer from 'react-player';
import ApiCourseModule from '../../../api/editionCourse/ApiCourseModule';

// Este video é o inicial quando o template é aberto
import MaltaVideo from '../../../media/malta.mp4'

type dataCourse = {
  id?: number
  name?: string
  position?: number
  leassons: {
    id?: number | undefined 
    name?: string | undefined 
    url?: string | undefined 
    position?: number | undefined 
  }[] | undefined
}

function EditionLeassons({id}: {id: number | null}) {
  const navigate = useNavigate()

  // Os ids abaixo são utilizados para que apenas um objeto seja buscado na api, será usado como estado para controlar, se não todos serão buscados por que os templates dos modais estão dentro do for.
  const [idModule, setIdModule] = useState<number | null>(null)
  const [idLeasson, setIdLeasson] = useState<number | null>(null)
  
  // Está variavel irá armazenar o id e o video de uma aula. O id será utilizado e passado para o template do file para ser usado como referência nas operações e controle de estado do template. O video será usado para armazenar o valor da url da aula, e ser usado diretamente na api para renderização do video.
  const [infoLeasson, setInfoLeasson] = useState<{id: number | null, video: string}>({
    id: null, 
    video: ''
  })

  // Apenas armazena uma string para a criação de um módulo
  const [createModule, setCreateModule] = useState('')
  // variavel que armazena todo o objeto, modulos e aulas 
  const [course, setCourse] = useState<Array<dataCourse>>([])

  const reload = () => {
    SearchLeassons()
  } // Função para buscar todo o course atualizado, usado em templates filhos

  // Busca todo o objeto para as exibições dos módulos e aulas
  const SearchLeassons = useCallback(async () => {
    // Essa função busca todos os dados das aulas, módulo e aulas, está função está na classe da api dos módulos.
      const response = await ApiCourseModule.searchAll(id)
      if(!response.status){
        if(response.code === 401){
          window.alert('Usuario não autenticado. Faça login novamente.')
          navigate('/login')
          return;
        }

        window.alert(response.error)
        navigate('/dashboard')
      }
 
      setCourse(response.data)
  }, [id, navigate])

  useEffect(() => {
    SearchLeassons()
  }, [SearchLeassons])


  // Cria um módulo
  const handleCreateModule = async () => {
    const position = course.length + 1
    const response = await ApiCourseModule.createModule(id, createModule, position)
    if(!response.status){
      if(response.code === 401){
        window.alert('Usuario não autenticado. Faça login novamente.')
        navigate('/login')
        return;
      }
      
      window.alert(response.error)
      return;
    }

    SearchLeassons()
    setCreateModule('')
  }

  return (
    <>
      <h2 className="bg-zinc-800 p-1 text-gray-200 text-2xl font-bold mt-30 ml-auto mr-auto text-center w-[90%]">Área de edição do curso</h2>


      <main className='flex flex-wrap p-2 justify-center'>
          <div className='p-1'>
            {infoLeasson.video.length > 0 ? (
              <ReactPlayer 
              src={`http://localhost:3000/search/course/leasson/${infoLeasson.video}`}
              controls
              playing
              width='48rem'
              height='27rem'
              />
            ):(
              <ReactPlayer 
              src={MaltaVideo}
              controls
              playing
              width='48rem'
              height='27rem'
              />
            )}
            
          </div>

          <ScrollArea className='h-[27rem] w-[30rem]'>
            {course.length > 0 && 
              <section className='flex flex-col gap-y-5 p-1'>
                {course.map(element => (
                  <div key={element.id}>
                    <div 
                    onClick={() => setIdModule(element.id ?? 0)}
                    className='flex flex-wrap p-1 border-t-1 border-zinc-700 itens-center justify-between hover:bg-zinc-800 rounded'>
                      <Link to='#' 
                      className='pl-1 transition-[2s] w-[28rem] truncate font-bold'> {element.position}.0 {element.name}</Link>

                      {/* Modal para edição dos módulos, aonde é passado o id do módulo para deleção e atualização. O id é passado por uma variável para controlar a api de busca dos objetos, pq o modal esta dentro de um for, então ele carrega e é chamado a cada loop. */}
                      <ModalEditionModule id={Number(idModule)} reload={reload}/>
                      
                    </div>

                    {(element.leassons ?? []).length > 0 && 
                      <>
                        {(element.leassons ?? []).map(leasson => (
                          <div 
                            key={leasson.id} 
                            onClick={() => setIdLeasson(leasson.id ?? 0)}
                            className='flex flex-wrap itens-center p-1 justify-between mt-2 hover:bg-zinc-800 rounded'>
                            <Link 
                              to='#' 
                              onClick={() => setInfoLeasson({id: leasson.id ?? 0, video: leasson.url ?? ''})}
                              className='pl-6 transition-[2s] w-[27rem] truncate'>
                              {element.position}.{leasson.position} {leasson.name}
                            </Link>
                            {/* Modal para edição de aulas, aonde é passado o id da aula para deleção e atualização. O id é passado por uma variável para controlar a api de busca dos objetos, por que o modal esta dentro de um for, então ele carrega e é chamado a cada loop. */}
                            <ModalEditionLeasson id={idLeasson} reload={reload}/>
                          </div>
                        ))}
                      </>
                    }
                    
                    {/* Modal para criação de uma aula, é passado o id do módulo para fazer referência do banco de dados */}
                    <ModalCreateLeasson idModule={element.id} reload={reload}/>
                    
                  </div>
                ))}
              </section>
            }

              <div className='flex flex-col gap-y-2 items-center p-1 mt-20 border-t-1 border-zinc-700'>
                <label htmlFor="module">Campo para a criação do módulo</label>
                <input 
                type="text" 
                name='module'
                value={createModule}
                onChange={(e) => setCreateModule(e.target.value)}
                placeholder='Digite o nome do módulo: ' 
                className="w-[25rem] rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"/>
                <div>
                  
                </div>
                <Button 
                  type="button"
                  onClick={() => handleCreateModule()}
                  className="w-[10rem] rounded cursor-pointer bg-fuchsia-900 hover:bg-fuchsia-950 px-4 py-2 text-base text-gray-200 mt-10">
                      Criar módulo
                </Button>
              </div>
          </ScrollArea>
      </main>

      {infoLeasson.id !== null &&
        <FileLeassons id={infoLeasson.id}/>
      }
    </>
  )
}

export default EditionLeassons