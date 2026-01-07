const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    following: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Compound index for fast lookups
followSchema.index({ follower: 1, following: 1 }, { unique: true });
followSchema.index({ following: 1, follower: 1 });

// Prevent self-follows
followSchema.pre('save', function (next) {
    if (this.follower.equals(this.following)) {
        next(new Error('Users cannot follow themselves'));
    } else {
        next();
    }
});

module.exports = mongoose.model('Follow', followSchema);
