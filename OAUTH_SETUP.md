# Social Media OAuth Setup Guide

This guide will help you set up OAuth authentication for Instagram, Facebook, and YouTube.

## Demo Mode

For testing purposes, you can use **Demo Mode** which simulates social account connections with random follower counts. Click "Cancel" when prompted for OAuth to use demo mode.

## Production Setup

To enable real OAuth authentication, follow these steps:

### 1. Instagram Setup

Instagram uses Facebook's platform for authentication.

1. Go to [Facebook Developers](https://developers.facebook.com)
2. Create a new app or select an existing one
3. Add "Instagram Basic Display" product
4. Configure OAuth redirect URIs:
   - Add: `http://localhost:3000/auth/instagram/callback`
   - For production: `https://yourdomain.com/auth/instagram/callback`
5. Copy your **App ID** and **App Secret**
6. Update `.env` file:
   ```
   INSTAGRAM_CLIENT_ID=your_app_id
   INSTAGRAM_CLIENT_SECRET=your_app_secret
   INSTAGRAM_REDIRECT_URI=http://localhost:3000/auth/instagram/callback
   ```

**Required Permissions:**
- `user_profile`
- `user_media`

### 2. Facebook Setup

1. Go to [Facebook Developers](https://developers.facebook.com)
2. Create a new app or select an existing one
3. Add "Facebook Login" product
4. Configure OAuth redirect URIs:
   - Add: `http://localhost:3000/auth/facebook/callback`
   - For production: `https://yourdomain.com/auth/facebook/callback`
5. Copy your **App ID** and **App Secret**
6. Update `.env` file:
   ```
   FACEBOOK_CLIENT_ID=your_app_id
   FACEBOOK_CLIENT_SECRET=your_app_secret
   FACEBOOK_REDIRECT_URI=http://localhost:3000/auth/facebook/callback
   ```

**Required Permissions:**
- `public_profile`
- `pages_read_engagement`
- `pages_show_list`

### 3. YouTube Setup

YouTube uses Google OAuth for authentication.

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable YouTube Data API v3:
   - Go to "APIs & Services" > "Library"
   - Search for "YouTube Data API v3"
   - Click "Enable"
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Application type: "Web application"
   - Add authorized redirect URI: `http://localhost:3000/auth/youtube/callback`
   - For production: `https://yourdomain.com/auth/youtube/callback`
5. Copy your **Client ID** and **Client Secret**
6. Update `.env` file:
   ```
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   YOUTUBE_REDIRECT_URI=http://localhost:3000/auth/youtube/callback
   ```

**Required Scopes:**
- `https://www.googleapis.com/auth/youtube.readonly`

## Frontend Configuration

Update the OAuth configuration in `/frontend/src/components/SocialConnect.js`:

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

## Testing

1. Start the backend server:
   ```bash
   cd backend
   npm install axios
   npm run dev
   ```

2. Start the frontend:
   ```bash
   cd frontend
   npm start
   ```

3. Navigate to the Influencer Dashboard
4. Click on "Connect Instagram/Facebook/YouTube"
5. Choose Demo Mode or authenticate with real credentials

## Security Notes

- Never commit `.env` files to version control
- Use environment variables for all sensitive credentials
- In production, use HTTPS for all redirect URIs
- Regularly rotate your API keys and secrets
- Implement token refresh logic for long-term access

## Troubleshooting

### "Popup blocked" error
- Allow popups for localhost in your browser settings

### "Authorization failed" error
- Check that your redirect URIs match exactly in both the platform config and your code
- Ensure all required permissions/scopes are requested
- Verify your Client ID and Secret are correct

### "No channel found" (YouTube)
- Make sure the Google account has an associated YouTube channel
- Check that the YouTube Data API is enabled in Google Cloud Console

## API Rate Limits

- **Instagram**: 200 calls per hour per user
- **Facebook**: 200 calls per hour per user
- **YouTube**: 10,000 quota units per day

## Support

For more detailed documentation:
- [Instagram Basic Display API](https://developers.facebook.com/docs/instagram-basic-display-api)
- [Facebook Graph API](https://developers.facebook.com/docs/graph-api)
- [YouTube Data API](https://developers.google.com/youtube/v3)
