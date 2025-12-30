"use client";

import { Navbar } from '@/components/homepage/Navbar';
import { Footer } from '@/components/homepage/Footer';
import { 
  Users, Award, Target, TrendingUp, Heart, Star, Rocket, 
  BookOpen, Trophy, Zap, Globe, Shield, 
  Sparkles, ArrowRight, CheckCircle2, Lightbulb
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import './AboutUsPage.css';

export default function AboutUsPage() {
  const router = useRouter();

  const stats = [
    { number: "10,000+", label: "Students Reached", icon: Users },
    { number: "25+", label: "FBLA Events", icon: Trophy },
    { number: "95%", label: "Success Rate", icon: TrendingUp },
    { number: "500+", label: "Practice Questions", icon: BookOpen },
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Smart Flashcards",
      description: "AI-powered spaced repetition that adapts to your learning pace and focuses on areas that need the most attention.",
      gradient: "from-blue-500 to-cyan-400",
      delay: "0s"
    },
    {
      icon: Trophy,
      title: "Practice Exams",
      description: "Realistic simulations that mirror actual FBLA competitive events with timed conditions and instant feedback.",
      gradient: "from-amber-500 to-orange-400",
      delay: "0.1s"
    },
    {
      icon: TrendingUp,
      title: "Progress Analytics",
      description: "Deep insights into your performance with personalized recommendations to optimize your study strategy.",
      gradient: "from-emerald-500 to-teal-400",
      delay: "0.2s"
    },
    {
      icon: Users,
      title: "Live Leaderboards",
      description: "Compete with students across North Carolina and track your ranking in real-time.",
      gradient: "from-purple-500 to-pink-400",
      delay: "0.3s"
    },
    {
      icon: Sparkles,
      title: "Achievement System",
      description: "Earn badges, unlock milestones, and celebrate every step of your FBLA journey.",
      gradient: "from-rose-500 to-red-400",
      delay: "0.4s"
    },
    {
      icon: Zap,
      title: "Roleplay Practice",
      description: "Interactive scenarios that prepare you for presentation and speaking events with AI feedback.",
      gradient: "from-indigo-500 to-blue-400",
      delay: "0.5s"
    },
  ];

  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "We set the highest standards in educational technology and content quality."
    },
    {
      icon: Heart,
      title: "Student-First",
      description: "Every feature is designed with your success and experience in mind."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We continuously evolve to meet the changing needs of FBLA students."
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "We provide accurate, reliable content aligned with FBLA standards."
    },
  ];

  const testimonials = [
    {
      quote: "FBLA Elevate helped me go from regional competitor to state champion. The practice exams are incredibly realistic!",
      author: "Sarah M.",
      role: "State Champion, Business Law",
      avatar: "SM"
    },
    {
      quote: "The flashcard system is genius. It knows exactly what I need to study and when. My scores improved 40% in just two weeks.",
      author: "James K.",
      role: "National Qualifier, Economics",
      avatar: "JK"
    },
    {
      quote: "Finally, a study platform that understands FBLA events. The roleplay practice gave me confidence I never had before.",
      author: "Emily R.",
      role: "Regional Champion, Marketing",
      avatar: "ER"
    },
  ];

  return (
    <div className="home-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="home-hero">
        <div className="hero-background">
          <div className="hero-gradient-orb hero-orb-1"></div>
          <div className="hero-gradient-orb hero-orb-2"></div>
          <div className="hero-gradient-orb hero-orb-3"></div>
          <div className="hero-grid"></div>
          <div className="hero-noise"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles className="w-4 h-4" />
            <span>North Carolina's #1 FBLA Prep Platform</span>
          </div>
          
          <h1 className="hero-title">
            <span className="title-line">Elevate Your</span>
            <span className="title-line gradient-text">FBLA Journey</span>
          </h1>
          
          <p className="hero-description">
            We're on a mission to empower every North Carolina FBLA student with 
            championship-ready preparation tools. Built by former state champions, 
            designed for future leaders.
          </p>
          
          <div className="hero-cta">
            <button className="btn-primary" onClick={() => router.push('/practice')}>
              <Rocket className="w-5 h-5" />
              Start Practicing Free
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="btn-secondary" onClick={() => router.push('/flashcards')}>
              <BookOpen className="w-5 h-5" />
              Explore Flashcards
            </button>
          </div>
        </div>
        
        <div className="hero-scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="stat-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="stat-icon-wrapper">
                <stat.icon className="stat-icon" />
              </div>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-container">
          <div className="mission-content">
            <div className="section-label">
              <Target className="w-4 h-4" />
              <span>Our Mission</span>
            </div>
            
            <h2 className="mission-title">
              Democratizing FBLA Success
            </h2>
            
            <p className="mission-description">
              Every student deserves access to world-class preparation resources, 
              regardless of their school's budget or location. FBLA Elevate levels 
              the playing field by providing cutting-edge study tools that were 
              previously only available to a select few.
            </p>
            
            <div className="mission-points">
              <div className="mission-point">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Free access for all NC FBLA students</span>
              </div>
              <div className="mission-point">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Content aligned with official FBLA guidelines</span>
              </div>
              <div className="mission-point">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Updated annually with new competition content</span>
              </div>
              <div className="mission-point">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Built by state & national competitors</span>
              </div>
            </div>
          </div>
          
          <div className="mission-visual">
            <div className="visual-card">
              <div className="visual-glow"></div>
              <div className="visual-content">
                <div className="visual-icon">
                  <Globe className="w-16 h-16" />
                </div>
                <div className="visual-stats">
                  <div className="visual-stat">
                    <span className="visual-stat-number">50+</span>
                    <span className="visual-stat-label">Schools Connected</span>
                  </div>
                  <div className="visual-stat">
                    <span className="visual-stat-number">200+</span>
                    <span className="visual-stat-label">Chapters Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="section-header">
            <div className="section-label">
              <Zap className="w-4 h-4" />
              <span>Platform Features</span>
            </div>
            <h2 className="section-title">Everything You Need to Win</h2>
            <p className="section-subtitle">
              Comprehensive tools designed specifically for FBLA competitive events
            </p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-card"
                style={{ animationDelay: feature.delay }}
              >
                <div className={`feature-icon-wrapper bg-gradient-to-br ${feature.gradient}`}>
                  <feature.icon className="feature-icon" />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="values-container">
          <div className="values-header">
            <div className="section-label">
              <Heart className="w-4 h-4" />
              <span>Our Values</span>
            </div>
            <h2 className="section-title">Built by Students, for Students</h2>
            <p className="section-subtitle">
              We're former FBLA competitors who understand exactly what it takes to succeed
            </p>
          </div>
          
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon-wrapper">
                  <value.icon className="value-icon" />
                </div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <div className="section-header">
            <div className="section-label">
              <Star className="w-4 h-4" />
              <span>Success Stories</span>
            </div>
            <h2 className="section-title">Hear From Our Champions</h2>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-quote">
                  <svg className="quote-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p>{testimonial.quote}</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar">{testimonial.avatar}</div>
                  <div className="author-info">
                    <div className="author-name">{testimonial.author}</div>
                    <div className="author-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-background">
            <div className="cta-orb cta-orb-1"></div>
            <div className="cta-orb cta-orb-2"></div>
          </div>
          
          <div className="cta-content">
            <h2 className="cta-title">
              Ready to <span className="gradient-text">Elevate</span> Your Performance?
            </h2>
            <p className="cta-description">
              Join thousands of NC FBLA students who are already preparing smarter, 
              not harder. Your championship journey starts here.
            </p>
            <div className="cta-buttons">
              <button className="btn-primary btn-large" onClick={() => router.push('/practice')}>
                <Rocket className="w-5 h-5" />
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="cta-trust">
              <span>Trusted by students from</span>
              <div className="trust-badges">
                <div className="trust-badge">50+ Schools</div>
                <div className="trust-badge">All 100 NC Counties</div>
                <div className="trust-badge">200+ Chapters</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}