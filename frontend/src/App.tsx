import Home from './pages/Home'
import LoginUser from './pages/LoginUser'
import './App.css'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login/user/' element={<LoginUser />}/>
      </Routes>
    </>
  )
}

export default App
