import { NextRequest, NextResponse } from 'next/server';
import { fetchPracticeQuestions, fetchRandomQuestions, practiceEventTables } from '@/lib/supabase';

// GET /api/practice/[eventId]/questions
// Query params: random=true&count=25 (optional)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const { eventId } = await params;
    const { searchParams } = new URL(request.url);
    const random = searchParams.get('random') === 'true';
    const count = parseInt(searchParams.get('count') || '25', 10);

    // Check if event exists
    if (!practiceEventTables[eventId]) {
      return NextResponse.json(
        { error: 'Event not found', availableEvents: Object.keys(practiceEventTables) },
        { status: 404 }
      );
    }

    let questions;
    if (random) {
      questions = await fetchRandomQuestions(eventId, count);
    } else {
      questions = await fetchPracticeQuestions(eventId);
    }

    return NextResponse.json({
      eventId,
      count: questions.length,
      questions,
    });
  } catch (error) {
    console.error('Error fetching practice questions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
