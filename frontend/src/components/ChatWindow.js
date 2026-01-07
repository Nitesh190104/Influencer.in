import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import MessageInput from './MessageInput';
import './ChatWindow.css';

const ChatWindow = ({ conversation, onMessageSent }) => {
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);
    const currentUserId = JSON.parse(localStorage.getItem('user'))?.id;

    useEffect(() => {
        if (conversation) {
            fetchMessages();
            markAsRead();

            // Poll for new messages every 2 seconds
            const interval = setInterval(fetchMessages, 2000);
            return () => clearInterval(interval);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conversation]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const fetchMessages = async () => {
        if (!conversation) return;

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `http://localhost:5000/api/chat/messages/${conversation._id}`,
                { headers: { 'Authorization': `Bearer ${token}` } }
            );

            if (response.data.success) {
                setMessages(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        }
    };

    const markAsRead = async () => {
        if (!conversation) return;

        try {
            const token = localStorage.getItem('token');
            await axios.patch(
                `http://localhost:5000/api/chat/conversations/${conversation._id}/read`,
                {},
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
        } catch (error) {
            console.error('Failed to mark as read:', error);
        }
    };

    const handleSendMessage = async (content, file) => {
        try {
            const token = localStorage.getItem('token');

            if (file) {
                // Send file message
                const formData = new FormData();
                formData.append('file', file);
                formData.append('conversationId', conversation._id);
                formData.append('receiverId', conversation.participant._id);
                formData.append('content', content);

                await axios.post('http://localhost:5000/api/chat/messages/file', formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                // Send text message
                await axios.post('http://localhost:5000/api/chat/messages', {
                    conversationId: conversation._id,
                    receiverId: conversation.participant._id,
                    content
                }, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
            }

            fetchMessages();
            onMessageSent();
        } catch (error) {
            console.error('Failed to send message:', error);
            alert(error.response?.data?.message || 'Failed to send message');
        }
    };

    const handleDeleteMessage = async (messageId) => {
        if (!window.confirm('Delete this message?')) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/chat/messages/${messageId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            fetchMessages();
        } catch (error) {
            console.error('Failed to delete message:', error);
        }
    };

    const handleAddReaction = async (messageId, emoji) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `http://localhost:5000/api/chat/messages/${messageId}/reaction`,
                { emoji },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );

            fetchMessages();
        } catch (error) {
            console.error('Failed to add reaction:', error);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    if (!conversation) {
        return (
            <div className="chat-window">
                <div className="no-conversation-selected">
                    <div className="no-conversation-icon">💬</div>
                    <h3>Select a conversation</h3>
                    <p>Choose a conversation from the list to start messaging</p>
                </div>
            </div>
        );
    }

    return (
        <div className="chat-window">
            <div className="chat-header">
                <div className="chat-user-info">
                    <div className="chat-avatar">
                        {conversation.participant.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h3>{conversation.participant.name}</h3>
                        <p className="user-type">{conversation.participant.userType}</p>
                    </div>
                </div>
            </div>

            <div className="chat-messages">
                {messages.map((message) => {
                    const isSent = message.sender._id === currentUserId;
                    const isDeleted = message.deletedBy?.includes(currentUserId);

                    if (isDeleted) return null;

                    return (
                        <div key={message._id} className={`message ${isSent ? 'sent' : 'received'}`}>
                            <div className="message-bubble">
                                {message.type === 'image' && (
                                    <img
                                        src={`http://localhost:5000${message.fileUrl}`}
                                        alt="Shared content"
                                        className="message-image"
                                    />
                                )}

                                {message.type === 'file' && (
                                    <div className="message-file">
                                        <span className="file-icon">📎</span>
                                        <a
                                            href={`http://localhost:5000${message.fileUrl}`}
                                            download={message.fileName}
                                            rel="noopener noreferrer"
                                        >
                                            {message.fileName}
                                        </a>
                                    </div>
                                )}

                                {message.content && <p>{message.content}</p>}

                                <div className="message-footer">
                                    <span className="message-time">{formatTime(message.createdAt)}</span>
                                    {isSent && message.isRead && <span className="read-receipt">✓✓</span>}
                                </div>

                                {message.reactions && message.reactions.length > 0 && (
                                    <div className="message-reactions">
                                        {message.reactions.map((reaction, idx) => (
                                            <span key={idx} className="reaction">{reaction.emoji}</span>
                                        ))}
                                    </div>
                                )}

                                <div className="message-actions">
                                    <button
                                        className="reaction-btn"
                                        onClick={() => {
                                            const emoji = prompt('Choose reaction: ❤️ 👍 😂 😮 😢 🔥');
                                            if (emoji) handleAddReaction(message._id, emoji);
                                        }}
                                    >
                                        😊
                                    </button>
                                    {isSent && (
                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDeleteMessage(message._id)}
                                        >
                                            🗑️
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            <MessageInput onSendMessage={handleSendMessage} />
        </div>
    );
};

export default ChatWindow;
