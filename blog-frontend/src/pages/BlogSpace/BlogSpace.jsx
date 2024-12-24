import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BlogSpace.css';
import axios from 'axios';

const BlogSpace = () => {
  const { postId } = useParams(); // Extract postId from URL
  const [post, setPost] = useState(null); // State to store post data

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
    <div className="blog-space">
      <h1 className="blog-space-title">{post.title}</h1>
      <img
        src={`http://localhost:8080/api/v1/post/${post.image}`}
        alt={post.title}
        className="blog-space-image"
      />
      <div className="blog-space-content">
        <p>{post.content}</p>
        <div className="blog-space-details">
          <span className="blog-space-category">Category: {post.category}</span>
          <span className="blog-space-date">Added on: {formatDate(post.date)}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogSpace;
