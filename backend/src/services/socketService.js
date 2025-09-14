// backend/src/services/socketService.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/environment');
const channels = require('../models/Channel');
const users = require('../models/User');
const messages = require('../models/Message');
const { EVENTS } = require('../utils/constants');

let io;
const activeConnections = new Map(); // userId -> socketId

function init(_io) {
  io = _io;

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error('Authentication token required'));

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return next(new Error('Invalid token'));
      socket.userId = decoded.id;
      socket.userRole = decoded.role;
      next();
    });
  });

  io.on('connection', (socket) => {
    console.log(`User ${socket.userId} connected with socket ${socket.id}`);
    activeConnections.set(socket.userId, socket.id);
    socket.join(`user_${socket.userId}`);

    // join channels that user is a member of
    Array.from(channels.values())
      .filter(c => c.members && c.members.includes(socket.userId))
      .forEach(c => socket.join(`channel_${c.id}`));

    // set user online
    const user = users.get(socket.userId);
    if (user) {
      user.status = 'online';
      user.lastSeen = new Date();
    }

    socket.on('join_channel', (channelId) => {
      const channel = channels.get(channelId);
      if (channel && channel.members.includes(socket.userId)) {
        socket.join(`channel_${channelId}`);
        socket.emit('joined_channel', { channelId });
      }
    });

    socket.on('leave_channel', (channelId) => {
      socket.leave(`channel_${channelId}`);
      socket.emit('left_channel', { channelId });
    });

    socket.on('typing_start', (data) => {
      socket.to(`channel_${data.channelId}`).emit('user_typing', {
        userId: socket.userId,
        userName: users.get(socket.userId)?.name,
        channelId: data.channelId
      });
    });

    socket.on('typing_stop', (data) => {
      socket.to(`channel_${data.channelId}`).emit('user_stop_typing', {
        userId: socket.userId,
        channelId: data.channelId
      });
    });

    socket.on('add_reaction', (data) => {
      const message = messages.get(data.messageId);
      if (message) {
        const existing = message.reactions.find(r => r.emoji === data.emoji);
        if (existing) {
          if (!existing.users.includes(socket.userId)) {
            existing.users.push(socket.userId);
            existing.count = existing.users.length;
          }
        } else {
          message.reactions.push({ emoji: data.emoji, users: [socket.userId], count: 1 });
        }
        io.to(`channel_${message.channelId}`).emit('reaction_updated', {
          messageId: data.messageId,
          reactions: message.reactions
        });
      }
    });

    socket.on('disconnect', () => {
      console.log(`User ${socket.userId} disconnected`);
      activeConnections.delete(socket.userId);

      // check other connections
      const stillConnected = Array.from(activeConnections.values()).includes(socket.userId);
      if (!stillConnected) {
        const u = users.get(socket.userId);
        if (u) {
          u.status = 'offline';
          u.lastSeen = new Date();
          socket.broadcast.emit('user_status_update', { userId: socket.userId, status: 'offline' });
        }
      }
    });
  });
}

// helper emitters used by controllers/services
function emitToChannel(channelId, event, payload) {
  if (!io) return;
  io.to(`channel_${channelId}`).emit(event, payload);
}

function emitToUser(userId, event, payload) {
  if (!io) return;
  io.to(`user_${userId}`).emit(event, payload);
}

module.exports = { init, emitToChannel, emitToUser };
