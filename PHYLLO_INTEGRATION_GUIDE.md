# Phyllo Integration Guide

## Overview
This application uses Phyllo to handle social media OAuth connections for Facebook, Instagram, and YouTube. Phyllo provides a unified API for connecting social accounts and fetching follower counts, posts, likes, and engagement data.

## Phyllo Credentials
- **Client ID**: `410c27d5-2972-4077-8cf4-74f4fcb69ea3`
- **Client Secret**: `25372089-b5c2-4ce9-9d20-80aaa790ac7f`
- **Environment**: Production
- **SDK Version**: v2

## Architecture

### Backend Integration
The backend uses Phyllo's REST API to:
1. Create Phyllo users mapped to your platform users
2. Generate SDK tokens for frontend authentication
3. Fetch account data after connection
4. Sync follower counts, engagement metrics, and profile data

### Frontend Integration
The frontend uses Phyllo Connect SDK to:
1. Display platform connection UI
2. Handle OAuth flows seamlessly
3. Return account IDs after successful connection

## Setup Instructions

### 1. Environment Variables
Already configured in `backend/.env`:
```env
PHYLLO_CLIENT_ID=410c27d5-2972-4077-8cf4-74f4fcb69ea3
PHYLLO_CLIENT_SECRET=25372089-b5c2-4ce9-9d20-80aaa790ac7f
PHYLLO_ENVIRONMENT=production
PHYLLO_REDIRECT_URI=http://localhost:3000/auth/phyllo/callback
```

### 2. Phyllo SDK
The Phyllo Connect SDK is loaded via CDN in `frontend/public/index.html`:
```html
<script src="https://cdn.getphyllo.com/connect/v2/phyllo-connect.js"></script>
```

## User Flow

### 1. User Clicks "Connect Instagram/Facebook/YouTube"
- Frontend calls: `GET /api/social-accounts/oauth/:platform/url`
- Backend creates a Phyllo user (or retrieves existing)
- Backend generates an SDK token
- Backend returns: `{ sdkToken, phylloUserId, platform }`

### 2. Phyllo SDK Opens
- Frontend initializes Phyllo Connect with the SDK token
- Phyllo displays platform-specific OAuth screen
- User logs into their social media account
- User authorizes data sharing

### 3. Account Connected
- Phyllo SDK fires `accountConnected` event with `accountId`
- Frontend sends callback: `POST /api/social-accounts/oauth/phyllo/callback`
- Backend fetches account data from Phyllo API:
  - Profile information
  - Follower count
  - Engagement metrics
  - Posts, likes, etc.
- Backend saves to MongoDB `SocialAccount` collection

### 4. Data Syncing
- Users can manually sync: `POST /api/social-accounts/sync`
- Backend fetches latest data from Phyllo API
- Updates follower counts, engagement rates, etc.

## API Endpoints

### Get OAuth URL (Initialize Connection)
```
GET /api/social-accounts/oauth/:platform/url
Authorization: Bearer <token>

Response:
{
  "success": true,
  "sdkToken": "sdk_token_here",
  "phylloUserId": "phyllo_user_id",
  "platform": "INSTAGRAM|FACEBOOK|YOUTUBE",
  "redirectUrl": "http://localhost:3000/auth/phyllo/callback"
}
```

### Handle Phyllo Callback
```
POST /api/social-accounts/oauth/phyllo/callback
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "accountId": "phyllo_account_id",
  "userId": "phyllo_user_id",
  "platform": "instagram"
}

Response:
{
  "success": true,
  "message": "Instagram account connected successfully",
  "data": {
    "platform": "instagram",
    "username": "@johndoe",
    "followers": 12500,
    "metadata": {
      "fullName": "John Doe",
      "bio": "Content creator",
      "profilePicture": "https://...",
      "posts": 150,
      "following": 500,
      "engagement_rate": 4.5,
      "isVerified": false
    }
  }
}
```

### Get Connected Accounts
```
GET /api/social-accounts
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": [
    {
      "platform": "instagram",
      "username": "@johndoe",
      "followers": 12500,
      "metadata": {...},
      "lastSynced": "2025-12-30T10:00:00Z"
    }
  ]
}
```

### Sync Accounts
```
POST /api/social-accounts/sync
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Social accounts synced",
  "data": [
    {
      "platform": "instagram",
      "username": "@johndoe",
      "followers": 12650,
      "synced": true
    }
  ]
}
```

### Disconnect Account
```
DELETE /api/social-accounts/disconnect/:platform
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "instagram account disconnected successfully"
}
```

## Phyllo API Endpoints Used

### 1. Get Access Token
```
POST https://api.getphyllo.com/v1/token
Body:
{
  "client_id": "410c27d5-2972-4077-8cf4-74f4fcb69ea3",
  "client_secret": "25372089-b5c2-4ce9-9d20-80aaa790ac7f"
}
```

### 2. Create/Get User
```
POST https://api.getphyllo.com/v1/users
Authorization: Bearer <phyllo_access_token>
Body:
{
  "name": "User Name",
  "external_id": "your_user_id"
}
```

