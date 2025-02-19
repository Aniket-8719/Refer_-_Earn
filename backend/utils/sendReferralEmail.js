const nodemailer = require("nodemailer");
require("dotenv").config(); // Ensure environment variables are loaded

const sendReferralEmail = async (referrerName, referrerEmail, refereeName, refereeEmail, courseName) => {
    const transporter = nodemailer.createTransport({
        service: process.env.SMTP_SERVICE, 
        auth: {
            user: process.env.SMTP_MAIL, 
            pass: process.env.SMTP_PASSWORD, 
        },
    });

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: referrerEmail,
        subject: "Referral Submission Confirmation",
        html: `
            <h3>Referral Submitted Successfully! 🎉</h3>
            <p>Dear <strong>${referrerName}</strong>,</p>
            <p>Thank you for referring <strong>${refereeName}</strong> for the <strong>${courseName}</strong> course.</p>
            <p>We will reach out to <strong>${refereeEmail}</strong> soon.</p>
            <p>Best Regards,</p>
            <p>Your Team</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("✅ Referral email sent successfully to:", referrerEmail);
    } catch (error) {
        console.error("❌ Error sending email:", error);
    }
};

module.exports = sendReferralEmail;
