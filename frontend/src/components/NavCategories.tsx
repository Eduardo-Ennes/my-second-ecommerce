import '../css/navCategories.css'
import IconApps from '../assets/apps.png'
import ApiSearchCoursesAndTechnologies from '../api/course/ApiSearchCourses'
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";


interface Tag {
  id: number;
  tech: string;
}

function NavCategories({ id_tag }: { id_tag: (id: number | null) => void }) {
  const navigate = useNavigate();
  const [tags, setTags] = useState<Tag[]>([]);
  const scrollContainer = useRef<HTMLDivElement | null>(null);

  const handleId_tag = (id: number | null) => {
    id_tag(id)
  }

  useEffect(() => {
    const searchAllTagsTechnologies = async () => {
        const response = await ApiSearchCoursesAndTechnologies.searchAllTagsTechnologies()
        if(!response.status){
          if(response.code === 401){
            window.alert(response.error)
            navigate('/login')
            return;
          }

          window.alert(response.error)
          return;
        }

        setTags(response.data)
    }

    searchAllTagsTechnologies()
  }, [navigate])


  const scroll = (direction: "left" | "right") => {
    if (!scrollContainer.current) return;
    const { scrollLeft, clientWidth } = scrollContainer.current;
    const scrollAmount = clientWidth * 0.7; // rola 70% do container
    scrollContainer.current.scrollTo({
      left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <>
      <nav className="bg-[oklch(14.5%_0_0)] flex flex-wrap p-2 items-center gap-[1rem] text-white overflow-x-auto no-scrollbar">
        {/* Botão esquerdo */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 z-10 cursor-pointer bg-zinc-700 hover:bg-zinc-600 p-2 ml-2 rounded-full"
        >
          ⟨
        </button>

        {/* Container com rolagem horizontal */}
        <div ref={scrollContainer} className="flex gap-3 overflow-x-auto scroll-smooth no-scrollbar px-8">
          <button
            onClick={() => handleId_tag(0)}
            className="flex items-center justify-center gap-1 mr-2 border border-transparent px-5 py-1 cursor-pointer hover:border-gray-600 hover:text-white transition-colors duration-300 whitespace-nowrap">
            <img src={IconApps} alt="Icone para buscar todos os cursos" className="w-4 h-4" />
            <p>Todos</p>
          </button>

          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => handleId_tag(tag.id)}
              title={tag.tech}
              className="border border-transparent px-3 py-1 cursor-pointer hover:border-gray-600 hover:text-white transition-colors duration-300 whitespace-nowrap">
              {tag.tech}
            </button>
          ))}
        </div>

        {/* Botão direito */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 cursor-pointer z-10 bg-zinc-700 hover:bg-zinc-600 p-2 mr-2 rounded-full"
        >
          ⟩
        </button>
      </nav>
    </>
  )
}

export default NavCategories