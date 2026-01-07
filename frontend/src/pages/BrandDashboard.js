import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NotificationBell from '../components/NotificationBell';
import FollowersModal from '../components/FollowersModal';
import './BrandDashboard.css';

const BrandDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [unreadCount, setUnreadCount] = useState(0);
    const [stats, setStats] = useState({
        activeCampaigns: 0,
        influencersCount: 0,
        totalReach: 0,
        budgetSpent: 0
    });
    const [showFollowersModal, setShowFollowersModal] = useState(false);
    const [modalInitialTab, setModalInitialTab] = useState('followers');

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (!token || !storedUser) {
            navigate('/login');
            return;
        }

        const userData = JSON.parse(storedUser);

        // Check if user is a brand
        if (userData.userType !== 'brand') {
            navigate('/influencer-dashboard');
            return;
        }

        setUser(userData);
        fetchUnreadCount();
        fetchStats();
        setLoading(false);

        // Poll for unread messages every 10 seconds
        const interval = setInterval(() => {
            fetchUnreadCount();
            fetchStats();
        }, 10000);
        return () => clearInterval(interval);
    }, [navigate]);

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log('Fetching brand stats...');
            const response = await axios.get('/api/stats/brand', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            console.log('Stats response:', response.data);

            if (response.data.success) {
                console.log('Setting stats:', response.data.data);
                setStats(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch stats:', error);
            console.error('Error response:', error.response?.data);
        }
    };

    const fetchUnreadCount = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/chat/unread-count', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.data.success) {
                setUnreadCount(response.data.data.unreadCount);
            }
        } catch (error) {
            console.error('Failed to fetch unread count:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="loading-spinner"></div>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <div className="dashboard-sidebar">
                <div className="sidebar-header">
                    <a href="/" style={{ display: 'block' }}>
                        <img src="https://www.influencer.in/wp-content/themes/influencer-2022/images/logo.png" alt="Influencer" className="logo-image" />
                    </a>
                </div>

                <nav className="sidebar-nav">
                    <a href="/brand-dashboard" className="nav-item active">
                        <span className="nav-icon">📊</span>
                        Dashboard
                    </a>
                    <a href="/brand/campaigns" className="nav-item">
                        <span className="nav-icon">🎯</span>
                        Campaigns
                    </a>
                    <a href="/discover-users" className="nav-item">
                        <span className="nav-icon">🔍</span>
                        Discover
                    </a>
                    <a href="/messages" className="nav-item">
                        <span className="nav-icon">💬</span>
                        Messages
                        {unreadCount > 0 && <span className="unread-badge">{unreadCount}</span>}
                    </a>
                    <a href="/brand/settings" className="nav-item">
                        <span className="nav-icon">⚙️</span>
                        Settings
                    </a>
                </nav>

                <button className="logout-btn" onClick={handleLogout}>
                    <span className="nav-icon">🚪</span>
                    Logout
                </button>
            </div>

            {/* Main Content */}
            <div className="dashboard-main">
                {/* Header */}
                <div className="dashboard-header">
                    <div>
                        <h1>Welcome back, {user?.name}!</h1>
                        <p>Manage your influencer marketing campaigns</p>
                    </div>
                    <div className="user-profile">
                        <NotificationBell />
                        <div
                            className="user-avatar"
                            style={{ backgroundColor: user?.avatarColor || '#667eea' }}
                        >
                            {user?.avatarIcon || user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="user-info">
                            <div className="user-name">{user?.name}</div>
                            <div className="user-type">Brand Account</div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="dashboard-content">
                    {/* Stats Cards */}
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon">🎯</div>
                            <div className="stat-info">
                                <div className="stat-value">{stats.activeCampaigns}</div>
                                <div className="stat-label">Active Campaigns</div>
                            </div>
                        </div>

                        <div className="stat-card" onClick={() => {
                            setModalInitialTab('following');
                            setShowFollowersModal(true);
                        }} style={{ cursor: 'pointer' }}>
                            <div className="stat-icon">👥</div>
                            <div className="stat-info">
                                <div className="stat-value">{stats.influencersCount}</div>
                                <div className="stat-label">Influencers</div>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon">📊</div>
                            <div className="stat-info">
                                <div className="stat-value">{stats.totalReach >= 1000 ? `${(stats.totalReach / 1000).toFixed(1)}K` : stats.totalReach}</div>
                                <div className="stat-label">Total Reach</div>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon">💰</div>
                            <div className="stat-info">
                                <div className="stat-value">${stats.budgetSpent}</div>
                                <div className="stat-label">Budget Spent</div>
                            </div>
                        </div>
                    </div>

                    {/* Welcome Section */}
                    <div className="welcome-section">
                        <h2>🎉 Welcome to Your Brand Dashboard!</h2>
                        <p>Your account has been successfully created. Here's what you can do:</p>

                        <div className="features-grid">
                            <div className="feature-card">
                                <div className="feature-icon">🎯</div>
                                <h3>Create Campaigns</h3>
                                <p>Launch influencer marketing campaigns tailored to your brand goals</p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon">🔍</div>
                                <h3>Find Influencers</h3>
                                <p>Discover and connect with influencers that match your brand</p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon">📈</div>
                                <h3>Track Performance</h3>
                                <p>Monitor campaign metrics and ROI in real-time</p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon">💬</div>
                                <h3>Collaborate</h3>
                                <p>Communicate directly with influencers and manage partnerships</p>
                            </div>
                        </div>

                        <button className="cta-button">
                            Create Your First Campaign
                        </button>
                    </div>
                </div>
            </div>

            <FollowersModal
                isOpen={showFollowersModal}
                onClose={() => setShowFollowersModal(false)}
                initialTab={modalInitialTab}
            />
        </div>
    );
};

export default BrandDashboard;
