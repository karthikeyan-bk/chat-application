// backend/server.js
const http = require('http');
const { app } = require('./src/app');
const { initSocket } = require('./src/config/socket');
const { redisClient } = require('./src/config/redis');

const server = http.createServer(app);

// initialize socket.io and attach handlers
const io = initSocket(server);

// start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

module.exports = { server, io };
