// backend/src/routes/session.js
const express = require('express');
const { getMySessions, deleteSession } = require('../controllers/sessionController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, getMySessions);
router.delete('/:id', authenticateToken, deleteSession);

module.exports = router;
