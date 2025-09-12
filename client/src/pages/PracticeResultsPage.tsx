import { useState, useEffect } from 'react';
import { useRoute, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { PageLayout } from '@/components/shared/PageLayout';
import { StyledCard } from '@/components/shared/StyledCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, RotateCcw, TrendingUp, CheckCircle, XCircle, Target, Clock, Award } from 'lucide-react';
import type { Event } from '@shared/schema';

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

interface PracticeEvent extends Event {
  icon: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
}

// Event metadata mapping (matches PracticeModePage)
const eventMetadata: Record<string, { icon: string; difficulty: 'Beginner' | 'Intermediate' | 'Advanced'; category: string }> = {
  'Accounting I': { icon: '📊', difficulty: 'Intermediate', category: 'Finance' },
  'Accounting II': { icon: '🧮', difficulty: 'Advanced', category: 'Finance' },
  'Banking & Financial Systems': { icon: '🏦', difficulty: 'Intermediate', category: 'Finance' },
  'Business Management': { icon: '💼', difficulty: 'Intermediate', category: 'Management' },
  'Business Law': { icon: '⚖️', difficulty: 'Advanced', category: 'Legal' },
  'Client Service': { icon: '🤝', difficulty: 'Beginner', category: 'Communication' },
  'Economics': { icon: '📈', difficulty: 'Intermediate', category: 'Finance' },
  'Entrepreneurship': { icon: '🚀', difficulty: 'Advanced', category: 'Business' },
  'Introduction to Business Concepts': { icon: '📋', difficulty: 'Beginner', category: 'Business' },
  'Introduction to Financial Math': { icon: '🔢', difficulty: 'Beginner', category: 'Finance' },
  'Introduction to Marketing Concepts': { icon: '📢', difficulty: 'Beginner', category: 'Marketing' },
  'Introduction to Parliamentary Procedure': { icon: '🏛️', difficulty: 'Beginner', category: 'Leadership' },
  'Management Information Systems': { icon: '💻', difficulty: 'Advanced', category: 'Technology' },
  'Personal Finance': { icon: '💰', difficulty: 'Beginner', category: 'Finance' },
  'Securities & Investments': { icon: '📊', difficulty: 'Advanced', category: 'Finance' },
  'Business Ethics': { icon: '🎯', difficulty: 'Intermediate', category: 'Business' },
  'International Business': { icon: '🌍', difficulty: 'Advanced', category: 'Business' },
  'Marketing': { icon: '📈', difficulty: 'Intermediate', category: 'Marketing' },
  'Sports & Entertainment Marketing': { icon: '🎭', difficulty: 'Intermediate', category: 'Marketing' },
  'Hospitality Management': { icon: '🏨', difficulty: 'Intermediate', category: 'Management' },
  'Human Resource Management': { icon: '👥', difficulty: 'Intermediate', category: 'Management' },
  'Public Speaking': { icon: '🎤', difficulty: 'Beginner', category: 'Communication' },
  'Future Business Leader': { icon: '👑', difficulty: 'Intermediate', category: 'Leadership' },
  'Introduction to Event Planning': { icon: '📅', difficulty: 'Beginner', category: 'Management' },
  'Sales Presentation': { icon: '💡', difficulty: 'Intermediate', category: 'Communication' },
};

export default function PracticeResultsPage() {
  const [match, params] = useRoute('/practice/:eventId/results');
  const [, setLocation] = useLocation();
  const eventId = params?.eventId;
  
  const [resultsData, setResultsData] = useState<ResultsData | null>(null);
  const [eventNotFound, setEventNotFound] = useState(false);
  
  // Fetch event details from database (matches PracticeModePage)
  const { data: event, isLoading: eventLoading, error: eventError } = useQuery<Event>({
    queryKey: ['/api/events', eventId],
    enabled: !!eventId
  });
  
  // Transform database event to component format with metadata
  const practiceEvent: PracticeEvent | null = event ? {
    ...event,
    ...eventMetadata[event.name] || { icon: '📝', difficulty: 'Beginner' as const, category: 'General' }
  } : null;
  
  // Load results data from sessionStorage with improved error handling
  useEffect(() => {
    if (!eventId) return;
    
    try {
      const storedResults = sessionStorage.getItem(`practiceResults:${eventId}`);
      console.log('Loading results for eventId:', eventId);
      console.log('Stored results:', storedResults ? 'found' : 'not found');
      
      if (storedResults) {
        const parsedResults: ResultsData = JSON.parse(storedResults);
        console.log('Parsed results:', parsedResults);
        setResultsData(parsedResults);
        // Clear the stored data after loading to prevent stale results
        sessionStorage.removeItem(`practiceResults:${eventId}`);
      } else {
        // No results found - user probably navigated directly to results page
        console.log('No results data found in sessionStorage');
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

  // Loading state
  if (eventLoading && !resultsData) {
    return (
      <PageLayout
        title="Loading Results..."
        subtitle="Loading your practice results"
      >
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fbla-blue"></div>
          <p className="text-gray-600">Loading your results...</p>
        </div>
      </PageLayout>
    );
  }
  
  // Error states with better diagnostics
  if (!match) {
    return (
      <PageLayout
        title="Invalid Results URL"
        subtitle="The results URL is not valid"
      >
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <p className="text-gray-600">The results URL format is not valid.</p>
          <Button onClick={handleBackToPractice}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Practice
          </Button>
        </div>
      </PageLayout>
    );
  }
  
  // Check for practice results data first
  if (!resultsData) {
    return (
      <PageLayout
        title="No Practice Results"
        subtitle="Practice results data not found"
      >
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <p className="text-gray-600">
            No practice session data found. Complete a practice session first.
          </p>
          <Button onClick={handleBackToPractice}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Practice
          </Button>
        </div>
      </PageLayout>
    );
  }
  
  // Event error handling
  if (eventError) {
    return (
      <PageLayout
        title="Error Loading Event"
        subtitle="Failed to load event information"
      >
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <p className="text-red-600">Failed to load event details. Please try again.</p>
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </PageLayout>
    );
  }
  
  // If event not found in database but we have results, show results with basic info
  if (!practiceEvent) {
    return (
      <PageLayout
        title="Practice Results"
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
          </div>
          
          <StyledCard className="p-6">
            <p className="text-amber-600 mb-4">⚠️ Event details not found, but showing your practice results.</p>
            <p>Event Name: {resultsData.eventName}</p>
            <p>Questions Answered: {resultsData.answers.length}</p>
            <p>Correct: {resultsData.answers.filter(a => a.correct).length}</p>
          </StyledCard>
          
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
      title={`${practiceEvent.name} Results`}
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
            <Badge className={getDifficultyColor(practiceEvent.difficulty)}>
              {practiceEvent.difficulty}
            </Badge>
            <Badge variant="outline">{practiceEvent.category}</Badge>
          </div>
        </div>

        {/* Overall Score Card */}
        <StyledCard className="text-center p-8">
          <div className="space-y-6">
            <div className="text-6xl">{practiceEvent.icon}</div>
            <div>
              <h2 className="text-3xl font-bold mb-2">Practice Complete!</h2>
              <p className="text-gray-600">Here's how you performed on {practiceEvent.name}</p>
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
                    Great work! You demonstrated solid understanding of {practiceEvent.name} concepts.
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