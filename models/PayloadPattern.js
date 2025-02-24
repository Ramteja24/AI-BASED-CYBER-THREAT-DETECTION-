const mongoose = require('mongoose');

const payloadPatternSchema = new mongoose.Schema({
    ip: { type: String, required: true },
    username: { type: String, default: "Unknown" },
    type: { type: String, required: true },  // 'SQL Injection' or 'XSS Attack'
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PayloadPattern', payloadPatternSchema);
