"use client"

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { GraduationCap, User } from "lucide-react"
import Link from "next/link"

export default function RoleSelection() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-gray-900 mb-4 tracking-tight">Choose Your Path</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Whether seeking knowledge or sharing expertise, your journey begins here.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Student Card */}
          <Link href="/onboarding/student">
            <Card className="group cursor-pointer border-0 shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] transition-all duration-500 bg-white rounded-2xl overflow-hidden">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl font-semibold text-gray-900 mb-4 tracking-tight">
                  Join as Student
                </CardTitle>
                <p className="text-gray-600 leading-relaxed">
                  Connect with exceptional mentors who will guide your academic journey with expertise and care.
                </p>
              </CardContent>
            </Card>
          </Link>

          {/* Mentor Card */}
          <Link href="/onboarding/mentor">
            <Card className="group cursor-pointer border-0 shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] transition-all duration-500 bg-white rounded-2xl overflow-hidden">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <User className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl font-semibold text-gray-900 mb-4 tracking-tight">
                  Become Mentor
                </CardTitle>
                <p className="text-gray-600 leading-relaxed">
                  Share your knowledge and inspire the next generation of learners through meaningful mentorship.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
