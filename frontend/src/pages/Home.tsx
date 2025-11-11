import Header from '../components/Header'
import NavCategories from '@/components/NavCategories'
import ListProducts from '@/components/ListProducts'
import Footer from '@/components/Footer'
import { useState } from 'react'

function Home() {
  const [idTag, setIdTag] = useState<number | null>(null)
  const [nameSearch, setNameSearch] = useState('')

  const handleIdTag = (id: number | null) => {
    setIdTag(id)
  }

  const setSearchName = (name: string) => {
    setNameSearch(name)
  }

  return (
    <>
      <Header args={"Yes"} nameSearchCourses={setSearchName}/>
      <NavCategories id_tag={handleIdTag}/>
      <ListProducts id={idTag} nameSearchCourses={nameSearch}/>
      <Footer />
    </>
  )
}

export default Home