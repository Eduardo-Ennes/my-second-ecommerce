import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from "react-router-dom"
import { useState } from "react"

function DropdownMenuAvatar() {
  const [role, setRole] = useState('instructor')
  return (
    <>
      <DropdownMenu>
          {/* Avatar como gatilho */}
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        {/* Menu que aparece abaixo do Avatar */}
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem>
            <Link to='/' className='w-full'>Home</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to='/my/corses' className='w-full'>Meus cursos</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to='/favorites' className='w-full'>Favoritos</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to='/card' className='w-full'>Meu carrinho</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            {role === 'user' && 
              <Link to='/dashboard' className='w-full'>Ensine na plataforma</Link>
            }

            {role === 'instructor' && 
              <Link to='/dashboard' className='w-full'>Dashboard</Link>
            }
          </DropdownMenuItem>

          <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to='/login' className='w-full flex flex-wrap items-center gap-x-13'>
                <p>Mensagem</p>
                <Badge
                className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                variant="destructive"
              >
                100
              </Badge>
              </Link>
              
            </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <Link to='/login' className='w-full'>Perfil</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to='/login' className='w-full'>Forma de pagamento</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to='/login' className='w-full'>Configurações</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to='/login' className='w-full'>Sair</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default DropdownMenuAvatar