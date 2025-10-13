import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  uid: text("uid").notNull().unique(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  schoolId: text("school_id").notNull(),
  points: integer("points").default(0),
  streak: integer("streak").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const flashcards = pgTable("flashcards", {
  id: serial("id").primaryKey(),
  eventId: text("event_id").notNull(),
  term: text("term").notNull(),
  definition: text("definition").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  flashcardId: integer("flashcard_id").notNull(),
  correct: boolean("correct").default(false),
  attempts: integer("attempts").default(0),
  lastAttempt: timestamp("last_attempt").defaultNow(),
});

export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  category: text("category").notNull(),
  requirement: integer("requirement").notNull(),
  points: integer("points").default(0),
});

export const userAchievements = pgTable("user_achievements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  achievementId: integer("achievement_id").notNull(),
  earnedAt: timestamp("earned_at").defaultNow(),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id").notNull(),
  questionText: text("question_text").notNull(),
  optionA: text("option_a").notNull(),
  optionB: text("option_b").notNull(),
  optionC: text("option_c").notNull(),
  optionD: text("option_d").notNull(),
  correctAnswer: text("correct_answer").notNull(), // stores 'A', 'B', 'C', or 'D'
  difficulty: text("difficulty").notNull(), // 'Beginner', 'Intermediate', 'Advanced'
  points: integer("points").default(1),
  explanation: text("explanation"), // explanation for the correct answer
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  points: true,
  streak: true,
  createdAt: true,
});

export const insertFlashcardSchema = createInsertSchema(flashcards).omit({
  id: true,
  createdAt: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
  lastAttempt: true,
});

export const insertAchievementSchema = createInsertSchema(achievements).omit({
  id: true,
});

export const insertUserAchievementSchema = createInsertSchema(userAchievements).omit({
  id: true,
  earnedAt: true,
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
  createdAt: true,
});

export const insertQuestionSchema = createInsertSchema(questions).omit({
  id: true,
  createdAt: true,
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  progress: many(userProgress),
  achievements: many(userAchievements),
}));

export const flashcardsRelations = relations(flashcards, ({ many }) => ({
  progress: many(userProgress),
}));

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  user: one(users, { fields: [userProgress.userId], references: [users.id] }),
  flashcard: one(flashcards, { fields: [userProgress.flashcardId], references: [flashcards.id] }),
}));

export const achievementsRelations = relations(achievements, ({ many }) => ({
  userAchievements: many(userAchievements),
}));

export const userAchievementsRelations = relations(userAchievements, ({ one }) => ({
  user: one(users, { fields: [userAchievements.userId], references: [users.id] }),
  achievement: one(achievements, { fields: [userAchievements.achievementId], references: [achievements.id] }),
}));

export const eventsRelations = relations(events, ({ many }) => ({
  questions: many(questions),
}));

export const questionsRelations = relations(questions, ({ one }) => ({
  event: one(events, { fields: [questions.eventId], references: [events.id] }),
}));

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Flashcard = typeof flashcards.$inferSelect;
export type InsertFlashcard = z.infer<typeof insertFlashcardSchema>;
export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
export type Achievement = typeof achievements.$inferSelect;
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;
export type UserAchievement = typeof userAchievements.$inferSelect;
export type InsertUserAchievement = z.infer<typeof insertUserAchievementSchema>;
export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Question = typeof questions.$inferSelect;
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;
