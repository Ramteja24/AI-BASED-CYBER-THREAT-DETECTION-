const mongoose = require('mongoose');
const dotenv = require('dotenv');
const PayloadPattern = require('../models/PayloadPattern');

dotenv.config();
mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('MongoDB Connected');

        const patterns = [
            // SQL Injection Patterns
            { type: 'SQL Injection', pattern: "' OR 1=1--" },
            { type: 'SQL Injection', pattern: "'; DROP TABLE users;--" },
            { type: 'SQL Injection', pattern: "' UNION SELECT NULL, NULL--" },

            // XSS Patterns
            { type: 'XSS', pattern: "<script>alert('XSS')</script>" },
            { type: 'XSS', pattern: "<img src='x' onerror='alert(1)'>" }
        ];

        await PayloadPattern.insertMany(patterns);
        console.log('Payload Patterns Seeded');
        process.exit();
    })
    .catch(err => console.error(err));
