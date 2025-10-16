import iconHome from '../assets/home.png'
import iconPlay from '../assets/play-alt.png'
import iconExit from '../assets/exit.png'
import iconEnvelope from '../assets/envelope.png'
import iconAdd from '../assets/add.png'
import { useState } from 'react'
import { Button } from "@/components/ui/button"

import TableMyCorses from '@/components/DashboardTeachInPlataform/TableMyCorses'
import CreateCorse from '@/components/DashboardTeachInPlataform/CreateCorse'
import ResponseMessage from '@/components/DashboardTeachInPlataform/ResponseMessage'
import { Link } from 'react-router-dom'

function DashboardTeachInPlatarform() {
  const [template, setTemplate] = useState("")
  const redirectAfterCreateCourse = () => {
    setTemplate("EditMyCorse")
  }

  return (
    <>
      <main>
        <aside className='fixed top-0 left-0 h-screen w-[3rem] bg-zinc-900 flex flex-col items-center justify-center pt-5 pb-5'>
          <nav className='flex flex-col justify-between h-full'>
            <div className='flex flex-col gap-20'>
              <div>
                <Link to="/" className='block p-2 rounded bg-zinc-900 w-full hover:bg-gray-800 cursor-pointer text-center'>
                  <img src={iconHome} alt="Ícone home" title='Home' className='m-auto'/>
                </Link>
              </div>
              
              <div className='flex flex-col gap-1'>
                <Button onClick={() => setTemplate("EditMyCorse")} className='bg-zinc-900 hover:bg-gray-800 cursor-pointer'> 
                  <img src={iconPlay} alt="Ícone play" title='Meus cursos'/>
                </Button>

                <Button onClick={() => setTemplate("CreateCorse")} className='bg-zinc-900 hover:bg-gray-800 cursor-pointer'> 
                  <img src={iconAdd} alt="Ícone chart" title='Criar curso'/>
                </Button>

                <Button onClick={() => setTemplate("ResponseMessages")} className='bg-zinc-900 hover:bg-gray-800 cursor-pointer'> 
                  <img src={iconEnvelope} alt="Ícone envelope" title='Mensagens'/>
                </Button>
              </div>
            </div>
            
            <div>
              <Button className='bg-zinc-900 hover:bg-gray-800 cursor-pointer'> 
                <img src={iconExit} alt="Ícone exit" />
              </Button>
            </div>
          </nav>
        </aside>

        
        <section className='text-gray-200 p-2 ml-10'>
          {template === "EditMyCorse" && <TableMyCorses />}

          {template === "CreateCorse" && <CreateCorse redirectTo={redirectAfterCreateCourse}/>}

          {template === "ResponseMessages" && <ResponseMessage />}
        </section>
      </main>
    </>
  )
}

export default DashboardTeachInPlatarform