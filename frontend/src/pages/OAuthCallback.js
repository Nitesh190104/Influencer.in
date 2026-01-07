import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './OAuthCallback.css';

const OAuthCallback = () => {
  const location = useLocation();
  const { platform } = useParams();
  const [status, setStatus] = useState('processing');
  const [message, setMessage] = useState('Connecting your account...');

  useEffect(() => {
    const handleOAuthCallback = async () => {
      // Parse query parameters
      const params = new URLSearchParams(location.search);
      const code = params.get('code');
      const error = params.get('error');

      if (error) {
        setStatus('error');
        setMessage('Authorization failed. Please try again.');
        
        // Send error message to parent window
        if (window.opener) {
          window.opener.postMessage({
            platform,
            success: false,
            error: 'User denied authorization'
          }, window.location.origin);
          
          setTimeout(() => window.close(), 2000);
        }
        return;
      }

      if (!code) {
        setStatus('error');
        setMessage('No authorization code received.');
        
        if (window.opener) {
          window.opener.postMessage({
            platform,
            success: false,
            error: 'No authorization code'
          }, window.location.origin);
          
          setTimeout(() => window.close(), 2000);
        }
        return;
      }

      try {
        // Exchange code for access token via backend
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/social-accounts/oauth/${platform}/callback`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ code })
        });

        const data = await response.json();

        if (data.success) {
          setStatus('success');
          setMessage('Account connected successfully!');

          // Send success message to parent window
          if (window.opener) {
            window.opener.postMessage({
              platform,
              success: true,
              data: data.data
            }, window.location.origin);

            setTimeout(() => window.close(), 1500);
          }
        } else {
          setStatus('error');
          setMessage(data.message || 'Failed to connect account');

          if (window.opener) {
            window.opener.postMessage({
              platform,
              success: false,
              error: data.message
            }, window.location.origin);

            setTimeout(() => window.close(), 2000);
          }
        }
      } catch (error) {
        console.error('OAuth callback error:', error);
        setStatus('error');
        setMessage('An error occurred while connecting your account');

        if (window.opener) {
          window.opener.postMessage({
            platform,
            success: false,
            error: 'Connection failed'
          }, window.location.origin);

          setTimeout(() => window.close(), 2000);
        }
      }
    };

    handleOAuthCallback();
  }, [location, platform]);

  return (
    <div className="oauth-callback">
      <div className="callback-content">
        {status === 'processing' && (
          <>
            <div className="spinner-large"></div>
            <h2>{message}</h2>
            <p>Please wait...</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="success-icon">✓</div>
            <h2>{message}</h2>
            <p>This window will close automatically.</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="error-icon">✕</div>
            <h2>{message}</h2>
            <p>This window will close automatically.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default OAuthCallback;
