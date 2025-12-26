import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGoogleLogin = () => {
    // Google OAuth integration
    setMessage('Google Sign-In will be available soon!');
    // In production, implement: window.location.href = 'http://localhost:5000/auth/google';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setMessage('Please fill in all fields');
      return;
    }

    try {
      setMessage('Logging in...');
      // Here you would call your backend API
      // const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      
      // Simulate successful login
      setTimeout(() => {
        setMessage('Login successful!');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }, 1000);
    } catch (error) {
      setMessage('Invalid email or password');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-left-content">
          <h1>Discover, analyze, & track</h1>
          <h2>Influencers for your campaigns</h2>
          <p>Influencer.in empowers brands to expand their influencer marketing efforts and boost sales through Influencers. Discover influencers, manage campaigns, and track results.</p>
          
          <div className="influencer-collage">
            <img src="https://i.ibb.co/WBXZc5y/influencer-collage.png" alt="Influencers" className="collage-image" />
          </div>

          <p className="trusted-text">Trusted by 200+ Leading brands and they love us!</p>
          
          <div className="brand-logos">
            <span>SAMSUNG</span>
            <span>Samsonite</span>
            <span>GO COLORS!</span>
            <span>BATTLEGROUNDS</span>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form-container">
          <div className="logo-header">
            <div className="logo-icon">IN</div>
            <span>INFLUENCER</span>
          </div>

          <h2 className="form-title">Hi, Welcome Back</h2>
          <p className="form-subtitle">Enter your credentials to continue</p>

          {message && (
            <div className={`message ${message.includes('successful') ? 'success' : message.includes('Logging') ? 'info' : 'error'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Work Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="forgot-password">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            <button type="submit" className="submit-button">
              Sign In
            </button>

            <div className="divider">
              <span>Or</span>
            </div>

            <button type="button" className="google-button" onClick={handleGoogleLogin}>
              <span className="google-icon">G</span>
              Sign-in with Google
            </button>

            <div className="signup-link">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
