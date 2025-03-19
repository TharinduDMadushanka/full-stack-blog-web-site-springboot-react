import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BlogSpace.css';
import axios from 'axios';
import DOMPurify from 'dompurify'; // Ensure you sanitize the HTML for security

const BlogSpace = () => {
  const { postId } = useParams(); // Extract postId from URL
  const [post, setPost] = useState(null); // State to store post data
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/post/get-post/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId]);

  // Function to format the date to YYYY-MM-DD
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Extract only the date part
  };

  if (!post) {
    return <p>Loading...</p>; // Show a loading state while fetching data
  }

  return (
    <div className="blog-space container-fluid">
      <a href="" className='back-to-home' onClick={() => {navigate('/blog-home')}}>Bach To Home</a>
      <h1 className="blog-space-title">{post.title}</h1>
      <img
        src={`http://localhost:8080/api/v1/post/${post.image}`}
        alt={post.title}
        className="blog-space-image"
      />
      <div className="blog-space-content">
        {/* Render HTML safely */}
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.content), // Sanitize the HTML for security
          }}
        ></div>
        <div className="blog-space-details">
          <span className="blog-space-category">Category: {post.category}</span>
          <span className="blog-space-date">Added on: {formatDate(post.date)}</span>
          <button
            className="edit-button"
            onClick={() => navigate('/add-blog', { state: { post } })} // Navigate with post data
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogSpace;
