const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const Follow = require('../models/Follow');
const Block = require('../models/Block');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/chat';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|txt/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        }
        cb(new Error('Invalid file type'));
    }
}).single('file');

// Middleware to check mutual follow
const checkMutualFollow = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { receiverId } = req.body;

        const [isFollowing, isFollower] = await Promise.all([
            Follow.findOne({ follower: userId, following: receiverId }),
            Follow.findOne({ follower: receiverId, following: userId })
        ]);

        if (!isFollowing || !isFollower) {
            return res.status(403).json({
                success: false,
                message: 'You must follow each other to send messages'
            });
        }

        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to verify follow status',
            error: error.message
        });
    }
};

// Get all conversations for current user
exports.getConversations = async (req, res) => {
    try {
        const userId = req.user.id;

        const conversations = await Conversation.find({
            participants: userId
        })
            .populate('participants', 'name email userType')
            .populate('lastMessage.sender', 'name')
            .sort({ updatedAt: -1 });

        const conversationsWithDetails = conversations.map(conv => {
            const otherParticipant = conv.participants.find(p => !p._id.equals(userId));
            const unreadCount = conv.unreadCount.find(u => u.user.equals(userId))?.count || 0;

            return {
                _id: conv._id,
                participant: otherParticipant,
                lastMessage: conv.lastMessage,
                unreadCount,
                updatedAt: conv.updatedAt
            };
        });

        res.json({
            success: true,
            data: conversationsWithDetails
        });
    } catch (error) {
        console.error('Get conversations error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch conversations',
            error: error.message
        });
    }
};

// Get or create conversation with a user
exports.getOrCreateConversation = async (req, res) => {
    try {
        const userId = req.user.id;
        const { otherUserId } = req.params;

        // Check if blocked
        const isBlocked = await Block.findOne({
            $or: [
                { blocker: userId, blocked: otherUserId },
                { blocker: otherUserId, blocked: userId }
            ]
        });

        if (isBlocked) {
            return res.status(403).json({
                success: false,
                message: 'Cannot start conversation with this user'
            });
        }

        // Find existing conversation
        let conversation = await Conversation.findOne({
            participants: { $all: [userId, otherUserId] }
        }).populate('participants', 'name email userType');

        // Create new conversation if doesn't exist
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [userId, otherUserId],
                unreadCount: [
                    { user: userId, count: 0 },
                    { user: otherUserId, count: 0 }
                ]
            });

            conversation = await conversation.populate('participants', 'name email userType');
        }

        const otherParticipant = conversation.participants.find(p => !p._id.equals(userId));

        res.json({
            success: true,
            data: {
                _id: conversation._id,
                participant: otherParticipant,
                createdAt: conversation.createdAt
            }
        });
    } catch (error) {
        console.error('Get/create conversation error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get conversation',
            error: error.message
        });
    }
};

// Send a message
exports.sendMessage = async (req, res) => {
    try {
        const senderId = req.user.id;
        const { conversationId, receiverId, content, type = 'text' } = req.body;

        // Check mutual follow
        const [isFollowing, isFollower] = await Promise.all([
            Follow.findOne({ follower: senderId, following: receiverId }),
            Follow.findOne({ follower: receiverId, following: senderId })
        ]);

        if (!isFollowing || !isFollower) {
            return res.status(403).json({
                success: false,
                message: 'You must follow each other to send messages'
            });
        }

        // Check if blocked
        const isBlocked = await Block.findOne({
            $or: [
                { blocker: senderId, blocked: receiverId },
                { blocker: receiverId, blocked: senderId }
            ]
        });

        if (isBlocked) {
            return res.status(403).json({
                success: false,
                message: 'Cannot send message to this user'
            });
        }

        // Create message
        const message = await Message.create({
            conversation: conversationId,
            sender: senderId,
            receiver: receiverId,
            content,
            type
        });

        // Update conversation
        await Conversation.findByIdAndUpdate(conversationId, {
            lastMessage: {
                content,
                sender: senderId,
                timestamp: message.createdAt,
                type
            },
            $inc: {
                'unreadCount.$[elem].count': 1
            },
            updatedAt: Date.now()
        }, {
            arrayFilters: [{ 'elem.user': receiverId }]
        });

        const populatedMessage = await Message.findById(message._id)
            .populate('sender', 'name email userType')
            .populate('receiver', 'name email userType');

        res.json({
            success: true,
            data: populatedMessage
        });
    } catch (error) {
        console.error('Send message error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message',
            error: error.message
        });
    }
};

