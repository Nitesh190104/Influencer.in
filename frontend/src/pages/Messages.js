import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ConversationList from '../components/ConversationList';
import ChatWindow from '../components/ChatWindow';
import './Messages.css';

const Messages = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [unreadCount, setUnreadCount] = useState(0);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setCurrentUser(user);
    }, []);

    useEffect(() => {
        fetchConversations();

        // Poll for new messages every 3 seconds
        const interval = setInterval(() => {
            fetchConversations();
            fetchUnreadCount();
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Auto-open conversation if user ID in URL
        const userId = searchParams.get('user');
        if (userId) {
            openConversationWithUser(userId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    const fetchConversations = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/chat/conversations', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.data.success) {
                setConversations(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch conversations:', error);
        } finally {
            setLoading(false);
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

    const openConversationWithUser = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`/api/chat/conversations/${userId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.data.success) {
                setSelectedConversation(response.data.data);
                // Refresh conversations to update list
                fetchConversations();
            }
        } catch (error) {
            console.error('Failed to open conversation:', error);
            alert(error.response?.data?.message || 'Failed to start conversation');
        }
    };

    const handleSelectConversation = (conversation) => {
        setSelectedConversation(conversation);
    };

    const handleMessageSent = () => {
        // Refresh conversations to update last message
        fetchConversations();
    };

    const handleBackToDashboard = () => {
        if (currentUser?.userType === 'brand') {
            navigate('/brand-dashboard');
        } else {
            navigate('/influencer-dashboard');
        }
    };

    return (
        <div className="messages-page">
            <div className="messages-header-bar">
                <button 
                    className="back-to-dashboard-btn"
                    onClick={handleBackToDashboard}
                    title="Back to Dashboard"
                >
                    <span className="back-arrow">←</span>
                    <span>Back to Dashboard</span>
                </button>
                <h1 className="messages-title">💬 Messages</h1>
                <div className="messages-spacer"></div>
            </div>
            <div className="messages-container">
                <ConversationList
                    conversations={conversations}
                    selectedConversation={selectedConversation}
                    onSelectConversation={handleSelectConversation}
                    loading={loading}
                />

                <ChatWindow
                    conversation={selectedConversation}
                    onMessageSent={handleMessageSent}
                />
            </div>
        </div>
    );
};

export default Messages;
