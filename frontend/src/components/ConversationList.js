import React from 'react';
import './ConversationList.css';

const ConversationList = ({ conversations, selectedConversation, onSelectConversation, loading }) => {
    const formatTime = (timestamp) => {
        if (!timestamp) return '';

        const date = new Date(timestamp);
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

    if (loading) {
        return (
            <div className="conversation-list">
                <div className="conversation-header">
                    <h2>Messages</h2>
                </div>
                <div className="loading-conversations">Loading...</div>
            </div>
        );
    }

    return (
        <div className="conversation-list">
            <div className="conversation-header">
                <h2>Messages</h2>
            </div>

            {conversations.length === 0 ? (
                <div className="no-conversations">
                    <div className="no-conversations-icon">💬</div>
                    <p>No conversations yet</p>
                    <small>Start a conversation from the Discover page</small>
                </div>
            ) : (
                <div className="conversations">
                    {conversations.map((conv) => (
                        <div
                            key={conv._id}
                            className={`conversation-item ${selectedConversation?._id === conv._id ? 'active' : ''}`}
                            onClick={() => onSelectConversation(conv)}
                        >
                            <div 
                                className="conversation-avatar"
                                style={{ backgroundColor: conv.participant.avatarColor || '#667eea' }}
                            >
                                {conv.participant.avatarIcon || conv.participant.name.charAt(0).toUpperCase()}
                            </div>

                            <div className="conversation-info">
                                <div className="conversation-top">
                                    <h4>{conv.participant.name}</h4>
                                    <span className="conversation-time">
                                        {formatTime(conv.lastMessage?.timestamp)}
                                    </span>
                                </div>

                                <div className="conversation-bottom">
                                    <p className="last-message">
                                        {conv.lastMessage?.content || 'Start a conversation'}
                                    </p>
                                    {conv.unreadCount > 0 && (
                                        <span className="unread-badge">{conv.unreadCount}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ConversationList;
