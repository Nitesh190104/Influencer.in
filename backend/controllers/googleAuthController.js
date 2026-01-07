const axios = require('axios');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Get Google OAuth URL
exports.getGoogleAuthUrl = (req, res) => {
    try {
        const { userType } = req.query; // 'brand' or 'influencer'
        
        if (!userType || !['brand', 'influencer'].includes(userType)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid user type'
            });
        }

        const clientId = process.env.GOOGLE_CLIENT_ID;
        const redirectUri = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:5000/api/auth/google/callback';
        
        if (!clientId) {
            return res.status(500).json({
                success: false,
                message: 'Google OAuth not configured'
            });
        }

        const scopes = [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile'
        ];

        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
            `client_id=${clientId}&` +
            `redirect_uri=${encodeURIComponent(redirectUri)}&` +
            `response_type=code&` +
            `scope=${encodeURIComponent(scopes.join(' '))}&` +
            `state=${userType}&` +
            `access_type=offline&` +
            `prompt=consent`;

        res.json({
            success: true,
            authUrl
        });
    } catch (error) {
        console.error('Google auth URL error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to generate Google auth URL'
        });
    }
};

// Handle Google OAuth callback
exports.handleGoogleCallback = async (req, res) => {
    try {
        const { code, state } = req.query;
        const userType = state; // 'brand' or 'influencer'

        if (!code) {
            return res.redirect(`${process.env.FRONTEND_URL}/signup?error=no_code`);
        }

        // Exchange code for tokens
        const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:5000/api/auth/google/callback',
            grant_type: 'authorization_code'
        });

        const { access_token } = tokenResponse.data;

        // Get user info from Google
        const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });

        const { email, name, picture } = userInfoResponse.data;

        // Check if user exists
        let user = await User.findOne({ email });

        if (user) {
            // User exists, log them in
            if (user.userType !== userType) {
                return res.redirect(`${process.env.FRONTEND_URL}/signup?error=user_type_mismatch`);
            }
        } else {
            // Create new user
            user = new User({
                name,
                email,
                password: Math.random().toString(36).slice(-8), // Random password for OAuth users
                phone: '', // Can be collected later
                userType,
                isVerified: true, // Google accounts are pre-verified
                googleId: userInfoResponse.data.id,
                profilePicture: picture
            });

            await user.save();
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                userId: user._id, 
                email: user.email, 
                userType: user.userType 
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Redirect to frontend with token
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
        res.redirect(`${frontendUrl}/auth/google/success?token=${token}&userType=${userType}`);

    } catch (error) {
        console.error('Google callback error:', error);
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
        res.redirect(`${frontendUrl}/signup?error=oauth_failed`);
    }
};
