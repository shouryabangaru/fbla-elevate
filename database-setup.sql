-- FBLA Elevate Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS public.users (
  id BIGSERIAL PRIMARY KEY,
  uid TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  school_id TEXT NOT NULL,
  points INTEGER DEFAULT 0,
  streak INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Schools table (if you need to reference schools)
CREATE TABLE IF NOT EXISTS public.schools (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events table
CREATE TABLE IF NOT EXISTS public.events (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Flashcards table
CREATE TABLE IF NOT EXISTS public.flashcards (
  id BIGSERIAL PRIMARY KEY,
  event_id TEXT NOT NULL,
  term TEXT NOT NULL,
  definition TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User progress table
CREATE TABLE IF NOT EXISTS public.user_progress (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  flashcard_id BIGINT NOT NULL REFERENCES public.flashcards(id) ON DELETE CASCADE,
  correct BOOLEAN DEFAULT FALSE,
  attempts INTEGER DEFAULT 1,
  last_attempt TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, flashcard_id)
);

-- Achievements table
CREATE TABLE IF NOT EXISTS public.achievements (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  category TEXT NOT NULL,
  requirement INTEGER NOT NULL,
  points INTEGER DEFAULT 0
);

-- User achievements table
CREATE TABLE IF NOT EXISTS public.user_achievements (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  achievement_id BIGINT NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_uid ON public.users(uid);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON public.user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_flashcard_id ON public.user_progress(flashcard_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON public.user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_flashcards_event_id ON public.flashcards(event_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own data" ON public.users
  FOR SELECT USING (auth.uid()::text = uid);

CREATE POLICY "Users can insert their own data" ON public.users
  FOR INSERT WITH CHECK (auth.uid()::text = uid);

CREATE POLICY "Users can update their own data" ON public.users
  FOR UPDATE USING (auth.uid()::text = uid);

-- RLS Policies for user_progress table
CREATE POLICY "Users can view their own progress" ON public.user_progress
  FOR SELECT USING (user_id IN (SELECT id FROM public.users WHERE uid = auth.uid()::text));

CREATE POLICY "Users can insert their own progress" ON public.user_progress
  FOR INSERT WITH CHECK (user_id IN (SELECT id FROM public.users WHERE uid = auth.uid()::text));

CREATE POLICY "Users can update their own progress" ON public.user_progress
  FOR UPDATE USING (user_id IN (SELECT id FROM public.users WHERE uid = auth.uid()::text));

-- RLS Policies for user_achievements table
CREATE POLICY "Users can view their own achievements" ON public.user_achievements
  FOR SELECT USING (user_id IN (SELECT id FROM public.users WHERE uid = auth.uid()::text));

CREATE POLICY "Users can insert their own achievements" ON public.user_achievements
  FOR INSERT WITH CHECK (user_id IN (SELECT id FROM public.users WHERE uid = auth.uid()::text));

-- Public read access for reference tables
CREATE POLICY "Anyone can view schools" ON public.schools
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view events" ON public.events
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view flashcards" ON public.flashcards
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view achievements" ON public.achievements
  FOR SELECT USING (true);

-- Insert some sample schools (optional)
INSERT INTO public.schools (id, name) VALUES
  ('school-1', 'Lincoln High School'),
  ('school-2', 'Washington Academy'),
  ('school-3', 'Jefferson College Prep')
ON CONFLICT (id) DO NOTHING;

-- Success message
SELECT 'Database schema created successfully!' as message;
