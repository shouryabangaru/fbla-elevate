import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/storage';

// GET /api/leaderboard - Get user leaderboard
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const leaderboard = await storage.getLeaderboard(limit);
    return NextResponse.json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
