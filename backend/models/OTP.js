const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    otp: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true,
        default: () => new Date(Date.now() + 10 * 60 * 1000) // 10 minutes from now
    }
}, {
    timestamps: true
});

// Create index to automatically delete expired OTPs
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Only one OTP per email - remove old OTP when new one is created
otpSchema.pre('save', async function (next) {
    if (this.isNew) {
        await mongoose.model('OTP').deleteMany({ email: this.email });
    }
    next();
});

module.exports = mongoose.model('OTP', otpSchema);
