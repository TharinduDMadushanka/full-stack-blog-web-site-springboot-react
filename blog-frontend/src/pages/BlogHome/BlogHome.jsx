import React, { useEffect, useState } from 'react';
import './BlogHome.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import blog_home_bg from '../../assets/blog-home/blog-home-bg.jpg';

const BlogHome = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Handle parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch posts from backend API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/post/get-all-posts');
        console.log(response.data);
        setPosts(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="blog-home">
      <div 
        className="blog-home-bg"
        style={{ 
          transform: `translateY(${scrollPosition * 0.5}px)`,
        }}
      >
        <div className="animated-gradient"></div>
        <img src={blog_home_bg} alt="" />
      </div>

      <div className="blog-nav">
        <div className="blog-home-logo">TDM</div>
        <div className="nav-menu">
          <input type="text" placeholder="Search here..." />
          <i className="bi bi-pencil-square" onClick={() => navigate('/add-blog')}></i>
          <i className="bi bi-person-circle" onClick={() => navigate('/user-profile')}></i>
        </div>
      </div>

      <div className="blog-home-hero">
        <h1>
          Welcome to InsightSphere <br /> Your Gateway to Knowledge and Inspiration
        </h1>
        <p>
          Explore ideas, stories, and insights across technology, science, lifestyle, travel, and entertainment.
          InsightSphere is your destination for engaging articles and inspiration. Dive in and stay curious!
        </p>
      </div>

      <div className="subscribe-box">
        <input type="text" placeholder="Connect with Us" />
        <button>Send</button>
      </div>

      <div className="filter-section">
        <ul className="filter-list">
          <li>
            <i className="bi bi-plus"></i>
          </li>
          <li>All</li>
          <li>Technology</li>
          <li>Sports</li>
          <li>Travel</li>
          <li>
            <i className="bi bi-file-plus"></i>
          </li>
        </ul>
      </div>

      <div className="home-blog-area">
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <div
              className="home-blog-box"
              key={post.postId}
              onClick={() => navigate(`/read-blog/${post.postId}`)}
            >
              <img
                src={`http://localhost:8080/api/v1/post/${post.image}`}
                alt={post.title}
                className="blog-image"
              />
              <h6>{post.title}</h6>
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
};

export default BlogHome;