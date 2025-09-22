import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import LoginUser from './pages/LoginUser'
import FormUser from './pages/FormUser'
import DetailProduct from './pages/DetailProduct'
import Card from './pages/Card'
import Favorites from './pages/Favorites'
import MyCorses from './pages/MyCorses'
import VideoCorses from './pages/VideoCorses'
import DashboardTeachInPlatarform from './pages/DashboardTeachInPlatarform.tsx'
import DashboardProfile from './pages/DashboardProfile.tsx'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<LoginUser />}/>
        <Route path='/card' element={<Card />}/>
        <Route path='/favorites' element={<Favorites />}/>
        <Route path='/my/corses' element={<MyCorses />}/>
        <Route path='/user/new' element={<FormUser />}/>
        <Route path='/dashboard' element={<DashboardTeachInPlatarform />}/>
        <Route path='/profile' element={<DashboardProfile />}/>
        <Route path='/leassons/:id' element={<VideoCorses />}/>
        <Route path='/detail/product/:id' element={<DetailProduct />}/>
      </Routes>
    </>
  )
}

export default App
