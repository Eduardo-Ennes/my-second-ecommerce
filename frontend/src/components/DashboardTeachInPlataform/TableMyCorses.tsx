import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from '@headlessui/react'
import iconEdit from '../../assets/edit.png'
import UpdateCorse from "./TableMyCorse/UpdateCorse"
import UpdateTags from './TableMyCorse/UpdateTags'
import EditionLeassons from './TableMyCorse/EditionLeassons'
import ApiCouser from '../../api/course/ApiCouser'

function TableMyCorses() {
    const navigate = useNavigate()
    // const reloadSearchUserCourses = () => {
    //     searchUserCourses()
    // }

    const [editionCorse, setEditionCorse] = useState<false | true>(false)
    const [id, setId] = useState<number| null>(null)
    const [userCourses, setUserCourses] = useState<Array<{
        id: number;
        name: string;
        status: boolean;
        price: string;
        price_promotion: string;
        promotion: boolean;
        sold: number;
        create_at: string;
        update_at: string;
    }>>([])

    // Busca todos os cursos do usuário para exibir na tabela 
    const searchUserCourses = useCallback(async () => {
        const response = await ApiCouser.searchAllUserCourses()
        if(!response.status){
            if(response.code === 401){
                window.alert('Usuário não atenticado. Faça login.')
                navigate('/login')
                return;
            }

            window.alert(response.error)
            navigate('/dashboard')
            return;
        }

        setUserCourses(response.data)
    }, [navigate])

    useEffect(() => {
        searchUserCourses()
    }, [searchUserCourses])

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
                {userCourses.map(course => (
                    <TableRow key={course.id} className="hover:bg-zinc-800">
                        <TableCell className="p-2">
                            <p className="max-w-[25rem] truncate" title="Nome do curso inteiro aqui">
                                {course.name}
                            </p>
                        </TableCell>
                        <TableCell>
                            {course.status ? (
                                <Badge variant="destructive" className="bg-green-700 p-2 w-[4rem]">Active</Badge>
                            ):(
                                <Badge variant="destructive" className="p-2 cursor-pointer w-[4rem]">Inative</Badge>
                            )}
                        </TableCell>
                        <TableCell className="p-2">{course.price}</TableCell>
                        <TableCell className="p-2 text-center">{course.price_promotion}</TableCell>
                        <TableCell className="p-2">
                            {course.promotion ? 
                                <Badge variant="destructive" className="bg-green-700 p-2">Yes</Badge>
                            :
                                <Badge variant="destructive" className="p-2">No</Badge>
                            }
                        </TableCell>
                        <TableCell className="p-2">{course.sold}</TableCell>
                        <TableCell className="p-2">
                           {new Date(course.create_at).toLocaleDateString("pt-BR", { timeZone: "UTC" })} 
                        </TableCell>
                        <TableCell className="p-2">
                            {new Date(course.update_at).toLocaleDateString("pt-BR", { timeZone: "UTC" })}
                        </TableCell>
                        
                        <TableCell className="p-2">
                            <Button 
                                type="button" 
                                onClick={() => {
                                    setId(course.id)
                                    setEditionCorse(true)
                                }}>
                                <img src={iconEdit} alt="Icone de edição" className="cursor-pointer"/>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>

        {editionCorse && <UpdateCorse id={id} /> }
        {editionCorse && <UpdateTags id={id} /> }
        {editionCorse && <EditionLeassons id={id}/> }
    </>
  )
}

export default TableMyCorses