// backend/src/services/sessionService.js
const sessions = require('../models/Session');

function createSession({ userId, token, device, ip }) {
  const sessionId = `sess_${Date.now()}_${userId}`;
  const s = {
    id: sessionId,
    userId,
    token,
    device: device || 'Unknown',
    ipAddress: ip || '0.0.0.0',
    startTime: new Date(),
    lastActivity: new Date(),
    isActive: true
  };
  sessions.set(sessionId, s);
  return s;
}

function endSession(sessionId) {
  const s = sessions.get(sessionId);
  if (!s) return null;
  s.isActive = false;
  s.endTime = new Date();
  sessions.set(sessionId, s);
  return s;
}

function listSessionsForUser(userId) {
  return Array.from(sessions.values()).filter(s => s.userId === userId);
}

module.exports = { createSession, endSession, listSessionsForUser };
