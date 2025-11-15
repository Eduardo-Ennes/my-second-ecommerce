import { Link } from "react-router-dom"
import { AlertCircleIcon } from "lucide-react"
import {
  Alert,
  AlertTitle,
} from "@/components/ui/alert"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ApisUser from '../api/user/UserApi'

function LoginUser() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    try{
      event.preventDefault()
      const response = await ApisUser.LoginUser(form)
      if(!response?.status){
        // Essa condição só será acionada se houver problema de autenticação com o usuário.
        // Este response.error não causa conflito com o de baixo, devido ao status retornado, aonde esta condição é acionada e o return encerra a função não permitindo que o código continue.
        setError(response.error)
        return;
      }

      if(response?.error){
        // Na validação do carrinho de compras no login, o status sempre será true, porque não impossibilitará o login do usuário. 
       // Se o campo status: true não existir, sempre irá cair na primeira condição. 
        window.alert(response.error)
      }

      navigate('/')
    }catch(error){
      console.log(error)
      setError('Houve um error no servidor. Tente novamente.')
    }
  }


  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-5">
          <Link to='/' className="text-4xl font-semibold tracking-tight text-balance text-white">
            My Second E-commerce
            </Link>
        </div>

        {typeof error === "string" && error.length > 0 && (
          <div className="grid w-100 items-start gap-4 ml-auto mr-auto">
          <Alert variant="destructive" className="bg-white">
            <AlertCircleIcon />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        </div>
        )}

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} method="POST" className="space-y-6">
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm/6 font-medium text-gray-100"
              >
                Email address
              </label>
              <div className="mt-2">
                <input 
                  id="email" 
                  type="email" 
                  name="email" 
                  required 
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  autoComplete="email" 
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" 
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label 
                  htmlFor="password" 
                  className="block text-sm/6 font-medium text-gray-100"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input 
                  id="password" 
                  type="password" 
                  name="password" 
                  required 
                  onChange={(e) => setForm({...form, password: e.target.value})}
                  autoComplete="current-password" 
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" 
                />
              </div>
            </div>

            <div>
              <button 
                type="submit" 
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Entrar
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Not a member?
            <Link to="/user/new/" className="font-semibold text-indigo-400 hover:text-indigo-300">
              Click here
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default LoginUser