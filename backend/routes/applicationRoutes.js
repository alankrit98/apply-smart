const express = require('express');
const { getApplicationCollection } = require('../models/Application');
const router = express.Router();

// Submit Application API
router.post('/', async (req, res) => {
  const { userId, jobTitle, companyName, status } = req.body;
  try {
    const applications = getApplicationCollection();
    const result = await applications.insertOne({ userId, jobTitle, companyName, status });
    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
