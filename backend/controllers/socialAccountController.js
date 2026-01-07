const SocialAccount = require('../models/SocialAccount');
const OAuthConfig = require('../models/OAuthConfig');
const axios = require('axios');

// Phyllo API Configuration
const PHYLLO_ENVIRONMENT = process.env.PHYLLO_ENVIRONMENT || 'sandbox';
const PHYLLO_BASE_URL = 'https://api.staging.getphyllo.com/v1';
const PHYLLO_CLIENT_ID = process.env.PHYLLO_CLIENT_ID;
const PHYLLO_CLIENT_SECRET = process.env.PHYLLO_CLIENT_SECRET;

// Helper function to make authenticated Phyllo API calls
async function makePhylloRequest(method, endpoint, data = null) {
  try {
    // Basic Auth: Base64 encode "client_id:client_secret"
    const authString = `${PHYLLO_CLIENT_ID}:${PHYLLO_CLIENT_SECRET}`;
    const base64Auth = Buffer.from(authString).toString('base64');

    const config = {
      method,
      url: `${PHYLLO_BASE_URL}${endpoint}`,
      headers: {
        'Authorization': `Basic ${base64Auth}`,
        'Content-Type': 'application/json'
      }
    };

    if (data) {
      config.data = data;
    }

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(`Phyllo API Error [${method} ${endpoint}]:`, error.response?.data || error.message);
    throw error;
  }
}

// Get OAuth URL for a platform using Phyllo
exports.getOAuthUrl = async (req, res) => {
  try {
    const { platform } = req.params;

    console.log(`[Phyllo] Initiating connection for platform: ${platform}`);

    // Check if Phyllo is configured
    if (!PHYLLO_CLIENT_ID || !PHYLLO_CLIENT_SECRET) {
      console.error('[Phyllo] Credentials not configured');
      return res.status(400).json({
        success: false,
        message: 'Phyllo is not configured. Please add Phyllo credentials.',
        needsSetup: true
      });
    }

    // Note: We're not specifying workPlatformId here to let users select from available platforms
    // This avoids 404 errors from incorrect platform IDs
    // The platform parameter is stored for reference after connection
    const supportedPlatforms = ['instagram', 'facebook', 'youtube'];

    if (!supportedPlatforms.includes(platform.toLowerCase())) {
      console.error(`[Phyllo] Unsupported platform: ${platform}`);
      return res.status(400).json({
        success: false,
        message: `Platform ${platform} is not supported`
      });
    }

    // Create a Phyllo user for this connection
    console.log(`[Phyllo] Creating/getting user for: ${req.user.id}`);
    let userResponse;
    try {
      userResponse = await makePhylloRequest('POST', '/users', {
        name: req.user.name || req.user.email,
        external_id: req.user.id.toString()
      });
    } catch (userError) {
      // If user already exists, fetch it
      const errorCode = userError.response?.data?.error?.code;
      if (userError.response?.status === 400 && (errorCode === 'user_exists_with_external_id' || errorCode === 'user_already_exists')) {
        console.log('[Phyllo] User already exists, fetching...');
        try {
          const usersResponse = await makePhylloRequest('GET', `/users?external_id=${req.user.id}`);
          userResponse = usersResponse.data?.[0] || usersResponse;
        } catch (fetchError) {
          console.error('[Phyllo] Failed to fetch existing user:', fetchError.response?.data || fetchError.message);
          throw fetchError;
        }
      } else {
        throw userError;
      }
    }

    const phylloUserId = userResponse.id;
    console.log(`[Phyllo] User ID: ${phylloUserId}`);

    // Create SDK token for the user
    console.log('[Phyllo] Creating SDK token...');
    const sdkTokenResponse = await makePhylloRequest('POST', '/sdk-tokens', {
      user_id: phylloUserId,
      products: ['IDENTITY', 'ENGAGEMENT']
    });

    const sdkToken = sdkTokenResponse.sdk_token;
    console.log('[Phyllo] SDK token created successfully');

    // Store phyllo user ID in session for callback
    req.session = req.session || {};
    req.session.phylloUserId = phylloUserId;
    req.session.platform = platform;

    // Return SDK token and platform for frontend to initialize Phyllo SDK
    res.json({
      success: true,
      sdkToken,
      phylloUserId,
      redirectUrl: process.env.PHYLLO_REDIRECT_URI || 'http://localhost:3000/auth/phyllo/callback'
    });
  } catch (error) {
    console.error('[Phyllo] Get OAuth URL error:', error.response?.data || error.message);
    console.error('[Phyllo] Full error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate OAuth URL',
      error: error.response?.data?.message || error.message
    });
  }
};

