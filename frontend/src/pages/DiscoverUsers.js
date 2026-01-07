import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DiscoverUsers.css';

const DiscoverUsers = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setCurrentUser(user);
        fetchUsers();
    }, [filter, search, page]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const params = {
                page,
                limit: 12
            };

            if (filter !== 'all') {
                params.userType = filter;
            }

            if (search) {
                params.search = search;
            }

            const response = await axios.get('/api/users/discover', {
                headers: { 'Authorization': `Bearer ${token}` },
                params
            });

            if (response.data.success) {
                setUsers(response.data.data);
                setTotalPages(response.data.pagination.pages);
            }
        } catch (error) {
            console.error('Failed to fetch users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFollow = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`/api/follow/${userId}`, {}, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            // Update user in list
            setUsers(users.map(user =>
                user._id === userId
                    ? { ...user, isFollowing: true, isMutual: user.isFollower }
                    : user
            ));
        } catch (error) {
            console.error('Failed to follow user:', error);
            alert(error.response?.data?.message || 'Failed to follow user');
        }
    };

    const handleUnfollow = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/api/follow/${userId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            setUsers(users.map(user =>
                user._id === userId
                    ? { ...user, isFollowing: false, isMutual: false }
                    : user
            ));
        } catch (error) {
            console.error('Failed to unfollow user:', error);
        }
    };

    const handleMessage = (userId) => {
        navigate(`/messages?user=${userId}`);
    };

    const handleBackToDashboard = () => {
        if (currentUser?.userType === 'brand') {
            navigate('/brand-dashboard');
        } else {
            navigate('/influencer-dashboard');
        }
    };

    return (
        <div className="discover-page">
            <div className="discover-header">
                <button 
                    className="back-to-dashboard-btn"
                    onClick={handleBackToDashboard}
                    title="Back to Dashboard"
                >
                    <span className="back-arrow">←</span>
                    <span>Back to Dashboard</span>
                </button>
                <h1>Discover Users</h1>
                <p>Find and connect with brands and influencers</p>
            </div>

            <div className="discover-filters">
                <div className="search-box">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                    />
                </div>

                <div className="filter-buttons">
                    <button
                        className={filter === 'all' ? 'active' : ''}
                        onClick={() => { setFilter('all'); setPage(1); }}
                    >
                        All Users
                    </button>
                    <button
                        className={filter === 'brand' ? 'active' : ''}
                        onClick={() => { setFilter('brand'); setPage(1); }}
                    >
                        Brands
                    </button>
                    <button
                        className={filter === 'influencer' ? 'active' : ''}
                        onClick={() => { setFilter('influencer'); setPage(1); }}
                    >
                        Influencers
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Discovering users...</p>
                </div>
            ) : (
                <>
                    <div className="users-grid">
                        {users.map((user) => (
                            <div key={user._id} className="user-card">
                                {user.isMutual && (
                                    <div className="mutual-badge">Mutual Follow</div>
                                )}
                                
                                <div className="user-card-header">
                                    <div 
                                        className="user-avatar"
                                        style={{ backgroundColor: user.avatarColor || '#667eea' }}
                                    >
                                        {user.avatarIcon || user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="user-info">
                                        <h3 className="user-name">{user.name}</h3>
                                        <span className="user-type-badge">{user.userType}</span>
                                    </div>
                                </div>

                                <div className="user-details">
                                    <div className="user-email">
                                        <span className="email-icon">✉️</span>
                                        <span className="email-text">{user.email}</span>
                                    </div>
                                    {user.bio && (
                                        <div className="user-bio">
                                            <span className="bio-icon">💬</span>
                                            <span className="bio-text">{user.bio}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="user-actions">
                                    {user.isFollowing ? (
                                        <button
                                            className="btn-following"
                                            onClick={() => handleUnfollow(user._id)}
                                        >
                                            <span>✓</span> Following
                                        </button>
                                    ) : (
                                        <button
                                            className="btn-follow"
                                            onClick={() => handleFollow(user._id)}
                                        >
                                            <span>+</span> {user.isFollower ? 'Follow Back' : 'Follow'}
                                        </button>
                                    )}

                                    {user.isMutual && (
                                        <button
                                            className="btn-message"
                                            onClick={() => handleMessage(user._id)}
                                        >
                                            <span>💬</span> Message
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                disabled={page === 1}
                                onClick={() => setPage(page - 1)}
                            >
                                Previous
                            </button>
                            <span>Page {page} of {totalPages}</span>
                            <button
                                disabled={page === totalPages}
                                onClick={() => setPage(page + 1)}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default DiscoverUsers;
