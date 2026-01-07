import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Settings.css';

const BrandSettings = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        bio: '',
        avatarColor: '#667eea'
    });

    const avatarColors = [
        '#667eea', '#764ba2', '#f093fb', '#4facfe',
        '#43e97b', '#fa709a', '#fee140', '#30cfd0',
        '#a8edea', '#fed6e3', '#ff9a9e', '#fecfef'
    ];

    const avatarIcons = [
        '🏢', '🏪', '🏭', '🏬', '🏛️', '🏢', 
        '💼', '👔', '📊', '📈', '💰', '💎',
        '🎯', '🚀', '⭐', '🌟'
    ];

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (!token || !storedUser) {
            navigate('/login');
            return;
        }

        const userData = JSON.parse(storedUser);
        if (userData.userType !== 'brand') {
            navigate('/influencer-dashboard');
            return;
        }

        setUser(userData);
        setFormData({
            name: userData.name || '',
            email: userData.email || '',
            bio: userData.bio || '',
            avatarColor: userData.avatarColor || '#667eea',
            avatarIcon: userData.avatarIcon || '🏢'
        });
        setLoading(false);
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleColorSelect = (color) => {
        setFormData(prev => ({ ...prev, avatarColor: color }));
    };

    const handleIconSelect = (icon) => {
        setFormData(prev => ({ ...prev, avatarIcon: icon }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                'http://localhost:5000/api/auth/update-profile',
                formData,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (response.data.success) {
                const updatedUser = { ...user, ...formData };
                setUser(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
                
                setMessage({
                    type: 'success',
                    text: 'Profile updated successfully!'
                });

                // Reload page after 1 second to reflect changes
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } catch (error) {
            console.error('Failed to update profile:', error);
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Failed to update profile'
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="settings-loading">
                <div className="loading-spinner"></div>
                <p>Loading settings...</p>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <div className="dashboard-sidebar">
                <div className="sidebar-header">
                    <img src="https://www.influencer.in/wp-content/themes/influencer-2022/images/logo.png" alt="Influencer" className="logo-image" />
                </div>

                <nav className="sidebar-nav">
                    <a href="/brand-dashboard" className="nav-item">
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
                    </a>
                    <a href="/brand/settings" className="nav-item active">
                        <span className="nav-icon">⚙️</span>
                        Settings
                    </a>
                </nav>

                <button className="logout-btn" onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    navigate('/login');
                }}>
                    <span className="nav-icon">🚪</span>
                    Logout
                </button>
            </div>

            {/* Main Content */}
            <div className="dashboard-main">
                <div className="settings-container">
                    <div className="settings-header">
                        <h1>Profile Settings</h1>
                        <p>Customize your brand profile and preferences</p>
                    </div>

                    {message.text && (
                        <div className={`message ${message.type}`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="settings-form">
                        {/* Avatar Preview */}
                        <div className="settings-section">
                            <h2>Profile Avatar</h2>
                            <div className="avatar-preview-container">
                                <div 
                                    className="avatar-preview" 
                                    style={{ backgroundColor: formData.avatarColor }}
                                >
                                    <span className="avatar-icon-large">
                                        {formData.avatarIcon || formData.name?.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div className="avatar-info">
                                    <h3>{formData.name}</h3>
                                    <p>Brand Account</p>
                                </div>
                            </div>
                        </div>

                        {/* Icon Selection */}
                        <div className="settings-section">
                            <h2>Avatar Icon</h2>
                            <p className="section-description">Choose an icon for your brand profile</p>
                            <div className="icon-grid">
                                {avatarIcons.map(icon => (
                                    <button
                                        key={icon}
                                        type="button"
                                        className={`icon-option ${formData.avatarIcon === icon ? 'selected' : ''}`}
                                        onClick={() => handleIconSelect(icon)}
                                    >
                                        {icon}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Color Selection */}
                        <div className="settings-section">
                            <h2>Avatar Color</h2>
                            <p className="section-description">Choose a background color for your avatar</p>
                            <div className="color-grid">
                                {avatarColors.map(color => (
                                    <button
                                        key={color}
                                        type="button"
                                        className={`color-option ${formData.avatarColor === color ? 'selected' : ''}`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => handleColorSelect(color)}
                                    >
                                        {formData.avatarColor === color && <span className="checkmark">✓</span>}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Basic Information */}
                        <div className="settings-section">
                            <h2>Basic Information</h2>
                            
                            <div className="form-group">
                                <label>Brand Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your brand name"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email"
                                    disabled
                                />
                                <small className="form-hint">Email cannot be changed</small>
                            </div>

                            <div className="form-group">
                                <label>Brand Description</label>
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    placeholder="Tell us about your brand..."
                                    rows="4"
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            <button 
                                type="button" 
                                className="cancel-btn"
                                onClick={() => navigate('/brand-dashboard')}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="save-btn"
                                disabled={saving}
                            >
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BrandSettings;
