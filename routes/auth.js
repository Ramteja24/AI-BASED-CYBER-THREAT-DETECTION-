const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const LoginAttempt = require('../models/LoginAttempt');
const checkBruteForce = require('../middlewares/bruteForceCheck');
const detectPayload = require('../middlewares/detectPayload');

router.post('/login', detectPayload, async (req, res) => {
    const { username, password } = req.body;

    try {
        console.log("Received login request:", req.body);

        // Get full client IP address
        const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        // Check for brute force attempts
        const isBlocked = await checkBruteForce(clientIp);
        if (isBlocked) {
            return res.status(403).json({ message: 'Too many failed attempts. You are temporarily blocked.' });
        }

        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            console.log("User not found, logging failed attempt.");
            await LoginAttempt.create({
                ip: clientIp, // Updated to capture full IP
                username: username || "Unknown",
                status: 'Failed',
                timestamp: new Date()
            });
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Password mismatch, logging failed attempt.");
            await LoginAttempt.create({
                ip: clientIp,
                username,
                status: 'Failed',
                timestamp: new Date()
            });
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // If successful, log success and generate token
        await LoginAttempt.create({
            ip: clientIp,
            username,
            status: 'Success',
            timestamp: new Date()
        });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, message: 'Login successful' });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: 'Server error' });
    }
});
module.exports = router;
