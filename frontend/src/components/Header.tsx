import '../css/header.css'
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom";
import IconCard from '../assets/shopping-cart.png'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { useState } from 'react';
import IconSearch from '../assets/search.png'
import IconHeart from '../assets/heart.png'
import DropdownMenuAvatar from './DropdownMenuAvatar';

function Header() {
  const [logado, setLogado] = useState(true)

  return (
    <>
        <header className="flex items-center justify-around text-white p-4 bg-[oklch(14.5%_0_0)] shadow-md">
     
            <h1 className="text-2xl font-bold">
              <Link to="/">My Second E-commerce</Link>
            </h1>


            <div className="flex w-full max-w-sm items-center gap-2 border-1 border-white p-1 rounded-2xl hover:ring-1 hover:transition-[2s]">
              <Input type="email" placeholder="Email" className='!border-none !outline-none !shadow-none !ring-0'/>
              <Link to="/" className='bg-[oklch(14.5%_0_0)] cursor-pointer text-base pr-3'>
                <img src={IconSearch} alt="Icone do search" />
              </Link>
            </div>

            {/* <div className="flex w-full max-w-sm items-center gap-2">
              <Input type="email" placeholder="Email"/>
              <Button type="button" variant="outline" className='bg-[oklch(14.5%_0_0)] cursor-pointer text-base'>
                Procurar
              </Button>
            </div> */}

            <div className="p-1 hover:outline-1 hover:outline-gray-500 cursor-pointer">
              <Link to='/user/new'>Apenas cursos em <br/> promoção</Link>
            </div>

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