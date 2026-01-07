# Database Setup Instructions

## Error: "Could not find the table 'public.users' in the schema cache"

This error occurs because your Supabase database doesn't have the required tables yet. Follow these steps to set up the database:

## Steps to Fix

### 1. Open Supabase SQL Editor

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: **fbla-elevate**
3. Click on **SQL Editor** in the left sidebar
4. Click **New Query**

### 2. Run the Schema Setup Script

1. Open the file `database-setup.sql` in this project
2. Copy **all** the SQL code from that file
3. Paste it into the Supabase SQL Editor
4. Click **Run** (or press Ctrl+Enter)

### 3. Verify Tables Were Created

After running the script, verify the tables exist:

1. Go to **Table Editor** in the left sidebar
2. You should see these tables:
   - `users`
   - `schools`
   - `events`
   - `flashcards`
   - `user_progress`
   - `achievements`
   - `user_achievements`

### 4. Restart Your Development Server

After the tables are created:

```bash
# Stop the current dev server (Ctrl+C)
# Then restart it
npm run dev
```

## What the Schema Creates

### Tables

- **users**: Stores user profiles (name, email, points, streak)
- **schools**: List of schools
- **events**: FBLA events
- **flashcards**: Study flashcards for each event
- **user_progress**: Tracks user progress on flashcards
- **achievements**: Available achievements
- **user_achievements**: Achievements earned by users

### Security

- Row Level Security (RLS) is enabled on all tables
- Users can only view/edit their own data
- Public read access for reference tables (schools, events, flashcards, achievements)

### Sample Data

The script includes 3 sample schools:
- Lincoln High School
- Washington Academy
- Jefferson College Prep

## Troubleshooting

### "Permission denied" error

If you get permission errors, make sure:
1. You're logged into the correct Supabase project
2. Your Supabase project has the correct permissions
3. The service role key in your `.env` file is correct

### Tables already exist

If some tables already exist, the script uses `IF NOT EXISTS` so it won't fail. However, if you need to start fresh:

```sql
-- WARNING: This will delete all data
DROP TABLE IF EXISTS public.user_achievements CASCADE;
DROP TABLE IF EXISTS public.user_progress CASCADE;
DROP TABLE IF EXISTS public.achievements CASCADE;
DROP TABLE IF EXISTS public.flashcards CASCADE;
DROP TABLE IF EXISTS public.events CASCADE;
DROP TABLE IF EXISTS public.schools CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;
```

Then run the setup script again.

## Next Steps

After setting up the database:
1. Test user registration on your landing page
2. Check that users are being created in the Supabase Table Editor
3. Verify authentication is working correctly

## Need Help?

If you continue having issues:
1. Check the browser console for additional error details
2. Verify your `.env` file has the correct Supabase credentials
3. Make sure your Supabase project is active and not paused
