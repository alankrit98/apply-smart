// models/Application.js

const mongoose = require('mongoose');

// Define the schema for job applications
const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true // Remove whitespace from both ends of a string
  },
  jobTitle: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  experience: {
    type: String, // e.g., "0-1 yr", "1-5 yr"
    required: true,
    trim: true
  },
  expectedSalary: {
    type: String, // e.g., "0-5 LPA"
    required: true,
    trim: true
  },
  currentSalary: {
    type: String, // e.g., "0-5 LPA"
    required: true,
    trim: true
  },
  // You might want to add a timestamp for when the application was created
  createdAt: {
    type: Date,
    default: Date.now // Automatically sets the current date
  }
});

// Create and export the Mongoose model based on the schema
module.exports = mongoose.model('Application', applicationSchema);
