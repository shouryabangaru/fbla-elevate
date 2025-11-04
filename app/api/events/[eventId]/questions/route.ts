import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { questions, events, insertQuestionSchema } from '@shared/schema';
import { eq, sql } from 'drizzle-orm';
import { z } from 'zod';

// GET /api/events/[eventId]/questions - Get all questions for an event
export async function GET(
  request: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    const eventId = parseInt(params.eventId);
    const eventQuestions = await db
      .select()
      .from(questions)
      .where(eq(questions.eventId, eventId))
      .orderBy(sql`RANDOM()`);
    return NextResponse.json(eventQuestions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/events/[eventId]/questions - Add new question to an event
export async function POST(
  request: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    const eventId = parseInt(params.eventId);
    
    // Verify event exists
    const event = await db.select().from(events).where(eq(events.id, eventId));
    if (event.length === 0) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }
    
    const body = await request.json();
    const questionData = insertQuestionSchema.parse({
      ...body,
      eventId
    });
    
    const newQuestion = await db.insert(questions).values(questionData).returning();
    return NextResponse.json(newQuestion[0], { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid question data', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Error creating question:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
