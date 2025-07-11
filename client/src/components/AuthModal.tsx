import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { X, Eye, EyeOff, AlertCircle, CheckCircle, KeyRound } from 'lucide-react';

interface AuthModalProps {
  mode: 'login' | 'signup';
  onClose: () => void;
  onSwitchMode: (mode: 'login' | 'signup') => void;
}

const schools = [
  { id: 'east-high', name: 'East High School' },
  { id: 'west-valley', name: 'West Valley High School' },
  { id: 'north-central', name: 'North Central High School' },
  { id: 'south-ridge', name: 'South Ridge High School' },
  { id: 'central-academy', name: 'Central Academy' },
];

export function AuthModal({ mode, onClose, onSwitchMode }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [schoolId, setSchoolId] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showForgotPassword, setShowForgotPassword] = useState(false);
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
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Create user in database
        const userData = {
          uid: user.uid,
          name: name.trim(),
          email: email.toLowerCase().trim(),
          schoolId,
        };

        // Save to database
        await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });

        // Also save to Firestore as backup
        await setDoc(doc(db, 'users', user.uid), {
          ...userData,
          points: 0,
          streak: 0,
          createdAt: new Date(),
        });

        toast({
          title: "Success",
          description: "Account created successfully! Welcome to FBLA Elevate!",
        });
      } else {
        await signInWithEmailAndPassword(auth, email.toLowerCase().trim(), password);
        toast({
          title: "Success",
          description: "Welcome back! You're now logged in.",
        });
      }
      onClose();
    } catch (error: any) {
      let errorMessage = "An unexpected error occurred. Please try again.";
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'An account with this email already exists. Try logging in instead.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak. Please choose a stronger password.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email. Please check your email or sign up.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password. Please try again.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address. Please check and try again.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please wait a moment before trying again.';
          break;
        default:
          errorMessage = error.message || errorMessage;
      }

      toast({
        title: "Authentication Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    if (mode === 'signup' && !schoolId) {
      setErrors({ schoolId: 'Please select your school before signing up with Google' });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if user document exists
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (!userDoc.exists()) {
        // Create new user in database
        const userData = {
          uid: user.uid,
          name: user.displayName || 'User',
          email: user.email || '',
          schoolId: schoolId || 'unknown',
        };

        // Save to database
        await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });

        // Also save to Firestore as backup
        await setDoc(doc(db, 'users', user.uid), {
          ...userData,
          points: 0,
          streak: 0,
          createdAt: new Date(),
        });
        
        toast({
          title: "Success",
          description: "Account created successfully! Welcome to FBLA Elevate!",
        });
      } else {
        toast({
          title: "Success",
          description: "Welcome back! You're now logged in.",
        });
      }
      
      onClose();
    } catch (error: any) {
      let errorMessage = "Google sign-in failed. Please try again.";
      
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'Sign-in was cancelled. Please try again.';
          break;
        case 'auth/popup-blocked':
          errorMessage = 'Pop-up was blocked. Please allow pop-ups and try again.';
          break;
        case 'auth/account-exists-with-different-credential':
          errorMessage = 'An account already exists with this email using a different sign-in method.';
          break;
      }

      toast({
        title: "Google Sign-In Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
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
      await sendPasswordResetEmail(auth, email.toLowerCase().trim());
      toast({
        title: "Password Reset Email Sent",
        description: "Check your email for password reset instructions.",
      });
      setShowForgotPassword(false);
    } catch (error: any) {
      let errorMessage = "Failed to send password reset email.";
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email address.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many requests. Please wait before trying again.';
          break;
      }

      toast({
        title: "Password Reset Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" aria-describedby="auth-dialog-description">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-fbla-blue">
            {mode === 'login' ? 'Welcome Back' : 'Join FBLA Elevate'}
          </DialogTitle>
          <DialogDescription id="auth-dialog-description" className="text-gray-600">
            {mode === 'login' 
              ? 'Sign in to continue your FBLA preparation journey' 
              : 'Create your account to start mastering FBLA competitive events'}
          </DialogDescription>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-4 top-4 h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>

        <form onSubmit={handleEmailAuth} className="space-y-4">
          {mode === 'signup' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-fbla-blue font-semibold">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                  }}
                  placeholder="Enter your full name"
                  required
                  className={`focus:ring-fbla-yellow focus:border-transparent ${
                    errors.name ? 'border-red-500' : ''
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="school" className="text-fbla-blue font-semibold">School</Label>
                <Select 
                  value={schoolId} 
                  onValueChange={(value) => {
                    setSchoolId(value);
                    if (errors.schoolId) setErrors(prev => ({ ...prev, schoolId: '' }));
                  }} 
                  required
                >
                  <SelectTrigger className={`focus:ring-fbla-yellow focus:border-transparent ${
                    errors.schoolId ? 'border-red-500' : ''
                  }`}>
                    <SelectValue placeholder="Select your school" />
                  </SelectTrigger>
                  <SelectContent>
                    {schools.map((school) => (
                      <SelectItem key={school.id} value={school.id}>
                        {school.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.schoolId && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.schoolId}
                  </p>
                )}
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-fbla-blue font-semibold">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
              }}
              placeholder="Enter your email"
              required
              className={`focus:ring-fbla-yellow focus:border-transparent ${
                errors.email ? 'border-red-500' : ''
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-fbla-blue font-semibold">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                }}
                placeholder={mode === 'signup' ? 'Create a password' : 'Enter your password'}
                required
                className={`focus:ring-fbla-yellow focus:border-transparent pr-10 ${
                  errors.password ? 'border-red-500' : ''
                }`}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.password}
              </p>
            )}
            
            {mode === 'signup' && password && (
              <div className="mt-2 space-y-1">
                <p className="text-sm font-medium text-gray-700">Password Requirements:</p>
                <ul className="text-xs space-y-1">
                  <li className={`flex items-center gap-1 ${passwordRequirements.length ? 'text-green-600' : 'text-gray-500'}`}>
                    {passwordRequirements.length ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                    At least 8 characters
                  </li>
                  <li className={`flex items-center gap-1 ${passwordRequirements.uppercase ? 'text-green-600' : 'text-gray-500'}`}>
                    {passwordRequirements.uppercase ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                    One uppercase letter
                  </li>
                  <li className={`flex items-center gap-1 ${passwordRequirements.lowercase ? 'text-green-600' : 'text-gray-500'}`}>
                    {passwordRequirements.lowercase ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                    One lowercase letter
                  </li>
                  <li className={`flex items-center gap-1 ${passwordRequirements.number ? 'text-green-600' : 'text-gray-500'}`}>
                    {passwordRequirements.number ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                    One number
                  </li>
                </ul>
              </div>
            )}
          </div>

          {mode === 'login' && (
            <div className="flex justify-end">
              <Button
                type="button"
                variant="link"
                onClick={handleForgotPassword}
                disabled={loading}
                className="text-sm text-fbla-blue hover:text-blue-800 p-0"
              >
                <KeyRound className="w-4 h-4 mr-1" />
                Forgot password?
              </Button>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading || (mode === 'signup' && !isPasswordValid)}
            className="w-full bg-fbla-blue hover:bg-blue-800 text-white disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {mode === 'signup' ? 'Creating Account...' : 'Signing In...'}
              </div>
            ) : (
              mode === 'signup' ? 'Create Account' : 'Sign In'
            )}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">or</span>
            </div>
          </div>

          <Button
            type="button"
            onClick={handleGoogleAuth}
            disabled={loading}
            variant="outline"
            className="w-full"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
                Working...
              </div>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285f4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34a853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#fbbc05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#ea4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {mode === 'signup' ? 'Sign up with Google' : 'Sign in with Google'}
              </>
            )}
          </Button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
          <Button
            variant="link"
            onClick={() => onSwitchMode(mode === 'login' ? 'signup' : 'login')}
            className="text-fbla-blue hover:text-blue-800 font-semibold p-0 ml-1"
          >
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </Button>
        </p>
      </DialogContent>
    </Dialog>
  );
}
