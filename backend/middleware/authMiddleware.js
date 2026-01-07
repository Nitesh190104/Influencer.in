const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided. Authorization denied.'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from database
        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found. Authorization denied.'
            });
        }

        // Add user object to request
        req.user = {
            id: user._id,
            _id: user._id,
            email: user.email,
            name: user.name,
            userType: user.userType
        };

        // Keep backward compatibility
        req.userId = user._id;
        req.userEmail = user.email;
        req.userType = user.userType;

        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({
            success: false,
            message: 'Invalid token. Authorization denied.'
        });
    }
};

module.exports = authMiddleware;
