import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function GetStartedCard() {
  return (
    <Card className="w-full max-w-3xl md:px-8 py-10 border-0 shadow-lg bg-white rounded-2xl gap-8 flex flex-col items-center text-center">
      <CardTitle className="text-4xl font-light text-gray-900 mb-4 tracking-tight">Get Started</CardTitle>
      <CardContent className="w-full grid md:grid-cols-2 gap-8">
        {/* Mentor column */}
        <div className="flex flex-col gap-6 items-center">
          <h3 className="text-xl font-medium">Sign Up as a Mentor</h3>
          <Link href="/onboarding/mentor" className="w-full">
            <Button className="w-full bg-black hover:bg-black/90 text-white" size="lg">
              Continue as a Mentor
            </Button>
          </Link>
        </div>
        {/* Student column */}
        <div className="flex flex-col gap-6 items-center">
          <h3 className="text-xl font-medium">Sign Up as a Student</h3>
          <Link href="/onboarding/student" className="w-full">
            <Button className="w-full bg-black hover:bg-black/90 text-white" size="lg">
              Continue as a Student
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
} 