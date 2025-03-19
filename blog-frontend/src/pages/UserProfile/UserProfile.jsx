import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserProfile.css"; // Custom CSS
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    phone: "",
    location: "USA",
    profileImage: localStorage.getItem('profileImage') || "https://via.placeholder.com/80",
  });
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(
          `http://localhost:8080/api/v1/user/get-user-by-id/${userId}`
        );
        setUser((prevUser) => ({ ...prevUser, ...userResponse.data.data }));

        const postsResponse = await axios.get(
          `http://localhost:8080/api/v1/post/get-posts-by-user/${userId}`
        );
        setPosts(postsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put("http://localhost:8080/api/v1/user/update-user", user);
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/post/delete-post/${postId}`
      );
      setPosts(posts.filter((post) => post.postId !== postId));
      alert("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleReadPost = (postId) => {
    navigate(`/read-blog/${postId}`);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        setUser((prevUser) => ({ ...prevUser, profileImage: imageUrl }));
        localStorage.setItem('profileImage', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="user-profile-container container-fluid">
      <div className="profile-header">
        <img
          src={user.profileImage}
          alt="User Avatar"
          className="profile-avatar"
          onClick={() => document.getElementById('profileImageUpload').click()}
        />
        <input
          id="profileImageUpload"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />
        <div>
          <h2>{user.userName || "Your Name"}</h2>
          <p>{user.email || "yourname@gmail.com"}</p>
          <a href="" className="back-to-home" onClick={() => {navigate('/blog-home')}}>Back To Home</a>
        </div>
      </div>

      <div className="profile-menu">
        <button onClick={() => setIsEditing(false)}>My Profile</button>
        <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        <button onClick={() => {navigate('/user-login')}}>Log Out</button>
      </div>

      <div className="profile-content">
        <div className="profile-details-section">
          {isEditing ? (
            <div className="profile-edit">
              <label>
                Name:
                <input
                  type="text"
                  name="userName"
                  value={user.userName}
                  onChange={handleChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </label>
              <label>
                Phone:
                <input
                  type="text"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                />
              </label>
              <label>
                Location:
                <input
                  type="text"
                  name="location"
                  value={user.location}
                  onChange={handleChange}
                />
              </label>
              <button className="save-button" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          ) : (
            <div className="profile-details">
              <p><strong>Name:</strong> {user.userName}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Location:</strong> {user.location}</p>
            </div>
          )}
        </div>

        <div className="profile-posts-section">
          <h3>My Blog Posts</h3>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.postId} className="profile-post" onClick={() => handleReadPost(post.postId)} style={{ cursor: 'pointer' }}>
                <h4>
                  {post.title}
                </h4>
                <p>{new Date(post.date).toLocaleDateString()}</p>
                <button onClick={(e) => { e.stopPropagation(); handleDeletePost(post.postId); }}>Delete</button>
              </div>
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
