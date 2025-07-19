"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  const [step, setStep] = useState(1);
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
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // TODO: Persist to backend
    console.log(form);
    alert("Onboarding complete! (Data logged to console)");
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Student Onboarding</CardTitle>
          <CardDescription>Step {step} of 3</CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" name="age" value={form.age} onChange={handleChange} required />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" name="location" value={form.location} onChange={handleChange} required />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="educationLevel">Education Level</Label>
                <Input id="educationLevel" name="educationLevel" value={form.educationLevel} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="institution">Institution</Label>
                <Input id="institution" name="institution" value={form.institution} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="major">Major / Field of Study</Label>
                <Input id="major" name="major" value={form.major} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="goals">Academic Goals</Label>
                <Input id="goals" name="goals" value={form.goals} onChange={handleChange} required />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="subjects">Subject Interests</Label>
                <Input id="subjects" name="subjects" value={form.subjects} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="proficiency">Proficiency levels</Label>
                <Input id="proficiency" name="proficiency" value={form.proficiency} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="objectives">Learning Objectives</Label>
                <Input id="objectives" name="objectives" value={form.objectives} onChange={handleChange} required />
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={back} disabled={step === 1}>
              Back
            </Button>
            {step < 3 ? (
              <Button onClick={next}>Next</Button>
            ) : (
              <Button onClick={handleSubmit}>Submit</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 