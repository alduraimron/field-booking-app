import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>
        <Route path = '/' element = {<Home/>}/>
        <Route path = 'login' element = {<Login/>}/>
        <Route path = 'register' element = {<Register/>}/>
      </Routes>
    </div>
  )
}

export default App;
