const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  try {
    // Log the incoming request headers for debugging
    console.log('Request Headers:', req.headers);

    // Extract the Authorization header
    const authHeader = req.header('Authorization');

    // Check if the Authorization header is present
    if (!authHeader) {
      console.log('Authorization header is missing');
      return res.status(401).json({ message: 'Authorization header is missing' });
    }

    // Verify the structure of the header
    if (!authHeader.startsWith('Bearer ')) {
      console.log('Invalid Authorization header format');
      return res.status(401).json({ message: 'Invalid Authorization header format' });
    }

    // Extract the token from the header
    const token = authHeader.replace('Bearer ', '');

    // Log the extracted token
    console.log('Extracted Token:', token);

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Log the decoded token information
    console.log('Decoded Token:', decoded);

    // Find the user associated with the token
    const user = await User.findOne({ _id: decoded.id });

    // If no user is found, throw an error
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'User not found' });
    }

    // Log the user found
    console.log('Authenticated User:', user);

    // Attach the user object to the request
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    res.status(401).json({ message: 'Please authenticate' });
  }
};

module.exports = authenticate;
