import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/storage';
import { insertUserSchema } from '@shared/schema';
import { z } from 'zod';

// GET /api/users/[uid] - Get user by Firebase UID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ uid: string }> }
) {
  try {
    const { uid } = await params;
    const user = await storage.getUserByUid(uid);
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
