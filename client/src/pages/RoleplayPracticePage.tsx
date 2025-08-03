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
      const bankingScenarios = [
        {
          background: "You are a customer service representative at a local bank that specializes in helping young adults become financially independent. Today, a high school student named Maya has come in to open her first bank account and needs your guidance.",
          scenario: "Maya recently got a part-time job at a grocery store and wants to safely store her earnings. She plans to occasionally use a debit card and also save for college, but she's unsure whether a savings account, a checking account, or both would be best.",
          objectives: [
            "Explain the primary purpose of checking vs. savings accounts.",
            "Discuss interest rates, fees, and accessibility for both types.",
            "Recommend the most appropriate account (or combination).",
            "Provide tips on managing money digitally and using online banking tools.",
            "Share how Maya can set financial goals using bank services."
          ]
        },
        {
          background: "You are a junior banker assisting new customers with credit education. A college-bound client named Leo has visited the bank to apply for his very first credit card and wants help understanding how credit works before applying.",
          scenario: "Leo is nervous about getting into debt but knows that building credit is important. He doesn't understand how credit cards work, what a credit score is, or how interest accumulates, and wants your advice on how to use credit responsibly.",
          objectives: [
            "Explain what a credit card is and how it differs from a debit card.",
            "Describe how interest is charged and how to avoid fees.",
            "Define key terms: credit limit, minimum payment, APR.",
            "Discuss how credit cards affect credit scores.",
            "Offer tips for building strong credit as a young adult."
          ]
        },
        {
          background: "You are a digital banking assistant trained to help customers use online financial tools. A new client, Mr. Thompson, recently opened a checking account and is interested in managing his finances digitally but has limited experience with technology.",
          scenario: "Mr. Thompson has traditionally done all of his banking in person. He wants to know what features online and mobile banking offer, whether it's safe to use, and how he can get started without feeling overwhelmed.",
          objectives: [
            "Explain how to log in and navigate the online/mobile banking portal.",
            "Describe features like mobile check deposit, transfers, and bill pay.",
            "Reassure him about cybersecurity measures and customer protection.",
            "Walk through how to set up alerts and automatic payments.",
            "Recommend bank support options if he needs future help."
          ]
        },
        {
          background: "You are a bank associate working in the savings and investments department. Mrs. Garcia, a long-time customer, recently inherited $5,000 and is looking for a safe, interest-earning option that's more effective than a regular savings account.",
          scenario: "Mrs. Garcia heard about certificates of deposit (CDs) but doesn't understand how they work or how they differ from savings accounts. She is interested in potentially opening a CD and wants to know her options.",
          objectives: [
            "Explain what a CD is and how it works.",
            "Compare CD interest rates and terms to savings accounts.",
            "Discuss early withdrawal penalties and fixed terms.",
            "Help Mrs. Garcia choose the best CD option for her needs.",
            "Recommend how she can use CDs as part of a broader savings plan."
          ]
        },
        {
          background: "You are a banker in the new accounts department. Amir, a college student who just got a job at a local restaurant, recently opened a checking account and now wants to know how to set up direct deposit for his paychecks.",
          scenario: "Amir has never used direct deposit before and isn't sure how it works. He also wants to make sure his money is deposited quickly, safely, and with no hidden fees, and would like you to walk him through the entire process.",
          objectives: [
            "Explain what direct deposit is and how it works.",
            "Walk Amir through the setup process using his employer's form.",
            "Describe how quickly funds are deposited and available.",
            "Assure him that there are no fees or risks with direct deposit.",
            "Show him how to confirm a deposit using online banking."
          ]
        },
        {
          background: "You are a financial consultant at a local bank. A new client, John, owns a small retail store and is planning to expand his business. John is unsure whether to apply for a business loan or open a line of credit to finance the expansion and manage daily cash flow. Additionally, John wants to streamline payroll processes for his eight employees.",
          scenario: "Your role is to meet with John, gather key financial information (e.g., current revenue, existing debts, and financial goals), and explain the pros and cons of a business loan versus a line of credit. You also need to provide information on payroll services offered by the bank and suggest next steps, including which bank departments (e.g., loan officer, payroll specialist) John should consult for further assistance.",
          objectives: [
            "Compare the benefits and drawbacks of a business loan vs. line of credit.",
            "Recommend a course of action based on the client's financial situation.",
            "Describe bank payroll solutions and how they support small businesses.",
            "Demonstrate effective techniques for gathering and managing client information.",
            "Refer the client to appropriate bank professionals for next steps."
          ]
        },
        {
          background: "You are a financial advisor at a regional bank. Your long-time clients, Maria and Leo, are a couple in their early 40s who have recently received a significant raise at work. Their annual income has increased from $85,000 to $130,000, and they now have more money to invest than before.",
          scenario: "Maria and Leo previously invested small amounts in mutual funds and certificates of deposit but are now looking for higher-return investment options with moderate risk. They are unsure whether they should continue with mutual funds, explore ETFs, or start purchasing individual stocks and bonds. They are also curious about the impact of taxes on their investment gains.",
          objectives: [
            "Explain the differences between mutual funds, ETFs, stocks, and bonds.",
            "Recommend investment options that match the couple's risk tolerance and goals.",
            "Define terms like diversification, rate of return, and risk management.",
            "Discuss basic tax implications of investment income.",
            "Suggest next steps, including speaking with a licensed investment advisor."
          ]
        },
        {
          background: "You are a loan specialist at Northwind Community Bank. A new client, Talia, has been pre-approved for a home loan and is considering whether to move forward with a fixed-rate or adjustable-rate mortgage.",
          scenario: "Talia has questions about which mortgage type is best for her. She expects to live in her new home for 5–10 years and is also planning to grow her small business in the next few years, which may impact her income. She wants to understand the risks, benefits, and long-term costs of each loan option before making a decision.",
          objectives: [
            "Compare fixed-rate and adjustable-rate mortgages in simple terms.",
            "Assess the client's financial goals and stability to recommend an option.",
            "Discuss how interest rates and loan terms affect monthly payments.",
            "Provide guidance on how mortgage choices impact credit and budgeting.",
            "Refer the client to the appropriate mortgage underwriting team if needed."
          ]
        },
        {
          background: "You are a financial planning associate at a full-service bank. A client, Darren, is 52 years old and recently realized he may not be as prepared for retirement as he hoped.",
          scenario: "Darren has approximately $80,000 saved in a traditional 401(k) and no other investments. He plans to retire around age 65. He is unsure whether he should increase contributions to his 401(k), open an IRA, or explore other investment vehicles. Darren is also interested in understanding how inflation and taxes might affect his retirement income.",
          objectives: [
            "Explain the differences between traditional and Roth IRAs and how they complement a 401(k).",
            "Discuss how to increase retirement savings in the final working years.",
            "Identify potential risks like inflation and taxation on retirement income.",
            "Recommend a savings and investment strategy based on Darren's goals.",
            "Offer follow-up options such as financial planning seminars or investment consultations."
          ]
        },
        {
          background: "You are a digital banking representative at a community bank. Your client, Mr. Chen, owns a growing online retail business and wants to move his financial processes to a more efficient, tech-driven system.",
          scenario: "Mr. Chen is unfamiliar with online banking tools for businesses. He wants to automate bill payments, manage payroll digitally, and track expenses. He also worries about cybersecurity and data privacy. Your role is to help him transition into digital banking safely and efficiently.",
          objectives: [
            "Explain the features of the bank's online business platform (bill pay, statements, transfers, alerts).",
            "Recommend digital tools that improve efficiency and reduce manual errors.",
            "Address the client's concerns about cybersecurity and data protection.",
            "Outline the onboarding process and support services provided.",
            "Recommend scheduling a training session with a digital banking specialist."
          ]
        },
        {
          background: "You are a commercial banking officer at a regional bank. A client, Ms. Patel, owns a successful chain of fitness centers and is considering purchasing a $1.2 million property for a new location.",
          scenario: "Ms. Patel is unsure whether she should apply for a traditional commercial mortgage or consider a Small Business Administration (SBA) loan. She has strong business revenue but limited liquidity. Your job is to help her understand the risks, financing structures, and eligibility requirements for each option.",
          objectives: [
            "Compare key features of SBA loans vs. traditional commercial mortgages.",
            "Analyze the impact of interest rates, collateral, and terms on long-term affordability.",
            "Discuss how debt service coverage ratio (DSCR) affects loan approval.",
            "Evaluate how this decision fits into Ms. Patel's long-term growth plan.",
            "Recommend which bank specialists or departments to consult next."
          ]
        },
        {
          background: "You are a senior loan underwriter at a mid-sized bank. A client, Devonte, recently applied for a $50,000 personal loan to fund a startup. However, he has a limited credit history, inconsistent income, and a high debt-to-income ratio.",
          scenario: "The bank's standard credit evaluation process flags the application as high risk. Devonte insists he can repay the loan but has little formal documentation. You must determine whether to recommend approval, denial, or offer an alternative product.",
          objectives: [
            "Review key credit evaluation factors: credit score, DTI ratio, collateral, and income verification.",
            "Explain the bank's risk management approach for unsecured loans.",
            "Propose alternative lending products (e.g., secured loan, cosigner option).",
            "Discuss the legal and ethical responsibilities of lending decisions.",
            "Recommend next steps for Devonte based on the assessment."
          ]
        },
        {
          background: "You are the operations lead at a commercial bank. A long-standing business client recently experienced an attempted wire fraud incident that was caught just in time.",
          scenario: "The client is concerned about the security of future wire transfers and wants to implement stronger internal controls. You must guide them through risk mitigation strategies while maintaining efficient operations.",
          objectives: [
            "Explain how wire fraud typically occurs (e.g., phishing, social engineering).",
            "Recommend fraud prevention controls (dual authorization, callbacks, verification tools).",
            "Review the bank's existing fraud liability policy and customer obligations.",
            "Discuss how to balance security with convenience in business banking.",
            "Offer a plan for ongoing employee training and monitoring."
          ]
        },
        {
          background: "You are a compliance officer at a national bank. A newly hired banker has questions about regulatory obligations related to Know Your Customer (KYC), Anti-Money Laundering (AML), and data privacy.",
          scenario: "You've been asked to lead a quick training session to ensure the employee understands key compliance policies and how to apply them in daily operations.",
          objectives: [
            "Explain the purpose and key steps of KYC and AML procedures.",
            "Describe red flags that could indicate suspicious activity.",
            "Review customer data protection policies and legal obligations.",
            "Emphasize the importance of regulatory compliance in client interactions.",
            "Provide actionable guidance for reporting and escalation procedures."
          ]
        },
        {
          background: "You are a financial analyst at a regional bank. The CFO has asked you to prepare a summary of the bank's quarterly performance for the executive team.",
          scenario: "You need to review the bank's income statement and balance sheet to explain how key financial metrics like net interest margin (NIM), return on equity (ROE), and loan loss provisions compare to last quarter. The CFO also wants recommendations for improving profitability without taking on excessive risk.",
          objectives: [
            "Interpret financial ratios such as NIM, ROE, and the efficiency ratio.",
            "Explain how loan performance and interest rate changes impact earnings.",
            "Identify any red flags or areas of concern from the financial statements.",
            "Propose 1–2 strategies to improve short-term profitability.",
            "Recommend how to communicate these findings clearly to non-financial staff."
          ]
        }
      ];

      bankingScenarios.forEach((scenarioData, i) => {
        scenarios.push({
          id: `banking-financial-${i + 1}`,
          eventName: bankingEvent.name,
          scenarioNumber: i + 1,
          difficulty: i < 5 ? 'Beginner' : i < 10 ? 'Intermediate' : 'Advanced',
          duration: 20,
          points: 50,
          background: scenarioData.background,
          scenario: scenarioData.scenario,
          objectives: scenarioData.objectives,
          icon: DollarSign
        });
      });
    }

    // Get other events from database - create structured data for each
    const businessEvent = getEventDetails('business-management');
    if (businessEvent) {
      businessEvent.prompts.forEach((prompt: string, i: number) => {
        // Extract meaningful background context and create distinct sections
        const words = prompt.split(' ');
        const background = `You are facing a ${i < 5 ? 'basic' : i < 10 ? 'intermediate' : 'complex'} business management challenge that requires leadership and strategic thinking.`;
        const scenario = prompt;
        const objectives = [
          'Demonstrate effective leadership and communication skills',
          'Analyze the situation and identify key issues',
          'Develop practical solutions and implementation strategies',
          'Consider impact on team morale and business operations'
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
        const background = `You are working in a customer service role where excellent service and problem-solving skills are essential for ${i < 5 ? 'routine' : i < 10 ? 'challenging' : 'complex'} customer interactions.`;
        const scenario = prompt;
        const objectives = [
          'Listen actively and empathize with the customer\'s concerns',
          'Provide professional and helpful customer service',
          'Find effective solutions within company policies',
          'Maintain composure and positive attitude throughout the interaction'
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
        const background = `You are an entrepreneur facing a ${i < 5 ? 'common startup' : i < 10 ? 'significant business' : 'critical strategic'} challenge that requires innovative thinking and decisive action.`;
        const scenario = prompt;
        const objectives = [
          'Analyze the business situation and potential opportunities',
          'Develop creative and practical solutions',
          'Consider financial implications and resource requirements',
          'Present clear recommendations with supporting rationale'
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