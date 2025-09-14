// backend/src/routes/chat.js
const express = require('express');
const {
  getChannels, createChannel, joinChannel, leaveChannel,
  getMessages, sendMessage
} = require('../controllers/chatController');

const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// channel endpoints (mounted under /api)
router.get('/channels', authenticateToken, getChannels);
router.post('/channels', authenticateToken, createChannel);
router.post('/channels/:id/join', authenticateToken, joinChannel);
router.post('/channels/:id/leave', authenticateToken, leaveChannel);

// message endpoints
router.get('/messages/:channelId', authenticateToken, getMessages);
router.post('/messages', authenticateToken, sendMessage);

module.exports = router;
