import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';
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
  { id: 'ardrey-kell', name: 'Ardrey Kell High School' },
  { id: 'community-house', name: 'Community House Middle School' },
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
        console.log('Creating user with email:', email);
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('User created successfully:', user.uid);

        // Create user in database
        const userData = {
          uid: user.uid,
          name: name.trim(),
          email: email.toLowerCase().trim(),
          schoolId,
        };

        // Save to database
        console.log('Saving user to database:', userData);
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Database save failed:', errorText);
          throw new Error(`Database error: ${response.status} - ${errorText}`);
        }
        
        const savedUser = await response.json();
        console.log('User saved to database:', savedUser);

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
      console.error('Authentication error:', error);
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
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection and try again.';
          break;
        case 'auth/configuration-not-found':
          errorMessage = 'Firebase configuration error. Please try again later.';
          break;
        default:
          errorMessage = error.message || errorMessage;
          console.error('Unknown auth error:', error.code, error.message);
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
      let errorMessage = "Failed to send reset email. Please try again.";
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email address.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many requests. Please wait before trying again.';
          break;
      }

      toast({
        title: "Reset Email Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {mode === 'login' ? 'Welcome Back' : 'Join FBLA Elevate'}
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
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
                <KeyRound className="mx-auto h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold">Reset Your Password</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reset-email">Email Address</Label>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleForgotPassword}
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? 'Sending...' : 'Send Reset Email'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowForgotPassword(false)}
                  className="flex-1"
                >
                  Back to Login
                </Button>
              </div>
            </div>
          ) : (
            <>
              <form onSubmit={handleEmailAuth} className="space-y-4">
                {mode === 'signup' && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={errors.password ? 'border-red-500' : ''}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </div>

                {mode === 'signup' && password && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Password Requirements</Label>
                    <div className="space-y-1">
                      {Object.entries({
                        length: 'At least 8 characters',
                        uppercase: 'One uppercase letter',
                        lowercase: 'One lowercase letter',
                        number: 'One number'
                      }).map(([key, description]) => (
                        <div key={key} className="flex items-center gap-2 text-sm">
                          {passwordRequirements[key as keyof typeof passwordRequirements] ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-red-500" />
                          )}
                          <span className={passwordRequirements[key as keyof typeof passwordRequirements] ? 'text-green-600' : 'text-red-600'}>
                            {description}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {mode === 'signup' && (
                  <div className="space-y-2">
                    <Label htmlFor="school">School</Label>
                    <Select value={schoolId} onValueChange={setSchoolId}>
                      <SelectTrigger className={errors.schoolId ? 'border-red-500' : ''}>
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
                    {errors.schoolId && <p className="text-sm text-red-500">{errors.schoolId}</p>}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? 'Please wait...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
                </Button>
              </form>

              {mode === 'login' && (
                <div className="text-center">
                  <button
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Forgot your password?
                  </button>
                </div>
              )}



              <div className="text-center text-sm">
                <span className="text-gray-600">
                  {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                </span>
                <button
                  onClick={() => onSwitchMode(mode === 'login' ? 'signup' : 'login')}
                  className="ml-2 text-blue-600 hover:text-blue-800 font-medium"
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