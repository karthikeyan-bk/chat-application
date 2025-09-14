// backend/src/routes/user.js
const express = require('express');
const { getAllUsers, getUserById, updateStatus } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, getAllUsers);
router.get('/:id', authenticateToken, getUserById);
router.put('/:id/status', authenticateToken, updateStatus);

module.exports = router;
