// backend/src/controllers/adminController.js
const users = require('../models/User');
const messages = require('../models/Message');
const channels = require('../models/Channel');
const sessions = require('../models/Session');

const getStats = (req, res) => {
  try {
    const totalUsers = users.size;
    const activeUsers = Array.from(users.values()).filter(u => u.status === 'online').length;
    const totalMessages = messages.size;
    const activeSessions = Array.from(sessions.values()).filter(s => s.isActive).length;

    res.json({
      totalUsers,
      activeUsers,
      totalMessages,
      activeSessions,
      totalChannels: channels.size,
      timestamp: new Date()
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

const getUsers = (req, res) => {
  try {
    const list = Array.from(users.values()).map(({ password, ...u }) => ({
      ...u,
      sessionsCount: Array.from(sessions.values()).filter(s => s.userId === u.id && s.isActive).length,
      messagesCount: Array.from(messages.values()).filter(m => m.senderId === u.id).length
    }));
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

const getSessions = (req, res) => {
  try {
    const list = Array.from(sessions.values()).map(s => {
      const u = users.get(s.userId);
      return { ...s, userName: u ? u.name : 'Unknown' };
    });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
};

const terminateSession = (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    const s = sessions.get(sessionId);
    if (!s) return res.status(404).json({ error: 'Session not found' });
    s.isActive = false;
    s.endTime = new Date();
    // in a real app emit socket event to user to force logout
    res.json({ message: 'Session terminated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to terminate session' });
  }
};

const banUser = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = users.get(id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (user.role === 'admin' && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Cannot ban admin users' });
    }

    user.isActive = false;
    user.status = 'banned';
    user.bannedAt = new Date();
    user.bannedBy = req.user.id;

    // terminate sessions
    Array.from(require('../models/Session').values())
      .filter(s => s.userId === user.id && s.isActive)
      .forEach(s => {
        s.isActive = false;
        s.endTime = new Date();
      });

    const { password, ...userResponse } = user;
    res.json(userResponse);
  } catch (err) {
    res.status(500).json({ error: 'Failed to ban user' });
  }
};

const getMessages = (req, res) => {
  try {
    const { page = 1, limit = 50, channelId, userId } = req.query;
    let list = Array.from(messages.values()).filter(m => m.isActive);

    if (channelId) list = list.filter(m => m.channelId === parseInt(channelId));
    if (userId) list = list.filter(m => m.senderId === parseInt(userId));

    list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const start = (page - 1) * limit;
    const end = start + parseInt(limit);
    const paginated = list.slice(start, end);

    const enriched = paginated.map(m => {
      const sender = users.get(m.senderId);
      const channel = channels.get(m.channelId);
      return {
        ...m,
        sender: sender ? { id: sender.id, name: sender.name, email: sender.email } : null,
        channel: channel ? { id: channel.id, name: channel.name } : null
      };
    });

    res.json({
      messages: enriched,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: list.length,
        pages: Math.ceil(list.length / limit)
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

module.exports = { getStats, getUsers, getSessions, terminateSession, banUser, getMessages };
