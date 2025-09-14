// backend/src/middleware/validation.js
// simple placeholders — extend with joi or express-validator as needed

function validateRegister(req, res, next) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'name, email and password are required' });
  next();
}

function validateLogin(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  next();
}

module.exports = { validateRegister, validateLogin };
