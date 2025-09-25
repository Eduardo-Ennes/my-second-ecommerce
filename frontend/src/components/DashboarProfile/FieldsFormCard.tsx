import { Button } from "@/components/ui/button"

function FieldsFormCard() {
  return (
    <>
        <form action="#" className="w-[60%] m-auto border-1 border-gray-700 p-4 rounded-md mt-5">

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

            <div className='flex flex-wrap justify-center gap-x-5 mt-5'>
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

            <div className='flex flex-wrap justify-end mt-10 ml-auto mr-auto w-[40rem]'>
                <Button 
                    type="button"
                    className="w-[10rem] rounded cursor-pointer bg-zinc-700 hover:bg-zinc-800 px-4 py-2 text-base text-gray-200">
                    Enviar
                </Button>
            </div>
        </form>
    </>
  )
}

export default FieldsFormCard