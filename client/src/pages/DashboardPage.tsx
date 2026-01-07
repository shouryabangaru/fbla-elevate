"use client";

import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/homepage/Footer';
import LiquidEther from '@/components/shared/LiquidEther';
import Link from 'next/link';
import { BookOpen, MessageSquare, Brain, LogOut } from 'lucide-react';
import './DashboardPage.css';

const dashboardColors = ['#000000', '#0a0f2e', '#050814', '#1a3a5c', '#4169e1'];

export default function DashboardPage() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const features = [
    {
      title: 'Flashcards',
      description: 'Study key concepts with interactive flashcards',
      icon: BookOpen,
      href: '/flashcards',
      color: '#f59e0b'
    },
    {
      title: 'Practice Questions',
      description: 'Test your knowledge with practice questions',
      icon: Brain,
      href: '/practice',
      color: '#3b82f6'
    },
    {
      title: 'Roleplay',
      description: 'Practice speaking scenarios with AI',
      icon: MessageSquare,
      href: '/roleplay',
      color: '#10b981'
    }
  ];

  return (
    <div className="dashboard-page">
      {/* Background */}
      <div className="dashboard-background">
        <LiquidEther
          colors={dashboardColors}
          mouseForce={12}
          cursorSize={100}
          autoDemo={true}
          autoSpeed={0.2}
          autoIntensity={1.5}
          resolution={0.4}
        />
      </div>

      {/* Header */}
      <header className="dashboard-header">
        <div className="dashboard-header-content">
          <h1 className="dashboard-logo">FBLA Elevate</h1>
          <div className="dashboard-user">
            <span className="dashboard-username">
              {user?.name || 'User'}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="dashboard-logout"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-content">
        <div className="dashboard-welcome">
          <h2 className="dashboard-greeting">
            Welcome back, {user?.name?.split(' ')[0] || 'Champion'}
          </h2>
          <p className="dashboard-subtitle">
            Choose an activity to continue your FBLA journey
          </p>
        </div>

        <div className="dashboard-grid">
          {features.map((feature) => (
            <Link href={feature.href} key={feature.title} className="dashboard-card">
              <div 
                className="dashboard-card-icon" 
                style={{ backgroundColor: `${feature.color}20`, color: feature.color }}
              >
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="dashboard-card-title">{feature.title}</h3>
              <p className="dashboard-card-description">{feature.description}</p>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
