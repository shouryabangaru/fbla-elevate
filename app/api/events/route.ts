import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { events, insertEventSchema } from '@shared/schema';
import { z } from 'zod';

// GET /api/events - Get all events
export async function GET() {
  try {
    const allEvents = await db.select().from(events);
    return NextResponse.json(allEvents);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/events - Create new event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const eventData = insertEventSchema.parse(body);
    const newEvent = await db.insert(events).values(eventData).returning();
    return NextResponse.json(newEvent[0], { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid event data', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Error creating event:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
