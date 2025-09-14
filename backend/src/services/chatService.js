// backend/src/services/chatService.js
const messages = require('../models/Message');
const channels = require('../models/Channel');
const users = require('../models/User');
const socketService = require('./socketService');

function createMessage({ content, channelId, senderId, threadId = null, type = 'text' }) {
  const id = messages.size + 1;
  const message = {
    id,
    content,
    senderId,
    channelId,
    threadId,
    type,
    createdAt: new Date(),
    updatedAt: new Date(),
    reactions: [],
    isActive: true
  };
  messages.set(id, message);

  // emit to channel
  socketService.emitToChannel(channelId, 'new_message', {
    ...message,
    sender: users.get(senderId) ? { id: users.get(senderId).id, name: users.get(senderId).name } : null
  });

  return message;
}

module.exports = { createMessage };
