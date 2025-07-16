const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // NEW: Import cookie-parser
const { connectDB } = require('./db');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const extendedProfileRoutes = require('./routes/extendedProfileRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

dotenv.config();

const app = express();

// Middleware
// Configure CORS to allow credentials (cookies) from your frontend origin
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://applysmartly.vercel.app' 
    : 'http://localhost:3000',
  credentials: true // This is crucial for sending/receiving cookies
}));
app.use(express.json());
app.use(cookieParser()); // NEW: Use cookie-parser middleware

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/extended-profile', extendedProfileRoutes);
app.use('/api/application', applicationRoutes);

app.get('/', (req, res) => {
  res.send('ApplySmart Backend API is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
