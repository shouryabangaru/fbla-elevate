import { useState, useEffect } from 'react';
import { PageLayout } from '@/components/shared/PageLayout';
import { StyledCard } from '@/components/shared/StyledCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, ArrowLeft, Timer, Target, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import './RoleplayPracticePage.css';

// Sample roleplay prompts data
const roleplayPrompts = {
  "Banking & Financial Systems": [
    {
      id: 1,
      prompt: "You are a bank branch manager tasked with increasing new account sign-ups by 20% this quarter. Your branch has been underperforming compared to other locations in the region.",
      guidance: [
        "Identify current weaknesses in customer acquisition",
        "Propose 2-3 specific marketing strategies",
        "Discuss risk management for new account holders",
        "Address staff training and motivation",
        "Present timeline and measurable goals"
      ]
    },
    {
      id: 2,
      prompt: "A long-time customer is upset about new banking fees and is threatening to close their account. They have been with the bank for 15 years and maintain significant deposits.",
      guidance: [
        "Listen actively to understand their concerns",
        "Acknowledge their loyalty and value to the bank",
        "Explain the reasoning behind fee changes",
        "Offer alternative solutions or fee waivers",
        "Ensure customer retention while maintaining policies"
      ]
    },
    {
      id: 3,
      prompt: "Your bank is implementing a new digital banking platform. You must present the rollout plan to senior management, addressing potential challenges and benefits.",
      guidance: [
        "Outline the implementation timeline",
        "Address cybersecurity concerns",
        "Discuss customer training and support",
        "Present cost-benefit analysis",
        "Plan for system downtime and contingencies"
      ]
    }
  ],
  "Business Management": [
    {
      id: 1,
      prompt: "As a department manager, you've noticed a 15% decrease in productivity over the past quarter. Employee morale seems low, and there have been more sick days than usual.",
      guidance: [
        "Analyze root causes of productivity decline",
        "Develop strategies to improve employee morale",
        "Create metrics to track improvement",
        "Address workload distribution issues",
        "Implement recognition and incentive programs"
      ]
    },
    {
      id: 2,
      prompt: "Your company is facing budget cuts, and you need to reduce departmental expenses by 25% while maintaining service quality and employee satisfaction.",
      guidance: [
        "Identify non-essential expenses to eliminate",
        "Explore cost-saving alternatives",
        "Communicate changes transparently to team",
        "Maintain core functions and quality standards",
        "Develop contingency plans for further cuts"
      ]
    },
    {
      id: 3,
      prompt: "You're managing a team of 12 employees with diverse skill sets. A major client project requires restructuring your team and reassigning responsibilities.",
      guidance: [
        "Assess individual strengths and capabilities",
        "Match skills to project requirements",
        "Communicate changes clearly to all team members",
        "Establish new reporting structures",
        "Create timeline for transition and training"
      ]
    }
  ],
  "Customer Service": [
    {
      id: 1,
      prompt: "A customer is extremely angry about a defective product they purchased three months ago. They're demanding a full refund, but your policy only allows returns within 30 days.",
      guidance: [
        "Listen actively and empathize with frustration",
        "Acknowledge the inconvenience caused",
        "Explain company policy clearly but kindly",
        "Offer alternative solutions (repair, exchange, credit)",
        "Escalate to manager if necessary while maintaining rapport"
      ]
    },
    {
      id: 2,
      prompt: "Your company's customer service ratings have dropped from 4.5 to 3.2 stars over the past six months. You need to present an improvement plan to management.",
      guidance: [
        "Analyze feedback to identify common issues",
        "Develop specific action items for improvement",
        "Create staff training programs",
        "Implement new quality assurance measures",
        "Establish timeline and success metrics"
      ]
    },
    {
      id: 3,
      prompt: "A VIP customer is experiencing technical issues with your service during a critical business period. They're considering switching to a competitor.",
      guidance: [
        "Prioritize immediate technical support",
        "Communicate proactively about resolution progress",
        "Offer compensation for inconvenience",
        "Ensure long-term relationship maintenance",
        "Document case for future prevention"
      ]
    }
  ],
  "Entrepreneurship": [
    {
      id: 1,
      prompt: "You're presenting your startup idea to potential investors. Your business model focuses on sustainable packaging solutions for e-commerce companies.",
      guidance: [
        "Clearly define the problem you're solving",
        "Present market size and opportunity",
        "Explain your unique value proposition",
        "Discuss revenue model and scalability",
        "Address potential risks and mitigation strategies"
      ]
    },
    {
      id: 2,
      prompt: "Your startup has been operating for 18 months but is burning through cash faster than expected. You need to pivot your business model to achieve profitability.",
      guidance: [
        "Analyze current financial situation honestly",
        "Identify which aspects of the business are working",
        "Develop new revenue streams",
        "Create timeline for break-even",
        "Communicate changes to stakeholders"
      ]
    },
    {
      id: 3,
      prompt: "A major corporation wants to acquire your successful startup. You need to evaluate the offer and present your recommendation to co-founders and investors.",
      guidance: [
        "Assess the financial terms and company valuation",
        "Consider strategic fit and cultural alignment",
        "Evaluate impact on employees and customers",
        "Analyze alternatives to acquisition",
        "Present balanced recommendation with pros and cons"
      ]
    }
  ],
  "Marketing": [
    {
      id: 1,
      prompt: "Your company's main competitor just launched a product very similar to yours at a 30% lower price point. You need to develop a response strategy.",
      guidance: [
        "Analyze competitor's strengths and weaknesses",
        "Identify your unique value differentiators",
        "Develop pricing and positioning strategy",
        "Create marketing campaign to highlight advantages",
        "Consider product enhancements or bundles"
      ]
    },
    {
      id: 2,
      prompt: "Your latest marketing campaign generated significant social media buzz but failed to drive actual sales. You need to explain this to leadership and propose solutions.",
      guidance: [
        "Analyze campaign metrics and conversion funnel",
        "Identify gaps between awareness and purchase",
        "Propose solutions to improve conversion",
        "Adjust targeting and messaging strategy",
        "Set realistic expectations for future campaigns"
      ]
    },
    {
      id: 3,
      prompt: "You're launching a new product in a saturated market. Your budget is limited, but you need to achieve significant market penetration within 6 months.",
      guidance: [
        "Identify niche market segments to target",
        "Develop cost-effective marketing channels",
        "Create compelling unique selling proposition",
        "Establish partnerships for broader reach",
        "Implement guerrilla marketing tactics"
      ]
    }
  ],
  "International Business": [
    {
      id: 1,
      prompt: "Your company wants to expand into the Asian market, specifically targeting Japan and South Korea. You need to present a market entry strategy.",
      guidance: [
        "Research cultural differences and business practices",
        "Analyze regulatory requirements and barriers",
        "Develop localization strategy for products/services",
        "Identify potential local partners or distributors",
        "Create timeline and budget for market entry"
      ]
    },
    {
      id: 2,
      prompt: "Exchange rate fluctuations have significantly impacted your international business profits. You need to develop a risk management strategy.",
      guidance: [
        "Analyze current exposure to currency risk",
        "Explore hedging strategies and financial instruments",
        "Consider pricing adjustments for different markets",
        "Develop contingency plans for major fluctuations",
        "Present cost-benefit analysis of risk management options"
      ]
    },
    {
      id: 3,
      prompt: "Your international supplier is facing political instability in their country, threatening your supply chain. You need to develop a continuity plan.",
      guidance: [
        "Assess immediate risks to operations",
        "Identify alternative suppliers in stable regions",
        "Develop supply chain diversification strategy",
        "Create emergency response protocols",
        "Communicate with stakeholders about potential impacts"
      ]
    }
  ]
};

