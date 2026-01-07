const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// All routes require authentication
router.use(authMiddleware);

// Discover users
router.get('/discover', userController.discoverUsers);

// Get user profile
router.get('/:userId/profile', userController.getUserProfile);

module.exports = router;
