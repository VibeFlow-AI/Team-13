"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, Calendar, Clock, MapPin, User, Video, BookOpen, CheckCircle, Clock as ClockIcon, AlertCircle } from 'lucide-react'

interface BookedSession {
  id: string
  mentorName: string
  mentorInitials: string
  mentorColor: string
  subject: string
  date: string
  time: string
  duration: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  paymentStatus: 'pending' | 'confirmed'
  location: string
  meetingLink?: string
}

// Mock data for booked sessions
const mockBookedSessions: BookedSession[] = [
  {
    id: '1',
    mentorName: 'Rahul Lavan',
    mentorInitials: 'RL',
    mentorColor: 'bg-blue-500',
    subject: 'Physics & Biology',
    date: '2025-07-15',
    time: '10:00',
    duration: '2 hours',
    status: 'confirmed',
    paymentStatus: 'confirmed',
    location: 'Online',
    meetingLink: 'https://meet.google.com/abc-defg-hij'
  },
  {
    id: '2',
    mentorName: 'Miraj Ahmed',
    mentorInitials: 'MA',
    mentorColor: 'bg-green-500',
    subject: 'Chemistry',
    date: '2025-07-18',
    time: '14:00',
    duration: '2 hours',
    status: 'pending',
    paymentStatus: 'confirmed',
    location: 'Online'
  },
  {
    id: '3',
    mentorName: 'Chathum Rahal',
    mentorInitials: 'CR',
    mentorColor: 'bg-orange-500',
    subject: 'Mathematics',
    date: '2025-07-20',
    time: '16:00',
    duration: '2 hours',
    status: 'confirmed',
    paymentStatus: 'confirmed',
    location: 'Online',
    meetingLink: 'https://meet.google.com/xyz-uvw-rst'
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'text-green-600 bg-green-100'
    case 'pending':
      return 'text-yellow-600 bg-yellow-100'
    case 'completed':
      return 'text-blue-600 bg-blue-100'
    case 'cancelled':
      return 'text-red-600 bg-red-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'confirmed':
      return <CheckCircle className="w-4 h-4" />
    case 'pending':
      return <ClockIcon className="w-4 h-4" />
    case 'completed':
      return <CheckCircle className="w-4 h-4" />
    case 'cancelled':
      return <AlertCircle className="w-4 h-4" />
    default:
      return <ClockIcon className="w-4 h-4" />
  }
}

export default function MenteeDashboard() {
  const [sessions, setSessions] = useState<BookedSession[]>([])
  const [filteredSessions, setFilteredSessions] = useState<BookedSession[]>([])
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    // Simulate loading sessions from API
    setTimeout(() => {
      setSessions(mockBookedSessions)
      setFilteredSessions(mockBookedSessions)
    }, 500)
  }, [])

  useEffect(() => {
    let filtered = sessions

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(session => session.status === statusFilter)
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(session =>
        session.mentorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.subject.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredSessions(filtered)
  }, [sessions, statusFilter, searchTerm])

  const handleJoinSession = (session: BookedSession) => {
    if (session.meetingLink) {
      window.open(session.meetingLink, '_blank')
    }
  }

  const handleCancelSession = (sessionId: string) => {
    // In a real app, this would make an API call
    setSessions(prev => prev.map(session => 
      session.id === sessionId 
        ? { ...session, status: 'cancelled' as const }
        : session
    ))
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const formatTime = (timeString: string): string => {
    return timeString
  }

  const getUpcomingSessions = () => {
    const now = new Date()
    return filteredSessions.filter(session => {
      const sessionDate = new Date(`${session.date} ${session.time}`)
      return sessionDate > now && session.status !== 'cancelled'
    })
  }

  const getPastSessions = () => {
    const now = new Date()
    return filteredSessions.filter(session => {
      const sessionDate = new Date(`${session.date} ${session.time}`)
      return sessionDate < now || session.status === 'cancelled'
    })
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
            <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Search className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center border-2 border-gray-300">
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
              <h1 className="text-3xl font-bold text-gray-900">Booked Sessions</h1>
              <Button onClick={() => window.location.href = '/mentee/booking'}>
                Book New Session
              </Button>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search sessions..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <select
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Upcoming Sessions */}
            {getUpcomingSessions().length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Sessions</h2>
                <div className="grid gap-4">
                  {getUpcomingSessions().map((session) => (
                    <Card key={session.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <div className={`w-12 h-12 ${session.mentorColor} rounded-lg flex items-center justify-center text-white font-semibold`}>
                              {session.mentorInitials}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-semibold">{session.mentorName}</h3>
                                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                                  {getStatusIcon(session.status)}
                                  <span className="capitalize">{session.status}</span>
                                </div>
                              </div>
                              <p className="text-gray-600 mb-2">{session.subject}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  {formatDate(session.date)}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {formatTime(session.time)}
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  {session.location}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2">
                            {session.meetingLink && session.status === 'confirmed' && (
                              <Button
                                size="sm"
                                onClick={() => handleJoinSession(session)}
                                className="flex items-center space-x-1"
                              >
                                <Video className="w-4 h-4" />
                                Join Session
                              </Button>
                            )}
                            {session.status === 'pending' && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleCancelSession(session.id)}
                              >
                                Cancel
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Past Sessions */}
            {getPastSessions().length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Past Sessions</h2>
                <div className="grid gap-4">
                  {getPastSessions().map((session) => (
                    <Card key={session.id} className="hover:shadow-md transition-shadow opacity-75">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <div className={`w-12 h-12 ${session.mentorColor} rounded-lg flex items-center justify-center text-white font-semibold`}>
                              {session.mentorInitials}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-semibold">{session.mentorName}</h3>
                                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                                  {getStatusIcon(session.status)}
                                  <span className="capitalize">{session.status}</span>
                                </div>
                              </div>
                              <p className="text-gray-600 mb-2">{session.subject}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  {formatDate(session.date)}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {formatTime(session.time)}
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  {session.location}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2">
                            {session.status === 'completed' && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center space-x-1"
                              >
                                <BookOpen className="w-4 h-4" />
                                View Notes
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {filteredSessions.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions found</h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Try adjusting your search or filters.'
                    : 'You haven\'t booked any sessions yet.'
                  }
                </p>
                {!searchTerm && statusFilter === 'all' && (
                  <Button onClick={() => window.location.href = '/mentee/booking'}>
                    Book Your First Session
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
