import jwt from 'jsonwebtoken';
import User from '../models/user_Model.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      return next();
    } catch (error) {
      console.error('Auth error:', error);
      return res.status(401).json({ error: 'Not authorized, token failed' });
    }
  }

  return res.status(401).json({ error: 'Not authorized, no token' });
};
