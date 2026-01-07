"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, AlertCircle, CheckCircle, KeyRound, Mail, Loader2 } from 'lucide-react';
import {
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle,
  resetPassword,
  resendConfirmationEmail,
  getAuthErrorMessage
} from '@/lib/supabase-auth';

interface AuthModalProps {
  mode: 'login' | 'signup';
  onClose: () => void;
  onSwitchMode: (mode: 'login' | 'signup') => void;
}

const schools = [
  { id: 'ardrey-kell', name: 'Ardrey Kell High School' },
  { id: 'community-house', name: 'Community House Middle School' },
  { id: 'other', name: 'Other School' },
];

export function AuthModal({ mode, onClose, onSwitchMode }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [schoolId, setSchoolId] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);
  const [confirmationEmail, setConfirmationEmail] = useState('');
  const { toast } = useToast();

  // Password validation
  const validatePassword = (password: string) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
    };
    return requirements;
  };

  const passwordRequirements = validatePassword(password);
  const isPasswordValid = Object.values(passwordRequirements).every(Boolean);

  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (mode === 'signup' && !isPasswordValid) {
      newErrors.password = 'Password does not meet requirements';
    }

    if (mode === 'signup') {
      if (!name.trim()) {
        newErrors.name = 'Full name is required';
      }
      if (!schoolId) {
        newErrors.schoolId = 'School selection is required';
      }
      if (!acceptedTerms) {
        newErrors.terms = 'You must accept the Terms and Conditions';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      if (mode === 'signup') {
        console.log('Creating user with Supabase:', email);
        
        const { user, session, error } = await signUpWithEmail({
          email,
          password,
          name: name.trim(),
          schoolId
        });

        if (error) {
          throw error;
        }

        if (user && !session) {
          // Email confirmation required
          setConfirmationEmail(email);
          setShowEmailConfirmation(true);
          toast({
            title: "Check Your Email",
            description: "We've sent you a confirmation link. Please verify your email to complete sign up.",
          });
        } else if (user && session) {
          // User created and logged in (email confirmation disabled)
          // Create user in our database
          const userData = {
            uid: user.id,
            name: user.user_metadata?.name || name.trim(),
            email: user.email!,
            schoolId: user.user_metadata?.school_id || schoolId,
          };

          const response = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
          });

          if (!response.ok) {
            console.error('Database save failed');
          }

          toast({
            title: "Success",
            description: "Account created successfully! Welcome to FBLA Elevate!",
          });
          onClose();
        }
      } else {
        // Login
        const { user, error } = await signInWithEmail({ email, password });

        if (error) {
          throw error;
        }

        if (user) {
          toast({
            title: "Success",
            description: "Welcome back! You're now logged in.",
          });
          onClose();
        }
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      const errorMessage = getAuthErrorMessage(error);

      toast({
        title: "Authentication Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (mode === 'signup' && !acceptedTerms) {
      setErrors({ terms: 'You must accept the Terms and Conditions to sign up with Google' });
      return;
    }

    setLoading(true);
    
    try {
      const { error } = await signInWithGoogle();
      
      if (error) {
        throw error;
      }
      // Redirect will happen automatically
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      const errorMessage = getAuthErrorMessage(error);
      
      toast({
        title: "Google Sign In Error",
        description: errorMessage,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setErrors({ email: 'Please enter your email address' });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const { error } = await resetPassword(email);

      if (error) {
        throw error;
      }

      toast({
        title: "Password Reset Email Sent",
        description: "Check your email for password reset instructions.",
      });
      setShowForgotPassword(false);
    } catch (error: any) {
      const errorMessage = getAuthErrorMessage(error);

      toast({
        title: "Reset Email Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    if (!confirmationEmail) return;

    setLoading(true);

    try {
      const { error } = await resendConfirmationEmail(confirmationEmail);

      if (error) {
        throw error;
      }

      toast({
        title: "Email Sent",
        description: "A new confirmation email has been sent.",
      });
    } catch (error: any) {
      const errorMessage = getAuthErrorMessage(error);

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Email confirmation view
  if (showEmailConfirmation) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-white">
              Verify Your Email
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-8 w-8 text-amber-500" />
              </div>
              <p className="text-slate-400 mb-2">
                We've sent a confirmation link to:
              </p>
              <p className="font-semibold text-white mb-4">{confirmationEmail}</p>
              <p className="text-sm text-slate-500">
                Click the link in the email to verify your account and start using FBLA Elevate.
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleResendConfirmation}
                variant="outline"
                className="w-full border-slate-600 bg-slate-800 hover:bg-slate-700 text-white"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Resend Confirmation Email'
                )}
              </Button>

              <Button
                onClick={() => {
                  setShowEmailConfirmation(false);
                  onSwitchMode('login');
                }}
                variant="ghost"
                className="w-full text-slate-400 hover:text-white hover:bg-slate-800"
              >
                Back to Login
              </Button>
            </div>

            <p className="text-xs text-center text-slate-500">
              Didn't receive the email? Check your spam folder or try resending.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-white">
            {mode === 'login' ? 'Welcome Back' : 'Join FBLA Elevate'}
          </DialogTitle>
          <DialogDescription className="text-center text-slate-400">
            {mode === 'login' 
              ? 'Sign in to continue your FBLA journey' 
              : 'Create your account to start preparing for FBLA competitions'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {showForgotPassword ? (
            <div className="space-y-4">
              <div className="text-center">
                <KeyRound className="mx-auto h-12 w-12 text-amber-500 mb-4" />
                <h3 className="text-lg font-semibold text-white">Reset Your Password</h3>
                <p className="text-sm text-slate-400 mt-2">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reset-email" className="text-slate-300">Email Address</Label>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-500 ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && <p className="text-sm text-red-400">{errors.email}</p>}
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleForgotPassword}
                  disabled={loading}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-semibold"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Reset Email'
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowForgotPassword(false)}
                  className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-800"
                >
                  Back to Login
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Google Sign In Button */}
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-3 py-6 border-slate-600 bg-slate-800 hover:bg-slate-700 text-white"
                onClick={handleGoogleSignIn}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                )}
                <span className="font-medium">
                  {mode === 'login' ? 'Sign in with Google' : 'Sign up with Google'}
                </span>
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full bg-slate-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-900 px-2 text-slate-500">Or continue with email</span>
                </div>
              </div>

              <form onSubmit={handleEmailAuth} className="space-y-4">
                {mode === 'signup' && (
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-300">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-500 ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && <p className="text-sm text-red-400">{errors.name}</p>}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-500 ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && <p className="text-sm text-red-400">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-300">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-500 ${errors.password ? 'border-red-500' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-sm text-red-400">{errors.password}</p>}
                </div>

                {mode === 'signup' && password && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-300">Password Requirements</Label>
                    <div className="space-y-1">
                      {Object.entries({
                        length: 'At least 8 characters',
                        uppercase: 'One uppercase letter',
                        lowercase: 'One lowercase letter',
                        number: 'One number'
                      }).map(([key, description]) => (
                        <div key={key} className="flex items-center gap-2 text-sm">
                          {passwordRequirements[key as keyof typeof passwordRequirements] ? (
                            <CheckCircle className="h-4 w-4 text-green-400" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-red-400" />
                          )}
                          <span className={passwordRequirements[key as keyof typeof passwordRequirements] ? 'text-green-400' : 'text-red-400'}>
                            {description}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {mode === 'signup' && (
                  <div className="space-y-2">
                    <Label htmlFor="school" className="text-slate-300">School</Label>
                    <Select value={schoolId} onValueChange={setSchoolId}>
                      <SelectTrigger className={`bg-slate-800 border-slate-700 text-white ${errors.schoolId ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Select your school" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        {schools.map((school) => (
                          <SelectItem key={school.id} value={school.id} className="text-white hover:bg-slate-700">
                            {school.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.schoolId && <p className="text-sm text-red-400">{errors.schoolId}</p>}
                  </div>
                )}

                {/* Terms and Conditions Checkbox - Only for Signup */}
                {mode === 'signup' && (
                  <div className="space-y-2">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="terms"
                        checked={acceptedTerms}
                        onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                        className={`border-slate-600 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500 ${errors.terms ? 'border-red-500' : ''}`}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-slate-300"
                        >
                          I agree to the Terms and Conditions
                        </label>
                        <p className="text-xs text-slate-500">
                          By signing up, you agree to our{' '}
                          <Link
                            href="/terms"
                            target="_blank"
                            className="text-amber-500 hover:text-amber-400 underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Terms and Conditions
                          </Link>
                          {' '}and{' '}
                          <Link
                            href="/terms"
                            target="_blank"
                            className="text-amber-500 hover:text-amber-400 underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Privacy Policy
                          </Link>
                          .
                        </p>
                      </div>
                    </div>
                    {errors.terms && <p className="text-sm text-red-400">{errors.terms}</p>}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait...
                    </>
                  ) : (
                    mode === 'login' ? 'Sign In' : 'Create Account'
                  )}
                </Button>
              </form>

              {mode === 'login' && (
                <div className="text-center">
                  <button
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-amber-500 hover:text-amber-400"
                  >
                    Forgot your password?
                  </button>
                </div>
              )}

              <div className="text-center text-sm">
                <span className="text-slate-400">
                  {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                </span>
                <button
                  onClick={() => onSwitchMode(mode === 'login' ? 'signup' : 'login')}
                  className="ml-2 text-amber-500 hover:text-amber-400 font-medium"
                >
                  {mode === 'login' ? 'Sign up' : 'Sign in'}
                </button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
