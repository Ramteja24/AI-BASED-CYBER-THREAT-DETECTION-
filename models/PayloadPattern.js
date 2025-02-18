const mongoose = require('mongoose');

const PayloadPatternSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['SQL Injection', 'XSS'],
    },
    pattern: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('PayloadPattern', PayloadPatternSchema);
