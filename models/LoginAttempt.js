const mongoose = require('mongoose');

const loginAttemptSchema = new mongoose.Schema({
    username: { type: String, required: true },
    ip: { type: String, required: true },
    status: { type: String, required: true, enum: ['Success', 'Failed', 'Blocked'] },
    timestamp: { type: Date, default: Date.now },
    warning: { type: String, default: null },
    blockedUntil: { type: Date, default: null } // ⬅️ NEW FIELD for block expiration
});

module.exports = mongoose.model('LoginAttempt', loginAttemptSchema);
