import '../css/header.css'
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import IconCard from '../assets/shopping-cart.png'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import IconSearch from '../assets/search.png'
import IconHeart from '../assets/heart.png'
import DropdownMenuAvatar from './DropdownMenuAvatar';
import { useState } from 'react';
// import Cache from '../api/user/UserApi'


type argsArgument = {
  args: string
  nameSearchCourses: (name: string) => void
}

function Header({args, nameSearchCourses}: argsArgument) {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('')
  const [logado, setLogado] = useState(true)


const Reset = async () => {
        const response = await fetch('http://localhost:3000/reset', {
          method: 'POST'
        })

        const data = await response.json()
        setLogado(data.user.login)
        navigate('/')
    }

    const handleSearchCourseName = async () => {
      nameSearchCourses(name)
      setName('')
    }

  return (
    <>
        <header className="flex flex-wrap items-center justify-between text-white pt-4 pb-4 pl-10 pr-10 bg-[oklch(14.5%_0_0)] shadow-md">
     
            <h1 className="text-2xl font-bold">
              <Link to="/">My Second E-commerce</Link>
            </h1>

            <div>
              <button 
              className='bg-red-700'
              onClick={Reset}
              >
                ResetCache
              </button>
            </div>

            {args === "Yes" && 
              <div className="flex w-full max-w-sm items-center gap-2 border-1 border-gray-500 p-1 rounded-2xl hover:ring-1 hover:transition-[2s]">
                <Input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Buscar..." 
                className='!border-none !outline-none !shadow-none !ring-0'/>
                <Link to="#" onClick={() => handleSearchCourseName()} className='bg-[oklch(14.5%_0_0)] cursor-pointer text-base pr-3'>
                  <img src={IconSearch} alt="Icone do search" />
                </Link>
              </div>
            }
            

            {/* <div className="flex w-full max-w-sm items-center gap-2">
              <Input type="email" placeholder="Email"/>
              <Button type="button" variant="outline" className='bg-[oklch(14.5%_0_0)] cursor-pointer text-base'>
                Procurar
              </Button>
            </div> */}

            {args === "Yes" && 
              <div className="p-1 hover:outline-1 hover:outline-gray-500 cursor-pointer">
                <Link to='/user/new'>Apenas cursos em <br/> promoção</Link>
              </div>
            }
            

            {!logado ?
              <>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="bg-[oklch(14.5%_0_0)] cursor-pointer text-base">
                        Fazer login
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className='!w-[10rem]'>
                        <NavigationMenuLink asChild>
                          <Link to="/login">Login</Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link to="/user/new">Cadastrar-se</Link>
                        </NavigationMenuLink>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>

                <Link to='/card'>
                  <img src={IconCard} alt="Icone do carrinho de compras" />
                </Link>
              </>
            :
              <>
                {/* <div className="p-1 hover:outline-1 hover:outline-gray-500 cursor-pointer">
                  <Link to='/user/new'>Apenas cursos em <br/> promoção</Link>
                </div> */}

                <div className='flex flex-wrap gap-5'>
                    <DropdownMenuAvatar />

                  <Link to='/favorites'>
                    <img src={IconHeart} alt="Icone da lista de favoritos" />
                  </Link>

                  <Link to='/card'>
                    <img src={IconCard} alt="Icone do carrinho de compras" />
                  </Link>
                </div>
              </>
            }
        </header>
    </>
  )
}

export default Header