'use client';

import { useEffect, useState } from 'react';
import { useSupabase } from './use-supabase';
import { User, Mentor, Student, getUserByAuthId, getMentorByUserId, getStudentByUserId } from '@/lib/supabase-utils';
import { useUser } from '@supabase/auth-helpers-react';

interface UserProfileData {
  user: User | null;
  mentor: Mentor | null;
  student: Student | null;
  isLoading: boolean;
  error: Error | null;
  userType: 'student' | 'mentor' | null;
  isOnboarded: boolean;
}

/**
 * Hook for accessing the current user's profile data
 *
 * This hook combines authentication state with database profile information
 * to provide a complete view of the current user's profile.
 *
 * @returns User profile data and loading state
 */
export function useUserProfile(): UserProfileData {
  const { supabase, isLoading: isSupabaseLoading } = useSupabase();
  const clerkUser = useUser();

  const [user, setUser] = useState<User | null>(null);
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (isSupabaseLoading || !supabase || !clerkUser) {
      if (!isSupabaseLoading && !clerkUser) {
        // User is not authenticated
        setIsLoading(false);
      }
      return;
    }

    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Get the user record from our database
        const userData = await getUserByAuthId(clerkUser.id, false);

        if (!userData) {
          setIsLoading(false);
          return;
        }

        setUser(userData);

        // Based on user type, fetch the appropriate profile
        if (userData.user_type === 'student') {
          const studentData = await getStudentByUserId(userData.id, false);
          setStudent(studentData);
        } else if (userData.user_type === 'mentor') {
          const mentorData = await getMentorByUserId(userData.id, false);
          setMentor(mentorData);
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch user profile'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [clerkUser, supabase, isSupabaseLoading]);

  // Derive additional user state information
  const userType = user?.user_type || null;
  const isOnboarded = Boolean(
    (userType === 'student' && student) ||
    (userType === 'mentor' && mentor)
  );

  return {
    user,
    mentor,
    student,
    isLoading,
    error,
    userType,
    isOnboarded
  };
}
