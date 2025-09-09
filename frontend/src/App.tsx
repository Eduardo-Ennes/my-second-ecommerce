import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import LoginUser from './pages/LoginUser'
import FormUser from './pages/FormUser'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login/user/' element={<LoginUser />}/>
        <Route path='/user/new/' element={<FormUser />}/>
      </Routes>
    </>
  )
}

export default App