// Phyllo callback - handles account connection completion
exports.handlePhylloCallback = async (req, res) => {
  try {
    const { accountId, userId: phylloUserId, platform } = req.body;
    console.log('[Phyllo Callback] Received request:', { accountId, phylloUserId, platform });

    if (!accountId || !phylloUserId) {
      console.error('[Phyllo Callback] Missing required fields');
      return res.status(400).json({
        success: false,
        message: 'Missing account ID or user ID'
      });
    }

    // Fetch account details from Phyllo
    console.log('[Phyllo Callback] Fetching account details...');
    const accountData = await makePhylloRequest('GET', `/accounts/${accountId}`);
    console.log('[Phyllo Callback] Account data:', accountData);

    // Get user ID from external_id
    console.log('[Phyllo Callback] Fetching Phyllo user...');
    const userResponse = await makePhylloRequest('GET', `/users/${phylloUserId}`);
    const mongoUserId = userResponse.external_id;
    console.log('[Phyllo Callback] MongoDB User ID:', mongoUserId);

    // Initialize data objects with defaults
    let profile = {};
    let audience = {};
    let recentPosts = [];

    // Fetch user profile data (with error handling)
    try {
      console.log('[Phyllo Callback] Fetching profile data...');
      const profileResponse = await makePhylloRequest('GET', `/profiles?account_id=${accountId}`);
      profile = profileResponse.data?.[0] || {};
      console.log('[Phyllo Callback] Profile:', profile);
    } catch (profileError) {
      console.warn('[Phyllo Callback] Profile fetch failed (non-critical):', profileError.message);
    }

    // Fetch engagement data (with error handling)
    try {
      console.log('[Phyllo Callback] Fetching audience data...');
      const engagementResponse = await makePhylloRequest('GET', `/social/audience?account_id=${accountId}`);
      audience = engagementResponse.data?.[0] || {};
      console.log('[Phyllo Callback] Audience:', audience);
    } catch (audienceError) {
      console.warn('[Phyllo Callback] Audience fetch failed (non-critical):', audienceError.message);
    }

    // Fetch recent posts (with error handling)
    try {
      console.log('[Phyllo Callback] Fetching recent posts...');
      const postsResponse = await makePhylloRequest('GET', `/social/contents?account_id=${accountId}&limit=10`);
      recentPosts = postsResponse.data || [];
      console.log('[Phyllo Callback] Posts count:', recentPosts.length);
    } catch (postsError) {
      console.warn('[Phyllo Callback] Posts fetch failed (non-critical):', postsError.message);
    }

    // Save social account to database with available data
    console.log('[Phyllo Callback] Saving to database...');
    const socialAccount = await SocialAccount.findOneAndUpdate(
      { userId: mongoUserId, platform: accountData.work_platform.name.toLowerCase() },
      {
        platformUserId: accountData.platform_user_id,
        username: accountData.platform_username || profile.username || 'Unknown',
        accessToken: accountId, // Store Phyllo account ID
        phylloAccountId: accountId,
        phylloUserId: phylloUserId,
        followers: audience.follower_count || profile.follower_count || 0,
        metadata: {
          fullName: profile.full_name || accountData.platform_username || 'Unknown',
          bio: profile.bio || '',
          profilePicture: profile.profile_pic_url || '',
          posts: profile.media_count || recentPosts.length || 0,
          following: profile.following_count || 0,
          engagement_rate: profile.engagement_rate || 0,
          isVerified: profile.is_verified || false,
          recentPosts: recentPosts.slice(0, 5).map(post => ({
            id: post.id,
            title: post.title,
            url: post.url,
            likes: post.like_count || 0,
            comments: post.comment_count || 0,
            created_at: post.published_at
          }))
        },
        lastSynced: new Date(),
        isActive: true
      },
      { upsert: true, new: true }
    );

    console.log('[Phyllo Callback] Account saved successfully:', {
      platform: socialAccount.platform,
      username: socialAccount.username,
      followers: socialAccount.followers
    });

    res.json({
      success: true,
      message: `${accountData.work_platform.name} account connected successfully`,
      data: {
        platform: accountData.work_platform.name.toLowerCase(),
        username: socialAccount.username,
        followers: socialAccount.followers,
        metadata: socialAccount.metadata
      }
    });
  } catch (error) {
    console.error('[Phyllo Callback] ERROR:', error.response?.data || error.message);
    console.error('[Phyllo Callback] Full error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to connect account',
      error: error.response?.data?.message || error.message
    });
  }
};

// Legacy handlers kept for compatibility - redirect to Phyllo
exports.handleInstagramCallback = async (req, res) => {
  return exports.handlePhylloCallback(req, res);
};

exports.handleFacebookCallback = async (req, res) => {
  return exports.handlePhylloCallback(req, res);
};

exports.handleYoutubeCallback = async (req, res) => {
  return exports.handlePhylloCallback(req, res);
};

