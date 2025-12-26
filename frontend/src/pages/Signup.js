import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: basic info, 2: verified, can enter password
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    website: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleVerifyEmail = async () => {
    if (!formData.name || !formData.phone || !formData.email) {
      setMessage('Please fill in Name, Phone, and Email first');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage('Please enter a valid email address');
      return;
    }

    setIsVerifying(true);
    setMessage('');

    // Simulate email verification (replace with actual API call)
    setTimeout(() => {
      setIsVerifying(false);
      setVerificationSent(true);
      setMessage('Verification email sent! Check your inbox and verify.');
      
      // Simulate email verified after 2 seconds (in real app, user clicks link in email)
      setTimeout(() => {
        setIsEmailVerified(true);
        setStep(2);
        setMessage('Email verified successfully! You can now complete your signup.');
      }, 2000);
    }, 1000);
  };

  const handleGoogleSignup = () => {
    // Google OAuth integration
    setMessage('Google Sign-Up will be available soon!');
    // In production, implement: window.location.href = 'http://localhost:5000/auth/google';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isEmailVerified) {
      setMessage('Please verify your email first');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setMessage('Password must be at least 6 characters');
      return;
    }

    try {
      setMessage('Creating your account...');
      // Here you would call your backend API
      // const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
      
      // Simulate successful signup
      setTimeout(() => {
        setMessage('Account created successfully!');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      }, 1000);
    } catch (error) {
      setMessage('Signup failed. Please try again.');
      console.error('Signup error:', error);
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

          <h2 className="form-title">Sign Up as a Business</h2>

          {message && (
            <div className={`message ${isEmailVerified ? 'success' : verificationSent ? 'info' : 'error'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isEmailVerified}
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
                disabled={isEmailVerified}
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Work Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isEmailVerified}
              />
            </div>

            {!isEmailVerified && (
              <button 
                type="button" 
                className="verify-button"
                onClick={handleVerifyEmail}
                disabled={isVerifying}
              >
                {isVerifying ? 'Sending...' : verificationSent ? 'Verifying...' : 'Verify Email First'}
              </button>
            )}

            {isEmailVerified && (
              <>
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

                <div className="form-group">
                  <input
                    type="url"
                    name="website"
                    placeholder="Website Url (Optional)"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="submit-button">
                  Complete Signup
                </button>
              </>
            )}

            <div className="divider">
              <span>Or</span>
            </div>

            <button type="button" className="google-button" onClick={handleGoogleSignup}>
              <span className="google-icon">G</span>
              Signup with Google
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
