"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, Filter, Clock, Star, MapPin, Calendar, Video, Users, BookOpen, ChevronDown, X, Check } from 'lucide-react'
import TransferSlip from '@/components/mentee/transfer'

// Types
interface Student {
  id: string
  name: string
  grade: number
  subjects: string[]
  language: string[]
  preferredSessionDuration: string
  budget: number
}

interface Mentor {
  id: string
  name: string
  initials: string
  color: string
  subjects: string[]
  grades: number[]
  languages: string[]
  rating: number
  reviewCount: number
  hourlyRate: number
  availability: string[]
  bio: string
  experience: string
  sessionDurations: string[]
  location: string
  isOnline: boolean
  totalStudents: number
  completedSessions: number
  profileImage?: string
  matchScore?: number
}

// Mock current student data (Maya)
const currentStudent: Student = {
  id: '1',
  name: 'Maya',
  grade: 10,
  subjects: ['Physics', 'Biology', 'Mathematics'],
  language: ['English'],
  preferredSessionDuration: '2 hours',
  budget: 2000
}

// Mock mentor data
const mockMentors: Mentor[] = [
  {
    id: '1',
    name: 'Miraj Ahmed',
    initials: 'MA',
    color: 'bg-blue-500',
    subjects: ['Physics', 'Biology', 'Chemistry'],
    grades: [9, 10, 11, 12],
    languages: ['English', 'Sinhala'],
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 1500,
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    bio: 'Experienced tutor specializing in Science subjects with 8+ years of teaching experience.',
    experience: '8 years',
    sessionDurations: ['1 hour', '2 hours', '3 hours'],
    location: 'Colombo',
    isOnline: true,
    totalStudents: 85,
    completedSessions: 450
  },
  {
    id: '2',
    name: 'Rahul Lavan',
    initials: 'RL',
    color: 'bg-green-500',
    subjects: ['Physics', 'Mathematics', 'Chemistry'],
    grades: [10, 11, 12, 13],
    languages: ['English', 'Tamil'],
    rating: 4.8,
    reviewCount: 94,
    hourlyRate: 1800,
    availability: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
    bio: 'Physics specialist with engineering background. Focus on conceptual understanding.',
    experience: '6 years',
    sessionDurations: ['2 hours', '3 hours'],
    location: 'Kandy',
    isOnline: true,
    totalStudents: 62,
    completedSessions: 380
  },
  {
    id: '3',
    name: 'Chathum Rahal',
    initials: 'CR',
    color: 'bg-orange-500',
    subjects: ['Mathematics', 'Physics'],
    grades: [8, 9, 10, 11],
    languages: ['English', 'Sinhala'],
    rating: 4.7,
    reviewCount: 156,
    hourlyRate: 1200,
    availability: ['Tuesday', 'Thursday', 'Saturday', 'Sunday'],
    bio: 'Mathematics expert with a passion for making complex concepts simple.',
    experience: '5 years',
    sessionDurations: ['1 hour', '2 hours'],
    location: 'Gampaha',
    isOnline: true,
    totalStudents: 78,
    completedSessions: 290
  },
  {
    id: '4',
    name: 'Malsha Fernando',
    initials: 'MF',
    color: 'bg-purple-500',
    subjects: ['Biology', 'Chemistry'],
    grades: [9, 10, 11],
    languages: ['English', 'Sinhala'],
    rating: 4.9,
    reviewCount: 83,
    hourlyRate: 1600,
    availability: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    bio: 'Medical graduate specializing in Biology and Chemistry tutoring.',
    experience: '4 years',
    sessionDurations: ['2 hours', '3 hours'],
    location: 'Colombo',
    isOnline: true,
    totalStudents: 45,
    completedSessions: 220
  },
  {
    id: '5',
    name: 'Sahan Perera',
    initials: 'SP',
    color: 'bg-red-500',
    subjects: ['Mathematics', 'Computer Science'],
    grades: [10, 11, 12, 13],
    languages: ['English'],
    rating: 4.6,
    reviewCount: 71,
    hourlyRate: 2000,
    availability: ['Wednesday', 'Friday', 'Saturday'],
    bio: 'Software engineer turned educator. Specializes in advanced mathematics.',
    experience: '7 years',
    sessionDurations: ['1 hour', '2 hours', '3 hours'],
    location: 'Colombo',
    isOnline: true,
    totalStudents: 38,
    completedSessions: 180
  }
]

