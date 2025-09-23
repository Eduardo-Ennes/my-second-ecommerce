import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

function ChangePhoto() {
    const [file, setFile] = useState<string>("")
    
    const handleAddFileOrUrlInListMaterials = (event: React.MouseEvent<HTMLButtonElement>, file: string) => {
        event.preventDefault()
        if(file){
            console.log('Arquivo enviado: ', file)
        }
        
        setFile("")
    }

  return (
    <>
        <main className="flex flex-col justify-center items-center gap-y-10">
            <div className="mt-10">
                <Avatar className="cursor-pointer w-35 h-35">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>

            <form action="#">
                <div className="flex w-full max-w-sm items-center gap-2 text-gray-200">
                    <Input 
                    type="file" 
                    placeholder="https://exemplo.com" 
                    onChange={(e) => setFile(e.target.value)}
                    required 
                    className="bg-gray-200 text-black"
                    />
                    <Button 
                    type="button" 
                    variant="outline" 
                    onClick={(e) => handleAddFileOrUrlInListMaterials(e, file)}
                    className="rounded cursor-pointer bg-zinc-700 hover:bg-zinc-800 hover:text-gray-200 px-4 py-2 text-base text-gray-200 border-none"
                    >
                        Enviar
                    </Button>
                </div>
            </form>
        </main>
    </>
  )
}

export default ChangePhoto