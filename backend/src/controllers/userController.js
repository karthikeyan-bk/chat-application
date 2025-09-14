// backend/src/controllers/userController.js
const users = require('../models/User');

const getAllUsers = (req, res) => {
  try {
    const userList = Array.from(users.values()).filter(u => u.isActive).map(({ password, ...u }) => u);
    res.json(userList);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

const getUserById = (req, res) => {
  try {
    const user = users.get(parseInt(req.params.id));
    if (!user || !user.isActive) return res.status(404).json({ error: 'User not found' });
    const { password, ...userResponse } = user;
    res.json(userResponse);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

const updateStatus = (req, res) => {
  try {
    const { status } = req.body;
    const user = users.get(parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (req.user.id !== user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Permission denied' });
    }

    user.status = status;
    user.lastSeen = new Date();
    users.set(user.id, user);
    const { password, ...userResponse } = user;
    res.json(userResponse);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status' });
  }
};

module.exports = { getAllUsers, getUserById, updateStatus };
