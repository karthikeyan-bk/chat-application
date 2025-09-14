// backend/src/services/authService.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('../config/environment');

function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

function hashPassword(plain) {
  return bcrypt.hashSync(plain, 10);
}

function comparePassword(plain, hashed) {
  return bcrypt.compareSync(plain, hashed);
}

module.exports = { signToken, verifyToken, hashPassword, comparePassword };
