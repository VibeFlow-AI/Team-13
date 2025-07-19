import { useState } from "react"
import { Button } from "/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "/components/ui/card"
import { Input } from "/components/ui/input"
import { Label } from "/components/ui/label"
import { Textarea } from "/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "/components/ui/select"
import { Checkbox } from "/components/ui/checkbox"
import Link from "next/link"

export default function StudentOnboarding() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    contactNumber: "",
    email: "",
    institution: "",
    fieldOfStudy: "",
    currentLevel: "",
    goals: "",
    subjects: [],
    learningStyle: "",
  })

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const subjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "Engineering",
    "Business",
    "Economics",
    "Literature",
    "History",
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <Card className="max-w-2xl w-full bg-white border-0 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] rounded-2xl overflow-hidden">
        {/* Progress indicator */}
        <div className="bg-gray-50 px-8 py-6 border-b border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-900">Step {currentStep} of 3</span>
            <span className="text-sm text-gray-600">{Math.round((currentStep / 3) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div
              className="bg-blue-600 h-1 rounded-full transition-all duration-700"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Personal Information */}
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
                <Input
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="h-12 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-900 mb-3 block">Age</Label>
                <Input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="h-12 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-900 mb-3 block">Contact Number</Label>
                <Input
                  type="tel"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                  className="h-12 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                />
              </div>

              <div className="md:col-span-2">
                <Label className="text-sm font-medium text-gray-900 mb-3 block">Email Address</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-12 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                />
              </div>
            </div>
          </CardContent>
        )}

        {/* Step 2: Academic Background */}
        {currentStep === 2 && (
          <CardContent className="p-8">
            <div className="mb-8">
              <CardTitle className="text-3xl font-light text-gray-900 mb-3 tracking-tight">
                Academic Background
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 leading-relaxed">
                Help us understand your educational context to match you with the right mentors.
              </CardDescription>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-sm font-medium text-gray-900 mb-3 block">Institution</Label>
                <Input
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  placeholder="University, College, or School name"
                  className="h-12 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-900 mb-3 block">Field of Study</Label>
                <Input
                  value={formData.fieldOfStudy}
                  onChange={(e) => setFormData({ ...formData, fieldOfStudy: e.target.value })}
                  placeholder="e.g., Computer Science, Biology, Business"
                  className="h-12 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-900 mb-3 block">Current Level</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, currentLevel: value })}>
                  <SelectTrigger className="h-12 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white">
                    <SelectValue placeholder="Select your current level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high-school">High School</SelectItem>
                    <SelectItem value="undergraduate">Undergraduate</SelectItem>
                    <SelectItem value="graduate">Graduate</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-900 mb-3 block">Learning Goals</Label>
                <Textarea
                  value={formData.goals}
                  onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                  placeholder="What do you hope to achieve through mentorship?"
                  className="min-h-24 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white resize-none"
                />
              </div>
            </div>
          </CardContent>
        )}

        {/* Step 3: Learning Preferences */}
        {currentStep === 3 && (
          <CardContent className="p-8">
            <div className="mb-8">
              <CardTitle className="text-3xl font-light text-gray-900 mb-3 tracking-tight">
                Learning Preferences
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 leading-relaxed">
                Tell us about your learning style and subject interests to find the perfect mentor match.
              </CardDescription>
            </div>

            <div className="space-y-8">
              <div>
                <Label className="text-sm font-medium text-gray-900 mb-4 block">Subjects of Interest</Label>
                <div className="grid grid-cols-2 gap-3">
                  {subjects.map((subject) => (
                    <div key={subject} className="flex items-center space-x-3">
                      <Checkbox
                        id={subject}
                        checked={formData.subjects.includes(subject)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData({ ...formData, subjects: [...formData.subjects, subject] })
                          } else {
                            setFormData({ ...formData, subjects: formData.subjects.filter((s) => s !== subject) })
                          }
                        }}
                        className="border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <Label htmlFor={subject} className="text-sm text-gray-700 cursor-pointer">
                        {subject}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-900 mb-3 block">Preferred Learning Style</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, learningStyle: value })}>
                  <SelectTrigger className="h-12 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white">
                    <SelectValue placeholder="How do you learn best?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="visual">Visual (diagrams, charts, images)</SelectItem>
                    <SelectItem value="auditory">Auditory (discussions, explanations)</SelectItem>
                    <SelectItem value="kinesthetic">Kinesthetic (hands-on, practice)</SelectItem>
                    <SelectItem value="reading">Reading/Writing (notes, texts)</SelectItem>
                    <SelectItem value="mixed">Mixed approach</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        )}

        {/* Navigation footer */}
        <div className="bg-gray-50 px-8 py-6 flex justify-between border-t border-gray-100">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-6 py-3 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium disabled:opacity-50 bg-transparent"
          >
            Back
          </Button>
          {currentStep < 3 ? (
            <Button
              onClick={nextStep}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Continue
            </Button>
          ) : (
            <Link href="/dashboard">
              <Button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md">
                Complete Setup
              </Button>
            </Link>
          )}
        </div>
      </Card>
    </div>
  )
}