// Get all connected social accounts
exports.getSocialAccounts = async (req, res) => {
  try {
    const userId = req.user.id;

    const accounts = await SocialAccount.find({ userId, isActive: true })
      .select('-accessToken -refreshToken')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: accounts
    });
  } catch (error) {
    console.error('Get social accounts error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch social accounts',
      error: error.message
    });
  }
};

// Sync follower counts for all connected accounts using Phyllo
exports.syncSocialAccounts = async (req, res) => {
  try {
    console.log('[Sync] Starting sync for user:', req.user.id);
    const userId = req.user.id;
    const accounts = await SocialAccount.find({ userId, isActive: true });

    if (accounts.length === 0) {
      console.log('[Sync] No accounts to sync');
      return res.json({
        success: true,
        message: 'No accounts to sync',
        data: []
      });
    }

    console.log(`[Sync] Found ${accounts.length} accounts to sync`);
    // Get Phyllo access token
    // const accessToken = await getPhylloAccessToken(); // This line was removed in the provided diff, keeping it as is.
    const syncResults = [];

    for (const account of accounts) {
      try {
        console.log(`[Sync] Syncing ${account.platform} account:`, account.username);

        if (!account.phylloAccountId) {
          console.warn(`[Sync] ${account.platform} account missing Phyllo ID`);
          syncResults.push({
            platform: account.platform,
            username: account.username,
            synced: false,
            error: 'Account not connected via Phyllo'
          });
          continue;
        }

        // Fetch updated profile data from Phyllo
        console.log(`[Sync] Fetching profile for account ID: ${account.phylloAccountId}`);
        const profileResponse = await makePhylloRequest('GET', `/profiles?account_id=${account.phylloAccountId}`);
        const profile = profileResponse.data?.[0];
        console.log(`[Sync] Profile data:`, profile);

        if (profile) {
          // Fetch engagement data (audience)
          console.log(`[Sync] Fetching audience data...`);
          const audienceResponse = await makePhylloRequest('GET', `/social/audience?account_id=${account.phylloAccountId}`);
          const audience = audienceResponse.data?.[0] || {};
          console.log(`[Sync] Audience data:`, audience);

          // Fetch recent posts
          console.log(`[Sync] Fetching recent posts...`);
          const postsResponse = await makePhylloRequest('GET', `/social/contents?account_id=${account.phylloAccountId}&limit=10`);
          const recentPosts = postsResponse.data || [];
          console.log(`[Sync] Posts count:`, recentPosts.length);

          const newFollowerCount = audience.follower_count || profile.follower_count || 0;
          console.log(`[Sync] Updating followers from ${account.followers} to ${newFollowerCount}`);

          account.followers = newFollowerCount;
          account.metadata = {
            ...account.metadata,
            fullName: profile.full_name,
            bio: profile.bio,
            profilePicture: profile.profile_pic_url,
            posts: profile.media_count || recentPosts.length || 0,
            following: profile.following_count || 0,
            engagement_rate: profile.engagement_rate,
            isVerified: profile.is_verified,
            recentPosts: recentPosts.slice(0, 5).map(post => ({
              id: post.id,
              title: post.title,
              url: post.url,
              likes: post.like_count || 0,
              comments: post.comment_count || 0,
              created_at: post.published_at
            }))
          };
          account.lastSynced = new Date();
          await account.save();

          console.log(`[Sync] ${account.platform} synced successfully`);
          syncResults.push({
            platform: account.platform,
            username: account.username,
            followers: account.followers,
            synced: true
          });
        } else {
          console.warn(`[Sync] No profile data found for ${account.platform}`);
          syncResults.push({
            platform: account.platform,
            username: account.username,
            synced: false,
            error: 'No profile data available'
          });
        }
      } catch (error) {
        console.error(`[Sync] Error syncing ${account.platform}:`, error.response?.data || error.message);

        let errorMessage = error.message;
        if (error.response?.status === 403) {
          errorMessage = 'Data not yet available. Phyllo is still syncing your account data. Please try again in a few minutes.';
        }

        syncResults.push({
          platform: account.platform,
          username: account.username,
          synced: false,
          error: errorMessage
        });
      }
    }

    console.log('[Sync] Sync complete. Results:', syncResults);
    res.json({
      success: true,
      message: 'Accounts synced successfully',
      data: syncResults
    });
  } catch (error) {
    console.error('[Sync] Sync error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to sync accounts',
      error: error.message
    });
  }
};

// Disconnect a social account
exports.disconnectSocialAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const { platform } = req.params;

    const account = await SocialAccount.findOneAndUpdate(
      { userId, platform },
      { isActive: false },
      { new: true }
    );

    if (!account) {
      return res.status(404).json({
        success: false,
        message: 'Social account not found'
      });
    }

    res.json({
      success: true,
      message: `${platform} account disconnected successfully`
    });
  } catch (error) {
    console.error('Disconnect social account error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to disconnect social account',
      error: error.message
    });
  }
};
