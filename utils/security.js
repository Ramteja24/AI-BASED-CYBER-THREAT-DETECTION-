// utils/security.js

const LoginAttempt = require('../models/LoginAttempt');

// Brute Force Detection Function
const checkBruteForce = async (ip) => {
    console.log(`Checking brute force for IP: ${ip}`);

    // Count failed attempts
    const attempts = await LoginAttempt.find({ ip, status: 'Failed' }).sort({ timestamp: -1 });

    // Check if IP is already blocked
    const blocked = await LoginAttempt.findOne({ ip, status: 'Blocked' }).sort({ timestamp: -1 });

    if (blocked) {
        const blockTime = new Date(blocked.timestamp);
        const currentTime = new Date();
        const timeDiff = (currentTime - blockTime) / (1000 * 60); // Time diff in minutes

        if (timeDiff <= 15) {
            console.log(`❌ IP ${ip} is temporarily blocked.`);
            return { status: 'Blocked', message: 'IP temporarily blocked. Try again later.' };
        } else {
            // Unblock after 15 minutes
            await LoginAttempt.deleteOne({ _id: blocked._id });
        }
    }

    // If more than 10 failed attempts, give warning
    if (attempts.length > 10) {
        console.log(`⚠️ Warning: IP ${ip} has more than 10 failed attempts.`);
        
        // Check if a warning is already issued
        const warned = await LoginAttempt.findOne({ ip, status: 'Warning' }).sort({ timestamp: -1 });
        
        if (warned) {
            console.log(`🚫 IP ${ip} ignored warning and is now blocked.`);
            // If warned and still trying, block the IP
            await LoginAttempt.create({ ip, status: 'Blocked', timestamp: new Date() });
            return { status: 'Blocked', message: 'IP temporarily blocked. Try again later.' };
        } else {
            // Issue warning
            await LoginAttempt.create({ ip, status: 'Warning', timestamp: new Date() });
            return { status: 'Warning', message: 'Too many failed attempts. Next attempt will be blocked.' };
        }
    }

    // If less than 10 attempts, allow further attempts
    return { status: 'Allowed', message: 'Proceed with login' };
};

module.exports = { checkBruteForce };
