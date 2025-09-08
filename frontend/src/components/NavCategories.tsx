import { Link } from "react-router-dom";
import MenuBurguer from '../assets/menu-burger.png'
import '../css/navCategories.css'

function NavCategories() {
  return (
    <>
        <nav className="bg-[oklch(14.5%_0_0)] flex flex-wrap p-2 items-center gap-[1rem] text-white">
            <Link to='/' className="flex items-center gap-[0.25rem] border border-transparent px-2 py-1 hover:border-white hover:text-white transition-colors duration-300">
                <img src={MenuBurguer} alt="Icone para buscar todos os cursos" /> 
                <p>Todos</p>
            </Link>
            <Link to='/categoria' className="border border-transparent px-[0.50rem] py-1 hover:border-white hover:text-white transition-colors duration-300">JavaScript</Link>
            <Link to='/categoria' className="border border-transparent px-[0.50rem] py-1 hover:border-white hover:text-white transition-colors duration-300">Python</Link>
            <Link to='/categoria' className="border border-transparent px-[0.50rem] py-1 hover:border-white hover:text-white transition-colors duration-300">Php</Link>
            <Link to='/categoria' className="border border-transparent px-[0.50rem] py-1 hover:border-white hover:text-white transition-colors duration-300">Machine Learning</Link>
            <Link to='/categoria' className="border border-transparent px-[0.50rem] py-1 hover:border-white hover:text-white transition-colors duration-300">Kali Linux</Link>
            <Link to='/categoria' className="border border-transparent px-[0.50rem] py-1 hover:border-white hover:text-white transition-colors duration-300">Sql</Link>
            <Link to='/categoria' className="border border-transparent px-[0.50rem] py-1 hover:border-white hover:text-white transition-colors duration-300">MySql</Link>
            <Link to='/categoria' className="border border-transparent px-[0.50rem] py-1 hover:border-white hover:text-white transition-colors duration-300">Docker</Link>
            <Link to='/categoria' className="border border-transparent px-[0.50rem] py-1 hover:border-white hover:text-white transition-colors duration-300">Terraform</Link>
            <Link to='/categoria' className="border border-transparent px-[0.50rem] py-1 hover:border-white hover:text-white transition-colors duration-300">Aws Cloud</Link>
        </nav>
    </>
  )
}

export default NavCategories