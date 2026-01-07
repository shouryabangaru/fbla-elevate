# Getting Your Supabase Service Role Key

## Why You Need This

The service role key allows server-side operations to bypass Row Level Security (RLS) policies. This is necessary for admin operations like creating user records during signup.

## Steps to Get Your Service Role Key

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your **fbla-elevate** project
3. Click on **Settings** (gear icon) in the left sidebar
4. Click on **API** in the settings menu
5. Scroll down to **Project API keys**
6. Find the **service_role** key (it's marked as "secret")
7. Click the **Copy** button next to it

## Add to Your .env File

Open your `.env` file and add this line:

```env
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

⚠️ **IMPORTANT**: 
- Never commit this key to version control
- Never expose it in client-side code
- Only use it in server-side API routes

## Your .env File Should Look Like This:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://zndhjvzipchflwltqvvq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## After Adding the Key

1. Restart your development server:
   ```bash
   # Stop the server (Ctrl+C)
   npm run dev
   ```

2. Try signing up again - it should now work!

## Security Note

The service role key has **full access** to your database and bypasses all RLS policies. That's why:
- It should only be used in server-side code (API routes)
- It should never be exposed to the browser
- It's not prefixed with `NEXT_PUBLIC_` (so Next.js won't send it to the browser)
