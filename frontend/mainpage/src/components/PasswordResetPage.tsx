import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Mail, ArrowLeft, AlertCircle, CheckCircle, Lock } from 'lucide-react';

interface PasswordResetPageProps {
  onNavigate: (page: string) => void;
}

type ResetStep = 'email' | 'verification' | 'newPassword' | 'success';

export function PasswordResetPage({ onNavigate }: PasswordResetPageProps) {
  const [currentStep, setCurrentStep] = useState<ResetStep>('email');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle email submission
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    // Validate email
    if (!email.trim()) {
      setErrors({ email: 'Email is required' });
      setIsSubmitting(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors({ email: 'Please enter a valid email address' });
      setIsSubmitting(false);
      return;
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // TODO: Replace with actual API call
    // Example API integration:
    /*
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      if (!response.ok) {
        const error = await response.json();
        setErrors({ email: error.message || 'Failed to send verification code' });
        setIsSubmitting(false);
        return;
      }
      
      // Success - move to verification step
      setCurrentStep('verification');
    } catch (error) {
      setErrors({ email: 'Something went wrong. Please try again.' });
    }
    */

    // For now, simulate successful email sending
    setIsSubmitting(false);
    setCurrentStep('verification');
  };

  // Handle verification code input
  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single character
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }

    // Clear error when user starts typing
    if (errors.code) {
      setErrors({ ...errors, code: '' });
    }
  };

  // Handle verification code submission
  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    const code = verificationCode.join('');
    if (code.length !== 6) {
      setErrors({ code: 'Please enter the complete 6-digit code' });
      setIsSubmitting(false);
      return;
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // TODO: Replace with actual API call
    // Example API integration:
    /*
    try {
      const response = await fetch('/api/auth/verify-reset-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      });
      
      if (!response.ok) {
        const error = await response.json();
        setErrors({ code: error.message || 'Invalid verification code' });
        setIsSubmitting(false);
        return;
      }
      
      // Success - move to new password step
      setCurrentStep('newPassword');
    } catch (error) {
      setErrors({ code: 'Something went wrong. Please try again.' });
    }
    */

    // For now, simulate successful verification
    setIsSubmitting(false);
    setCurrentStep('newPassword');
  };

  // Handle new password submission
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    // Validate passwords
    if (!newPassword.trim()) {
      setErrors({ password: 'Password is required' });
      setIsSubmitting(false);
      return;
    }
    if (newPassword.length < 6) {
      setErrors({ password: 'Password must be at least 6 characters' });
      setIsSubmitting(false);
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      setIsSubmitting(false);
      return;
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // TODO: Replace with actual API call
    // Example API integration:
    /*
    try {
      const code = verificationCode.join('');
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          code, 
          newPassword 
        })
      });
      
      if (!response.ok) {
        const error = await response.json();
        setErrors({ password: error.message || 'Failed to reset password' });
        setIsSubmitting(false);
        return;
      }
      
      // Success - show success message
      setCurrentStep('success');
    } catch (error) {
      setErrors({ password: 'Something went wrong. Please try again.' });
    }
    */

    // For now, simulate successful password reset
    setIsSubmitting(false);
    setCurrentStep('success');
  };

  // Handle resending verification code
  const handleResendCode = async () => {
    setIsSubmitting(true);
    setErrors({});

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // TODO: Replace with actual API call
    // Example API integration:
    /*
    try {
      const response = await fetch('/api/auth/resend-reset-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      if (!response.ok) {
        const error = await response.json();
        setErrors({ code: error.message || 'Failed to resend code' });
        setIsSubmitting(false);
        return;
      }
      
      // Show success message (you could add a toast notification here)
      alert('Verification code resent successfully!');
    } catch (error) {
      setErrors({ code: 'Something went wrong. Please try again.' });
    }
    */

    // For now, simulate successful resend
    setIsSubmitting(false);
    setVerificationCode(['', '', '', '', '', '']);
    // You could add a toast notification here instead of alert
    alert('Verification code resent to ' + email);
  };

  // Render email input step
  const renderEmailStep = () => (
    <>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-medium mb-2">Reset Your Password</h2>
        <p className="text-gray-600">
          Enter your email address and we'll send you a verification code to reset your password.
        </p>
      </div>

      <form onSubmit={handleEmailSubmit} className="space-y-6">
        {errors.email && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
            <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
            <p className="text-red-600 text-sm">{errors.email}</p>
          </div>
        )}

        <div>
          <label className="block mb-2 text-sm font-medium">Email Address</label>
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({});
              }}
              className={`pl-10 border-2 focus:border-gray-800 ${
                errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300'
              }`}
            />
          </div>
        </div>

        <Button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gray-800 hover:bg-gray-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Verification Code'}
        </Button>
      </form>
    </>
  );

  // Render verification code step
  const renderVerificationStep = () => (
    <>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-medium mb-2">Enter Verification Code</h2>
        <p className="text-gray-600">
          We've sent a 6-digit code to <span className="font-medium">{email}</span>
        </p>
      </div>

      <form onSubmit={handleVerificationSubmit} className="space-y-6">
        {errors.code && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
            <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
            <p className="text-red-600 text-sm">{errors.code}</p>
          </div>
        )}

        <div>
          <label className="block mb-4 text-sm font-medium text-center">Verification Code</label>
          <div className="flex justify-center gap-2">
            {verificationCode.map((digit, index) => (
              <Input
                key={index}
                id={`code-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Backspace' && !digit && index > 0) {
                    const prevInput = document.getElementById(`code-${index - 1}`);
                    prevInput?.focus();
                  }
                }}
                className={`w-12 h-12 text-center text-xl font-semibold border-2 focus:border-gray-800 ${
                  errors.code ? 'border-red-500 focus:border-red-500' : 'border-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        <Button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gray-800 hover:bg-gray-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Verifying...' : 'Verify Code'}
        </Button>

        <div className="text-center">
          <button
            type="button"
            onClick={handleResendCode}
            disabled={isSubmitting}
            className="text-sm text-gray-600 hover:text-gray-800 underline disabled:text-gray-400"
          >
            Didn't receive the code? Resend
          </button>
        </div>
      </form>
    </>
  );

  // Render new password step
  const renderNewPasswordStep = () => (
    <>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-medium mb-2">Create New Password</h2>
        <p className="text-gray-600">
          Choose a strong password for your account.
        </p>
      </div>

      <form onSubmit={handlePasswordSubmit} className="space-y-6">
        {errors.password && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
            <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
            <p className="text-red-600 text-sm">{errors.password}</p>
          </div>
        )}

        <div>
          <label className="block mb-2 text-sm font-medium">New Password</label>
          <div className="relative">
            <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="password"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (errors.password) setErrors({});
              }}
              className={`pl-10 border-2 focus:border-gray-800 ${
                errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-300'
              }`}
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">Must be at least 6 characters</p>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Confirm New Password</label>
          <div className="relative">
            <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword) setErrors({});
              }}
              className={`pl-10 border-2 focus:border-gray-800 ${
                errors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-gray-300'
              }`}
            />
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-red-600 text-sm flex items-center gap-1">
              <AlertCircle size={14} />
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <Button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gray-800 hover:bg-gray-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Resetting Password...' : 'Reset Password'}
        </Button>
      </form>
    </>
  );

  // Render success step
  const renderSuccessStep = () => (
    <>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h2 className="text-2xl font-medium mb-2">Password Reset Successful!</h2>
        <p className="text-gray-600">
          Your password has been successfully reset. You can now sign in with your new password.
        </p>
      </div>

      <Button 
        onClick={() => onNavigate('login')}
        className="w-full bg-gray-800 hover:bg-gray-700 text-white"
      >
        Go to Sign In
      </Button>
    </>
  );

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 border-2 border-gray-800 bg-white">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-8 h-8 border-2 border-gray-800 rounded-full"></div>
          <h1 className="text-2xl">event sense</h1>
        </div>

        {currentStep === 'email' && renderEmailStep()}
        {currentStep === 'verification' && renderVerificationStep()}
        {currentStep === 'newPassword' && renderNewPasswordStep()}
        {currentStep === 'success' && renderSuccessStep()}

        {currentStep !== 'success' && (
          <div className="mt-6 text-center">
            <button
              onClick={() => onNavigate('login')}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center gap-2 mx-auto"
            >
              <ArrowLeft size={16} />
              Back to Sign In
            </button>
          </div>
        )}
      </Card>
    </div>
  );
}
