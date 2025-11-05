import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ArrowRight from '../../../../assets/arrow-small-right.png'
import Cross from '../../../../assets/cross.png'
import { useState } from "react"
import { Link } from "react-router-dom"

function FileLeassons() {
    const [files, setFiles] = useState<Array<{id: number, file: string}>>([
        {id: 1, file: 'teste.png'},
        {id: 2, file: 'teste.mais.ainda'}
    ])

  return (
    <div className="pl-6 mb-20 mt-10">
        {/* <h2 className="text-gray-200 mt-5 text-2xl font-bold"></h2> */}

        <form action="#">
            <Label htmlFor="position" className="text-base">Anexe arquivos</Label>
            <div className="flex flex-warp gap-x-10 mt-2">
                <Input 
                name="file"
                type="file" 
                placeholder="https://exemplo.com" 
                required 
                className="w-[25rem] bg-gray-200 text-black cursor-pointer"
                />

                <button
                type="button"
                className="w-[8rem] rounded cursor-pointer bg-fuchsia-900 hover:bg-fuchsia-950 text-base text-gray-200"
                >
                    Enviar
                </button>
            </div>
        </form>

        <ul className='p-[1rem] flex flex-col gap-y-3'>
            {files.length > 0 && 
                <li className='flex flex-wrap items-center gap-3'>
                    <img src={ArrowRight} alt="" />
                    <a href="#" className='text-base text-blue-600 hover:underline transition-[2s]'>Arquivo.pdf</a>
                    <Link to="#" className="p-1 hover:bg-red-300 transintion-[1s] rounded">
                        <img src={Cross} alt="" />
                    </Link>
                </li>
            }
        </ul>
    </div>
  )
}

export default FileLeassons