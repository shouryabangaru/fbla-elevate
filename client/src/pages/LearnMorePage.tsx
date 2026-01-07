"use client";

import Link from 'next/link';
import { ArrowLeft, BookOpen, Brain, MessageSquare, Trophy, Target, Users } from 'lucide-react';
import FloatingLines from '@/components/shared/FloatingLines';
import { Footer } from '@/components/homepage/Footer';
import './LearnMorePage.css';

export default function LearnMorePage() {
  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Flashcards',
      description: 'Master key concepts with our smart flashcard system. Study at your own pace with spaced repetition to maximize retention.',
      color: '#f59e0b'
    },
    {
      icon: Brain,
      title: 'Practice Questions',
      description: 'Test your knowledge with hundreds of practice questions across all FBLA competitive events. Get instant feedback and explanations.',
      color: '#3b82f6'
    },
    {
      icon: MessageSquare,
      title: 'AI Roleplay Scenarios',
      description: 'Practice speaking events with our AI-powered roleplay feature. Get real-time feedback on your responses and presentation skills.',
      color: '#10b981'
    }
  ];

  const benefits = [
    {
      icon: Target,
      title: 'Targeted Preparation',
      description: 'Focus on specific events and topics to maximize your competition readiness.'
    },
    {
      icon: Trophy,
      title: 'Track Your Progress',
      description: 'Monitor your improvement over time with detailed performance analytics.'
    },
    {
      icon: Users,
      title: 'Built for FBLA',
      description: 'Created specifically for FBLA members by students who understand the competition.'
    }
  ];

  return (
    <div className="learn-more-page">
      {/* Background */}
      <div className="learn-more-background">
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

      {/* Back Button */}
      <Link href="/" className="back-button">
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </Link>

      {/* Main Content */}
      <main className="learn-more-content">
        {/* Hero Section */}
        <section className="learn-more-hero">
          <h1 className="learn-more-title">
            Welcome to <span className="highlight">FBLA Elevate</span>
          </h1>
          <p className="learn-more-subtitle">
            Your all-in-one platform for FBLA competition preparation. 
            Master your events, track your progress, and elevate your performance.
          </p>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <h2 className="section-title">What We Offer</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div 
                  className="feature-icon" 
                  style={{ backgroundColor: `${feature.color}20`, color: feature.color }}
                >
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="benefits-section">
          <h2 className="section-title">Why Choose FBLA Elevate?</h2>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-item">
                <div className="benefit-icon">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <div className="benefit-content">
                  <h3 className="benefit-title">{benefit.title}</h3>
                  <p className="benefit-description">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <h2 className="cta-title">Ready to Elevate Your FBLA Journey?</h2>
          <p className="cta-subtitle">Join thousands of FBLA members who are already preparing smarter.</p>
          <Link href="/" className="cta-button">
            Get Started Free
          </Link>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
