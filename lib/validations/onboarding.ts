import { z } from "zod"

// Common validation schemas
export const emailSchema = z.string().email("Please enter a valid email address")
export const phoneSchema = z.string().min(10, "Phone number must be at least 10 digits")
export const nameSchema = z.string().min(2, "Name must be at least 2 characters")

// Student onboarding validation schemas
export const studentStep1Schema = z.object({
  fullName: nameSchema,
  age: z.number().min(13, "Must be at least 13 years old").max(100, "Please enter a valid age"),
  contactNumber: phoneSchema,
  email: emailSchema,
})

export const studentStep2Schema = z.object({
  institution: z.string().min(2, "Institution name is required"),
  fieldOfStudy: z.string().min(2, "Field of study is required"),
  currentLevel: z.enum(["high-school", "undergraduate", "graduate", "phd", "professional"], {
    errorMap: () => ({ message: "Please select your current level" })
  }),
  goals: z.string().min(10, "Please describe your learning goals (at least 10 characters)"),
})

export const studentStep3Schema = z.object({
  subjects: z.array(z.string()).min(1, "Please select at least one subject"),
  learningStyle: z.enum(["visual", "auditory", "kinesthetic", "reading", "mixed"], {
    errorMap: () => ({ message: "Please select your preferred learning style" })
  }),
})

export const studentOnboardingSchema = studentStep1Schema
  .merge(studentStep2Schema)
  .merge(studentStep3Schema)

// Mentor onboarding validation schemas
export const mentorStep1Schema = z.object({
  fullName: nameSchema,
  email: emailSchema,
  contactNumber: phoneSchema,
  expertise: z.string().min(2, "Please describe your area of expertise"),
})

export const mentorStep2Schema = z.object({
  experience: z.number().min(1, "Please enter your years of experience").max(50, "Please enter a valid number of years"),
  qualifications: z.string().min(10, "Please describe your qualifications (at least 10 characters)"),
  specializations: z.array(z.string()).min(1, "Please select at least one specialization"),
  currentLevel: z.enum(["undergraduate", "graduate", "phd", "professional", "industry"], {
    errorMap: () => ({ message: "Please select your current level" })
  }),
})

export const mentorStep3Schema = z.object({
  availability: z.enum(["part-time", "full-time", "weekends", "flexible"], {
    errorMap: () => ({ message: "Please select your availability" })
  }),
  mentorGoals: z.string().min(10, "Please describe your mentoring goals (at least 10 characters)"),
  preferredStudentLevel: z.array(z.string()).min(1, "Please select at least one student level you'd like to mentor"),
})

export const mentorOnboardingSchema = mentorStep1Schema
  .merge(mentorStep2Schema)
  .merge(mentorStep3Schema)

// Progress saving schema
export const onboardingProgressSchema = z.object({
  currentStep: z.number().min(1).max(3),
  totalSteps: z.number().default(3),
  formData: z.record(z.any()),
  role: z.enum(["STUDENT", "MENTOR"]),
})

// Type exports
export type StudentStep1Data = z.infer<typeof studentStep1Schema>
export type StudentStep2Data = z.infer<typeof studentStep2Schema>
export type StudentStep3Data = z.infer<typeof studentStep3Schema>
export type StudentOnboardingData = z.infer<typeof studentOnboardingSchema>

export type MentorStep1Data = z.infer<typeof mentorStep1Schema>
export type MentorStep2Data = z.infer<typeof mentorStep2Schema>
export type MentorStep3Data = z.infer<typeof mentorStep3Schema>
export type MentorOnboardingData = z.infer<typeof mentorOnboardingSchema>

export type OnboardingProgressData = z.infer<typeof onboardingProgressSchema>
