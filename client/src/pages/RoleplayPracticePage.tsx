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
  Timer
} from 'lucide-react';
// @ts-ignore
import { getAllEvents, getEventDetails } from '../../../shared/roleplayDatabase.js';
import './RoleplayPracticePage.css';

interface RoleplayScenario {
  id: string;
  eventName: string;
  scenarioNumber: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number;
  points: number;
  background: string;
  scenario: string;
  objectives: string[];
  icon: React.ComponentType<any>;
}

interface RoleplayEvent {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
  scenarioCount: number;
  category: string;
  color: string;
}

export default function RoleplayPracticePage() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [practiceScenario, setPracticeScenario] = useState<{eventId: string, promptIndex: number} | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(20 * 60); // 20 minutes in seconds
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [timeUp, setTimeUp] = useState<boolean>(false);
  
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

  // Load events from database and map to the component format
  const databaseEvents = getAllEvents();
  const roleplayEvents: RoleplayEvent[] = [
    {
      id: 'banking-financial',
      name: 'Banking & Financial Systems',
      icon: DollarSign,
      description: 'Master banking operations, customer financial guidance, and comprehensive financial services across all complexity levels.',
      scenarioCount: 15,
      category: 'Banking & Financial Systems',
      color: 'from-green-600 to-emerald-700'
    },
    {
      id: 'business-management',
      name: 'Business Management',
      icon: Building2,
      description: 'Leadership scenarios involving team management, strategic planning, and operational challenges.',
      scenarioCount: 15,
      category: 'Business Management',
      color: 'from-blue-600 to-cyan-700'
    },
    {
      id: 'customer-service',
      name: 'Customer Service',
      icon: HeadsetIcon,
      description: 'Master customer interaction techniques, complaint resolution, and service excellence in various business contexts.',
      scenarioCount: 15,
      category: 'Customer Service',
      color: 'from-purple-500 to-violet-600'
    },
    {
      id: 'entrepreneurship',
      name: 'Entrepreneurship',
      icon: Lightbulb,
      description: 'Navigate startup challenges, investor relations, and entrepreneurial decision-making scenarios.',
      scenarioCount: 15,
      category: 'Entrepreneurship',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      id: 'hospitality-event',
      name: 'Hospitality & Event Management',
      icon: Hotel,
      description: 'Hotel, restaurant, and event planning scenarios with customer service focus.',
      scenarioCount: 15,
      category: 'Hospitality & Event Management',
      color: 'from-teal-500 to-cyan-600'
    },
    {
      id: 'international-business',
      name: 'International Business',
      icon: Globe,
      description: 'Cross-cultural business scenarios, global trade situations, and international relations.',
      scenarioCount: 15,
      category: 'International Business',
      color: 'from-indigo-500 to-purple-600'
    },
    {
      id: 'management-information-systems',
      name: 'Management Information Systems',
      icon: Monitor,
      description: 'IT management scenarios, system implementation, and technology decision-making in business contexts.',
      scenarioCount: 15,
      category: 'Management Information Systems',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'marketing',
      name: 'Marketing',
      icon: TrendingUp,
      description: 'Marketing strategy challenges, campaign management, and brand positioning scenarios.',
      scenarioCount: 15,
      category: 'Marketing',
      color: 'from-pink-600 to-rose-700'
    },
    {
      id: 'network-design',
      name: 'Network Design',
      icon: Network,
      description: 'Network architecture scenarios, IT infrastructure planning, and technical problem-solving.',
      scenarioCount: 15,
      category: 'Network Design',
      color: 'from-gray-500 to-slate-600'
    },
    {
      id: 'parliamentary-procedure',
      name: 'Parliamentary Procedure',
      icon: Scale,
      description: 'Meeting management scenarios, procedural knowledge, and leadership in formal settings.',
      scenarioCount: 15,
      category: 'Parliamentary Procedure',
      color: 'from-red-600 to-orange-700'
    },
    {
      id: 'sports-entertainment',
      name: 'Sports & Entertainment Management',
      icon: Trophy,
      description: 'Sports business scenarios, entertainment industry challenges, and event management.',
      scenarioCount: 15,
      category: 'Sports & Entertainment Management',
      color: 'from-red-500 to-orange-600'
    },
    {
      id: 'technology-support',
      name: 'Technology Support & Services',
      icon: Users,
      description: 'Technical support scenarios, customer service in technology contexts, and IT problem resolution.',
      scenarioCount: 15,
      category: 'Technology Support & Services',
      color: 'from-violet-500 to-purple-600'
    }
  ];

  // Generate roleplay scenarios from database with new format
  const generateScenarios = (): RoleplayScenario[] => {
    const scenarios: RoleplayScenario[] = [];
    
    // Get Banking & Financial Systems scenarios from database
    const bankingEvent = getEventDetails('banking-financial');
    if (bankingEvent) {
      bankingEvent.prompts.forEach((prompt: string, i: number) => {
        // Parse the prompt to extract background, scenario, and objectives
        const parts = prompt.split('\n\n');
        const background = parts[0] || 'Background information not specified.';
        const scenario = parts[1] || prompt;
        const objectives = parts[2] ? parts[2].split('\n').filter(line => line.trim()) : [
          'Address the customer\'s needs professionally',
          'Provide accurate information',
          'Ensure customer satisfaction'
        ];

        scenarios.push({
          id: `banking-financial-${i + 1}`,
          eventName: bankingEvent.name,
          scenarioNumber: i + 1,
          difficulty: i < 5 ? 'Beginner' : i < 10 ? 'Intermediate' : 'Advanced',
          duration: 20,
          points: 50,
          background,
          scenario,
          objectives,
          icon: DollarSign
        });
      });
    }

    // Get other events from database
    const businessEvent = getEventDetails('business-management');
    if (businessEvent) {
      businessEvent.prompts.forEach((prompt: string, i: number) => {
        const parts = prompt.split('\n\n');
        const background = parts[0] || 'Business management context.';
        const scenario = parts[1] || prompt;
        const objectives = parts[2] ? parts[2].split('\n').filter(line => line.trim()) : [
          'Demonstrate leadership skills',
          'Make strategic decisions',
          'Communicate effectively'
        ];

        scenarios.push({
          id: `business-management-${i + 1}`,
          eventName: businessEvent.name,
          scenarioNumber: i + 1,
          difficulty: i < 5 ? 'Beginner' : i < 10 ? 'Intermediate' : 'Advanced',
          duration: 20,
          points: 50,
          background,
          scenario,
          objectives,
          icon: Building2
        });
      });
    }

    const customerEvent = getEventDetails('customer-service');
    if (customerEvent) {
      customerEvent.prompts.forEach((prompt: string, i: number) => {
        const parts = prompt.split('\n\n');
        const background = parts[0] || 'Customer service situation.';
        const scenario = parts[1] || prompt;
        const objectives = parts[2] ? parts[2].split('\n').filter(line => line.trim()) : [
          'Provide excellent customer service',
          'Resolve customer concerns',
          'Maintain professional demeanor'
        ];

        scenarios.push({
          id: `customer-service-${i + 1}`,
          eventName: customerEvent.name,
          scenarioNumber: i + 1,
          difficulty: i < 5 ? 'Beginner' : i < 10 ? 'Intermediate' : 'Advanced',
          duration: 20,
          points: 50,
          background,
          scenario,
          objectives,
          icon: HeadsetIcon
        });
      });
    }

    const entrepreneurEvent = getEventDetails('entrepreneurship');
    if (entrepreneurEvent) {
      entrepreneurEvent.prompts.forEach((prompt: string, i: number) => {
        const parts = prompt.split('\n\n');
        const background = parts[0] || 'Entrepreneurial context.';
        const scenario = parts[1] || prompt;
        const objectives = parts[2] ? parts[2].split('\n').filter(line => line.trim()) : [
          'Identify business opportunities',
          'Develop innovative solutions',
          'Present compelling proposals'
        ];

        scenarios.push({
          id: `entrepreneurship-${i + 1}`,
          eventName: entrepreneurEvent.name,
          scenarioNumber: i + 1,
          difficulty: i < 5 ? 'Beginner' : i < 10 ? 'Intermediate' : 'Advanced',
          duration: 20,
          points: 50,
          background,
          scenario,
          objectives,
          icon: Lightbulb
        });
      });
    }

    return scenarios;
  };

  const roleplayScenarios: RoleplayScenario[] = generateScenarios();

  // Event handlers
  const handleEventClick = (eventId: string) => {
    console.log('Event clicked:', eventId);
    setSelectedEvent(eventId);
  };

  const handleBackToEvents = () => {
    setSelectedEvent(null);
    setPracticeScenario(null);
    setTimeLeft(20 * 60);
    setTimerActive(false);
    setTimeUp(false);
  };

  const handleStartScenario = (eventId: string, promptIndex: number) => {
    setPracticeScenario({ eventId, promptIndex });
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

  // If practicing a specific scenario
  if (practiceScenario) {
    const scenario = roleplayScenarios.find(s => 
      s.id === `${practiceScenario.eventId}-${practiceScenario.promptIndex + 1}`
    );

    if (!scenario) return <div>Scenario not found</div>;

    return (
      <div className="roleplay-container">
        <div className="practice-header">
          <button onClick={handleFinishPractice} className="back-button">
            <ArrowLeft className="w-4 h-4" />
            Back to Scenarios
          </button>
          <div className="practice-title">
            <h1>{scenario.eventName}</h1>
            <p>Scenario {scenario.scenarioNumber} of 15</p>
            <div className="scenario-meta">
              <span className={`difficulty ${scenario.difficulty.toLowerCase()}`}>
                {scenario.difficulty}
              </span>
              <span className="duration-pill">
                <Clock className="w-4 h-4" />
                20 min
              </span>
              <span className="points-pill">
                <Target className="w-4 h-4" />
                50 points
              </span>
            </div>
          </div>
        </div>

        <div className="practice-content">
          {/* Background Information Section */}
          <div className="scenario-section background-section">
            <h2>Background Information</h2>
            <p>{scenario.background}</p>
          </div>

          {/* Scenario Section */}
          <div className="scenario-section scenario-main">
            <h2>Scenario</h2>
            <p>{scenario.scenario}</p>
          </div>

          {/* Objectives Section */}
          <div className="scenario-section objectives-section">
            <h2>Objectives</h2>
            <ul>
              {scenario.objectives.map((objective, index) => (
                <li key={index}>{objective}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Timer at bottom */}
        <div className={`timer-bar ${timeUp ? 'time-up' : ''}`}>
          <div className="timer-content">
            <Timer className="w-5 h-5" />
            <span className="timer-text">
              {timeUp ? "Time's Up!" : formatTime(timeLeft)}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // If viewing scenarios for a specific event
  if (selectedEvent) {
    const filteredScenarios = roleplayScenarios.filter(scenario => 
      scenario.id.startsWith(selectedEvent)
    );
    const event = roleplayEvents.find(e => e.id === selectedEvent);

    return (
      <div className="roleplay-container">
        <div className="scenarios-header">
          <button onClick={handleBackToEvents} className="back-button">
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </button>
          <div>
            <h1 className="scenarios-title">{event?.name} Practice</h1>
            <p className="scenarios-subtitle">Choose a scenario to practice</p>
          </div>
        </div>

        <div className="scenarios-grid">
          {filteredScenarios.map((scenario) => (
            <div key={scenario.id} className="scenario-card">
              <div className="scenario-header">
                <div className="scenario-number">
                  {scenario.scenarioNumber}
                </div>
                <div className={`scenario-difficulty ${scenario.difficulty.toLowerCase()}`}>
                  {scenario.difficulty}
                </div>
                <div className="scenario-pills">
                  <span className="duration-pill">
                    <Clock className="w-4 h-4" />
                    20 min
                  </span>
                  <span className="points-pill">
                    <Target className="w-4 h-4" />
                    50 points
                  </span>
                </div>
              </div>
              
              <div className="scenario-preview">
                <h4>Background:</h4>
                <p className="scenario-background">{scenario.background.substring(0, 80)}...</p>
                
                <h4>Scenario:</h4>
                <p className="scenario-description">{scenario.scenario.substring(0, 120)}...</p>
              </div>
              
              <div className="scenario-footer">
                <button 
                  className="scenario-start-btn"
                  onClick={() => handleStartScenario(selectedEvent, scenario.scenarioNumber - 1)}
                >
                  <PlayCircle className="w-4 h-4" />
                  Start Practice
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="roleplay-container">
      <div className="roleplay-header">
        <h1 className="roleplay-title">Choose Your Event</h1>
        <p className="roleplay-tagline">Master real FBLA roleplay scenarios and prepare to win.</p>
        <p className="roleplay-subtitle">
          Select an FBLA roleplay event category to practice realistic business scenarios
        </p>
      </div>

      <div className="events-grid">
        {roleplayEvents.map((event) => (
          <div 
            key={event.id} 
            className="event-card"
            onClick={() => handleEventClick(event.id)}
          >
            <div className="event-icon-wrapper">
              <div className="event-icon">
                <event.icon />
              </div>
            </div>
            
            <h3 className="event-name">{event.name}</h3>
            
            <div className="event-scenarios">
              <BookOpen className="w-4 h-4 inline mr-1" />
              {event.scenarioCount} scenarios
            </div>
            
            <p className="event-description">
              {event.description}
            </p>
            
            <button className="event-button">
              Practice Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}