import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/storage';
import { z } from 'zod';

// PATCH /api/users/[uid]/stats - Update user points and streak
export async function PATCH(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  try {
    const { uid } = params;
    const body = await request.json();
    
    // Validate updates
    const validUpdates = z.object({
      points: z.number().optional(),
      streak: z.number().optional(),
    }).parse(body);
    
    const user = await storage.getUserByUid(uid);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    const updatedUser = await storage.updateUser(user.id, validUpdates);
    return NextResponse.json(updatedUser);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid update data', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
