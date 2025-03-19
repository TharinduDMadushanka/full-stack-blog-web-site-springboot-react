import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserProfile.css"; // Custom CSS

const UserProfile = () => {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    phone: "",
    location: "USA",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/user/get-user-by-id/1"); // Replace '1' with actual user ID
        setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Save updated user details
  const handleSave = async () => {
    try {
      await axios.put("http://localhost:8080/api/v1/user/update-user", user);
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="user-profile-container container-fluid">
      <div className="profile-header">
        <img
          src="https://via.placeholder.com/80"
          alt="User Avatar"
          className="profile-avatar"
        />
        <div>
          <h2>{user.userName || "Your Name"}</h2>
          <p>{user.email || "yourname@gmail.com"}</p>
        </div>
      </div>

      <div className="profile-menu">
        <button onClick={() => setIsEditing(false)}>My Profile</button>
        <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        <button>Settings</button>
        <button>Log Out</button>
      </div>

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
          <p>Name: {user.userName}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Location: {user.location}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
