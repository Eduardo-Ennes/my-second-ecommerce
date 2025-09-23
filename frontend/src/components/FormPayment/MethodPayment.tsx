import { useState } from 'react'
import iconAddBlack from '../../assets/add-black.png'
import iconArrowLeft from '../../assets/arrow-small-left.png'
import iconInfo from '../../assets/info.png'
import { Button } from "@/components/ui/button"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Alert,
  AlertTitle,
} from "@/components/ui/alert"

function MethodPayment() {
    const [error, seterror] = useState("")
    const [state, setState] = useState("")
    const [methodsPayments, setMethodsPayments] = useState([1])
  return (
    <>
        {methodsPayments.length > 0 && state !== "Add" ?
            <>
                <div className='p-3'>
                    <Button 
                        type="button"
                        onClick={() => setState("Add")}
                        className="rounded cursor-pointer bg-gray-200 hover:bg-gray-400 px-4 py-2 text-base text-zinc-900">
                            <img src={iconAddBlack} alt="Icone de adicionar" />
                            <p>Adicionar forma de pagamento</p>
                    </Button>
                </div>

                <div className='p-3 flex flex-wrap gap-x-10 gap-y-10'>
                    <article className='flex flex-wrap gap-x-10 w-[33rem] rounded justify-center bg-zinc-900 p-2 hover:bg-zinc-800'>
                        <div className='flex flex-col gap-y-5'>
                            <div>
                                <p className='font-bold'>Nome do titular:</p>
                                <p className='pl-4'>Eduardo Ennes N Simões</p>
                            </div>

                            <div>
                                <p className='font-bold'>Número do cartão: </p>
                                <p className='pl-4'>8759-2563-5896-7412</p>
                            </div>
                        </div>
                        
                        <div className='flex flex-col gap-y-5'>
                            <div>
                                <p className='font-bold'>Data de validade: </p>
                                <p className='pl-4'>10/28</p>
                            </div>

                            <div>
                                <p className='font-bold'>Tipo do cartão: </p>
                                <p className='pl-4'>Crédito</p>
                            </div>
                        </div>

                        <div className='mt-auto'>
                            <Button 
                                type="button"
                                className="rounded cursor-pointer bg-red-500 hover:bg-red-600 px-4 py-2 text-base text-zinc-900">
                                Excluir
                            </Button>
                        </div>
                    </article>
                </div>
            </>
            
        :
            <>
                <div className='p-3'>
                    <Button 
                        type="button"
                        onClick={() => setState("Back")}
                        className="rounded cursor-pointer bg-gray-200 hover:bg-gray-400 px-4 py-2 text-base text-zinc-900">
                            <img src={iconArrowLeft} alt="Icone flecha para a esquerda" />
                            <p>Voltar</p>
                    </Button>
                </div>

                <h2 className="text-gray-200 text-2xl font-bold mt-5 ml-auto mr-auto mb-5 text-center border-b border-zinc-700 w-[90%]">Adicionar forma de pagamento</h2>

                <form action="#" className="w-[60%] m-auto border-1 border-gray-700 p-4 rounded-md mt-10">

                    {error.length > 0 && 
                        <div className="w-[70%] ml-auto mr-auto mt-5 mb-15">
                            <Alert variant="destructive" className="bg-red-600 text-gray-200 flex flex-wrap gap-x-3 items-center border-none">
                                <img src={iconInfo} alt="Icone de informação" />
                                <AlertTitle>{error}</AlertTitle>
                            </Alert>
                        </div>
                    }

                    <div className='flex flex-wrap justify-center gap-x-10'>
                        <div>
                            <label htmlFor="name-titular" className="block text-sm/6 font-semibold text-white">
                            Nome do titular
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="name-titular"
                                    type="text"
                                    name="name-titular"
                                    placeholder='Nome exato no cartão'
                                    autoComplete="given-name"
                                    className="block w-[20rem] rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="number-card" className="block text-sm/6 font-semibold text-white">
                            Número do cartão
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="number-card"
                                    type="text"
                                    name="number-card"
                                    placeholder='Exemplo: 7458-6985-3652-1254'
                                    autoComplete="given-name"
                                    className="block w-[20rem] rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className='mt-5 flex flex-wrap items-center justify-center gap-x-15'>
                        <div>
                            <label htmlFor="validity" className="block text-sm/6 font-semibold text-white">
                            Expiração
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="validity"
                                    type="text"
                                    name="validity"
                                    placeholder='Exemplo: 10/30'
                                    autoComplete="given-name"
                                    className="block w-[10rem] rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="cvc" className="block text-sm/6 font-semibold text-white">
                            Código
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="cvc"
                                    type="text"
                                    name="cvc"
                                    placeholder='Exemplo: 654'
                                    autoComplete="given-name"
                                    className="block w-[10rem] rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="cvc" className="block text-sm/6 font-semibold text-white">
                            Forma de pagamento
                            </label>
                            <div className="mt-2.5">
                                <Select>
                                    <SelectTrigger className="w-[10rem] border-zinc-600">
                                        <SelectValue placeholder="Action" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="credito" className='!hover:bg-gray-600'>Crédito</SelectItem>
                                            <SelectItem value="debito">Débito</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-wrap justify-end mt-10 ml-auto mr-auto w-[40rem]'>
                        <Button 
                            type="button"
                            className="w-[10rem] rounded cursor-pointer bg-zinc-700 hover:bg-zinc-800 px-4 py-2 text-base text-gray-200">
                            Enviar
                        </Button>
                    </div>
                </form>
            </>
            
        }

        
    </>
  )
}

export default MethodPayment