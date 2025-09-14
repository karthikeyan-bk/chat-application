// backend/src/app.js
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const rateLimiter = require('./middleware/rateLimiter');
const { redisClient } = require('./config/redis');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const chatRoutes = require('./routes/chat');
const adminRoutes = require('./routes/admin');
const sessionRoutes = require('./routes/session');

const app = express();

// security + CORS
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URLS?.split(',') || ["http://localhost:3000", "http://localhost:3001"],
  credentials: true
}));

// rate limiter applied to /api
app.use('/api', rateLimiter);

// body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// session
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
// chatRoutes handles /api/channels and /api/messages
app.use('/api', chatRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/sessions', sessionRoutes);

// error handling + 404
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = { app };
