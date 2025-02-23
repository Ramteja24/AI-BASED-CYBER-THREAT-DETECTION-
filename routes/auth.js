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
        console.log("Received login request:", { username });

        // Get full client IP address
        const clientIp = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress;
        console.log(`Client IP: ${clientIp}`);

        // Check for brute force attempts
        const isBlocked = await checkBruteForce(clientIp);
        if (isBlocked) {
            console.warn(`Blocked login attempt from IP: ${clientIp}`);
            return res.status(403).json({ message: 'Too many failed attempts. You are temporarily blocked.' });
        }

        // Validate user existence
        const user = await User.findOne({ username });
        if (!user) {
            console.log(`User not found: ${username}`);
            await LoginAttempt.create({
                ip: clientIp,
                username: username || "Unknown",
                status: 'Failed',
                timestamp: new Date()
            });
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log(`Password mismatch for user: ${username}`);
            await LoginAttempt.create({
                ip: clientIp,
                username,
                status: 'Failed',
                timestamp: new Date()
            });
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Clear old failed attempts upon successful login
        await LoginAttempt.deleteMany({ ip: clientIp, status: 'Failed' });

        // Log successful login attempt
        await LoginAttempt.create({
            ip: clientIp,
            username,
            status: 'Success',
            timestamp: new Date()
        });

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log(`Login successful for user: ${username}`);
        res.status(200).json({ token, message: 'Login successful' });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
