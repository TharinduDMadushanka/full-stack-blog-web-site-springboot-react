import React, { useState } from 'react';
import axios from 'axios';
import './AddBlog.css';

const AddBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    image: null,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const userId = 1; // Replace with dynamic user ID retrieval logic

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content || !formData.category || !formData.image) {
      setError('Please fill in all fields and upload an image.');
      return;
    }

    setError('');
    setSuccess('');

    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    data.append('category', formData.category);
    data.append('image', formData.image);
    data.append('userId', userId);

    try {
      const response = await axios.post('http://localhost:8080/api/v1/post/create-post', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('Blog post created successfully!');
      setFormData({
        title: '',
        content: '',
        category: '',
        image: null,
      });
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Error creating blog post. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <div className="add-blog">
      <h1>Add New Blog Post</h1>
      <form className="add-blog-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter blog title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Enter blog content"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" name="category" value={formData.category} onChange={handleChange}>
            <option value="">Select a category</option>
            <option value="SPORTS">SPORTS</option>
            <option value="TRAVELLING">TRAVELLING</option>
            <option value="EDUCATION">EDUCATION</option>
            <option value="TECHNOLOGY">TECHNOLOGY</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <input type="file" id="image" name="image" onChange={handleFileChange} />
        </div>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <button type="submit" className="submit-button">
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
