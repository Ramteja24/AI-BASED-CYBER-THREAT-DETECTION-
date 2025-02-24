const LoginAttempt = require('../models/LoginAttempt');
const PayloadPattern = require('../models/PayloadPattern'); // Import new model

const sqlInjectionPatterns = [
    /(\b(SELECT|UPDATE|DELETE|INSERT|DROP|UNION|ALTER|CREATE|EXEC)\b)/i,
    /(--|#|\/\*|\*\/)/,  // SQL comment patterns
    /(\b(OR|AND)\s+\d+=\d+)/i  // OR 1=1, AND 1=1 patterns
];

const xssPatterns = [
    /(<script\b[^>]*>[\s\S]*?<\/script>)/i,
    /((on\w+)=["']?[^"'\s>]+["']?)/i,  // Inline event handlers
    /(\b(alert|document\.cookie|window\.location|eval)\b)/i
];

module.exports = async (req, res, next) => {
    const { username, password } = req.body;
    const clientIp = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress;

    let attackType = null;

    if (sqlInjectionPatterns.some(pattern => pattern.test(username) || pattern.test(password))) {
        attackType = 'SQL Injection';
    } else if (xssPatterns.some(pattern => pattern.test(username) || pattern.test(password))) {
        attackType = 'XSS Attack';
    }

    if (attackType) {
        await PayloadPattern.create({
            ip: clientIp,
            username: username || "Unknown",
            type: attackType  // Logging SQL/XSS under separate collection
        });

        return res.status(400).json({ message: `Potential ${attackType} detected. Access denied.` });
    }

    next();
};
