const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const LoginAttempt = require('../models/LoginAttempt');
const checkBruteForce = require('../middlewares/bruteForceCheck');
const detectPayload = require('../middlewares/detectPayload');

// Register Route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Hash password and save user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login Route with Brute Force and Payload Detection Middleware
router.post('/login', detectPayload, async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check for brute force attempts
        const isBlocked = await checkBruteForce(req.ip);
        if (isBlocked) {
            return res.status(403).json({ message: 'Too many failed attempts. You are temporarily blocked.' });
        }

        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            // Log failed attempt
            await LoginAttempt.create({
                ip: req.ip,
                status: 'Failed',
                timestamp: new Date()
            });
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // Log failed attempt
            await LoginAttempt.create({
                ip: req.ip,
                status: 'Failed',
                timestamp: new Date()
            });
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // If successful, log success and generate token
        await LoginAttempt.create({
            ip: req.ip,
            status: 'Success',
            timestamp: new Date()
        });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
