// backend/src/config/redis.js
const redis = require('redis');
const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = require('./environment');

let redisClient;

try {
  // For compatibility use a simple createClient. If using redis v4 in your project, adapt to url/socket.
  redisClient = redis.createClient({
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD
  });

  redisClient.on('error', (err) => {
    console.error('Redis error:', err);
  });

  // attempt connection for older clients (no await)
  if (typeof redisClient.connect === 'function') {
    // if redis v4 you should call connect(). We won't await here to keep startup non-blocking.
    redisClient.connect().catch(err => console.warn('Redis connect failed:', err.message || err));
  }
} catch (err) {
  console.warn('Redis client init failed (continuing without Redis):', err.message || err);
  redisClient = null;
}

module.exports = { redisClient };