// Intelligent Matching Algorithm
const calculateMentorScore = (mentor: Mentor, student: Student): number => {
  let score = 0
  const weights = {
    subjectMatch: 0.35,
    gradeMatch: 0.25,
    languageMatch: 0.15,
    sessionDurationMatch: 0.10,
    rating: 0.08,
    budget: 0.07
  }

  // Subject matching (most important)
  const subjectMatches = student.subjects.filter(subject => 
    mentor.subjects.includes(subject)
  ).length
  const subjectScore = (subjectMatches / student.subjects.length) * 100
  score += subjectScore * weights.subjectMatch

  // Grade matching
  const gradeMatch = mentor.grades.includes(student.grade) ? 100 : 0
  score += gradeMatch * weights.gradeMatch

  // Language matching
  const languageMatches = student.language.filter(lang => 
    mentor.languages.includes(lang)
  ).length
  const languageScore = (languageMatches / student.language.length) * 100
  score += languageScore * weights.languageMatch

  // Session duration matching
  const durationMatch = mentor.sessionDurations.includes(student.preferredSessionDuration) ? 100 : 0
  score += durationMatch * weights.sessionDurationMatch

  // Rating score
  const ratingScore = (mentor.rating / 5) * 100
  score += ratingScore * weights.rating

  // Budget matching
  const budgetScore = mentor.hourlyRate <= student.budget ? 100 : 
    Math.max(0, 100 - ((mentor.hourlyRate - student.budget) / student.budget * 100))
  score += budgetScore * weights.budget

  return Math.round(score)
}

