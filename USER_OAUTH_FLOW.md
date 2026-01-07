# User-Based OAuth Flow

## Overview
Each user can now connect their social media accounts by providing their own OAuth credentials. This gives users full control over their API apps and data.

## How It Works

### For Users (Influencers)

1. **Click Connect Button**
   - Navigate to your dashboard
   - Click "Connect Instagram", "Connect Facebook", or "Connect YouTube"

2. **Enter OAuth Credentials**
   - A modal will appear asking for:
     - **App ID** (Client ID)
     - **App Secret** (Client Secret)
   - The Redirect URI is automatically provided

3. **Get Your Credentials**
   - **Instagram/Facebook**: Visit [Facebook Developers](https://developers.facebook.com/apps/)
   - **YouTube**: Visit [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   - Create a new app or use an existing one
   - Copy the App ID and App Secret
   - Add the provided Redirect URI to your app settings

4. **Authorize Your Account**
   - After entering credentials, you'll be redirected to the platform's authorization page
   - Login with your social media account
   - Grant the requested permissions
   - You'll be redirected back with your account connected

### Security

- ✅ Your credentials are encrypted in transit
- ✅ Credentials are encoded in the OAuth state parameter
- ✅ Only you have access to your API credentials
- ✅ You maintain full control over your connected accounts
- ✅ You can revoke access at any time from the platform's settings

### Data Collected

**Instagram:**
- Username
- Profile information
- Follower count
- Media posts

**Facebook:**
- Profile name
- Profile picture
- Follower count (if public)
- Page information

**YouTube:**
- Channel name
- Subscriber count
- Video statistics
- Channel analytics

## Developer Setup

### Instagram/Facebook App Setup

1. Go to https://developers.facebook.com/apps/
2. Create a new app (choose "Business" type)
3. Add "Instagram Basic Display" or "Facebook Login" product
4. Configure OAuth settings:
   - **Valid OAuth Redirect URIs**: `http://localhost:3000/auth/instagram/callback`
   - **Client OAuth Login**: Enabled
5. Copy your App ID and App Secret

### YouTube App Setup

1. Go to https://console.cloud.google.com/
2. Create a new project or select existing
3. Enable YouTube Data API v3
4. Go to Credentials → Create OAuth 2.0 Client ID
5. Configure OAuth consent screen
6. Add authorized redirect URI: `http://localhost:3000/auth/youtube/callback`
7. Copy your Client ID and Client Secret

## Technical Flow

```
User clicks Connect
    ↓
Modal opens for credentials
    ↓
User enters App ID & Secret
    ↓
System generates OAuth URL with credentials in state parameter
    ↓
User redirects to platform (Instagram/Facebook/YouTube)
    ↓
User authorizes the app
    ↓
Platform redirects back with authorization code
    ↓
System exchanges code for access token using credentials from state
    ↓
System fetches user profile and follower data
    ↓
Account saved to database
    ↓
User sees connected account in dashboard
```

## Benefits

### For Users
- Full control over API credentials
- No dependency on admin configuration
- Can use personal developer accounts
- Better privacy and data control

### For Platform
- No need to manage shared OAuth credentials
- Reduced API rate limit concerns (each user has their own)
- Users can scale independently
- Easier compliance with platform policies

## Troubleshooting

### "Failed to generate authorization URL"
- Check that your App ID and Secret are correct
- Ensure you've added the Redirect URI to your app settings
- Verify your app is in "Live" mode (not Development)

### "OAuth error: redirect_uri_mismatch"
- The Redirect URI in your app settings must exactly match
- Use: `http://localhost:3000/auth/instagram/callback` (for Instagram)
- Use: `http://localhost:3000/auth/facebook/callback` (for Facebook)
- Use: `http://localhost:3000/auth/youtube/callback` (for YouTube)

### "Access token expired"
- Re-authorize your account from the dashboard
- Some platforms require periodic re-authorization

## Production Deployment

When deploying to production:

1. Update Redirect URIs in your apps:
   - Change from `http://localhost:3000` to `https://yourdomain.com`

2. Each user will need to update their app settings with production URIs

3. Consider implementing token refresh for long-lived access

## API Endpoints

- `POST /api/social-accounts/oauth/:platform/url` - Get OAuth URL with credentials
- `POST /api/social-accounts/oauth/instagram/callback` - Instagram callback
- `POST /api/social-accounts/oauth/facebook/callback` - Facebook callback
- `POST /api/social-accounts/oauth/youtube/callback` - YouTube callback
