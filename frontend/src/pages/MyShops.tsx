import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react"
import Header from '../components/Header'
import iconAngleUp from '../assets/angle-small-up.png'
import iconAngleDown from '../assets/angle-small-down.png'


function MyShops() {
    const [cursos] = useState<{
    corses: string[];
    data: string;
    price: number;
    method: string;
    }[]>([
    {corses: ['python', 'javascript', 'docker', 'react'], data: "10/12/2029", price: 29.99, method: "Crédito"},
    {corses: ['Redes'], data: "11/05/2026", price: 15.99, method: "Pix"},
    ]);

    const [showMore, setShowMore] = useState(false)
  return (
    <>
        <Header args={"No"}/>

        <h2 className="w-[30rem] text-gray-200 mt-5 text-4xl font-bold pl-[3rem] mb-1 ">Histórico de compras</h2>

        <main>
            <Table className="w-[90%] ml-auto mr-auto mt-10 text-gray-200">
                <TableHeader>
                    <TableRow className="hover:bg-zinc-800">
                        <TableHead className="text-gray-200">Name</TableHead>
                        <TableHead className="text-gray-200">Data</TableHead>
                        <TableHead className="text-gray-200">Preço total</TableHead>
                        <TableHead className="text-gray-200">Forma de pagamento</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {cursos.map((element) => (
                        element.corses.length > 1 ?
                            <>
                                <TableRow className="hover:bg-zinc-800 border-b border-gray-500">
                                    <TableCell>
                                        <p className="max-w-[25rem] truncate" title="Nome do curso inteiro aqui">
                                            {element.corses.length} cursos comprados
                                        </p>

                                        {!showMore ?
                                            <div 
                                            onClick={() => setShowMore(true)}
                                            className="mt-1 flex flex-wrap items-center gap-x-5 font-bold text-fuchsia-900 cursor-pointer">
                                                <p>Ver cursos</p>
                                                <img src={iconAngleDown} alt="Seta de indicação para baixo" />
                                            </div>
                                        :
                                            <div 
                                            onClick={() => setShowMore(false)}
                                            className="mt-1 flex flex-wrap items-center gap-x-5 font-bold text-fuchsia-900 cursor-pointer">
                                                <p>Ver menos</p>
                                                <img src={iconAngleUp} alt="Seta de indicação para baixo" />
                                            </div>
                                        }
                                    </TableCell>

                                    <TableCell className="p-2">
                                    <p className="max-w-[25rem] truncate" title="Nome do curso inteiro aqui">
                                        10/12/2029
                                    </p>
                                    </TableCell>

                                    <TableCell className="p-2">
                                        <p className="max-w-[25rem] truncate" title="Nome do curso inteiro aqui">
                                            R$24,99
                                        </p>
                                    </TableCell>

                                    <TableCell className="p-2">
                                        <p className="max-w-[25rem] truncate" title="Nome do curso inteiro aqui">
                                            Cartão de crédito
                                        </p>
                                    </TableCell>
                                </TableRow>

                                {showMore && 
                                    element.corses.map((element) => (
                                        <TableRow className="hover:bg-transparent border-b border-gray-500">
                                            <TableCell>
                                                <p key={element} className="max-w-[25rem] truncate pl-5 pt-1 pb-1" title="Nome do curso inteiro aqui">
                                                    {element}
                                                </p>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </>
                            
                        :
                            <TableRow className="hover:bg-zinc-800 border-b border-gray-500">
                                <TableCell>
                                    {element.corses.map((element) => (
                                        <p key={element} className="max-w-[25rem] truncate p-1" title="Nome do curso inteiro aqui">
                                            {element}
                                        </p>
                                    ))}
                                </TableCell>

                                <TableCell className="p-2">
                                    <p className="max-w-[25rem] truncate" title="Nome do curso inteiro aqui">
                                        10/12/2029
                                    </p>
                                </TableCell>

                                <TableCell className="p-2">
                                    <p className="max-w-[25rem] truncate" title="Nome do curso inteiro aqui">
                                        R$24,99
                                    </p>
                                </TableCell>

                                <TableCell className="p-2">
                                    <p className="max-w-[25rem] truncate" title="Nome do curso inteiro aqui">
                                        Cartão de crédito
                                    </p>
                                </TableCell>
                            </TableRow>
                    ))}
                </TableBody>
            </Table>
        </main>
    </>
  )
}

export default MyShops