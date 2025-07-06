const express = require('express');
const router = express.Router();
const Profile = require('../models/extendedProfile');
const authenticateToken = require('../middleware/auth');

// Create or update profile
router.post('/save', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id; // ✅ get from JWT

    let profile = await Profile.findOne({ userId }); // ✅ find by userId!

    if (profile) {
      profile.set(req.body);
    } else {
      profile = new Profile({
        ...req.body,
        userId // ✅ link to logged-in user!
      });
    }

    await profile.save();
    res.status(200).json({ message: 'Profile saved successfully', profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/', authenticateToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.id });

    if (!profile) {
      return res.status(404).json({ message: 'Extended profile not found' });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// Fetch profile by email
// router.get('/:email', async (req, res) => {
//   try {
//     const profile = await Profile.findOne({ 'personalInfo.email': req.params.email });
//     if (!profile) return res.status(404).json({ message: 'Profile not found' });
//     res.status(200).json(profile);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// });

module.exports = router;
