const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');

// All routes require authentication
router.use(authMiddleware);

// Conversations
router.get('/conversations', chatController.getConversations);
router.get('/conversations/:otherUserId', chatController.getOrCreateConversation);
router.patch('/conversations/:conversationId/read', chatController.markConversationAsRead);

// Messages
router.post('/messages', chatController.sendMessage);
router.post('/messages/file', chatController.sendMessageWithFile);
router.get('/messages/:conversationId', chatController.getMessages);
router.patch('/messages/:messageId/read', chatController.markAsRead);
router.delete('/messages/:messageId', chatController.deleteMessage);

// Reactions
router.post('/messages/:messageId/reaction', chatController.addReaction);

// Unread count
router.get('/unread-count', chatController.getUnreadCount);

module.exports = router;
