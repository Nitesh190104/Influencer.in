import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './OAuthSettings.css';

const OAuthSettings = () => {
  const navigate = useNavigate();
  const [configs, setConfigs] = useState({
    instagram: null,
    facebook: null,
    youtube: null
  });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPlatform, setEditingPlatform] = useState(null);
  const [formData, setFormData] = useState({
    clientId: '',
    clientSecret: '',
    redirectUri: ''
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchConfigs();
  }, []);

  const fetchConfigs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/oauth-config', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setConfigs(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch OAuth configs:', error);
      setMessage({ type: 'error', text: 'Failed to load OAuth configurations' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (platform) => {
    const config = configs[platform];
    setEditingPlatform(platform);
    setFormData({
      clientId: config?.clientId || '',
      clientSecret: '',
      redirectUri: config?.redirectUri || `http://localhost:3000/auth/${platform}/callback`
    });
    setShowModal(true);
    setMessage({ type: '', text: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `/api/oauth-config/${editingPlatform}`,
        {
          platform: editingPlatform,
          ...formData
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        setMessage({ type: 'success', text: response.data.message });
        await fetchConfigs();
        setTimeout(() => {
          setShowModal(false);
          setMessage({ type: '', text: '' });
        }, 2000);
      }
    } catch (error) {
      console.error('Failed to save OAuth config:', error);
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to save configuration'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleTest = async (platform) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `/api/oauth-config/${platform}/test`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        alert(`✅ ${platform.toUpperCase()} OAuth configuration is valid!`);
      }
    } catch (error) {
      alert(`❌ ${error.response?.data?.message || 'Configuration test failed'}`);
    }
  };

  const getPlatformInfo = (platform) => {
    const info = {
      instagram: {
        name: 'Instagram',
        icon: '📷',
        setupUrl: 'https://developers.facebook.com',
        description: 'Configure Instagram OAuth via Facebook Developers',
        fields: {
          clientId: 'Instagram App ID',
          clientSecret: 'Instagram App Secret'
        }
      },
      facebook: {
        name: 'Facebook',
        icon: '👥',
        setupUrl: 'https://developers.facebook.com',
        description: 'Configure Facebook Login credentials',
        fields: {
          clientId: 'Facebook App ID',
          clientSecret: 'Facebook App Secret'
        }
      },
      youtube: {
        name: 'YouTube',
        icon: '▶️',
        setupUrl: 'https://console.cloud.google.com',
        description: 'Configure YouTube Data API via Google Cloud',
        fields: {
          clientId: 'Google Client ID',
          clientSecret: 'Google Client Secret'
        }
      }
    };
    return info[platform];
  };

  if (loading) {
    return (
      <div className="oauth-settings-loading">
        <div className="loading-spinner"></div>
        <p>Loading OAuth settings...</p>
      </div>
    );
  }

  return (
    <div className="oauth-settings-container">
      <div className="settings-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <div>
          <h1>OAuth Configuration</h1>
          <p>Configure social media API credentials for user connections</p>
        </div>
      </div>

      <div className="platforms-grid">
        {Object.keys(configs).map(platform => {
          const config = configs[platform];
          const info = getPlatformInfo(platform);
          const isConfigured = config && config.isConfigured;

          return (
            <div key={platform} className={`platform-card ${isConfigured ? 'configured' : 'not-configured'}`}>
              <div className="platform-header">
                <div className="platform-title">
                  <span className="platform-icon">{info.icon}</span>
                  <h3>{info.name}</h3>
                </div>
                <span className={`status-badge ${isConfigured ? 'active' : 'inactive'}`}>
                  {isConfigured ? '✓ Configured' : '○ Not Configured'}
                </span>
              </div>

              <p className="platform-description">{info.description}</p>

              {isConfigured && (
                <div className="config-details">
                  <div className="detail-item">
                    <span className="detail-label">Client ID:</span>
                    <span className="detail-value">{config.clientId.substring(0, 20)}...</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Redirect URI:</span>
                    <span className="detail-value">{config.redirectUri}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Last Updated:</span>
                    <span className="detail-value">{new Date(config.lastUpdated).toLocaleDateString()}</span>
                  </div>
                </div>
              )}

              <div className="platform-actions">
                <button
                  className="btn-primary"
                  onClick={() => handleEdit(platform)}
                >
                  {isConfigured ? 'Update' : 'Configure'}
                </button>
                {isConfigured && (
                  <button
                    className="btn-secondary"
                    onClick={() => handleTest(platform)}
                  >
                    Test
                  </button>
                )}
                <a
                  href={info.setupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-link"
                >
                  Get Credentials →
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {showModal && editingPlatform && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                {getPlatformInfo(editingPlatform).icon} Configure {getPlatformInfo(editingPlatform).name}
              </h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>

            <form onSubmit={handleSubmit} className="config-form">
              {message.text && (
                <div className={`message ${message.type}`}>
                  {message.text}
                </div>
              )}

              <div className="form-group">
                <label>{getPlatformInfo(editingPlatform).fields.clientId} *</label>
                <input
                  type="text"
                  name="clientId"
                  value={formData.clientId}
                  onChange={handleInputChange}
                  placeholder="Enter your client/app ID"
                  required
                />
              </div>

              <div className="form-group">
                <label>{getPlatformInfo(editingPlatform).fields.clientSecret} *</label>
                <input
                  type="password"
                  name="clientSecret"
                  value={formData.clientSecret}
                  onChange={handleInputChange}
                  placeholder="Enter your client/app secret"
                  required
                />
                <small>Your secret is encrypted and never exposed in API responses</small>
              </div>

              <div className="form-group">
                <label>Redirect URI</label>
                <input
                  type="text"
                  name="redirectUri"
                  value={formData.redirectUri}
                  onChange={handleInputChange}
                  placeholder="http://localhost:3000/auth/instagram/callback"
                />
                <small>This must match the redirect URI configured in your app</small>
              </div>

              <div className="setup-instructions">
                <h4>📚 Where to get these credentials:</h4>
                <ol>
                  <li>Go to <a href={getPlatformInfo(editingPlatform).setupUrl} target="_blank" rel="noopener noreferrer">{getPlatformInfo(editingPlatform).setupUrl}</a></li>
                  <li>Create or select your app</li>
                  <li>Copy the Client ID and Client Secret</li>
                  <li>Add the Redirect URI to your app settings</li>
                </ol>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Configuration'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OAuthSettings;
