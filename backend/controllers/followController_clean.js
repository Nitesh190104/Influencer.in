const Follow = require('../models/Follow');
const Block = require('../models/Block');
const User = require('../models/User');
const Notification = require('../models/Notification');

// Follow a user
exports.followUser = async (req, res) => {
    try {
        const followerId = req.user.id;
        const { userId } = req.params;

        // Prevent self-follow
        if (followerId === userId) {
            return res.status(400).json({
                success: false,
                message: 'You cannot follow yourself'
            });
        }

        // Check if target user exists
        const targetUser = await User.findById(userId);
        if (!targetUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Check if blocked
        const isBlocked = await Block.findOne({
            $or: [
                { blocker: followerId, blocked: userId },
                { blocker: userId, blocked: followerId }
            ]
        });

        if (isBlocked) {
            return res.status(403).json({
                success: false,
                message: 'Cannot follow this user'
            });
        }

        // Check if already following or pending
        const existingFollow = await Follow.findOne({
            follower: followerId,
            following: userId
        });

        if (existingFollow) {
            return res.status(400).json({
                success: false,
                message: existingFollow.status === 'pending' ? 'Follow request already sent' : 'Already following this user'
            });
        }

        // Create follow relationship with pending status
        const follow = await Follow.create({
            follower: followerId,
            following: userId,
            status: 'pending'
        });

        // Create notification for the user being followed
        await Notification.create({
            user: userId,
            type: 'follow_request',
            from: followerId,
            data: {
                followId: follow._id
            }
        });

        res.json({
            success: true,
            message: 'Follow request sent',
            data: {
                status: 'pending'
            }
        });
    } catch (error) {
        console.error('Follow user error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to follow user',
            error: error.message
        });
    }
};

// Unfollow a user
exports.unfollowUser = async (req, res) => {
    try {
        const followerId = req.user.id;
        const { userId } = req.params;

        const result = await Follow.findOneAndDelete({
            follower: followerId,
            following: userId
        });

        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'You are not following this user'
            });
        }

        res.json({
            success: true,
            message: 'Successfully unfollowed user'
        });
    } catch (error) {
        console.error('Unfollow user error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to unfollow user',
            error: error.message
        });
    }
};

// Get followers list
exports.getFollowers = async (req, res) => {
    try {
        const userId = req.user.id;

        const followers = await Follow.find({ following: userId })
            .populate('follower', 'name email userType')
            .sort({ createdAt: -1 });

        const followersList = followers.map(f => ({
            ...f.follower.toObject(),
            followedAt: f.createdAt
        }));

        res.json({
            success: true,
            data: followersList,
            count: followersList.length
        });
    } catch (error) {
        console.error('Get followers error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch followers',
            error: error.message
        });
    }
};

// Get following list
exports.getFollowing = async (req, res) => {
    try {
        const userId = req.user.id;

        const following = await Follow.find({ follower: userId })
            .populate('following', 'name email userType')
            .sort({ createdAt: -1 });

        const followingList = following.map(f => ({
            ...f.following.toObject(),
            followedAt: f.createdAt
        }));

        res.json({
            success: true,
            data: followingList,
            count: followingList.length
        });
    } catch (error) {
        console.error('Get following error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch following list',
            error: error.message
        });
    }
};

// Check follow status with a user
exports.getFollowStatus = async (req, res) => {
    try {
        const userId = req.user.id;
        const { targetUserId } = req.params;

        const [isFollowing, isFollower] = await Promise.all([
            Follow.findOne({ follower: userId, following: targetUserId }),
            Follow.findOne({ follower: targetUserId, following: userId })
        ]);

        res.json({
            success: true,
            data: {
                isFollowing: !!isFollowing,
                isFollower: !!isFollower,
                isMutual: !!isFollowing && !!isFollower
            }
        });
    } catch (error) {
        console.error('Get follow status error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to check follow status',
            error: error.message
        });
    }
};

// Block a user
exports.blockUser = async (req, res) => {
    try {
        const blockerId = req.user.id;
        const { userId } = req.params;
        const { reason } = req.body;

        if (blockerId === userId) {
            return res.status(400).json({
                success: false,
                message: 'You cannot block yourself'
            });
        }

        // Remove any existing follows
        await Promise.all([
            Follow.deleteMany({
                $or: [
                    { follower: blockerId, following: userId },
                    { follower: userId, following: blockerId }
                ]
            })
        ]);

        // Create block
        await Block.findOneAndUpdate(
            { blocker: blockerId, blocked: userId },
            { blocker: blockerId, blocked: userId, reason },
            { upsert: true, new: true }
        );

        res.json({
            success: true,
            message: 'User blocked successfully'
        });
    } catch (error) {
        console.error('Block user error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to block user',
            error: error.message
        });
    }
};

// Unblock a user
exports.unblockUser = async (req, res) => {
    try {
        const blockerId = req.user.id;
        const { userId } = req.params;

        const result = await Block.findOneAndDelete({
            blocker: blockerId,
            blocked: userId
        });

        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'User is not blocked'
            });
        }

        res.json({
            success: true,
            message: 'User unblocked successfully'
        });
    } catch (error) {
        console.error('Unblock user error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to unblock user',
            error: error.message
        });
    }
};

// Get blocked users list
exports.getBlockedUsers = async (req, res) => {
    try {
        const userId = req.user.id;

        const blocked = await Block.find({ blocker: userId })
            .populate('blocked', 'name email userType')
            .sort({ createdAt: -1 });

        const blockedList = blocked.map(b => ({
            ...b.blocked.toObject(),
            blockedAt: b.createdAt,
            reason: b.reason
        }));

        res.json({
            success: true,
            data: blockedList,
            count: blockedList.length
        });
    } catch (error) {
        console.error('Get blocked users error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch blocked users',
            error: error.message
        });
    }
};
