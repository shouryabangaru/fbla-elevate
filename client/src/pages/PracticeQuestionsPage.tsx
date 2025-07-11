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
      id: 'business-law',
      name: 'Business Law',
      description: 'Test your understanding of business law concepts including contracts, torts, and business ethics.',
      icon: '⚖️',
      difficulty: 'Intermediate',
      questionCount: 25,
      timeLimit: 30,
      points: 250,
      category: 'Legal',
      completed: true,
      bestScore: 88,
    },
    {
      id: 'marketing',
      name: 'Marketing',
      description: 'Practice marketing fundamentals including the 4 P\'s, market research, and consumer behavior.',
      icon: '📈',
      difficulty: 'Beginner',
      questionCount: 30,
      timeLimit: 35,
      points: 300,
      category: 'Business',
      completed: true,
      bestScore: 92,
    },
    {
      id: 'economics',
      name: 'Economics',
      description: 'Master economic principles including supply and demand, market structures, and macroeconomics.',
      icon: '💰',
      difficulty: 'Advanced',
      questionCount: 35,
      timeLimit: 45,
      points: 400,
      category: 'Finance',
      completed: false,
    },
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
      id: 'finance',
      name: 'Finance',
      description: 'Challenge yourself with financial concepts including investments, banking, and financial planning.',
      icon: '💹',
      difficulty: 'Advanced',
      questionCount: 32,
      timeLimit: 50,
      points: 450,
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
      id: 'business-ethics',
      name: 'Business Ethics',
      description: 'Understand ethical decision-making in business contexts and corporate responsibility.',
      icon: '🤝',
      difficulty: 'Beginner',
      questionCount: 22,
      timeLimit: 25,
      points: 220,
      category: 'Legal',
      completed: true,
      bestScore: 94,
    },
    {
      id: 'management',
      name: 'Management',
      description: 'Learn about organizational behavior, leadership, and strategic management.',
      icon: '👥',
      difficulty: 'Intermediate',
      questionCount: 29,
      timeLimit: 38,
      points: 380,
      category: 'Business',
      completed: false,
    },
  ];

  const categories = ['all', 'Business', 'Finance', 'Legal'];
  
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