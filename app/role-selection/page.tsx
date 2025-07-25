"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUser } from "@supabase/auth-helpers-react";
import { ChevronLeft, GraduationCap, Users } from "lucide-react";

export default function RoleSelection() {
  const router = useRouter();
  const user = useUser();

  const handleMentorClick = () => {
    router.push("/mentor/onboarding");
  };

  const handleStudentClick = () => {
    router.push("/mentee-onboard");
  };

  const handleBackHome = () => {
    router.push("/");
  };

  // Redirect to auth if not authenticated
  if (!user) {
    router.push("/auth");
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
            Get Started
          </h1>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
            Choose your path to begin your learning or teaching journey
          </p>
          <div className="mt-8 text-sm text-gray-500 font-light">
            Complete onboarding → Access your personalized dashboard → Start your journey
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
                className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-all duration-200 group-hover:scale-105"
              >
                Continue as a Mentor
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
                className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-all duration-200 group-hover:scale-105"
              >
                Continue as a Student
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
