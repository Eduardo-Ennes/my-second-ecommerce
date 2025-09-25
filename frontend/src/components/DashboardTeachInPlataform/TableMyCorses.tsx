import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Button } from '@headlessui/react'
import iconEdit from '../../assets/edit.png'
import EditCorse from "./TableMyCorse/EditCorse"

function TableMyCorses() {
    const [status, setStatus] = useState("active")
    const [isPromotion, setIsPromotion] = useState(false)
    const [editionCorse,setEditionCorse] = useState<false | true>(false)

  return (
    <>
        <h2 className="text-gray-200 text-2xl font-bold mt-5 ml-auto mr-auto mb-5 text-center border-b border-zinc-700 w-[90%]">My Corses</h2>
        <Table className="w-[90%] ml-auto mr-auto mt-10">
            <TableHeader>
                <TableRow className="hover:bg-zinc-800">
                    <TableHead className="text-gray-200">Name</TableHead>
                    <TableHead className="text-gray-200">Status</TableHead>
                    <TableHead className="text-gray-200">Price</TableHead>
                    <TableHead className="text-gray-200">price promotion</TableHead>
                    <TableHead className="text-gray-200">Is Promotion?</TableHead>
                    <TableHead className="text-gray-200">Sold</TableHead>
                    <TableHead className="text-gray-200">Date Create</TableHead>
                    <TableHead className="text-gray-200">Date Updated</TableHead>
                    <TableHead className="text-gray-200">Edit</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow className="hover:bg-zinc-800 ">
                    <TableCell className="p-2">
                        <p className="max-w-[25rem] truncate" title="Nome do curso inteiro aqui">
                            Formação na linguagem de programação python
                        </p>
                    </TableCell>
                    <TableCell>
                        {status === "inactive" &&
                            <Badge variant="destructive" className="p-2 cursor-pointer w-[4rem]">Inative</Badge>
                        }

                        {status === "active" && 
                            <Badge variant="destructive" className="bg-green-700 p-2 w-[4rem]">Active</Badge>
                        }
                    </TableCell>
                    <TableCell className="p-2">R$75,90</TableCell>
                    <TableCell className="p-2 text-center">R$29,90</TableCell>
                    <TableCell className="p-2">
                        {isPromotion ? 
                            <Badge variant="destructive" className="bg-green-700 p-2">Yes</Badge>
                        :
                            <Badge variant="destructive" className="p-2">No</Badge>
                        }
                    </TableCell>
                    <TableCell className="p-2">10.553</TableCell>
                    <TableCell className="p-2">11/05/2025</TableCell>
                    <TableCell className="p-2">11/11/2025</TableCell>
                    
                    <TableCell className="p-2">
                        <Button 
                            type="button" 
                            onClick={() => setEditionCorse(true)}>
                            <img src={iconEdit} alt="Icone de edição" className="cursor-pointer"/>
                        </Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>

        {editionCorse && <EditCorse /> }
    </>
  )
}

export default TableMyCorses