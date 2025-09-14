// backend/src/config/environment.js
require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5000,
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || undefined,
  JWT_SECRET: process.env.JWT_SECRET || 'your-jwt-secret',
  SESSION_SECRET: process.env.SESSION_SECRET || 'your-secret-key',
  FRONTEND_URLS: process.env.FRONTEND_URLS || "http://localhost:3000,http://localhost:3001",
  NODE_ENV: process.env.NODE_ENV || 'development'
};
