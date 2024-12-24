import React from 'react'
import './BlogHome.css'

const BlogHome = () => {
  return (
    <div className='blog-home'>

      <div className='blog-nav'>
        <div className="blog-home-logo">TDM</div>

        <div className="nav-menu">
          <input type="text" placeholder='Search here...' />
          <i class="bi bi-pencil-square"></i>
          <p className='write-text'>Write</p> 
          <i class="bi bi-person-circle"></i>
        </div>
      </div>

      <div className="blog-home-hero">
        <h1>Welcome to InsightSphere <br /> Your Gateway to Knowledge and Inspiration</h1>
        <p>
          Explore ideas, stories, and insights across technology, science, lifestyle, travel, and entertainment. 
          InsightSphere is your destination for engaging articles and inspiration. Dive in and stay curious!
        </p>
      </div>

      <div className="filter-section">
        <ul className='filter-list'>
          <li><i class="bi bi-plus"></i></li>
          <li>All</li>
          <li>Technology</li>
          <li>Sports</li>
          <li>Travel</li>
          <li><i class="bi bi-file-plus"></i></li>
        </ul>
      </div>

      <div className="home-blog-area">

        <div className="home-blog-box">
          
        </div>

      </div>

    </div>
  )
}

export default BlogHome
