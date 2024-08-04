// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = 'your_jwt_secret_key'; // Keep this in an environment variable

const authenticate = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = await User.findById(decoded.userId).select('-password');
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authenticate;
