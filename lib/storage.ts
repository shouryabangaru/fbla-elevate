import { supabase, supabaseAdmin } from './supabase';

// User types matching Supabase schema
export interface User {
  id: number;
  uid: string;
  name: string;
  email: string;
  school_id: string;
  points: number;
  streak: number;
  created_at: string;
}

export interface InsertUser {
  uid: string;
  name: string;
  email: string;
  schoolId: string;
}

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByUid(uid: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User | undefined>;
  getLeaderboard(limit?: number): Promise<User[]>;
}

export class SupabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    // Use admin client to bypass RLS for server-side lookups
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return undefined;
    return data as User;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    // Use admin client to bypass RLS for server-side lookups
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('name', username)
      .single();

    if (error || !data) return undefined;
    return data as User;
  }

  async getUserByUid(uid: string): Promise<User | undefined> {
    // Use admin client to bypass RLS for server-side lookups
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('uid', uid)
      .single();

    if (error || !data) return undefined;
    return data as User;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    // Use admin client to bypass RLS for user creation
    const { data, error } = await supabaseAdmin
      .from('users')
      .insert({
        uid: insertUser.uid,
        name: insertUser.name,
        email: insertUser.email,
        school_id: insertUser.schoolId,
        points: 0,
        streak: 0,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating user:', error);
      throw new Error(`Failed to create user: ${error.message}`);
    }

    return data as User;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error || !data) return undefined;
    return data as User;
  }

  async updateUserByUid(uid: string, updates: Partial<User>): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('uid', uid)
      .select()
      .single();

    if (error || !data) return undefined;
    return data as User;
  }

  async getLeaderboard(limit: number = 10): Promise<User[]> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('points', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching leaderboard:', error);
      return [];
    }

    return (data || []) as User[];
  }
}

export const storage = new SupabaseStorage();
