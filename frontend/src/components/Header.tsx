import '../css/header.css'
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom";
import IconCard from '../assets/shopping-cart.png'
import { Button } from './ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { useState } from 'react';

function Header() {
  const [logado, setLogado] = useState(true)

  return (
    <>
        <header className="flex items-center justify-around text-white p-4 bg-[oklch(14.5%_0_0)] shadow-md">
     
            <h1 className="text-2xl font-bold">My Second E-commerce</h1>


            <div className="flex w-full max-w-sm items-center gap-2">
              <Input type="email" placeholder="Email"/>
              <Button type="button" variant="outline" className='bg-[oklch(14.5%_0_0)] cursor-pointer text-base'>
                Procurar
              </Button>
            </div>

            {!logado ?
              <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="bg-[oklch(14.5%_0_0)] cursor-pointer text-base">
                        Fazer login
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className='!w-[13rem]'>
                        <NavigationMenuLink asChild>
                          <Link to="/login">Login</Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link to="/register">Cadastrar-se como usuário</Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link to="/affiliate-login">Login como afiliado</Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link to="/become-affiliate">Seja um afiliado</Link>
                        </NavigationMenuLink>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
            :
              <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="bg-[oklch(14.5%_0_0)] cursor-pointer text-base">
                        My account
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className='!w-[13rem]'>
                        <NavigationMenuLink asChild>
                          <Link to="/login">Login</Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link to="/register">Cadastrar-se como usuário</Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link to="/affiliate-login">Login como afiliado</Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link to="/become-affiliate">Seja um afiliado</Link>
                        </NavigationMenuLink>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
            }

            <Link to='/'>
              <img src={IconCard} alt="Icone do carrinho de compras" />
            </Link>
        </header>
    </>
  )
}

export default Header