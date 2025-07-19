"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "@/lib/database.types";

export default function AuthCallback() {
  const router = useRouter();
  const supabase = useSupabaseClient<Database>();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the current session after OAuth callback
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Auth callback error:', error);
          router.push('/auth?error=callback_failed');
          return;
        }

        if (!session?.user) {
          router.push('/auth');
          return;
        }

        // Check if user already has a role assigned
        const { data: userProfile, error: profileError } = await supabase
          .from('users')
          .select('role, isOnboarded')
          .eq('id', session.user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          // PGRST116 is "not found" error, which is expected for new users
          console.error('Error fetching user profile:', profileError);
          router.push('/auth?error=profile_fetch_failed');
          return;
        }

        if (userProfile?.role) {
          // Existing user with role - redirect to appropriate dashboard
          if (userProfile.role === 'MENTOR') {
            router.push('/mentor/dashboard');
          } else if (userProfile.role === 'STUDENT') {
            router.push('/mentee/dashboard');
          } else {
            router.push('/role-selection');
          }
        } else {
          // New user without role - go to role selection
          router.push('/role-selection');
        }
      } catch (error) {
        console.error('Unexpected error in auth callback:', error);
        router.push('/auth?error=unexpected_error');
      }
    };

    handleAuthCallback();
  }, [router, supabase]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
        <h2 className="text-lg font-medium text-gray-900 mb-2">Completing sign in...</h2>
        <p className="text-gray-600">Please wait while we redirect you to your dashboard.</p>
      </div>
    </div>
  );
}
