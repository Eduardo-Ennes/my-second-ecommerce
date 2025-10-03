import Header from "@/components/Header"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from '@headlessui/react'
import { useState } from "react"

function FinishBuy() {
  const [state, setState] = useState("")
  const [cpfOrCnpj, setCpfOrCnpj] = useState("")

  const handleFinishBuy = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    console.log(state)
  } 

  return (
    <>
        <Header args={"No"}/>

        <main className="grid grid-cols-5 p-[1rem] h-[22rem]">
            <div className="col-span-4 flex flex-col gap-y-5 w-[80%] ml-auto mr-auto mb-20">
                <h2 className="text-gray-200  text-2xl p-[1rem] font-bold">Finalizar compra</h2>

                
                <Accordion type="single" collapsible className="rounded w-full bg-zinc-900 border-1 border-zinc-500">
                    <AccordionItem value="item-1" className="border-b-zinc-500">
                        <AccordionTrigger 
                        onClick={() => setState("Pix")}
                        className="text-lg cursor-pointer text-gray-200 pl-3">Pix</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance text-white p-5">
                            <div className="ml-auto mr-auto">
                                <input
                                id="cpfOrCnpj"
                                type="text"
                                name="cpfOrCnpj"
                                placeholder='CPF / CNPJ'
                                value={cpfOrCnpj}
                                onChange={(e) => setCpfOrCnpj(e.target.value)}
                                autoComplete="given-name"
                                className="block w-[35rem] rounded-md bg-gray-200 px-3.5 py-2 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-zinc-950focus:outline-2 focus:-outline-offset-2 focus:outline-zinc-950"
                                />
                            </div>
                        </AccordionContent>
                    </AccordionItem>




                    {/* Cartão de crédito */}
                    <AccordionItem value="item-2" className="border-b-zinc-500">
                        <AccordionTrigger 
                        onClick={() => setState("Credito")}
                        className="text-lg cursor-pointer text-gray-200 pl-3">Cartão de crédito</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance text-white p-5">
                            <form action="#" className="flex flex-col gap-y-5">
                                {/* Div com os dois primeiros campos */}
                                <div className="flex flex-wrap gap-x-10 items-center justify-center">
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

                                {/* Div com os três últimos campos */}
                                <div className="flex flex-wrap gap-x-5 items-center justify-center">
                                    <div>
                                        <label htmlFor="cpfOrCnpj" className="block text-sm/6 font-semibold text-white">
                                        CPF / CNPJ
                                        </label>
                                        <div className="mt-2.5">
                                            <input
                                            id="cpfOrCnpj"
                                            type="text"
                                            name="cpfOrCnpj"
                                            placeholder='CPF / CNPJ'
                                            autoComplete="given-name"
                                            className="block w-[20rem] rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                                            />
                                        </div>
                                    </div>

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
                                </div>

                                <div className='flex flex-wrap justify-between items-center mt-10 ml-auto mr-auto w-[43rem]'>
                                    <div className="flex flex-wrap items-center gap-x-3">
                                        <Checkbox className="bg-white data-[state=checked]:bg-fuchsia-900 "/>
                                        <p className="text-base">Deseja salvar esta forma de pagamento para compras futuras?</p>
                                    </div>
                                    
                                    <Button 
                                        type="button"
                                        className="w-[10rem] rounded cursor-pointer bg-gray-300 hover:bg-gray-500 px-4 py-2 text-base text-black">
                                        Enviar
                                    </Button>
                                </div>
                            </form>
                        </AccordionContent>
                    </AccordionItem>




                    {/* Boleto bancário */}
                    <AccordionItem value="item-3" className="border-b-zinc-500">
                        <AccordionTrigger 
                        onClick={() => setState("Boleto")}
                        className="text-lg cursor-pointer text-gray-200 pl-3">Boleto bancário</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance text-white p-5">
                            <div className="ml-auto mr-auto">
                                <input
                                id="cpfOrCnpj"
                                type="text"
                                name="cpfOrCnpj"
                                placeholder='CPF / CNPJ'
                                value={cpfOrCnpj}
                                onChange={(e) => setCpfOrCnpj(e.target.value)}
                                autoComplete="given-name"
                                className="block w-[35rem] rounded-md bg-gray-200 px-3.5 py-2 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-zinc-950focus:outline-2 focus:-outline-offset-2 focus:outline-zinc-950"
                                />
                            </div>
                        </AccordionContent>
                    </AccordionItem>




                    <AccordionItem value="item-4" className="border-b-zinc-500">
                        <AccordionTrigger 
                        onClick={() => setState("MercadoPago")}
                        className="text-lg cursor-pointer text-gray-200 pl-3">Mercado pago</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance text-white p-5">
                            <div className="ml-auto mr-auto">
                                <input
                                id="cpfOrCnpj"
                                type="text"
                                name="cpfOrCnpj"
                                placeholder='CPF / CNPJ'
                                value={cpfOrCnpj}
                                onChange={(e) => setCpfOrCnpj(e.target.value)}
                                autoComplete="given-name"
                                className="block w-[35rem] rounded-md bg-gray-200 px-3.5 py-2 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-zinc-950focus:outline-2 focus:-outline-offset-2 focus:outline-zinc-950"
                                />
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            <div className="col-span-1 h-auto">
                <div className="flex flex-col gap-5 pt-[2rem]">
                    <div>
                        <p className="text-gray-200">Total:</p>
                        <p className="text-gray-200 mt-2 text-2xl font-bold">R$39,99</p>
                    </div>
                    <Button 
                    type="button"
                    onClick={(e) => handleFinishBuy(e)}
                    className="w-full rounded cursor-pointer bg-fuchsia-900 px-4 py-2 text-sm text-white data-hover:bg-fuchsia-950">
                        Prosseguir
                    </Button>
                </div>
            </div>
        </main>
    </>
  )
}

export default FinishBuy