const User = require('../models/User');
const Follow = require('../models/Follow');
const Block = require('../models/Block');

// Discover all users (brands and influencers)
exports.discoverUsers = async (req, res) => {
    try {
        const currentUserId = req.user.id;
        const { userType, search, page = 1, limit = 20 } = req.query;

        // Build query
        const query = {
            _id: { $ne: currentUserId }, // Exclude current user
            isVerified: true // Only show verified users
        };

        if (userType) {
            query.userType = userType;
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        // Get blocked users
        const blockedUsers = await Block.find({
            $or: [
                { blocker: currentUserId },
                { blocked: currentUserId }
            ]
        });
        const blockedIds = blockedUsers.map(b =>
            b.blocker.equals(currentUserId) ? b.blocked : b.blocker
        );

        if (blockedIds.length > 0) {
            query._id.$nin = blockedIds;
        }

        const skip = (page - 1) * limit;

        const [users, total] = await Promise.all([
            User.find(query)
                .select('name email userType createdAt')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit)),
            User.countDocuments(query)
        ]);

        // Get follow status for each user
        const userIds = users.map(u => u._id);
        const [following, followers] = await Promise.all([
            Follow.find({ follower: currentUserId, following: { $in: userIds } }),
            Follow.find({ follower: { $in: userIds }, following: currentUserId })
        ]);

        const followingMap = new Map(following.map(f => [f.following.toString(), true]));
        const followersMap = new Map(followers.map(f => [f.follower.toString(), true]));

        const usersWithFollowStatus = users.map(user => ({
            ...user.toObject(),
            isFollowing: followingMap.has(user._id.toString()),
            isFollower: followersMap.has(user._id.toString()),
            isMutual: followingMap.has(user._id.toString()) && followersMap.has(user._id.toString())
        }));

        res.json({
            success: true,
            data: usersWithFollowStatus,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Discover users error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch users',
            error: error.message
        });
    }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const currentUserId = req.user.id;

        const user = await User.findById(userId)
            .select('name email userType createdAt');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Get follow status
        const [isFollowing, isFollower, isBlocked] = await Promise.all([
            Follow.findOne({ follower: currentUserId, following: userId }),
            Follow.findOne({ follower: userId, following: currentUserId }),
            Block.findOne({
                $or: [
                    { blocker: currentUserId, blocked: userId },
                    { blocker: userId, blocked: currentUserId }
                ]
            })
        ]);

        // Get follower/following counts
        const [followersCount, followingCount] = await Promise.all([
            Follow.countDocuments({ following: userId }),
            Follow.countDocuments({ follower: userId })
        ]);

        res.json({
            success: true,
            data: {
                ...user.toObject(),
                isFollowing: !!isFollowing,
                isFollower: !!isFollower,
                isMutual: !!isFollowing && !!isFollower,
                isBlocked: !!isBlocked,
                followersCount,
                followingCount
            }
        });
    } catch (error) {
        console.error('Get user profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user profile',
            error: error.message
        });
    }
};
