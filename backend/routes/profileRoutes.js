const express = require('express');
const router = express.Router();
const upload = require('../middleware/cloudinaryUpload');
const Profile = require('../models/Profile');

// Create profile with Cloudinary upload
router.post('/create', upload.single('resume'), async (req, res) => {
  try {
    const { name } = req.body;
    const file = req.file;

    if (!name || !file) {
      return res.status(400).json({ message: 'Name and resume are required' });
    }

    const profile = new Profile({
      name,
      resumeUrl: file.path, // Cloudinary secure URL
    });

    await profile.save();
    res.status(201).json({ message: 'Profile created', profile });
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