export default function MentorBookingSystem() {
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedDuration, setSelectedDuration] = useState('')
  const [maxBudget, setMaxBudget] = useState(3000)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [bookingDetails, setBookingDetails] = useState<{
    mentor: Mentor
    date: string
    time: string
    duration: string
    notes: string
  } | null>(null)

  // Get unique subjects and durations for filters
  const allSubjects = Array.from(new Set(mockMentors.flatMap(m => m.subjects)))
  const allDurations = Array.from(new Set(mockMentors.flatMap(m => m.sessionDurations)))

  useEffect(() => {
    // Calculate scores and sort mentors
    const mentorsWithScores = mockMentors.map(mentor => ({
      ...mentor,
      matchScore: calculateMentorScore(mentor, currentStudent)
    })).sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))

    setMentors(mentorsWithScores)
    setFilteredMentors(mentorsWithScores)
  }, [])

  useEffect(() => {
    let filtered = mentors

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(mentor =>
        mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.subjects.some(subject => 
          subject.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }

    // Apply subject filter
    if (selectedSubject) {
      filtered = filtered.filter(mentor => 
        mentor.subjects.includes(selectedSubject)
      )
    }

    // Apply duration filter
    if (selectedDuration) {
      filtered = filtered.filter(mentor => 
        mentor.sessionDurations.includes(selectedDuration)
      )
    }

    // Apply budget filter
    filtered = filtered.filter(mentor => mentor.hourlyRate <= maxBudget)

    setFilteredMentors(filtered)
  }, [mentors, searchTerm, selectedSubject, selectedDuration, maxBudget])

  const handleBookSession = (mentor: Mentor) => {
    setSelectedMentor(mentor)
    setShowBookingModal(true)
  }

  const handleBooking = (details: {
    mentor: Mentor
    date: string
    time: string
    duration: string
    notes: string
  }) => {
    setBookingDetails(details)
    setShowBookingModal(false)
    setShowPaymentModal(true)
  }

  const handlePaymentConfirmed = () => {
    setShowPaymentModal(false)
    setBookingDetails(null)
    // Redirect to dashboard or show success message
    window.location.href = '/mentee-dashboard'
  }

  const handlePaymentCancelled = () => {
    setShowPaymentModal(false)
    setBookingDetails(null)
  }

  const clearFilters = () => {
    setSelectedSubject('')
    setSelectedDuration('')
    setMaxBudget(3000)
    setSearchTerm('')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-black rounded"></div>
              <nav className="ml-8 flex space-x-8">
                <a href="#" className="text-gray-900 hover:text-gray-700">Home</a>
                <a href="#" className="text-gray-900 hover:text-gray-700">About</a>
              </nav>
            </div>
            <Button variant="default">Dashboard</Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-16 bg-white shadow-sm min-h-screen flex flex-col items-center py-4">
          <div className="flex flex-col space-y-4">
            <button className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center border-2 border-gray-300">
              <Search className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-auto">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
              M
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Discover Mentors</h1>
                <p className="text-gray-600 mt-2">Find the perfect mentor for your learning journey</p>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search mentors by name or subject..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </Button>
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                      >
                        <option value="">All Subjects</option>
                        {allSubjects.map(subject => (
                          <option key={subject} value={subject}>{subject}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Session Duration</label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={selectedDuration}
                        onChange={(e) => setSelectedDuration(e.target.value)}
                      >
                        <option value="">Any Duration</option>
                        {allDurations.map(duration => (
                          <option key={duration} value={duration}>{duration}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max Budget: LKR {maxBudget}/hour
                      </label>
                      <input
                        type="range"
                        min="500"
                        max="3000"
                        step="100"
                        value={maxBudget}
                        onChange={(e) => setMaxBudget(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button variant="outline" onClick={clearFilters}>
                      Clear Filters
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Results Summary */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredMentors.length} mentor{filteredMentors.length !== 1 ? 's' : ''} 
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            </div>

            {/* Mentor Cards */}
            <div className="grid gap-6">
              {filteredMentors.map((mentor) => (
                <Card key={mentor.id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Mentor Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className={`w-16 h-16 ${mentor.color} rounded-full flex items-center justify-center text-white font-bold text-xl`}>
                              {mentor.initials}
                            </div>
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="text-xl font-semibold text-gray-900">{mentor.name}</h3>
                                {mentor.matchScore && mentor.matchScore >= 80 && (
                                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                                    Perfect Match
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center">
                                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                  {mentor.rating} ({mentor.reviewCount} reviews)
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  {mentor.location}
                                </div>
                                <div className="flex items-center">
                                  <Users className="w-4 h-4 mr-1" />
                                  {mentor.totalStudents} students
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900">LKR {mentor.hourlyRate}</div>
                            <div className="text-sm text-gray-500">per hour</div>
                            {mentor.matchScore && (
                              <div className="text-xs text-green-600 font-medium mt-1">
                                {mentor.matchScore}% match
                              </div>
                            )}
                          </div>
                        </div>

                        <p className="text-gray-600 mb-4">{mentor.bio}</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <div className="text-sm font-medium text-gray-700 mb-2">Subjects</div>
                            <div className="flex flex-wrap gap-1">
                              {mentor.subjects.map(subject => (
                                <span
                                  key={subject}
                                  className={`text-xs px-2 py-1 rounded-full ${
                                    currentStudent.subjects.includes(subject)
                                      ? 'bg-blue-100 text-blue-800'
                                      : 'bg-gray-100 text-gray-600'
                                  }`}
                                >
                                  {subject}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-700 mb-2">Languages</div>
                            <div className="flex flex-wrap gap-1">
                              {mentor.languages.map(lang => (
                                <span
                                  key={lang}
                                  className={`text-xs px-2 py-1 rounded-full ${
                                    currentStudent.language.includes(lang)
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-gray-100 text-gray-600'
                                  }`}
                                >
                                  {lang}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-700 mb-2">Experience</div>
                            <div className="text-sm text-gray-600">{mentor.experience}</div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {mentor.sessionDurations.join(', ')}
                          </div>
                          <div className="flex items-center">
                            <Video className="w-4 h-4 mr-1" />
                            Online sessions
                          </div>
                          <div className="flex items-center">
                            <BookOpen className="w-4 h-4 mr-1" />
                            {mentor.completedSessions} sessions completed
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col space-y-3 lg:w-48">
                        <Button
                          onClick={() => handleBookSession(mentor)}
                          className="w-full"
                          size="lg"
                        >
                          Book Session
                        </Button>
                        <Button variant="outline" className="w-full">
                          View Profile
                        </Button>
                        <Button variant="outline" className="w-full">
                          Send Message
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredMentors.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No mentors found</h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search criteria or filters.
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedMentor && (
        <BookingModal
          mentor={selectedMentor}
          onClose={() => {
            setShowBookingModal(false)
            setSelectedMentor(null)
          }}
          onBooking={handleBooking}
        />
      )}

      {/* Payment Modal */}
      {showPaymentModal && bookingDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <TransferSlip
              mentorName={bookingDetails.mentor.name}
              sessionDate={bookingDetails.date}
              sessionTime={bookingDetails.time}
              amount={`LKR ${bookingDetails.mentor.hourlyRate * parseInt(bookingDetails.duration.split(' ')[0])}`}
              onPaymentConfirmed={handlePaymentConfirmed}
              onCancel={handlePaymentCancelled}
            />
          </div>
        </div>
      )}
    </div>
  )
}

// Updated Booking Modal Component
function BookingModal({ 
  mentor, 
  onClose, 
  onBooking 
}: { 
  mentor: Mentor
  onClose: () => void
  onBooking: (details: {
    mentor: Mentor
    date: string
    time: string
    duration: string
    notes: string
  }) => void
}) {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedDuration, setSelectedDuration] = useState('')
  const [notes, setNotes] = useState('')

  const timeSlots = [
    '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '18:00'
  ]

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !selectedDuration) {
      return
    }

    onBooking({
      mentor,
      date: selectedDate,
      time: selectedTime,
      duration: selectedDuration,
      notes
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Book Session with {mentor.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose a date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose a time
              </label>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`px-3 py-2 text-sm rounded-md border ${
                      selectedTime === time
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session duration
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
              >
                <option value="">Select duration</option>
                {mentor.sessionDurations.map(duration => (
                  <option key={duration} value={duration}>{duration}</option>
                ))}
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional notes (optional)
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Let your mentor know what you'd like to focus on..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Session Summary</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Mentor:</span>
                  <span className="font-medium">{mentor.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rate:</span>
                  <span className="font-medium">LKR {mentor.hourlyRate}/hour</span>
                </div>
                {selectedDuration && (
                  <div className="flex justify-between">
                    <span>Total Cost:</span>
                    <span className="font-medium">
                      LKR {mentor.hourlyRate * parseInt(selectedDuration.split(' ')[0])}
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-3 p-3 bg-blue-50 rounded-md">
                <div className="flex items-center text-blue-700 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span>Payment will be processed via bank transfer after booking</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button
                onClick={onClose}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleBooking}
                disabled={!selectedDate || !selectedTime || !selectedDuration}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Proceed to Payment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}