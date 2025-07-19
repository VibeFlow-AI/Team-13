'use client';

import { createSupabaseBrowserClient } from './supabase-browser';
import { createSupabaseServerClient } from './supabase-server';
import { type Database } from './database.types';
import { cache } from 'react';
import { User as ClerkUser } from '@supabase/auth-helpers-nextjs';

// Types based on the database schema
export type User = Database['public']['Tables']['users']['Row'];
export type Student = Database['public']['Tables']['students']['Row'];
export type Mentor = Database['public']['Tables']['mentors']['Row'];
export type Session = Database['public']['Tables']['sessions']['Row'];

// Cache the server client to prevent multiple instantiations
export const getServerClient = cache(async () => {
  return createSupabaseServerClient();
});

// Auth related functions
export async function getOrCreateUser(clerkUser: ClerkUser): Promise<User | null> {
  const supabase = createSupabaseBrowserClient();

  // First check if user already exists
  const { data: existingUser, error: fetchError } = await supabase
    .from('users')
    .select('*')
    .eq('clerk_id', clerkUser.id)
    .single();

  if (existingUser) return existingUser;
  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error('Error checking for existing user:', fetchError);
    return null;
  }

  // User doesn't exist, create a new user record
  const newUser = {
    clerk_id: clerkUser.id,
    email: clerkUser.email ?? '',
    name: clerkUser.user_metadata?.name || clerkUser.email?.split('@')[0] || 'User',
    avatar_url: clerkUser.user_metadata?.avatar_url,
    is_active: true,
    is_verified: false,
  };

  // We don't set user_type here because that's done during role selection

  const { data: createdUser, error: createError } = await supabase
    .from('users')
    .insert(newUser)
    .select()
    .single();

  if (createError) {
    console.error('Error creating user:', createError);
    return null;
  }

  return createdUser;
}

// User related functions
export async function getUserById(id: string, useServer = true) {
  const supabase = useServer ? await getServerClient() : createSupabaseBrowserClient();

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }

  return data as User;
}

export async function getUserByClerkId(clerkId: string, useServer = true) {
  const supabase = useServer ? await getServerClient() : createSupabaseBrowserClient();

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('clerk_id', clerkId)
    .single();

  if (error) {
    // If error code is PGRST116, it means no rows were returned
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching user by clerk ID:', error);
    return null;
  }

  return data as User;
}

export async function createUser(userData: Database['public']['Tables']['users']['Insert']) {
  const supabase = createSupabaseBrowserClient();

  const { data, error } = await supabase
    .from('users')
    .insert(userData)
    .select()
    .single();

  if (error) {
    console.error('Error creating user:', error);
    throw new Error(`Failed to create user: ${error.message}`);
  }

  return data as User;
}

export async function updateUser(id: string, userData: Partial<Database['public']['Tables']['users']['Update']>) {
  const supabase = createSupabaseBrowserClient();

  const { data, error } = await supabase
    .from('users')
    .update(userData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating user:', error);
    throw new Error(`Failed to update user: ${error.message}`);
  }

  return data as User;
}

// Student related functions
export async function getStudentByUserId(userId: string, useServer = true) {
  const supabase = useServer ? await getServerClient() : createSupabaseBrowserClient();

  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') { // No rows returned
      return null;
    }
    console.error('Error fetching student:', error);
    throw new Error(`Failed to fetch student: ${error.message}`);
  }

  return data as Student;
}

export async function createStudent(studentData: Database['public']['Tables']['students']['Insert']) {
  const supabase = createSupabaseBrowserClient();

  const { data, error } = await supabase
    .from('students')
    .insert(studentData)
    .select()
    .single();

  if (error) {
    console.error('Error creating student:', error);
    throw new Error(`Failed to create student: ${error.message}`);
  }

  return data as Student;
}

