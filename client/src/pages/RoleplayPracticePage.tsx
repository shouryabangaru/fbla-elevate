import React, { useState } from 'react';
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
  CheckCircle,
  Target,
  BookOpen,
  Globe,
  Hotel,
  Trophy,
  Monitor,
  Network,
  Scale
} from 'lucide-react';
import './RoleplayPracticePage.css';

interface RoleplayScenario {
  id: string;
  eventName: string;
  scenarioNumber: number;
  prompt: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeLimit: number;
  points: number;
  category: string;
  completed: boolean;
}

interface RoleplayEvent {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  description: string;
  scenarioCount: number;
  category: string;
  color: string;
}

export default function RoleplayPracticePage() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  
  // Define the 12 official FBLA roleplay events
  const roleplayEvents: RoleplayEvent[] = [
    {
      id: 'banking-financial',
      name: 'Banking & Financial Systems',
      icon: DollarSign,
      description: 'Practice customer service scenarios in banking environments and financial product discussions.',
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

  // Create individual roleplay scenarios from the events
  const roleplayScenarios: RoleplayScenario[] = [
    // Banking & Financial Systems scenarios
    ...Array.from({ length: 15 }, (_, i) => ({
      id: `banking-financial-${i + 1}`,
      eventName: 'Banking & Financial Systems',
      scenarioNumber: i + 1,
      prompt: [
        "A customer is upset about overdraft fees on their account. They claim they weren't aware of the fees and want them removed. How do you handle this situation professionally?",
        "A business owner wants to apply for a loan but doesn't have all the required documentation. They're insisting on expedited processing. How do you manage their expectations?",
        "A customer wants to open a new account but is concerned about online banking security. Address their concerns while explaining the benefits.",
        "An elderly customer is confused about using the ATM and is holding up the line. How do you assist them while managing other customers?",
        "A customer received a credit card statement with charges they don't recognize. They're demanding immediate action. How do you handle this?",
        "A young customer wants to start investing but has very little knowledge about financial markets. How do you educate and guide them?",
        "A customer is trying to wire money internationally but doesn't understand the fees involved. Explain the process clearly.",
        "A business customer's payroll deposit is late, and their employees are calling. How do you resolve this urgent situation?",
        "A customer wants to close their account because they're unsatisfied with service. How do you address their concerns and potentially retain them?",
        "A customer is applying for a mortgage but their credit score is below the minimum requirement. How do you handle this sensitively?",
        "A customer received a debit card that doesn't work, and they need cash immediately. Provide alternative solutions.",
        "A customer is confused about the difference between checking and savings accounts. Explain the benefits of each.",
        "A customer wants to set up automatic bill payments but is concerned about overdrafts. Address their concerns and explain safeguards.",
        "A customer received a large inheritance and wants advice on how to manage it. What guidance do you provide?",
        "A customer is traveling abroad and needs to know about international banking services. What information do you provide?"
      ][i],
      icon: DollarSign,
      difficulty: i < 5 ? 'Beginner' : i < 10 ? 'Intermediate' : 'Advanced',
      timeLimit: 10,
      points: i < 5 ? 50 : i < 10 ? 75 : 100,
      category: 'Banking & Financial Systems',
      completed: false
    })),
    
    // Business Management scenarios
    ...Array.from({ length: 15 }, (_, i) => ({
      id: `business-management-${i + 1}`,
      eventName: 'Business Management',
      scenarioNumber: i + 1,
      prompt: [
        "Your team is consistently missing project deadlines. As a manager, how do you address this performance issue?",
        "Two department heads are in conflict over resource allocation. How do you mediate this dispute?",
        "You need to implement a new company policy that employees are resistant to. How do you manage this change?",
        "A key employee has submitted their resignation during a critical project. How do you handle this situation?",
        "Your department is over budget for the quarter. What steps do you take to address this financial challenge?",
        "An employee reports workplace harassment by a colleague. How do you handle this sensitive situation?",
        "You need to downsize your team due to budget cuts. How do you approach this difficult decision?",
        "A client is threatening to cancel a major contract due to service issues. How do you resolve this crisis?",
        "Your team's productivity has declined significantly. How do you identify and address the root causes?",
        "An employee is struggling with work-life balance and it's affecting their performance. How do you support them?",
        "You need to promote someone from your team, but two equally qualified candidates are available. How do you decide?",
        "A competitor is poaching your best employees with higher salaries. How do you retain your talent?",
        "Your company is expanding internationally. How do you prepare your team for this transition?",
        "A major supplier has failed to deliver on time, jeopardizing your project. How do you manage this crisis?",
        "You need to present a business case for additional funding to senior management. How do you prepare?"
      ][i],
      icon: Building2,
      difficulty: i < 5 ? 'Beginner' : i < 10 ? 'Intermediate' : 'Advanced',
      timeLimit: 10,
      points: i < 5 ? 50 : i < 10 ? 75 : 100,
      category: 'Business Management',
      completed: false
    })),
    
    // Customer Service scenarios
    ...Array.from({ length: 15 }, (_, i) => ({
      id: `customer-service-${i + 1}`,
      eventName: 'Customer Service',
      scenarioNumber: i + 1,
      prompt: [
        "A customer is extremely angry about a delayed delivery and is demanding a full refund. How do you handle this situation?",
        "A customer received a damaged product and wants immediate replacement, but you're out of stock. How do you address this?",
        "A customer is complaining about poor service from another department. How do you handle this interdepartmental issue?",
        "A customer is requesting a service that your company doesn't offer. How do you handle this professionally?",
        "A customer is comparing your prices to a competitor and demanding price matching. How do you respond?",
        "A customer has been waiting on hold for 20 minutes and is frustrated. How do you turn this situation around?",
        "A customer is asking for a supervisor because they're dissatisfied with your assistance. How do you handle this?",
        "A customer made a purchase but now wants to return it outside the return policy. How do you address this?",
        "A customer is having technical difficulties with your product and is becoming increasingly frustrated. How do you help?",
        "A customer is questioning your company's policies and calling them unreasonable. How do you respond?",
        "A customer wants to cancel their service but you believe they might benefit from staying. How do you approach this?",
        "A customer is upset about a billing error that occurred months ago. How do you resolve this situation?",
        "A customer is demanding to speak to the CEO about a minor issue. How do you handle this escalation?",
        "A customer is spreading negative reviews about your company online. How do you address this professionally?",
        "A customer has a language barrier and is having trouble communicating their issue. How do you assist them?"
      ][i],
      icon: HeadsetIcon,
      difficulty: i < 5 ? 'Beginner' : i < 10 ? 'Intermediate' : 'Advanced',
      timeLimit: 10,
      points: i < 5 ? 50 : i < 10 ? 75 : 100,
      category: 'Customer Service',
      completed: false
    })),
    
    // Entrepreneurship scenarios
    ...Array.from({ length: 15 }, (_, i) => ({
      id: `entrepreneurship-${i + 1}`,
      eventName: 'Entrepreneurship',
      scenarioNumber: i + 1,
      prompt: [
        "An investor is interested in your startup but wants to change your core business model. How do you respond?",
        "Your main competitor has launched a product very similar to yours. How do you differentiate and compete?",
        "You're running out of funding and need to make tough decisions about your team and operations. What's your approach?",
        "A potential business partner wants to join your venture but their values don't align with yours. How do you handle this?",
        "Your product launch failed to meet expectations. How do you analyze what went wrong and pivot?",
        "A large corporation wants to acquire your startup. How do you evaluate this opportunity?",
        "Your co-founder wants to take the company in a different direction than you envisioned. How do you resolve this conflict?",
        "You need to raise capital but investors are concerned about market size. How do you address their concerns?",
        "A key employee wants equity in the company in exchange for staying. How do you negotiate this?",
        "Your business is growing rapidly but you're struggling to maintain quality. How do you scale effectively?",
        "A customer wants to use your product for a purpose you didn't intend. How do you handle this opportunity?",
        "You're considering expanding internationally but have limited resources. How do you prioritize markets?",
        "A mentor is giving you advice that conflicts with your vision. How do you handle this relationship?",
        "Your startup is struggling to find product-market fit. How do you approach this challenge?",
        "You need to fire a founding team member who isn't performing. How do you handle this difficult situation?"
      ][i],
      icon: Lightbulb,
      difficulty: i < 5 ? 'Beginner' : i < 10 ? 'Intermediate' : 'Advanced',
      timeLimit: 10,
      points: i < 5 ? 50 : i < 10 ? 75 : 100,
      category: 'Entrepreneurship',
      completed: false
    })),
    
    // Hospitality & Event Management scenarios
    ...Array.from({ length: 15 }, (_, i) => ({
      id: `hospitality-event-${i + 1}`,
      eventName: 'Hospitality & Event Management',
      scenarioNumber: i + 1,
      prompt: [
        "A guest is complaining that their hotel room isn't ready despite having a confirmed reservation. How do you handle this?",
        "You're planning a corporate event for 500 people, but the venue just canceled last minute. What's your backup plan?",
        "A wedding client is demanding changes to the menu 3 days before the event. How do you manage this situation?",
        "The catering for your event has been delayed by 2 hours due to traffic. How do you handle the hungry guests?",
        "A VIP guest at your hotel is dissatisfied with the service and threatening to leave. How do you retain them?",
        "Your event's keynote speaker has canceled at the last minute. How do you salvage the program?",
        "A guest at your restaurant is claiming they found a hair in their food. How do you address this complaint?",
        "You're managing a conference but the AV equipment keeps malfunctioning. How do you keep the event running?",
        "A hotel guest is requesting a room change for the third time. How do you handle this diplomatically?",
        "Your outdoor event is threatened by severe weather. How do you adapt your plans?",
        "A client is demanding a refund for an event they claim didn't meet expectations. How do you handle this?",
        "You're short-staffed for a major event due to several call-outs. How do you manage with limited resources?",
        "A guest is intoxicated and becoming disruptive at your event. How do you handle this situation?",
        "Your event venue has a plumbing issue that's affecting restroom facilities. How do you manage this crisis?",
        "A corporate client wants to make major changes to their event contract. How do you negotiate these changes?"
      ][i],
      icon: Hotel,
      difficulty: i < 5 ? 'Beginner' : i < 10 ? 'Intermediate' : 'Advanced',
      timeLimit: 10,
      points: i < 5 ? 50 : i < 10 ? 75 : 100,
      category: 'Hospitality & Event Management',
      completed: false
    })),
    
    // International Business scenarios
    ...Array.from({ length: 15 }, (_, i) => ({
      id: `international-business-${i + 1}`,
      eventName: 'International Business',
      scenarioNumber: i + 1,
      prompt: [
        "You're negotiating a deal with a Japanese company, but cultural differences are causing misunderstandings. How do you proceed?",
        "Your company wants to enter the European market, but regulatory requirements are complex. How do you navigate this?",
        "A Chinese supplier is offering great prices but you're concerned about quality control. How do you address this?",
        "You're expanding to Latin America but need to adapt your marketing message. How do you ensure cultural sensitivity?",
        "Your international partner is requesting changes to your contract terms. How do you negotiate across cultures?",
        "Currency fluctuations are affecting your international profits. How do you manage this risk?",
        "A potential distributor in India wants exclusive rights to your product. How do you evaluate this opportunity?",
        "You're setting up operations in Germany but labor laws are different. How do you ensure compliance?",
        "Your Middle Eastern partner has different business practices than you're used to. How do you adapt?",
        "Trade tensions between countries are affecting your supply chain. How do you mitigate these risks?",
        "You need to hire local staff in Brazil but don't understand the hiring practices. How do you proceed?",
        "Your product needs to be modified for the African market. How do you approach this adaptation?",
        "You're attending a business meeting in South Korea. How do you prepare for cultural protocols?",
        "Your Australian partner wants to renegotiate terms due to local regulations. How do you handle this?",
        "You're considering a joint venture in Russia but political risks concern you. How do you evaluate this?"
      ][i],
      icon: Globe,
      difficulty: i < 5 ? 'Beginner' : i < 10 ? 'Intermediate' : 'Advanced',
      timeLimit: 10,
      points: i < 5 ? 50 : i < 10 ? 75 : 100,
      category: 'International Business',
      completed: false
    })),
    
    // Management Information Systems scenarios
    ...Array.from({ length: 15 }, (_, i) => ({
      id: `management-information-systems-${i + 1}`,
      eventName: 'Management Information Systems',
      scenarioNumber: i + 1,
      prompt: [
        "Your company's ERP system crashed during peak business hours. How do you manage this crisis and restore operations?",
        "The CEO wants to implement a new CRM system, but employees are resistant to change. How do you manage this transition?",
        "A department is requesting a custom software solution that would cost 50% of your IT budget. How do you evaluate this?",
        "Your company's data backup system failed, and you've lost a week's worth of data. How do you handle this situation?",
        "A cybersecurity breach has compromised customer data. How do you respond to this crisis?",
        "Your cloud provider is experiencing outages that are affecting your business operations. How do you manage this?",
        "Employees are bypassing IT security protocols to use unauthorized software. How do you address this?",
        "Your company is growing rapidly and the current IT infrastructure can't handle the load. How do you scale?",
        "A key system integration project is six months behind schedule. How do you get it back on track?",
        "Your IT budget has been cut by 30%, but you need to maintain service levels. How do you adapt?",
        "A major software vendor is discontinuing support for a system your company relies on. How do you plan for this?",
        "Employees are complaining that the new system is too complex and slowing down their work. How do you address this?",
        "Your company is considering moving to the cloud, but there are concerns about data security. How do you advise?",
        "A department head wants to purchase their own IT solutions without going through IT. How do you handle this?",
        "Your company's website was hacked and defaced. How do you respond to this security incident?"
      ][i],
      icon: Monitor,
      difficulty: i < 5 ? 'Beginner' : i < 10 ? 'Intermediate' : 'Advanced',
      timeLimit: 10,
      points: i < 5 ? 50 : i < 10 ? 75 : 100,
      category: 'Management Information Systems',
      completed: false
    })),
    
    // Marketing scenarios
    ...Array.from({ length: 15 }, (_, i) => ({
      id: `marketing-${i + 1}`,
      eventName: 'Marketing',
      scenarioNumber: i + 1,
      prompt: [
        "Your marketing campaign has generated negative feedback on social media. How do you respond and manage the situation?",
        "The CEO wants to target a new demographic, but your research shows it's not profitable. How do you present this to leadership?",
        "A competitor is copying your marketing strategies. How do you maintain your competitive advantage?",
        "Your marketing budget has been cut by 40%. How do you maintain effectiveness with fewer resources?",
        "A major influencer wants to partner with your brand, but their values are questionable. How do you decide?",
        "Your latest product launch campaign isn't generating the expected leads. How do you analyze and adjust?",
        "A customer posted a negative review that's affecting your brand reputation. How do you address this?",
        "Your team wants to use a trending but controversial topic in your marketing. How do you evaluate this risk?",
        "Sales team claims marketing leads are low quality. How do you address this interdepartmental conflict?",
        "A new social media platform is gaining popularity. How do you decide whether to invest in it?",
        "Your brand message isn't resonating with your target audience. How do you research and refine it?",
        "A marketing campaign performed well in one region but poorly in another. How do you analyze these differences?",
        "Your company is launching in a new market with different cultural norms. How do you adapt your marketing?",
        "A partnership opportunity could expand your reach but might dilute your brand. How do you evaluate this?",
        "Your marketing automation system is generating spam complaints. How do you fix this while maintaining outreach?"
      ][i],
      icon: TrendingUp,
      difficulty: i < 5 ? 'Beginner' : i < 10 ? 'Intermediate' : 'Advanced',
      timeLimit: 10,
      points: i < 5 ? 50 : i < 10 ? 75 : 100,
      category: 'Marketing',
      completed: false
    })),
    
    // Network Design scenarios
    ...Array.from({ length: 15 }, (_, i) => ({
      id: `network-design-${i + 1}`,
      eventName: 'Network Design',
      scenarioNumber: i + 1,
      prompt: [
        "Your company's network is experiencing frequent outages. How do you diagnose and solve this problem?",
        "A new office location needs network infrastructure, but budget is limited. How do you design an efficient solution?",
        "Your network security has been compromised. How do you secure the network while maintaining operations?",
        "Employees are complaining about slow internet speeds. How do you improve network performance?",
        "Your company is implementing a bring-your-own-device policy. How do you adapt the network to handle this?",
        "A critical network component has failed during business hours. How do you restore service quickly?",
        "Your company needs to connect multiple office locations. How do you design a WAN solution?",
        "The network can't handle the increased traffic from remote workers. How do you scale the infrastructure?",
        "A department wants to isolate their network traffic for security reasons. How do you implement this?",
        "Your wireless network is experiencing interference issues. How do you troubleshoot and resolve this?",
        "Your company is moving to a new building. How do you plan and implement the network migration?",
        "A vendor is proposing a network upgrade that costs twice your budget. How do you evaluate alternatives?",
        "Your network monitoring shows unusual traffic patterns. How do you investigate and respond?",
        "A natural disaster has damaged your network infrastructure. How do you implement disaster recovery?",
        "Your company needs to comply with new data regulations. How do you modify the network architecture?"
      ][i],
      icon: Network,
      difficulty: i < 5 ? 'Beginner' : i < 10 ? 'Intermediate' : 'Advanced',
      timeLimit: 10,
      points: i < 5 ? 50 : i < 10 ? 75 : 100,
      category: 'Network Design',
      completed: false
    })),
    
    // Parliamentary Procedure scenarios
    ...Array.from({ length: 15 }, (_, i) => ({
      id: `parliamentary-procedure-${i + 1}`,
      eventName: 'Parliamentary Procedure',
      scenarioNumber: i + 1,
      prompt: [
        "During a board meeting, a member makes a motion that's clearly out of order. How do you handle this situation?",
        "A heated debate is getting personal and disrupting the meeting. How do you restore order and focus?",
        "A member is trying to speak without being recognized by the chair. How do you manage this breach of protocol?",
        "The group needs to make a decision quickly, but debate is dragging on. How do you facilitate timely resolution?",
        "A member challenges the chair's ruling on a procedural matter. How do you handle this challenge?",
        "The meeting is running over time, but important business remains. How do you manage the agenda?",
        "A member makes a motion to amend a motion that's already been amended. How do you handle this?",
        "Someone calls 'Question!' to end debate, but not everyone has had a chance to speak. How do you proceed?",
        "A member arrives late and wants to revisit a decision already made. How do you handle this request?",
        "The group is deadlocked on a vote. How do you break the tie and move forward?",
        "A member is repeatedly interrupting others during debate. How do you address this behavior?",
        "Someone makes a motion to table a discussion indefinitely. How do you handle this procedural move?",
        "A member questions whether there's a quorum present. How do you address this concern?",
        "The meeting lacks focus and is covering too many topics. How do you bring structure to the discussion?",
        "A member wants to reconsider a vote from the previous meeting. How do you handle this request?"
      ][i],
      icon: Scale,
      difficulty: i < 5 ? 'Beginner' : i < 10 ? 'Intermediate' : 'Advanced',
      timeLimit: 10,
      points: i < 5 ? 50 : i < 10 ? 75 : 100,
      category: 'Parliamentary Procedure',
      completed: false
    })),
    
    // Sports & Entertainment Management scenarios
    ...Array.from({ length: 15 }, (_, i) => ({
      id: `sports-entertainment-${i + 1}`,
      eventName: 'Sports & Entertainment Management',
      scenarioNumber: i + 1,
      prompt: [
        "Your star athlete is threatening to quit mid-season over contract disputes. How do you handle this situation?",
        "A concert venue has safety concerns that might force you to cancel a sold-out show. How do you manage this crisis?",
        "Your sports team's sponsor wants to pull out after a player's controversial social media post. How do you address this?",
        "A major entertainment event you're managing is receiving negative press coverage. How do you handle the PR crisis?",
        "Your athlete client wants to switch agents right before a major contract negotiation. How do you respond?",
        "A venue is demanding higher fees for your event just weeks before the show. How do you negotiate?",
        "Your entertainment client is struggling with substance abuse issues. How do you provide support while protecting their career?",
        "A sports team's performance is declining and fans are demanding changes. How do you manage stakeholder expectations?",
        "Your concert tour is facing visa issues for international shows. How do you resolve this quickly?",
        "A celebrity client is involved in a scandal that's affecting their brand partnerships. How do you manage this?",
        "Your sports facility needs major renovations but the team has a full schedule. How do you plan this?",
        "A competitor is trying to poach your entertainment clients with better offers. How do you retain them?",
        "Your event is competing with a major sports playoff game on the same night. How do you maximize attendance?",
        "A key performer is injured and can't participate in your event. How do you adapt your program?",
        "Your sports organization is facing budget cuts that will affect programs. How do you prioritize and communicate changes?"
      ][i],
      icon: Trophy,
      difficulty: i < 5 ? 'Beginner' : i < 10 ? 'Intermediate' : 'Advanced',
      timeLimit: 10,
      points: i < 5 ? 50 : i < 10 ? 75 : 100,
      category: 'Sports & Entertainment Management',
      completed: false
    })),
    
    // Technology Support & Services scenarios
    ...Array.from({ length: 15 }, (_, i) => ({
      id: `technology-support-${i + 1}`,
      eventName: 'Technology Support & Services',
      scenarioNumber: i + 1,
      prompt: [
        "A user calls saying their computer won't start, and they have an important presentation in an hour. How do you help?",
        "A department's server has crashed and they can't access their files. How do you restore service quickly?",
        "A user accidentally deleted important files and needs them recovered immediately. How do you handle this?",
        "Multiple users are reporting slow internet speeds. How do you diagnose and resolve this issue?",
        "A user's email has been compromised and is sending spam to clients. How do you address this security breach?",
        "The printer network is down and employees can't print important documents. How do you restore printing services?",
        "A user is frustrated with a software application that keeps crashing. How do you troubleshoot and assist them?",
        "A new employee needs IT setup but all standard equipment is out of stock. How do you provide alternative solutions?",
        "A user claims their computer has a virus but your scans show it's clean. How do you handle this situation?",
        "The phone system is experiencing issues and calls are being dropped. How do you resolve this communication problem?",
        "A user wants to install unauthorized software for their job. How do you handle this request?",
        "A department head is demanding immediate IT support but you have other urgent tickets. How do you prioritize?",
        "A user's computer is running extremely slowly and they're blaming IT. How do you diagnose and fix this?",
        "A user lost their password and is locked out of all systems. How do you verify their identity and restore access?",
        "A critical business application is down company-wide. How do you manage this crisis and communicate with users?"
      ][i],
      icon: Users,
      difficulty: i < 5 ? 'Beginner' : i < 10 ? 'Intermediate' : 'Advanced',
      timeLimit: 10,
      points: i < 5 ? 50 : i < 10 ? 75 : 100,
      category: 'Technology Support & Services',
      completed: false
    }))
  ];

  const handleEventClick = (eventId: string) => {
    console.log('Event clicked:', eventId);
    setSelectedEvent(eventId);
  };

  const handleBackToEvents = () => {
    setSelectedEvent(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  if (selectedEvent) {
    const event = roleplayEvents.find(e => e.id === selectedEvent);
    const scenarios = roleplayScenarios.filter(s => s.eventName === event?.category);
    
    return (
      <div className="scenario-view">
        <div className="scenario-header">
          <button 
            onClick={handleBackToEvents}
            className="back-button"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </button>
          
          <div className="scenario-event-info">
            <div className="scenario-event-icon">
              {event?.icon && <event.icon />}
            </div>
            <div className="scenario-event-details">
              <h2>{event?.name}</h2>
              <p>{event?.description}</p>
            </div>
          </div>
        </div>

        <div className="scenarios-grid">
          {scenarios.map((scenario) => (
            <div key={scenario.id} className="scenario-card">
              <div className="scenario-header-info">
                <div className="scenario-number">
                  {scenario.scenarioNumber}
                </div>
                <div className={`scenario-difficulty ${scenario.difficulty.toLowerCase()}`}>
                  {scenario.difficulty}
                </div>
                <div className="scenario-time">
                  <Clock className="w-4 h-4" />
                  {scenario.timeLimit}min
                </div>
              </div>
              
              <p className="scenario-prompt">
                {scenario.prompt}
              </p>
              
              <div className="scenario-footer">
                <div className="scenario-points">
                  <Target className="w-4 h-4" />
                  {scenario.points} points
                </div>
                <button className="scenario-start-btn">
                  <PlayCircle className="w-4 h-4" />
                  Start
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