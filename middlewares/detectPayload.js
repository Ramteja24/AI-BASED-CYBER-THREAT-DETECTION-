const PayloadPattern = require('../models/PayloadPattern');

const detectPayload = async (req, res, next) => {
    const inputFields = Object.values(req.body).join(' ');

    // Fetch patterns from MongoDB
    const patterns = await PayloadPattern.find({});
    for (const pattern of patterns) {
        const regex = new RegExp(pattern.pattern, 'i');
        if (regex.test(inputFields)) {
            console.log(`Potential ${pattern.type} Attack Detected!`);
            
            // Log attack in MongoDB
            await LoginAttempt.create({
                ip: req.ip,
                status: 'Attack Detected',
                warning: `${pattern.type} Pattern Matched`
            });

            // Return error response
            return res.status(403).json({ message: `Suspicious activity detected: ${pattern.type}` });
        }
    }
    next();
};

module.exports = detectPayload;
