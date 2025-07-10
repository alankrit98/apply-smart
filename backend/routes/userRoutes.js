// userRoutes.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'mytestsecret123';
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const User = require('../models/User'); // This is the only model you need for signup
const extendedProfile = require('../models/extendedProfile'); // Import the extended profile model
const Profile = require('../models/Profile');

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Signup failed' });
  }
});

// Login API - NOTE: This will also need to be fixed later
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // You should use the User model here, not a separate function
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ token, name: user.name });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get User Profile
router.get('/profile', authenticateToken, async (req, res) => {
  console.log(req.user);
  try {
    const user = await Profile.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isProfileComplete = Boolean(user.Pname?.trim());
    // console.log('Is profile complete:', isProfileComplete);
    res.json({ name: user.Pname, isProfileComplete });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

module.exports = router;