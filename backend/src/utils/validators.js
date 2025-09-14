// backend/src/utils/validators.js
function isEmail(val) {
  return typeof val === 'string' && /\S+@\S+\.\S+/.test(val);
}

module.exports = { isEmail };
