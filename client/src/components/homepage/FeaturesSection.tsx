import { Brain, Users, Medal, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring } from 'motion/react';
import type { SpringOptions } from 'motion/react';
import { useRef } from 'react';
import './FeaturesSection.css';

const springValues: SpringOptions = {
  damping: 30,
  stiffness: 100,
  mass: 2
};

function FeatureCard({ feature, index }: { feature: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  
  const rotateAmplitude = 8;
  const scaleOnHover = 1.05;

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
  }

  function handleMouseLeave() {
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className="feature-card"
      style={{ 
        animationDelay: `${index * 0.15}s`,
        rotateX,
        rotateY,
        scale,
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Card Number Badge */}
      <div className="card-number">{feature.number}</div>
      
      <div className="feature-icon-wrapper">
        <feature.icon className="feature-icon" />
      </div>
      
      <div className="feature-content">
        <h3 className="feature-title">{feature.title}</h3>
        <p className="feature-description">{feature.description}</p>
        
        <Link href={feature.link} className="feature-link">
          <span>Explore Feature</span>
          <ArrowRight className="link-arrow" />
        </Link>
      </div>
      
      {/* Animated Border */}
      <div className="card-border"></div>
    </motion.div>
  );
}

export function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: 'Smart Practice',
      description: 'Adaptive learning system that personalizes your study experience based on your strengths and weaknesses.',
      link: '/flashcards',
      number: '01'
    },
    {
      icon: Users,
      title: 'Compete & Connect',
      description: 'Join a community of ambitious FBLA members and compete on leaderboards to stay motivated.',
      link: '/leaderboard',
      number: '02'
    },
    {
      icon: Medal,
      title: 'Track Progress',
      description: 'Comprehensive analytics and achievement system to monitor your growth and celebrate milestones.',
      link: '/achievements',
      number: '03'
    }
  ];

  return (
    <section className="features-section">
      <div className="features-container">
        {/* Decorative Elements */}
        <div className="features-decoration">
          <div className="decoration-orb orb-1"></div>
          <div className="decoration-orb orb-2"></div>
          <Sparkles className="sparkle sparkle-1" />
          <Sparkles className="sparkle sparkle-2" />
        </div>

        <div className="features-header">
          <div className="header-badge">
            <Sparkles className="badge-icon" />
            <span>Why Choose</span>
          </div>
          <h2 className="features-title">
            <span className="title-gradient">FBLA Elevate</span>
            <span className="title-question">?</span>
          </h2>
          <p className="features-subtitle">
            Everything you need to excel in FBLA competitions,
            <span className="subtitle-highlight"> all in one powerful platform</span>
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}