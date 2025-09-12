import { useState, useEffect } from 'react';
import { useRoute, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { PageLayout } from '@/components/shared/PageLayout';
import { StyledCard } from '@/components/shared/StyledCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import type { Question, Event } from '@shared/schema';

// Transform database Question to component format
interface ComponentQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface PracticeEvent extends Event {
  icon: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
}

// Transform database question to component format
const transformQuestion = (dbQuestion: Question): ComponentQuestion => ({
  id: dbQuestion.id.toString(),
  question: dbQuestion.questionText,
  options: [dbQuestion.optionA, dbQuestion.optionB, dbQuestion.optionC, dbQuestion.optionD],
  correctAnswer: dbQuestion.correctAnswer.charCodeAt(0) - 'A'.charCodeAt(0),
  explanation: `The correct answer is ${dbQuestion.correctAnswer}.` // Basic explanation for now
});

// Event metadata mapping (icons, difficulty, category)
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

export default function PracticeModePage() {
  const [match, params] = useRoute('/practice/:eventId');
  const [, setLocation] = useLocation();
  const eventId = params?.eventId;
  
  // Fetch event details and questions from database
  const { data: event, isLoading: eventLoading, error: eventError } = useQuery<Event>({
    queryKey: ['/api/events', eventId],
    enabled: !!eventId
  });
  
  const { data: dbQuestions, isLoading: questionsLoading, error: questionsError } = useQuery<Question[]>({
    queryKey: ['/api/events', eventId, 'questions'],
    enabled: !!eventId
  });
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [practiceComplete, setPracticeComplete] = useState(false);
  const [answers, setAnswers] = useState<{ questionId: string; selectedAnswer: number; correct: boolean }[]>([]);

  // Loading state for both event and questions
  const isLoading = eventLoading || questionsLoading;
  const error = eventError || questionsError;

  // Transform database questions to component format and combine event with metadata
  const questions: ComponentQuestion[] = dbQuestions ? dbQuestions.map(transformQuestion) : [];
  const practiceEvent: PracticeEvent | null = event ? {
    ...event,
    ...eventMetadata[event.name] || { icon: '📝', difficulty: 'Beginner' as const, category: 'General' }
  } : null;
  const currentQuestion = questions[currentQuestionIndex];
  
  // Debug logging for question state
  console.log('PracticeModePage render:', {
    eventId,
    currentQuestionIndex,
    questionsLength: questions.length,
    currentQuestionExists: !!currentQuestion,
    currentQuestionId: currentQuestion?.id,
    dbQuestionsLength: dbQuestions?.length,
    isLoading,
    error: !!error
  });

  // Reset state when component mounts or event changes
  useEffect(() => {
    console.log('Resetting practice state for eventId:', eventId);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsCorrect(false);
    setPracticeComplete(false);
    setAnswers([]);
  }, [eventId]);

  // Validate currentQuestionIndex bounds when questions array changes
  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex >= questions.length) {
      console.warn('Current question index out of bounds, resetting to 0:', {
        currentQuestionIndex,
        questionsLength: questions.length
      });
      setCurrentQuestionIndex(0);
    }
  }, [questions.length, currentQuestionIndex]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input or if practice is complete
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement || practiceComplete) {
        return;
      }

      const key = event.key.toLowerCase();
      
      // Answer selection shortcuts (1-4 or A-D)
      if (['1', '2', '3', '4', 'a', 'b', 'c', 'd'].includes(key) && currentQuestion && !showFeedback) {
        event.preventDefault();
        let answerIndex: number;
        
        if (['1', '2', '3', '4'].includes(key)) {
          answerIndex = parseInt(key) - 1;
        } else {
          answerIndex = key.charCodeAt(0) - 'a'.charCodeAt(0);
        }
        
        if (answerIndex < (currentQuestion?.options?.length || 0)) {
          setSelectedAnswer(answerIndex);
        }
      }
      
      // Submit answer or go to next question
      if (key === 'enter' || key === ' ') {
        event.preventDefault();
        if (!showFeedback && selectedAnswer !== null) {
          handleSubmitAnswer();
        } else if (showFeedback) {
          handleNextQuestion();
        }
      }
      
      // End practice
      if (key === 'escape') {
        event.preventDefault();
        handleEndPractice();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [currentQuestion, selectedAnswer, showFeedback, practiceComplete]);

  // Handle answer selection
  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return; // Prevent changing answer after feedback shown
    setSelectedAnswer(answerIndex);
  };

  // Handle answer submission and show immediate feedback
  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || !currentQuestion) return;
    
    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    // Record the answer
    setAnswers(prev => [...prev, {
      questionId: currentQuestion.id,
      selectedAnswer,
      correct
    }]);
  };

  // Handle moving to next question
  const handleNextQuestion = () => {
    console.log('handleNextQuestion called:', {
      currentQuestionIndex,
      questionsLength: questions.length,
      nextIndex: currentQuestionIndex + 1,
      hasNextQuestion: currentQuestionIndex < questions.length - 1,
      questions: questions.map(q => ({ id: q.id, question: q.question.substring(0, 50) + '...' }))
    });
    
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      console.log('Moving to next question:', { nextIndex, nextQuestion: questions[nextIndex] });
      
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setIsCorrect(false);
    } else {
      console.log('Practice complete, finishing...');
      handleFinishPractice();
    }
  };

  // Handle ending practice early or finishing
  const handleEndPractice = () => {
    handleFinishPractice();
  };

  // Navigate to results page
  const handleFinishPractice = () => {
    // Save practice results to sessionStorage for results page with error handling
    if (!eventId || !practiceEvent) {
      console.error('Cannot save results: missing eventId or practiceEvent', { eventId, practiceEvent });
      return;
    }

    try {
      const resultsData = {
        eventId,
        eventName: practiceEvent.name,
        eventIcon: practiceEvent.icon,
        answers: answers.map(answer => {
          const question = questions.find(q => q.id === answer.questionId);
          return {
            questionId: answer.questionId,
            question: question?.question || '',
            selectedAnswer: answer.selectedAnswer,
            correctAnswer: question?.correctAnswer || 0,
            options: question?.options || [],
            explanation: question?.explanation || '',
            correct: answer.correct
          };
        }),
        completedAt: new Date().toISOString(),
        totalTime: undefined // Could add timer in future
      };
      
      console.log('Saving practice results for eventId:', eventId);
      console.log('Results data:', resultsData);
      
      // Store with error checking
      const storageKey = `practiceResults:${eventId}`;
      const serializedData = JSON.stringify(resultsData);
      sessionStorage.setItem(storageKey, serializedData);
      
      // Verify the data was stored correctly
      const storedData = sessionStorage.getItem(storageKey);
      if (!storedData) {
        console.error('Failed to store results data to sessionStorage');
        return;
      }
      
      console.log('Successfully stored results data, navigating to results page');
      
      // Add a small delay to ensure storage is complete before navigation
      setTimeout(() => {
        setLocation(`/practice/${eventId}/results`);
      }, 10);
      
    } catch (error) {
      console.error('Error saving practice results:', error);
      // Still navigate but user will see error page
      setLocation(`/practice/${eventId}/results`);
    }
  };

  // Handle restarting practice
  const handleRestartPractice = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsCorrect(false);
    setPracticeComplete(false);
    setAnswers([]);
  };

  // Handle returning to practice list
  const handleBackToPractice = () => {
    setLocation('/practice');
  };

  // Get difficulty color class
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <PageLayout
        title="Loading Practice..."
        subtitle="Preparing your practice session"
      >
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fbla-blue"></div>
          <p className="text-gray-600">Loading practice questions...</p>
        </div>
      </PageLayout>
    );
  }

  // Error state
  if (error) {
    return (
      <PageLayout
        title="Practice Error"
        subtitle="Failed to load practice session"
      >
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <p className="text-red-600">Failed to load practice questions. Please try again.</p>
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </PageLayout>
    );
  }

  // If event not found
  if (!match || !event) {
    return (
      <PageLayout
        title="Practice Not Found"
        subtitle="The practice event you're looking for doesn't exist"
      >
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <p className="text-gray-600">Sorry, we couldn't find that practice event.</p>
          <Button onClick={handleBackToPractice}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Practice
          </Button>
        </div>
      </PageLayout>
    );
  }

  // If no questions available
  if (questions.length === 0) {
    return (
      <PageLayout
        title={practiceEvent?.name || 'Event'}
        subtitle="No questions available for this event"
      >
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <p className="text-gray-600">Questions for this event are coming soon!</p>
          <Button onClick={handleBackToPractice}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Practice
          </Button>
        </div>
      </PageLayout>
    );
  }

  // If currentQuestion is not available (safety check)
  if (!currentQuestion) {
    console.error('Current question not found:', { currentQuestionIndex, questionsLength: questions.length, questions });
    return (
      <PageLayout
        title={practiceEvent?.name || 'Event'}
        subtitle="Question not available"
      >
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <p className="text-gray-600">Unable to load question. Please try again.</p>
          <div className="space-x-3">
            <Button onClick={() => setCurrentQuestionIndex(0)} variant="outline">
              Restart Practice
            </Button>
            <Button onClick={handleBackToPractice}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Practice
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  // Remove inline results view - now navigates to dedicated results page

  // Main practice interface
  return (
    <PageLayout
      title={practiceEvent?.name || 'Event'}
      subtitle={`Question ${currentQuestionIndex + 1} of ${questions.length}`}
    >
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header with progress and event info */}
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
            <Badge className={getDifficultyColor(practiceEvent?.difficulty || 'Beginner')}>
              {practiceEvent?.difficulty || 'Beginner'}
            </Badge>
            <Badge variant="outline">{practiceEvent?.category || 'General'}</Badge>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Progress</span>
            <span className="text-sm text-gray-600">
              {currentQuestionIndex + 1} / {questions.length}
            </span>
          </div>
          <Progress 
            value={((currentQuestionIndex + 1) / questions.length) * 100} 
            className="h-2"
          />
        </div>

        {/* Question card */}
        <StyledCard className="p-8">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold" data-testid="question-text">
              {currentQuestion?.question || 'Loading question...'}
            </h2>
            
            {/* Answer options */}
            <div className="space-y-3">
              {(currentQuestion?.options || []).map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showFeedback}
                  data-testid={`answer-option-${index}`}
                  className={`w-full p-4 text-left rounded-lg border transition-all ${
                    selectedAnswer === index
                      ? showFeedback
                        ? index === (currentQuestion?.correctAnswer ?? -1)
                          ? 'bg-green-50 border-green-500 text-green-800'
                          : 'bg-red-50 border-red-500 text-red-800'
                        : 'bg-fbla-blue text-white border-fbla-blue'
                      : showFeedback && index === (currentQuestion?.correctAnswer ?? -1)
                      ? 'bg-green-50 border-green-500 text-green-800'
                      : 'bg-white border-gray-200 hover:border-fbla-blue hover:bg-gray-50'
                  } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                    {showFeedback && index === (currentQuestion?.correctAnswer ?? -1) && (
                      <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                    )}
                    {showFeedback && selectedAnswer === index && index !== (currentQuestion?.correctAnswer ?? -1) && (
                      <XCircle className="w-5 h-5 text-red-600 ml-auto" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Feedback section */}
            {showFeedback && (
              <div className={`p-4 rounded-lg ${
                isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-start space-x-3">
                  {isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  )}
                  <div>
                    <p className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                      {isCorrect ? 'Correct!' : 'Incorrect'}
                    </p>
                    <p className="text-gray-700 mt-1">{currentQuestion?.explanation || 'No explanation available.'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex justify-between items-center pt-4">
              <Button 
                onClick={handleEndPractice} 
                variant="outline"
                data-testid="button-end-practice"
              >
                End Practice
              </Button>
              
              <div className="space-x-3">
                {!showFeedback ? (
                  <Button 
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                    data-testid="button-submit-answer"
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button 
                    onClick={handleNextQuestion}
                    data-testid="button-next-question"
                  >
                    {currentQuestionIndex === questions.length - 1 ? 'Finish Practice' : 'Next Question'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </StyledCard>
      </div>
    </PageLayout>
  );
}