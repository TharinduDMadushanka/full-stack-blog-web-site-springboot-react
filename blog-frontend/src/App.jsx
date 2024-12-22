import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage'
import UserRegister from './pages/User/UserRegister'
import UserLogin from './pages/User/UserLogin'
import Home from './pages/Home/Home'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/user-register' element={<UserRegister/>} />
          <Route path='/user-login' element={<UserLogin/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App