const LoginAttempt = require('../models/LoginAttempt');

const sqlInjectionPatterns = [
    /(\b(SELECT|UPDATE|DELETE|INSERT|DROP|UNION|ALTER|CREATE|EXEC)\b)/i,
    /(--|#|\/\*|\*\/)/,  // Comment patterns
    /(\b(OR|AND)\s+\d+=\d+)/i  // OR 1=1, AND 1=1
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
        await LoginAttempt.create({
            ip: clientIp,
            username: username || "Unknown",
            status: 'Failed',
            timestamp: new Date(),
            warning: attackType  // Logging SQL/XSS under 'warning'
        });

        return res.status(400).json({ message: `Potential ${attackType} detected. Access denied.` });
    }

    next();
};
