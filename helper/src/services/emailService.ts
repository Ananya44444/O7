import nodemailer from 'nodemailer';

// Email configuration (commented out for now since no email credentials)
// const transporter = nodemailer.createTransport({
//   service: process.env.EMAIL_SERVICE || 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// Mock transporter for development
const transporter = {
  sendMail: async (mailOptions: any) => {
    console.log('Mock email sent:', mailOptions);
    return Promise.resolve({ messageId: 'mock-id' });
  }
};

// Email interface
interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

// Send email function
export const sendEmail = async (options: EmailOptions): Promise<void> => {
  try {
    const mailOptions = {
      from: options.from || process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${options.to}`);
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error('Failed to send email');
  }
};

// Send welcome email to new users
export const sendWelcomeEmail = async (email: string, firstName: string): Promise<void> => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Welcome to MasterSolis!</h2>
      <p>Dear ${firstName},</p>
      <p>Thank you for joining MasterSolis. We're excited to have you on board!</p>
      <p>You can now:</p>
      <ul>
        <li>Browse our latest job opportunities</li>
        <li>Create and manage your professional resume</li>
        <li>Apply to positions that match your skills</li>
      </ul>
      <p>If you have any questions, feel free to contact our support team.</p>
      <p>Best regards,<br>The MasterSolis Team</p>
    </div>
  `;

  await sendEmail({
    to: email,
    subject: 'Welcome to MasterSolis!',
    html
  });
};

// Send job application confirmation
export const sendApplicationConfirmation = async (
  email: string, 
  firstName: string, 
  jobTitle: string
): Promise<void> => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Application Received</h2>
      <p>Dear ${firstName},</p>
      <p>Thank you for applying to the <strong>${jobTitle}</strong> position at MasterSolis.</p>
      <p>We have received your application and our team will review it shortly. We will contact you if your qualifications match our requirements.</p>
      <p>In the meantime, feel free to browse other opportunities on our careers page.</p>
      <p>Best regards,<br>The MasterSolis Recruitment Team</p>
    </div>
  `;

  await sendEmail({
    to: email,
    subject: `Application Received - ${jobTitle}`,
    html
  });
};

// Send password reset email
export const sendPasswordResetEmail = async (
  email: string, 
  resetToken: string
): Promise<void> => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Password Reset Request</h2>
      <p>You requested a password reset for your MasterSolis account.</p>
      <p>Click the button below to reset your password:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" 
           style="background-color: #007bff; color: white; padding: 12px 24px; 
                  text-decoration: none; border-radius: 5px; display: inline-block;">
          Reset Password
        </a>
      </div>
      <p>If you didn't request this reset, please ignore this email.</p>
      <p>This link will expire in 1 hour.</p>
      <p>Best regards,<br>The MasterSolis Team</p>
    </div>
  `;

  await sendEmail({
    to: email,
    subject: 'Password Reset Request',
    html
  });
};