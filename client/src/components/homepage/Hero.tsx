"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Trophy, ChevronDown, Sparkles } from 'lucide-react';
import { AuthModal } from '@/components/AuthModal';
import './Hero.css';

export function Hero() {
  const { user } = useAuth();
  const router = useRouter();
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'signup' }>({
    isOpen: false,
    mode: 'signup'
  });

  const handleGetStarted = () => {
    if (user) {
      // Navigate to dashboard or main app
      router.push('/flashcards');
    } else {
      setAuthModal({ isOpen: true, mode: 'signup' });
    }
  };

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-gradient"></div>
        <div className="hero-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          {/* Trophy Icon */}
          <div className="hero-icon">
            <Trophy className="trophy-icon" />
            <Sparkles className="sparkle sparkle-1" />
            <Sparkles className="sparkle sparkle-2" />
            <Sparkles className="sparkle sparkle-3" />
          </div>

          {/* Main Headlines */}
          <h1 className="hero-title">
            <span className="title-main">FBLA Elevate</span>
            <span className="title-accent">Championship Ready</span>
          </h1>

          <p className="hero-subtitle">
            Your hub for preparing for FBLA competitive events! Master every challenge, 
            connect with peers, and elevate your performance to championship level.
          </p>

          {/* CTA Button */}
          <div className="hero-cta">
            <button onClick={handleGetStarted} className="cta-button">
              <span className="cta-text">
                {user ? 'Continue Learning' : 'Start Your Journey'}
              </span>
              <div className="cta-glow"></div>
            </button>
            
            {!user && (
              <p className="cta-note">
                Join thousands of FBLA champions preparing for success
              </p>
            )}
          </div>

          {/* Scroll Indicator */}
          <div className="scroll-indicator">
            <ChevronDown className="scroll-arrow" />
            <span className="scroll-text">Discover More</span>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      {authModal.isOpen && (
        <AuthModal
          mode={authModal.mode}
          onClose={() => setAuthModal({ ...authModal, isOpen: false })}
          onSwitchMode={(mode) => setAuthModal({ ...authModal, mode })}
        />
      )}
    </section>
  );
}