'use client';

import React, { useEffect, useState } from 'react';
import { useSupabase } from '@/hooks/use-supabase';
import { Mentor, Student, getUserSessions } from '@/lib/supabase-utils';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  user_type: 'student' | 'mentor';
  profile: Student | Mentor | null;
}

export function SupabaseExample() {
  const { supabase, isLoading: isClientLoading } = useSupabase();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [sessions, setSessions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase || isClientLoading) return;

    const fetchUserData = async () => {
      try {
        setIsLoading(true);

        // Get current authenticated user
        const { data: { user: authUser } } = await supabase.auth.getUser();

        if (!authUser) {
          setIsLoading(false);
          return;
        }

        // Get user profile from our database
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('clerk_id', authUser.id)
          .single();

        if (userError) {
          throw new Error(`Failed to fetch user: ${userError.message}`);
        }

        if (!userData) {
          setIsLoading(false);
          return;
        }

        // Get user profile based on type
        const profileTable = userData.user_type === 'student' ? 'students' : 'mentors';
        const { data: profileData, error: profileError } = await supabase
          .from(profileTable)
          .select('*')
          .eq('user_id', userData.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          throw new Error(`Failed to fetch profile: ${profileError.message}`);
        }

        // Get user sessions
        const userSessions = await getUserSessions(
          userData.id,
          userData.user_type,
          undefined,
          false
        ).catch(() => []);

        setUser({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          user_type: userData.user_type,
          profile: profileData || null
        });

        setSessions(userSessions);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [supabase, isClientLoading]);

  if (isClientLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-4 border rounded-md">
        <h2 className="text-xl font-semibold mb-4">User not authenticated</h2>
        <p>Please sign in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="p-6 border rounded-md shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">User Profile</h2>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Basic Information</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="text-sm font-medium text-gray-500">Name</div>
          <div>{user.name}</div>
          <div className="text-sm font-medium text-gray-500">Email</div>
          <div>{user.email}</div>
          <div className="text-sm font-medium text-gray-500">User Type</div>
          <div className="capitalize">{user.user_type}</div>
        </div>
      </div>

      {user.profile && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Profile Details</h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(user.profile)
              .filter(([key]) => !['id', 'user_id', 'created_at', 'updated_at'].includes(key))
              .map(([key, value]) => (
                <React.Fragment key={key}>
                  <div className="text-sm font-medium text-gray-500">
                    {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </div>
                  <div>
                    {Array.isArray(value)
                      ? value.join(', ')
                      : typeof value === 'object' && value !== null
                        ? JSON.stringify(value)
                        : String(value)
                    }
                  </div>
                </React.Fragment>
              ))}
          </div>
        </div>
      )}

      {sessions.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-2">Sessions</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sessions.map((session) => (
                  <tr key={session.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {new Date(session.scheduled_date).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{session.subject}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm capitalize">{session.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">${session.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
