const express = require('express');
const multer = require('multer');
require('dotenv').config();
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai'); // Import Google Generative AI
const pdfParse = require("pdf-parse");
const upload = multer({ dest: "uploads/" });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.post("/parse-resume", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    // Extract text from PDF
    const pdfBuffer = req.file;
    const dataBuffer = await pdfParse(pdfBuffer.buffer);
    const resumeText = dataBuffer.text;

    // Send to Gemini
    const prompt = `
      Analyze the following resume and return:
      1. Candidate's Name, Email, Phone Number
      2. Key Skills
      3. Education Details
      4. Work Experience
      5. Achievements
      6. Suggested Improvements
      7. Overall Resume Rating out of 10

      Resume Content:
      ${resumeText}
    `;

    const result = await model.generateContent(prompt);
    const output = result.response.text();

    res.json({ parsedResume: output });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error parsing resume" });
  }
});

module.exports = router;