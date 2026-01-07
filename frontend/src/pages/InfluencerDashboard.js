import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SocialConnect from '../components/SocialConnect';
import NotificationBell from '../components/NotificationBell';
import FollowersModal from '../components/FollowersModal';
import './InfluencerDashboard.css';

const InfluencerDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [socialAccounts, setSocialAccounts] = useState([]);
    const [syncing, setSyncing] = useState(false);
    const [totalFollowers, setTotalFollowers] = useState(0);
    const [unreadCount, setUnreadCount] = useState(0);
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

        // Check if user is an influencer
        if (userData.userType !== 'influencer') {
            navigate('/brand-dashboard');
            return;
        }

        setUser(userData);
        fetchSocialAccounts();
        fetchUnreadCount();
        setLoading(false);

        // Poll for unread messages every 10 seconds
        const interval = setInterval(fetchUnreadCount, 10000);
        return () => clearInterval(interval);
    }, [navigate]);

    const fetchSocialAccounts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/social-accounts', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.success) {
                const accounts = response.data.data;
                setSocialAccounts(accounts);

                // Calculate total followers
                const total = accounts.reduce((sum, account) => sum + (account.followers || 0), 0);
                setTotalFollowers(total);
            }
        } catch (error) {
            console.error('Failed to fetch social accounts:', error);
        }
    };

    const handleAccountConnected = (accountData) => {
        // Refresh the social accounts list
        fetchSocialAccounts();
    };

    const handleSyncAccounts = async () => {
        setSyncing(true);
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/social-accounts/sync', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Refresh the accounts after syncing
            await fetchSocialAccounts();
        } catch (error) {
            console.error('Failed to sync accounts:', error);
        } finally {
            setSyncing(false);
        }
    };

    const handleDisconnectAccount = async (platform) => {
        if (!window.confirm(`Are you sure you want to disconnect your ${platform} account?`)) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://localhost:5000/api/social-accounts/disconnect/${platform}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.success) {
                // Immediately remove the account from state
                setSocialAccounts(prevAccounts => 
                    prevAccounts.filter(account => account.platform !== platform)
                );
                
                // Recalculate total followers
                const updatedAccounts = socialAccounts.filter(account => account.platform !== platform);
                const total = updatedAccounts.reduce((sum, account) => sum + (account.followers || 0), 0);
                setTotalFollowers(total);
                
                alert(`${platform.charAt(0).toUpperCase() + platform.slice(1)} account disconnected successfully!`);
            }
        } catch (error) {
            console.error('Failed to disconnect account:', error);
            alert('Failed to disconnect account. Please try again.');
        }
    };

    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;

        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours}h ago`;

        const diffDays = Math.floor(diffHours / 24);
        if (diffDays < 7) return `${diffDays}d ago`;

        return date.toLocaleDateString();
    };

    const fetchUnreadCount = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/chat/unread-count', {
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
        <div className="dashboard-container influencer">
            {/* Sidebar */}
            <div className="dashboard-sidebar">
                <div className="sidebar-header">
                    <img src="https://www.influencer.in/wp-content/themes/influencer-2022/images/logo.png" alt="Influencer" className="logo-image" />
                </div>

                <nav className="sidebar-nav">
                    <a href="/influencer-dashboard" className="nav-item active">
                        <span className="nav-icon">📊</span>
                        Dashboard
                    </a>
                    <a href="/influencer/campaigns" className="nav-item">
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
                    <a href="/influencer/settings" className="nav-item">
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
                        <p>Grow your influence and collaborate with top brands</p>
                    </div>
                    <div className="user-profile">
                        <NotificationBell />
                        <div 
                            className="user-avatar influencer-avatar" 
                            style={{ backgroundColor: user?.avatarColor || '#667eea' }}
                        >
                            {user?.avatarIcon || user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="user-info">
                            <div className="user-name">{user?.name}</div>
                            <div className="user-type">Influencer Account</div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="dashboard-content">
                    {/* Stats Cards */}
                    <div className="stats-grid">
                        <div className="stat-card influencer-card">
                            <div className="stat-icon">🎯</div>
                            <div className="stat-info">
                                <div className="stat-value">0</div>
                                <div className="stat-label">Active Campaigns</div>
                            </div>
                        </div>

                        <div className="stat-card influencer-card">
                            <div className="stat-icon">💼</div>
                            <div className="stat-info">
                                <div className="stat-value">0</div>
                                <div className="stat-label">Collaborations</div>
                            </div>
                        </div>

                        <div className="stat-card influencer-card" onClick={() => {
                            setModalInitialTab('followers');
                            setShowFollowersModal(true);
                        }} style={{ cursor: 'pointer' }}>
                            <div className="stat-icon">👥</div>
                            <div className="stat-info">
                                <div className="stat-value">{formatNumber(totalFollowers)}</div>
                                <div className="stat-label">Total Followers</div>
                            </div>
                        </div>

                        <div className="stat-card influencer-card">
                            <div className="stat-icon">💰</div>
                            <div className="stat-info">
                                <div className="stat-value">$0</div>
                                <div className="stat-label">Earnings</div>
                            </div>
                        </div>
                    </div>

                    {/* Social Media Accounts Section */}
                    {socialAccounts.length > 0 && (
                        <div className="connected-accounts">
                            <h3>
                                Connected Social Accounts
                                <button
                                    className="sync-btn"
                                    onClick={handleSyncAccounts}
                                    disabled={syncing}
                                >
                                    {syncing ? (
                                        <>
                                            <span className="spinner"></span>
                                            Syncing...
                                        </>
                                    ) : (
                                        <>
                                            🔄 Sync Now
                                        </>
                                    )}
                                </button>
                            </h3>
                            <div className="accounts-grid">
                                {socialAccounts.map((account) => {
                                    const metadata = account.metadata || {};
                                    const recentPosts = metadata.recentPosts || [];

                                    // Calculate total likes and comments from recent posts
                                    const totalLikes = recentPosts.reduce((sum, post) => sum + (post.likes || 0), 0);
                                    const totalComments = recentPosts.reduce((sum, post) => sum + (post.comments || 0), 0);

                                    return (
                                        <div key={account._id} className={`account-card ${account.platform}`}>
                                            <div className="account-header">
                                                <div className="account-platform">
                                                    <span>
                                                        {account.platform === 'instagram' && '📷'}
                                                        {account.platform === 'facebook' && '👥'}
                                                        {account.platform === 'youtube' && '▶️'}
                                                    </span>
                                                    {account.platform.charAt(0).toUpperCase() + account.platform.slice(1)}
                                                    {metadata.isVerified && <span className="verified-badge">✓</span>}
                                                </div>
                                                <button
                                                    className="disconnect-btn"
                                                    onClick={() => handleDisconnectAccount(account.platform)}
                                                >
                                                    Disconnect
                                                </button>
                                            </div>

                                            <div className="account-username">@{account.username}</div>
                                            {metadata.fullName && (
                                                <div className="account-fullname">{metadata.fullName}</div>
                                            )}

                                            {/* Main Stats Grid */}
                                            <div className="account-stats-grid">
                                                <div className="stat-item">
                                                    <div className="stat-value">{formatNumber(account.followers)}</div>
                                                    <div className="stat-label">
                                                        {account.platform === 'youtube' ? 'Subscribers' : 'Followers'}
                                                    </div>
                                                </div>

                                                {metadata.following !== undefined && (
                                                    <div className="stat-item">
                                                        <div className="stat-value">{formatNumber(metadata.following)}</div>
                                                        <div className="stat-label">Following</div>
                                                    </div>
                                                )}

                                                {metadata.posts !== undefined && (
                                                    <div className="stat-item">
                                                        <div className="stat-value">{formatNumber(metadata.posts)}</div>
                                                        <div className="stat-label">
                                                            {account.platform === 'youtube' ? 'Videos' : 'Posts'}
                                                        </div>
                                                    </div>
                                                )}

                                                {metadata.engagement_rate !== undefined && (
                                                    <div className="stat-item">
                                                        <div className="stat-value">{(metadata.engagement_rate * 100).toFixed(1)}%</div>
                                                        <div className="stat-label">Engagement</div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Recent Activity Stats */}
                                            {recentPosts.length > 0 && (
                                                <div className="recent-activity">
                                                    <div className="activity-title">Recent Activity ({recentPosts.length} posts)</div>
                                                    <div className="activity-stats">
                                                        <div className="activity-stat">
                                                            <span className="activity-icon">❤️</span>
                                                            <span className="activity-value">{formatNumber(totalLikes)}</span>
                                                            <span className="activity-label">Total Likes</span>
                                                        </div>
                                                        <div className="activity-stat">
                                                            <span className="activity-icon">💬</span>
                                                            <span className="activity-value">{formatNumber(totalComments)}</span>
                                                            <span className="activity-label">Total Comments</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="last-synced">
                                                Synced {formatDate(account.lastSynced)}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Social Connect Component */}
                    <SocialConnect
                        onAccountConnected={handleAccountConnected}
                        hasConnectedAccounts={socialAccounts.length > 0}
                    />


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

export default InfluencerDashboard;
