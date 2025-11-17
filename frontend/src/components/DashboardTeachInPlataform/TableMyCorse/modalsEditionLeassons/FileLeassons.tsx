import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import ArrowRight from '../../../../assets/arrow-small-right.png'
import Cross from '../../../../assets/cross.png'
import ApiCourseFile from '../../../../api/editionCourse/ApiCourseFiles'


function FileLeassons({id}: {id: number | null}) {
    const navigate = useNavigate()
    // O id passado se refere a identificação de uma aula 

    const [files, setFiles] = useState<Array<{id: number, file: string, url: string}>>([])
    const [infoFile, setInfoFile] = useState<string | File>('')

    const handleSearch = useCallback(async () => {
        if(!id) return;
    
        const response = await ApiCourseFile.searchFiles(id)
        if(!response.status){
            if(response.code === 401){
                window.alert('Usuario não autenticado. Faça login novamente.')
                navigate('/login')
                return;
            }

            window.alert(response.error)
            return;
        }

        setFiles(response.data)
      }, [id, navigate])

      useEffect(() => {
        handleSearch()
      }, [handleSearch])

    const handleCreate = async () => {
        if(!infoFile) return;
        const response = await ApiCourseFile.createFile(id, infoFile)
        if(!response.status){
            if(response.code === 401){
                window.alert('Usuario não autenticado. Faça login novamente.')
                navigate('/login')
                return;
            }

            window.alert(response.error)
            setInfoFile('')
            return;
        }

        handleSearch()
    }


    const handleDelete = async (IdFile: number) => {
        const response = await ApiCourseFile.deleteFile(IdFile)
        if(!response.status){
            if(response.code === 401){
                window.alert('Usuario não autenticado. Faça login novamente.')
                navigate('/login')
                return;
            }

            window.alert(response.error)
            setInfoFile('')
            return;
        }

        handleSearch()
    }

  return (
    <div className="pl-6 mb-20 mt-10">
        {/* <h2 className="text-gray-200 mt-5 text-2xl font-bold"></h2> */}

        <form action="#">
            <Label htmlFor="position" className="text-base">Anexe arquivos</Label>
            <div className="flex flex-warp gap-x-10 mt-2">
                <Input 
                name="file"
                type="file" 
                onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                        setInfoFile(e.target.files[0]);
                    }
                }}
                placeholder="https://exemplo.com" 
                required 
                className="w-[25rem] bg-gray-200 text-black cursor-pointer"
                />

                <button
                type="button"
                onClick={() => handleCreate()}
                className="w-[8rem] rounded cursor-pointer bg-fuchsia-900 hover:bg-fuchsia-950 text-base text-gray-200"
                >
                    Enviar
                </button>
            </div>
        </form>

        <ul className='p-[1rem] flex flex-col gap-y-3'>
            {files.length > 0 && 
                <>
                    {files.map(element => (
                        <li key={element.id} className='flex flex-wrap items-center gap-3'>
                            <img src={ArrowRight} alt="" />
                            <a href={`http://localhost:3000/upload/file/${element.file}`} download className='text-base cursor-pointer text-blue-600 hover:underline transition-[2s]'>{element.file}</a>
                            <Link
                            onClick={() => handleDelete(element.id)}
                             to="#" className="p-1 hover:bg-red-300 transintion-[1s] rounded">
                                <img src={Cross} alt="Emoji que serve como botão para deletar um arquivo de uma determinada aula." />
                            </Link>
                        </li>
                    ))}
                </>
            }
        </ul>
    </div>
  )
}

export default FileLeassons