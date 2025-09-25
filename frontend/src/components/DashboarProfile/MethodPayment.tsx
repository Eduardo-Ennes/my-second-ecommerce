import { useState } from 'react'
import iconAddBlack from '../../assets/add-black.png'
import iconArrowLeft from '../../assets/arrow-small-left.png'
import iconInfo from '../../assets/info.png'
import { Button } from "@/components/ui/button"
import {
  Alert,
  AlertTitle,
} from "@/components/ui/alert"

import FieldsFormCard from './FieldsFormCard'

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

                <h2 className="text-gray-200 text-2xl p-[1rem] font-bold text-center">Adicionar cartão de pagamento</h2>

                {error.length > 0 && 
                    <div className="w-[50%] ml-auto mr-auto mt-5 mb-5">
                        <Alert variant="destructive" className="bg-red-600 text-gray-200 flex flex-wrap gap-x-3 items-center border-none">
                            <img src={iconInfo} alt="Icone de informação" />
                            <AlertTitle>{error}</AlertTitle>
                        </Alert>
                    </div>
                }  

                <FieldsFormCard />   

                           
            </>
            
        }

        
    </>
  )
}

export default MethodPayment