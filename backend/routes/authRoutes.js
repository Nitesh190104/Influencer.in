const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const googleAuthController = require('../controllers/googleAuthController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.post('/signup', authController.signup);
router.post('/verify-otp', authController.verifyOTP);
router.post('/login', authController.login);
router.post('/resend-otp', authController.resendOTP);

// Google OAuth routes
router.get('/google/url', googleAuthController.getGoogleAuthUrl);
router.get('/google/callback', googleAuthController.handleGoogleCallback);

// Protected routes
router.get('/me', authMiddleware, authController.getCurrentUser);
router.put('/update-profile', authMiddleware, authController.updateProfile);

module.exports = router;
