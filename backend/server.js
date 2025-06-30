// server.js

const express = require('express');
const dotenv = require('dotenv');
const cors =require('cors');
const { connectDB } = require('./db');

// --- Step 1: Load environment variables ---
dotenv.config();

// --- Step 2: Initialize Express app ---
const app = express();

// --- Step 3: Use Middleware (in the correct order!) ---
// This is crucial: Use cors and json parser BEFORE defining routes.
app.use(cors());
app.use(express.json()); // This line MUST come before your app.use('/api/...') lines

// --- Step 4: Connect to the database ---
connectDB();

// --- Step 5: Define API routes ---
// You only need to require your routes once
const userRoutes = require('./routes/userRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

app.use('/api/users', userRoutes);
app.use('/api/applications', applicationRoutes);


// --- Step 6: Start the server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));