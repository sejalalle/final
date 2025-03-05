const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create reusable transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
    port: process.env.SMTP_PORT || 2525,
    auth: {
      user: process.env.SMTP_EMAIL || 'your-smtp-username',
      pass: process.env.SMTP_PASSWORD || 'your-smtp-password'
    }
  });

  // Define mail options
  const mailOptions = {
    from: process.env.FROM_EMAIL || 'noreply@yourdomain.com',
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  // Send email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;