"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PageLayout } from '@/components/shared/PageLayout';
import { StyledCard } from '@/components/shared/StyledCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle, XCircle, RotateCcw, Loader2 } from 'lucide-react';
import { PracticeQuestion, UIQuestion, transformQuestionToUI } from '@/lib/types';

// Practice event interface from API
interface PracticeEventInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
}

export default function PracticeModePage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params?.eventId as string;
  
  // State for event info and questions
  const [eventInfo, setEventInfo] = useState<PracticeEventInfo | null>(null);
  const [questions, setQuestions] = useState<UIQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Practice session state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answers, setAnswers] = useState<{ questionId: string; selectedAnswer: number; correct: boolean }[]>([]);

  const currentQuestion = questions[currentQuestionIndex];

  // Fetch event info and questions on mount
  useEffect(() => {
    const fetchData = async () => {
      if (!eventId) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch event info
        const eventsResponse = await fetch('/api/practice/events');
        if (!eventsResponse.ok) throw new Error('Failed to fetch events');
        const events: PracticeEventInfo[] = await eventsResponse.json();
        const event = events.find(e => e.id === eventId);
        
        if (!event) {
          setError('Event not found');
          setIsLoading(false);
          return;
        }
        setEventInfo(event);
        
        // Fetch questions for this event (random 25 questions)
        const questionsResponse = await fetch(`/api/practice/${eventId}/questions?random=true&count=25`);
        if (!questionsResponse.ok) throw new Error('Failed to fetch questions');
        const questionsData = await questionsResponse.json();
        
        // Transform questions to UI format
        const transformedQuestions = questionsData.questions.map((q: PracticeQuestion) => transformQuestionToUI(q));
        setQuestions(transformedQuestions);
        
      } catch (err) {
        console.error('Error loading practice data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load practice data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [eventId]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
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
  }, [currentQuestion, selectedAnswer, showFeedback]);

  // Handle answer selection
  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    setSelectedAnswer(answerIndex);
  };

  // Handle answer submission
  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || !currentQuestion) return;
    
    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    setAnswers(prev => [...prev, {
      questionId: currentQuestion.id,
      selectedAnswer,
      correct
    }]);
  };

  // Handle moving to next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setIsCorrect(false);
    } else {
      handleFinishPractice();
    }
  };

  // Handle ending practice
  const handleEndPractice = () => {
    handleFinishPractice();
  };

  // Navigate to results page
  const handleFinishPractice = () => {
    if (!eventId || !eventInfo) return;

    try {
      const resultsData = {
        eventId,
        eventName: eventInfo.name,
        eventIcon: eventInfo.icon,
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
      };
      
      sessionStorage.setItem(`practiceResults:${eventId}`, JSON.stringify(resultsData));
      
      setTimeout(() => {
        router.push(`/practice/${eventId}/results`);
      }, 10);
      
    } catch (err) {
      console.error('Error saving practice results:', err);
      router.push(`/practice/${eventId}/results`);
    }
  };

  // Handle returning to practice list
  const handleBackToPractice = () => {
    router.push('/practice');
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
          <Loader2 className="h-12 w-12 animate-spin text-yellow-500" />
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
          <p className="text-red-600">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </PageLayout>
    );
  }

  // If event not found
  if (!eventInfo) {
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
        title={eventInfo.name}
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

  // If currentQuestion is not available
  if (!currentQuestion) {
    return (
      <PageLayout
        title={eventInfo.name}
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

  // Main practice interface
  return (
    <PageLayout
      title={eventInfo.name}
      subtitle={`Question ${currentQuestionIndex + 1} of ${questions.length}`}
    >
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header with progress and event info */}
        <div className="flex items-center justify-between">
          <Button 
            onClick={handleBackToPractice} 
            variant="outline"
            className="text-gray-900 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Practice
          </Button>
          
          <div className="flex items-center space-x-4">
            <Badge className={getDifficultyColor(eventInfo.difficulty)}>
              {eventInfo.difficulty}
            </Badge>
            <Badge variant="outline">{eventInfo.category}</Badge>
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
            <h2 className="text-xl font-semibold">
              {currentQuestion.question}
            </h2>
            
            {/* Answer options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showFeedback}
                  className={`w-full p-4 text-left rounded-lg border transition-all ${
                    selectedAnswer === index
                      ? showFeedback
                        ? index === currentQuestion.correctAnswer
                          ? 'bg-green-50 border-green-500 text-green-800'
                          : 'bg-red-50 border-red-500 text-red-800'
                        : 'bg-fbla-blue text-white border-fbla-blue'
                      : showFeedback && index === currentQuestion.correctAnswer
                      ? 'bg-green-50 border-green-500 text-green-800'
                      : 'bg-white border-gray-200 text-gray-900 hover:border-fbla-blue hover:bg-gray-50 hover:text-gray-900'
                  } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                    {showFeedback && index === currentQuestion.correctAnswer && (
                      <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                    )}
                    {showFeedback && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
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
                    <p className="text-gray-700 mt-1">{currentQuestion.explanation}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex justify-between items-center pt-4">
              <Button 
                onClick={handleEndPractice} 
                variant="outline"
                className="text-gray-900 hover:text-gray-900"
              >
                End Practice
              </Button>
              
              <div className="space-x-3">
                {!showFeedback ? (
                  <Button 
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button onClick={handleNextQuestion}>
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