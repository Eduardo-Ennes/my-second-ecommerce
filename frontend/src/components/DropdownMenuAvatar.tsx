import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from "react-router-dom"

function DropdownMenuAvatar() {
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
            <Link to='/login' className='w-full'>Ensine na plataforma</Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to='/login' className='w-full'>Mensagens</Link>
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