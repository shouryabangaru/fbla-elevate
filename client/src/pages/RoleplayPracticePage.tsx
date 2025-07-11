import React, { useState, useEffect, useCallback } from 'react';
import { 
  Building2, 
  Users, 
  HeadsetIcon, 
  Lightbulb, 
  TrendingUp, 
  DollarSign,
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Clock
} from 'lucide-react';
import './RoleplayPracticePage.css';

interface RoleplayEvent {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  prompts: string[];
  approachSteps: string[];
}

interface TimerProps {
  timeLeft: number;
  isRunning: boolean;
  isPaused: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

interface EventGridProps {
  events: RoleplayEvent[];
  onEventSelect: (eventId: string) => void;
}

interface PromptSelectorProps {
  eventName: string;
  totalPrompts: number;
  currentPrompt: number;
  onPromptSelect: (promptIndex: number) => void;
}

interface PromptCardProps {
  event: RoleplayEvent;
  promptIndex: number;
}

interface NavigationButtonsProps {
  currentPrompt: number;
  totalPrompts: number;
  onPrevious: () => void;
  onNext: () => void;
  onBackToEvents: () => void;
}

// Timer Component
const Timer: React.FC<TimerProps> = ({ 
  timeLeft, 
  isRunning, 
  isPaused, 
  onStart, 
  onPause, 
  onReset 
}) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerClass = () => {
    if (timeLeft <= 60) return 'timer-display timer-warning';
    return 'timer-display';
  };

