const User = require('../models/User');
const OTP = require('../models/OTP');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Configure email transporter
// Configure email transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // use STARTTLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    },
    // Fail faster if connection hangs (10 seconds)
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    debug: true,
    logger: true
});

// Generate 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP email
const sendOTPEmail = async (email, otp, name) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify Your Email - Influencer Platform',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Welcome to Influencer Platform!</h2>
        <p>Hi ${name},</p>
        <p>Thank you for signing up. Please use the following OTP to verify your email address:</p>
        <div style="background-color: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0;">
          <h1 style="color: #FDB714; letter-spacing: 5px; margin: 0;">${otp}</h1>
        </div>
        <p>This OTP will expire in 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <br>
        <p>Best regards,<br>Influencer Platform Team</p>
      </div>
    `
    };

    await transporter.sendMail(mailOptions);
};

// Signup controller
exports.signup = async (req, res) => {
    try {
        const { name, email, phone, password, userType } = req.body;

        // Validate input
        if (!name || !email || !phone || !password || !userType) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        // Validate userType
        if (!['brand', 'influencer'].includes(userType)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid user type'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            if (existingUser.isVerified) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already registered. Please login.'
                });
            } else {
                // Delete unverified user to allow re-registration
                await User.deleteOne({ email });
            }
        }

        // Create new user (not verified yet)
        const user = new User({
            name,
            email,
            phone,
            password,
            userType,
            isVerified: false
        });

        await user.save();

        // Generate and save OTP
        const otp = generateOTP();
        const otpDoc = new OTP({
            email,
            otp
        });

        await otpDoc.save();

        // Send OTP email
        await sendOTPEmail(email, otp, name);

        res.status(200).json({
            success: true,
            message: 'OTP sent to your email. Please verify to complete registration.',
            email
        });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error. Please try again later.',
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

// Verify OTP controller
exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and OTP'
            });
        }

        // Find OTP
        const otpDoc = await OTP.findOne({ email, otp });

        if (!otpDoc) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired OTP'
            });
        }

        // Check if OTP is expired
        if (new Date() > otpDoc.expiresAt) {
            await OTP.deleteOne({ email });
            return res.status(400).json({
                success: false,
                message: 'OTP has expired. Please request a new one.'
            });
        }

        // Find and verify user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Update user as verified
        user.isVerified = true;
        await user.save();

        // Delete OTP after successful verification
        await OTP.deleteOne({ email });

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                userType: user.userType
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({
            success: true,
            message: 'Email verified successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                userType: user.userType
            }
        });

    } catch (error) {
        console.error('OTP verification error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
};

// Login controller
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Check if user is verified
        if (!user.isVerified) {
            return res.status(401).json({
                success: false,
                message: 'Please verify your email first'
            });
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                userType: user.userType
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                userType: user.userType
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                userType: user.userType
            }
        });

    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
};

// Resend OTP
exports.resendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email'
            });
        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (user.isVerified) {
            return res.status(400).json({
                success: false,
                message: 'Email already verified. Please login.'
            });
        }

        // Generate and save new OTP
        const otp = generateOTP();
        const otpDoc = new OTP({
            email,
            otp
        });

        await otpDoc.save();

        // Send OTP email
        await sendOTPEmail(email, otp, user.name);

        res.status(200).json({
            success: true,
            message: 'New OTP sent to your email'
        });

    } catch (error) {
        console.error('Resend OTP error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
};

// Update Profile
exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, bio, avatarColor, avatarIcon } = req.body;

        // Find user
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Update fields
        if (name) user.name = name;
        if (bio !== undefined) user.bio = bio;
        if (avatarColor) user.avatarColor = avatarColor;
        if (avatarIcon) user.avatarIcon = avatarIcon;

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: {
                name: user.name,
                email: user.email,
                bio: user.bio,
                avatarColor: user.avatarColor,
                avatarIcon: user.avatarIcon,
                userType: user.userType
            }
        });

    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
};
