import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { LogIn, Mail, Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Signup specific validations
    if (!isLogin) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required';
      }
      if (!formData.confirmPassword.trim()) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    return newErrors;
  };

  const simulateLoginError = () => {
    // Simulate some common login errors for demo purposes
    const mockErrors = [
      { email: 'Invalid email or password' },
      { general: 'Account temporarily locked. Please try again later.' }
    ];
    
    // Randomly select an error for demo (in real app, this would come from API)
    const randomError = mockErrors[Math.floor(Math.random() * mockErrors.length)];
    return randomError;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      if (isLogin) {
        // Simulate login errors occasionally for demo
        if (Math.random() < 0.3) { // 30% chance of error for demo
          const mockError = simulateLoginError();
          setErrors(mockError);
          setIsSubmitting(false);
          return;
        }
        // Successful login - go directly to home
        onNavigate('home');
      } else {
        // Simulate signup errors occasionally for demo
        if (Math.random() < 0.2 && formData.email.includes('test')) { // 20% chance if email contains 'test'
          setErrors({ email: 'This email is already registered' });
          setIsSubmitting(false);
          return;
        }
        // Successful signup - go to preferences
        onNavigate('preferences');
      }
    } catch (error) {
      setErrors({ general: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 border-2 border-gray-800 bg-white">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 border-2 border-gray-800 rounded-full"></div>
            <h1 className="text-2xl">event sense</h1>
          </div>
          <p className="text-gray-600">
            {isLogin ? 'Welcome back! Sign in to your account.' : 'Create your account to get started.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Error Message */}
          {errors.general && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
              <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
              <p className="text-red-600 text-lg">{errors.general}</p>
            </div>
          )}

          {!isLogin && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm">First Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`pl-10 border-2 focus:border-gray-800 ${
                      errors.firstName ? 'border-red-500 focus:border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-1 text-red-600 text-lg flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm">Last Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`pl-10 border-2 focus:border-gray-800 ${
                      errors.lastName ? 'border-red-500 focus:border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-1 text-red-600 text-lg flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>
          )}

          <div>
            <label className="block mb-2 text-sm">Email Address</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`pl-10 border-2 focus:border-gray-800 ${
                  errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-red-600 text-lg flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`pl-10 pr-10 border-2 focus:border-gray-800 ${
                  errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-red-600 text-lg flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.password}
              </p>
            )}
          </div>

          {!isLogin && (
            <div>
              <label className="block mb-2 text-sm">Confirm Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`pl-10 border-2 focus:border-gray-800 ${
                    errors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-red-600 text-lg flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          )}

          {isLogin && (
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="rounded border-gray-300" />
                Remember me
              </label>
              <button 
                type="button" 
                onClick={() => onNavigate('password-reset')}
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </button>
            </div>
          )}

          <Button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <LogIn size={18} />
            {isSubmitting ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
          </Button>
        </form>

        <div className="mt-6">
          <Separator className="my-4" />
          <div className="text-center">
            <span className="text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </span>
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setErrors({});
                setFormData({
                  email: '',
                  password: '',
                  confirmPassword: '',
                  firstName: '',
                  lastName: ''
                });
              }}
              className="ml-2 text-sm text-blue-600 hover:underline"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => onNavigate('home')}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Continue as guest
          </button>
        </div>
      </Card>
    </div>
  );
}