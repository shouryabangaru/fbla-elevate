import { useState } from 'react';
import { useLocation } from 'wouter';
import { PageLayout } from '@/components/shared/PageLayout';
import { StyledCard } from '@/components/shared/StyledCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlayCircle } from 'lucide-react';
import './PracticeQuestionsPage.css';

interface PracticeEvent {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
}

export default function PracticeQuestionsPage() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const practiceEvents: PracticeEvent[] = [
    {
      id: 'accounting',
      name: 'Accounting',
      description: 'Practice accounting principles, financial statements, and bookkeeping concepts.',
      icon: '📊',
      difficulty: 'Intermediate',
      category: 'Finance',
    },
    {
      id: 'advanced-accounting',
      name: 'Advanced Accounting',
      description: 'Master complex accounting concepts including consolidations and advanced financial reporting.',
      icon: '🧮',
      difficulty: 'Advanced',
      category: 'Finance',
    },
    {
      id: 'advertising',
      name: 'Advertising',
      description: 'Explore advertising strategies, creative development, and media planning.',
      icon: '📢',
      difficulty: 'Intermediate',
      category: 'Marketing',
    },
    {
      id: 'agribusiness',
      name: 'Agribusiness',
      description: 'Learn about agricultural business management and food industry economics.',
      icon: '🌾',
      difficulty: 'Intermediate',
      category: 'Business',
    },
    {
      id: 'banking-financial-systems',
      name: 'Banking & Financial Systems',
      description: 'Study banking operations, financial institutions, and monetary systems.',
      icon: '🏦',
      difficulty: 'Advanced',
      category: 'Finance',
    },
    {
      id: 'business-communication',
      name: 'Business Communication',
      description: 'Master professional communication skills for business environments.',
      icon: '💬',
      difficulty: 'Beginner',
      category: 'Communication',
    },
    {
      id: 'business-law',
      name: 'Business Law',
      description: 'Practice understanding of business law concepts including contracts and ethics.',
      icon: '⚖️',
      difficulty: 'Intermediate',
      category: 'Legal',
    },
    {
      id: 'business-management',
      name: 'Business Management',
      description: 'Learn management principles, organizational behavior, and strategic planning.',
      icon: '📋',
      difficulty: 'Intermediate',
      category: 'Business',
    },
    {
      id: 'computer-problem-solving',
      name: 'Computer Problem Solving',
      description: 'Develop computational thinking and programming problem-solving skills.',
      icon: '💻',
      difficulty: 'Advanced',
      category: 'Technology',
    },
    {
      id: 'customer-service',
      name: 'Customer Service',
      description: 'Master customer relations, service excellence, and client management.',
      icon: '🤝',
      difficulty: 'Beginner',
      category: 'Business',
    },
    {
      id: 'cybersecurity',
      name: 'Cybersecurity',
      description: 'Learn about information security, threat assessment, and digital protection.',
      icon: '🔒',
      difficulty: 'Advanced',
      category: 'Technology',
    },
    {
      id: 'data-science-ai',
      name: 'Data Science & AI',
      description: 'Explore data analysis, machine learning, and artificial intelligence concepts.',
      icon: '🤖',
      difficulty: 'Advanced',
      category: 'Technology',
    },
    {
      id: 'economics',
      name: 'Economics',
      description: 'Master economic principles including supply and demand and market structures.',
      icon: '💰',
      difficulty: 'Intermediate',
      category: 'Finance',
    },
    {
      id: 'entrepreneurship',
      name: 'Entrepreneurship',
      description: 'Explore business creation, innovation, and startup management principles.',
      icon: '🚀',
      difficulty: 'Intermediate',
      category: 'Business',
    },
    {
      id: 'healthcare-administration',
      name: 'Healthcare Administration',
      description: 'Study healthcare management, medical facility operations, and health policy.',
      icon: '🏥',
      difficulty: 'Advanced',
      category: 'Management',
    },
    {
      id: 'hospitality-event-management',
      name: 'Hospitality & Event Management',
      description: 'Learn hospitality operations, event planning, and tourism management.',
      icon: '🎉',
      difficulty: 'Intermediate',
      category: 'Management',
    },
    {
      id: 'human-resource-management',
      name: 'Human Resource Management',
      description: 'Master HR practices, employee relations, and workforce management.',
      icon: '👥',
      difficulty: 'Intermediate',
      category: 'Management',
    },
    {
      id: 'insurance-risk-management',
      name: 'Insurance & Risk Management',
      description: 'Study risk assessment, insurance principles, and risk mitigation strategies.',
      icon: '🛡️',
      difficulty: 'Advanced',
      category: 'Finance',
    },
    {
      id: 'international-business',
      name: 'International Business',
      description: 'Explore global trade, international markets, and cross-cultural business.',
      icon: '🌍',
      difficulty: 'Advanced',
      category: 'Business',
    },
    {
      id: 'intro-business-communication',
      name: 'Introduction to Business Communication (9-10)',
      description: 'Learn basic business communication skills for freshman and sophomores.',
      icon: '📝',
      difficulty: 'Beginner',
      category: 'Communication',
    },
    {
      id: 'intro-business-concepts',
      name: 'Introduction to Business Concepts (9-10)',
      description: 'Foundation business concepts for freshman and sophomore students.',
      icon: '💡',
      difficulty: 'Beginner',
      category: 'Business',
    },
    {
      id: 'intro-business-procedures',
      name: 'Introduction to Business Procedures (9-10)',
      description: 'Basic business procedures and office skills for underclassmen.',
      icon: '📄',
      difficulty: 'Beginner',
      category: 'Business',
    },
    {
      id: 'intro-fbla',
      name: 'Introduction to FBLA (9-10)',
      description: 'Learn about FBLA history, structure, and competitive events.',
      icon: '🏆',
      difficulty: 'Beginner',
      category: 'FBLA',
    },
    {
      id: 'intro-information-technology',
      name: 'Introduction to Information Technology (9-10)',
      description: 'Basic IT concepts and computer skills for underclassmen.',
      icon: '💾',
      difficulty: 'Beginner',
      category: 'Technology',
    },
    {
      id: 'intro-marketing-concepts',
      name: 'Introduction to Marketing Concepts (9-10)',
      description: 'Basic marketing principles for freshman and sophomore students.',
      icon: '📈',
      difficulty: 'Beginner',
      category: 'Marketing',
    },
    {
      id: 'intro-parliamentary-procedure',
      name: 'Introduction to Parliamentary Procedure (9-10)',
      description: 'Basic parliamentary procedure rules for underclassmen.',
      icon: '🗳️',
      difficulty: 'Beginner',
      category: 'Leadership',
    },
    {
      id: 'intro-retail-merchandising',
      name: 'Introduction to Retail & Merchandising (9-10)',
      description: 'Basic retail operations and merchandising for underclassmen.',
      icon: '🛍️',
      difficulty: 'Beginner',
      category: 'Marketing',
    },
    {
      id: 'intro-supply-chain-management',
      name: 'Introduction to Supply Chain Management (9-10)',
      description: 'Basic supply chain concepts for freshman and sophomore students.',
      icon: '🚚',
      difficulty: 'Beginner',
      category: 'Business',
    },
    {
      id: 'journalism',
      name: 'Journalism',
      description: 'Learn news writing, media ethics, and journalistic principles.',
      icon: '📰',
      difficulty: 'Intermediate',
      category: 'Communication',
    },
    {
      id: 'management-information-systems',
      name: 'Management Information Systems',
      description: 'Study IT management, database systems, and business technology.',
      icon: '📊',
      difficulty: 'Advanced',
      category: 'Technology',
    },
    {
      id: 'marketing',
      name: 'Marketing',
      description: 'Practice marketing fundamentals including the 4 P\'s and consumer behavior.',
      icon: '📈',
      difficulty: 'Intermediate',
      category: 'Marketing',
    },
    {
      id: 'network-design',
      name: 'Network Design',
      description: 'Learn network architecture, protocols, and infrastructure design.',
      icon: '🔗',
      difficulty: 'Advanced',
      category: 'Technology',
    },
    {
      id: 'networking-infrastructures',
      name: 'Networking Infrastructures',
      description: 'Study network systems, infrastructure management, and connectivity.',
      icon: '🌐',
      difficulty: 'Advanced',
      category: 'Technology',
    },
    {
      id: 'organizational-leadership',
      name: 'Organizational Leadership',
      description: 'Develop leadership skills, team management, and organizational behavior.',
      icon: '👔',
      difficulty: 'Intermediate',
      category: 'Leadership',
    },
    {
      id: 'parliamentary-procedure',
      name: 'Parliamentary Procedure',
      description: 'Master formal meeting procedures and parliamentary rules.',
      icon: '🗳️',
      difficulty: 'Intermediate',
      category: 'Leadership',
    },
    {
      id: 'personal-finance',
      name: 'Personal Finance',
      description: 'Learn personal financial planning, budgeting, and investment basics.',
      icon: '💳',
      difficulty: 'Beginner',
      category: 'Finance',
    },
    {
      id: 'project-management',
      name: 'Project Management',
      description: 'Study project planning, execution, and management methodologies.',
      icon: '📅',
      difficulty: 'Intermediate',
      category: 'Management',
    },
    {
      id: 'public-administration-management',
      name: 'Public Administration & Management',
      description: 'Learn government operations, public policy, and civic management.',
      icon: '🏛️',
      difficulty: 'Advanced',
      category: 'Management',
    },
    {
      id: 'real-estate',
      name: 'Real Estate',
      description: 'Study property management, real estate law, and market analysis.',
      icon: '🏠',
      difficulty: 'Intermediate',
      category: 'Business',
    },
    {
      id: 'retail-management',
      name: 'Retail Management',
      description: 'Learn retail operations, inventory management, and customer experience.',
      icon: '🏪',
      difficulty: 'Intermediate',
      category: 'Marketing',
    },
    {
      id: 'securities-investments',
      name: 'Securities & Investments',
      description: 'Study investment strategies, securities analysis, and portfolio management.',
      icon: '📈',
      difficulty: 'Advanced',
      category: 'Finance',
    },
    {
      id: 'sports-entertainment-management',
      name: 'Sports & Entertainment Management',
      description: 'Learn sports business, entertainment industry, and event management.',
      icon: '🎭',
      difficulty: 'Intermediate',
      category: 'Management',
    },
    {
      id: 'technology-support-services',
      name: 'Technology Support & Services',
      description: 'Study IT support, technical troubleshooting, and service management.',
      icon: '🔧',
      difficulty: 'Intermediate',
      category: 'Technology',
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


  return (
    <PageLayout
      title="Practice Questions"
      subtitle="Test your knowledge with comprehensive FBLA practice exams"
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
                        onClick={() => setLocation(`/practice/${event.id}`)}
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