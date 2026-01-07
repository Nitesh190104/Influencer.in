import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './OTPVerification.css';

const OTPVerification = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const inputRefs = useRef([]);

    const email = location.state?.email;
    const userType = location.state?.userType;

    useEffect(() => {
        if (!email) {
            navigate('/signup');
        }
    }, [email, navigate]);

    const handleChange = (index, value) => {
        // Only allow numbers
        if (value && !/^\d$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setMessage('');
        setShowErrorPopup(false);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // Handle backspace
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);

        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = pastedData.split('');
        while (newOtp.length < 6) newOtp.push('');

        setOtp(newOtp);
        inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const otpString = otp.join('');

        if (otpString.length !== 6) {
            setMessage('Please enter all 6 digits');
            setMessageType('error');
            return;
        }

        try {
            setLoading(true);
            setMessage('');

            const response = await axios.post('/api/auth/verify-otp', {
                email,
                otp: otpString
            });

            if (response.data.success) {
                // Store token and user info
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));

                setMessage('Email verified successfully!');
                setMessageType('success');

                // Redirect to appropriate dashboard
                setTimeout(() => {
                    if (response.data.user.userType === 'brand') {
                        navigate('/brand-dashboard');
                    } else {
                        navigate('/influencer-dashboard');
                    }
                }, 1500);
            }
        } catch (error) {
            console.error('OTP verification error:', error);
            const errorMessage = error.response?.data?.message || 'Invalid or expired OTP';

            setMessage(errorMessage);
            setMessageType('error');
            setShowErrorPopup(true);

            // Clear OTP inputs
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        try {
            setLoading(true);
            setMessage('');

            const response = await axios.post('/api/auth/resend-otp', {
                email
            });

            if (response.data.success) {
                setMessage('New OTP sent to your email!');
                setMessageType('success');
                setOtp(['', '', '', '', '', '']);
                inputRefs.current[0]?.focus();
            }
        } catch (error) {
            console.error('Resend OTP error:', error);
            setMessage(error.response?.data?.message || 'Failed to resend OTP');
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    const closeErrorPopup = () => {
        setShowErrorPopup(false);
        setMessage('');
    };

    return (
        <div className="otp-container">
            <div className="otp-card">
                <div className="logo-header">
                    <img src="https://www.influencer.in/wp-content/themes/influencer-2022/images/logo.png" alt="Influencer" className="logo-image-auth" />
                </div>

                <h2 className="otp-title">Verify Your Email</h2>
                <p className="otp-description">
                    We've sent a 6-digit code to<br />
                    <strong>{email}</strong>
                </p>

                {message && !showErrorPopup && (
                    <div className={`message ${messageType}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="otp-form">
                    <div className="otp-inputs" onPaste={handlePaste}>
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="otp-input"
                                disabled={loading}
                                autoFocus={index === 0}
                            />
                        ))}
                    </div>

                    <button type="submit" className="verify-button" disabled={loading}>
                        {loading ? 'Verifying...' : 'Verify Email'}
                    </button>
                </form>

                <div className="resend-section">
                    <p>Didn't receive the code?</p>
                    <button
                        type="button"
                        className="resend-button"
                        onClick={handleResendOTP}
                        disabled={loading}
                    >
                        Resend OTP
                    </button>
                </div>

                <button
                    type="button"
                    className="back-button"
                    onClick={() => navigate('/signup')}
                >
                    ← Back to Signup
                </button>
            </div>

            {/* Error Popup */}
            {showErrorPopup && (
                <div className="popup-overlay" onClick={closeErrorPopup}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        <div className="popup-icon error-icon">✕</div>
                        <h3>Verification Failed</h3>
                        <p>{message}</p>
                        <button className="popup-button" onClick={closeErrorPopup}>
                            Try Again
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OTPVerification;
