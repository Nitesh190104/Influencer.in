import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NotificationBell.css';

const NotificationBell = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        fetchNotifications();
        fetchUnreadCount();

        const interval = setInterval(() => {
            fetchUnreadCount();
            if (isOpen) {
                fetchNotifications();
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchNotifications = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/notifications', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.data.success) {
                // Show all notification types
                setNotifications(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
        }
    };

    const fetchUnreadCount = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/notifications/unread-count', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.data.success) {
                setUnreadCount(response.data.data.unreadCount);
            }
        } catch (error) {
            console.error('Failed to fetch unread count:', error);
        }
    };

    const handleAccept = async (notificationId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:5000/api/follow/requests/${notificationId}/accept`, {}, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            fetchNotifications();
            fetchUnreadCount();
        } catch (error) {
            console.error('Failed to accept request:', error);
            alert(error.response?.data?.message || 'Failed to accept request');
        }
    };

    const handleReject = async (notificationId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:5000/api/follow/requests/${notificationId}/reject`, {}, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            fetchNotifications();
            fetchUnreadCount();
        } catch (error) {
            console.error('Failed to reject request:', error);
        }
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;

        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours}h ago`;

        const diffDays = Math.floor(diffHours / 24);
        return `${diffDays}d ago`;
    };

    return (
        <div className="notification-bell" ref={dropdownRef}>
            <button className="bell-button" onClick={() => setIsOpen(!isOpen)}>
                🔔
                {unreadCount > 0 && <span className="bell-badge">{unreadCount}</span>}
            </button>

            {isOpen && (
                <div className="notification-dropdown">
                    <div className="notification-header">
                        <h3>Notifications</h3>
                    </div>

                    <div className="notification-list">
                        {notifications.length === 0 ? (
                            <div className="no-notifications">
                                <span className="no-notif-icon">🔔</span>
                                <p>No new notifications</p>
                            </div>
                        ) : (
                            notifications.map((notif) => (
                                <div key={notif._id} className={`notification-item ${notif.type}`}>
                                    <div 
                                        className="notif-avatar"
                                        style={{ backgroundColor: notif.from?.avatarColor || '#667eea' }}
                                    >
                                        {notif.from?.avatarIcon || notif.from?.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="notif-content">
                                        {notif.type === 'follow_request' ? (
                                            <>
                                                <p className="notif-text">
                                                    <strong>{notif.from?.name}</strong> wants to follow you
                                                </p>
                                                <span className="notif-time">{formatTime(notif.createdAt)}</span>
                                                <div className="notif-actions">
                                                    <button
                                                        className="accept-btn"
                                                        onClick={() => handleAccept(notif._id)}
                                                    >
                                                        Accept
                                                    </button>
                                                    <button
                                                        className="reject-btn"
                                                        onClick={() => handleReject(notif._id)}
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            </>
                                        ) : notif.type === 'campaign_accepted' ? (
                                            <>
                                                <p className="notif-text">
                                                    <strong>{notif.title}</strong>
                                                </p>
                                                <p className="notif-message">{notif.message}</p>
                                                <span className="notif-time">{formatTime(notif.createdAt)}</span>
                                                <div className="notif-actions">
                                                    <button
                                                        className="message-brand-btn"
                                                        onClick={() => {
                                                            navigate(`/messages?user=${notif.from._id}`);
                                                            setIsOpen(false);
                                                        }}
                                                    >
                                                        💬 Message Brand
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <p className="notif-text">
                                                    <strong>{notif.title}</strong>
                                                </p>
                                                <p className="notif-message">{notif.message}</p>
                                                <span className="notif-time">{formatTime(notif.createdAt)}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;
