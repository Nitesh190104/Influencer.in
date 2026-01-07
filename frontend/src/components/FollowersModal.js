import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './FollowersModal.css';

const FollowersModal = ({ isOpen, onClose, initialTab = 'followers' }) => {
    const [activeTab, setActiveTab] = useState(initialTab);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [mutualFollows, setMutualFollows] = useState(new Set());
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            setActiveTab(initialTab);
            fetchFollowers();
            fetchFollowing();
        }
    }, [isOpen, initialTab]);

    const fetchFollowers = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/follow/followers/list', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.data.success) {
                setFollowers(response.data.data);
                checkMutualFollows(response.data.data, 'followers');
            }
        } catch (error) {
            console.error('Failed to fetch followers:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchFollowing = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/follow/following/list', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.data.success) {
                setFollowing(response.data.data);
                checkMutualFollows(response.data.data, 'following');
            }
        } catch (error) {
            console.error('Failed to fetch following:', error);
        } finally {
            setLoading(false);
        }
    };

    const checkMutualFollows = async (users, type) => {
        try {
            const token = localStorage.getItem('token');
            const mutualSet = new Set();

            for (const user of users) {
                const response = await axios.get(`/api/follow/status/${user._id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.data.success && response.data.data.isMutual) {
                    mutualSet.add(user._id);
                }
            }

            setMutualFollows(mutualSet);
        } catch (error) {
            console.error('Failed to check mutual follows:', error);
        }
    };

    const handleRemoveFollower = async (userId, userName) => {
        if (!window.confirm(`Are you sure you want to remove ${userName} from your followers?`)) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/api/follow/follower/${userId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            fetchFollowers();
            alert('Follower removed successfully');
        } catch (error) {
            console.error('Failed to remove follower:', error);
            alert(error.response?.data?.message || 'Failed to remove follower');
        }
    };

    const handleUnfollow = async (userId, userName) => {
        if (!window.confirm(`Are you sure you want to unfollow ${userName}?`)) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/api/follow/${userId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            fetchFollowing();
            alert('Unfollowed successfully');
        } catch (error) {
            console.error('Failed to unfollow:', error);
            alert(error.response?.data?.message || 'Failed to unfollow');
        }
    };

    const handleMessage = (userId) => {
        navigate(`/messages?user=${userId}`);
        onClose();
    };

    if (!isOpen) return null;

    const currentList = activeTab === 'followers' ? followers : following;

    return (
        <div className="followers-modal-overlay" onClick={onClose}>
            <div className="followers-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Followers & Following</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <div className="modal-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'followers' ? 'active' : ''}`}
                        onClick={() => setActiveTab('followers')}
                    >
                        Followers ({followers.length})
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'following' ? 'active' : ''}`}
                        onClick={() => setActiveTab('following')}
                    >
                        Following ({following.length})
                    </button>
                </div>

                <div className="modal-content">
                    {loading ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>Loading...</p>
                        </div>
                    ) : currentList.length === 0 ? (
                        <div className="empty-state">
                            <span className="empty-icon">👥</span>
                            <p>No {activeTab} yet</p>
                        </div>
                    ) : (
                        <div className="users-list">
                            {currentList.map((user) => (
                                <div key={user._id} className="user-card">
                                    <div className="user-info">
                                        <div className="user-avatar">
                                            {user.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="user-details">
                                            <div className="user-name">{user.name}</div>
                                            <div className="user-type">
                                                {user.userType === 'brand' ? 'Brand' : 'Influencer'} Account
                                            </div>
                                        </div>
                                    </div>
                                    <div className="user-actions">
                                        {activeTab === 'followers' ? (
                                            <>
                                                <button
                                                    className="remove-btn"
                                                    onClick={() => handleRemoveFollower(user._id, user.name)}
                                                >
                                                    Remove
                                                </button>
                                                {mutualFollows.has(user._id) && (
                                                    <button
                                                        className="message-btn"
                                                        onClick={() => handleMessage(user._id)}
                                                    >
                                                        Message
                                                    </button>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    className="unfollow-btn"
                                                    onClick={() => handleUnfollow(user._id, user.name)}
                                                >
                                                    Unfollow
                                                </button>
                                                {mutualFollows.has(user._id) && (
                                                    <button
                                                        className="message-btn"
                                                        onClick={() => handleMessage(user._id)}
                                                    >
                                                        Message
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FollowersModal;
