import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage'
import UserRegister from './pages/User/UserRegister'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/user-register' element={<UserRegister/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
