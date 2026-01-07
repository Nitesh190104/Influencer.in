# Google OAuth Setup Guide

This guide will help you set up Google OAuth for influencer sign-up functionality.

## Steps to Configure Google OAuth

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API (or Google Identity API)

### 2. Create OAuth 2.0 Credentials

1. Navigate to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth client ID**
3. Select **Web application**
4. Configure the OAuth consent screen if prompted:
   - User type: External
   - App name: Your app name
   - User support email: Your email
   - Developer contact email: Your email

### 3. Configure OAuth Client

**Authorized JavaScript origins:**
```
http://localhost:3000
http://localhost:5000
```

**Authorized redirect URIs:**
```
http://localhost:5000/api/auth/google/callback
```

### 4. Get Credentials

After creating the OAuth client, you'll receive:
- **Client ID** (e.g., `123456789-abc...xyz.apps.googleusercontent.com`)
- **Client Secret** (e.g., `GOCSPX-abc...xyz`)

### 5. Update Backend .env File

Add these variables to `backend/.env`:

```env
GOOGLE_CLIENT_ID=your_actual_client_id_here
GOOGLE_CLIENT_SECRET=your_actual_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback
FRONTEND_URL=http://localhost:3000
```

### 6. Test the Integration

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend:
   ```bash
   cd frontend
   npm start
   ```

3. Go to the signup page and select "Influencer"
4. Click "Signup with Google"
5. You should be redirected to Google's login page
6. After authentication, you'll be redirected back and logged in

## Important Notes

- Google OAuth is **only enabled for Influencer sign-up**, not for Brands
- Users who sign up with Google have their email pre-verified
- Phone numbers can be collected separately after OAuth login
- For production, update the authorized origins and redirect URIs to your production domain

## Troubleshooting

### "Google OAuth not configured" error
- Check that `GOOGLE_CLIENT_ID` is set in your `.env` file
- Restart the backend server after updating `.env`

### Redirect URI mismatch error
- Ensure the redirect URI in Google Cloud Console exactly matches the one in your `.env` file
- Include the full URL including `http://` or `https://`

### "Access blocked" error
- Make sure your OAuth consent screen is properly configured
- Add test users if your app is in testing mode

## Security Considerations

- Never commit your `.env` file with real credentials to Git
- Keep your Client Secret confidential
- Use different credentials for development and production
- Regularly rotate your credentials
