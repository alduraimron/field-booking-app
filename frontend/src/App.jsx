import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import ListGor from './pages/ListGor'
import Profile from './pages/Profile'

function App() {
  return (
    <div>
      <Routes>
        <Route path = '/' element = {<ListGor/>}/>
        <Route path = '/gor/:id' element = {<Home/>}/>
        <Route path = '/login' element = {<Login/>}/>
        <Route path = '/register' element = {<Register/>}/>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App;
