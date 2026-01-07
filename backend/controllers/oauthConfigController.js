const OAuthConfig = require('../models/OAuthConfig');

// Get all OAuth configurations (without secrets for non-admin)
exports.getOAuthConfigs = async (req, res) => {
  try {
    // Only admin users can view configs
    if (req.user.userType !== 'brand') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Only admins can view OAuth configurations.'
      });
    }

    const configs = await OAuthConfig.find().select('-clientSecret');

    // Return configuration status for each platform
    const configStatus = {
      instagram: null,
      facebook: null,
      youtube: null
    };

    configs.forEach(config => {
      configStatus[config.platform] = {
        isConfigured: config.isConfigured,
        clientId: config.clientId,
        redirectUri: config.redirectUri,
        lastUpdated: config.lastUpdated
      };
    });

    res.json({
      success: true,
      data: configStatus
    });
  } catch (error) {
    console.error('Get OAuth configs error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch OAuth configurations',
      error: error.message
    });
  }
};

// Save/Update OAuth configuration for a platform
exports.saveOAuthConfig = async (req, res) => {
  try {
    // Only admin/brand users can update configs
    if (req.user.userType !== 'brand') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Only admins can update OAuth configurations.'
      });
    }

    const { platform, clientId, clientSecret, redirectUri } = req.body;

    // Validate required fields
    if (!platform || !clientId || !clientSecret) {
      return res.status(400).json({
        success: false,
        message: 'Platform, clientId, and clientSecret are required'
      });
    }

    // Validate platform
    if (!['instagram', 'facebook', 'youtube'].includes(platform)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid platform. Must be instagram, facebook, or youtube'
      });
    }

    // Set default redirect URI if not provided
    const defaultRedirectUri = `http://localhost:3000/auth/${platform}/callback`;
    const finalRedirectUri = redirectUri || defaultRedirectUri;

    // Update or create configuration
    const config = await OAuthConfig.findOneAndUpdate(
      { platform },
      {
        clientId,
        clientSecret,
        redirectUri: finalRedirectUri,
        isConfigured: true,
        lastUpdated: Date.now(),
        updatedBy: req.user.id
      },
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      message: `${platform.charAt(0).toUpperCase() + platform.slice(1)} OAuth configured successfully`,
      data: {
        platform: config.platform,
        clientId: config.clientId,
        redirectUri: config.redirectUri,
        isConfigured: config.isConfigured
      }
    });
  } catch (error) {
    console.error('Save OAuth config error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save OAuth configuration',
      error: error.message
    });
  }
};

// Delete OAuth configuration
exports.deleteOAuthConfig = async (req, res) => {
  try {
    // Only admin users can delete configs
    if (req.user.userType !== 'brand') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Only admins can delete OAuth configurations.'
      });
    }

    const { platform } = req.params;

    const config = await OAuthConfig.findOneAndUpdate(
      { platform },
      { isConfigured: false },
      { new: true }
    );

    if (!config) {
      return res.status(404).json({
        success: false,
        message: 'OAuth configuration not found'
      });
    }

    res.json({
      success: true,
      message: `${platform.charAt(0).toUpperCase() + platform.slice(1)} OAuth configuration disabled`
    });
  } catch (error) {
    console.error('Delete OAuth config error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete OAuth configuration',
      error: error.message
    });
  }
};

// Test OAuth configuration
exports.testOAuthConfig = async (req, res) => {
  try {
    const { platform } = req.params;

    const config = await OAuthConfig.findOne({ platform, isConfigured: true });

    if (!config) {
      return res.status(404).json({
        success: false,
        message: `${platform.charAt(0).toUpperCase() + platform.slice(1)} OAuth is not configured`
      });
    }

    // Basic validation - check if credentials are set
    if (!config.clientId || !config.clientSecret) {
      return res.status(400).json({
        success: false,
        message: 'OAuth configuration is incomplete'
      });
    }

    res.json({
      success: true,
      message: `${platform.charAt(0).toUpperCase() + platform.slice(1)} OAuth configuration is valid`,
      data: {
        platform: config.platform,
        hasClientId: !!config.clientId,
        hasClientSecret: !!config.clientSecret,
        redirectUri: config.redirectUri
      }
    });
  } catch (error) {
    console.error('Test OAuth config error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to test OAuth configuration',
      error: error.message
    });
  }
};
