const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const socialAccountController = require('../controllers/socialAccountController');

// All routes require authentication
router.use(authMiddleware);

// Get OAuth URL for platform (GET for fallback, POST for credentials)
router.get('/oauth/:platform/url', socialAccountController.getOAuthUrl);
router.post('/oauth/:platform/url', socialAccountController.getOAuthUrl);

// OAuth callback handlers
router.post('/oauth/phyllo/callback', socialAccountController.handlePhylloCallback);
router.post('/oauth/instagram/callback', socialAccountController.handleInstagramCallback);
router.post('/oauth/facebook/callback', socialAccountController.handleFacebookCallback);
router.post('/oauth/youtube/callback', socialAccountController.handleYoutubeCallback);

// Get all connected accounts
router.get('/', socialAccountController.getSocialAccounts);

// Sync follower counts
router.post('/sync', socialAccountController.syncSocialAccounts);

// Disconnect account
router.delete('/disconnect/:platform', socialAccountController.disconnectSocialAccount);

module.exports = router;
