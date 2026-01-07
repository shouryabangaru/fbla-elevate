"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PageLayout } from '@/components/shared/PageLayout';
import { ArrowLeft, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { PracticeQuestion, UIQuestion, transformQuestionToUI } from '@/lib/types';
import './PracticeModePage.css';

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

  // Loading state
  if (isLoading) {
    return (
      <PageLayout
        title="Loading Practice..."
        subtitle="Preparing your practice session"
      >
        <div className="loading-container">
          <Loader2 className="loading-spinner" />
          <p className="loading-text">Loading practice questions...</p>
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
        <div className="error-container">
          <p className="error-text">{error}</p>
          <button className="retry-button" onClick={() => window.location.reload()}>
            Retry
          </button>
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
        <div className="empty-container">
          <p className="empty-text">Sorry, we couldn't find that practice event.</p>
          <button className="back-button" onClick={handleBackToPractice}>
            <ArrowLeft className="w-4 h-4" />
            Back to Practice
          </button>
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
        <div className="empty-container">
          <p className="empty-text">Questions for this event are coming soon!</p>
          <button className="back-button" onClick={handleBackToPractice}>
            <ArrowLeft className="w-4 h-4" />
            Back to Practice
          </button>
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
        <div className="empty-container">
          <p className="empty-text">Unable to load question. Please try again.</p>
          <div className="flex gap-3">
            <button className="back-button" onClick={() => setCurrentQuestionIndex(0)}>
              Restart Practice
            </button>
            <button className="back-button" onClick={handleBackToPractice}>
              <ArrowLeft className="w-4 h-4" />
              Back to Practice
            </button>
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
      <div className="practice-mode-container">
        {/* Header with progress and event info */}
        <div className="practice-header">
          <button className="back-button" onClick={handleBackToPractice}>
            <ArrowLeft className="w-4 h-4" />
            Back to Practice
          </button>
          
          <div className="badge-group">
            <span className={`difficulty-badge ${eventInfo.difficulty.toLowerCase()}`}>
              {eventInfo.difficulty}
            </span>
            <span className="category-badge">{eventInfo.category}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="progress-section">
          <div className="progress-info">
            <span className="progress-label">Progress</span>
            <span className="progress-count">
              {currentQuestionIndex + 1} / {questions.length}
            </span>
          </div>
          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="question-card">
          <h2 className="question-text">
            {currentQuestion.question}
          </h2>
          
          {/* Answer options */}
          <div className="options-container">
            {currentQuestion.options.map((option, index) => {
              let buttonClass = 'option-button';
              if (showFeedback) {
                buttonClass += ' disabled';
                if (index === currentQuestion.correctAnswer) {
                  buttonClass += ' correct';
                } else if (selectedAnswer === index) {
                  buttonClass += ' incorrect';
                }
              } else if (selectedAnswer === index) {
                buttonClass += ' selected';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showFeedback}
                  className={buttonClass}
                >
                  <div className="option-content">
                    <span className="option-letter">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="option-text">{option}</span>
                    {showFeedback && index === currentQuestion.correctAnswer && (
                      <CheckCircle className="option-icon correct" />
                    )}
                    {showFeedback && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                      <XCircle className="option-icon incorrect" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback section */}
          {showFeedback && (
            <div className={`feedback-section ${isCorrect ? 'correct' : 'incorrect'}`}>
              <div className="feedback-content">
                {isCorrect ? (
                  <CheckCircle className="feedback-icon correct" />
                ) : (
                  <XCircle className="feedback-icon incorrect" />
                )}
                <div>
                  <p className={`feedback-title ${isCorrect ? 'correct' : 'incorrect'}`}>
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </p>
                  <p className="feedback-explanation">{currentQuestion.explanation}</p>
                </div>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="action-buttons">
            <button className="end-button" onClick={handleEndPractice}>
              End Practice
            </button>
            
            {!showFeedback ? (
              <button 
                className="primary-button"
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
              >
                Submit Answer
              </button>
            ) : (
              <button className="primary-button" onClick={handleNextQuestion}>
                {currentQuestionIndex === questions.length - 1 ? 'Finish Practice' : 'Next Question'}
              </button>
            )}
          </div>

          {/* Keyboard shortcuts hint */}
          <div className="keyboard-hints">
            <span className="keyboard-hint">
              <span className="keyboard-key">1-4</span> or <span className="keyboard-key">A-D</span> Select answer
            </span>
            <span className="keyboard-hint">
              <span className="keyboard-key">Enter</span> Submit / Next
            </span>
            <span className="keyboard-hint">
              <span className="keyboard-key">Esc</span> End practice
            </span>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}