  return (
    <div className="timer-container">
      <div className="timer-content">
        <div className="timer-info">
          <Clock className="timer-icon" />
          <div className={getTimerClass()}>
            {formatTime(timeLeft)}
          </div>
          <span className="timer-hint">Press Space to pause/resume</span>
        </div>
        <div className="timer-controls">
          <button
            onClick={onStart}
            disabled={isRunning && !isPaused}
            className="timer-btn timer-btn-start"
          >
            <Play size={16} />
            Start
          </button>
          <button
            onClick={onPause}
            disabled={!isRunning}
            className="timer-btn timer-btn-pause"
          >
            <Pause size={16} />
            {isPaused ? 'Resume' : 'Pause'}
          </button>
          <button
            onClick={onReset}
            className="timer-btn timer-btn-reset"
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

// Event Grid Component
const EventGrid: React.FC<EventGridProps> = ({ events, onEventSelect }) => {
  return (
    <div className="event-grid">
      {events.map((event) => {
        const IconComponent = event.icon;
        return (
          <div
            key={event.id}
            className="event-card"
            onClick={() => onEventSelect(event.id)}
          >
            <IconComponent size={32} className="event-icon" />
            <h3 className="event-title">{event.name}</h3>
            <p className="event-subtitle">{event.prompts.length} prompts</p>
          </div>
        );
      })}
    </div>
  );
};

// Prompt Selector Component
const PromptSelector: React.FC<PromptSelectorProps> = ({ 
  eventName, 
  totalPrompts, 
  currentPrompt, 
  onPromptSelect 
}) => {
  return (
    <div className="prompt-selector">
      <h2 className="prompt-selector-title">{eventName}</h2>
      <div className="prompt-buttons">
        {Array.from({ length: totalPrompts }, (_, index) => (
          <button
            key={index}
            onClick={() => onPromptSelect(index)}
            className={`prompt-btn ${index === currentPrompt ? 'prompt-btn-active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

// Prompt Card Component
const PromptCard: React.FC<PromptCardProps> = ({ event, promptIndex }) => {
  return (
    <div className="prompt-card">
      <div className="prompt-header">
        <h3 className="prompt-title">Prompt {promptIndex + 1}</h3>
      </div>
      <div className="prompt-content">
        <div className="prompt-text">
          {event.prompts[promptIndex]}
        </div>
        <div className="prompt-guidance">
          <h4 className="guidance-title">How to Approach This Prompt:</h4>
          <ul className="guidance-list">
            {event.approachSteps.map((step, index) => (
              <li key={index} className="guidance-item">
                <span className="guidance-bullet">•</span>
                {step}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Navigation Buttons Component
const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentPrompt,
  totalPrompts,
  onPrevious,
  onNext,
  onBackToEvents
}) => {
  return (
    <div className="navigation-container">
      <button
        onClick={onBackToEvents}
        className="nav-btn nav-btn-secondary"
      >
        <ArrowLeft size={16} />
        Back to Events
      </button>
      
      <div className="nav-controls">
        <button
          onClick={onPrevious}
          disabled={currentPrompt === 0}
          className="nav-btn nav-btn-primary"
        >
          <ChevronLeft size={16} />
          Previous
        </button>
        
        <span className="nav-indicator">
          {currentPrompt + 1} of {totalPrompts}
        </span>
        
        <button
          onClick={onNext}
          disabled={currentPrompt === totalPrompts - 1}
          className="nav-btn nav-btn-primary"
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

// Main Component
export default function RoleplayPracticePage() {
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [currentPrompt, setCurrentPrompt] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(600); // 10 minutes
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // TODO: Store user practice history (event, prompt, date)
  // TODO: Upload or record practice video/audio
  // TODO: Community prompt submissions

  const events: RoleplayEvent[] = [
    {
      id: 'banking',
      name: 'Banking & Financial Systems',
      icon: Building2,
      prompts: [
        'You are a bank teller helping a customer who wants to open a new checking account. The customer has questions about fees, minimum balance requirements, and online banking features.',
        'A customer approaches you about getting a loan for a new car. They want to understand the application process, interest rates, and what documentation they need.',
        'You need to explain to a customer why their account was charged an overdraft fee and help them understand how to avoid these fees in the future.',
        'A customer wants to set up a savings account for their child\'s college fund. Explain the different savings options and their benefits.',
        'You are helping a customer who lost their debit card while traveling. They need immediate assistance and a replacement card.',
        'A business owner wants to open a commercial account and needs information about business banking services and merchant processing.',
        'A customer is disputing a charge on their account and wants to know the process for investigating the transaction.',
        'You need to help a customer understand investment options available through the bank and their associated risks.',
        'A customer wants to set up automatic bill payments but is concerned about security and account management.',
        'You are assisting an elderly customer who is confused about online banking and needs help with basic digital services.',
        'A customer is interested in a mortgage and wants to understand the pre-approval process and requirements.',
        'You need to explain to a customer how to use the bank\'s mobile app features and troubleshoot a login issue.',
        'A customer wants to close their account and needs information about the process and any associated fees.',
        'You are helping a customer who received a suspicious text claiming to be from the bank and needs fraud protection guidance.',
        'A customer wants to understand the difference between various types of loans and which would be best for their situation.'
      ],
      approachSteps: [
        'Listen actively to understand the customer\'s specific needs and concerns',
        'Ask clarifying questions to gather all necessary information',
        'Explain products and services in simple, clear terms avoiding jargon',
        'Be transparent about fees, requirements, and processes',
        'Provide written materials or digital resources for complex information',
        'Follow up to ensure customer satisfaction and address any remaining questions'
      ]
    },
    {
      id: 'business-management',
      name: 'Business Management',
      icon: Users,
      prompts: [
        'You are a manager who needs to address declining team productivity. Plan a meeting with your team to discuss solutions and motivate improvement.',
        'A new employee is struggling with their responsibilities. Develop a coaching plan to help them succeed while maintaining team morale.',
        'Your company is implementing new software that will change daily workflows. Plan how to communicate this change and train your team.',
        'You need to resolve a conflict between two team members that is affecting the entire department\'s performance.',
        'Present a proposal to upper management for a new project that could increase revenue but requires significant initial investment.',
        'You must deliver disappointing news about budget cuts that will affect your team\'s resources and projects.',
        'A key team member has submitted their resignation and you need to manage the transition while maintaining productivity.',
        'You are conducting a performance review for an employee who meets expectations but lacks initiative.',
        'Your team is facing a tight deadline on a critical project and stress levels are high.',
        'You need to implement a new company policy that your team strongly opposes.',
        'A client is demanding changes to a project that would require significant overtime from your team.',
        'You must choose between two equally qualified candidates for a promotion within your department.',
        'Your team is working remotely and you\'ve noticed communication and collaboration issues.',
        'You need to address an employee who consistently arrives late and leaves early.',
        'A department restructuring means you need to eliminate one position from your team.'
      ],
      approachSteps: [
        'Assess the situation objectively and gather all relevant facts',
        'Consider the impact on all stakeholders involved',
        'Develop multiple potential solutions with pros and cons',
        'Communicate clearly and professionally with all parties',
        'Set measurable goals and realistic timelines for improvement',
        'Follow up regularly to monitor progress and adjust strategies as needed'
      ]
    },
    {
      id: 'customer-service',
      name: 'Customer Service',
      icon: HeadsetIcon,
      prompts: [
        'A customer received a damaged product and is very upset. They want a refund and are threatening to leave negative reviews online.',
        'A customer is confused about how to use a product they purchased. They are getting frustrated and need clear, patient guidance.',
        'You need to inform a customer that the item they want is out of stock, but offer alternative solutions to meet their needs.',
        'A customer is asking for a discount on a product that is not currently on sale. They mention they are a loyal customer.',
        'Handle a customer complaint about poor service they received from another department, even though you were not directly involved.',
        'A customer wants to return an item after the return policy deadline has passed.',
        'You are dealing with a customer who is angry about a billing error that has affected their account.',
        'A customer is requesting a service that your company doesn\'t offer and is upset about the limitation.',
        'You need to explain a complex policy change to a customer who is resistant to the new procedures.',
        'A customer has been waiting on hold for an extended time and is very frustrated when you answer.',
        'You are helping a customer who speaks limited English and is having trouble understanding the options.',
        'A customer received the wrong order and needs it corrected immediately for an important event.',
        'You need to handle a customer who is being rude and using inappropriate language.',
        'A customer wants to speak to a manager but all managers are currently unavailable.',
        'A customer is comparing your prices to a competitor and threatening to switch providers.'
      ],
      approachSteps: [
        'Remain calm and professional regardless of customer emotion',
        'Listen actively and empathize with the customer\'s situation',
        'Apologize sincerely for any inconvenience caused',
        'Offer specific solutions rather than just explanations',
        'Follow company policies while finding creative solutions within guidelines',
        'Document the interaction thoroughly for future reference and follow-up'
      ]
    },
    {
      id: 'entrepreneurship',
      name: 'Entrepreneurship',
      icon: Lightbulb,
      prompts: [
        'You are pitching your business idea to potential investors. You have 5 minutes to convince them to invest in your startup.',
        'A potential business partner wants to discuss terms for a joint venture. Negotiate a fair agreement that benefits both parties.',
        'You need to present your business plan to a bank to secure a small business loan for your startup.',
        'A competitor is offering to buy your business. Evaluate the offer and decide whether to accept, decline, or negotiate.',
        'You are seeking mentorship from a successful entrepreneur. Explain your business goals and ask for specific guidance.',
        'A major client wants to change the terms of your contract, reducing your profit margin significantly.',
        'You need to convince a talented employee to leave their current job and join your startup.',
        'An investor is interested but wants to change a fundamental aspect of your business model.',
        'You are presenting to a group of potential customers to validate your product idea before launch.',
        'A supplier is demanding payment upfront, but your cash flow is tight.',
        'You need to explain to your team why you have to make difficult decisions about company spending.',
        'A journalist wants to interview you about your business for a major publication.',
        'You are networking at a business event and need to make connections with industry leaders.',
        'A potential customer loves your product but wants custom features that would be expensive to develop.',
        'You need to present your expansion plans to current investors for additional funding.'
      ],
      approachSteps: [
        'Clearly articulate your unique value proposition and competitive advantage',
        'Support all claims with concrete data and market research',
        'Demonstrate genuine passion and deep knowledge about your industry',
        'Address potential concerns or objections proactively',
        'Show realistic scalability and sustainable growth potential',
        'Be prepared to negotiate terms while protecting your core business interests'
      ]
    },
    {
      id: 'marketing',
      name: 'Marketing',
      icon: TrendingUp,
      prompts: [
        'Present a new marketing campaign to a client who has concerns about the budget and potential return on investment.',
        'A product launch was unsuccessful and sales are below expectations. Develop a strategy to revive the product and boost sales.',
        'You need to convince a traditional company to embrace social media marketing as part of their overall strategy.',
        'A client wants to target a younger demographic but is unsure how to adapt their message and approach.',
        'Present market research findings to a client and recommend changes to their current marketing approach.',
        'A client\'s competitor just launched a similar product with a major marketing push. How do you respond?',
        'You need to explain why a viral marketing campaign failed and propose a new strategy.',
        'A client wants to cut their marketing budget in half but maintain the same results.',
        'You are proposing a complete rebranding for a company that has been using the same image for 20 years.',
        'A client is unhappy with the engagement rates on their social media and wants explanations and solutions.',
        'You need to present a crisis communication plan after a negative publicity incident.',
        'A client wants to expand into international markets and needs guidance on cultural marketing considerations.',
        'You are explaining why a seemingly successful campaign didn\'t translate to actual sales.',
        'A client wants to use influencer marketing but is concerned about authenticity and cost.',
        'You need to justify why digital marketing is more effective than traditional methods for their specific industry.'
      ],
      approachSteps: [
        'Research and thoroughly understand your target audience demographics and psychographics',
        'Present data-driven insights and recommendations backed by analytics',
        'Use compelling visuals and real-world examples to illustrate your points',
        'Address budget concerns with detailed ROI projections and cost-benefit analysis',
        'Provide multiple strategic options with clear pros and cons',
        'Create measurable timelines and KPIs for tracking success'
      ]
    },
    {
      id: 'sales',
      name: 'Sales',
      icon: DollarSign,
      prompts: [
        'A potential customer is interested in your product but concerned about the price. Address their objections and close the sale.',
        'You are cold-calling potential customers to introduce a new service. Handle rejections professionally and find interested prospects.',
        'A long-term client is considering switching to a competitor. Convince them to stay while addressing their concerns.',
        'You need to upsell additional services to an existing customer who is happy with their current package.',
        'A customer wants to negotiate a bulk discount for a large order. Determine terms that work for both parties.',
        'You are presenting to a committee of decision-makers who all have different priorities and concerns.',
        'A prospect has been comparing your solution to competitors for months and can\'t make a decision.',
        'You need to sell a premium product to a cost-conscious customer who typically buys budget options.',
        'A customer is interested but wants to start with a trial period before committing to a full contract.',
        'You are following up with a lead who seemed interested but hasn\'t returned your calls.',
        'A potential customer loves your product but doesn\'t have the budget allocated until next year.',
        'You need to explain complex technical features to a customer who isn\'t technically savvy.',
        'A customer is ready to buy but wants modifications to the standard contract terms.',
        'You are competing against a much larger company that can offer lower prices.',
        'A customer had a bad experience with your company in the past and is reluctant to do business again.'
      ],
      approachSteps: [
        'Research the prospect\'s industry, company, and specific challenges beforehand',
        'Build genuine rapport and establish trust early in the conversation',
        'Ask strategic open-ended questions to fully understand their situation and needs',
        'Present tailored solutions that directly address their specific pain points',
        'Handle objections professionally with evidence and alternative perspectives',
        'Create appropriate urgency while maintaining complete integrity and honesty'
      ]
    }
  ];

  const selectedEvent = events.find(event => event.id === selectedEventId);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      setIsPaused(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, isPaused, timeLeft]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Spacebar for timer
      if (event.code === 'Space') {
        event.preventDefault();
        if (isRunning) {
          setIsPaused(prev => !prev);
        } else {
          setIsRunning(true);
          setIsPaused(false);
        }
      }
      // N for next prompt
      if (event.code === 'KeyN' && selectedEvent && currentPrompt < selectedEvent.prompts.length - 1) {
        setCurrentPrompt(prev => prev + 1);
      }
      // P for previous prompt
      if (event.code === 'KeyP' && currentPrompt > 0) {
        setCurrentPrompt(prev => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isRunning, isPaused, currentPrompt, selectedEvent]);

  // Timer functions
  const startTimer = useCallback(() => {
    setIsRunning(true);
    setIsPaused(false);
  }, []);

  const pauseTimer = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    setTimeLeft(600);
    setIsRunning(false);
    setIsPaused(false);
  }, []);

  // Navigation functions
  const handleEventSelect = useCallback((eventId: string) => {
    setSelectedEventId(eventId);
    setCurrentPrompt(0);
    resetTimer();
  }, [resetTimer]);

  const handlePromptSelect = useCallback((promptIndex: number) => {
    setCurrentPrompt(promptIndex);
  }, []);

  const handlePrevious = useCallback(() => {
    setCurrentPrompt(prev => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    if (selectedEvent) {
      setCurrentPrompt(prev => Math.min(selectedEvent.prompts.length - 1, prev + 1));
    }
  }, [selectedEvent]);

  const handleBackToEvents = useCallback(() => {
    setSelectedEventId('');
    setCurrentPrompt(0);
    resetTimer();
  }, [resetTimer]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-fbla-blue mb-2">Roleplay Practice</h1>
          <p className="text-gray-600 text-lg">Master business scenarios with timed practice sessions</p>
        </div>

        <Timer
          timeLeft={timeLeft}
          isRunning={isRunning}
          isPaused={isPaused}
          onStart={startTimer}
          onPause={pauseTimer}
          onReset={resetTimer}
        />

        {!selectedEvent ? (
          <div className="event-selection">
            <h2 className="section-title">Choose Your Event</h2>
            <EventGrid events={events} onEventSelect={handleEventSelect} />
          </div>
        ) : (
          <div className="practice-session">
            <PromptSelector
              eventName={selectedEvent.name}
              totalPrompts={selectedEvent.prompts.length}
              currentPrompt={currentPrompt}
              onPromptSelect={handlePromptSelect}
            />
            
            <PromptCard
              event={selectedEvent}
              promptIndex={currentPrompt}
            />
            
            <NavigationButtons
              currentPrompt={currentPrompt}
              totalPrompts={selectedEvent.prompts.length}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onBackToEvents={handleBackToEvents}
            />
          </div>
        )}

        <div className="practice-instructions">
          <h3 className="instructions-title">Practice Instructions</h3>
          <div className="instructions-grid">
            <div className="instruction-group">
              <h4>Timer Controls:</h4>
              <ul>
                <li>Press <strong>Space</strong> to pause/resume</li>
                <li>Timer turns red under 1 minute</li>
                <li>Standard practice time: 10 minutes</li>
              </ul>
            </div>
            <div className="instruction-group">
              <h4>Navigation:</h4>
              <ul>
                <li>Press <strong>N</strong> for next prompt</li>
                <li>Press <strong>P</strong> for previous prompt</li>
                <li>Click prompt numbers for quick access</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}