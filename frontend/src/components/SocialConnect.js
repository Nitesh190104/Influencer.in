import React, { useState, useEffect } from 'react';
import './SocialConnect.css';

const SocialConnect = ({ onAccountConnected, hasConnectedAccounts = false }) => {
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState('');

  // Load Phyllo SDK
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.getphyllo.com/connect/v2/phyllo-connect.js';
    script.async = true;
    script.onload = () => {
      console.log('Phyllo SDK loaded');
    };
    document.body.appendChild(script);

    // Suppress known Phyllo SDK internal errors that don't affect functionality
    const errorHandler = (event) => {
      if (event.message && event.message.includes('PreviousConnections')) {
        event.preventDefault();
        console.warn('[Phyllo SDK] Suppressed internal SDK error (non-critical)');
      }
    };
    window.addEventListener('error', errorHandler);

    return () => {
      document.body.removeChild(script);
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  // Initialize Phyllo SDK - platform will be selected in the modal
  const initializePhylloConnect = async () => {
    try {
      const token = localStorage.getItem('token');
      // Use 'instagram' as a placeholder - the SDK will show platform selection
      const response = await fetch(`/api/social-accounts/oauth/instagram/url`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      console.log('[Phyllo Frontend] Response from backend:', data);

      if (!data.success) {
        setError(data.message || 'Failed to initialize connection');
        setConnecting(false);
        return;
      }

      // Validate required fields
      if (!data.sdkToken || !data.phylloUserId) {
        console.error('[Phyllo Frontend] Missing required fields:', data);
        setError('Invalid response from server. Missing required data.');
        setConnecting(false);
        return;
      }

      console.log('[Phyllo Frontend] Initializing SDK with config:', {
        environment: 'staging',
        userId: data.phylloUserId,
        hasToken: !!data.sdkToken
      });

      // Initialize Phyllo Connect SDK
      const config = {
        clientDisplayName: 'Influencer Platform',
        environment: 'staging',
        userId: data.phylloUserId,
        token: data.sdkToken,
        redirect: false
      };

      if (window.PhylloConnect) {
        const phyllo = window.PhylloConnect.initialize(config);

        phyllo.on('accountConnected', (accountId, workplatformId, userId) => {
          console.log('Account connected:', { accountId, workplatformId, userId });
          handlePhylloSuccess(accountId, userId);
        });

        phyllo.on('accountDisconnected', (accountId, workplatformId, userId) => {
          console.log('Account disconnected:', { accountId, workplatformId, userId });
        });

        phyllo.on('tokenExpired', (userId) => {
          console.log('Token expired for user:', userId);
          setError('Session expired. Please try again.');
          setConnecting(false);
        });

        phyllo.on('exit', (reason, userId) => {
          console.log('User exited:', { reason, userId });
          setConnecting(false);
        });

        console.log('[Phyllo Frontend] Opening Phyllo SDK modal...');
        phyllo.open();
      } else {
        setError('Phyllo SDK not loaded. Please refresh and try again.');
        setConnecting(false);
      }
    } catch (err) {
      console.error('Failed to initialize Phyllo:', err);
      setError('Failed to initialize connection. Please try again.');
      setConnecting(false);
    }
  };

  // Handle successful Phyllo connection
  const handlePhylloSuccess = async (accountId, phylloUserId) => {
    try {
      console.log('[Phyllo Success] Starting callback with:', { accountId, phylloUserId });

      const token = localStorage.getItem('token');
      console.log('[Phyllo Success] Sending request to backend callback...');

      const response = await fetch('/api/social-accounts/oauth/phyllo/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          accountId,
          userId: phylloUserId,
          platform: 'instagram' // Platform will be determined by Phyllo
        })
      });

      const data = await response.json();
      console.log('[Phyllo Success] Backend response:', data);

      if (data.success) {
        console.log('[Phyllo Success] Account connected successfully!');
        onAccountConnected(data.data);
        setConnecting(false);
        setError('');
      } else {
        console.error('[Phyllo Success] Backend returned error:', data.message);
        setError(data.message || 'Failed to save account');
        setConnecting(false);
      }
    } catch (err) {
      console.error('[Phyllo Success] Error in callback:', err);
      setError('Failed to save account. Please try again.');
      setConnecting(false);
    }
  };

  // Handle connect button click
  const handleConnectAccounts = async () => {
    setConnecting(true);
    setError('');
    await initializePhylloConnect();
  };

  return (
    <div className="social-connect">
      <h3>Connect Your Social Accounts</h3>
      <p className="connect-description">
        Connect your social media accounts to automatically sync your follower counts and analytics
      </p>

      {error && (
        <div className="connect-error">
          {error}
        </div>
      )}

      <div className="connect-buttons">
        <button
          className={`connect-btn primary ${hasConnectedAccounts ? 'secondary' : ''}`}
          onClick={handleConnectAccounts}
          disabled={connecting}
        >
          {connecting ? (
            <>
              <span className="spinner"></span>
              Connecting...
            </>
          ) : (
            <>
              <span className="btn-icon">🔗</span>
              {hasConnectedAccounts ? 'Add More Accounts' : 'Connect Accounts'}
            </>
          )}
        </button>
      </div>

      <div className="oauth-info">
        <h4>🔐 How to Connect:</h4>
        <ol>
          <li>Click the "Connect Accounts" button above</li>
          <li>Select the platform you want to connect (Instagram, Facebook, YouTube, etc.)</li>
          <li>Login with your regular social media credentials</li>
          <li>Authorize our app to access your public profile and follower data</li>
          <li>You'll be redirected back with your account connected!</li>
        </ol>
        <p className="setup-note">
          <strong>✨ Easy & Secure:</strong> You only need to login with your regular username and password.
          No technical setup required. Your credentials are never shared with us - you authorize directly through
          the platform's official login page.
        </p>
      </div>
    </div>
  );
};

export default SocialConnect;
