const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { z } = require('zod');

// Define Zod schemas for validation
const signupSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1d' });
};

// Signup route
const JWT_SECRET = 'your_jwt_secret_key'; // Keep this in an environment variable

// Signup route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, user });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email });

      if (!user) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({ token, user });
  } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
