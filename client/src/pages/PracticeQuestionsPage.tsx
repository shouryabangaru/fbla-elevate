import { useState } from 'react';
import { PageLayout } from '@/components/shared/PageLayout';
import { StyledCard } from '@/components/shared/StyledCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Target, TrendingUp, PlayCircle, Award, CheckCircle, XCircle } from 'lucide-react';
import './PracticeQuestionsPage.css';

interface PracticeEvent {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questionCount: number;
  timeLimit: number;
  points: number;
  category: string;
  completed: boolean;
  bestScore?: number;
}

export default function PracticeQuestionsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const practiceEvents: PracticeEvent[] = [
    {
      id: 'accounting',
      name: 'Accounting',
      description: 'Test your knowledge of accounting principles, financial statements, and bookkeeping.',
      icon: '📊',
      difficulty: 'Intermediate',
      questionCount: 28,
      timeLimit: 40,
      points: 350,
      category: 'Finance',
      completed: true,
      bestScore: 76,
    },
    {
      id: 'advanced-accounting',
      name: 'Advanced Accounting',
      description: 'Master complex accounting concepts including consolidations and advanced financial reporting.',
      icon: '🧮',
      difficulty: 'Advanced',
      questionCount: 35,
      timeLimit: 50,
      points: 450,
      category: 'Finance',
      completed: false,
    },
    {
      id: 'advertising',
      name: 'Advertising',
      description: 'Explore advertising strategies, creative development, and media planning.',
      icon: '📢',
      difficulty: 'Intermediate',
      questionCount: 25,
      timeLimit: 35,
      points: 300,
      category: 'Marketing',
      completed: false,
    },
    {
      id: 'agribusiness',
      name: 'Agribusiness',
      description: 'Learn about agricultural business management and food industry economics.',
      icon: '🌾',
      difficulty: 'Intermediate',
      questionCount: 30,
      timeLimit: 40,
      points: 350,
      category: 'Business',
      completed: false,
    },
    {
      id: 'banking-financial-systems',
      name: 'Banking & Financial Systems',
      description: 'Study banking operations, financial institutions, and monetary systems.',
      icon: '🏦',
      difficulty: 'Advanced',
      questionCount: 32,
      timeLimit: 45,
      points: 400,
      category: 'Finance',
      completed: false,
    },
    {
      id: 'business-communication',
      name: 'Business Communication',
      description: 'Master professional communication skills for business environments.',
      icon: '💬',
      difficulty: 'Beginner',
      questionCount: 22,
      timeLimit: 30,
      points: 250,
      category: 'Communication',
      completed: true,
      bestScore: 88,
    },
    {
      id: 'business-law',
      name: 'Business Law',
      description: 'Test your understanding of business law concepts including contracts and ethics.',
      icon: '⚖️',
      difficulty: 'Intermediate',
      questionCount: 25,
      timeLimit: 35,
      points: 300,
      category: 'Legal',
      completed: true,
      bestScore: 92,
    },
    {
      id: 'business-management',
      name: 'Business Management',
      description: 'Learn management principles, organizational behavior, and strategic planning.',
      icon: '📋',
      difficulty: 'Intermediate',
      questionCount: 30,
      timeLimit: 40,
      points: 350,
      category: 'Business',
      completed: false,
    },
    {
      id: 'computer-problem-solving',
      name: 'Computer Problem Solving',
      description: 'Develop computational thinking and programming problem-solving skills.',
      icon: '💻',
      difficulty: 'Advanced',
      questionCount: 20,
      timeLimit: 60,
      points: 500,
      category: 'Technology',
      completed: false,
    },
    {
      id: 'customer-service',
      name: 'Customer Service',
      description: 'Master customer relations, service excellence, and client management.',
      icon: '🤝',
      difficulty: 'Beginner',
      questionCount: 25,
      timeLimit: 30,
      points: 250,
      category: 'Business',
      completed: true,
      bestScore: 94,
    },
    {
      id: 'cybersecurity',
      name: 'Cybersecurity',
      description: 'Learn about information security, threat assessment, and digital protection.',
      icon: '🔒',
      difficulty: 'Advanced',
      questionCount: 30,
      timeLimit: 45,
      points: 450,
      category: 'Technology',
      completed: false,
    },
    {
      id: 'data-science-ai',
      name: 'Data Science & AI',
      description: 'Explore data analysis, machine learning, and artificial intelligence concepts.',
      icon: '🤖',
      difficulty: 'Advanced',
      questionCount: 28,
      timeLimit: 50,
      points: 500,
      category: 'Technology',
      completed: false,
    },
    {
      id: 'economics',
      name: 'Economics',
      description: 'Master economic principles including supply and demand and market structures.',
      icon: '💰',
      difficulty: 'Intermediate',
      questionCount: 30,
      timeLimit: 40,
      points: 350,
      category: 'Finance',
      completed: false,
    },
    {
      id: 'entrepreneurship',
      name: 'Entrepreneurship',
      description: 'Explore business creation, innovation, and startup management principles.',
      icon: '🚀',
      difficulty: 'Intermediate',
      questionCount: 26,
      timeLimit: 35,
      points: 320,
      category: 'Business',
      completed: false,
    },
    {
      id: 'healthcare-administration',
      name: 'Healthcare Administration',
      description: 'Study healthcare management, medical facility operations, and health policy.',
      icon: '🏥',
      difficulty: 'Advanced',
      questionCount: 35,
      timeLimit: 45,
      points: 450,
      category: 'Management',
      completed: false,
    },
    {
      id: 'hospitality-event-management',
      name: 'Hospitality & Event Management',
      description: 'Learn hospitality operations, event planning, and tourism management.',
      icon: '🎉',
      difficulty: 'Intermediate',
      questionCount: 28,
      timeLimit: 40,
      points: 350,
      category: 'Management',
      completed: false,
    },
    {
      id: 'human-resource-management',
      name: 'Human Resource Management',
      description: 'Master HR practices, employee relations, and workforce management.',
      icon: '👥',
      difficulty: 'Intermediate',
      questionCount: 30,
      timeLimit: 40,
      points: 350,
      category: 'Management',
      completed: false,
    },
    {
      id: 'insurance-risk-management',
      name: 'Insurance & Risk Management',
      description: 'Study risk assessment, insurance principles, and risk mitigation strategies.',
      icon: '🛡️',
      difficulty: 'Advanced',
      questionCount: 32,
      timeLimit: 45,
      points: 400,
      category: 'Finance',
      completed: false,
    },
    {
      id: 'international-business',
      name: 'International Business',
      description: 'Explore global trade, international markets, and cross-cultural business.',
      icon: '🌍',
      difficulty: 'Advanced',
      questionCount: 35,
      timeLimit: 50,
      points: 450,
      category: 'Business',
      completed: false,
    },
    {
      id: 'intro-business-communication',
      name: 'Introduction to Business Communication (9-10)',
      description: 'Learn basic business communication skills for freshman and sophomores.',
      icon: '📝',
      difficulty: 'Beginner',
      questionCount: 20,
      timeLimit: 25,
      points: 200,
      category: 'Communication',
      completed: false,
    },
    {
      id: 'intro-business-concepts',
      name: 'Introduction to Business Concepts (9-10)',
      description: 'Foundation business concepts for freshman and sophomore students.',
      icon: '💡',
      difficulty: 'Beginner',
      questionCount: 22,
      timeLimit: 30,
      points: 220,
      category: 'Business',
      completed: false,
    },
    {
      id: 'intro-business-procedures',
      name: 'Introduction to Business Procedures (9-10)',
      description: 'Basic business procedures and office skills for underclassmen.',
      icon: '📄',
      difficulty: 'Beginner',
      questionCount: 20,
      timeLimit: 25,
      points: 200,
      category: 'Business',
      completed: false,
    },
    {
      id: 'intro-fbla',
      name: 'Introduction to FBLA (9-10)',
      description: 'Learn about FBLA history, structure, and competitive events.',
      icon: '🏆',
      difficulty: 'Beginner',
      questionCount: 18,
      timeLimit: 20,
      points: 180,
      category: 'FBLA',
      completed: false,
    },
    {
      id: 'intro-information-technology',
      name: 'Introduction to Information Technology (9-10)',
      description: 'Basic IT concepts and computer skills for underclassmen.',
      icon: '💾',
      difficulty: 'Beginner',
      questionCount: 25,
      timeLimit: 30,
      points: 250,
      category: 'Technology',
      completed: false,
    },
    {
      id: 'intro-marketing-concepts',
      name: 'Introduction to Marketing Concepts (9-10)',
      description: 'Basic marketing principles for freshman and sophomore students.',
      icon: '📈',
      difficulty: 'Beginner',
      questionCount: 20,
      timeLimit: 25,
      points: 200,
      category: 'Marketing',
      completed: false,
    },
    {
      id: 'intro-parliamentary-procedure',
      name: 'Introduction to Parliamentary Procedure (9-10)',
      description: 'Basic parliamentary procedure rules for underclassmen.',
      icon: '🗳️',
      difficulty: 'Beginner',
      questionCount: 15,
      timeLimit: 20,
      points: 150,
      category: 'Leadership',
      completed: false,
    },
    {
      id: 'intro-retail-merchandising',
      name: 'Introduction to Retail & Merchandising (9-10)',
      description: 'Basic retail operations and merchandising for underclassmen.',
      icon: '🛍️',
      difficulty: 'Beginner',
      questionCount: 22,
      timeLimit: 25,
      points: 220,
      category: 'Marketing',
      completed: false,
    },
    {
      id: 'intro-supply-chain-management',
      name: 'Introduction to Supply Chain Management (9-10)',
      description: 'Basic supply chain concepts for freshman and sophomore students.',
      icon: '🚚',
      difficulty: 'Beginner',
      questionCount: 20,
      timeLimit: 25,
      points: 200,
      category: 'Business',
      completed: false,
    },
    {
      id: 'journalism',
      name: 'Journalism',
      description: 'Learn news writing, media ethics, and journalistic principles.',
      icon: '📰',
      difficulty: 'Intermediate',
      questionCount: 25,
      timeLimit: 35,
      points: 300,
      category: 'Communication',
      completed: false,
    },
    {
      id: 'management-information-systems',
      name: 'Management Information Systems',
      description: 'Study IT management, database systems, and business technology.',
      icon: '📊',
      difficulty: 'Advanced',
      questionCount: 30,
      timeLimit: 45,
      points: 400,
      category: 'Technology',
      completed: false,
    },
    {
      id: 'marketing',
      name: 'Marketing',
      description: 'Practice marketing fundamentals including the 4 P\'s and consumer behavior.',
      icon: '📈',
      difficulty: 'Intermediate',
      questionCount: 30,
      timeLimit: 35,
      points: 350,
      category: 'Marketing',
      completed: true,
      bestScore: 86,
    },
    {
      id: 'network-design',
      name: 'Network Design',
      description: 'Learn network architecture, protocols, and infrastructure design.',
      icon: '🔗',
      difficulty: 'Advanced',
      questionCount: 25,
      timeLimit: 45,
      points: 450,
      category: 'Technology',
      completed: false,
    },
    {
      id: 'networking-infrastructures',
      name: 'Networking Infrastructures',
      description: 'Study network systems, infrastructure management, and connectivity.',
      icon: '🌐',
      difficulty: 'Advanced',
      questionCount: 28,
      timeLimit: 50,
      points: 500,
      category: 'Technology',
      completed: false,
    },
    {
      id: 'organizational-leadership',
      name: 'Organizational Leadership',
      description: 'Develop leadership skills, team management, and organizational behavior.',
      icon: '👔',
      difficulty: 'Intermediate',
      questionCount: 25,
      timeLimit: 35,
      points: 300,
      category: 'Leadership',
      completed: false,
    },
    {
      id: 'parliamentary-procedure',
      name: 'Parliamentary Procedure',
      description: 'Master formal meeting procedures and parliamentary rules.',
      icon: '🗳️',
      difficulty: 'Intermediate',
      questionCount: 20,
      timeLimit: 30,
      points: 250,
      category: 'Leadership',
      completed: false,
    },
    {
      id: 'personal-finance',
      name: 'Personal Finance',
      description: 'Learn personal financial planning, budgeting, and investment basics.',
      icon: '💳',
      difficulty: 'Beginner',
      questionCount: 25,
      timeLimit: 30,
      points: 250,
      category: 'Finance',
      completed: false,
    },
    {
      id: 'project-management',
      name: 'Project Management',
      description: 'Study project planning, execution, and management methodologies.',
      icon: '📅',
      difficulty: 'Intermediate',
      questionCount: 30,
      timeLimit: 40,
      points: 350,
      category: 'Management',
      completed: false,
    },
    {
      id: 'public-administration-management',
      name: 'Public Administration & Management',
      description: 'Learn government operations, public policy, and civic management.',
      icon: '🏛️',
      difficulty: 'Advanced',
      questionCount: 32,
      timeLimit: 45,
      points: 400,
      category: 'Management',
      completed: false,
    },
    {
      id: 'real-estate',
      name: 'Real Estate',
      description: 'Study property management, real estate law, and market analysis.',
      icon: '🏠',
      difficulty: 'Intermediate',
      questionCount: 28,
      timeLimit: 40,
      points: 350,
      category: 'Business',
      completed: false,
    },
    {
      id: 'retail-management',
      name: 'Retail Management',
      description: 'Learn retail operations, inventory management, and customer experience.',
      icon: '🏪',
      difficulty: 'Intermediate',
      questionCount: 26,
      timeLimit: 35,
      points: 300,
      category: 'Marketing',
      completed: false,
    },
    {
      id: 'securities-investments',
      name: 'Securities & Investments',
      description: 'Study investment strategies, securities analysis, and portfolio management.',
      icon: '📈',
      difficulty: 'Advanced',
      questionCount: 35,
      timeLimit: 50,
      points: 450,
      category: 'Finance',
      completed: false,
    },
    {
      id: 'sports-entertainment-management',
      name: 'Sports & Entertainment Management',
      description: 'Learn sports business, entertainment industry, and event management.',
      icon: '🎭',
      difficulty: 'Intermediate',
      questionCount: 30,
      timeLimit: 40,
      points: 350,
      category: 'Management',
      completed: false,
    },
    {
      id: 'technology-support-services',
      name: 'Technology Support & Services',
      description: 'Study IT support, technical troubleshooting, and service management.',
      icon: '🔧',
      difficulty: 'Intermediate',
      questionCount: 25,
      timeLimit: 35,
      points: 300,
      category: 'Technology',
      completed: false,
    },
  ];

  const categories = ['all', 'Business', 'Finance', 'Marketing', 'Technology', 'Management', 'Communication', 'Leadership', 'Legal', 'FBLA'];
  
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

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'score-excellent';
    if (score >= 80) return 'score-good';
    if (score >= 70) return 'score-fair';
    return 'score-poor';
  };

  const completedCount = practiceEvents.filter(event => event.completed).length;
  const totalPoints = practiceEvents.filter(event => event.completed).reduce((sum, event) => sum + (event.bestScore || 0) * (event.points / 100), 0);
  const averageScore = practiceEvents.filter(event => event.completed && event.bestScore).reduce((sum, event) => sum + (event.bestScore || 0), 0) / practiceEvents.filter(event => event.completed && event.bestScore).length;

  return (
    <PageLayout
      title="Practice Questions"
      subtitle="Test your knowledge with comprehensive FBLA practice exams"
    >
      <div className="practice-container">
        <div className="practice-content">
          {/* Stats Section */}
          <div className="stats-section">
            <div className="stats-grid">
              <StyledCard className="stat-card">
                <div className="card-content">
                  <div className="stat-icon">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div className="stat-info">
                    <div className="stat-value">{completedCount}</div>
                    <div className="stat-label">Exams Completed</div>
                  </div>
                </div>
              </StyledCard>
              
              <StyledCard className="stat-card">
                <div className="card-content">
                  <div className="stat-icon">
                    <Award className="w-8 h-8" />
                  </div>
                  <div className="stat-info">
                    <div className="stat-value">{Math.round(totalPoints)}</div>
                    <div className="stat-label">Points Earned</div>
                  </div>
                </div>
              </StyledCard>
              
              <StyledCard className="stat-card">
                <div className="card-content">
                  <div className="stat-icon">
                    <Target className="w-8 h-8" />
                  </div>
                  <div className="stat-info">
                    <div className="stat-value">{isNaN(averageScore) ? 0 : Math.round(averageScore)}%</div>
                    <div className="stat-label">Average Score</div>
                  </div>
                </div>
              </StyledCard>
            </div>
          </div>

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
              <StyledCard key={event.id} className={`event-card ${event.completed ? 'completed' : 'available'}`}>
                <div className="card-content">
                  <div className="event-header">
                    <div className="event-icon">
                      <span className="icon-emoji">{event.icon}</span>
                    </div>
                    <div className="event-status">
                      {event.completed ? (
                        <CheckCircle className="status-icon completed" />
                      ) : (
                        <PlayCircle className="status-icon available" />
                      )}
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
                      
                      <div className="meta-stats">
                        <div className="stat-item">
                          <BookOpen className="w-4 h-4" />
                          <span>{event.questionCount} questions</span>
                        </div>
                        <div className="stat-item">
                          <Clock className="w-4 h-4" />
                          <span>{event.timeLimit} minutes</span>
                        </div>
                        <div className="stat-item">
                          <Award className="w-4 h-4" />
                          <span>{event.points} points</span>
                        </div>
                      </div>
                    </div>
                    
                    {event.completed && event.bestScore && (
                      <div className="completion-info">
                        <div className="best-score">
                          <span className="score-label">Best Score:</span>
                          <span className={`score-value ${getScoreColor(event.bestScore)}`}>
                            {event.bestScore}%
                          </span>
                        </div>
                        <div className="score-bar">
                          <div 
                            className="score-fill"
                            style={{ width: `${event.bestScore}%` }}
                          />
                        </div>
                      </div>
                    )}
                    
                    <div className="event-actions">
                      <Button className="action-button primary">
                        <PlayCircle className="w-4 h-4 mr-2" />
                        {event.completed ? 'Retake Exam' : 'Start Exam'}
                      </Button>
                      
                      {event.completed && (
                        <Button className="action-button secondary" variant="outline">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          View Results
                        </Button>
                      )}
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