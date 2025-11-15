import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from "react-router-dom"
import userApi from '../api/user/UserApi'


function DropdownMenuAvatar() {

  const logouth = async () => {
    try{
      const response = await userApi.logouthUser()

      if(!response.status){
        window.alert(response.error)
        return;
      }

      window.location.reload()
    }catch(error){
      console.log(error)
      window.alert('Houve um erro ao realizar o logouth. Falha na conexão com o servidor.')
      return;
    }
  }
  
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
            <Link to='/profile' className='w-full'>Perfil</Link>
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
            <Link to='/my/shops' className='w-full'>Minhas compras</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to='/dashboard' className='w-full'>Dashboard</Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
            
          <DropdownMenuItem 
          onClick={() => logouth()}
          className="cursor-pointer">
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default DropdownMenuAvatar