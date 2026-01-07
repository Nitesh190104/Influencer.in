import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('brand'); // 'brand' or 'influencer'
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success', 'error', 'info'

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setMessage(''); // Clear message on input change
  };

  const handleUserTypeToggle = (type) => {
    setUserType(type);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    // Validation
    if (!formData.name || !formData.phone || !formData.email || !formData.password || !formData.confirmPassword) {
      setMessage('Please fill in all fields');
      setMessageType('error');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      setMessageType('error');
      return;
    }

    if (formData.password.length < 6) {
      setMessage('Password must be at least 6 characters');
      setMessageType('error');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage('Please enter a valid email address');
      setMessageType('error');
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post('/api/auth/signup', {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        userType: userType
      });

      if (response.data.success) {
        setMessage('Account created successfully!');
        setMessageType('success');

        // Store token and user data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Redirect to appropriate dashboard based on user type
        setTimeout(() => {
          if (userType === 'brand') {
            navigate('/brand-dashboard');
          } else {
            navigate('/influencer-dashboard');
          }
        }, 1500);
      }
    } catch (error) {
      console.error('Signup error:', error);
      const errorMessage = error.response?.data?.message || 'Signup failed. Please try again.';
      setMessage(errorMessage);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const response = await axios.get(`/api/auth/google/url?userType=${userType}`);

      if (response.data.success && response.data.authUrl) {
        // Redirect to Google OAuth
        window.location.href = response.data.authUrl;
      } else {
        setMessage('Google Sign-Up is not available at this time');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Google signup error:', error);
      setMessage('Failed to initiate Google Sign-Up');
      setMessageType('error');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left auth-left-bg-mode">
        <img
          src="https://influencer-media.s3.ap-south-1.amazonaws.com/signup_web_new_1.jpeg"
          alt="Influencer Platform"
          className="auth-left-image"
        />
      </div>

      <div className="auth-right">
        <div className="auth-form-container">
          <button
            className="back-to-home-btn"
            onClick={() => navigate('/')}
            title="Back to Home"
          >
            <span className="back-arrow">←</span>
            <span>Back to Home</span>
          </button>

          <div className="logo-header">
            <img src="https://www.influencer.in/wp-content/themes/influencer-2022/images/logo.png" alt="Influencer" className="logo-image-auth" />
          </div>

          <h2 className="form-title">Create Your Account</h2>

          {/* User Type Toggle */}
          <div className="user-type-toggle">
            <button
              type="button"
              className={`toggle-btn ${userType === 'brand' ? 'active' : ''}`}
              onClick={() => handleUserTypeToggle('brand')}
            >
              Brand
            </button>
            <button
              type="button"
              className={`toggle-btn ${userType === 'influencer' ? 'active' : ''}`}
              onClick={() => handleUserTypeToggle('influencer')}
            >
              Influencer
            </button>
          </div>

          <p className="user-type-description">
            {userType === 'brand'
              ? 'Sign up as a brand to collaborate with influencers'
              : 'Sign up as an influencer to work with top brands'}
          </p>

          {message && (
            <div className={`message ${messageType}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder={userType === 'brand' ? 'Work Email Address' : 'Email Address'}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password (min 6 characters)"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>

            <div className="login-link">
              Already have an account? <Link to="/login">Log In</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
