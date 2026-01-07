const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const oauthConfigController = require('../controllers/oauthConfigController');

// All routes require authentication
router.use(authMiddleware);

// Get all OAuth configurations
router.get('/', oauthConfigController.getOAuthConfigs);

// Save/Update OAuth configuration for a platform
router.post('/:platform', oauthConfigController.saveOAuthConfig);

// Test OAuth configuration
router.get('/:platform/test', oauthConfigController.testOAuthConfig);

// Delete OAuth configuration
router.delete('/:platform', oauthConfigController.deleteOAuthConfig);

module.exports = router;
