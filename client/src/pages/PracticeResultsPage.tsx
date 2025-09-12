import { useState, useEffect } from 'react';
import { useRoute, useLocation } from 'wouter';
import { PageLayout } from '@/components/shared/PageLayout';
import { StyledCard } from '@/components/shared/StyledCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, RotateCcw, TrendingUp, CheckCircle, XCircle, Target, Clock, Award } from 'lucide-react';

interface ResultsData {
  eventId: string;
  eventName: string;
  eventIcon: string;
  answers: {
    questionId: string;
    question: string;
    selectedAnswer: number;
    correctAnswer: number;
    options: string[];
    explanation: string;
    correct: boolean;
  }[];
  completedAt: string;
  totalTime?: number; // in seconds
}

interface PracticeEvent {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty: string;
  category: string;
}

// Sample events data (matches PracticeModePage)
const practiceEvents: PracticeEvent[] = [
  {
    id: 'accounting',
    name: 'Accounting',
    description: 'Master accounting principles, financial statements, and business calculations.',
    icon: '📊',
    difficulty: 'Intermediate',
    category: 'Business',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Learn marketing strategies, consumer behavior, and promotional techniques.',
    icon: '📈',
    difficulty: 'Beginner',
    category: 'Business',
  }
];

export default function PracticeResultsPage() {
  const [match, params] = useRoute('/practice/:eventId/results');
  const [, setLocation] = useLocation();
  const eventId = params?.eventId;
  
  const [resultsData, setResultsData] = useState<ResultsData | null>(null);
  
  // Get event info
  const event = practiceEvents.find(e => e.id === eventId);
  
  // Load results data from sessionStorage
  useEffect(() => {
    if (!eventId) return;
    
    try {
      const storedResults = sessionStorage.getItem(`practiceResults:${eventId}`);
      if (storedResults) {
        const parsedResults: ResultsData = JSON.parse(storedResults);
        setResultsData(parsedResults);
        // Clear the stored data after loading to prevent stale results
        sessionStorage.removeItem(`practiceResults:${eventId}`);
      } else {
        // No results found - user probably navigated directly to results page
        setResultsData(null);
      }
    } catch (error) {
      console.error('Error loading practice results:', error);
      setResultsData(null);
    }
  }, [eventId]);

  // Calculate performance metrics
  const getPerformanceMetrics = () => {
    if (!resultsData) return null;
    
    const totalQuestions = resultsData.answers.length;
    const correctAnswers = resultsData.answers.filter(a => a.correct).length;
    const percentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
    
    // Performance level
    let performanceLevel = 'Needs Practice';
    let performanceColor = 'text-red-600';
    let performanceIcon = XCircle;
    
    if (percentage >= 90) {
      performanceLevel = 'Excellent';
      performanceColor = 'text-green-600';
      performanceIcon = Award;
    } else if (percentage >= 80) {
      performanceLevel = 'Good';
      performanceColor = 'text-blue-600'; 
      performanceIcon = TrendingUp;
    } else if (percentage >= 70) {
      performanceLevel = 'Fair';
      performanceColor = 'text-yellow-600';
      performanceIcon = CheckCircle;
    }
    
    return {
      totalQuestions,
      correctAnswers,
      incorrectAnswers: totalQuestions - correctAnswers,
      percentage,
      performanceLevel,
      performanceColor,
      performanceIcon
    };
  };

  // Format time display
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Navigation handlers
  const handleBackToPractice = () => {
    setLocation('/practice');
  };

  const handlePracticeAgain = () => {
    setLocation(`/practice/${eventId}`);
  };

  // If no match or event not found
  if (!match || !event || !resultsData) {
    return (
      <PageLayout
        title="Results Not Found"
        subtitle="Practice results could not be loaded"
      >
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <p className="text-gray-600">Sorry, we couldn't load your practice results.</p>
          <Button onClick={handleBackToPractice}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Practice
          </Button>
        </div>
      </PageLayout>
    );
  }

  const metrics = getPerformanceMetrics();
  if (!metrics) return null;
  
  const PerformanceIcon = metrics.performanceIcon;

  return (
    <PageLayout
      title={`${event.name} Results`}
      subtitle={`Practice completed on ${new Date(resultsData.completedAt).toLocaleDateString()}`}
    >
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header with navigation */}
        <div className="flex items-center justify-between">
          <Button 
            onClick={handleBackToPractice} 
            variant="outline"
            data-testid="button-back-to-practice"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Practice
          </Button>
          
          <div className="flex items-center space-x-4">
            <Badge className={getDifficultyColor(event.difficulty)}>
              {event.difficulty}
            </Badge>
            <Badge variant="outline">{event.category}</Badge>
          </div>
        </div>

        {/* Overall Score Card */}
        <StyledCard className="text-center p-8">
          <div className="space-y-6">
            <div className="text-6xl">{event.icon}</div>
            <div>
              <h2 className="text-3xl font-bold mb-2">Practice Complete!</h2>
              <p className="text-gray-600">Here's how you performed on {event.name}</p>
            </div>
            
            {/* Score Circle */}
            <div className="relative w-32 h-32 mx-auto">
              <div className="w-32 h-32 rounded-full border-8 border-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-fbla-blue">{metrics.percentage}%</div>
                  <div className="text-sm text-gray-600">Score</div>
                </div>
              </div>
            </div>
            
            {/* Performance Level */}
            <div className="flex items-center justify-center space-x-2">
              <PerformanceIcon className={`w-6 h-6 ${metrics.performanceColor}`} />
              <span className={`text-xl font-semibold ${metrics.performanceColor}`}>
                {metrics.performanceLevel}
              </span>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{metrics.correctAnswers}</div>
                <div className="text-sm text-gray-600">Correct</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{metrics.incorrectAnswers}</div>
                <div className="text-sm text-gray-600">Incorrect</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">{metrics.totalQuestions}</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
            </div>
            
            {/* Time if available */}
            {resultsData.totalTime && (
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Completed in {formatTime(resultsData.totalTime)}</span>
              </div>
            )}
          </div>
        </StyledCard>

        {/* Detailed Question Review */}
        <StyledCard className="p-6">
          <h3 className="text-xl font-semibold mb-4">Question Review</h3>
          <div className="space-y-4">
            {resultsData.answers.map((answer, index) => (
              <div 
                key={answer.questionId}
                className={`p-4 rounded-lg border ${
                  answer.correct ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex items-start space-x-3">
                  {answer.correct ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <h4 className="font-medium mb-2">Question {index + 1}: {answer.question}</h4>
                    
                    {/* Show selected answer */}
                    <div className="mb-2">
                      <span className="text-sm text-gray-600">Your answer: </span>
                      <span className={answer.correct ? 'text-green-800' : 'text-red-800'}>
                        {String.fromCharCode(65 + answer.selectedAnswer)}. {answer.options[answer.selectedAnswer]}
                      </span>
                    </div>
                    
                    {/* Show correct answer if incorrect */}
                    {!answer.correct && (
                      <div className="mb-2">
                        <span className="text-sm text-gray-600">Correct answer: </span>
                        <span className="text-green-800">
                          {String.fromCharCode(65 + answer.correctAnswer)}. {answer.options[answer.correctAnswer]}
                        </span>
                      </div>
                    )}
                    
                    {/* Explanation */}
                    <div className="text-sm text-gray-700">
                      <span className="font-medium">Explanation: </span>
                      {answer.explanation}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </StyledCard>

        {/* Performance Insights */}
        <StyledCard className="p-6">
          <h3 className="text-xl font-semibold mb-4">Performance Insights</h3>
          <div className="space-y-4">
            {/* Accuracy by type or difficulty could go here */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Strengths</h4>
                {metrics.percentage >= 70 ? (
                  <p className="text-sm text-gray-600">
                    Great work! You demonstrated solid understanding of {event.name} concepts.
                  </p>
                ) : (
                  <p className="text-sm text-gray-600">
                    Keep practicing to build confidence with the material.
                  </p>
                )}
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Recommendations</h4>
                <p className="text-sm text-gray-600">
                  {metrics.percentage >= 90 
                    ? 'Excellent mastery! Try more advanced topics or help others learn.'
                    : metrics.percentage >= 70
                    ? 'Review the questions you missed and practice similar concepts.'
                    : 'Focus on fundamental concepts and practice regularly to improve.'
                  }
                </p>
              </div>
            </div>
          </div>
        </StyledCard>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Button onClick={handlePracticeAgain} data-testid="button-practice-again">
            <RotateCcw className="w-4 h-4 mr-2" />
            Practice Again
          </Button>
          <Button onClick={handleBackToPractice} variant="outline" data-testid="button-explore-more">
            <Target className="w-4 h-4 mr-2" />
            Explore More Topics
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}