const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    lastMessage: {
        content: String,
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        timestamp: Date,
        type: {
            type: String,
            enum: ['text', 'image', 'file'],
            default: 'text'
        }
    },
    unreadCount: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        count: {
            type: Number,
            default: 0
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Index for finding conversations by participant
conversationSchema.index({ participants: 1 });
conversationSchema.index({ updatedAt: -1 });

// Ensure exactly 2 participants
conversationSchema.pre('save', function (next) {
    if (this.participants.length !== 2) {
        next(new Error('Conversation must have exactly 2 participants'));
    } else {
        this.updatedAt = Date.now();
        next();
    }
});

module.exports = mongoose.model('Conversation', conversationSchema);
