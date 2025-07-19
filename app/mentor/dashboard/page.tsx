"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, BookOpen, Clock, FileText, BarChart2 } from "lucide-react";
import { Database } from "@/lib/database.types";

export default function MentorDashboardPage() {
  const router = useRouter();
  const user = useUser();
  const supabase = useSupabaseClient<Database>();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        router.push("/auth");
        return;
      }

      try {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) throw error;
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, router, supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-medium text-gray-900">Mentor Dashboard</h1>
            <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
          </div>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-amber-100 text-amber-800 px-4 py-2 text-center text-sm">
            Development Mode: You are currently signed in as a Mentor (mentor@example.com)
          </div>
        )}
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Welcome Banner */}
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-3xl font-light mb-2">Welcome back, {userData?.fullName || 'Mentor'}</h2>
                <p className="text-blue-100 mb-4">Your mentorship journey continues</p>
                <div className="text-sm text-blue-100">
                  <span className="font-medium">Mentor since:</span> {new Date(userData?.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0">
                  Complete Your Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Upcoming Sessions</p>
                  <h3 className="text-3xl font-semibold text-gray-900">3</h3>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Active Students</p>
                  <h3 className="text-3xl font-semibold text-gray-900">12</h3>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Courses</p>
                  <h3 className="text-3xl font-semibold text-gray-900">4</h3>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Total Hours</p>
                  <h3 className="text-3xl font-semibold text-gray-900">128</h3>
                </div>
                <div className="bg-amber-100 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Schedule */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Upcoming Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-start p-4 border border-gray-100 rounded-lg bg-white hover:shadow-sm transition-shadow">
                    <div className="bg-blue-50 text-blue-600 p-3 rounded-lg mr-4">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 mb-1">Advanced Programming Concepts</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>Tomorrow • 3:00 PM - 4:30 PM</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <div className="flex -space-x-2">
                          <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                          <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                        </div>
                        <span className="text-gray-500">2 Students</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="ghost" className="text-blue-600">
                  View All Sessions
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start gap-2">
                <Calendar className="h-5 w-5" />
                Schedule a Session
              </Button>
              <Button className="w-full justify-start gap-2" variant="outline">
                <FileText className="h-5 w-5" />
                Create Learning Materials
              </Button>
              <Button className="w-full justify-start gap-2" variant="outline">
                <BarChart2 className="h-5 w-5" />
                View Analytics
              </Button>
              <Button className="w-full justify-start gap-2" variant="outline">
                <Users className="h-5 w-5" />
                Manage Students
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
