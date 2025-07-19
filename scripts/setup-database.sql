-- Supabase Database Setup Script
-- This script sets up the database schema and configures Row-Level Security policies

-- ========== TABLE CREATION ==========

-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  clerk_id text,
  email text NOT NULL,
  name text NOT NULL,
  avatar_url text,
  user_type text NOT NULL CHECK (user_type = ANY (ARRAY['student'::text, 'mentor'::text])),
  is_active boolean DEFAULT true,
  is_verified boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT users_pkey PRIMARY KEY (id),
  CONSTRAINT users_email_key UNIQUE (email),
  CONSTRAINT users_clerk_id_key UNIQUE (clerk_id)
);

-- Create mentors table
CREATE TABLE IF NOT EXISTS public.mentors (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  age integer,
  location text NOT NULL,
  current_position text NOT NULL,
  institution_company text NOT NULL,
  years_experience integer NOT NULL,
  bio text NOT NULL,
  expertise_areas text[] NOT NULL,
  preferred_subjects text[] NOT NULL,
  student_levels text[] NOT NULL,
  session_formats text[] DEFAULT ARRAY['One-on-One'::text],
  availability text[] NOT NULL,
  session_rate numeric NOT NULL,
  preferred_language text DEFAULT 'English'::text,
  contact_number text,
  linkedin_url text,
  portfolio_url text,
  credentials text[] DEFAULT ARRAY[]::text[],
  teaching_experience text,
  rating numeric DEFAULT 0.0,
  total_sessions integer DEFAULT 0,
  is_available boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT mentors_pkey PRIMARY KEY (id),
  CONSTRAINT mentors_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE
);

-- Create students table
CREATE TABLE IF NOT EXISTS public.students (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  age integer NOT NULL,
  location text NOT NULL,
  education_level text NOT NULL,
  institution text NOT NULL,
  major text NOT NULL,
  academic_goals text NOT NULL,
  subject_interests text[] NOT NULL,
  proficiency_levels jsonb DEFAULT '{}'::jsonb,
  learning_objectives text NOT NULL,
  contact_preferences text[] DEFAULT ARRAY['email'::text],
  preferred_session_duration integer DEFAULT 60,
  budget_range text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT students_pkey PRIMARY KEY (id),
  CONSTRAINT students_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE
);

-- Create sessions table
CREATE TABLE IF NOT EXISTS public.sessions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  student_id uuid,
  mentor_id uuid,
  scheduled_date timestamp with time zone NOT NULL,
  duration_minutes integer NOT NULL DEFAULT 60,
  status text NOT NULL DEFAULT 'pending_payment'::text CHECK (status = ANY (ARRAY['pending_payment'::text, 'confirmed'::text, 'completed'::text, 'cancelled'::text])),
  subject text NOT NULL,
  session_type text DEFAULT 'one_on_one'::text CHECK (session_type = ANY (ARRAY['one_on_one'::text, 'group'::text])),
  price numeric NOT NULL,
  payment_slip_url text,
  payment_verified boolean DEFAULT false,
  payment_verified_at timestamp with time zone,
  session_notes text,
  meeting_link text,
  student_rating integer CHECK (student_rating >= 1 AND student_rating <= 5),
  mentor_rating integer CHECK (mentor_rating >= 1 AND mentor_rating <= 5),
  student_feedback text,
  mentor_feedback text,
  cancellation_reason text,
  cancelled_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT sessions_pkey PRIMARY KEY (id),
  CONSTRAINT sessions_mentor_id_fkey FOREIGN KEY (mentor_id) REFERENCES public.mentors(id) ON DELETE CASCADE,
  CONSTRAINT sessions_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE,
  CONSTRAINT sessions_cancelled_by_fkey FOREIGN KEY (cancelled_by) REFERENCES public.users(id) ON DELETE SET NULL
);

-- Triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_mentors_updated_at BEFORE UPDATE ON mentors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sessions_updated_at BEFORE UPDATE ON sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========== ROW LEVEL SECURITY POLICIES ==========

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

-- Policies for users table
CREATE POLICY "Users can view their own profile"
ON public.users FOR SELECT
USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update their own profile"
ON public.users FOR UPDATE
USING (auth.uid()::text = id::text);

CREATE POLICY "Anyone can create a new user"
ON public.users FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view all users"
ON public.users FOR SELECT
USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Public access to user profiles"
ON public.users FOR SELECT
USING (true);

-- Policies for mentors table
CREATE POLICY "Mentors can view and update their own profile"
ON public.mentors FOR ALL
USING (auth.uid()::text = user_id::text);

CREATE POLICY "Anyone can view available mentors"
ON public.mentors FOR SELECT
USING (is_available = true);

CREATE POLICY "Admins can manage all mentor profiles"
ON public.mentors
USING (auth.jwt() ->> 'role' = 'service_role');

-- Policies for students table
CREATE POLICY "Students can view and update their own profile"
ON public.students FOR ALL
USING (auth.uid()::text = user_id::text);

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

CREATE POLICY "Admins can manage all student profiles"
ON public.students
USING (auth.jwt() ->> 'role' = 'service_role');

-- Policies for sessions table
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

CREATE POLICY "Students can create sessions"
ON public.sessions FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.students
    WHERE public.students.id = public.sessions.student_id
    AND public.students.user_id::text = auth.uid()::text
  )
);

CREATE POLICY "Admins can manage all sessions"
ON public.sessions
USING (auth.jwt() ->> 'role' = 'service_role');

-- ========== DEVELOPMENT ONLY ==========
-- WARNING: Comment out this section in production!

-- Temporarily disable RLS for easier development
-- ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.mentors DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.students DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.sessions DISABLE ROW LEVEL SECURITY;

-- Insert test data for development
-- INSERT INTO public.users (email, name, user_type)
-- VALUES
--   ('mentor@example.com', 'Test Mentor', 'mentor'),
--   ('student@example.com', 'Test Student', 'student');
