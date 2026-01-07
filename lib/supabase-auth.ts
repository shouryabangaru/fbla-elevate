"use client";

import { supabase } from './supabase';

// Re-export the supabase client for auth operations
export const supabaseAuth = supabase;

// Auth helper types - define locally to avoid import issues
export interface User {
  id: string;
  email?: string;
  user_metadata?: {
    name?: string;
    full_name?: string;
    school_id?: string;
    accepted_terms?: boolean;
    accepted_terms_at?: string;
  };
}

export interface Session {
  user: User;
  access_token: string;
  refresh_token?: string;
}

export interface AuthError {
  message: string;
  status?: number;
}

export interface AuthResponse {
  user: User | null;
  session: Session | null;
  error: AuthError | null;
}

export interface SignUpData {
  email: string;
  password: string;
  name: string;
  schoolId: string;
}

export interface SignInData {
  email: string;
  password: string;
}

// Sign up with email and password
export async function signUpWithEmail({ email, password, name, schoolId }: SignUpData): Promise<AuthResponse> {
  const { data, error } = await supabaseAuth.auth.signUp({
    email: email.toLowerCase().trim(),
    password,
    options: {
      data: {
        name: name.trim(),
        school_id: schoolId,
        accepted_terms: true,
        accepted_terms_at: new Date().toISOString(),
      },
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    }
  });

  return {
    user: data.user,
    session: data.session,
    error
  };
}

// Sign in with email and password
export async function signInWithEmail({ email, password }: SignInData): Promise<AuthResponse> {
  const { data, error } = await supabaseAuth.auth.signInWithPassword({
    email: email.toLowerCase().trim(),
    password,
  });

  return {
    user: data.user,
    session: data.session,
    error
  };
}

// Sign in with Google OAuth
export async function signInWithGoogle(): Promise<{ error: AuthError | null }> {
  const { error } = await supabaseAuth.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    }
  });

  return { error };
}

// Sign out
export async function signOut(): Promise<{ error: AuthError | null }> {
  const { error } = await supabaseAuth.auth.signOut();
  return { error };
}

// Get current session
export async function getSession(): Promise<{ session: Session | null; error: AuthError | null }> {
  const { data, error } = await supabaseAuth.auth.getSession();
  return { session: data.session, error };
}

// Get current user
export async function getCurrentUser(): Promise<{ user: User | null; error: AuthError | null }> {
  const { data, error } = await supabaseAuth.auth.getUser();
  return { user: data.user, error };
}

// Send password reset email
export async function resetPassword(email: string): Promise<{ error: AuthError | null }> {
  const { error } = await supabaseAuth.auth.resetPasswordForEmail(email.toLowerCase().trim(), {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  });
  return { error };
}

// Update password
export async function updatePassword(newPassword: string): Promise<{ error: AuthError | null }> {
  const { error } = await supabaseAuth.auth.updateUser({
    password: newPassword
  });
  return { error };
}

// Resend confirmation email
export async function resendConfirmationEmail(email: string): Promise<{ error: AuthError | null }> {
  const { error } = await supabaseAuth.auth.resend({
    type: 'signup',
    email: email.toLowerCase().trim(),
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    }
  });
  return { error };
}

// Translate Supabase auth errors to user-friendly messages
export function getAuthErrorMessage(error: AuthError): string {
  const errorMessages: Record<string, string> = {
    'Invalid login credentials': 'Invalid email or password. Please check your credentials and try again.',
    'Email not confirmed': 'Please verify your email address before signing in. Check your inbox for a confirmation link.',
    'User already registered': 'An account with this email already exists. Try logging in instead.',
    'Password should be at least 6 characters': 'Password must be at least 6 characters long.',
    'Unable to validate email address: invalid format': 'Please enter a valid email address.',
    'Signup requires a valid password': 'Please enter a valid password.',
    'Email rate limit exceeded': 'Too many attempts. Please wait a few minutes before trying again.',
    'For security purposes, you can only request this once every 60 seconds': 'Please wait 60 seconds before requesting another email.',
  };

  return errorMessages[error.message] || error.message || 'An unexpected error occurred. Please try again.';
}
