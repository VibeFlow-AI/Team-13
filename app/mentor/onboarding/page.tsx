'use client'

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  fullName: z.string().min(2),
  age: z.coerce.number().min(18),
  email: z.string().email(),
  contactNumber: z.string().min(10),
  preferredLanguage: z.string().nonempty(),
  location: z.string().min(2),
  bio: z.string().min(10),
  role: z.string().min(2),
  subjects: z.string().min(2),
  experience: z.string().nonempty(),
  preferredGrades: z.array(z.string()).min(1),
  linkedin: z.string().url(),
  portfolio: z.string().url().optional(),
  profilePic: z.any().optional(),
});

export default function MentorOnboarding() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: JSON.parse(localStorage.getItem("mentorFormData") || '{}') || {},
  });

  const preferredGrades = watch("preferredGrades") || [];

  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem("mentorFormData", JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleGradeToggle = (grade) => {
    const current = getValues("preferredGrades") || [];
    const updated = current.includes(grade)
      ? current.filter((g) => g !== grade)
      : [...current, grade];
    setValue("preferredGrades", updated);
  };

  const onSubmit = (data) => {
    console.log("Validated Data", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Mentor Onboarding</h2>

      <h3 className="font-semibold mb-2">Part 1: Personal Information</h3>
      <Input placeholder="Full Name" {...register("fullName")}/>
      <Input type="number" placeholder="Age" {...register("age")} className="mt-2"/>
      <Input type="email" placeholder="Email Address" {...register("email")} className="mt-2"/>
      <Input type="tel" placeholder="Contact Number" {...register("contactNumber")} className="mt-2"/>

      <Select onValueChange={(val) => setValue("preferredLanguage", val)} value={watch("preferredLanguage")}>
        <SelectTrigger className="mt-2">
          <SelectValue placeholder="Preferred Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="English">English</SelectItem>
          <SelectItem value="Sinhala">Sinhala</SelectItem>
          <SelectItem value="Tamil">Tamil</SelectItem>
          <SelectItem value="Other">Other</SelectItem>
        </SelectContent>
      </Select>

      <Input placeholder="Current Location" {...register("location")} className="mt-2" />
      <Textarea placeholder="Introduce yourself in 2–3 sentences" {...register("bio")} className="mt-2" />
      <Input placeholder="Professional Role" {...register("role")} className="mt-2 mb-4" />

      <h3 className="font-semibold mb-2">Part 2: Areas of Expertise</h3>
      <Input placeholder="Subjects you are planning to teach" {...register("subjects")} className="mb-2" />

      <Select onValueChange={(val) => setValue("experience", val)} value={watch("experience") || ""}>
        <SelectTrigger className="mb-2">
          <SelectValue placeholder="Teaching/Training Experience" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="None">None</SelectItem>
          <SelectItem value="1-3">1–3 years</SelectItem>
          <SelectItem value="3-5">3–5 years</SelectItem>
          <SelectItem value="5+">5+ years</SelectItem>
        </SelectContent>
      </Select>

      <div className="mb-6">
        <label className="block font-medium mb-1">Preferred Level of Students:</label>
        {["Grade 3-5", "Grade 6-9", "Grade 10-11", "Advanced Level"].map((grade) => (
          <div key={grade} className="flex items-center space-x-2 mb-1">
            <Checkbox id={grade} checked={preferredGrades.includes(grade)} onCheckedChange={() => handleGradeToggle(grade)} />
            <label htmlFor={grade}>{grade}</label>
          </div>
        ))}
      </div>

      <h3 className="font-semibold mb-2">Part 3: Social & Professional Links</h3>
      <Input type="url" placeholder="LinkedIn Profile (Required)" {...register("linkedin")} className="mb-2" />
      <Input type="url" placeholder="GitHub or Portfolio (Optional)" {...register("portfolio")} className="mb-2" />
      <Input type="file" accept="image/*" {...register("profilePic")} className="mb-6" />

      <Button type="submit" className="w-full">Submit</Button>
    </form>
  );
}
