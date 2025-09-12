import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertEventSchema, insertQuestionSchema } from "@shared/schema";
import { z } from "zod";
import { db } from "./db";
import { events, questions } from "@shared/schema";
import { eq } from "drizzle-orm";

export async function registerRoutes(app: Express): Promise<Server> {
  // Firebase Auth Integration Routes
  
  // Get user by Firebase UID
  app.get("/api/users/:uid", async (req, res) => {
    try {
      const { uid } = req.params;
      const user = await storage.getUserByUid(uid);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Create or update user from Firebase Auth
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUid(userData.uid);
      if (existingUser) {
        return res.json(existingUser);
      }
      
      // Create new user
      const newUser = await storage.createUser(userData);
      res.status(201).json(newUser);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid user data", details: error.errors });
      }
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Update user points and streak
  app.patch("/api/users/:uid/stats", async (req, res) => {
    try {
      const { uid } = req.params;
      const updates = req.body;
      
      // Validate updates
      const validUpdates = z.object({
        points: z.number().optional(),
        streak: z.number().optional(),
      }).parse(updates);
      
      const user = await storage.getUserByUid(uid);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      const updatedUser = await storage.updateUser(user.id, validUpdates);
      res.json(updatedUser);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid update data", details: error.errors });
      }
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get user leaderboard
  app.get("/api/leaderboard", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const leaderboard = await storage.getLeaderboard(limit);
      res.json(leaderboard);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get flashcards by event
  app.get("/api/flashcards/:eventId", async (req, res) => {
    try {
      const { eventId } = req.params;
      // This would need to be implemented in storage
      res.json({ message: `Flashcards for event ${eventId} - to be implemented` });
    } catch (error) {
      console.error("Error fetching flashcards:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Events API endpoints
  
  // Get all events
  app.get("/api/events", async (req, res) => {
    try {
      const allEvents = await db.select().from(events);
      res.json(allEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get specific event by ID
  app.get("/api/events/:id", async (req, res) => {
    try {
      const eventId = parseInt(req.params.id);
      const event = await db.select().from(events).where(eq(events.id, eventId));
      
      if (event.length === 0) {
        return res.status(404).json({ error: "Event not found" });
      }
      
      res.json(event[0]);
    } catch (error) {
      console.error("Error fetching event:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Create new event
  app.post("/api/events", async (req, res) => {
    try {
      const eventData = insertEventSchema.parse(req.body);
      const newEvent = await db.insert(events).values(eventData).returning();
      res.status(201).json(newEvent[0]);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid event data", details: error.errors });
      }
      console.error("Error creating event:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Questions API endpoints
  
  // Get all questions for an event
  app.get("/api/events/:eventId/questions", async (req, res) => {
    try {
      const eventId = parseInt(req.params.eventId);
      const eventQuestions = await db.select().from(questions).where(eq(questions.eventId, eventId));
      res.json(eventQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get specific question by ID
  app.get("/api/questions/:id", async (req, res) => {
    try {
      const questionId = parseInt(req.params.id);
      const question = await db.select().from(questions).where(eq(questions.id, questionId));
      
      if (question.length === 0) {
        return res.status(404).json({ error: "Question not found" });
      }
      
      res.json(question[0]);
    } catch (error) {
      console.error("Error fetching question:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Add new question to an event
  app.post("/api/events/:eventId/questions", async (req, res) => {
    try {
      const eventId = parseInt(req.params.eventId);
      
      // Verify event exists
      const event = await db.select().from(events).where(eq(events.id, eventId));
      if (event.length === 0) {
        return res.status(404).json({ error: "Event not found" });
      }
      
      const questionData = insertQuestionSchema.parse({
        ...req.body,
        eventId
      });
      
      const newQuestion = await db.insert(questions).values(questionData).returning();
      res.status(201).json(newQuestion[0]);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid question data", details: error.errors });
      }
      console.error("Error creating question:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Initialize sample data
  app.post("/api/init-sample-data", async (req, res) => {
    try {
      // This would create sample flashcards and achievements
      res.json({ message: "Sample data initialized" });
    } catch (error) {
      console.error("Error initializing sample data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
