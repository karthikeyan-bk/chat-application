// backend/src/controllers/authController.js
const users = require('../models/User');
const sessions = require('../models/Session');
const authService = require('../services/authService');
const sessionService = require('../services/sessionService');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = Array.from(users.values()).find(u => u.email === email);
    if (existing) return res.status(400).json({ error: 'User already exists' });

    const hashed = authService.hashPassword(password);
    const newUser = {
      id: users.size + 1,
      name,
      email,
      password: hashed,
      role: 'user',
      status: 'online',
      avatar: null,
      joinDate: new Date(),
      lastSeen: new Date(),
      isActive: true
    };

    users.set(newUser.id, newUser);

    const token = authService.signToken({ id: newUser.id, email: newUser.email, role: newUser.role });

    const { password: pw, ...userResponse } = newUser;
    res.status(201).json({ message: 'User registered successfully', user: userResponse, token });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = Array.from(users.values()).find(u => u.email === email);
    if (!user || !user.isActive) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = authService.comparePassword(password, user.password);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    const token = authService.signToken({ id: user.id, email: user.email, role: user.role });

    user.status = 'online';
    user.lastSeen = new Date();

    const sess = sessionService.createSession({
      userId: user.id,
      token,
      device: req.headers['user-agent'],
      ip: req.ip
    });

    const { password: pw, ...userResponse } = user;
    res.json({ message: 'Login successful', user: userResponse, token, sessionId: sess.id });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};

const logout = (req, res) => {
  try {
    const sessionId = req.headers['x-session-id'];
    if (sessionId) sessionService.endSession(sessionId);

    const user = users.get(req.user.id);
    if (user) {
      user.status = 'offline';
      user.lastSeen = new Date();
    }

    res.json({ message: 'Logout successful' });
  } catch (err) {
    res.status(500).json({ error: 'Logout failed' });
  }
};

module.exports = { register, login, logout };
