const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: { // Link to the User model
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true // Each user has only one profile
  },
  // Basic Profile fields
  name: { // This will be the primary name for the profile
    type: String,
    required: true // Name is required for a "complete" profile
  },
  resumeUrl: { // Stores the Cloudinary URL
    type: String,
    required: true // Resume is required for a "complete" profile
  },
  cloudinaryPublicId: { // To easily delete from Cloudinary later
    type: String
  },

  // Fields from your original extendedProfile.js
  email: { // Can be derived from User model or stored here for profile context
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);
