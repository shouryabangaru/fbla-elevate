import { z } from 'zod';

// ==========================================
// USER TYPES
// ==========================================

export interface User {
  id: number;
  uid: string;
  name: string;
  email: string;
  school_id: string;
  points: number;
  streak: number;
  created_at: string;
}

export interface InsertUser {
  uid: string;
  name: string;
  email: string;
  schoolId: string;
}

export const insertUserSchema = z.object({
  uid: z.string().min(1, 'UID is required'),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  schoolId: z.string().min(1, 'School ID is required'),
});

// ==========================================
// FLASHCARD TYPES
// ==========================================

export interface Flashcard {
  id: number;
  event_id: string;
  term: string;
  definition: string;
  created_at: string;
}

export interface InsertFlashcard {
  eventId: string;
  term: string;
  definition: string;
}

export const insertFlashcardSchema = z.object({
  eventId: z.string().min(1),
  term: z.string().min(1),
  definition: z.string().min(1),
});

// ==========================================
// USER PROGRESS TYPES
// ==========================================

export interface UserProgress {
  id: number;
  user_id: number;
  flashcard_id: number;
  correct: boolean;
  attempts: number;
  last_attempt: string;
}

export interface InsertUserProgress {
  userId: number;
  flashcardId: number;
  correct?: boolean;
  attempts?: number;
}

export const insertUserProgressSchema = z.object({
  userId: z.number(),
  flashcardId: z.number(),
  correct: z.boolean().optional(),
  attempts: z.number().optional(),
});

// ==========================================
// ACHIEVEMENT TYPES
// ==========================================

export interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: string;
  category: string;
  requirement: number;
  points: number;
}

export interface InsertAchievement {
  name: string;
  description: string;
  icon: string;
  category: string;
  requirement: number;
  points?: number;
}

export const insertAchievementSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().min(1),
  category: z.string().min(1),
  requirement: z.number(),
  points: z.number().optional(),
});

// ==========================================
// USER ACHIEVEMENT TYPES
// ==========================================

export interface UserAchievement {
  id: number;
  user_id: number;
  achievement_id: number;
  earned_at: string;
}

export interface InsertUserAchievement {
  userId: number;
  achievementId: number;
}

export const insertUserAchievementSchema = z.object({
  userId: z.number(),
  achievementId: z.number(),
});

// ==========================================
// EVENT TYPES
// ==========================================

export interface Event {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
}

export interface InsertEvent {
  name: string;
  description?: string;
}

export const insertEventSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

// ==========================================
// QUESTION TYPES
// ==========================================

export interface Question {
  id: number;
  event_id: number;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
  difficulty: string;
  points: number;
  explanation: string | null;
  created_at: string;
}

export interface InsertQuestion {
  eventId: number;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  difficulty: string;
  points?: number;
  explanation?: string;
}

export const insertQuestionSchema = z.object({
  eventId: z.number(),
  questionText: z.string().min(1),
  optionA: z.string().min(1),
  optionB: z.string().min(1),
  optionC: z.string().min(1),
  optionD: z.string().min(1),
  correctAnswer: z.enum(['A', 'B', 'C', 'D']),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  points: z.number().optional(),
  explanation: z.string().optional(),
});
