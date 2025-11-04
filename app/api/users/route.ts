import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/storage';
import { insertUserSchema } from '@shared/schema';
import { z } from 'zod';

// POST /api/users - Create or update user from Firebase Auth
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userData = insertUserSchema.parse(body);
    
    // Check if user already exists
    const existingUser = await storage.getUserByUid(userData.uid);
    if (existingUser) {
      return NextResponse.json(existingUser);
    }
    
    // Create new user
    const newUser = await storage.createUser(userData);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid user data', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
