const nodemailer = require('nodemailer');

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
        rejectUnauthorized: false
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    debug: true,
    logger: true
});

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

// Send contact form notification email
const sendContactFormEmail = async (formData) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Send to your own email
        subject: `New Contact Form Submission - ${formData.name}`,
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #FDB714; margin-top: 0;">New Contact Form Submission</h2>
          
          <div style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
            <h3 style="color: #333; margin-top: 0;">Contact Details</h3>
            <p style="margin: 10px 0;"><strong>Name:</strong> ${formData.name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
            <p style="margin: 10px 0;"><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
            <p style="margin: 10px 0;"><strong>Company Website:</strong> ${formData.companyWebsite ? `<a href="${formData.companyWebsite}">${formData.companyWebsite}</a>` : 'Not provided'}</p>
          </div>

          <div style="margin: 20px 0; padding: 15px; background-color: #fff3cd; border-radius: 5px; border-left: 4px solid #FDB714;">
            <h3 style="color: #333; margin-top: 0;">Looking For</h3>
            <p style="margin: 0; font-size: 16px; color: #555;">${formData.lookingFor}</p>
          </div>

          ${formData.message ? `
          <div style="margin: 20px 0; padding: 15px; background-color: #e7f3ff; border-radius: 5px;">
            <h3 style="color: #333; margin-top: 0;">Message</h3>
            <p style="margin: 0; color: #555; white-space: pre-wrap;">${formData.message}</p>
          </div>
          ` : ''}

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #888; font-size: 12px; margin: 0;">
              Submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
            </p>
          </div>
        </div>
      </div>
    `
    };

    await transporter.sendMail(mailOptions);
};

module.exports = {
    transporter,
    sendOTPEmail,
    sendContactFormEmail
};