// Send message with file
exports.sendMessageWithFile = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }

        try {
            const senderId = req.user.id;
            const { conversationId, receiverId, content } = req.body;
            const file = req.file;

            if (!file) {
                return res.status(400).json({
                    success: false,
                    message: 'No file uploaded'
                });
            }

            // Determine file type
            const fileType = file.mimetype.startsWith('image/') ? 'image' : 'file';

            // Create message
            const message = await Message.create({
                conversation: conversationId,
                sender: senderId,
                receiver: receiverId,
                content: content || '',
                type: fileType,
                fileUrl: `/uploads/chat/${file.filename}`,
                fileName: file.originalname,
                fileSize: file.size
            });

            // Update conversation
            await Conversation.findByIdAndUpdate(conversationId, {
                lastMessage: {
                    content: fileType === 'image' ? '📷 Image' : `📎 ${file.originalname}`,
                    sender: senderId,
                    timestamp: message.createdAt,
                    type: fileType
                },
                $inc: {
                    'unreadCount.$[elem].count': 1
                },
                updatedAt: Date.now()
            }, {
                arrayFilters: [{ 'elem.user': receiverId }]
            });

            const populatedMessage = await Message.findById(message._id)
                .populate('sender', 'name email userType')
                .populate('receiver', 'name email userType');

            res.json({
                success: true,
                data: populatedMessage
            });
        } catch (error) {
            console.error('Send file message error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to send file',
                error: error.message
            });
        }
    });
};

// Get messages in a conversation
exports.getMessages = async (req, res) => {
    try {
        const userId = req.user.id;
        const { conversationId } = req.params;
        const { page = 1, limit = 50 } = req.query;

        // Verify user is participant
        const conversation = await Conversation.findById(conversationId);
        if (!conversation || !conversation.participants.includes(userId)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        const skip = (page - 1) * limit;

        const messages = await Message.find({
            conversation: conversationId,
            $or: [
                { isDeleted: false },
                { isDeleted: true, deletedBy: { $ne: userId } }
            ]
        })
            .populate('sender', 'name email userType')
            .populate('receiver', 'name email userType')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        res.json({
            success: true,
            data: messages.reverse() // Reverse to show oldest first
        });
    } catch (error) {
        console.error('Get messages error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch messages',
            error: error.message
        });
    }
};

// Mark message as read
exports.markAsRead = async (req, res) => {
    try {
        const userId = req.user.id;
        const { messageId } = req.params;

        const message = await Message.findById(messageId);

        if (!message || !message.receiver.equals(userId)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        message.isRead = true;
        message.readAt = Date.now();
        await message.save();

        // Decrease unread count
        await Conversation.findByIdAndUpdate(message.conversation, {
            $inc: {
                'unreadCount.$[elem].count': -1
            }
        }, {
            arrayFilters: [{ 'elem.user': userId }]
        });

        res.json({
            success: true,
            message: 'Message marked as read'
        });
    } catch (error) {
        console.error('Mark as read error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to mark message as read',
            error: error.message
        });
    }
};

// Mark all messages in conversation as read
exports.markConversationAsRead = async (req, res) => {
    try {
        const userId = req.user.id;
        const { conversationId } = req.params;

        await Message.updateMany(
            {
                conversation: conversationId,
                receiver: userId,
                isRead: false
            },
            {
                isRead: true,
                readAt: Date.now()
            }
        );

        await Conversation.findByIdAndUpdate(conversationId, {
            $set: {
                'unreadCount.$[elem].count': 0
            }
        }, {
            arrayFilters: [{ 'elem.user': userId }]
        });

        res.json({
            success: true,
            message: 'All messages marked as read'
        });
    } catch (error) {
        console.error('Mark conversation as read error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to mark messages as read',
            error: error.message
        });
    }
};

// Delete message
exports.deleteMessage = async (req, res) => {
    try {
        const userId = req.user.id;
        const { messageId } = req.params;

        const message = await Message.findById(messageId);

        if (!message) {
            return res.status(404).json({
                success: false,
                message: 'Message not found'
            });
        }

        // Check if user is sender or receiver
        if (!message.sender.equals(userId) && !message.receiver.equals(userId)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        // Add user to deletedBy array
        if (!message.deletedBy.includes(userId)) {
            message.deletedBy.push(userId);
        }

        // If both users deleted, mark as deleted
        if (message.deletedBy.length === 2) {
            message.isDeleted = true;
        }

        await message.save();

        res.json({
            success: true,
            message: 'Message deleted'
        });
    } catch (error) {
        console.error('Delete message error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete message',
            error: error.message
        });
    }
};

// Add reaction to message
exports.addReaction = async (req, res) => {
    try {
        const userId = req.user.id;
        const { messageId } = req.params;
        const { emoji } = req.body;

        const message = await Message.findById(messageId);

        if (!message) {
            return res.status(404).json({
                success: false,
                message: 'Message not found'
            });
        }

        // Remove existing reaction from this user
        message.reactions = message.reactions.filter(r => !r.user.equals(userId));

        // Add new reaction
        message.reactions.push({
            user: userId,
            emoji
        });

        await message.save();

        res.json({
            success: true,
            data: message.reactions
        });
    } catch (error) {
        console.error('Add reaction error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add reaction',
            error: error.message
        });
    }
};

// Get unread count
exports.getUnreadCount = async (req, res) => {
    try {
        const userId = req.user.id;

        const conversations = await Conversation.find({
            participants: userId
        });

        const totalUnread = conversations.reduce((sum, conv) => {
            const userUnread = conv.unreadCount.find(u => u.user.equals(userId));
            return sum + (userUnread?.count || 0);
        }, 0);

        res.json({
            success: true,
            data: { unreadCount: totalUnread }
        });
    } catch (error) {
        console.error('Get unread count error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get unread count',
            error: error.message
        });
    }
};

exports.checkMutualFollow = checkMutualFollow;
