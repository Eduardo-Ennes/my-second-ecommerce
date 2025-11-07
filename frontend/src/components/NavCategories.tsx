import { Link } from "react-router-dom";
import IconApps from '../assets/apps.png'
import '../css/navCategories.css'


function NavCategories({ id_tag }: { id_tag: (id: number) => void }) {

  const handleId_tag = (id: number) => {
    id_tag(id)
  }

  return (
    <>
        <nav className="bg-[oklch(14.5%_0_0)] flex flex-wrap p-2 items-center gap-[1rem] text-white">
            <Link to='/' className="flex items-center gap-[0.30rem] border border-transparent px-2 py-1 hover:border-gray-600 hover:text-white transition-colors duration-300 ml-2">
                <img src={IconApps} alt="Icone para buscar todos os cursos" /> 
                <p>Todos</p>
            </Link>
            <Link 
            to='#' 
            onClick={() => handleId_tag(10)}
            className="border border-transparent px-[0.50rem] py-1 hover:border-gray-600 hover:text-white transition-colors duration-300">JavaScript</Link>
        </nav>
    </>
  )
}

export default NavCategories