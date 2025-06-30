// db.js
const mongoose = require('mongoose'); // Import Mongoose
require('dotenv').config(); // Ensure dotenv is loaded here

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI; // Use the MONGODB_URI from your .env
    if (!uri) {
      console.error('Error: MONGODB_URI is not defined in .env file');
      process.exit(1);
    }

    await mongoose.connect(uri, {
      useNewUrlParser: true,       // These options are now default in newer Mongoose versions,
      useUnifiedTopology: true,    // but good to keep for clarity/compatibility.
      // serverSelectionTimeoutMS: 5000, // Optional: default is 30000ms. Can be lower for faster failure if connection issues persist.
      // Other Mongoose options can go here if needed.
    });
    console.log('MongoDB Connected successfully with Mongoose!');

    // Optional: Listen for connection events for better debugging
    mongoose.connection.on('connected', () => {
      console.log('Mongoose default connection open');
    });

    mongoose.connection.on('error', (err) => {
      console.error('Mongoose default connection error: ' + err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose default connection disconnected');
    });

  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = { connectDB }; // Export only connectDB, client is not needed here