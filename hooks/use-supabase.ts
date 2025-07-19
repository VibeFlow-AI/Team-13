'use client';

import { useEffect, useState } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase-browser';
import { type SupabaseClient } from '@supabase/supabase-js';
import { type Database } from '@/lib/database.types';

/**
 * Hook for accessing the Supabase client in client components.
 *
 * This hook ensures that the Supabase client is only created once per component lifecycle,
 * and provides a loading state for managing async operations.
 *
 * @example
 * ```tsx
 * const ProfilePage = () => {
 *   const { supabase, isLoading } = useSupabase();
 *   const [profile, setProfile] = useState<Profile | null>(null);
 *
 *   useEffect(() => {
 *     const fetchProfile = async () => {
 *       const { data } = await supabase.from('profiles').select('*').single();
 *       setProfile(data);
 *     };
 *
 *     if (supabase) fetchProfile();
 *   }, [supabase]);
 *
 *   if (isLoading) return <div>Loading...</div>;
 *
 *   return (
 *     <div>
 *       <h1>{profile?.name}</h1>
 *     </div>
 *   );
 * }
 * ```
 */
export function useSupabase() {
  const [supabase, setSupabase] = useState<SupabaseClient<Database> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const client = createSupabaseBrowserClient();
      setSupabase(client);
      setIsLoading(false);
    } catch (err) {
      console.error('Error initializing Supabase client:', err);
      setError(err instanceof Error ? err : new Error('Unknown error initializing Supabase client'));
      setIsLoading(false);
    }
  }, []);

  return { supabase, isLoading, error };
}
