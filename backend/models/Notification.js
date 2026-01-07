const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['follow_request', 'follow_accepted', 'message', 'campaign'],
        required: true
    },
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    data: {
        followId: mongoose.Schema.Types.ObjectId,
        campaignId: mongoose.Schema.Types.ObjectId,
        message: String
    },
    isRead: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Index for fast lookups
notificationSchema.index({ user: 1, isRead: 1 });
notificationSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Notification', notificationSchema);
