// backend/src/config/socket.js
const socketIo = require('socket.io');
const socketService = require('../services/socketService');
const { FRONTEND_URLS } = require('./environment');

function initSocket(server) {
  const origins = (process.env.FRONTEND_URLS || FRONTEND_URLS).split(',');
  const io = socketIo(server, {
    cors: {
      origin: origins,
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  // hand over io to socket service which registers handlers
  socketService.init(io);

  return io;
}

module.exports = { initSocket };
