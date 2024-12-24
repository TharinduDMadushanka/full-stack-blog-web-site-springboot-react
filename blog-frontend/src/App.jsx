import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage'
import UserRegister from './pages/User/UserRegister'
import UserLogin from './pages/User/UserLogin'
import Home from './pages/Home/Home'
import BlogHome from './pages/BlogHome/BlogHome'
import AddBlog from './pages/AddBlog/AddBlog';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/user-register' element={<UserRegister/>} />
          <Route path='/user-login' element={<UserLogin/>} />
          <Route path='/blog-home' element={<BlogHome/>} />
          <Route path='/add-blog' element={<AddBlog/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
