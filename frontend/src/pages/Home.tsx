import Header from '../components/Header'
import NavCategories from '@/components/NavCategories'
import ListProducts from '@/components/ListProducts'
import Footer from '@/components/Footer'
import { useState } from 'react'

function Home() {
  const [idTag, setIdTag] = useState<number | null>(null)

  const handleIdTag = (id: number) => {
    setIdTag(id)
  }

  return (
    <>
      <Header args={"Yes"}/>
      <NavCategories id_tag={handleIdTag}/>
      <ListProducts id={idTag}/>
      <Footer />
    </>
  )
}

export default Home