const events = Object.keys(roleplayPrompts);

export default function RoleplayPracticePage() {
  const [selectedEvent, setSelectedEvent] = useState('');
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(10);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isTimerFinished, setIsTimerFinished] = useState(false);
  const [showEventSelector, setShowEventSelector] = useState(true);
  const { toast } = useToast();

  const currentPrompts = selectedEvent ? roleplayPrompts[selectedEvent as keyof typeof roleplayPrompts] : [];
  const currentPrompt = currentPrompts[currentPromptIndex];

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTimerRunning && (timerMinutes > 0 || timerSeconds > 0)) {
      interval = setInterval(() => {
        if (timerSeconds > 0) {
          setTimerSeconds(timerSeconds - 1);
        } else if (timerMinutes > 0) {
          setTimerMinutes(timerMinutes - 1);
          setTimerSeconds(59);
        } else {
          setIsTimerRunning(false);
          setIsTimerFinished(true);
          toast({
            title: "Time's up!",
            description: "Practice your delivery!",
            duration: 5000,
          });
        }
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isTimerRunning, timerMinutes, timerSeconds, toast]);

  const handleStartTimer = () => {
    setIsTimerRunning(true);
    setIsTimerFinished(false);
  };

  const handleStopTimer = () => {
    setIsTimerRunning(false);
  };

  const handleResetTimer = () => {
    setTimerMinutes(10);
    setTimerSeconds(0);
    setIsTimerRunning(false);
    setIsTimerFinished(false);
  };

  const handleEventSelect = (eventName: string) => {
    setSelectedEvent(eventName);
    setCurrentPromptIndex(0);
    setShowEventSelector(false);
    handleResetTimer();
  };

  const handleNextPrompt = () => {
    if (currentPromptIndex < currentPrompts.length - 1) {
      setCurrentPromptIndex(currentPromptIndex + 1);
      handleResetTimer();
    }
  };

  const handlePreviousPrompt = () => {
    if (currentPromptIndex > 0) {
      setCurrentPromptIndex(currentPromptIndex - 1);
      handleResetTimer();
    }
  };

  const handleBackToEvents = () => {
    setShowEventSelector(true);
    setSelectedEvent('');
    setCurrentPromptIndex(0);
    handleResetTimer();
  };

  const formatTime = (minutes: number, seconds: number) => {
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  if (showEventSelector) {
    return (
      <PageLayout
        title="Roleplay Practice"
        subtitle="Select an FBLA event to practice roleplay scenarios"
      >
        <div className="roleplay-container">
          <StyledCard className="event-selector-card">
            <div className="selector-content">
              <div className="selector-header">
                <Target className="selector-icon" />
                <h2 className="selector-title">Choose Your Roleplay Event</h2>
              </div>
              
              <p className="selector-description">
                Practice your presentation and problem-solving skills with realistic business scenarios.
                Each event includes multiple sample prompts with guidance on how to approach them.
              </p>
              
              <Select value={selectedEvent} onValueChange={handleEventSelect}>
                <SelectTrigger className="event-select-trigger">
                  <SelectValue placeholder="Select a roleplay event" />
                </SelectTrigger>
                <SelectContent>
                  {events.map((event) => (
                    <SelectItem key={event} value={event}>
                      {event}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="selector-features">
                <div className="feature-item">
                  <Timer className="feature-icon" />
                  <span>10-minute practice timer</span>
                </div>
                <div className="feature-item">
                  <Lightbulb className="feature-icon" />
                  <span>Step-by-step guidance</span>
                </div>
                <div className="feature-item">
                  <Target className="feature-icon" />
                  <span>Multiple scenarios per event</span>
                </div>
              </div>
            </div>
          </StyledCard>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={`${selectedEvent} Roleplay`}
      subtitle={`Prompt ${currentPromptIndex + 1} of ${currentPrompts.length}`}
    >
      <div className="roleplay-container">
        {/* Header with timer and controls */}
        <div className="roleplay-header">
          <Button
            onClick={handleBackToEvents}
            variant="outline"
            className="back-button"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Button>
          
          <div className="timer-section">
            <div className={`timer-display ${isTimerFinished ? 'timer-finished' : ''}`}>
              <Timer className="timer-icon" />
              <span className="timer-text">
                {formatTime(timerMinutes, timerSeconds)}
              </span>
            </div>
            
            <div className="timer-controls">
              <Button
                onClick={handleStartTimer}
                disabled={isTimerRunning}
                size="sm"
                className="timer-button start-button"
              >
                <Play className="w-4 h-4" />
              </Button>
              
              <Button
                onClick={handleStopTimer}
                disabled={!isTimerRunning}
                size="sm"
                className="timer-button stop-button"
              >
                <Pause className="w-4 h-4" />
              </Button>
              
              <Button
                onClick={handleResetTimer}
                size="sm"
                className="timer-button reset-button"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="roleplay-content">
          {/* Prompt card */}
          <StyledCard className="prompt-card">
            <div className="prompt-header">
              <h3 className="prompt-title">Scenario</h3>
              <div className="prompt-counter">
                {currentPromptIndex + 1} / {currentPrompts.length}
              </div>
            </div>
            
            <div className="prompt-text">
              {currentPrompt.prompt}
            </div>
            
            <div className="guidance-section">
              <div className="guidance-header">
                <Lightbulb className="guidance-icon" />
                <h4 className="guidance-title">How to Approach This Prompt</h4>
              </div>
              
              <ul className="guidance-list">
                {currentPrompt.guidance.map((item, index) => (
                  <li key={index} className="guidance-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </StyledCard>

          {/* Navigation */}
          <div className="prompt-navigation">
            <Button
              onClick={handlePreviousPrompt}
              disabled={currentPromptIndex === 0}
              variant="outline"
              className="nav-button"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous Prompt
            </Button>
            
            <Button
              onClick={handleNextPrompt}
              disabled={currentPromptIndex === currentPrompts.length - 1}
              variant="outline"
              className="nav-button"
            >
              Next Prompt
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* TODO: Future features */}
        {/* 
        TODO: Firebase Integration
        - Store user practice history (event, prompt, date)
        - Track time spent on each prompt
        - Option to upload or record practice video/audio
        - Community prompt submissions
        - Personal progress tracking
        - Sharing practice sessions with mentors
        */}
      </div>
    </PageLayout>
  );
}