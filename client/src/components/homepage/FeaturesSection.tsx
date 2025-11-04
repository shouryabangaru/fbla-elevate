import { Brain, Users, Medal, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import './FeaturesSection.css';

export function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: 'Smart Practice',
      description: 'Adaptive learning system that personalizes your study experience based on your strengths and weaknesses.',
      link: '/flashcards',
      color: 'feature-brain'
    },
    {
      icon: Users,
      title: 'Compete & Connect',
      description: 'Join a community of ambitious FBLA members and compete on leaderboards to stay motivated.',
      link: '/leaderboard',
      color: 'feature-users'
    },
    {
      icon: Medal,
      title: 'Track Progress',
      description: 'Comprehensive analytics and achievement system to monitor your growth and celebrate milestones.',
      link: '/achievements',
      color: 'feature-medal'
    }
  ];

  return (
    <section className="features-section">
      <div className="features-container">
        <div className="features-header">
          <h2 className="features-title">
            <span className="title-accent">Why Choose</span>
            <span className="title-main">FBLA Elevate?</span>
          </h2>
          <p className="features-subtitle">
            Everything you need to excel in FBLA competitions, all in one powerful platform
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className={`feature-card ${feature.color}`}>
              <div className="feature-icon-wrapper">
                <feature.icon className="feature-icon" />
                <div className="icon-glow"></div>
              </div>
              
              <div className="feature-content">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                
                <Link href={feature.link} className="feature-link">
                  <span>Explore</span>
                  <ArrowRight className="link-arrow" />
                </Link>
              </div>
              
              <div className="feature-background"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}