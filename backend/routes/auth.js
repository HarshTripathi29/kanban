const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { z } = require('zod');
require('dotenv').config();

// Define Zod schemas for validation
const signupSchema = z.object({
  username: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signinSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET; // Ensure this is set in your environment variables

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
};

// Signup route
router.post('/signup', async (req, res) => {
  try {
    console.log('Request body:', req.body); // Debugging line
    
    // Validate request body
    const { username, email, password } = signupSchema.parse(req.body);

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    // Generate JWT token
    const token = generateToken(user);

    // Send the token and user information
    res.status(201).json({ token, user });
  } catch (error) {
    console.error('Error during signup:', error); // This should show detailed error
    if (error instanceof z.ZodError) {
      // Send validation errors
      res.status(400).json({ errors: error.errors });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
});


// Login route
router.post('/login', async (req, res) => {
  try {
    // Validate request body
    const { email, password } = signinSchema.parse(req.body);

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(user);

    // Send the token and user information
    res.status(200).json({ token, user });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Send validation errors
      res.status(400).json({ errors: error.errors });
    } else {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
});

// Logout route
router.post('/logout', (req, res) => {
  // Invalidate the token on the client side
  // No server-side action required with JWT

  // Send a success response
  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;
