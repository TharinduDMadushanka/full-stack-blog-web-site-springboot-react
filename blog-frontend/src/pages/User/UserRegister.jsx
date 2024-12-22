import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {

    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    email: '',
    phone: '',
  });

  // Update the form data dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/v1/user/save-user', formData);

      console.log('User saved successfully:', response.data);
      alert('User registered successfully!');

      setFormData({
        userName: '',
        password: '',
        email: '',
        phone: '',
      });

      navigate('/user-login');

    } catch (error) {
      console.error('Error saving user:', error);
      alert('Error saving user');
    }
  };

  return (
    <div className="user-reg">
      {/* Form Section */}
      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
        <form className="mx-1 mx-md-4" onSubmit={saveUser}>
          {/* Name Input */}
          <div className="mb-4">
            <label className="form-label" htmlFor="userName">
              Your Name
            </label>
            <div className="d-flex flex-row align-items-center">
              <i className="fas fa-user fa-lg me-3 fa-fw"></i>
              <input
                type="text"
                id="userName"
                name="userName"
                className="form-control"
                value={formData.userName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="form-label" htmlFor="email">
              Your Email
            </label>
            <div className="d-flex flex-row align-items-center">
              <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
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
              <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
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

          {/* Mobile Number Input */}
          <div className="mb-4">
            <label className="form-label" htmlFor="phone">
              Mobile Number
            </label>
            <div className="d-flex flex-row align-items-center">
              <i className="fas fa-phone fa-lg me-3 fa-fw"></i>
              <input
                type="text"
                id="phone"
                name="phone"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="form-check d-flex justify-content-center mb-5">
            <input
              className="form-check-input me-2"
              type="checkbox"
              value=""
              id="terms"
              required
            />
            <label className="form-check-label" htmlFor="terms">
              I agree to all statements in <a href="#!">Terms of service</a>
            </label>
          </div>

            <div className="nav-log">
                <p>Already have an account? <a href="" onClick={()=>{navigate('/user-login')}} >Sing In</a> </p>
            </div>

          {/* Submit Button */}
          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
            <button type="submit" className="btn btn-primary btn-lg">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;
