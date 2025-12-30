// ==========================================
// PRACTICE QUESTION TYPES
// ==========================================

// The structure of questions from Supabase
export interface PracticeQuestion {
  id: number;
  question: string;
  answer_choice_a: string;
  answer_choice_b: string;
  answer_choice_c: string;
  answer_choice_d: string;
  correct_answer: string; // 'A', 'B', 'C', or 'D'
  explanation: string;
  topic?: string; // Optional topic/category for the question
}

// Transformed question for UI components
export interface UIQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0, 1, 2, or 3 (index)
  explanation: string;
  topic?: string; // Optional topic/category for the question
}

// ==========================================
// ROLEPLAY TYPES
// ==========================================

// The structure of roleplay scenarios from Supabase
export interface RoleplayScenario {
  id: number;
  background: string;
  scenario: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  objectives?: string[];
}

// Roleplay event configuration
export interface RoleplayEvent {
  id: string;
  name: string;
  description: string;
  scenarioCount: number;
  category: string;
  color: string;
}

// ==========================================
// PRACTICE EVENT TYPES
// ==========================================

export interface PracticeEvent {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Transform Supabase question to UI format
export function transformQuestionToUI(question: PracticeQuestion): UIQuestion {
  const answerMap: Record<string, number> = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
  
  return {
    id: question.id.toString(),
    question: question.question,
    options: [
      question.answer_choice_a,
      question.answer_choice_b,
      question.answer_choice_c,
      question.answer_choice_d,
    ],
    correctAnswer: answerMap[question.correct_answer.toUpperCase()] ?? 0,
    explanation: question.explanation,
    topic: question.topic,
  };
}

// Transform array of questions
export function transformQuestionsToUI(questions: PracticeQuestion[]): UIQuestion[] {
  return questions.map(transformQuestionToUI);
}
