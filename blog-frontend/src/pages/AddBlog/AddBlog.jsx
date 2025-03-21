import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import { useNavigate, useLocation } from "react-router-dom";
import "./AddBlog.css";

const AddBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    image: null,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const userId = localStorage.getItem('userId'); // Retrieve userId from local storage

  useEffect(() => {
    if (location.state && location.state.post) {
      const { post } = location.state;
      setFormData({
        title: post.title,
        content: post.content,
        category: post.category,
        image: null, // Keep image as null to allow updating
      });
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleContentChange = (value) => {
    setFormData({
      ...formData,
      content: value, // Set the rich text content
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

    if (!formData.title || !formData.content || !formData.category) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true); // Show loading spinner

    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    data.append("category", formData.category);
    if (formData.image) {
      data.append("image", formData.image);
    }
    data.append("userId", userId);

    try {
      let response;
      if (location.state && location.state.post) {
        // Update existing post
        const postId = location.state.post.postId;
        response = await axios.put(`http://localhost:8080/api/v1/post/update-post/${postId}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        // Create new post
        response = await axios.post("http://localhost:8080/api/v1/post/create-post", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      setSuccess("Blog post saved successfully!");
      setFormData({
        title: "",
        content: "",
        category: "",
        image: null,
      });

      // Wait for 3 seconds before navigating
      setTimeout(() => {
        navigate(`/read-blog/${response.data.postId}`);
      }, 3000);
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Error saving blog post. Please try again.";
      setError(errorMessage);
      setLoading(false); // Hide loading spinner on error
    }
  };

  return (
    <div className="add-blog container-fluid pt-5">
      <h1>{location.state && location.state.post ? "Edit Blog Post" : "Add New Blog Post"}</h1>
      <div className="add-blog-area">
        <form className="add-blog-form" onSubmit={handleSubmit}>
          <div className="row">
            <div className="add-blog-left-col col-4">
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
            </div>
            <div className="add-blog-right-col col-8">
              <div className="form-group">
                <label htmlFor="content">Content</label>
                <ReactQuill
                  value={formData.content}
                  onChange={handleContentChange}
                  placeholder="Write your blog content here..."
                />
              </div>
            </div>
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <button type="submit" className="submit-button" disabled={loading}>
            {location.state && location.state.post ? "Update Blog" : "Add Blog"}
          </button>
        </form>
      </div>
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default AddBlog;
