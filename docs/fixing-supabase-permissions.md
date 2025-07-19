# Fixing Supabase Permission Issues

You're seeing errors like `permission denied for schema public` because your Supabase tables have Row Level Security (RLS) enabled, but no policies that allow access to the data.

## Immediate Fix for Development

Follow these steps to temporarily disable RLS for development:

1. Go to the [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Go to SQL Editor
4. Run the following SQL to temporarily disable RLS:

```sql
-- IMPORTANT: Only use for development, never in production!
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentors DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.students DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions DISABLE ROW LEVEL SECURITY;
```

## Proper Solution: Setting Up RLS Policies

For production, you should set up proper RLS policies:

1. Go to the Supabase Dashboard
2. Navigate to "Authentication" → "Policies" 
3. For each table, add appropriate policies:

### Users Table Policies

```sql
-- Anyone can create a new user
CREATE POLICY "Anyone can create a new user"
ON public.users FOR INSERT
WITH CHECK (true);

-- Users can view their own profile
CREATE POLICY "Users can view their own profile"
ON public.users FOR SELECT
USING (auth.uid()::text = id::text);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile"
ON public.users FOR UPDATE
USING (auth.uid()::text = id::text);

-- Public access to user profiles (if needed)
CREATE POLICY "Public access to user profiles"
ON public.users FOR SELECT
USING (true);
```

### Mentors Table Policies

```sql
-- Mentors can manage their own profile
CREATE POLICY "Mentors can manage their own profile"
ON public.mentors FOR ALL
USING (auth.uid()::text = user_id::text);

-- Anyone can view available mentors
CREATE POLICY "Anyone can view available mentors"
ON public.mentors FOR SELECT
USING (is_available = true);
```

### Students Table Policies

```sql
-- Students can manage their own profile
CREATE POLICY "Students can manage their own profile"
ON public.students FOR ALL
USING (auth.uid()::text = user_id::text);

-- Mentors can view their students' profiles
CREATE POLICY "Mentors can view their students' profiles"
ON public.students FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.sessions s
    JOIN public.mentors m ON s.mentor_id = m.id
    WHERE s.student_id = public.students.id
    AND m.user_id::text = auth.uid()::text
    AND s.status IN ('confirmed', 'completed')
  )
);
```

### Sessions Table Policies

```sql
-- Users can view sessions they're involved in
CREATE POLICY "Users can view sessions they're involved in"
ON public.sessions FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.mentors
    WHERE public.mentors.id = public.sessions.mentor_id
    AND public.mentors.user_id::text = auth.uid()::text
  )
  OR
  EXISTS (
    SELECT 1 FROM public.students
    WHERE public.students.id = public.sessions.student_id
    AND public.students.user_id::text = auth.uid()::text
  )
);

-- Users can update sessions they're involved in
CREATE POLICY "Users can update sessions they're involved in"
ON public.sessions FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.mentors
    WHERE public.mentors.id = public.sessions.mentor_id
    AND public.mentors.user_id::text = auth.uid()::text
  )
  OR
  EXISTS (
    SELECT 1 FROM public.students
    WHERE public.students.id = public.sessions.student_id
    AND public.students.user_id::text = auth.uid()::text
  )
);

-- Students can create sessions
CREATE POLICY "Students can create sessions"
ON public.sessions FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.students
    WHERE public.students.id = public.sessions.student_id
    AND public.students.user_id::text = auth.uid()::text
  )
);
```

## Using the Service Role for Server Operations

For server-side operations that need to bypass RLS, use the admin client from `lib/supabase-admin.ts`:

```typescript
import { supabaseAdmin } from '@/lib/supabase-admin';

// This will bypass RLS policies
const { data, error } = await supabaseAdmin
  .from('users')
  .select('*');
```

## Understanding the Error

The error you're seeing:

```
Error checking user type: {code: '42501', details: null, hint: null, message: 'permission denied for schema public'}
```

This happens because:

1. By default, Supabase enables RLS on all tables
2. When RLS is enabled without policies, all access is denied
3. The anonymous key used by the browser client cannot access the tables

Temporarily disabling RLS as described above will resolve this while you're developing, but make sure to implement proper policies before going to production.

## Complete Setup Script

For a full setup of your database with all tables and policies, see the SQL script at: `scripts/setup-database.sql`
