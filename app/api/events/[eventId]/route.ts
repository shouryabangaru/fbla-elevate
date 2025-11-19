import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { events } from '@shared/schema';
import { eq } from 'drizzle-orm';

// GET /api/events/[eventId] - Get specific event by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const { eventId: eventIdParam } = await params;
    const eventId = parseInt(eventIdParam, 10);
    
    if (isNaN(eventId)) {
      return NextResponse.json({ error: 'Invalid event ID' }, { status: 400 });
    }
    const event = await db.select().from(events).where(eq(events.id, eventId));
    
    if (event.length === 0) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }
    
    return NextResponse.json(event[0]);
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
