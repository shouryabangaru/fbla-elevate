import { useState, useEffect } from 'react';
import { useRoute, useLocation } from 'wouter';
import { PageLayout } from '@/components/shared/PageLayout';
import { StyledCard } from '@/components/shared/StyledCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface PracticeEvent {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty: string;
  category: string;
}

// Sample questions data (will be replaced with database data in task 5)
const sampleQuestions: Record<string, Question[]> = {
  'accounting': [
    {
      id: 'acc-1',
      question: 'What is the accounting equation?',
      options: [
        'Assets = Liabilities + Owner\'s Equity',
        'Assets = Liabilities - Owner\'s Equity', 
        'Assets + Liabilities = Owner\'s Equity',
        'Assets - Liabilities = Owner\'s Equity'
      ],
      correctAnswer: 0,
      explanation: 'The fundamental accounting equation is Assets = Liabilities + Owner\'s Equity. This equation must always balance and forms the basis of double-entry bookkeeping.'
    },
    {
      id: 'acc-2', 
      question: 'Which financial statement shows a company\'s profitability over a period?',
      options: [
        'Balance Sheet',
        'Income Statement',
        'Cash Flow Statement',
        'Statement of Retained Earnings'
      ],
      correctAnswer: 1,
      explanation: 'The Income Statement (also called Profit & Loss Statement) shows revenues, expenses, and net income over a specific period, indicating profitability.'
    }
  ],
  'marketing': [
    {
      id: 'mk-1',
      question: 'What are the 4 Ps of marketing?',
      options: [
        'Price, Place, Promotion, People',
        'Product, Price, Place, Promotion',
        'Product, People, Place, Process',
        'Price, Promotion, People, Process'
      ],
      correctAnswer: 1,
      explanation: 'The 4 Ps of marketing are Product, Price, Place, and Promotion. These form the marketing mix that helps businesses develop effective marketing strategies.'
    }
  ]
};

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

export default function PracticeModePage() {
  const [match, params] = useRoute('/practice/:eventId');
  const [, setLocation] = useLocation();
  const eventId = params?.eventId;
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [practiceComplete, setPracticeComplete] = useState(false);
  const [answers, setAnswers] = useState<{ questionId: string; selectedAnswer: number; correct: boolean }[]>([]);

  // Get event and questions data
  const event = practiceEvents.find(e => e.id === eventId);
  const questions = eventId ? sampleQuestions[eventId] || [] : [];
  const currentQuestion = questions[currentQuestionIndex];

  // Reset state when component mounts or event changes
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsCorrect(false);
    setPracticeComplete(false);
    setAnswers([]);
  }, [eventId]);

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
        
        if (answerIndex < currentQuestion.options.length) {
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
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setIsCorrect(false);
    } else {
      setPracticeComplete(true);
    }
  };

  // Handle ending practice early
  const handleEndPractice = () => {
    setPracticeComplete(true);
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
        title={event.name}
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

  // Practice complete - results view
  if (practiceComplete) {
    const correctAnswers = answers.filter(a => a.correct).length;
    const totalQuestions = answers.length;
    const percentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

    return (
      <PageLayout
        title={`${event.name} Practice Complete!`}
        subtitle={`You answered ${correctAnswers} out of ${totalQuestions} questions correctly`}
      >
        <div className="max-w-2xl mx-auto p-6 space-y-6">
          <StyledCard className="text-center p-8">
            <div className="space-y-4">
              <div className="text-6xl">{event.icon}</div>
              <h2 className="text-2xl font-bold">Practice Complete!</h2>
              <div className="text-4xl font-bold text-fbla-blue">{percentage}%</div>
              <p className="text-gray-600">
                You got {correctAnswers} out of {totalQuestions} questions correct
              </p>
              
              <div className="flex justify-center space-x-4 mt-6">
                <Button onClick={handleRestartPractice} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Practice Again
                </Button>
                <Button onClick={handleBackToPractice}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Practice
                </Button>
              </div>
            </div>
          </StyledCard>
        </div>
      </PageLayout>
    );
  }

  // Main practice interface
  return (
    <PageLayout
      title={event.name}
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
            <Badge className={getDifficultyColor(event.difficulty)}>
              {event.difficulty}
            </Badge>
            <Badge variant="outline">{event.category}</Badge>
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
              {currentQuestion.question}
            </h2>
            
            {/* Answer options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showFeedback}
                  data-testid={`answer-option-${index}`}
                  className={`w-full p-4 text-left rounded-lg border transition-all ${
                    selectedAnswer === index
                      ? showFeedback
                        ? index === currentQuestion.correctAnswer
                          ? 'bg-green-50 border-green-500 text-green-800'
                          : 'bg-red-50 border-red-500 text-red-800'
                        : 'bg-fbla-blue text-white border-fbla-blue'
                      : showFeedback && index === currentQuestion.correctAnswer
                      ? 'bg-green-50 border-green-500 text-green-800'
                      : 'bg-white border-gray-200 hover:border-fbla-blue hover:bg-gray-50'
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