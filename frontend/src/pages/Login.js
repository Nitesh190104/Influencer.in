import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../config/api';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setMessage('Please fill in all fields');
      setMessageType('error');
      return;
    }

    try {
      setLoading(true);
      setMessage('');

      const response = await api.post('/api/auth/login', formData);

      if (response.data.success) {
        // Store token and user info
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        setMessage('Login successful!');
        setMessageType('success');

        // Redirect based on user type
        setTimeout(() => {
          if (response.data.user.userType === 'brand') {
            navigate('/brand-dashboard');
          } else {
            navigate('/influencer-dashboard');
          }
        }, 1000);
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || 'Invalid email or password';
      setMessage(errorMessage);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left auth-left-bg-mode">
        <img
          src="/auth-image.png"
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

          <h2 className="form-title">Hi, Welcome Back</h2>
          <p className="form-subtitle">Enter your credentials to continue</p>

          {message && (
            <div className={`message ${messageType}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
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

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
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
