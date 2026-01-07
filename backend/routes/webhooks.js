const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');

// Phyllo webhook endpoint (no auth required - Phyllo sends events)
router.post('/phyllo', webhookController.handlePhylloWebhook);

module.exports = router;
