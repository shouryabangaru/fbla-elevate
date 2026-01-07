"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { supabaseAuth, signOut as supabaseSignOut, getCurrentUser, type User as SupabaseUser, type Session } from '@/lib/supabase-auth';
import type { User } from '@shared/schema';

interface AuthContextType {
  user: User | null;
  supabaseUser: SupabaseUser | null;
  session: Session | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    if (!supabaseUser) return;

    try {
      // Try to get user from our database
      const response = await fetch(`/api/users/${supabaseUser.id}`);
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else if (response.status === 404) {
        // User doesn't exist in database, create them
        const userData = {
          uid: supabaseUser.id,
          name: supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || 'User',
          email: supabaseUser.email!,
          schoolId: supabaseUser.user_metadata?.school_id || 'other',
        };

        const createResponse = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });

        if (createResponse.ok) {
          const newUser = await createResponse.json();
          setUser(newUser);
        }
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  };

  const logout = async () => {
    try {
      await supabaseSignOut();
      setUser(null);
      setSupabaseUser(null);
      setSession(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session: initialSession } } = await supabaseAuth.auth.getSession();
        
        if (initialSession) {
          setSession(initialSession);
          setSupabaseUser(initialSession.user);
          
          // Fetch user data from our database
          try {
            const response = await fetch(`/api/users/${initialSession.user.id}`);
            if (response.ok) {
              const userData = await response.json();
              setUser(userData);
            } else if (response.status === 404) {
              // User doesn't exist in database, create them
              const userData = {
                uid: initialSession.user.id,
                name: initialSession.user.user_metadata?.name || initialSession.user.email?.split('@')[0] || 'User',
                email: initialSession.user.email!,
                schoolId: initialSession.user.user_metadata?.school_id || 'other',
              };

              const createResponse = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
              });

              if (createResponse.ok) {
                const newUser = await createResponse.json();
                setUser(newUser);
              }
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabaseAuth.auth.onAuthStateChange(
      async (event: string, currentSession: Session | null) => {
        console.log('Auth state changed:', event, currentSession?.user?.email);
        
        setSession(currentSession);
        setSupabaseUser(currentSession?.user ?? null);

        if (currentSession?.user) {
          // Fetch or create user in our database
          try {
            const response = await fetch(`/api/users/${currentSession.user.id}`);
            if (response.ok) {
              const userData = await response.json();
              setUser(userData);
            } else if (response.status === 404) {
              // User doesn't exist, create them
              const userData = {
                uid: currentSession.user.id,
                name: currentSession.user.user_metadata?.name || currentSession.user.email?.split('@')[0] || 'User',
                email: currentSession.user.email!,
                schoolId: currentSession.user.user_metadata?.school_id || 'other',
              };

              const createResponse = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
              });

              if (createResponse.ok) {
                const newUser = await createResponse.json();
                setUser(newUser);
              }
            }
          } catch (error) {
            console.error('Error fetching/creating user:', error);
          }
        } else {
          setUser(null);
        }

        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, supabaseUser, session, loading, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
