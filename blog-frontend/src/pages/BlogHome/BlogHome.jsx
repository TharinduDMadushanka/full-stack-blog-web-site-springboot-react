import React, { useEffect, useState } from 'react';
import './BlogHome.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import blog_home_bg from '../../assets/blog-home/blog-home-bg.jpg';

const BlogHome = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/post/get-all-posts');
        setPosts(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
      }
    };

    fetchPosts();
  }, []);

  const handleFilterClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredPosts = selectedCategory === 'All'
    ? posts
    : posts.filter(post => post.category === selectedCategory);

  const userName = localStorage.getItem('username');

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
          <h6>
            <span className="wavy-hand" role="img" aria-label="Waving hand">🤚</span>
            <span className="username">{userName}</span>
          </h6>
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
          <li
            className={selectedCategory === 'All' ? 'active-filter' : ''}
            onClick={() => handleFilterClick('All')}
          >
            All
          </li>
          <li
            className={selectedCategory === 'TECHNOLOGY' ? 'active-filter' : ''}
            onClick={() => handleFilterClick('TECHNOLOGY')}
          >
            Technology
          </li>
          <li
            className={selectedCategory === 'SPORTS' ? 'active-filter' : ''}
            onClick={() => handleFilterClick('SPORTS')}
          >
            Sports
          </li>
          <li
            className={selectedCategory === 'TRAVELLING' ? 'active-filter' : ''}
            onClick={() => handleFilterClick('TRAVELLING')}
          >
            Travel
          </li>
          <li
            className={selectedCategory === 'EDUCATION' ? 'active-filter' : ''}
            onClick={() => handleFilterClick('EDUCATION')}
          >
            Education
          </li>
        </ul>
      </div>

      <div className="home-blog-area">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
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
