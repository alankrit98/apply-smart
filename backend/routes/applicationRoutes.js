// routes/applicationRoutes.js

const express = require('express');
const router = express.Router();
const Application = require('../models/Application'); // Import the new Application model

// Route to submit a new job application
router.post('/submit', async (req, res) => {
  try {
    // Extract data from the request body
    const { name, jobTitle, location, experience, expectedSalary, currentSalary } = req.body;

    // Basic validation (you might want more robust validation)
    if (!name || !jobTitle || !location || !experience || !expectedSalary || !currentSalary) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Create a new application document using the Application model
    const newApplication = new Application({
      name,
      jobTitle,
      location,
      experience,
      expectedSalary,
      currentSalary,
    });

    // Save the new application to the database
    await newApplication.save();

    // Send a success response
    res.status(201).json({ message: 'Application submitted successfully!', application: newApplication });

  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error submitting application:', error);
    // Send an error response
    res.status(500).json({ message: 'Failed to submit application. Please try again later.' });
  }
});

// You can add more routes here for fetching applications, etc., if needed in the future.

module.exports = router;