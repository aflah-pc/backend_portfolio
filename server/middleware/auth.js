import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretcybersecuritytokenkeychangeinproduction1337';

// Utility helper to parse cookie from headers
const getCookie = (req, name) => {
  const headers = req.headers.cookie;
  if (!headers) return null;
  const cookies = headers.split(';').reduce((acc, cookie) => {
    const parts = cookie.split('=');
    const key = parts[0]?.trim();
    const val = parts.slice(1).join('=')?.trim();
    if (key) acc[key] = val;
    return acc;
  }, {});
  return cookies[name];
};

export const verifyAdminToken = (req, res, next) => {
  let token = getCookie(req, 'token');

  // Fallback to Authorization header if cookies are not used (e.g., standard API testing)
  if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ status: 'error', message: 'Access denied. Please log in.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ status: 'error', message: 'Invalid or expired session. Please log in again.' });
  }
};
