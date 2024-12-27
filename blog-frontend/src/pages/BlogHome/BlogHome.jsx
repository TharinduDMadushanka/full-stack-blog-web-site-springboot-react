import React, { useEffect, useState } from 'react';
import './BlogHome.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import blog_home_bg from '../../assets/blog-home/blog-home-bg.jpg';

const BlogHome = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]); // State to store fetched posts

  // Fetch posts from backend API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/post/get-all-posts');
        console.log(response.data); // Debugging: log the API response
        setPosts(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]); // Reset to an empty array on error
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="blog-home">
      <div className="blog-home-bg">
        <img src={blog_home_bg} alt="" />
      </div>

      <div className="blog-nav">
        <div className="blog-home-logo">TDM</div>
        <div className="nav-menu">
          <input type="text" placeholder="Search here..." />
          <i className="bi bi-pencil-square" onClick={() => navigate('/add-blog')}></i>
          <p className="write-text" onClick={() => navigate('/add-blog')}>
            Write
          </p>
          <i className="bi bi-person-circle"></i>
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
            <div className="home-blog-box" key={post.postId}>
              <img
                src={`http://localhost:8080/api/v1/post/${post.image}`}
                alt={post.title}
                className="blog-image"
              />
              <h3>{post.title}</h3>
              <p>{post.content.substring(0, 100)}...</p>
              <button onClick={() => navigate(`/read-blog/${post.postId}`)}>Read More</button>
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
