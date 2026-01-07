const express = require('express');
const router = express.Router();
const followController = require('../controllers/followController');
const authMiddleware = require('../middleware/authMiddleware');

// All routes require authentication
router.use(authMiddleware);

// Follow/Unfollow
router.post('/:userId', followController.followUser);
router.delete('/:userId', followController.unfollowUser);
router.delete('/follower/:followerId', followController.removeFollower);

// Get followers/following
router.get('/followers/list', followController.getFollowers);
router.get('/following/list', followController.getFollowing);

// Check follow status
router.get('/status/:targetUserId', followController.getFollowStatus);

// Follow requests
router.get('/requests/pending', followController.getPendingFollowRequests);
router.post('/requests/:requestId/accept', followController.acceptFollowRequest);
router.post('/requests/:requestId/reject', followController.rejectFollowRequest);

// Block/Unblock
router.post('/block/:userId', followController.blockUser);
router.delete('/block/:userId', followController.unblockUser);
router.get('/blocked/list', followController.getBlockedUsers);

module.exports = router;
