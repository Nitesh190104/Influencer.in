# Social Media API Credentials Quick Reference

## Where to Get Each Credential

### Instagram
- **Platform:** Facebook Developers
- **URL:** https://developers.facebook.com
- **Navigate to:** Your App → Products → Instagram Basic Display
- **Get:**
  - Instagram App ID → Use as `INSTAGRAM_CLIENT_ID`
  - Instagram App Secret → Use as `INSTAGRAM_CLIENT_SECRET`

### Facebook  
- **Platform:** Facebook Developers
- **URL:** https://developers.facebook.com
- **Navigate to:** Your App → Settings → Basic
- **Get:**
  - App ID → Use as `FACEBOOK_CLIENT_ID`
  - App Secret → Use as `FACEBOOK_CLIENT_SECRET`

### YouTube
- **Platform:** Google Cloud Console
- **URL:** https://console.cloud.google.com
- **Navigate to:** Your Project → APIs & Services → Credentials
- **Get:**
  - OAuth 2.0 Client ID → Use as `GOOGLE_CLIENT_ID`
  - Client Secret → Use as `GOOGLE_CLIENT_SECRET`

## .env Template

Copy this to your `backend/.env` file and replace with your actual values:

```env
# Server Configuration
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development

# Email Configuration (for OTP)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password_here

# Instagram OAuth (via Facebook Developers)
INSTAGRAM_CLIENT_ID=your_instagram_app_id_here
INSTAGRAM_CLIENT_SECRET=your_instagram_app_secret_here
INSTAGRAM_REDIRECT_URI=http://localhost:3000/auth/instagram/callback

# Facebook OAuth (via Facebook Developers)
FACEBOOK_CLIENT_ID=your_facebook_app_id_here
FACEBOOK_CLIENT_SECRET=your_facebook_app_secret_here
FACEBOOK_REDIRECT_URI=http://localhost:3000/auth/facebook/callback

# YouTube OAuth (via Google Cloud Console)
GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
YOUTUBE_REDIRECT_URI=http://localhost:3000/auth/youtube/callback
```

## Production URLs

When deploying to production, update redirect URIs:

```env
# Production Redirect URIs
INSTAGRAM_REDIRECT_URI=https://yourdomain.com/auth/instagram/callback
FACEBOOK_REDIRECT_URI=https://yourdomain.com/auth/facebook/callback
YOUTUBE_REDIRECT_URI=https://yourdomain.com/auth/youtube/callback
```

## Testing Without Full Setup

If you want to test the app without setting up OAuth:
1. The system will show error messages indicating OAuth is not configured
2. Follow the detailed setup guide in `SOCIAL_OAUTH_SETUP_GUIDE.md`
3. Each platform takes 10-15 minutes to set up

## Quick Setup Order

1. **Start with Facebook** (covers both Facebook and Instagram)
   - Create one app
   - Add both Facebook Login and Instagram Basic Display products
   - Get credentials for both

2. **Then YouTube/Google**
   - Create Google Cloud project
   - Enable YouTube Data API
   - Create OAuth credentials

3. **Update .env and restart backend**
   ```bash
   cd backend
   node server.js
   ```

4. **Test each platform connection** in the app

## Common Issues

| Error | Solution |
|-------|----------|
| "OAuth not configured" | Add credentials to .env file |
| "Redirect URI mismatch" | Check redirect URI matches in platform settings |
| "Invalid credentials" | Verify no extra spaces, copy correctly |
| Changes not working | Restart backend server after .env changes |

## Next Steps

1. ✅ Add credentials to `.env` file
2. ✅ Restart backend server
3. ✅ Refresh frontend
4. ✅ Test connections
5. ✅ See real data from your social accounts!
