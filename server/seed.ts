import { db } from "./db";
import { events, questions } from "@shared/schema";
import type { InsertEvent, InsertQuestion } from "@shared/schema";
import { eq } from "drizzle-orm";

// FBLA Competitive Events List
const fblaEvents: InsertEvent[] = [
  { name: "Accounting I", description: "Introduction to basic accounting principles and practices" },
  { name: "Accounting II", description: "Advanced accounting concepts and financial statement analysis" },
  { name: "Banking & Financial Systems", description: "Banking operations, financial services, and monetary systems" },
  { name: "Business Management", description: "Management principles, planning, organizing, and controlling business operations" },
  { name: "Business Law", description: "Legal principles affecting business operations and transactions" },
  { name: "Client Service", description: "Customer service skills and client relationship management (roleplay event)" },
  { name: "Economics", description: "Microeconomic and macroeconomic principles and their applications" },
  { name: "Entrepreneurship", description: "Business startup concepts, innovation, and entrepreneurial skills" },
  { name: "Introduction to Business Concepts", description: "Fundamental business concepts and terminology" },
  { name: "Introduction to Financial Math", description: "Mathematical concepts applied to business and finance" },
  { name: "Introduction to Marketing Concepts", description: "Basic marketing principles and consumer behavior" },
  { name: "Introduction to Parliamentary Procedure", description: "Rules and procedures for conducting business meetings" },
  { name: "Management Information Systems", description: "Business information systems and technology management" },
  { name: "Personal Finance", description: "Individual financial planning and money management" },
  { name: "Securities & Investments", description: "Investment principles, securities markets, and portfolio management" },
  { name: "Business Ethics", description: "Ethical decision-making in business environments" },
  { name: "International Business", description: "Global business operations and international trade" },
  { name: "Marketing", description: "Advanced marketing strategies and market analysis" },
  { name: "Sports & Entertainment Marketing", description: "Marketing in the sports and entertainment industries" },
  { name: "Hospitality Management", description: "Hotel, restaurant, and tourism industry management" },
  { name: "Human Resource Management", description: "Personnel management, recruitment, and employee relations" },
  { name: "Public Speaking", description: "Communication skills and presentation techniques" },
  { name: "Future Business Leader", description: "Leadership skills and FBLA knowledge" },
  { name: "Introduction to Event Planning", description: "Event coordination and management fundamentals" },
  { name: "Sales Presentation", description: "Sales techniques and product presentation skills" },
];

export async function seedEvents() {
  console.log("🌱 Seeding FBLA events...");
  
  try {
    // Insert events (on conflict, do nothing to avoid duplicates)
    for (const event of fblaEvents) {
      await db.insert(events)
        .values(event)
        .onConflictDoNothing();
    }
    
    console.log(`✅ Successfully seeded ${fblaEvents.length} FBLA events`);
    
    // Show inserted events
    const insertedEvents = await db.select().from(events);
    console.log(`📊 Total events in database: ${insertedEvents.length}`);
    
    return insertedEvents;
  } catch (error) {
    console.error("❌ Error seeding events:", error);
    throw error;
  }
}

export async function addQuestion(
  eventId: number,
  questionText: string,
  optionA: string,
  optionB: string,
  optionC: string,
  optionD: string,
  correctAnswer: 'A' | 'B' | 'C' | 'D',
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced',
  points: number = 1
): Promise<void> {
  try {
    const newQuestion: InsertQuestion = {
      eventId,
      questionText,
      optionA,
      optionB,
      optionC,
      optionD,
      correctAnswer,
      difficulty,
      points,
    };

    await db.insert(questions).values(newQuestion);
    console.log(`✅ Added question for event ID ${eventId}`);
  } catch (error) {
    console.error("❌ Error adding question:", error);
    throw error;
  }
}

export async function getEventByName(name: string) {
  const event = await db.select().from(events).where(eq(events.name, name));
  return event[0] || null;
}

// Function to run the seeding (can be called directly)
export async function runSeed() {
  try {
    await seedEvents();
    console.log("🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("💥 Seeding failed:", error);
    process.exit(1);
  }
}

// Run seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runSeed();
}