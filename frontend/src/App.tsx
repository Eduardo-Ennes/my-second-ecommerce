import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import LoginUser from './pages/LoginUser'
import FormUser from './pages/FormUser'
import DataProduct from './pages/DetailProduct'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<LoginUser />}/>
        <Route path='/user/new' element={<FormUser />}/>
        <Route path='/data/product/:id' element={<DataProduct />}/>
      </Routes>
    </>
  )
}

export default App
