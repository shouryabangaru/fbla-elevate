import { useState, useEffect, useCallback } from 'react';
import { PageLayout } from '@/components/shared/PageLayout';
import { StyledCard } from '@/components/shared/StyledCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, Target, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import './PracticeTestPage.css';

interface Question {
  id: number;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

interface TestResult {
  questionId: number;
  question: string;
  userAnswer: 'A' | 'B' | 'C' | 'D' | null;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  isCorrect: boolean;
  explanation: string;
}

const events = [
  { id: 'accounting', name: 'Accounting' },
  { id: 'business-law', name: 'Business Law' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'economics', name: 'Economics' },
  { id: 'entrepreneurship', name: 'Entrepreneurship' },
  { id: 'personal-finance', name: 'Personal Finance' },
  { id: 'cybersecurity', name: 'Cybersecurity' },
  { id: 'business-management', name: 'Business Management' }
];

const questionBanks: Record<string, Question[]> = {
  'accounting': [
    {
      id: 1,
      question: "What is the basic accounting equation?",
      options: {
        A: "Assets = Liabilities + Owner's Equity",
        B: "Assets = Liabilities - Owner's Equity",
        C: "Assets + Liabilities = Owner's Equity",
        D: "Assets - Owner's Equity = Liabilities"
      },
      correctAnswer: 'A',
      explanation: "The fundamental accounting equation states that Assets = Liabilities + Owner's Equity. This equation must always balance and forms the foundation of double-entry bookkeeping."
    },
    {
      id: 2,
      question: "Which financial statement shows a company's financial position at a specific point in time?",
      options: {
        A: "Income Statement",
        B: "Cash Flow Statement",
        C: "Balance Sheet",
        D: "Statement of Retained Earnings"
      },
      correctAnswer: 'C',
      explanation: "The Balance Sheet shows a company's financial position at a specific point in time by listing assets, liabilities, and owner's equity."
    },
    {
      id: 3,
      question: "What is depreciation?",
      options: {
        A: "An increase in asset value",
        B: "The allocation of an asset's cost over its useful life",
        C: "A type of liability",
        D: "Cash payment for expenses"
      },
      correctAnswer: 'B',
      explanation: "Depreciation is the systematic allocation of an asset's cost over its useful life, reflecting the asset's declining value due to wear and tear."
    },
    {
      id: 4,
      question: "Which account type increases with a credit entry?",
      options: {
        A: "Assets",
        B: "Expenses",
        C: "Liabilities",
        D: "Dividends"
      },
      correctAnswer: 'C',
      explanation: "Liabilities increase with credit entries. The normal balance for liability accounts is a credit balance."
    },
    {
      id: 5,
      question: "What is the purpose of the trial balance?",
      options: {
        A: "To calculate net income",
        B: "To verify that debits equal credits",
        C: "To prepare tax returns",
        D: "To determine cash flow"
      },
      correctAnswer: 'B',
      explanation: "The trial balance is used to verify that total debits equal total credits in the accounting system, ensuring mathematical accuracy."
    }
  ],
  'business-law': [
    {
      id: 1,
      question: "What are the essential elements of a valid contract?",
      options: {
        A: "Offer and acceptance only",
        B: "Offer, acceptance, consideration, and legal capacity",
        C: "Written agreement and signatures",
        D: "Witnesses and notarization"
      },
      correctAnswer: 'B',
      explanation: "A valid contract requires four essential elements: offer, acceptance, consideration (something of value exchanged), and legal capacity of the parties."
    },
    {
      id: 2,
      question: "What is a tort?",
      options: {
        A: "A type of contract",
        B: "A criminal offense",
        C: "A civil wrong causing harm to another",
        D: "A business license"
      },
      correctAnswer: 'C',
      explanation: "A tort is a civil wrong that causes harm to another person or their property, resulting in legal liability for the person who commits the tortious act."
    },
    {
      id: 3,
      question: "Which type of business organization provides limited liability to its owners?",
      options: {
        A: "Sole Proprietorship",
        B: "General Partnership",
        C: "Corporation",
        D: "All of the above"
      },
      correctAnswer: 'C',
      explanation: "A corporation provides limited liability protection to its shareholders, meaning their personal assets are generally protected from business debts and liabilities."
    },
    {
      id: 4,
      question: "What is intellectual property?",
      options: {
        A: "Physical property owned by businesses",
        B: "Creations of the mind protected by law",
        C: "Financial investments",
        D: "Real estate holdings"
      },
      correctAnswer: 'B',
      explanation: "Intellectual property refers to creations of the mind, such as inventions, literary works, designs, and symbols, that are protected by patents, copyrights, and trademarks."
    },
    {
      id: 5,
      question: "What constitutes breach of contract?",
      options: {
        A: "Failure to perform obligations as agreed",
        B: "Requesting contract modifications",
        C: "Paying late fees",
        D: "Verbal disagreements"
      },
      correctAnswer: 'A',
      explanation: "Breach of contract occurs when one party fails to perform their obligations as specified in the contract agreement."
    }
  ]
};

export default function PracticeTestPage() {
  const [selectedEvent, setSelectedEvent] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [testStartTime, setTestStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const { toast } = useToast();

  const currentQuestions = selectedEvent ? questionBanks[selectedEvent] || [] : [];
  const currentQuestion = currentQuestions[currentQuestionIndex];

  // Timer effect
  useEffect(() => {
    if (testStartTime && !showResults) {
      const interval = setInterval(() => {
        setElapsedTime(Math.floor((new Date().getTime() - testStartTime.getTime()) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [testStartTime, showResults]);

  // Keyboard navigation
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (showResults) return;

    const key = event.key.toLowerCase();
    
    // Answer selection
    if (['a', 'b', 'c', 'd'].includes(key)) {
      setSelectedAnswer(key.toUpperCase() as 'A' | 'B' | 'C' | 'D');
    }
    
    // Navigation
    if ((key === ' ' || key === 'enter') && selectedAnswer) {
      event.preventDefault();
      handleNextQuestion();
    }
  }, [selectedAnswer, showResults]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const startTest = () => {
    if (!selectedEvent) {
      toast({
        title: 'Please Select an Event',
        description: 'Choose an FBLA event to begin your practice test.',
        variant: 'destructive'
      });
      return;
    }

    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setUserAnswers(new Array(currentQuestions.length).fill(null));
    setShowResults(false);
    setTestStartTime(new Date());
    setElapsedTime(0);
  };

  const handleAnswerSelect = (answer: 'A' | 'B' | 'C' | 'D') => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (!selectedAnswer) return;

    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setUserAnswers(newAnswers);

    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      endTest(newAnswers);
    }
  };

  const endTest = (finalAnswers?: (string | null)[]) => {
    const answers = finalAnswers || userAnswers;
    if (selectedAnswer && currentQuestionIndex < currentQuestions.length) {
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = selectedAnswer;
      setUserAnswers(newAnswers);
    }
    setShowResults(true);
  };

  const calculateResults = (): { score: number; percentage: number; results: TestResult[] } => {
    const results: TestResult[] = currentQuestions.map((question, index) => {
      const userAnswer = userAnswers[index] as 'A' | 'B' | 'C' | 'D' | null;
      const isCorrect = userAnswer === question.correctAnswer;
      
      return {
        questionId: question.id,
        question: question.question,
        userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        explanation: question.explanation
      };
    });

    const score = results.filter(r => r.isCorrect).length;
    const percentage = Math.round((score / currentQuestions.length) * 100);

    return { score, percentage, results };
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTest = () => {
    setSelectedEvent('');
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setShowResults(false);
    setTestStartTime(null);
    setElapsedTime(0);
  };

  if (showResults) {
    const { score, percentage, results } = calculateResults();
    
    return (
      <PageLayout
        title="Practice Test Results"
        subtitle={`${events.find(e => e.id === selectedEvent)?.name} - Test Complete`}
      >
        <div className="practice-test-container">
          <div className="results-header">
            <StyledCard className="results-summary">
              <div className="results-stats">
                <div className="score-display">
                  <div className="score-circle">
                    <span className="score-percentage">{percentage}%</span>
                  </div>
                  <div className="score-details">
                    <div className="score-text">
                      {score} out of {currentQuestions.length} correct
                    </div>
                    <div className="time-text">
                      Completed in {formatTime(elapsedTime)}
                    </div>
                  </div>
                </div>
                <Button onClick={resetTest} className="restart-button">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Take Another Test
                </Button>
              </div>
            </StyledCard>
          </div>

          <div className="results-breakdown">
            <h3 className="breakdown-title">Question Review</h3>
            {results.map((result, index) => (
              <StyledCard key={result.questionId} className={`result-card ${result.isCorrect ? 'correct' : 'incorrect'}`}>
                <div className="result-header">
                  <span className="question-number">Question {index + 1}</span>
                  {result.isCorrect ? (
                    <CheckCircle className="result-icon correct-icon" />
                  ) : (
                    <XCircle className="result-icon incorrect-icon" />
                  )}
                </div>
                
                <div className="result-question">
                  {result.question}
                </div>
                
                <div className="result-answers">
                  <div className={`answer-display ${result.userAnswer ? (result.isCorrect ? 'correct-answer' : 'incorrect-answer') : 'no-answer'}`}>
                    <span className="answer-label">Your Answer:</span>
                    <span className="answer-value">
                      {result.userAnswer ? `${result.userAnswer}` : 'No answer selected'}
                    </span>
                  </div>
                  
                  {!result.isCorrect && (
                    <div className="answer-display correct-answer">
                      <span className="answer-label">Correct Answer:</span>
                      <span className="answer-value">{result.correctAnswer}</span>
                    </div>
                  )}
                </div>
                
                <div className="result-explanation">
                  <strong>Explanation:</strong> {result.explanation}
                </div>
              </StyledCard>
            ))}
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!selectedEvent || currentQuestions.length === 0) {
    return (
      <PageLayout
        title="Practice Test"
        subtitle="Test your knowledge with FBLA competitive event practice questions"
      >
        <div className="practice-test-container">
          <StyledCard className="event-selection-card">
            <div className="selection-content">
              <div className="selection-header">
                <BookOpen className="selection-icon" />
                <h3 className="selection-title">Choose Your Test Event</h3>
              </div>
              
              <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                <SelectTrigger className="event-select">
                  <SelectValue placeholder="Select an FBLA event to test" />
                </SelectTrigger>
                <SelectContent>
                  {events.map((event) => (
                    <SelectItem key={event.id} value={event.id}>
                      {event.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button onClick={startTest} className="start-test-button" disabled={!selectedEvent}>
                <Target className="w-4 h-4 mr-2" />
                Start Practice Test
              </Button>
              
              {selectedEvent && currentQuestions.length > 0 && (
                <div className="test-preview">
                  <p className="preview-text">
                    This test contains <strong>{currentQuestions.length} questions</strong> about {events.find(e => e.id === selectedEvent)?.name}.
                  </p>
                  <p className="preview-instructions">
                    Use A/B/C/D keys or click to select answers. Press Space or Enter to continue.
                  </p>
                </div>
              )}
            </div>
          </StyledCard>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={`${events.find(e => e.id === selectedEvent)?.name} Practice Test`}
      subtitle={`Question ${currentQuestionIndex + 1} of ${currentQuestions.length}`}
    >
      <div className="practice-test-container">
        {/* Header with progress and controls */}
        <div className="test-header">
          <div className="test-progress">
            <Progress 
              value={(currentQuestionIndex / currentQuestions.length) * 100} 
              className="progress-bar"
            />
            <div className="progress-info">
              <span className="progress-text">
                {currentQuestionIndex + 1} / {currentQuestions.length}
              </span>
              <div className="test-timer">
                <Clock className="timer-icon" />
                <span>{formatTime(elapsedTime)}</span>
              </div>
            </div>
          </div>
          
          <Button onClick={() => endTest()} variant="destructive" className="end-test-button">
            End Test
          </Button>
        </div>

        {/* Question Card */}
        <StyledCard className="question-card">
          <div className="question-content">
            <div className="question-header">
              <span className="question-number">Question {currentQuestionIndex + 1}</span>
            </div>
            
            <h2 className="question-text">{currentQuestion.question}</h2>
            
            <div className="answer-options">
              {Object.entries(currentQuestion.options).map(([key, value]) => (
                <button
                  key={key}
                  className={`answer-option ${selectedAnswer === key ? 'selected' : ''}`}
                  onClick={() => handleAnswerSelect(key as 'A' | 'B' | 'C' | 'D')}
                >
                  <span className="option-letter">{key}</span>
                  <span className="option-text">{value}</span>
                </button>
              ))}
            </div>
            
            <div className="question-navigation">
              <Button
                onClick={handleNextQuestion}
                disabled={!selectedAnswer}
                className="next-button"
              >
                {currentQuestionIndex === currentQuestions.length - 1 ? 'Finish Test' : 'Next Question'}
              </Button>
            </div>
            
            <div className="keyboard-hint">
              Press A/B/C/D to select • Space/Enter to continue
            </div>
          </div>
        </StyledCard>
      </div>
    </PageLayout>
  );
}