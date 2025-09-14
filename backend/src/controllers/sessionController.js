// backend/src/controllers/sessionController.js
const sessions = require('../models/Session');

const getMySessions = (req, res) => {
  try {
    const list = Array.from(sessions.values()).filter(s => s.userId === req.user.id);
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
};

const deleteSession = (req, res) => {
  try {
    const sessionId = req.params.id;
    const s = sessions.get(sessionId);
    if (!s) return res.status(404).json({ error: 'Session not found' });
    if (s.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }
    s.isActive = false;
    s.endTime = new Date();
    res.json({ message: 'Session ended successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to end session' });
  }
};

module.exports = { getMySessions, deleteSession };
