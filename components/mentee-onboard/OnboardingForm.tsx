"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "@/lib/database.types";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, User, GraduationCap, Target, ArrowLeft, ArrowRight, Sparkles, ChevronLeft } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  age: string;
  location: string;
  educationLevel: string;
  institution: string;
  major: string;
  goals: string;
  subjects: string;
  proficiency: string;
  objectives: string;
}

export default function OnboardingForm() {
  const router = useRouter();
  const user = useUser();
  const supabase = useSupabaseClient<Database>();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    age: "",
    location: "",
    educationLevel: "",
    institution: "",
    major: "",
    goals: "",
    subjects: "",
    proficiency: "",
    objectives: "",
  });

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => {
    if (step === 1) {
      router.push("/role-selection");
    } else {
      setStep((s) => Math.max(s - 1, 1));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      if (!user) {
        throw new Error("You must be logged in to complete the onboarding process");
      }

      // First save/update the user record with student role
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw new Error(`Error fetching user: ${fetchError.message}`);
      }

      // If user exists, update instead of insert
      let error;
      if (existingUser) {
        const { error: updateError } = await supabase
          .from('users')
          .update({
            user_type: 'student',
            email: user.email ?? form.email,
            name: form.name || (user.email?.split('@')[0] ?? 'User'),
            clerk_id: user.id,
          })
          .eq('id', user.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('users')
          .insert({
            id: user.id,
            clerk_id: user.id,
            email: user.email ?? form.email,
            name: form.name || (user.email?.split('@')[0] ?? 'User'),
            user_type: 'student',
            is_active: true,
            is_verified: false
          });
        error = insertError;
      }

      if (error) {
        throw new Error(`Error saving user data: ${error.message}`);
      }

      // TODO: Save the detailed student profile data to the students table
      console.log(form);

      // Show success overlay
      setShowSuccess(true);

      // Wait a moment before navigation
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Navigate to dashboard
      router.push("/mentee-dashboard");
    } catch (err) {
      console.error("Error completing onboarding:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      setIsSubmitting(false);
      // Wait a moment before clearing error to ensure user sees it
      setTimeout(() => setError(null), 5000);
    }
  };

  const stepIcons = [User, GraduationCap, Target];
  const stepTitles = ["Personal Info", "Academic Background", "Learning Goals"];
  const progress = (step / 3) * 100;

  return (
    <div className="min-h-screen bg-white relative">
      {/* Error Message */}
      {error && (
        <div className="fixed top-4 right-4 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded shadow-lg z-50 max-w-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Success Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-light text-gray-900 mb-2">Welcome aboard!</h2>
            <p className="text-gray-600 font-light">Taking you to your dashboard...</p>
          </div>
        </div>
      )}

      <div className="container mx-auto px-6 py-16">
        {/* Back to Role Selection */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/role-selection")}
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to role selection
          </Button>
        </div>

        {/* Hero Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-gray-600 text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            Welcome to Your Learning Journey
          </div>
          <h1 className="text-4xl font-light text-gray-900 mb-4">
            Let's Get You Started
          </h1>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
            Tell us about yourself so we can personalize your mentoring experience
          </p>
        </div>

        {/* Step Indicator */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200 -translate-y-1/2 z-0">
              <div
                className="h-full bg-blue-600 transition-all duration-500 ease-out"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              ></div>
            </div>

            {stepTitles.map((title, index) => {
              const stepNumber = index + 1;
              const isActive = stepNumber === step;
              const isCompleted = stepNumber < step;
              const StepIcon = stepIcons[index];

              return (
                <div key={stepNumber} className="flex flex-col items-center relative z-10">
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300
                    ${isCompleted
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : isActive
                      ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                      : 'bg-white border-gray-300 text-gray-400'
                    }
                  `}>
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <StepIcon className="h-5 w-5" />
                    )}
                  </div>
                  <span className={`
                    mt-4 text-sm font-medium transition-colors duration-300
                    ${isActive ? 'text-gray-900' : 'text-gray-500'}
                  `}>
                    {title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Card */}
        <div className="max-w-2xl mx-auto">
          <Card className="border border-gray-200 shadow-sm bg-white">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-light text-gray-900">
                {stepTitles[step - 1]}
              </CardTitle>
              <CardDescription className="text-base text-gray-600 font-light">
                Step {step} of 3 - Help us understand you better
              </CardDescription>
              <div className="mt-6">
                <Progress value={progress} className="h-1" />
              </div>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              {step === 1 && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-900">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="h-12 border-gray-300 focus:border-blue-600 focus:ring-blue-600 transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-900">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="h-12 border-gray-300 focus:border-blue-600 focus:ring-blue-600 transition-colors"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="age" className="text-sm font-medium text-gray-900">
                        Age *
                      </Label>
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        value={form.age}
                        onChange={handleChange}
                        placeholder="25"
                        className="h-12 border-gray-300 focus:border-blue-600 focus:ring-blue-600 transition-colors"
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="location" className="text-sm font-medium text-gray-900">
                        Location *
                      </Label>
                      <Input
                        id="location"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        placeholder="City, Country"
                        className="h-12 border-gray-300 focus:border-blue-600 focus:ring-blue-600 transition-colors"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="space-y-3">
                    <Label htmlFor="educationLevel" className="text-sm font-medium text-gray-900">
                      Education Level *
                    </Label>
                    <Input
                      id="educationLevel"
                      name="educationLevel"
                      value={form.educationLevel}
                      onChange={handleChange}
                      placeholder="e.g., High School, Bachelor's, Master's"
                      className="h-12 border-gray-300 focus:border-blue-600 focus:ring-blue-600 transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="institution" className="text-sm font-medium text-gray-900">
                      Institution *
                    </Label>
                    <Input
                      id="institution"
                      name="institution"
                      value={form.institution}
                      onChange={handleChange}
                      placeholder="Your school or university name"
                      className="h-12 border-gray-300 focus:border-blue-600 focus:ring-blue-600 transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="major" className="text-sm font-medium text-gray-900">
                      Major / Field of Study *
                    </Label>
                    <Input
                      id="major"
                      name="major"
                      value={form.major}
                      onChange={handleChange}
                      placeholder="e.g., Computer Science, Mathematics, Biology"
                      className="h-12 border-gray-300 focus:border-blue-600 focus:ring-blue-600 transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="goals" className="text-sm font-medium text-gray-900">
                      Academic Goals *
                    </Label>
                    <Input
                      id="goals"
                      name="goals"
                      value={form.goals}
                      onChange={handleChange}
                      placeholder="What do you want to achieve academically?"
                      className="h-12 border-gray-300 focus:border-blue-600 focus:ring-blue-600 transition-colors"
                      required
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="space-y-3">
                    <Label htmlFor="subjects" className="text-sm font-medium text-gray-900">
                      Subject Interests *
                    </Label>
                    <Input
                      id="subjects"
                      name="subjects"
                      value={form.subjects}
                      onChange={handleChange}
                      placeholder="e.g., Mathematics, Physics, Programming"
                      className="h-12 border-gray-300 focus:border-blue-600 focus:ring-blue-600 transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="proficiency" className="text-sm font-medium text-gray-900">
                      Current Proficiency Level *
                    </Label>
                    <Input
                      id="proficiency"
                      name="proficiency"
                      value={form.proficiency}
                      onChange={handleChange}
                      placeholder="e.g., Beginner, Intermediate, Advanced"
                      className="h-12 border-gray-300 focus:border-blue-600 focus:ring-blue-600 transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="objectives" className="text-sm font-medium text-gray-900">
                      Learning Objectives *
                    </Label>
                    <Input
                      id="objectives"
                      name="objectives"
                      value={form.objectives}
                      onChange={handleChange}
                      placeholder="What specific skills do you want to develop?"
                      className="h-12 border-gray-300 focus:border-blue-600 focus:ring-blue-600 transition-colors"
                      required
                    />
                  </div>

                  {/* Summary Preview */}
                  <div className="mt-10 p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-blue-600" />
                      Your Profile Summary
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Name:</span>
                        <span className="ml-2 font-medium text-gray-900">{form.name || "Not provided"}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Education:</span>
                        <span className="ml-2 font-medium text-gray-900">{form.educationLevel || "Not provided"}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Institution:</span>
                        <span className="ml-2 font-medium text-gray-900">{form.institution || "Not provided"}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Interests:</span>
                        <span className="ml-2 font-medium text-gray-900">{form.subjects || "Not provided"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-16 flex items-center justify-between gap-4">
                <Button
                  variant="outline"
                  onClick={back}
                  disabled={step === 1}
                  className="h-12 px-8 border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>

                <div className="text-center text-sm text-gray-500 hidden sm:block">
                  Step {step} of 3
                </div>

                {step < 3 ? (
                  <Button
                    onClick={next}
                    className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors font-medium"
                  >
                    Next Step
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!form.objectives.trim() || isSubmitting}
                    className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors font-medium"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Setting up...
                      </>
                    ) : (
                      <>
                        Complete Setup
                        <CheckCircle className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