export async function updateStudent(id: string, studentData: Partial<Database['public']['Tables']['students']['Update']>) {
  const supabase = createSupabaseBrowserClient();

  const { data, error } = await supabase
    .from('students')
    .update(studentData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating student:', error);
    throw new Error(`Failed to update student: ${error.message}`);
  }

  return data as Student;
}

// Mentor related functions
export async function getMentorByUserId(userId: string, useServer = true) {
  const supabase = useServer ? await getServerClient() : createSupabaseBrowserClient();

  const { data, error } = await supabase
    .from('mentors')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') { // No rows returned
      return null;
    }
    console.error('Error fetching mentor:', error);
    throw new Error(`Failed to fetch mentor: ${error.message}`);
  }

  return data as Mentor;
}

export async function listAvailableMentors(
  filters?: {
    expertise_areas?: string[];
    preferred_subjects?: string[];
    student_levels?: string[];
    session_formats?: string[];
    min_rating?: number;
    max_session_rate?: number;
  },
  useServer = true
) {
  const supabase = useServer ? await getServerClient() : createSupabaseBrowserClient();

  let query = supabase
    .from('mentors')
    .select('*, users!inner(*)')
    .eq('is_available', true);

  if (filters) {
    if (filters.expertise_areas && filters.expertise_areas.length > 0) {
      query = query.overlaps('expertise_areas', filters.expertise_areas);
    }

    if (filters.preferred_subjects && filters.preferred_subjects.length > 0) {
      query = query.overlaps('preferred_subjects', filters.preferred_subjects);
    }

    if (filters.student_levels && filters.student_levels.length > 0) {
      query = query.overlaps('student_levels', filters.student_levels);
    }

    if (filters.session_formats && filters.session_formats.length > 0) {
      query = query.overlaps('session_formats', filters.session_formats);
    }

    if (filters.min_rating !== undefined) {
      query = query.gte('rating', filters.min_rating);
    }

    if (filters.max_session_rate !== undefined) {
      query = query.lte('session_rate', filters.max_session_rate);
    }
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error listing mentors:', error);
    throw new Error(`Failed to list mentors: ${error.message}`);
  }

  return data;
}

export async function createMentor(mentorData: Database['public']['Tables']['mentors']['Insert']) {
  const supabase = createSupabaseBrowserClient();

  const { data, error } = await supabase
    .from('mentors')
    .insert(mentorData)
    .select()
    .single();

  if (error) {
    console.error('Error creating mentor:', error);
    throw new Error(`Failed to create mentor: ${error.message}`);
  }

  return data as Mentor;
}

export async function updateMentor(id: string, mentorData: Partial<Database['public']['Tables']['mentors']['Update']>) {
  const supabase = createSupabaseBrowserClient();

  const { data, error } = await supabase
    .from('mentors')
    .update(mentorData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating mentor:', error);
    throw new Error(`Failed to update mentor: ${error.message}`);
  }

  return data as Mentor;
}

// Session related functions
export async function getSessionById(id: string, useServer = true) {
  const supabase = useServer ? await getServerClient() : createSupabaseBrowserClient();

  const { data, error } = await supabase
    .from('sessions')
    .select('*, student:students(*), mentor:mentors(*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching session:', error);
    throw new Error(`Failed to fetch session: ${error.message}`);
  }

  return data;
}

export async function getUserSessions(
  userId: string,
  userType: 'student' | 'mentor',
  status?: 'pending_payment' | 'confirmed' | 'completed' | 'cancelled',
  useServer = true
) {
  const supabase = useServer ? await getServerClient() : createSupabaseBrowserClient();

  // First get the profile ID
  const profileTable = userType === 'student' ? 'students' : 'mentors';
  const { data: profile, error: profileError } = await supabase
    .from(profileTable)
    .select('id')
    .eq('user_id', userId)
    .single();

  if (profileError) {
    console.error(`Error fetching ${userType} profile:`, profileError);
    throw new Error(`Failed to fetch ${userType} profile: ${profileError.message}`);
  }

  const profileId = profile.id;
  const profileIdField = userType === 'student' ? 'student_id' : 'mentor_id';

  let query = supabase
    .from('sessions')
    .select('*, student:students(*), mentor:mentors(*)')
    .eq(profileIdField, profileId);

  if (status) {
    query = query.eq('status', status);
  }

  // Order by scheduled_date, with upcoming sessions first
  query = query.order('scheduled_date', { ascending: true });

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching sessions:', error);
    throw new Error(`Failed to fetch sessions: ${error.message}`);
  }

  return data;
}

