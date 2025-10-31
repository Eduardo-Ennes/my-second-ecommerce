import ReactPlayer from 'react-player';
import Add from '../../../assets/add.png'
import worlwide from '../../../assets/worlwide.png'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area"
import ModalEditionModule from './modalsEditionLeassons/ModalEditionModule'
import ModalEditionLeasson from './modalsEditionLeassons/ModalEditionLeasson'
import ModalCreateLeasson from './modalsEditionLeassons/ModalCreateLeasson';
import FileLeassons from './modalsEditionLeassons/FileLeassons';


type dataCourse = {
  idModule: number
  nameModule: string
  position: number
  leassons: {
    idLeasson: number
    nameLeasson: string
    url: string
    position: number
  }[]
}


function EditionLeassons() {

  const [video, setVideo] = useState<string>('')
  const [id, setId] = useState<number | null>(null)
  const [course, setCourse] = useState<Array<dataCourse>>([
    {idModule: 1, 
    nameModule: 'Estrutura de repetição',
    position: 1,
    leassons: [
      {idLeasson: 1, nameLeasson: 'Estrutura de repetição for', url: 'https://youtu.be/JzUxNqDnFLA?si=pX2Lb-bm7m876dMh', position: 1},
      {idLeasson: 2, nameLeasson: 'Estrutura de repetição while', url: 'https://youtu.be/0WEA3zHJl28?si=fSqkamXPg4bK6vkp', position: 2}]}, 

    {idModule: 2, 
    nameModule: 'Funções',
    position: 2,
    leassons: [
      {idLeasson: 1, nameLeasson: 'Introdução a função', url: 'https://youtu.be/8kooIgKESYE?si=DMBqJ2uXk6iKycXN', position: 1},
      {idLeasson: 2, nameLeasson: 'Trabalhando com paramêtros nas funções', url: 'https://youtu.be/28W_sotzXUw?si=-njdfc1UVjXxGLeN', position: 2}]},  
  ])


  const selectVideo = (url: string) => {
    if(url.length < 1 ) return 

    setVideo(url)
  }

  return (
    <>
      <h2 className="bg-zinc-800 p-1 text-gray-200 text-2xl font-bold mt-30 ml-auto mr-auto text-center w-[90%]">Área de edição do curso</h2>


      <main className='flex flex-wrap p-2 justify-center'>
          <div className='p-1'>
            <ReactPlayer 
            src={video}
            controls
            playing
            width='48rem'
            height='27rem'
            />
          </div>

          <ScrollArea className='h-[27rem] w-[30rem]'>
            {course.length > 0 ? (
              <section className='flex flex-col gap-y-5 p-1'>
                {course.map(element => (
                  <div>
                    <div key={element.idModule} className='flex flex-wrap p-1 border-t-1 border-zinc-700 itens-center justify-between hover:bg-zinc-800 rounded'>
                      <Link to='#' className='pl-1 transition-[2s] w-[28rem] truncate font-bold'> {element.position}.0 {element.nameModule}</Link>

                      <ModalEditionModule id={id}/>
                      
                    </div>

                    {element.leassons.map(leasson => (
                      <div 
                      key={leasson.idLeasson} 
                      className='flex flex-wrap itens-center p-1 justify-between mt-2 hover:bg-zinc-800 rounded'
                      onClick={() => {selectVideo(leasson.url)}}>
                        <Link to='#' className='pl-6 transition-[2s] w-[27rem] truncate'>{element.position}.{leasson.position} {leasson.nameLeasson}</Link>
                        
                        <ModalEditionLeasson id={leasson.idLeasson} />

                      </div>
                    ))}

                    <ModalCreateLeasson />
                    
                  </div>
                ))}
              </section>
            ):(
              <Link to='#' className='flex flex-col gap-y-2 items-center p-1 mt-1 hover:bg-zinc-900 rounded'>
                <img src={worlwide} alt="Icone do mundo" className='h-[32px] w-[32px]'/>
                <div className='flex flex-wrap justify-center gap-2 mt-1'>
                  <img src={Add} alt="Video aula" className='mt-auto mb-auto'/>
                  <p>Adicionar aula</p>
                </div>
              </Link>
            )}
          </ScrollArea>
      </main>

      <FileLeassons />
    </>
  )
}

export default EditionLeassons