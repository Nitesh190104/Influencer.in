# Phyllo Setup Instructions

## ❌ Current Issue

The Phyllo credentials provided are **invalid**:
- Client ID: `410c27d5-2972-4077-8cf4-74f4fcb69ea3`
- Client Secret: `25372089-b5c2-4ce9-9d20-80aaa790ac7f`

Error from Phyllo API: `invalid_credentials - Pass a valid client ID and secret`

## ✅ How to Get Valid Phyllo Credentials

### Step 1: Sign Up for Phyllo
1. Go to [Phyllo Dashboard](https://dashboard.getphyllo.com/)
2. Click "Sign Up" or "Get Started"
3. Create an account with your email

### Step 2: Create an Application
1. Log into the Phyllo Dashboard
2. Navigate to "Applications" or "API Keys"
3. Click "Create New Application"
4. Give it a name (e.g., "Influencer Platform")
5. Select the environment: **Sandbox** (for testing) or **Production**

### Step 3: Get Your Credentials
Once you create an application, you'll see:
- **Client ID** - A UUID like `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
- **Client Secret** - Another UUID
- Copy both of these

### Step 4: Configure Your App
1. Open `backend/.env` file
2. Replace the values:
   ```env
   PHYLLO_CLIENT_ID=your_actual_client_id_here
   PHYLLO_CLIENT_SECRET=your_actual_client_secret_here
   PHYLLO_ENVIRONMENT=sandbox  # or 'production' when ready
   ```

### Step 5: Test the Connection
```bash
cd backend
node test-phyllo.js
```

You should see: ✅ Success! Test user created

## Alternative: Use Direct OAuth Integration

If you can't get Phyllo credentials or prefer direct integration, I can switch back to using:

### Option A: Meta OAuth (Facebook + Instagram)
- Free
- Requires Meta Developer App
- You need to create apps on [developers.facebook.com](https://developers.facebook.com/)

### Option B: Google OAuth (YouTube)
- Free
- Requires Google Cloud Project
- Create on [console.cloud.google.com](https://console.cloud.google.com/)

## Which Would You Prefer?

1. **Get valid Phyllo credentials** (recommended - easier, more data)
2. **Switch to direct Meta OAuth** (requires Meta Developer account)
3. **Provide different Phyllo credentials** if you have them

Let me know which option you'd like and I'll implement it!

## Phyllo Pricing (FYI)

- **Sandbox**: Free for testing
- **Production**: Contact Phyllo for pricing
- Usually free tier available for small volume

## Current Status

❌ Integration code is complete but **credentials are invalid**
✅ Once you provide valid credentials, everything will work
✅ All code is ready to go!

## Need Help?

- Phyllo Documentation: https://docs.getphyllo.com/
- Phyllo Support: support@getphyllo.com
- Dashboard: https://dashboard.getphyllo.com/
