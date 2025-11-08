# Email Configuration Setup Guide

This application uses [Resend](https://resend.com) for sending emails. To enable actual email sending (not just console logging), follow these steps:

## 1. Get a Resend API Key

1. Go to [resend.com](https://resend.com) and sign up for a free account
2. Navigate to the API Keys section in your dashboard
3. Create a new API key
4. Copy the API key (it starts with `re_`)

## 2. Configure Environment Variables

Update your `.env.local` file with your actual API key:

```bash
# Email Configuration
RESEND_API_KEY=re_your_actual_api_key_here
EMAIL_FROM=noreply@yourdomain.com
```

## 3. Domain Verification (For Production)

For production use, you'll need to verify your domain:

1. In your Resend dashboard, go to Domains
2. Add your domain (e.g., mastersolis.com)
3. Add the required DNS records to verify ownership
4. Update `EMAIL_FROM` to use your verified domain

## 4. Development Mode

In development mode (when API key is not configured), the system will:
- Log the password reset URL to the console
- Still create the reset token in the database
- Allow testing the complete flow without actually sending emails

## 5. Testing

To test the email functionality:

1. Go to `/auth/forgot-password`
2. Enter an email address of a registered user
3. Check the console logs for the reset URL (in development)
4. Copy the URL and open it in your browser
5. Complete the password reset process

## Current Status

- ✅ Password reset token generation
- ✅ Database storage of reset tokens
- ✅ Email template design
- ✅ Reset password flow
- ✅ Development mode logging
- 🔧 Production email sending (requires API key setup)

## Free Tier Limits

Resend free tier includes:
- 3,000 emails per month
- 100 emails per day
- Perfect for development and small applications