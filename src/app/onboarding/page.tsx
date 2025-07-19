"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleContinue = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-8">
      <Card className="max-w-2xl w-full bg-white border-0 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] rounded-2xl overflow-hidden">
        <div className="bg-gray-50 px-8 py-6 border-b border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-900">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-gray-600">{Math.round((currentStep - 1) / totalSteps * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div className="bg-blue-600 h-1 rounded-full transition-all duration-700" style={{ width: `${(currentStep - 1) / totalSteps * 100}%` }} />
          </div>
        </div>

        {currentStep === 1 && (
          <CardContent className="p-8">
            <div className="mb-8">
              <CardTitle className="text-3xl font-light text-gray-900 mb-3 tracking-tight">
                Tell Us About Yourself
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 leading-relaxed">
                We'd love to know who you are and how to best support your learning journey.
              </CardDescription>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Label className="text-sm font-medium text-gray-900 mb-3 block">Full Name</Label>
                <Input placeholder="Jony Ive" className="h-12 px-4 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all bg-white" />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-900 mb-3 block">Age</Label>
                <Input type="number" placeholder="28" className="h-12 px-4 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all bg-white" />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-900 mb-3 block">Contact Number</Label>
                <Input type="tel" placeholder="+1 (555) 123-4567" className="h-12 px-4 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all bg-white" />
              </div>
              <div className="md:col-span-2">
                <Label className="text-sm font-medium text-gray-900 mb-3 block">Email Address</Label>
                <Input type="email" placeholder="jony@apple.com" className="h-12 px-4 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all bg-white" />
              </div>
            </div>
          </CardContent>
        )}
        
        {currentStep > 1 && (
            <CardContent className="p-8">
                <div className="flex flex-col items-center justify-center text-center h-96">
                    <CardTitle className="text-3xl font-light text-gray-900 mb-3 tracking-tight">
                        Step {currentStep} Content
                    </CardTitle>
                    <CardDescription className="text-lg text-gray-600 leading-relaxed">
                        This is a placeholder for the content of step {currentStep}.
                    </CardDescription>
                </div>
            </CardContent>
        )}

        <div className="bg-gray-50 px-8 py-6 flex justify-between border-t border-gray-100">
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 1} className="px-6 py-3 h-auto border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg font-medium">
            Back
          </Button>
          {currentStep < totalSteps ? (
            <Button onClick={handleContinue} className="px-8 py-3 h-auto bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md">
                Continue
            </Button>
          ) : (
            <Link href="/dashboard" passHref>
                <Button className="px-8 py-3 h-auto bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md">
                    Finish
                </Button>
            </Link>
          )}
        </div>
      </Card>
    </div>
  );
}
