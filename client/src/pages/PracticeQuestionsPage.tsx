"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { PageLayout } from '@/components/shared/PageLayout';
import { StyledCard } from '@/components/shared/StyledCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlayCircle } from 'lucide-react';
import './PracticeQuestionsPage.css';
import type { Event } from '@shared/schema';

interface PracticeEvent extends Event {
  icon: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
}

export default function PracticeQuestionsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Fetch events from database
  const { data: dbEvents, isLoading, error } = useQuery<Event[]>({
    queryKey: ['/api/events'],
  });
  
  // Event metadata mapping (icons, difficulty, category)
  const eventMetadata: Record<string, { icon: string; difficulty: 'Beginner' | 'Intermediate' | 'Advanced'; category: string }> = {
    'Accounting I': { icon: '📊', difficulty: 'Intermediate', category: 'Finance' },
    'Accounting II': { icon: '🧮', difficulty: 'Advanced', category: 'Finance' },
    'Banking & Financial Systems': { icon: '🏦', difficulty: 'Intermediate', category: 'Finance' },
    'Business Management': { icon: '💼', difficulty: 'Intermediate', category: 'Management' },
    'Business Law': { icon: '⚖️', difficulty: 'Advanced', category: 'Legal' },
    'Client Service': { icon: '🤝', difficulty: 'Beginner', category: 'Communication' },
    'Economics': { icon: '📈', difficulty: 'Intermediate', category: 'Finance' },
    'Entrepreneurship': { icon: '🚀', difficulty: 'Advanced', category: 'Business' },
    'Introduction to Business Concepts': { icon: '📋', difficulty: 'Beginner', category: 'Business' },
    'Introduction to Financial Math': { icon: '🔢', difficulty: 'Beginner', category: 'Finance' },
    'Introduction to Marketing Concepts': { icon: '📢', difficulty: 'Beginner', category: 'Marketing' },
    'Introduction to Parliamentary Procedure': { icon: '🏛️', difficulty: 'Beginner', category: 'Leadership' },
    'Management Information Systems': { icon: '💻', difficulty: 'Advanced', category: 'Technology' },
    'Personal Finance': { icon: '💰', difficulty: 'Beginner', category: 'Finance' },
    'Securities & Investments': { icon: '📊', difficulty: 'Advanced', category: 'Finance' },
    'Business Ethics': { icon: '🎯', difficulty: 'Intermediate', category: 'Business' },
    'International Business': { icon: '🌍', difficulty: 'Advanced', category: 'Business' },
    'Marketing': { icon: '📈', difficulty: 'Intermediate', category: 'Marketing' },
    'Sports & Entertainment Marketing': { icon: '🎭', difficulty: 'Intermediate', category: 'Marketing' },
    'Hospitality Management': { icon: '🏨', difficulty: 'Intermediate', category: 'Management' },
    'Human Resource Management': { icon: '👥', difficulty: 'Intermediate', category: 'Management' },
    'Public Speaking': { icon: '🎤', difficulty: 'Beginner', category: 'Communication' },
    'Future Business Leader': { icon: '👑', difficulty: 'Intermediate', category: 'Leadership' },
    'Introduction to Event Planning': { icon: '📅', difficulty: 'Beginner', category: 'Management' },
    'Sales Presentation': { icon: '💡', difficulty: 'Intermediate', category: 'Communication' },
  };
  
  // Combine database events with metadata
  const practiceEvents: PracticeEvent[] = (dbEvents || []).map((event: Event) => ({
    ...event,
    ...eventMetadata[event.name] || { icon: '📝', difficulty: 'Beginner' as const, category: 'General' }
  }));

  
  const categories = ['all', 'Business', 'Finance', 'Marketing', 'Technology', 'Management', 'Communication', 'Leadership', 'Legal'];
  
  const getFilteredEvents = () => {
    if (selectedCategory === 'all') return practiceEvents;
    return practiceEvents.filter(event => event.category === selectedCategory);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'difficulty-beginner';
      case 'Intermediate': return 'difficulty-intermediate';
      case 'Advanced': return 'difficulty-advanced';
      default: return 'difficulty-beginner';
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <PageLayout
        title="Practice Questions"
        subtitle="Loading FBLA practice events..."
      >
        <div className="practice-container">
          <div className="practice-content">
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fbla-blue mx-auto"></div>
                <p className="text-gray-600">Loading practice events...</p>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  // Error state
  if (error) {
    return (
      <PageLayout
        title="Practice Questions"
        subtitle="Error loading practice events"
      >
        <div className="practice-container">
          <div className="practice-content">
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="text-center space-y-4">
                <p className="text-red-600">Failed to load practice events. Please try again.</p>
                <Button onClick={() => window.location.reload()}>
                  Retry
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="Practice Questions"
      subtitle="Test your knowledge with comprehensive FBLA practice events"
    >
      <div className="practice-container">
        <div className="practice-content">

          {/* Category Filter */}
          <div className="filter-section">
            <StyledCard className="filter-card">
              <div className="card-content">
                <h3 className="filter-title">Filter by Category</h3>
                <div className="filter-buttons">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                    >
                      {category === 'all' ? 'All Events' : category}
                    </Button>
                  ))}
                </div>
              </div>
            </StyledCard>
          </div>

          {/* Practice Events Grid */}
          <div className="events-grid">
            {getFilteredEvents().map((event) => (
              <StyledCard key={event.id} className="event-card">
                <div className="card-content">
                  <div className="event-header">
                    <div className="event-icon">
                      <span className="icon-emoji">{event.icon}</span>
                    </div>
                  </div>
                  
                  <div className="event-info">
                    <h3 className="event-title">{event.name}</h3>
                    <p className="event-description">{event.description}</p>
                    
                    <div className="event-meta">
                      <div className="meta-row">
                        <Badge className={`difficulty-badge ${getDifficultyColor(event.difficulty)}`}>
                          {event.difficulty}
                        </Badge>
                        <Badge className="category-badge">
                          {event.category}
                        </Badge>
                      </div>
                      
                    </div>
                    
                    
                    <div className="event-actions">
                      <Button 
                        className="action-button primary"
                        onClick={() => router.push(`/practice/${event.id}`)}
                        data-testid={`button-start-practicing-${event.id}`}
                      >
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Start Practicing
                      </Button>
                    </div>
                  </div>
                </div>
              </StyledCard>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}