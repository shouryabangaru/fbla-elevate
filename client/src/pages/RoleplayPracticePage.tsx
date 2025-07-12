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
  Brain,
  Briefcase,
  Mic,
  MessageCircle,
  UserCheck,
  Globe,
  Hotel,
  ShoppingCart,
  Trophy,
  Scale,
  Shield
} from 'lucide-react';
import { PageLayout } from '@/components/shared/PageLayout';
import { StyledCard } from '@/components/shared/StyledCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  // Define all FBLA roleplay events
  const roleplayEvents: RoleplayEvent[] = [
    {
      id: 'critical-thinking',
      name: 'Critical Thinking',
      icon: Brain,
      description: 'Role play scenarios requiring on-the-spot problem solving and analytical thinking in business situations.',
      scenarioCount: 15,
      category: 'Critical Thinking',
      color: 'from-purple-500 to-violet-600'
    },
    {
      id: 'client-service',
      name: 'Client Service',
      icon: HeadsetIcon,
      description: 'Interactive simulation focusing on customer service scenarios and client relationship management.',
      scenarioCount: 15,
      category: 'Client Service',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'job-interview',
      name: 'Job Interview',
      icon: UserCheck,
      description: 'Roleplay interview scenarios to practice professional communication and presentation skills.',
      scenarioCount: 15,
      category: 'Job Interview',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'sales-presentation',
      name: 'Sales Presentation',
      icon: TrendingUp,
      description: 'Business sales scenario presentations with persuasive communication and product knowledge.',
      scenarioCount: 15,
      category: 'Sales Presentation',
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 'impromptu-speaking',
      name: 'Impromptu Speaking',
      icon: Mic,
      description: 'Extemporaneous business topic presentations requiring quick thinking and articulation.',
      scenarioCount: 15,
      category: 'Impromptu Speaking',
      color: 'from-pink-500 to-rose-600'
    },
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
      id: 'entrepreneurship',
      name: 'Entrepreneurship',
      icon: Lightbulb,
      description: 'Navigate startup challenges, investor relations, and entrepreneurial decision-making scenarios.',
      scenarioCount: 15,
      category: 'Entrepreneurship',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      id: 'marketing',
      name: 'Marketing',
      icon: MessageCircle,
      description: 'Marketing strategy challenges, campaign management, and brand positioning scenarios.',
      scenarioCount: 15,
      category: 'Marketing',
      color: 'from-pink-600 to-rose-700'
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
      id: 'hospitality-event',
      name: 'Hospitality & Event Management',
      icon: Hotel,
      description: 'Hotel, restaurant, and event planning scenarios with customer service focus.',
      scenarioCount: 15,
      category: 'Hospitality & Event Management',
      color: 'from-teal-500 to-cyan-600'
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
      id: 'business-law',
      name: 'Business Law',
      icon: Scale,
      description: 'Legal scenarios in business contexts, contract negotiations, and compliance situations.',
      scenarioCount: 15,
      category: 'Business Law',
      color: 'from-gray-600 to-slate-700'
    },
    {
      id: 'business-ethics',
      name: 'Business Ethics',
      icon: Shield,
      description: 'Ethical dilemmas in business, moral decision-making, and professional integrity scenarios.',
      scenarioCount: 15,
      category: 'Business Ethics',
      color: 'from-emerald-600 to-teal-700'
    },
    {
      id: 'human-resources',
      name: 'Human Resource Management',
      icon: Users,
      description: 'Employee relations, hiring scenarios, workplace conflict resolution, and HR policy situations.',
      scenarioCount: 15,
      category: 'Human Resource Management',
      color: 'from-violet-500 to-purple-600'
    },
    {
      id: 'retail-merchandising',
      name: 'Retail Merchandising',
      icon: ShoppingCart,
      description: 'Retail scenarios, customer service in stores, inventory management, and sales situations.',
      scenarioCount: 15,
      category: 'Retail Merchandising',
      color: 'from-amber-500 to-yellow-600'
    }
  ];

  // Create individual roleplay scenarios from the events
  const roleplayScenarios: RoleplayScenario[] = [
    // Critical Thinking scenarios
    ...Array.from({ length: 15 }, (_, i) => ({
      id: `critical-thinking-${i + 1}`,
      eventName: 'Critical Thinking',
      scenarioNumber: i + 1,
      prompt: [
        "Your company's main supplier just announced they're going out of business next month. You have a major client launch in 6 weeks. What's your plan?",
        "A competitor is spreading false rumors about your product quality on social media. How do you address this crisis?",
        "Your team discovered a security vulnerability in your software after it's been shipped to 10,000 customers. What's your response?",
        "A key employee just quit during your busiest season, and they took proprietary information with them. How do you handle this?",
        "Your company's biggest client wants to renegotiate their contract terms significantly. How do you approach this?",
        "A natural disaster has damaged your main warehouse. You have orders backed up for two weeks. What's your strategy?",
        "Your product launch was scheduled for next week, but testing revealed a critical flaw. How do you proceed?",
        "A major investor wants to pull out of your funding round due to market conditions. How do you respond?",
        "Your company is being sued by a former employee for discrimination. How do you manage this situation?",
        "A viral social media post is calling for a boycott of your company over an environmental issue. What's your response?",
        "Your main competitor just released a product identical to yours at half the price. How do you compete?",
        "A data breach has exposed customer information. You have one hour before the story breaks. What do you do?",
        "Your company's CEO just resigned unexpectedly, and the board is divided on succession. How do you maintain stability?",
        "A regulatory change will make your main product illegal to sell next year. How do you adapt?",
        "Your company culture survey reveals widespread employee dissatisfaction. How do you address this crisis?"
      ][i],
      icon: Brain,
      difficulty: i < 5 ? 'Beginner' : i < 10 ? 'Intermediate' : 'Advanced',
      timeLimit: 10,
      points: i < 5 ? 50 : i < 10 ? 75 : 100,
      category: 'Critical Thinking',
      completed: false
    })),
    
    // Client Service scenarios
    ...Array.from({ length: 15 }, (_, i) => ({
      id: `client-service-${i + 1}`,
      eventName: 'Client Service',
      scenarioNumber: i + 1,
      prompt: [
        "A longtime client is threatening to cancel their contract because of a recent service disruption. How do you retain them?",
        "A client is asking for services that are outside your company's expertise. How do you handle this professionally?",
        "A client has complained about poor communication from your team. How do you address their concerns?",
        "A client wants a full refund for a project that's 80% complete. How do you negotiate this situation?",
        "A client is comparing your services to a competitor's and demanding price matching. How do you respond?",
        "A client deadline was missed due to internal issues. How do you manage this situation and rebuild trust?",
        "A client is requesting modifications to their contract that would be unprofitable for your company. How do you handle this?",
        "A client is dissatisfied with the quality of work delivered. How do you address their concerns?",
        "A client wants to expand their project scope but doesn't want to pay additional fees. How do you approach this?",
        "A client is being unreasonable with their demands and treating your staff poorly. How do you manage this?",
        "A client has gone silent and stopped responding to your communications. How do you re-engage them?",
        "A client is asking for confidential information about another client. How do you handle this request?",
        "A client wants to terminate their contract early without paying penalties. How do you negotiate?",
        "A client is questioning your expertise and competence. How do you rebuild their confidence?",
        "A client has a complaint about one of your team members. How do you address this professionally?"
      ][i],
      icon: HeadsetIcon,
      difficulty: i < 5 ? 'Beginner' : i < 10 ? 'Intermediate' : 'Advanced',
      timeLimit: 10,
      points: i < 5 ? 50 : i < 10 ? 75 : 100,
      category: 'Client Service',
      completed: false
    })),
    
    // Job Interview scenarios
    ...Array.from({ length: 15 }, (_, i) => ({
      id: `job-interview-${i + 1}`,
      eventName: 'Job Interview',
      scenarioNumber: i + 1,
      prompt: [
        "You're interviewing for a management position. The interviewer asks about a time you had to fire someone. How do you respond?",
        "The interviewer asks why you left your last job, but you were actually fired. How do you handle this question?",
        "You're asked to describe your biggest weakness. How do you turn this into a positive?",
        "The interviewer asks about a gap in your employment history. How do you explain this professionally?",
        "You're asked to describe a time you failed at something. How do you frame this response?",
        "The interviewer asks about your salary expectations, but you're not sure what's appropriate. How do you respond?",
        "You're asked to describe a conflict with a coworker and how you resolved it. What's your approach?",
        "The interviewer asks why you want to work for this company specifically. How do you demonstrate your research?",
        "You're asked to describe your leadership style. How do you showcase your management abilities?",
        "The interviewer asks about your career goals in five years. How do you align this with the company's needs?",
        "You're asked to describe a time you had to work with a difficult person. How do you handle this diplomatically?",
        "The interviewer asks about your experience with a skill you don't have. How do you address this honestly?",
        "You're asked to describe a time you went above and beyond for a customer or client. What example do you use?",
        "The interviewer asks about your experience managing budgets or financial responsibilities. How do you respond?",
        "You're asked to describe how you handle stress and pressure. What examples do you provide?"
      ][i],
      icon: UserCheck,
      difficulty: i < 5 ? 'Beginner' : i < 10 ? 'Intermediate' : 'Advanced',
      timeLimit: 10,
      points: i < 5 ? 50 : i < 10 ? 75 : 100,
      category: 'Job Interview',
      completed: false
    })),
    
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
      id: `business-${i + 1}`,
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
      id: `customer-${i + 1}`,
      eventName: 'Customer Service',
      scenarioNumber: i + 1,
      prompt: [
        "A customer received a damaged product and is extremely angry. They're using inappropriate language. How do you handle this situation?",
        "A customer wants to return an item without a receipt, but company policy requires one. How do you resolve this?",
        "A customer is complaining about a service they received from a colleague. How do you address their concerns?",
        "A customer is asking for a refund on a non-refundable item. They claim they weren't informed of the policy. How do you respond?",
        "A customer has been waiting on hold for 30 minutes and is very frustrated when you answer. How do you start the conversation?",
        "A customer's order was shipped to the wrong address. They need the item urgently for an event. How do you help?",
        "A customer is comparing your prices to a competitor's and demanding a price match. How do you handle this?",
        "A customer received poor service and wants to speak to a manager, but none are available. How do you assist?",
        "A customer is elderly and having trouble understanding how to use your online service. How do you help them?",
        "A customer is trying to cancel their subscription but you notice they haven't used key features. How do you approach this?",
        "A customer received an incorrect bill and is concerned about overcharges. How do you resolve this?",
        "A customer wants to expedite their order but standard shipping has already been processed. What options do you provide?",
        "A customer is frustrated because they've been transferred multiple times without resolution. How do you help?",
        "A customer is asking for a service that your company doesn't provide. How do you respond helpfully?",
        "A customer wants to file a complaint about your company's environmental practices. How do you handle this?"
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
    
    // Sales Presentation scenarios
    ...Array.from({ length: 15 }, (_, i) => ({
      id: `sales-presentation-${i + 1}`,
      eventName: 'Sales Presentation',
      scenarioNumber: i + 1,
      prompt: [
        "Present a new software solution to a skeptical IT director who's been burned by previous vendors. How do you build trust?",
        "You're presenting to a budget-conscious CFO who questions the ROI of your proposal. How do you demonstrate value?",
        "Present your marketing services to a CEO who thinks they can do everything in-house. How do you show your worth?",
        "You're pitching to a procurement team that's focused only on price. How do you shift focus to value?",
        "Present your consulting services to a company that's had bad experiences with consultants. How do you differentiate?",
        "You're presenting to a diverse committee with different priorities. How do you address everyone's concerns?",
        "Present your product to a company that's already decided on a competitor. How do you change their mind?",
        "You're pitching to a startup with limited budget but high growth potential. How do you structure your proposal?",
        "Present your services to a traditional company that's resistant to change. How do you overcome objections?",
        "You're presenting to a technical team that's focused on specifications. How do you also show business benefits?",
        "Present your solution to a company that's been using the same vendor for years. How do you create urgency for change?",
        "You're pitching to a company in crisis that needs immediate results. How do you show quick wins?",
        "Present your premium service to a company that's currently using a budget solution. How do you justify the upgrade?",
        "You're presenting to a global company with diverse market needs. How do you show scalability?",
        "Present your innovative solution to a conservative industry leader. How do you minimize perceived risk?"
      ][i],
      icon: TrendingUp,
      difficulty: i < 5 ? 'Beginner' : i < 10 ? 'Intermediate' : 'Advanced',
      timeLimit: 10,
      points: i < 5 ? 50 : i < 10 ? 75 : 100,
      category: 'Sales Presentation',
      completed: false
    })),
    
    // Impromptu Speaking scenarios
    ...Array.from({ length: 15 }, (_, i) => ({
      id: `impromptu-speaking-${i + 1}`,
      eventName: 'Impromptu Speaking',
      scenarioNumber: i + 1,
      prompt: [
        "Topic: The future of remote work. You have 2 minutes to prepare and 3 minutes to speak. What's your stance?",
        "Topic: Why small businesses are crucial to the economy. Organize your thoughts and present your argument.",
        "Topic: The impact of artificial intelligence on employment. Present both sides and your conclusion.",
        "Topic: Should companies prioritize profit or social responsibility? Defend your position.",
        "Topic: The role of leadership in times of crisis. Share your perspective with examples.",
        "Topic: How social media has changed business marketing. Present your analysis.",
        "Topic: The importance of financial literacy for young adults. Make your case.",
        "Topic: Why customer service is more important than ever. Structure your argument.",
        "Topic: The benefits and challenges of entrepreneurship. Present a balanced view.",
        "Topic: How globalization affects local businesses. Share your insights.",
        "Topic: The future of cryptocurrency in business. Present your predictions.",
        "Topic: Why diversity in the workplace drives innovation. Make your argument.",
        "Topic: The environmental responsibility of businesses. Present your stance.",
        "Topic: How technology is changing the retail industry. Organize your thoughts.",
        "Topic: The importance of ethical business practices. Defend your position."
      ][i],
      icon: Mic,
      difficulty: i < 5 ? 'Beginner' : i < 10 ? 'Intermediate' : 'Advanced',
      timeLimit: 10,
      points: i < 5 ? 50 : i < 10 ? 75 : 100,
      category: 'Impromptu Speaking',
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
      icon: MessageCircle,
      difficulty: i < 5 ? 'Beginner' : i < 10 ? 'Intermediate' : 'Advanced',
      timeLimit: 10,
      points: i < 5 ? 50 : i < 10 ? 75 : 100,
      category: 'Marketing',
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
    
    // Business Law scenarios
    ...Array.from({ length: 15 }, (_, i) => ({
      id: `business-law-${i + 1}`,
      eventName: 'Business Law',
      scenarioNumber: i + 1,
      prompt: [
        "A contractor is claiming your company breached the contract terms. How do you assess the situation and respond?",
        "Your employee is asking about their rights regarding overtime pay. How do you ensure compliance with labor laws?",
        "A customer is threatening to sue over a product defect. How do you handle this potential liability?",
        "Your company is being investigated for possible discrimination in hiring practices. How do you respond?",
        "A competitor is claiming your product infringes on their patent. How do you address this intellectual property issue?",
        "Your business partner wants to dissolve the partnership. How do you navigate this legal process?",
        "An employee is claiming workers' compensation for an injury. How do you handle this claim properly?",
        "Your company's terms of service are being challenged by a customer. How do you defend your position?",
        "A vendor is demanding payment for work you believe was unsatisfactory. How do you resolve this dispute?",
        "Your company is facing a class-action lawsuit from customers. How do you manage this legal challenge?",
        "An employee is claiming wrongful termination. How do you document and defend your decision?",
        "Your business is being audited by the IRS. How do you ensure compliance and cooperation?",
        "A landlord is trying to evict your business over lease violations. How do you address this situation?",
        "Your company's data privacy practices are being questioned. How do you ensure legal compliance?",
        "A former employee is violating their non-compete agreement. How do you enforce this contract?"
      ][i],
      icon: Scale,
      difficulty: i < 5 ? 'Beginner' : i < 10 ? 'Intermediate' : 'Advanced',
      timeLimit: 10,
      points: i < 5 ? 50 : i < 10 ? 75 : 100,
      category: 'Business Law',
      completed: false
    })),
    
    // Business Ethics scenarios
    ...Array.from({ length: 15 }, (_, i) => ({
      id: `business-ethics-${i + 1}`,
      eventName: 'Business Ethics',
      scenarioNumber: i + 1,
      prompt: [
        "You discover your company is using suppliers with poor labor practices. How do you address this ethical concern?",
        "A major client is asking you to falsify records to help them avoid taxes. How do you handle this request?",
        "Your boss is asking you to lie to investors about the company's financial situation. What's your response?",
        "You learn that your company's product has safety issues that haven't been disclosed. How do you proceed?",
        "A colleague is taking credit for your work and getting promoted. How do you handle this situation ethically?",
        "Your company is considering layoffs to boost profits, but performance is strong. How do you advise leadership?",
        "A competitor offers you confidential information about their business. How do you respond?",
        "Your company's marketing is misleading customers about product benefits. How do you address this?",
        "You discover a coworker is embezzling money from the company. What's your ethical obligation?",
        "Your company is being pressured to donate to a political campaign. How do you handle this request?",
        "A client is asking you to bend environmental regulations to cut costs. How do you respond?",
        "Your company is considering moving operations to a country with lower labor standards. How do you advise?",
        "You're asked to hire a less qualified candidate because of personal connections. How do you handle this?",
        "Your company's CEO is engaging in insider trading. What's your ethical responsibility?",
        "A vendor is offering you personal gifts to secure a contract. How do you respond appropriately?"
      ][i],
      icon: Shield,
      difficulty: i < 5 ? 'Beginner' : i < 10 ? 'Intermediate' : 'Advanced',
      timeLimit: 10,
      points: i < 5 ? 50 : i < 10 ? 75 : 100,
      category: 'Business Ethics',
      completed: false
    })),
    
    // Human Resource Management scenarios
    ...Array.from({ length: 15 }, (_, i) => ({
      id: `human-resources-${i + 1}`,
      eventName: 'Human Resource Management',
      scenarioNumber: i + 1,
      prompt: [
        "An employee is consistently arriving late to work and it's affecting team morale. How do you address this?",
        "You need to investigate a harassment complaint between two employees. How do you handle this sensitively?",
        "A high-performing employee is asking for a significant raise that's outside budget. How do you respond?",
        "Your company needs to implement layoffs, and you must decide who goes. How do you make this decision?",
        "An employee is claiming their religious beliefs conflict with company policies. How do you accommodate this?",
        "You discover an employee has been falsifying their timesheet. How do you address this misconduct?",
        "A manager is playing favorites with their team members. How do you correct this behavior?",
        "Your company culture survey shows widespread dissatisfaction. How do you address these concerns?",
        "An employee is requesting extended leave for a family medical emergency. How do you handle this?",
        "Two employees are in a romantic relationship that's affecting their work. How do you manage this situation?",
        "A candidate in your interview process is clearly overqualified. How do you handle this diplomatically?",
        "Your company is struggling to attract diverse candidates. How do you improve your recruitment strategy?",
        "An employee is refusing to work with a new team member. How do you resolve this conflict?",
        "A worker is claiming they're being discriminated against because of their age. How do you investigate this?",
        "Your top performer is showing signs of burnout. How do you support them while maintaining productivity?"
      ][i],
      icon: Users,
      difficulty: i < 5 ? 'Beginner' : i < 10 ? 'Intermediate' : 'Advanced',
      timeLimit: 10,
      points: i < 5 ? 50 : i < 10 ? 75 : 100,
      category: 'Human Resource Management',
      completed: false
    })),
    
    // Retail Merchandising scenarios
    ...Array.from({ length: 15 }, (_, i) => ({
      id: `retail-merchandising-${i + 1}`,
      eventName: 'Retail Merchandising',
      scenarioNumber: i + 1,
      prompt: [
        "A customer is demanding a refund for a sale item without a receipt. How do you handle this situation?",
        "Your store's inventory system shows products in stock, but you can't find them. How do you help the customer?",
        "A customer is complaining that your competitor has the same item for 20% less. How do you respond?",
        "You notice a customer concealing merchandise. How do you address this suspected shoplifting?",
        "Your store is overstocked with seasonal items that aren't selling. How do you move this inventory?",
        "A customer slipped and fell in your store. How do you handle this incident?",
        "Your best-selling product has been recalled by the manufacturer. How do you manage customer concerns?",
        "A customer is being rude to your staff members. How do you intervene professionally?",
        "Your store's point-of-sale system is down during peak hours. How do you continue serving customers?",
        "A customer wants to return a product that's clearly been used extensively. How do you handle this?",
        "Your store received damaged merchandise in a shipment. How do you address this with suppliers?",
        "A customer is asking for a discount on a full-price item. How do you respond?",
        "Your store's display windows need updating but you have a limited budget. How do you create impact?",
        "A customer is complaining about long checkout lines. How do you address their frustration?",
        "Your store is implementing new loss prevention measures that customers find intrusive. How do you balance security with service?"
      ][i],
      icon: ShoppingCart,
      difficulty: i < 5 ? 'Beginner' : i < 10 ? 'Intermediate' : 'Advanced',
      timeLimit: 10,
      points: i < 5 ? 50 : i < 10 ? 75 : 100,
      category: 'Retail Merchandising',
      completed: false
    }))
  ];

  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [selectedScenario, setSelectedScenario] = useState<RoleplayScenario | null>(null);
  
  const currentEvent = roleplayEvents.find(event => event.id === selectedEvent);
  const eventScenarios = selectedEvent 
    ? roleplayScenarios.filter(scenario => scenario.category === currentEvent?.category)
    : [];

  return (
    <PageLayout 
      title="Roleplay Practice"
      subtitle="Master business scenarios with timed practice sessions"
    >
      <div className="roleplay-practice-content">
        {!selectedEvent ? (
          <div className="roleplay-events">
            {/* Stats Section */}
            <div className="stats-section">
              <div className="stats-grid">
                <StyledCard className="stat-card">
                  <div className="card-content">
                    <div className="stat-icon">
                      <Target size={24} />
                    </div>
                    <div className="stat-info">
                      <div className="stat-value">
                        {roleplayScenarios.filter(s => s.completed).length}
                      </div>
                      <div className="stat-label">Scenarios Completed</div>
                    </div>
                  </div>
                </StyledCard>

                <StyledCard className="stat-card">
                  <div className="card-content">
                    <div className="stat-icon">
                      <BookOpen size={24} />
                    </div>
                    <div className="stat-info">
                      <div className="stat-value">{roleplayScenarios.length}</div>
                      <div className="stat-label">Total Scenarios</div>
                    </div>
                  </div>
                </StyledCard>

                <StyledCard className="stat-card">
                  <div className="card-content">
                    <div className="stat-icon">
                      <TrendingUp size={24} />
                    </div>
                    <div className="stat-info">
                      <div className="stat-value">
                        {Math.round((roleplayScenarios.filter(s => s.completed).length / roleplayScenarios.length) * 100)}%
                      </div>
                      <div className="stat-label">Progress</div>
                    </div>
                  </div>
                </StyledCard>
              </div>
            </div>

            {/* Events Grid */}
            <div className="roleplay-events-grid">
              {roleplayEvents.map((event) => {
                const IconComponent = event.icon;
                const completedCount = roleplayScenarios.filter(s => s.category === event.category && s.completed).length;
                
                return (
                  <StyledCard 
                    key={event.id}
                    className="roleplay-event-card"
                    onClick={() => {
                      console.log('Clicked event:', event.id);
                      setSelectedEvent(event.id);
                    }}
                  >
                    <div className="card-header">
                      <div className="card-icon">
                        <IconComponent size={48} className="icon-component" />
                      </div>
                      <div className="card-progress">
                        <div className="progress-text">
                          {completedCount}/{event.scenarioCount}
                        </div>
                        <div className="progress-label">Complete</div>
                      </div>
                    </div>
                    
                    <div className="card-content">
                      <h3 className="card-title">{event.name}</h3>
                      <p className="card-description">{event.description}</p>
                      
                      <div className="card-meta">
                        <div className="meta-item">
                          <PlayCircle size={16} />
                          <span>{event.scenarioCount} scenarios</span>
                        </div>
                        <div className="meta-item">
                          <Clock size={16} />
                          <span>10 min each</span>
                        </div>
                      </div>
                      
                      <div className="card-progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${(completedCount / event.scenarioCount) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="card-actions">
                      <Button 
                        className="card-btn" 
                        variant="default"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Button clicked for event:', event.id);
                          setSelectedEvent(event.id);
                        }}
                      >
                        <PlayCircle size={16} />
                        Start Practice
                      </Button>
                    </div>
                  </StyledCard>
                );
              })}
            </div>
          </div>
        ) : !selectedScenario ? (
          <div className="event-scenarios">
            <div className="scenarios-header">
              <Button
                onClick={() => setSelectedEvent('')}
                variant="outline"
                className="back-btn"
              >
                <ArrowLeft size={16} />
                Back to Events
              </Button>
              <div className="scenarios-title">
                <h2>{currentEvent?.name}</h2>
                <p>{currentEvent?.description}</p>
              </div>
            </div>
            
            <div className="scenarios-grid">
              {eventScenarios.map((scenario) => {
                const IconComponent = scenario.icon;
                return (
                  <StyledCard 
                    key={scenario.id}
                    className={`scenario-card ${scenario.completed ? 'completed' : 'available'}`}
                  >
                    <div className="scenario-header">
                      <div className="scenario-icon">
                        <IconComponent size={32} className="icon-component" />
                      </div>
                      <div className="scenario-status">
                        {scenario.completed ? (
                          <CheckCircle size={24} className="status-icon completed" />
                        ) : (
                          <PlayCircle size={24} className="status-icon available" />
                        )}
                      </div>
                    </div>
                    
                    <div className="scenario-info">
                      <h3 className="scenario-title">
                        Scenario {scenario.scenarioNumber}
                      </h3>
                      <p className="scenario-description">
                        {scenario.prompt.length > 100 
                          ? `${scenario.prompt.substring(0, 100)}...` 
                          : scenario.prompt}
                      </p>
                      
                      <div className="scenario-meta">
                        <div className="scenario-details">
                          <div className="detail-item">
                            <Clock size={16} />
                            <span>{scenario.timeLimit} min</span>
                          </div>
                          <div className="detail-item">
                            <Target size={16} />
                            <span>{scenario.points} pts</span>
                          </div>
                        </div>
                        
                        <div className="scenario-badges">
                          <Badge 
                            variant={scenario.difficulty === 'Beginner' ? 'default' : 
                                     scenario.difficulty === 'Intermediate' ? 'secondary' : 'destructive'}
                          >
                            {scenario.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="scenario-actions">
                      <Button
                        onClick={() => setSelectedScenario(scenario)}
                        className="scenario-btn"
                        variant="default"
                      >
                        <PlayCircle size={16} />
                        {scenario.completed ? 'Practice Again' : 'Start Practice'}
                      </Button>
                    </div>
                  </StyledCard>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="practice-session">
            <div className="practice-header">
              <Button
                onClick={() => setSelectedScenario(null)}
                variant="outline"
                className="back-btn"
              >
                <ArrowLeft size={16} />
                Back to Scenarios
              </Button>
              <h2 className="practice-title">
                {selectedScenario.eventName} - Scenario {selectedScenario.scenarioNumber}
              </h2>
            </div>
            
            <StyledCard className="scenario-practice-card">
              <div className="scenario-practice-content">
                <div className="scenario-prompt">
                  <h3>Your Scenario:</h3>
                  <p className="prompt-text">{selectedScenario.prompt}</p>
                </div>
                
                <div className="practice-info">
                  <div className="info-item">
                    <Clock size={20} />
                    <span>Time Limit: {selectedScenario.timeLimit} minutes</span>
                  </div>
                  <div className="info-item">
                    <Target size={20} />
                    <span>Points: {selectedScenario.points}</span>
                  </div>
                  <div className="info-item">
                    <Badge variant={selectedScenario.difficulty === 'Beginner' ? 'default' : 
                                    selectedScenario.difficulty === 'Intermediate' ? 'secondary' : 'destructive'}>
                      {selectedScenario.difficulty}
                    </Badge>
                  </div>
                </div>
                
                <div className="practice-actions">
                  <Button className="start-practice-btn" size="lg">
                    <PlayCircle size={20} />
                    Start Practice Session
                  </Button>
                </div>
              </div>
            </StyledCard>
          </div>
        )}
      </div>
    </PageLayout>
  );
}