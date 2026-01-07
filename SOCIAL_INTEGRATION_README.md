# Social Media Account Integration - Quick Start Guide

## Overview

The Influencer Dashboard now includes social media account integration, allowing influencers to:
- Connect their Instagram, Facebook, and YouTube accounts
- Automatically sync follower/subscriber counts
- Display real-time metrics on the dashboard

## Features

✅ **OAuth 2.0 Authentication** - Secure login through official platforms  
✅ **Real-time Follower Sync** - Automatically fetch and update follower counts  
✅ **Multiple Platform Support** - Instagram, Facebook, YouTube  
✅ **Demo Mode** - Test without real credentials  
✅ **Visual Dashboard** - Beautiful cards showing connected accounts  
✅ **One-Click Sync** - Manually refresh follower counts anytime  

## How It Works

### For Users (Influencers)

1. **Login to Dashboard**
   - Sign in to your influencer account
   - Navigate to the Influencer Dashboard

2. **Connect Social Accounts**
   - Scroll to "Connect Your Social Accounts" section
   - Click on Instagram, Facebook, or YouTube button
   - Choose Demo Mode OR OAuth setup

3. **Demo Mode (Recommended for Testing)**
   - Click "Cancel" when prompted
   - System generates simulated account with random follower count
   - Perfect for testing the feature

4. **OAuth Mode (Production)**
   - Click "OK" when prompted
   - Redirected to platform login page in popup window
   - Login with your credentials
   - Grant permissions to the app
   - Automatically redirected back to dashboard
   - Account connected with real follower data

5. **View Connected Accounts**
   - See all connected accounts with follower counts
   - Click "Sync Now" to refresh data
   - Click "Disconnect" to remove an account

### For Developers

#### Backend Structure

```
backend/
├── models/
│   └── SocialAccount.js          # MongoDB schema for social accounts
├── controllers/
│   └── socialAccountController.js # OAuth logic and API calls
├── routes/
│   └── socialAccounts.js         # API endpoints
└── .env                          # OAuth credentials (not committed)
```

#### Frontend Structure

```
frontend/
└── src/
    ├── components/
    │   ├── SocialConnect.js      # Connect buttons and OAuth logic
    │   └── SocialConnect.css     # Styling
    └── pages/
        ├── InfluencerDashboard.js # Main dashboard with social accounts
        ├── OAuthCallback.js       # OAuth redirect handler
        └── OAuthCallback.css      # Callback page styling
```

## API Endpoints

### Connect Social Account (OAuth)
```
POST /api/social-accounts/oauth/{platform}/callback
Authorization: Bearer {token}
Body: { "code": "oauth_code" }
```

### Connect Social Account (Demo)
```
POST /api/social-accounts/connect/{platform}/demo
Authorization: Bearer {token}
Body: { "username": "name", "followers": 10000 }
```

### Get Connected Accounts
```
GET /api/social-accounts
Authorization: Bearer {token}
```

### Sync Follower Counts
```
POST /api/social-accounts/sync
Authorization: Bearer {token}
```

### Disconnect Account
```
DELETE /api/social-accounts/disconnect/{platform}
Authorization: Bearer {token}
```

## Setup for Production

### Prerequisites
- Node.js and npm installed
- MongoDB running
- Social media developer accounts

### Step 1: Backend Configuration

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies (already done):
   ```bash
   npm install axios
   ```

3. Create/update `.env` file with OAuth credentials:
   ```env
   # Instagram
   INSTAGRAM_CLIENT_ID=your_instagram_app_id
   INSTAGRAM_CLIENT_SECRET=your_instagram_app_secret
   INSTAGRAM_REDIRECT_URI=http://localhost:3000/auth/instagram/callback
   
   # Facebook
   FACEBOOK_CLIENT_ID=your_facebook_app_id
   FACEBOOK_CLIENT_SECRET=your_facebook_app_secret
   FACEBOOK_REDIRECT_URI=http://localhost:3000/auth/facebook/callback
   
   # YouTube
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   YOUTUBE_REDIRECT_URI=http://localhost:3000/auth/youtube/callback
   ```

### Step 2: Frontend Configuration

1. Open `frontend/src/components/SocialConnect.js`

2. Update the `OAUTH_CONFIG` object with your Client IDs:
   ```javascript
   const OAUTH_CONFIG = {
     instagram: {
       clientId: 'YOUR_INSTAGRAM_APP_ID',
       redirectUri: 'http://localhost:3000/auth/instagram/callback',
       scope: 'user_profile,user_media'
     },
     facebook: {
       clientId: 'YOUR_FACEBOOK_APP_ID',
       redirectUri: 'http://localhost:3000/auth/facebook/callback',
       scope: 'public_profile,pages_read_engagement,pages_show_list'
     },
     youtube: {
       clientId: 'YOUR_GOOGLE_CLIENT_ID',
       redirectUri: 'http://localhost:3000/auth/youtube/callback',
       scope: 'https://www.googleapis.com/auth/youtube.readonly'
     }
   };
   ```

### Step 3: Start the Application

1. Start backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start frontend (in another terminal):
   ```bash
   cd frontend
   npm start
   ```

3. Open browser to `http://localhost:3000`

## Using Demo Mode

Demo mode allows you to test the feature without setting up OAuth:

1. Click any "Connect" button (Instagram, Facebook, YouTube)
2. When prompted with the dialog, click **Cancel**
3. A demo account will be created with random follower counts
4. Test all features: sync, disconnect, etc.

## Getting OAuth Credentials

See [OAUTH_SETUP.md](OAUTH_SETUP.md) for detailed instructions on obtaining:
- Instagram App ID & Secret
- Facebook App ID & Secret  
- Google Client ID & Secret

## Database Schema

### SocialAccount Model

```javascript
{
  userId: ObjectId,              // Reference to User
  platform: String,              // 'instagram', 'facebook', 'youtube'
  platformUserId: String,        // Platform-specific user ID
  username: String,              // Display name
  accessToken: String,           // OAuth access token
  refreshToken: String,          // OAuth refresh token (YouTube only)
  profilePicture: String,        // Profile image URL
  followers: Number,             // Follower/subscriber count
  lastSynced: Date,             // Last sync timestamp
  isActive: Boolean,            // Account active status
  createdAt: Date               // Creation timestamp
}
```

## Troubleshooting

### Issue: "Popup blocked"
**Solution:** Enable popups for localhost in browser settings

### Issue: "Failed to connect account"
**Solution:** 
- Verify OAuth credentials in `.env` file
- Check redirect URIs match exactly
- Ensure platform APIs are enabled

### Issue: "No channel found" (YouTube)
**Solution:** Make sure the Google account has a YouTube channel

### Issue: Follower count shows 0
**Solution:** 
- Check API permissions/scopes
- Verify account has public follower count
- Click "Sync Now" to refresh

## Security Best Practices

- ✅ Never commit `.env` file to Git
- ✅ Use HTTPS in production for redirect URIs
- ✅ Rotate API keys regularly
- ✅ Implement rate limiting
- ✅ Store tokens securely (encrypted in database)
- ✅ Validate all OAuth callbacks

## Future Enhancements

- [ ] Token refresh automation
- [ ] More platforms (TikTok, Twitter, LinkedIn)
- [ ] Analytics and engagement metrics
- [ ] Historical follower growth charts
- [ ] Automated posting capabilities
- [ ] Content performance tracking

## Support

For detailed OAuth setup instructions, see [OAUTH_SETUP.md](OAUTH_SETUP.md)

For issues or questions:
1. Check the troubleshooting section above
2. Review platform-specific documentation
3. Check browser console for errors
