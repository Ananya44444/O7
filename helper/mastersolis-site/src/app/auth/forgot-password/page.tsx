'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { isValidEmail } from '@/lib/utils';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const validateEmail = (): boolean => {
    if (!email) {
      setError('Email is required');
      return false;
    } else if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        setEmailSent(true);
        if (data.devNote) {
          console.log('🔧 Development Mode:', data.devNote);
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Forgot password error:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  if (emailSent) {
    return (
      <div className="min-h-screen academy-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
        <div className="academy-bg-pattern"></div>
        <div className="max-w-md w-full relative z-10">
          <div className="text-center mb-8">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="academy-gradient p-4 rounded-2xl shadow-xl">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl font-bold academy-text-gradient mb-2">Check Your Email</h1>
            <p className="academy-text-muted text-lg">
              We've sent password reset instructions to your academy email
            </p>
          </div>

          <div className="academy-glass-card p-8 rounded-3xl text-center">
            <div className="mb-6">
              <svg className="w-16 h-16 academy-gradient-text mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-2xl font-bold text-white mb-4">Email Sent Successfully!</h2>
              <p className="academy-text-muted leading-relaxed">
                We've sent password reset instructions to <span className="academy-gradient-text font-medium">{email}</span>. 
                Please check your inbox and follow the link to reset your password.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-sm academy-text-muted">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              
              <Button
                onClick={() => {
                  setEmailSent(false);
                  setEmail('');
                  setError('');
                }}
                className="w-full academy-btn-secondary h-12"
              >
                Try Different Email
              </Button>

              <div className="text-center">
                <Link href="/auth/login" className="academy-gradient-text font-medium hover:opacity-80 transition-opacity">
                  Back to Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen academy-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="academy-bg-pattern"></div>
      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-8">
          {/* Academy Logo */}
          <div className="flex justify-center mb-6">
            <div className="academy-gradient p-4 rounded-2xl shadow-xl">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold academy-text-gradient mb-2">Reset Password</h1>
          <p className="academy-text-muted text-lg">
            Enter your academy email to reset your password
          </p>
        </div>

        <div className="academy-glass-card p-8 rounded-3xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Forgot Your Password?</h2>
            <p className="academy-text-muted">
              No worries! We'll help you get back to your learning journey
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-3">
                Academy Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your registered email"
                className={`academy-input h-12 ${error ? 'border-red-400' : ''}`}
                required
              />
              {error && (
                <p className="mt-2 text-sm text-red-400 flex items-center space-x-1">
                  <span>⚠️</span>
                  <span>{error}</span>
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full academy-btn-primary h-12 text-lg font-semibold"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Sending...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>Send Reset Instructions</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center space-y-4">
            <div className="academy-text-muted text-sm">
              Remember your password?{' '}
              <Link href="/auth/login" className="academy-gradient-text font-medium hover:opacity-80 transition-opacity">
                Sign in instead
              </Link>
            </div>
            
            <div className="academy-text-muted text-sm">
              Don't have an account?{' '}
              <Link href="/auth/register" className="academy-gradient-text font-medium hover:opacity-80 transition-opacity">
                Start your learning journey
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;