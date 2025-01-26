import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage'
import UserRegister from './pages/UserRegister/UserRegister'
import UserLogin from './pages/UserLogin/UserLogin'
import Home from './pages/Home/Home'
import BlogHome from './pages/BlogHome/BlogHome'
import AddBlog from './pages/AddBlog/AddBlog';
import BlogSpace from './pages/BlogSpace/BlogSpace';
import UserProfile from './pages/UserProfile/UserProfile';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<LandingPage/>} /> */}
          <Route path='/' element={<Home/>} />
          {/* <Route path='/home' element={<Home/>} /> */}
          <Route path='/user-register' element={<UserRegister/>} />
          <Route path='/user-login' element={<UserLogin/>} />
          <Route path='/blog-home' element={<BlogHome/>} />
          <Route path='/add-blog' element={<AddBlog/>} />
          <Route path='/read-blog/:postId' element={<BlogSpace />} />
          <Route path='/user-profile' element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
