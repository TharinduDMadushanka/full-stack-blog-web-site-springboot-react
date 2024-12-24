import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserRegister.css';

// import register_bg from '../../assets/register/register-bg.jpg'; 
import register_bg from '../../assets/register/register-bg-2.jpg'; 

const UserRegister = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userName: '',
        password: '',
        email: '',
        phone: '',
    });

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
            <div className="user-reg-bg-img">
                <img src={register_bg} alt="Background" />
            </div>

            <div className="user-reg-form">
                <p>Create Account</p>
                <form onSubmit={saveUser}>
                    <div>
                        <label htmlFor="userName">Your Name</label>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email">Your Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="phone">Mobile Number</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* <div className="form-check">
                        <input
                            type="checkbox"
                            id="terms"
                            required
                        />
                        <label htmlFor="terms">
                            I agree to all statements in <a href="#!">Terms of service</a>
                        </label>
                    </div> */}

                    <div className="nav-sign">
                      <p>
                        Already have an account?{' '}
                        <a href="#!" onClick={() => navigate('/user-login')}>
                          Login
                        </a>
                      </p>
                    </div>

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

export default UserRegister;
