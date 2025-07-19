# Supabase Row-Level Security Policies

This document describes the Row-Level Security (RLS) policies needed for our application to function correctly with the Supabase database. These policies define who can read, insert, update, and delete data in each table.

## Why We're Seeing Permission Errors

The `permission denied for schema public` error occurs because:
1. Supabase has RLS enabled by default for new tables
2. No policies exist that allow the anonymous user (used by the client browser) to access the tables
3. Without explicit permissions, all operations are denied

## Setting Up Policies in the Supabase Dashboard

### For the `users` Table

```sql
-- Enable RLS on the users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own profile
CREATE POLICY "Users can view their own profile"
ON public.users FOR SELECT
USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update their own profile"
ON public.users FOR UPDATE
USING (auth.uid() = id);

-- Allow new user registration
CREATE POLICY "Anyone can create a user profile during signup"
ON public.users FOR INSERT
WITH CHECK (true);

-- Admin access
CREATE POLICY "Admins can do anything with users"
ON public.users
USING (auth.jwt() ->> 'role' = 'service_role');
```

### For the `students` Table

```sql
-- Enable RLS on the students table
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- Students can read their own profile
CREATE POLICY "Students can view their own profile"
ON public.students FOR SELECT
USING (auth.uid() = user_id);

-- Students can update their own profile
CREATE POLICY "Students can update their own profile"
ON public.students FOR UPDATE
USING (auth.uid() = user_id);

-- Students can create their profile
CREATE POLICY "Students can create their profile"
ON public.students FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Mentors can view students who have booked sessions with them
CREATE POLICY "Mentors can view students they mentor"
ON public.students FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.sessions s
    JOIN public.mentors m ON s.mentor_id = m.id
    WHERE s.student_id = public.students.id
    AND m.user_id = auth.uid()
  )
);

-- Admin access
CREATE POLICY "Admins can do anything with students"
ON public.students
USING (auth.jwt() ->> 'role' = 'service_role');
```

### For the `mentors` Table

```sql
-- Enable RLS on the mentors table
ALTER TABLE public.mentors ENABLE ROW LEVEL SECURITY;

-- Everyone can view available mentors
CREATE POLICY "Anyone can view available mentors"
ON public.mentors FOR SELECT
USING (is_available = true);

-- Mentors can read their own profile
CREATE POLICY "Mentors can view their own profile"
ON public.mentors FOR SELECT
USING (auth.uid() = user_id);

-- Mentors can update their own profile
CREATE POLICY "Mentors can update their own profile"
ON public.mentors FOR UPDATE
USING (auth.uid() = user_id);

-- Mentors can create their profile
CREATE POLICY "Mentors can create their profile"
ON public.mentors FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Admin access
CREATE POLICY "Admins can do anything with mentors"
ON public.mentors
USING (auth.jwt() ->> 'role' = 'service_role');
```

### For the `sessions` Table

```sql
-- Enable RLS on the sessions table
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

-- Mentors can view sessions they're involved in
CREATE POLICY "Mentors can view their own sessions"
ON public.sessions FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.mentors
    WHERE public.mentors.id = public.sessions.mentor_id
    AND public.mentors.user_id = auth.uid()
  )
);

-- Students can view sessions they're involved in
CREATE POLICY "Students can view their own sessions"
ON public.sessions FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.students
    WHERE public.students.id = public.sessions.student_id
    AND public.students.user_id = auth.uid()
  )
);

-- Students can create sessions
CREATE POLICY "Students can create sessions"
ON public.sessions FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.students
    WHERE public.students.id = public.sessions.student_id
    AND public.students.user_id = auth.uid()
  )
);

-- Mentors and students can update sessions they're involved in
CREATE POLICY "Participants can update sessions"
ON public.sessions FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.mentors
    WHERE public.mentors.id = public.sessions.mentor_id
    AND public.mentors.user_id = auth.uid()
  )
  OR
  EXISTS (
    SELECT 1 FROM public.students
    WHERE public.students.id = public.sessions.student_id
    AND public.students.user_id = auth.uid()
  )
);

-- Admin access
CREATE POLICY "Admins can do anything with sessions"
ON public.sessions
USING (auth.jwt() ->> 'role' = 'service_role');
```

## How to Apply These Policies

1. Go to your Supabase project dashboard
2. Navigate to the "Authentication" section
3. Click on "Policies" in the sidebar
4. For each table, click "New Policy" and either:
   - Use the policy templates and customize them
   - Switch to the SQL editor and paste the policies above
5. Click "Review" and then "Save Policy"

## Testing the Policies

After applying these policies, you can test them by:

1. Signing in with different user accounts
2. Attempting to create/read/update/delete records in each table
3. Confirming that users can only access data according to the defined policies

## Troubleshooting

If you're still experiencing permission errors:

1. Make sure RLS is enabled on all tables
2. Check that the policies are correctly defined
3. Verify that your application is correctly authenticating with Supabase
4. Check that you're using the appropriate user credentials for each operation

## Using Service Role for Admin Operations

For server-side operations that need to bypass RLS (like background jobs or admin functions):

```javascript
// Server-side code only - NEVER expose in client code
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      persistSession: false
    }
  }
);
```

## Temporary Fix for Development

During development, if you're still setting up your application and just need to get things working, you can temporarily disable RLS on your tables:

```sql
-- WARNING: Only use during development
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.students DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentors DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions DISABLE ROW LEVEL SECURITY;
```

**Important**: Always re-enable RLS before deploying to production by using `ENABLE ROW LEVEL SECURITY` instead.