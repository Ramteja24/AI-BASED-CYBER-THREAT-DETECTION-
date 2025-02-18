const LoginAttempt = require('../models/LoginAttempt');

// Set block duration (e.g., 30 minutes)
const BLOCK_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

const checkBruteForce = async (ip) => {
    console.log(`Checking brute force for IP: ${ip}`);

    // Check if IP is currently blocked
    const blockedRecord = await LoginAttempt.findOne({
        ip: ip,
        status: 'Warning',
        blockedUntil: { $gt: new Date() }
    });

    if (blockedRecord) {
        console.log('IP is temporarily blocked:', ip);
        return true;
    }

    // Fetch last 11 attempts
    const attempts = await LoginAttempt.find({ ip, status: 'Failed' }).sort({ timestamp: -1 }).limit(11);

    // If more than 10 failed attempts, add a warning
    if (attempts.length > 10) {
        console.log('Potential brute force attack detected.');
        
        // Check if warning is already recorded
        const lastWarning = await LoginAttempt.findOne({ ip, status: 'Warning' });
        
        if (!lastWarning) {
            // Store warning and block time in MongoDB
            await LoginAttempt.create({
                ip: ip,
                status: 'Warning',
                warning: 'Exceeding failed attempts',
                blockedUntil: new Date(Date.now() + BLOCK_DURATION)  // Set block time
            });
            console.log('Warning and block stored in MongoDB.');
        }
        
        return true;
    }

    return false;
};

module.exports = checkBruteForce;
