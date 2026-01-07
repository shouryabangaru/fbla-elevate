"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/AuthModal';
import { Footer } from '@/components/homepage/Footer';
import FloatingLines from '@/components/shared/FloatingLines';
import './LandingPage.css';

export default function LandingPage() {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | null>(null);
  
  const fullText = "Elevate Your FBLA Journey";

  // Typing effect
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, []);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="landing-page">
      {/* Background */}
      <div className="landing-background">
        <FloatingLines
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={[5, 5, 5]}
          lineDistance={[8, 6, 4]}
          bendRadius={5.0}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
        />
      </div>

      {/* Main Content */}
      <main className="landing-content">
        <div className="landing-hero">
          <h1 className="landing-title">
            {displayText}
            <span className={`typing-cursor ${showCursor ? 'visible' : ''}`}>|</span>
          </h1>
          
          <div className="landing-buttons">
            <Button 
              onClick={() => setAuthMode('login')}
              className="landing-btn landing-btn-primary"
              size="lg"
            >
              Login / Sign Up
            </Button>
            <Link href="/learn-more" className="landing-btn landing-btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Auth Modal */}
      {authMode && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthMode(null)}
          onSwitchMode={setAuthMode}
        />
      )}
    </div>
  );
}
