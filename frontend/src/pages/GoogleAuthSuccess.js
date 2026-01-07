import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const GoogleAuthSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const userType = searchParams.get('userType');

    if (token && userType) {
      // Store token and create user object
      localStorage.setItem('token', token);
      
      // Decode token to get user info (basic decode, not secure validation)
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        const userData = JSON.parse(jsonPayload);
        localStorage.setItem('user', JSON.stringify({
          userId: userData.userId,
          email: userData.email,
          userType: userData.userType
        }));

        // Redirect to appropriate dashboard
        if (userType === 'brand') {
          navigate('/brand-dashboard');
        } else {
          navigate('/influencer-dashboard');
        }
      } catch (error) {
        console.error('Token parsing error:', error);
        navigate('/signup?error=invalid_token');
      }
    } else {
      navigate('/signup?error=missing_credentials');
    }
  }, [navigate, searchParams]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontSize: '18px',
      color: '#333'
    }}>
      <div>
        <p>Completing Google Sign-Up...</p>
        <p style={{ fontSize: '14px', color: '#666' }}>Please wait while we redirect you.</p>
      </div>
    </div>
  );
};

export default GoogleAuthSuccess;
