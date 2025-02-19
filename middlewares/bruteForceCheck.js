const LoginAttempt = require('../models/LoginAttempt');

const MAX_ATTEMPTS = 10;  // Max failed attempts before block
const BLOCK_TIME = 30 * 60 * 1000; // 30 minutes in milliseconds

const checkBruteForce = async (ip) => {
    console.log(`Checking brute force for IP: ${ip}`);

    // 1. Check if IP is already blocked
    const blockedUser = await LoginAttempt.findOne({
        ip: ip,
        status: 'Blocked',
        blockedUntil: { $gt: new Date() } // User is still in blocked period
    });

    if (blockedUser) {
        console.log(`IP ${ip} is blocked until ${blockedUser.blockedUntil}`);
        return true; // User is blocked
    }

    // 2. Count failed attempts in the last 30 minutes
    const failedAttempts = await LoginAttempt.countDocuments({
        ip: ip,
        status: 'Failed',
        timestamp: { $gte: new Date(Date.now() - BLOCK_TIME) }
    });

    console.log(`Failed attempts for ${ip}: ${failedAttempts}`);

    // 3. If 10+ failed attempts, block the user
    if (failedAttempts >= MAX_ATTEMPTS) {
        console.log(`Blocking IP: ${ip} for ${BLOCK_TIME / 60000} minutes`);

        await LoginAttempt.create({
            ip: ip,
            status: 'Blocked',
            blockedUntil: new Date(Date.now() + BLOCK_TIME),
            timestamp: new Date()
        });

        return true; // User is now blocked
    }

    return false;
};

module.exports = checkBruteForce;
