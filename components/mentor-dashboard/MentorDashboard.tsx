"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import {
  Calendar,
  Clock,
  Users,
  Award,
  TrendingUp,
  Video,
  MessageSquare,
  Star,
  BookOpen,
  ChevronRight,
  Play,
  User,
  Phone,
  Mail
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  age: number;
  avatar: string;
  subject: string;
  sessionDate: string;
  sessionTime: string;
  requestTime: string;
  grade: string;
}

interface SessionStats {
  totalSessions: number;
  completedSessions: number;
  upcomingSessions: number;
  rating: number;
  totalStudents: number;
}

export default function MentorDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("week");

  // Mock data - replace with real API data
  const sessionStats: SessionStats = {
    totalSessions: 47,
    completedSessions: 35,
    upcomingSessions: 12,
    rating: 4.8,
    totalStudents: 28
  };

  // Age-based grouping data for pie chart
  const ageGroupData = [
    { name: "13-15 years", value: 35, color: "#3B82F6" },
    { name: "16-18 years", value: 45, color: "#10B981" },
    { name: "19-21 years", value: 20, color: "#F59E0B" }
  ];

  // Subject interests breakdown for bar chart
  const subjectInterestData = [
    { subject: "Mathematics", sessions: 15, percentage: 32 },
    { subject: "Physics", sessions: 12, percentage: 26 },
    { subject: "Chemistry", sessions: 10, percentage: 21 },
    { subject: "Biology", sessions: 6, percentage: 13 },
    { subject: "Computer Science", sessions: 4, percentage: 8 }
  ];

  // Upcoming sessions data
  const upcomingSessions: Student[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      age: 16,
      avatar: "/avatars/sarah.jpg",
      subject: "Mathematics",
      sessionDate: "2025-01-22",
      sessionTime: "14:00",
      requestTime: "2025-01-20T10:30:00Z",
      grade: "Grade 11"
    },
    {
      id: "2",
      name: "Michael Chen",
      age: 17,
      avatar: "/avatars/michael.jpg",
      subject: "Physics",
      sessionDate: "2025-01-22",
      sessionTime: "16:00",
      requestTime: "2025-01-20T14:15:00Z",
      grade: "Grade 12"
    },
    {
      id: "3",
      name: "Emma Rodriguez",
      age: 15,
      avatar: "/avatars/emma.jpg",
      subject: "Chemistry",
      sessionDate: "2025-01-23",
      sessionTime: "15:30",
      requestTime: "2025-01-21T09:45:00Z",
      grade: "Grade 10"
    },
    {
      id: "4",
      name: "David Kim",
      age: 18,
      avatar: "/avatars/david.jpg",
      subject: "Mathematics",
      sessionDate: "2025-01-24",
      sessionTime: "13:00",
      requestTime: "2025-01-21T16:20:00Z",
      grade: "Advanced Level"
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatRequestTime = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const handleStartSession = (student: Student) => {
    console.log("Starting session with:", student.name);
    // Here you would integrate with video calling service
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-blue-600">
            Sessions: <span className="font-semibold">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-12 space-y-12">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 pb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-gray-900 mb-2">
                Welcome back, Dr. Patel
              </h1>
              <p className="text-gray-600 text-lg font-light">
                Here's your mentoring activity overview
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 font-medium"
              >
                <Video className="h-4 w-4 mr-2" />
                Start Session
              </Button>
            </div>
          </div>
        </header>

        {/* Stats Overview */}
        <section>
          <h2 className="text-2xl font-light text-gray-900 mb-8">Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <Card className="bg-gray-50 border-0 hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <BookOpen className="h-6 w-6 text-gray-600" />
                  <span className="text-sm font-medium text-gray-500 bg-white px-2 py-1 rounded-md">
                    Total
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-light text-gray-900">{sessionStats.totalSessions}</p>
                  <p className="text-gray-600 text-sm font-medium">Sessions</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-50 border-0 hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Award className="h-6 w-6 text-gray-600" />
                  <span className="text-sm font-medium text-gray-500 bg-white px-2 py-1 rounded-md">
                    Completed
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-light text-gray-900">{sessionStats.completedSessions}</p>
                  <p className="text-gray-600 text-sm font-medium">Completed</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-50 border-0 hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Clock className="h-6 w-6 text-gray-600" />
                  <span className="text-sm font-medium text-gray-500 bg-white px-2 py-1 rounded-md">
                    Upcoming
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-light text-gray-900">{sessionStats.upcomingSessions}</p>
                  <p className="text-gray-600 text-sm font-medium">Upcoming</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-50 border-0 hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Star className="h-6 w-6 text-gray-600" />
                  <span className="text-sm font-medium text-gray-500 bg-white px-2 py-1 rounded-md">
                    Rating
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-light text-gray-900">{sessionStats.rating}</p>
                  <p className="text-gray-600 text-sm font-medium">Average Rating</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-50 border-0 hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Users className="h-6 w-6 text-gray-600" />
                  <span className="text-sm font-medium text-gray-500 bg-white px-2 py-1 rounded-md">
                    Students
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-light text-gray-900">{sessionStats.totalStudents}</p>
                  <p className="text-gray-600 text-sm font-medium">Total Students</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Charts Section */}
        <section>
          <h2 className="text-2xl font-light text-gray-900 mb-8">Analytics</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Age Group Pie Chart */}
            <Card className="bg-gray-50 border-0 hover:shadow-md transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="text-xl font-medium text-gray-900">
                  Student Age Groups
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Distribution of your students by age
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={ageGroupData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {ageGroupData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Subject Interests Bar Chart */}
            <Card className="bg-gray-50 border-0 hover:shadow-md transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="text-xl font-medium text-gray-900">
                  Subject Interest Breakdown
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Popular subjects among your students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={subjectInterestData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey="subject"
                        tick={{ fontSize: 12 }}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="sessions"
                        fill="#3B82F6"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Upcoming Sessions */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-light text-gray-900">Upcoming Sessions</h2>
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 gap-2">
              <Calendar className="h-4 w-4" />
              View All Sessions
            </Button>
          </div>

          <div className="space-y-4">
            {upcomingSessions.map((student) => (
              <Card key={student.id} className="bg-gray-50 border-0 hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      {/* Student Avatar */}
                      <div className="h-14 w-14 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-lg">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>

                      {/* Student Info */}
                      <div className="space-y-1">
                        <h3 className="font-medium text-gray-900 text-lg">
                          {student.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            {student.subject}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {student.grade}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Age {student.age}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          Requested: {formatRequestTime(student.requestTime)}
                        </p>
                      </div>
                    </div>

                    {/* Session Details & Actions */}
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          {formatDate(student.sessionDate)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatTime(student.sessionTime)}
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="px-3 border-gray-300 hover:bg-gray-50"
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="px-3 border-gray-300 hover:bg-gray-50"
                        >
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => handleStartSession(student)}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Start Session
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {upcomingSessions.length === 0 && (
            <Card className="border border-dashed border-gray-300">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mb-6" />
                <h3 className="text-xl font-light text-gray-900 mb-2">No upcoming sessions</h3>
                <p className="text-gray-600 mb-8 max-w-md font-light">
                  You don't have any sessions scheduled. Students can book sessions with you through your profile.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 font-medium">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Profile
                </Button>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-2xl font-light text-gray-900 mb-8">Quick Actions</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="group cursor-pointer hover:shadow-md transition-shadow duration-200 bg-gray-50 border-0">
              <CardContent className="p-8 text-center">
                <Calendar className="h-8 w-8 mx-auto mb-4 text-blue-600" />
                <h3 className="font-medium text-gray-900">Manage Schedule</h3>
                <p className="text-sm text-gray-600 mt-2">Set your availability</p>
              </CardContent>
            </Card>
            <Card className="group cursor-pointer hover:shadow-md transition-shadow duration-200 bg-gray-50 border-0">
              <CardContent className="p-8 text-center">
                <Users className="h-8 w-8 mx-auto mb-4 text-blue-600" />
                <h3 className="font-medium text-gray-900">View Students</h3>
                <p className="text-sm text-gray-600 mt-2">See all your students</p>
              </CardContent>
            </Card>
            <Card className="group cursor-pointer hover:shadow-md transition-shadow duration-200 bg-gray-50 border-0">
              <CardContent className="p-8 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-4 text-blue-600" />
                <h3 className="font-medium text-gray-900">Analytics</h3>
                <p className="text-sm text-gray-600 mt-2">View detailed insights</p>
              </CardContent>
            </Card>
            <Card className="group cursor-pointer hover:shadow-md transition-shadow duration-200 bg-gray-50 border-0">
              <CardContent className="p-8 text-center">
                <Star className="h-8 w-8 mx-auto mb-4 text-blue-600" />
                <h3 className="font-medium text-gray-900">Reviews</h3>
                <p className="text-sm text-gray-600 mt-2">View student feedback</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
