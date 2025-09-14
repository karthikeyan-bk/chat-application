// backend/src/routes/admin.js
const express = require('express');
const {
  getStats, getUsers, getSessions, terminateSession, banUser, getMessages
} = require('../controllers/adminController');

const { authenticateToken } = require('../middleware/auth');
const { authenticateAdmin } = require('../middleware/adminAuth');

const router = express.Router();

router.get('/stats', authenticateToken, authenticateAdmin, getStats);
router.get('/users', authenticateToken, authenticateAdmin, getUsers);
router.get('/sessions', authenticateToken, authenticateAdmin, getSessions);
router.delete('/sessions/:sessionId', authenticateToken, authenticateAdmin, terminateSession);
router.put('/users/:id/ban', authenticateToken, authenticateAdmin, banUser);
router.get('/messages', authenticateToken, authenticateAdmin, getMessages);

module.exports = router;
