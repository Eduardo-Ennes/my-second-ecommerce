import { AlertCircleIcon } from "lucide-react"
import { Link } from 'react-router-dom' 
import {
  Alert,
  AlertTitle,
} from "@/components/ui/alert"
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import ApisUser from '../api/UserApi'

type user = {
    first_name: string
    last_name: string
    cpf: string
    email: string
    phone: string
    password: string 
    confirm_password: string
    privacy: boolean
}

function FormUser() {
    const navigate = useNavigate();
    const [error, setError] = useState("")
    const [privacy, setPrivacy] = useState(false)
    const [form, setForm] = useState<user>({
        first_name: "", 
        last_name: "",
        cpf: "",
        email: "",
        phone: "",
        password: "", 
        confirm_password: "",
        privacy: privacy
    })


    const FormRegisterUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const response = await ApisUser.CreateUser(form)
        console.log('RESPONSE: ', response)
        if(response.status){
            navigate('/login'); 
        }
        else{
            setError(response.error)
        }
    }

  return (
    <div className="isolate bg-black px-3 py-12 sm:py-16 lg:px-4">
        <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
            {/* <div
            style={{
                clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-1/2 -z-10 aspect-1155/678 w-144.5 max-w-none -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-40rem)] sm:w-288.75"
            /> */}
        </div>
        <div className="mx-auto max-w-2xl text-center">
            <Link to='/' className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
            My Second E-commerce
            </Link>
            <p className="mt-2 text-lg/8 text-gray-400">
            cadastre-se para ter acesso aos nossos cursos.
            </p>
        </div>
        <form onSubmit={(e) => FormRegisterUser(e)} method="POST" className="mx-auto mt-6 max-w-xl sm:mt-8">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                    <label htmlFor="first-name" className="block text-sm/6 font-semibold text-white">
                    Nome
                    </label>
                    <div className="mt-2.5">
                    <input
                        id="first-name"
                        type="text"
                        name="first-name"
                        placeholder="Seu nome"
                        onChange={(e) => setForm({...form, first_name: e.target.value})}
                        autoComplete="given-name"
                        required
                        className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                    />
                    </div>
                </div>
            <div>
                <label htmlFor="last-name" className="block text-sm/6 font-semibold text-white">
                Sobrenome
                </label>
                <div className="mt-2.5">
                    <input
                        id="last-name"
                        type="text"
                        name="last-name"
                        placeholder="Sobrenome"
                        onChange={(e) => setForm({...form, last_name: e.target.value})}
                        required
                        autoComplete="family-name"
                        className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                    />
                </div>
            </div>
            <div className="sm:col-span-2">
                <label htmlFor="cpf" className="block text-sm/6 font-semibold text-white">
                CPF
                </label>
                <div className="mt-2.5">
                    <input
                        id="cpf"
                        type="text"
                        name="cpf"
                        placeholder="Cpf: 123.456.789-98"
                        onChange={(e) => setForm({...form, cpf: e.target.value})}
                        required
                        autoComplete="organization"
                        className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                    />
                </div>
            </div>
            <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm/6 font-semibold text-white">
                Email
                </label>
                <div className="mt-2.5">
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Exemplo@gamil.com"
                        onChange={(e) => setForm({...form, email: e.target.value})}
                        required
                        autoComplete="email"
                        className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                    />
                </div>
            </div>
            <div className="sm:col-span-2">
                <label htmlFor="cpf" className="block text-sm/6 font-semibold text-white">
                Contato
                </label>
                <div className="mt-2.5">
                    <input
                        id="phone"
                        type="text"
                        name="phone"
                        onChange={(e) => setForm({...form, phone: e.target.value})}
                        required
                        autoComplete="organization"
                        placeholder="Exemplo: (21)98659-8569"
                        className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                    />
                </div>
            </div>
            <div className="sm:col-span-2">
                <label htmlFor="password" className="block text-sm/6 font-semibold text-white">
                Senha
                </label>
                <div className="mt-2.5">
                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Digite sua senha de acesso"
                    onChange={(e) => setForm({...form, password: e.target.value})}
                    required
                    className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                />
                </div>
            </div>
            <div className="sm:col-span-2">
                <label htmlFor="password_confirm" className="block text-sm/6 font-semibold text-white">
                Confirme sua senha
                </label>
                <div className="mt-2.5">
                <input
                    id="password_confirm"
                    type="password"
                    name="password_confirm"
                    placeholder="Confirme sua senha"
                    onChange={(e) => setForm({...form, confirm_password: e.target.value})}
                    required
                    className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                />
                </div>
            </div>

            {error.length > 0 && (
                <div className="sm:col-span-2">
                    <div className="w-144 ml-auto mr-auto mt-2 mb-2">
                        <Alert variant="destructive" className="bg-white">
                            <AlertCircleIcon />
                            <AlertTitle>{error}</AlertTitle>
                        </Alert>
                    </div>
                </div>
            )}

            <div className="flex gap-x-4 sm:col-span-2">
                <div className="flex h-6 items-center">
                    <div className="group relative inline-flex w-8 shrink-0 rounded-full bg-white/5 p-px inset-ring inset-ring-white/10 outline-offset-2 outline-indigo-500 transition-colors duration-200 ease-in-out has-checked:bg-indigo-500 has-focus-visible:outline-2">
                        <span className="size-4 rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-checked:translate-x-3.5" />
                        <input
                        id="agree-to-policies"
                        type="checkbox"
                        name="agree-to-policies"
                        onChange={(e) => setPrivacy(e.target.checked)}
                        aria-label="Agree to policies"
                        className="absolute inset-0 appearance-none focus:outline-hidden"
                        />
                    </div>
                </div>
                <label htmlFor="agree-to-policies" className="text-sm/6 text-gray-400">
                Selecione este campo, se você está de acordo com nossa {" "}
                <a href="#" className="font-semibold whitespace-nowrap text-indigo-400">
                    politica de privacidade
                </a>
                .
                </label>
            </div>
            </div>
            <div className="mt-10">
                <button
                    type="submit"
                    className="block w-full rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                    Cadastrar
                </button>
            </div>
        </form>
    </div>
  )
}

export default FormUser