### 3. Generate SDK Token
```
POST https://api.getphyllo.com/v1/sdk-tokens
Authorization: Bearer <phyllo_access_token>
Body:
{
  "user_id": "phyllo_user_id",
  "products": ["IDENTITY", "ENGAGEMENT", "INCOME"]
}
```

### 4. Get Account Details
```
GET https://api.getphyllo.com/v1/accounts/:accountId
Authorization: Bearer <phyllo_access_token>
```

### 5. Get Profile Data
```
GET https://api.getphyllo.com/v1/profiles?account_id=:accountId
Authorization: Bearer <phyllo_access_token>
```

### 6. Get Follower Count
```
GET https://api.getphyllo.com/v1/audience/follower_count?account_id=:accountId
Authorization: Bearer <phyllo_access_token>
```

## Database Schema

### SocialAccount Model
```javascript
{
  userId: ObjectId,              // Reference to User
  platform: String,              // 'instagram', 'facebook', 'youtube'
  platformUserId: String,        // Platform's user ID
  username: String,              // @username or channel name
  accessToken: String,           // Phyllo account ID (stored as accessToken)
  phylloAccountId: String,       // Phyllo account ID
  phylloUserId: String,          // Phyllo user ID
  followers: Number,             // Follower/subscriber count
  email: String,                 // User's email (if available)
  profilePicture: String,        // Profile image URL
  metadata: {
    fullName: String,
    bio: String,
    posts: Number,
    following: Number,
    engagement_rate: Number,
    isVerified: Boolean
  },
  lastSynced: Date,
  isActive: Boolean
}
```

## Data Available from Phyllo

### Profile Data (IDENTITY Product)
- Full name
- Username
- Bio/description
- Profile picture URL
- Email (if shared)
- Verification status
- Account type

### Engagement Data (ENGAGEMENT Product)
- Follower count
- Following count
- Media/post count
- Engagement rate
- Average likes per post
- Average comments per post
- Reach and impressions

### Content Data
- Recent posts/videos
- Post captions
- Post timestamps
- Likes, comments, shares per post
- Media URLs

### Income Data (INCOME Product)
- Estimated earnings (where available)
- Revenue metrics
- Monetization status

## Supported Platforms

| Platform  | Work Platform ID | Features Available                          |
|-----------|------------------|---------------------------------------------|
| Instagram | INSTAGRAM        | Profile, Followers, Posts, Engagement       |
| Facebook  | FACEBOOK         | Profile, Followers (Pages), Posts, Insights |
| YouTube   | YOUTUBE          | Channel info, Subscribers, Videos, Analytics|

## Testing

### Test Account Connection
1. Log into the application as an influencer
2. Navigate to Dashboard
3. Click "Connect Instagram/Facebook/YouTube"
4. Phyllo modal opens
5. Log into your social media account
6. Authorize data sharing
7. Check dashboard for updated follower count

### Test Data Sync
1. After connecting an account
2. Click "Sync Accounts" button
3. Backend fetches latest data from Phyllo
4. Follower counts and metadata update

## Error Handling

### Common Errors
- **Token Expired**: SDK token is valid for 1 hour. Generate new token if expired.
- **Account Not Found**: User hasn't connected the account yet.
- **Rate Limiting**: Phyllo has rate limits. Implement caching and avoid excessive syncing.
- **Platform Down**: Handle cases where social media platform APIs are unavailable.

### Error Messages
All endpoints return consistent error format:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Technical error details"
}
```

## Security Considerations

1. **Never expose Client Secret**: Keep in backend only
2. **Validate User Sessions**: Always verify JWT before generating SDK tokens
3. **Use HTTPS**: In production, all API calls must use HTTPS
4. **Store Tokens Securely**: Encrypt sensitive data in database
5. **Implement Rate Limiting**: Prevent abuse of OAuth endpoints

## Production Deployment

### 1. Update Environment Variables
```env
PHYLLO_ENVIRONMENT=production
PHYLLO_REDIRECT_URI=https://yourdomain.com/auth/phyllo/callback
NODE_ENV=production
```

### 2. Update Frontend
- Update API base URL to production backend
- Ensure Phyllo SDK loads over HTTPS

### 3. Configure CORS
Update `server.js`:
```javascript
app.use(cors({
  origin: 'https://yourdomain.com',
  credentials: true
}));
```

### 4. Session Configuration
```javascript
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,  // HTTPS only
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000
  }
}));
```

## Monitoring & Analytics

### Recommended Metrics
- Connection success rate per platform
- Data sync frequency
- API response times
- Error rates by type
- Token expiration rates

### Phyllo Dashboard
Access your Phyllo dashboard at: https://dashboard.getphyllo.com
- View connected accounts
- Monitor API usage
- Check rate limits
- Review error logs

## Support

### Phyllo Documentation
- API Docs: https://docs.getphyllo.com
- SDK Docs: https://docs.getphyllo.com/docs/frontend-sdks
- Support: support@getphyllo.com

### Implementation Support
For questions about this integration:
1. Check this guide first
2. Review Phyllo API documentation
3. Check console logs for error details
4. Contact development team

## Changelog

### v1.0 (December 2025)
- Initial Phyllo integration
- Support for Instagram, Facebook, YouTube
- Profile and engagement data fetching
- Manual sync functionality
- Account disconnect feature