export async function createSession(sessionData: Database['public']['Tables']['sessions']['Insert']) {
  const supabase = createSupabaseBrowserClient();

  const { data, error } = await supabase
    .from('sessions')
    .insert(sessionData)
    .select()
    .single();

  if (error) {
    console.error('Error creating session:', error);
    throw new Error(`Failed to create session: ${error.message}`);
  }

  return data as Session;
}

export async function updateSession(id: string, sessionData: Partial<Database['public']['Tables']['sessions']['Update']>) {
  const supabase = createSupabaseBrowserClient();

  const { data, error } = await supabase
    .from('sessions')
    .update(sessionData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating session:', error);
    throw new Error(`Failed to update session: ${error.message}`);
  }

  return data as Session;
}

// Auth check utility
export async function checkUserOnboardingStatus(clerkId: string): Promise<{
  hasAccount: boolean;
  userType: 'student' | 'mentor' | null;
  isOnboarded: boolean;
}> {
  const user = await getUserByClerkId(clerkId, false);

  if (!user) {
    return {
      hasAccount: false,
      userType: null,
      isOnboarded: false
    };
  }

  // User exists, check if they have a student or mentor profile
  const userProfile = await getProfileByUserId(user.id, false);

  return {
    hasAccount: true,
    userType: user.user_type,
    isOnboarded: !!userProfile.student || !!userProfile.mentor
  };
}

// Helper to determine where a user should be redirected based on their status
export async function getUserRedirectPath(clerkId: string): Promise<string> {
  const status = await checkUserOnboardingStatus(clerkId);

  if (!status.hasAccount) {
    // User doesn't exist in our database yet
    return '/role-selection';
  }

  if (!status.isOnboarded) {
    // User exists but hasn't completed onboarding
    if (status.userType === 'student') {
      return '/mentee-onboard';
    } else if (status.userType === 'mentor') {
      return '/mentor/onboarding';
    } else {
      // Something went wrong, send them to role selection
      return '/role-selection';
    }
  }

  // User is fully onboarded
  if (status.userType === 'student') {
    return '/mentee/dashboard';
  } else if (status.userType === 'mentor') {
    return '/mentor/dashboard';
  } else {
    // Default fallback
    return '/';
  }
}

export async function cancelSession(
  id: string,
  cancelledById: string,
  reason: string
) {
  return updateSession(id, {
    status: 'cancelled',
    cancelled_by: cancelledById,
    cancellation_reason: reason
  });
}

export async function updateSessionPaymentStatus(
  id: string,
  verified: boolean,
  paymentSlipUrl?: string
) {
  const updateData: Partial<Database['public']['Tables']['sessions']['Update']> = {
    payment_verified: verified
  };

  if (verified) {
    updateData.payment_verified_at = new Date().toISOString();
    updateData.status = 'confirmed';
  }

  if (paymentSlipUrl) {
    updateData.payment_slip_url = paymentSlipUrl;
  }

  return updateSession(id, updateData);
}

// Helper function to safely handle RLS policies
export async function getProfileByUserId(userId: string, useServer = true) {
  const [student, mentor] = await Promise.all([
    getStudentByUserId(userId, useServer).catch(() => null),
    getMentorByUserId(userId, useServer).catch(() => null)
  ]);

  return {
    student,
    mentor,
    profileType: student ? 'student' : mentor ? 'mentor' : null
  };
}
