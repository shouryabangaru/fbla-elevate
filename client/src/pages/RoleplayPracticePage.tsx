"use client";

import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Users, 
  HeadsetIcon, 
  Lightbulb, 
  TrendingUp, 
  DollarSign,
  ArrowLeft,
  Clock,
  PlayCircle,
  Target,
  BookOpen,
  Globe,
  Hotel,
  Trophy,
  Monitor,
  Network,
  Scale,
  Timer,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { PageLayout } from '@/components/shared/PageLayout';
import { RoleplayScenario } from '@/lib/types';
import './RoleplayPracticePage.css';

// Roleplay event from API
interface RoleplayEventInfo {
  id: string;
  name: string;
  description: string;
  category: string;
  color: string;
  icon: string;
}

// Map icon string to component
const iconMap: Record<string, React.ComponentType<any>> = {
  DollarSign,
  Building2,
  HeadsetIcon,
  Lightbulb,
  Hotel,
  Globe,
  Monitor,
  TrendingUp,
  Network,
  Scale,
  Trophy,
  Users,
};

// UI Scenario with icon component
interface UIRoleplayScenario extends RoleplayScenario {
  eventName: string;
  scenarioNumber: number;
  duration: number;
  points: number;
  icon: React.ComponentType<any>;
}

export default function RoleplayPracticePage() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [practiceScenario, setPracticeScenario] = useState<{eventId: string, scenarioId: number} | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(20 * 60);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [timeUp, setTimeUp] = useState<boolean>(false);
  const [difficultyFilter, setDifficultyFilter] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  
  // Data state
  const [events, setEvents] = useState<RoleplayEventInfo[]>([]);
  const [scenarios, setScenarios] = useState<UIRoleplayScenario[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [isLoadingScenarios, setIsLoadingScenarios] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            setTimeUp(true);
            setTimerActive(false);
            alert("Time's Up!");
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, timeLeft]);

  // Fetch events on mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoadingEvents(true);
        const response = await fetch('/api/roleplay/events');
        if (!response.ok) throw new Error('Failed to fetch roleplay events');
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        console.error('Error fetching roleplay events:', err);
        setError(err instanceof Error ? err.message : 'Failed to load events');
      } finally {
        setIsLoadingEvents(false);
      }
    };
    
    fetchEvents();
  }, []);

  // Fetch scenarios when event is selected
  useEffect(() => {
    if (!selectedEvent) {
      setScenarios([]);
      return;
    }
    
    const fetchScenarios = async () => {
      try {
        setIsLoadingScenarios(true);
        const response = await fetch(`/api/roleplay/${selectedEvent}/scenarios`);
        if (!response.ok) throw new Error('Failed to fetch scenarios');
        const data = await response.json();
        
        const event = events.find(e => e.id === selectedEvent);
        const IconComponent = iconMap[event?.icon || 'Users'] || Users;
        
        // Transform scenarios to UI format
        const uiScenarios: UIRoleplayScenario[] = data.scenarios.map((scenario: RoleplayScenario, index: number) => ({
          ...scenario,
          eventName: event?.name || selectedEvent,
          scenarioNumber: index + 1,
          duration: 20,
          points: 50,
          difficulty: scenario.difficulty || (index < 5 ? 'Beginner' : index < 10 ? 'Intermediate' : 'Advanced'),
          objectives: scenario.objectives || [
            'Demonstrate professional communication skills',
            'Analyze the situation and identify key issues',
            'Develop practical solutions',
            'Present clear recommendations'
          ],
          icon: IconComponent,
        }));
        
        setScenarios(uiScenarios);
      } catch (err) {
        console.error('Error fetching scenarios:', err);
        setError(err instanceof Error ? err.message : 'Failed to load scenarios');
      } finally {
        setIsLoadingScenarios(false);
      }
    };
    
    fetchScenarios();
  }, [selectedEvent, events]);

  // Event handlers
  const handleEventClick = (eventId: string) => {
    setSelectedEvent(eventId);
  };

  const handleBackToEvents = () => {
    setSelectedEvent(null);
    setPracticeScenario(null);
    setTimeLeft(20 * 60);
    setTimerActive(false);
    setTimeUp(false);
  };

  const handleStartScenario = (eventId: string, scenarioId: number) => {
    setPracticeScenario({ eventId, scenarioId });
    setTimeLeft(20 * 60);
    setTimerActive(true);
    setTimeUp(false);
  };

  const handleFinishPractice = () => {
    setPracticeScenario(null);
    setTimeLeft(20 * 60);
    setTimerActive(false);
    setTimeUp(false);
  };

  // Format time for display
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Loading state
  if (isLoadingEvents) {
    return (
      <PageLayout
        title="Roleplay Practice"
        subtitle="Loading events..."
      >
        <div className="rp-container flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-12 h-12 animate-spin text-yellow-500" />
        </div>
      </PageLayout>
    );
  }

  // Error state
  if (error) {
    return (
      <PageLayout
        title="Roleplay Practice"
        subtitle="Error loading data"
      >
        <div className="rp-container flex flex-col items-center justify-center min-h-[400px]">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            className="rp-back-btn"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </PageLayout>
    );
  }

  // If practicing a specific scenario
  if (practiceScenario) {
    const scenario = scenarios.find(s => s.id === practiceScenario.scenarioId);

    if (!scenario) {
      return (
        <PageLayout title="Scenario Not Found" subtitle="">
          <div className="rp-container">
            <button onClick={handleFinishPractice} className="rp-back-btn">
              <ArrowLeft className="w-4 h-4" />
              Back to Scenarios
            </button>
            <p>Scenario not found</p>
          </div>
        </PageLayout>
      );
    }

    return (
      <PageLayout
        title={scenario.eventName}
        subtitle={`Scenario ${scenario.scenarioNumber}`}
      >
        <div className="rp-container">
          <div className="rp-practice">
            <button onClick={handleFinishPractice} className="rp-back-btn">
              <ArrowLeft className="w-4 h-4" />
              Back to Scenarios
            </button>

            <div className="rp-practice-header">
              <div className="rp-practice-badges">
                <span className={`rp-badge rp-badge-${scenario.difficulty?.toLowerCase() || 'beginner'}`}>
                  {scenario.difficulty || 'Beginner'}
                </span>
                <span className="rp-badge rp-badge-time">
                  <Clock className="w-4 h-4" />
                  20 min
                </span>
                <span className="rp-badge rp-badge-points">
                  <Target className="w-4 h-4" />
                  50 points
                </span>
              </div>
            </div>

            <div className="rp-practice-content">
              <div className="rp-section">
                <div className="rp-section-header">
                  <BookOpen className="w-5 h-5" />
                  <h3>Background Information</h3>
                </div>
                <p>{scenario.background}</p>
              </div>

              <div className="rp-section">
                <div className="rp-section-header">
                  <Lightbulb className="w-5 h-5" />
                  <h3>Scenario</h3>
                </div>
                <p>{scenario.scenario}</p>
              </div>

              {scenario.objectives && scenario.objectives.length > 0 && (
                <div className="rp-section">
                  <div className="rp-section-header">
                    <Target className="w-5 h-5" />
                    <h3>Objectives</h3>
                  </div>
                  <ul className="rp-objectives">
                    {scenario.objectives.map((objective, index) => (
                      <li key={index}>{objective}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className={`rp-timer ${timeUp ? 'rp-timer-up' : ''}`}>
              <Timer className="w-5 h-5" />
              <span>{timeUp ? "Time's Up!" : formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  // If viewing scenarios for a specific event
  if (selectedEvent) {
    const filteredScenarios = scenarios.filter(scenario => {
      const matchesDifficulty = scenario.difficulty === difficultyFilter;
      return matchesDifficulty;
    });
    const event = events.find(e => e.id === selectedEvent);

    return (
      <PageLayout
        title={`${event?.name} Practice`}
        subtitle="Choose a scenario to practice"
      >
        <div className="rp-container">
          <div className="rp-header-actions">
            <button onClick={handleBackToEvents} className="rp-back-btn">
              <ArrowLeft className="w-4 h-4" />
              Back to Events
            </button>

            <div className="rp-difficulty-filters">
              <button 
                className={`rp-filter-btn rp-filter-beginner ${difficultyFilter === 'Beginner' ? 'active' : ''}`}
                onClick={() => setDifficultyFilter('Beginner')}
              >
                Beginner
              </button>
              <button 
                className={`rp-filter-btn rp-filter-intermediate ${difficultyFilter === 'Intermediate' ? 'active' : ''}`}
                onClick={() => setDifficultyFilter('Intermediate')}
              >
                Intermediate
              </button>
              <button 
                className={`rp-filter-btn rp-filter-advanced ${difficultyFilter === 'Advanced' ? 'active' : ''}`}
                onClick={() => setDifficultyFilter('Advanced')}
              >
                Advanced
              </button>
            </div>
          </div>

          {isLoadingScenarios ? (
            <div className="flex items-center justify-center min-h-[300px]">
              <Loader2 className="w-12 h-12 animate-spin text-yellow-500" />
            </div>
          ) : filteredScenarios.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">No scenarios available for this difficulty level.</p>
            </div>
          ) : (
            <div className="rp-scenarios-grid">
              {filteredScenarios.map((scenario) => (
                <div 
                  key={scenario.id} 
                  className="rp-scenario-card"
                  onClick={() => handleStartScenario(selectedEvent, scenario.id)}
                >
                  <div className="rp-scenario-header">
                    <div className="rp-scenario-number-badge">
                      <span className="rp-scenario-num">{scenario.scenarioNumber}</span>
                    </div>
                    <span className={`rp-difficulty-badge rp-difficulty-${scenario.difficulty?.toLowerCase() || 'beginner'}`}>
                      {scenario.difficulty || 'Beginner'}
                    </span>
                  </div>

                  <div className="rp-scenario-content">
                    <div className="rp-scenario-section">
                      <div className="rp-section-icon">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div className="rp-section-content">
                        <h4 className="rp-section-title">Background</h4>
                        <p className="rp-section-text">{scenario.background.substring(0, 120)}...</p>
                      </div>
                    </div>

                    <div className="rp-scenario-section">
                      <div className="rp-section-icon">
                        <Lightbulb className="w-4 h-4" />
                      </div>
                      <div className="rp-section-content">
                        <h4 className="rp-section-title">Scenario</h4>
                        <p className="rp-section-text">{scenario.scenario.substring(0, 140)}...</p>
                      </div>
                    </div>

                    <div className="rp-scenario-meta">
                      <div className="rp-meta-item">
                        <Clock className="w-4 h-4" />
                        <span>20 minutes</span>
                      </div>
                      <div className="rp-meta-item">
                        <Target className="w-4 h-4" />
                        <span>50 points</span>
                      </div>
                    </div>
                  </div>

                  <div className="rp-scenario-footer-new">
                    <button className="rp-start-practice-btn">
                      <PlayCircle className="w-5 h-5" />
                      <span>Start Practice</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="rp-card-glow"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </PageLayout>
    );
  }

  // Main events list view
  return (
    <PageLayout
      title="Roleplay Practice"
      subtitle="Master real FBLA roleplay scenarios and prepare to win"
    >
      <div className="rp-container">
        <div className="rp-events-list">
          {events.map((event) => {
            const IconComponent = iconMap[event.icon] || Users;
            return (
              <div 
                key={event.id} 
                className="rp-event-card"
                onClick={() => handleEventClick(event.id)}
              >
                <div className="rp-event-icon">
                  <IconComponent />
                </div>
                
                <div className="rp-event-info">
                  <h3 className="rp-event-name">{event.name}</h3>
                  <p className="rp-event-desc">{event.description}</p>
                </div>
                
                <div className="rp-event-meta">
                  <span className="rp-event-count">
                    <BookOpen className="w-4 h-4" />
                    Practice scenarios
                  </span>
                </div>
                
                <div className="rp-event-arrow">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
}