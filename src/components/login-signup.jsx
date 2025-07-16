import './auth.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import axios from 'axios'; 

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const toggleForm = () => {
    setFormData({ name: '', email: '', password: '' }); // Reset fields on toggle
    setIsLogin(!isLogin);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Removed localStorage logic and replaced it with API call
      const response = await axios.post('https://apply-smart.onrender.com/api/users/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      alert('Signup successful! Please login.'); // Notify user of success
      navigate('/applyform');
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Signup failed. Please try again.');
    }
    
    
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Removed localStorage logic and replaced it with API call
      const response = await axios.post('https://apply-smart.onrender.com/api/users/login', {
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem('token', response.data.token);
      const userData = response.data;
      alert(`Welcome back, ${userData.name}!`); // Welcome user after successful login
      navigate('/home'); // Navigate to home page
    } catch (error) {
      console.error('Error during login:', error);
      alert('Invalid email or password!');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="animated-border">
          <div className="form-container">
            {isLogin ? (
              <form id="loginForm" className="auth-form" onSubmit={handleLogin}>
                <div className="form-header">
                  <h2>Welcome Back</h2>
                  <p>Sign in to your account</p>
                </div>
                <div className="form-group">
                  <label htmlFor="loginEmail">Email</label>
                  <input
                    type="email"
                    id="loginEmail"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="loginPassword">Password</label>
                  <input
                    type="password"
                    id="loginPassword"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn primary-btn">
                  <span>Login</span>
                  <div className="btn-glow"></div>
                </button>
                <p className="account">
                  Don't have an account?
                  <button type="button" className="toggle-link" onClick={toggleForm}>
                    Sign Up
                  </button>
                </p>
              </form>
            ) : (
              <form id="signupForm" className="auth-form" onSubmit={handleSignup}>
                <div className="form-header">
                  <h2>Create Account</h2>
                  <p>Join us today</p>
                </div>
                <div className="form-group">
                  <label htmlFor="signupName">Name</label>
                  <input
                    type="text"
                    id="signupName"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="signupEmail">Email</label>
                  <input
                    type="email"
                    id="signupEmail"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="signupPassword">Password</label>
                  <input
                    type="password"
                    id="signupPassword"
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn primary-btn">
                  <span>Sign Up</span>
                  <div className="btn-glow"></div>
                </button>
                <p className="account">
                  Already have an account?
                  <button type="button" className="toggle-link" onClick={toggleForm}>
                    Login
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
