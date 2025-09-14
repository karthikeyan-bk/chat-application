// backend/src/utils/helpers.js
function sanitizeUser(user) {
  if (!user) return null;
  const { password, ...rest } = user;
  return rest;
}

module.exports = { sanitizeUser };
