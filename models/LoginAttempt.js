const mongoose = require('mongoose');

const loginAttemptSchema = new mongoose.Schema({
    username: { type: String, required: true },
    ip: { type: String, required: true },
    status: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    warning: { type: String, default: null }
});

module.exports = mongoose.model('LoginAttempt', loginAttemptSchema);
