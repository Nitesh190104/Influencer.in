import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardGate.css';

const DashboardGate = () => {
    const navigate = useNavigate();

    return (
        <div className="dashboard-gate-page">
            <div className="container">
                <div className="gate-content">
                    <h1 className="gate-title">Access Your Influencer Dashboard</h1>
                    <p className="gate-subtitle">
                        Manage your campaigns, track your earnings, and connect with top brands—all in one place.
                    </p>

                    <div className="options-container">
                        <div className="option-card login-card" onClick={() => navigate('/login')}>
                            <div className="card-icon">🔑</div>
                            <h2>Sign In</h2>
                            <p>Already have a creator account? Log in to your dashboard here.</p>
                            <button className="gate-btn login-btn">Log In</button>
                        </div>

                        <div className="option-card signup-card" onClick={() => navigate('/signup')}>
                            <div className="card-icon">🚀</div>
                            <h2>Create Account</h2>
                            <p>New to our platform? Join 100,000+ creators and start your journey.</p>
                            <button className="gate-btn signup-btn">Sign Up Now</button>
                        </div>
                    </div>

                    <div className="gate-footer">
                        <p>Need help? <a href="/contact">Contact Support</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardGate;
