import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { questions } from '@shared/schema';
import { eq } from 'drizzle-orm';

// GET /api/questions/[questionId] - Get specific question by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ questionId: string }> }
) {
  try {
    const { questionId: questionIdParam } = await params;
    const questionId = parseInt(questionIdParam, 10);
    
    if (isNaN(questionId)) {
      return NextResponse.json({ error: 'Invalid question ID' }, { status: 400 });
    }
    const question = await db.select().from(questions).where(eq(questions.id, questionId));
    
    if (question.length === 0) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 });
    }
    
    return NextResponse.json(question[0]);
  } catch (error) {
    console.error('Error fetching question:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
