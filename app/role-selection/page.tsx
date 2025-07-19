"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUser } from "@supabase/auth-helpers-react";
import { useSupabase } from "@/hooks/use-supabase";
import { ChevronLeft, GraduationCap, Users } from "lucide-react";
import { Database } from "@/lib/database.types";
import { WithErrorBoundary } from "@/components/error-boundary";

function RoleSelection() {
  const router = useRouter();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const { supabase, isLoading: isSupabaseLoading } = useSupabase();

  useEffect(() => {
    const checkUserRole = async () => {
      if (!user || !supabase) {
        if (!user) {
          router.push("/auth");
        }
        return;
      }

      try {
        const { data: userProfile, error } = await supabase
          .from('users')
          .select('user_type')
          .eq('clerk_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error("Error checking user type:", error);
        }

        if (userProfile?.user_type) {
          // User already has a role, redirect to appropriate dashboard
          if (userProfile.user_type === 'mentor') {
            router.push("/mentor/dashboard");
          } else if (userProfile.user_type === 'student') {
            router.push("/mentee/dashboard");
          }
          return;
        }

        setUserRole(null); // User doesn't have a role yet
      } catch (error) {
        console.error("Error checking user role:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUserRole();
  }, [user, router, supabase]);

  const handleMentorClick = async () => {
    if (!user || !supabase) return;

    try {
      setLoading(true);
      // Insert user with mentor role
      // First check if user already exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('clerk_id', user.id)
        .single();

      // If user exists, update instead of insert
      let error;
      if (existingUser) {
        const { error: updateError } = await supabase
          .from('users')
          .update({
            user_type: 'mentor',
            email: user.email ?? '',
            name: user.user_metadata?.name ?? user.email?.split('@')[0] ?? 'User',
          })
          .eq('clerk_id', user.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('users')
          .insert({
            clerk_id: user.id,
            email: user.email ?? '',
            name: user.user_metadata?.name ?? user.email?.split('@')[0] ?? 'User',
            user_type: 'mentor',
            is_active: true,
            is_verified: false
          });
        error = insertError;
      }

      if (error) {
        console.error("Error setting mentor role:", error);
        console.log("Error details:", JSON.stringify(error, null, 2));
        console.log("User data:", JSON.stringify({
          id: user.id,
          email: user.email,
          metadata: user.user_metadata
        }, null, 2));
        return;
      }

      router.push("/mentor/onboarding");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStudentClick = async () => {
    if (!user || !supabase) return;

    try {
      setLoading(true);
      // Insert user with student role
      // First check if user already exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('clerk_id', user.id)
        .single();

      // If user exists, update instead of insert
      let error;
      if (existingUser) {
        const { error: updateError } = await supabase
          .from('users')
          .update({
            user_type: 'student',
            email: user.email ?? '',
            name: user.user_metadata?.name ?? user.email?.split('@')[0] ?? 'User',
          })
          .eq('clerk_id', user.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('users')
          .insert({
            clerk_id: user.id,
            email: user.email ?? '',
            name: user.user_metadata?.name ?? user.email?.split('@')[0] ?? 'User',
            user_type: 'student',
            is_active: true,
            is_verified: false
          });
        error = insertError;
      }

      if (error) {
        console.error("Error setting student role:", error);
        console.log("Error details:", JSON.stringify(error, null, 2));
        console.log("User data:", JSON.stringify({
          id: user.id,
          email: user.email,
          metadata: user.user_metadata
        }, null, 2));
        return;
      }

      router.push("/mentee-onboard");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackHome = () => {
    router.push("/");
  };

  // Show loading spinner while checking user role or waiting for Supabase
  if (loading || isSupabaseLoading || !supabase) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  // Redirect to auth if not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-16">
        {/* Back Navigation */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={handleBackHome}
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to home
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-light text-gray-900 mb-6">
            Welcome to Your Learning Journey
          </h1>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
            To complete your account setup, please choose your role in our platform
          </p>
          <div className="mt-8 text-sm text-gray-500 font-light">
            Select your role → Complete onboarding → Access your personalized dashboard
          </div>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Mentor Card */}
          <Card className="group cursor-pointer bg-gray-50 border-0 hover:shadow-lg transition-all duration-300 overflow-hidden">
            <CardContent className="p-12 text-center">
              <div className="mb-8">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-2xl font-medium text-gray-900 mb-4">
                  Sign Up as a Mentor
                </h2>
                <p className="text-gray-600 font-light leading-relaxed mb-4">
                  Share your expertise and guide students to academic success through personalized mentorship
                </p>
                <div className="text-xs text-gray-500 bg-white px-3 py-2 rounded-md">
                  Setup → Analytics Dashboard → Start Teaching
                </div>
              </div>
              <Button
                onClick={handleMentorClick}
                disabled={loading}
                className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-all duration-200 group-hover:scale-105 disabled:opacity-50"
              >
                {loading ? "Setting up..." : "Continue as a Mentor"}
              </Button>
            </CardContent>
          </Card>

          {/* Student Card */}
          <Card className="group cursor-pointer bg-gray-50 border-0 hover:shadow-lg transition-all duration-300 overflow-hidden">
            <CardContent className="p-12 text-center">
              <div className="mb-8">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-2xl font-medium text-gray-900 mb-4">
                  Sign Up as a Student
                </h2>
                <p className="text-gray-600 font-light leading-relaxed mb-4">
                  Connect with expert mentors who will guide your academic journey with personalized support
                </p>
                <div className="text-xs text-gray-500 bg-white px-3 py-2 rounded-md">
                  Setup → Find Mentors → Book Sessions
                </div>
              </div>
              <Button
                onClick={handleStudentClick}
                disabled={loading}
                className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-all duration-200 group-hover:scale-105 disabled:opacity-50"
              >
                {loading ? "Setting up..." : "Continue as a Student"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Preview */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-4">What's Included</h2>
            <p className="text-gray-600 font-light">Comprehensive tools for effective learning and teaching</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0 p-8">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">For Mentors</h3>
                <p className="text-sm text-gray-600 font-light">Professional teaching platform</p>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="font-light">Manage your teaching schedule</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="font-light">Track student progress analytics</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="font-light">Flexible session management</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="font-light">Professional profile showcase</span>
                </li>
              </ul>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 p-8">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">For Students</h3>
                <p className="text-sm text-gray-600 font-light">Personalized learning experience</p>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="font-light">Find expert mentors in your subjects</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="font-light">Book personalized learning sessions</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="font-light">Track your academic progress</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="font-light">Access to diverse subject expertise</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Wrap the component with error boundary
export default function RoleSelectionWithErrorBoundary() {
  return (
    <WithErrorBoundary>
      <RoleSelection />
    </WithErrorBoundary>
  );
}
