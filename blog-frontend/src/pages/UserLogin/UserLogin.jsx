import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserLogin.css';
import login_bg from '../../assets/login/login-bg2.jpg';

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  // Update form data dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    try {
      const response = await axios.get(`http://localhost:8080/api/v1/user/user-login/${email}/${password}`);
      console.log('Full API response:', response); // Log the entire response

      const userData = response.data.data; // Adjust to the correct path

      // Log the user data to check its structure
      console.log('User data:', userData);

      if (userData && userData.userId && userData.userName) {
        // Store user details in local storage
        localStorage.setItem('userId', userData.userId);
        localStorage.setItem('username', userData.userName);

        alert('Login Successful');

        // Navigate to the desired page (e.g., dashboard) on successful login
        navigate('/blog-home');
      } else {
        alert('Login failed: Invalid response structure');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed: Invalid email or password');
    }
  };

  return (
    <div className="user-login">
      <div className="login-bg-img">
        <img src={login_bg} alt="" />
      </div>

      {/* Form Section */}
      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1 login-form">
        <p>Welcome Back!</p>
        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">LOGIN</p>
        <form className="mx-1 mx-md-4" onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="form-label" htmlFor="email">
              Your Email
            </label>
            <div className="d-flex flex-row align-items-center">
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <div className="d-flex flex-row align-items-center">
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Sign Up Navigation */}
          <div className="nav-sign">
            <p>
              Don't have an account?{' '}
              <a href="#!" onClick={() => navigate('/user-register')}>
                Sign Up
              </a>
            </p>
          </div>

          {/* Submit Button */}
          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
            <button type="submit" className="btn login-btn">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
