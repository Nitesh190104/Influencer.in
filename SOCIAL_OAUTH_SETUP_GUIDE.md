# Real Social Media OAuth Integration Guide

This guide explains how to set up real OAuth authentication for Instagram, Facebook, and YouTube to fetch actual user data.

## Overview

The system is now configured to connect with **real social media accounts** using OAuth 2.0. This allows:
- ✅ Real-time follower counts
- ✅ Profile information (username, profile picture)
- ✅ Account verification
- ✅ Automatic data syncing

## Setup Instructions

### Step 1: Instagram OAuth Setup

Instagram uses Facebook's OAuth system.

1. **Create a Facebook App:**
   - Go to [Facebook Developers](https://developers.facebook.com)
   - Click "My Apps" → "Create App"
   - Select "Consumer" or "Business" type
   - Fill in app details

2. **Add Instagram Basic Display:**
   - In your app dashboard, click "Add Product"
   - Find "Instagram Basic Display" and click "Set Up"
   - Click "Create New App" in the Instagram Basic Display section
   - Fill in required fields

3. **Configure OAuth Settings:**
   - In Instagram Basic Display settings, go to "Basic Display"
   - Add OAuth Redirect URIs:
     - Development: `http://localhost:3000/auth/instagram/callback`
     - Production: `https://yourdomain.com/auth/instagram/callback`
   - Add Deauthorize and Data Deletion callback URLs (can be same as redirect)

4. **Get Your Credentials:**
   - Copy the **Instagram App ID** and **Instagram App Secret**
   - Update your backend `.env` file:
     ```env
     INSTAGRAM_CLIENT_ID=your_instagram_app_id_here
     INSTAGRAM_CLIENT_SECRET=your_instagram_app_secret_here
     INSTAGRAM_REDIRECT_URI=http://localhost:3000/auth/instagram/callback
     ```

5. **Test Users:**
   - In Instagram Basic Display → "User Token Generator"
   - Add Instagram test users (your Instagram account)
   - Test users can authorize the app before public review

**Permissions Requested:**
- `user_profile` - Basic profile information
- `user_media` - Access to user's media

### Step 2: Facebook OAuth Setup

1. **Create/Use Existing Facebook App:**
   - Go to [Facebook Developers](https://developers.facebook.com)
   - Use the same app from Instagram or create a new one

2. **Add Facebook Login Product:**
   - In app dashboard, click "Add Product"
   - Find "Facebook Login" and click "Set Up"
   - Choose "Web" as platform

3. **Configure OAuth Settings:**
   - Go to Facebook Login → Settings
   - Add Valid OAuth Redirect URIs:
     - Development: `http://localhost:3000/auth/facebook/callback`
     - Production: `https://yourdomain.com/auth/facebook/callback`

4. **Get Your Credentials:**
   - Go to Settings → Basic
   - Copy **App ID** and **App Secret**
   - Update your backend `.env` file:
     ```env
     FACEBOOK_CLIENT_ID=your_facebook_app_id_here
     FACEBOOK_CLIENT_SECRET=your_facebook_app_secret_here
     FACEBOOK_REDIRECT_URI=http://localhost:3000/auth/facebook/callback
     ```

5. **App Review:**
   - For production, submit your app for review
   - Request permissions: `public_profile`, `pages_read_engagement`

**Permissions Requested:**
- `public_profile` - Basic profile information
- `pages_read_engagement` - Page follower counts
- `pages_show_list` - List of pages managed

### Step 3: YouTube OAuth Setup

YouTube uses Google Cloud Platform for OAuth.

1. **Create a Google Cloud Project:**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Click "Select a project" → "New Project"
   - Enter project name and create

2. **Enable YouTube Data API:**
   - In your project, go to "APIs & Services" → "Library"
   - Search for "YouTube Data API v3"
   - Click on it and click "Enable"

3. **Create OAuth Credentials:**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - If prompted, configure OAuth consent screen:
     - User Type: External
     - Fill in app information
     - Add scopes: `../auth/youtube.readonly`
     - Add test users (your Google account)
   - Select Application type: "Web application"
   - Add name for your OAuth client
   - Authorized redirect URIs:
     - Development: `http://localhost:3000/auth/youtube/callback`
     - Production: `https://yourdomain.com/auth/youtube/callback`

4. **Get Your Credentials:**
   - Copy the **Client ID** and **Client Secret**
   - Update your backend `.env` file:
     ```env
     GOOGLE_CLIENT_ID=your_google_client_id_here
     GOOGLE_CLIENT_SECRET=your_google_client_secret_here
     YOUTUBE_REDIRECT_URI=http://localhost:3000/auth/youtube/callback
     ```

5. **OAuth Consent Screen:**
   - While in testing mode, only test users can authorize
   - For production, submit for verification
   - Request scope: `https://www.googleapis.com/auth/youtube.readonly`

**Permissions Requested:**
- `youtube.readonly` - Read-only access to YouTube account information

### Step 4: Update Backend Configuration

Edit `backend/.env` file with all your credentials:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

# Instagram (via Facebook)
INSTAGRAM_CLIENT_ID=your_instagram_app_id_here
INSTAGRAM_CLIENT_SECRET=your_instagram_app_secret_here
INSTAGRAM_REDIRECT_URI=http://localhost:3000/auth/instagram/callback

# Facebook
FACEBOOK_CLIENT_ID=your_facebook_app_id_here
FACEBOOK_CLIENT_SECRET=your_facebook_app_secret_here
FACEBOOK_REDIRECT_URI=http://localhost:3000/auth/facebook/callback

# YouTube (via Google)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
YOUTUBE_REDIRECT_URI=http://localhost:3000/auth/youtube/callback
```

### Step 5: Test the Integration

1. **Start Backend Server:**
   ```bash
   cd backend
   node server.js
   ```

2. **Start Frontend:**
   ```bash
   cd frontend
   npm start
   ```

3. **Test OAuth Flow:**
   - Login as an influencer
   - Go to Dashboard
   - Click "Connect Instagram/Facebook/YouTube"
   - You'll be redirected to the platform's authorization page
   - Grant permissions
   - You'll be redirected back with account connected
   - Your follower count and profile info will be displayed

## How It Works

### OAuth Flow:

1. **User Initiates Connection:**
   - User clicks "Connect [Platform]" button
   - Frontend requests OAuth URL from backend
   - Backend generates authorization URL with client ID and scopes

2. **Authorization:**
   - User is redirected to platform's authorization page
   - User grants permissions to access their data
   - Platform redirects back to callback URL with authorization code

3. **Token Exchange:**
   - Callback page sends code to backend
   - Backend exchanges code for access token
   - Backend uses access token to fetch user data

4. **Data Storage:**
   - Backend saves: username, follower count, access token
   - Access token is stored securely for future syncing
   - User can disconnect account anytime

### Data Fetched:

**Instagram:**
- Username
- User ID
- Follower count
- Profile type (business/creator/personal)

**Facebook:**
- Name
- User ID
- Profile picture
- Follower count (for pages)

**YouTube:**
- Channel name
- Channel ID
- Subscriber count
- Channel thumbnail
- Refresh token (for long-term access)

## Security Considerations

1. **Environment Variables:**
   - Never commit `.env` file to version control
   - Keep API secrets secure
   - Use different credentials for dev/prod

2. **Token Storage:**
   - Access tokens are stored encrypted in MongoDB
   - Tokens are not exposed in API responses
   - Use HTTPS in production

3. **Scopes:**
   - Only request minimal required permissions
   - Users can see what permissions you request
   - Explain why each permission is needed

4. **Token Refresh:**
   - Implement token refresh for expired tokens
   - YouTube provides refresh tokens
   - Instagram/Facebook tokens need manual refresh

## Troubleshooting

### "OAuth not configured" error:
- Check that credentials are added to `.env` file
- Restart backend server after updating `.env`
- Verify credentials are correct (no extra spaces)

### "Redirect URI mismatch":
- Ensure redirect URI in code matches platform settings
- Check for http vs https
- Verify port numbers match

### "Invalid Client ID":
- Double-check App ID / Client ID is correct
- Ensure app is not in development mode restrictions
- Verify API is enabled (for YouTube)

### "Insufficient Permissions":
- Check requested scopes are approved
- Ensure test user is added (for development mode)
- Verify app review is completed (for production)

### Popup blocked:
- Allow popups for your domain in browser settings
- Check browser console for errors

## Production Checklist

Before deploying to production:

- [ ] All credentials configured in production `.env`
- [ ] OAuth redirect URIs updated to production URLs
- [ ] Apps submitted for review and approved
- [ ] HTTPS enabled for all redirect URIs
- [ ] Privacy policy and terms of service URLs added
- [ ] Data deletion callback implemented
- [ ] Token refresh mechanism implemented
- [ ] Error handling and user feedback improved
- [ ] Rate limiting implemented for API calls
- [ ] Logging and monitoring set up

## Support

For API-specific issues:
- [Facebook Developer Docs](https://developers.facebook.com/docs/)
- [Instagram Basic Display Docs](https://developers.facebook.com/docs/instagram-basic-display-api)
- [YouTube Data API Docs](https://developers.google.com/youtube/v3)
- [Google OAuth 2.0 Docs](https://developers.google.com/identity/protocols/oauth2)

For this application:
- Check `backend/controllers/socialAccountController.js` for OAuth implementation
- Check `frontend/src/components/SocialConnect.js` for frontend integration
- Review console logs for detailed error messages
