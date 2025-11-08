import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { isValidEmail } from '@/lib/utils';
import { Resend } from 'resend';
import crypto from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate input
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (user) {
      // Generate a secure reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

      // Save reset token to user (you'll need to add these fields to your User model)
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpiry = resetTokenExpiry;
      await user.save();

      // Create reset URL
      const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${resetToken}`;

      try {
        // Check if Resend is configured
        if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_123456789_YOUR_REAL_API_KEY_HERE') {
          // For development: log the reset URL instead of sending email
          console.log('🔗 DEVELOPMENT MODE - Password reset URL:', resetUrl);
          console.log('📧 In production, this would be sent to:', email);
          return NextResponse.json(
            { 
              message: 'If an account with this email exists, a password reset link has been sent.',
              devNote: 'In development mode - check console for reset link'
            },
            { status: 200 }
          );
        }

        // Send email using Resend
        const { data, error } = await resend.emails.send({
          from: process.env.EMAIL_FROM || 'MasterSolis <noreply@mastersolis.com>',
          to: [email],
          subject: 'Reset Your MasterSolis Password',
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Reset Your Password</title>
                <style>
                  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: #2563eb; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
                  .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
                  .button { display: inline-block; background: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
                  .footer { text-align: center; margin-top: 30px; font-size: 14px; color: #666; }
                  .warning { background: #fef3cd; border: 1px solid #fde68a; color: #92400e; padding: 15px; border-radius: 6px; margin: 20px 0; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>🔐 Password Reset Request</h1>
                  </div>
                  <div class="content">
                    <h2>Hello!</h2>
                    <p>We received a request to reset your MasterSolis account password. If you didn't make this request, you can safely ignore this email.</p>
                    
                    <p>To reset your password, click the button below:</p>
                    
                    <div style="text-align: center;">
                      <a href="${resetUrl}" class="button">Reset My Password</a>
                    </div>
                    
                    <p>Or copy and paste this link into your browser:</p>
                    <p style="word-break: break-all; background: #e5e7eb; padding: 10px; border-radius: 4px; font-family: monospace;">${resetUrl}</p>
                    
                    <div class="warning">
                      <strong>⚠️ Security Notice:</strong><br>
                      • This link will expire in 1 hour<br>
                      • Only use this link if you requested a password reset<br>
                      • If you didn't request this, please ignore this email
                    </div>
                    
                    <p>If you have any questions or need assistance, please contact our support team.</p>
                    
                    <p>Best regards,<br><strong>The MasterSolis Team</strong></p>
                  </div>
                  <div class="footer">
                    <p>© ${new Date().getFullYear()} MasterSolis. All rights reserved.</p>
                    <p>This is an automated email. Please do not reply to this message.</p>
                  </div>
                </div>
              </body>
            </html>
          `,
        });

        if (error) {
          console.error('Resend error:', error);
          // Don't reveal the error to the user for security
        } else {
          console.log('Password reset email sent successfully:', data);
        }
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Continue without revealing the error
      }
    }

    // Always return success for security (don't reveal if email exists)
    return NextResponse.json(
      { message: 'If an account with this email exists, a password reset link has been sent.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { message: 'An error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}