"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  User,
  GraduationCap,
  Link as LinkIcon,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  Upload,
  Camera,
  AlertCircle
} from "lucide-react";

interface MentorFormData {
  // Personal Information
  fullName: string;
  age: string;
  email: string;
  contactNumber: string;
  preferredLanguage: string;
  currentLocation: string;
  shortBio: string;
  professionalRole: string;

  // Areas of Expertise
  subjects: string;
  teachingExperience: string;
  preferredLevels: string[];

  // Social & Professional Links
  linkedinProfile: string;
  githubPortfolio: string;
  profilePicture: File | null;
}

const LANGUAGES = [
  "English",
  "Sinhala",
  "Tamil",
  "Other"
];

const EXPERIENCE_LEVELS = [
  "None",
  "1-3 years",
  "3-5 years",
  "5+ years"
];

const STUDENT_LEVELS = [
  "Grade 3-5",
  "Grade 6-9",
  "Grade 10-11",
  "Advanced Level"
];

export default function MentorOnboardingForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState<MentorFormData>({
    fullName: "",
    age: "",
    email: "",
    contactNumber: "",
    preferredLanguage: "",
    currentLocation: "",
    shortBio: "",
    professionalRole: "",
    subjects: "",
    teachingExperience: "",
    preferredLevels: [],
    linkedinProfile: "",
    githubPortfolio: "",
    profilePicture: null,
  });

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => {
    if (step === 1) {
      router.push("/role-selection");
    } else {
      setStep((s) => Math.max(s - 1, 1));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (level: string) => {
    setForm((prev) => ({
      ...prev,
      preferredLevels: prev.preferredLevels.includes(level)
        ? prev.preferredLevels.filter(l => l !== level)
        : [...prev.preferredLevels, level]
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, profilePicture: file }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // TODO: Persist to backend
      console.log("Mentor onboarding data:", form);

      // Simulate API call delay for smooth UX
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Show success overlay
      setShowSuccess(true);

      // Wait a moment before navigation
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Navigate to mentor dashboard
      router.push("/mentor");
    } catch (err) {
      console.error("Error completing mentor onboarding:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      setIsSubmitting(false);
      // Wait a moment before clearing error to ensure user sees it
      setTimeout(() => setError(null), 5000);
    }
  };

  const stepIcons = [User, GraduationCap, LinkIcon];
  const stepTitles = ["Personal Information", "Areas of Expertise", "Social & Professional Links"];
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
            <h2 className="text-2xl font-light text-gray-900 mb-2">Application Submitted!</h2>
            <p className="text-gray-600 font-light">Taking you to your mentor dashboard...</p>
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
            Join Our Mentor Community
          </div>
          <h1 className="text-4xl font-light text-gray-900 mb-4">
            Become a Mentor
          </h1>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
            Share your knowledge and help students achieve their academic goals
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
                Step {step} of 3 - Help us understand your expertise
              </CardDescription>
              <div className="mt-6">
                <Progress value={progress} className="h-1" />
              </div>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="fullName" className="text-sm font-medium text-gray-900">
                        Full Name *
                      </Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="Dr. John Smith"
                        className="h-12 border-gray-300 focus:border-blue-600 focus:ring-blue-600 transition-colors"
                        required
                      />
                    </div>
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
                        placeholder="35"
                        className="h-12 border-gray-300 focus:border-blue-600 focus:ring-blue-600 transition-colors"
                        required
                      />
                    </div>
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
                      placeholder="john.smith@university.edu"
                      className="h-12 border-gray-300 focus:border-blue-600 focus:ring-blue-600 transition-colors"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="contactNumber" className="text-sm font-medium text-gray-900">
                        Contact Number *
                      </Label>
                      <Input
                        id="contactNumber"
                        name="contactNumber"
                        type="tel"
                        value={form.contactNumber}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                        className="h-12 border-gray-300 focus:border-blue-600 focus:ring-blue-600 transition-colors"
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="preferredLanguage" className="text-sm font-medium text-gray-900">
                        Preferred Language *
                      </Label>
                      <select
                        id="preferredLanguage"
                        name="preferredLanguage"
                        value={form.preferredLanguage}
                        onChange={handleChange}
                        className="h-12 px-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-blue-600 focus:ring-blue-600 w-full"
                        required
                      >
                        <option value="">Select Language</option>
                        {LANGUAGES.map(lang => (
                          <option key={lang} value={lang}>{lang}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="currentLocation" className="text-sm font-medium text-gray-900">
                      Current Location *
                    </Label>
                    <Input
                      id="currentLocation"
                      name="currentLocation"
                      value={form.currentLocation}
                      onChange={handleChange}
                      placeholder="New York, USA"
                      className="h-12 border-gray-300 focus:border-blue-600 focus:ring-blue-600 transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="professionalRole" className="text-sm font-medium text-gray-900">
                      Professional Role *
                    </Label>
                    <Input
                      id="professionalRole"
                      name="professionalRole"
                      value={form.professionalRole}
                      onChange={handleChange}
                      placeholder="Professor of Computer Science"
                      className="h-12 border-gray-300 focus:border-blue-600 focus:ring-blue-600 transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="shortBio" className="text-sm font-medium text-gray-900">
                      Short Bio *
                    </Label>
                    <textarea
                      id="shortBio"
                      name="shortBio"
                      value={form.shortBio}
                      onChange={handleChange}
                      placeholder="Introduce yourself in 2-3 sentences..."
                      rows={4}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-blue-600 focus:ring-blue-600 resize-none"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Areas of Expertise */}
              {step === 2 && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="space-y-3">
                    <Label htmlFor="subjects" className="text-sm font-medium text-gray-900">
                      Subjects You Plan to Teach *
                    </Label>
                    <Input
                      id="subjects"
                      name="subjects"
                      value={form.subjects}
                      onChange={handleChange}
                      placeholder="e.g., Physics, Chemistry, Mathematics"
                      className="h-12 border-gray-300 focus:border-blue-600 focus:ring-blue-600 transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="teachingExperience" className="text-sm font-medium text-gray-900">
                      Teaching/Training Experience *
                    </Label>
                    <select
                      id="teachingExperience"
                      name="teachingExperience"
                      value={form.teachingExperience}
                      onChange={handleChange}
                      className="h-12 px-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-blue-600 focus:ring-blue-600 w-full"
                      required
                    >
                      <option value="">Select Experience Level</option>
                      {EXPERIENCE_LEVELS.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-sm font-medium text-gray-900">
                      Preferred Level of Students *
                    </Label>
                    <div className="grid grid-cols-2 gap-4">
                      {STUDENT_LEVELS.map((level) => (
                        <label key={level} className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={form.preferredLevels.includes(level)}
                            onChange={() => handleCheckboxChange(level)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
                          />
                          <span className="text-sm font-medium text-gray-900">{level}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Social & Professional Links */}
              {step === 3 && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="space-y-3">
                    <Label htmlFor="linkedinProfile" className="text-sm font-medium text-gray-900">
                      LinkedIn Profile *
                    </Label>
                    <Input
                      id="linkedinProfile"
                      name="linkedinProfile"
                      type="url"
                      value={form.linkedinProfile}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/your-profile"
                      className="h-12 border-gray-300 focus:border-blue-600 focus:ring-blue-600 transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="githubPortfolio" className="text-sm font-medium text-gray-900">
                      GitHub or Portfolio <span className="text-gray-500">(Optional)</span>
                    </Label>
                    <Input
                      id="githubPortfolio"
                      name="githubPortfolio"
                      type="url"
                      value={form.githubPortfolio}
                      onChange={handleChange}
                      placeholder="https://github.com/yourprofile or your-portfolio.com"
                      className="h-12 border-gray-300 focus:border-blue-600 focus:ring-blue-600 transition-colors"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label className="text-sm font-medium text-gray-900">
                      Upload Profile Picture
                    </Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                      <input
                        type="file"
                        id="profilePicture"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label htmlFor="profilePicture" className="cursor-pointer">
                        <div className="flex flex-col items-center gap-4">
                          {form.profilePicture ? (
                            <div className="flex items-center gap-3 text-blue-600">
                              <CheckCircle className="h-6 w-6" />
                              <span className="font-medium">{form.profilePicture.name}</span>
                            </div>
                          ) : (
                            <>
                              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                <Camera className="h-6 w-6 text-gray-400" />
                              </div>
                              <div>
                                <p className="text-gray-600 font-medium">Click to upload profile picture</p>
                                <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                              </div>
                            </>
                          )}
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Application Summary */}
                  <div className="mt-10 p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-blue-600" />
                      Application Summary
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Name:</span>
                        <span className="ml-2 font-medium text-gray-900">{form.fullName || "Not provided"}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Role:</span>
                        <span className="ml-2 font-medium text-gray-900">{form.professionalRole || "Not provided"}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Subjects:</span>
                        <span className="ml-2 font-medium text-gray-900">{form.subjects || "Not provided"}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Experience:</span>
                        <span className="ml-2 font-medium text-gray-900">{form.teachingExperience || "Not provided"}</span>
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
                    disabled={!form.linkedinProfile.trim() || isSubmitting}
                    className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors font-medium"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
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
