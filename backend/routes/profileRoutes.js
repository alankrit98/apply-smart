const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth'); // Your existing auth middleware
const upload = require('../middleware/cloudinaryUpload'); // Your existing Cloudinary upload middleware
const Profile = require('../models/Profile'); // The consolidated Profile model
const cloudinary = require('cloudinary').v2; // Import Cloudinary for deletion

// @route   GET /api/profile
// @desc    Get user's comprehensive profile
// @access  Private
router.get('/', authenticateToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      // Return 404 if profile not found, indicating it needs to be created
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json({ profile });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/profile
// @desc    Create user's comprehensive profile (initial creation)
// @access  Private
// Use this for the initial creation, it expects name, email, phone, experience, skills, and resume
router.post('/', authenticateToken, upload.single('resume'), async (req, res) => {
  try {
    const { name, email, phone, experience, skills } = req.body;

    // Check if profile already exists for this user
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      return res.status(400).json({ message: 'Profile already exists. Use PUT /api/profile to update.' });
    }

    if (!name || !req.file) { // Name and resume are minimum for initial creation
      return res.status(400).json({ message: 'Name and resume are required to create a profile.' });
    }

    // Multer-storage-cloudinary already handles upload and provides file.path
    const resumeUrl = req.file.path;
    const cloudinaryPublicId = req.file.filename; // Multer-storage-cloudinary sets filename as public_id

    profile = new Profile({
      user: req.user.id,
      name,
      email: email || '',
      phone: phone || '',
      experience: experience || '',
      skills: skills || '',
      resumeUrl,
      cloudinaryPublicId
    });

    await profile.save();
    res.status(201).json({ message: 'Profile created successfully', profile });

  } catch (error) {
    console.error('Error creating profile:', error);
    // Handle Multer errors (e.g., file size limit, wrong file type)
    if (error instanceof multer.MulterError) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/profile
// @desc    Update user's comprehensive profile
// @access  Private
// Handles updates including optional resume replacement
router.put('/', authenticateToken, upload.single('resume'), async (req, res) => {
  const { name, email, phone, experience, skills } = req.body;

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found. Please create one first using POST /api/profile.' });
    }

    // Update text fields
    if (name) profile.name = name;
    if (email) profile.email = email;
    if (phone) profile.phone = phone;
    if (experience) profile.experience = experience;
    if (skills) profile.skills = skills;

    // Handle resume update if a new file is provided
    if (req.file) {
      // Delete old resume from Cloudinary if it exists
      if (profile.cloudinaryPublicId) {
        await cloudinary.uploader.destroy(profile.cloudinaryPublicId, { resource_type: 'raw' });
      }
      profile.resumeUrl = req.file.path;
      profile.cloudinaryPublicId = req.file.filename;
    }

    await profile.save();
    res.status(200).json({ message: 'Profile updated successfully', profile });

  } catch (error) {
    console.error('Error updating profile:', error);
    if (error instanceof multer.MulterError) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   DELETE /api/profile
// @desc    Delete user's comprehensive profile
// @access  Private
router.delete('/', authenticateToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Delete resume from Cloudinary
    if (profile.cloudinaryPublicId) {
      await cloudinary.uploader.destroy(profile.cloudinaryPublicId, { resource_type: 'raw' });
    }

    await Profile.deleteOne({ user: req.user.id });
    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error('Error deleting profile:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
