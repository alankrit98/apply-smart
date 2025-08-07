const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'mytestsecret123';
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth'); 
const User = require('../models/User');
const Profile = require('../models/Profile'); // Import the consolidated Profile model
const ExtendedProfile = require('../models/extendedProfile'); // Import extended profile model

// Signup Route (No Changes)
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Signup failed' });
  }
});

// @route   POST /api/users/login
// @desc    Authenticate user & get token (Set as HTTP-only cookie)
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password }); // In a real app, use bcrypt.compareSync(password, user.password)
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

    // Set the JWT as an HTTP-only cookie
    res.cookie('jwt', token, {
      httpOnly: true, // Makes the cookie inaccessible to client-side JavaScript
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production (HTTPS)
      sameSite: 'Lax', // Or 'Strict' for more security, 'None' if cross-site (requires secure: true)
      maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds (matches JWT expiration)
    });

    // Send a success response (you can still send user name if needed)
    res.status(200).json({ message: 'Logged in successfully', name: user.name });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// @route   GET /api/users/profile (No Changes)
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const profile = await Profile.findOne({ user: req.user.id });
    const extendedProfile = await ExtendedProfile.findOne({ userId: req.user.id });
    
    // Profile is complete if:
    // 1. Basic profile exists with name and resumeUrl
    // 2. Extended profile exists with at least firstName filled
    const hasBasicProfile = !!profile && !!profile.name && !!profile.resumeUrl;
    const hasExtendedProfile = !!extendedProfile && !!extendedProfile.personalInfo && !!extendedProfile.personalInfo.firstName;
    
    const isProfileComplete = hasBasicProfile && hasExtendedProfile;

    res.json({
      name: user.name,
      email: user.email,
      isProfileComplete: isProfileComplete,
      hasBasicProfile: hasBasicProfile,
      hasExtendedProfile: hasExtendedProfile
    });
  } catch (err) {
    console.error('Error fetching user profile status:', err);
    res.status(500).json({ message: 'Error fetching profile status' });
  }
});

// @route   POST /api/users/logout (New Logout Route - Recommended)
// @desc    Clear JWT cookie on logout
// @access  Private
router.post('/logout', (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
    expires: new Date(0) // Set expiration to past date to delete cookie
  });
  res.status(200).json({ message: 'Logged out successfully' });
});


module.exports = router;