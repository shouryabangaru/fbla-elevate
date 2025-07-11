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
  BookOpen
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

export default function RoleplayPracticePage() {
  // Create individual roleplay scenarios from the events
  const roleplayScenarios: RoleplayScenario[] = [
    // Banking & Financial Services scenarios
    ...Array.from({ length: 15 }, (_, i) => ({
      id: `banking-${i + 1}`,
      eventName: 'Banking & Financial Services',
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
      category: 'Banking & Financial Services',
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
    
    // Sales scenarios
    ...Array.from({ length: 15 }, (_, i) => ({
      id: `sales-${i + 1}`,
      eventName: 'Sales',
      scenarioNumber: i + 1,
      prompt: [
        "A potential client is interested but says your price is too high compared to competitors. How do you handle this objection?",
        "A long-term client is threatening to switch to a competitor due to a recent service issue. How do you retain them?",
        "You're close to closing a major deal, but the client wants features your product doesn't have. How do you respond?",
        "A prospect has gone silent after initially showing strong interest. How do you re-engage them?",
        "Your sales quota is behind schedule with one month left in the quarter. What's your strategy?",
        "A client wants to negotiate terms that would set a precedent for other customers. How do you handle this?",
        "You discover a competitor has been spreading false information about your product. How do you address this?",
        "A potential customer is happy with their current solution but you believe yours is better. How do you approach this?",
        "A client wants to cancel their contract early due to budget constraints. How do you handle this situation?",
        "You're presenting to a committee with conflicting priorities. How do you address everyone's concerns?",
        "A prospect is interested but wants to wait until next quarter to make a decision. How do you create urgency?",
        "A client is asking for references, but your product is new with few case studies. How do you build credibility?",
        "You're competing against a much larger company with more resources. How do you position your advantages?",
        "A client loves your product but doesn't have the budget. How do you explore alternative solutions?",
        "A prospect is asking detailed technical questions that are outside your expertise. How do you handle this?"
      ][i],
      icon: Users,
      difficulty: i < 5 ? 'Beginner' : i < 10 ? 'Intermediate' : 'Advanced',
      timeLimit: 10,
      points: i < 5 ? 50 : i < 10 ? 75 : 100,
      category: 'Sales',
      completed: false
    }))
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedScenario, setSelectedScenario] = useState<RoleplayScenario | null>(null);
  
  const categories = ['all', 'Banking & Financial Services', 'Business Management', 'Customer Service', 'Entrepreneurship', 'Marketing', 'Sales'];
  
  const filteredScenarios = selectedCategory === 'all' 
    ? roleplayScenarios 
    : roleplayScenarios.filter(scenario => scenario.category === selectedCategory);

  return (
    <PageLayout 
      title="Roleplay Practice"
      subtitle="Master business scenarios with timed practice sessions"
    >
      <div className="roleplay-practice-content">
        {!selectedScenario ? (
          <div className="roleplay-scenarios">
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

            {/* Filter Section */}
            <div className="filter-section">
              <StyledCard className="filter-card">
                <div className="filter-buttons">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                    >
                      {category === 'all' ? 'All Categories' : category}
                    </button>
                  ))}
                </div>
              </StyledCard>
            </div>

            {/* Scenarios Grid */}
            <div className="scenarios-grid">
              {filteredScenarios.map((scenario) => {
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
                        {scenario.eventName} - Scenario {scenario.scenarioNumber}
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