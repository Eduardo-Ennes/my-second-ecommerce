// Icones
import iconAt from '../assets/at.png'
import iconExit from '../assets/exit.png'
import iconCreditCard from '../assets/credit-card.png'
import iconKey from '../assets/key.png'

// Components shadcn
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useState } from 'react'

import { Link } from 'react-router-dom'

// Templates
import MethodPayment from '@/components/FormPayment/MethodPayment'
import ChangeEmailAndPassword from '@/components/DashboarProfile/ChangeEmailAndPassword'


function DashboardProfile() {
  const [template, setTemplate] = useState("")
  return (
    <>
      <main>
        <aside className='fixed top-0 left-0 h-screen bg-zinc-900 flex flex-col items-center justify-center pt-5 pb-5'>
          <nav className='flex flex-col justify-between h-full p-2'>
            <div className='flex flex-col gap-20'>

            <Link to="/">
              <Avatar className="cursor-pointer ml-auto mr-auto w-10 h-10">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
              
              
              <div className='flex flex-col gap-1'>
                <Button onClick={() => setTemplate("ChangeEmail")} className='bg-zinc-900 hover:bg-gray-800 cursor-pointer'> 
                  <img src={iconAt} alt="Ícone play" title='Trocar email'/>
                </Button>

                <Button onClick={() => setTemplate("ChangePassword")} className='bg-zinc-900 hover:bg-gray-800 cursor-pointer'> 
                  <img src={iconKey} alt="Ícone chart" title='Trocar senha'/>
                </Button>

                <Button onClick={() => setTemplate("FormPayment")} className='bg-zinc-900 hover:bg-gray-800 cursor-pointer'> 
                  <img src={iconCreditCard} alt="Ícone envelope" title='Froma de pagamento'/>
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

        
        <section className='text-gray-200 p-2 ml-16'>
          {template === "ChangeEmail" && <ChangeEmailAndPassword args={"email"} />}
          {template === "ChangePassword" && <ChangeEmailAndPassword args={"password"} />}
          {template === "FormPayment" && <MethodPayment />}
        </section>
      </main>
    </>
  )
}

export default DashboardProfile