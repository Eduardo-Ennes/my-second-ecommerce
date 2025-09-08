import Header from '../components/Header'
import NavCategories from '@/components/NavCategories'
import ListProducts from '@/components/ListProducts'
import Footer from '@/components/Footer'

function Home() {
  return (
    <>
        <Header />
        <NavCategories />
        <ListProducts />
        <Footer />
    </>
  )
}

export default Home