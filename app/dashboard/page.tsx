"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, DollarSign, BookOpen, Star, MessageCircle, Video } from "lucide-react"

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("explore")

  const mentors = [
    {
      id: 1,
      name: "Dr. Evelyn Reed",
      subject: "Advanced Physics",
      avatar: "/placeholder.svg?height=48&width=48",
      initials: "ER",
      date: "July 22, 2025",
      time: "4:00 PM",
      duration: "60 minutes",
      price: 50,
      rating: 4.9,
      status: "Available",
      statusColor: "green",
    },
    {
      id: 2,
      name: "Prof. Marcus Chen",
      subject: "Computer Science",
      avatar: "/placeholder.svg?height=48&width=48",
      initials: "MC",
      date: "July 23, 2025",
      time: "2:30 PM",
      duration: "45 minutes",
      price: 65,
      rating: 4.8,
      status: "Available",
      statusColor: "green",
    },
    {
      id: 3,
      name: "Dr. Sarah Williams",
      subject: "Organic Chemistry",
      avatar: "/placeholder.svg?height=48&width=48",
      initials: "SW",
      date: "July 24, 2025",
      time: "10:00 AM",
      duration: "90 minutes",
      price: 75,
      rating: 4.9,
      status: "Busy",
      statusColor: "yellow",
    },
    {
      id: 4,
      name: "Prof. David Kumar",
      subject: "Mathematics",
      avatar: "/placeholder.svg?height=48&width=48",
      initials: "DK",
      date: "July 25, 2025",
      time: "3:15 PM",
      duration: "60 minutes",
      price: 55,
      rating: 4.7,
      status: "Available",
      statusColor: "green",
    },
  ]

  const bookedSessions = [
    {
      id: 1,
      mentor: "Dr. Evelyn Reed",
      subject: "Advanced Physics",
      date: "July 20, 2025",
      time: "4:00 PM",
      duration: "60 minutes",
      status: "Upcoming",
      type: "Video Call",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-light text-gray-900 mb-2 tracking-tight">Welcome back, Maya</h1>
              <p className="text-xl text-gray-600 leading-relaxed">Your learning journey continues here.</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                className="px-6 py-3 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium bg-transparent"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Messages
              </Button>
              <Avatar className="h-12 w-12 ring-2 ring-gray-100">
                <AvatarImage src="/placeholder.svg?height=48&width=48" />
                <AvatarFallback className="bg-blue-50 text-blue-600 font-semibold">M</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-fit grid-cols-2 bg-gray-100 rounded-lg p-1 mb-8">
            <TabsTrigger
              value="explore"
              className="px-6 py-3 rounded-md font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
            >
              Explore Mentors
            </TabsTrigger>
            <TabsTrigger
              value="booked"
              className="px-6 py-3 rounded-md font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
            >
              My Sessions
            </TabsTrigger>
          </TabsList>

          {/* Explore Tab */}
          <TabsContent value="explore">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentors.map((mentor) => (
                <Card
                  key={mentor.id}
                  className="group border-0 bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] transition-all duration-300 rounded-2xl overflow-hidden"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-6">
                      <Avatar className="h-12 w-12 ring-2 ring-gray-100">
                        <AvatarImage src={mentor.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-blue-50 text-blue-600 font-semibold">
                          {mentor.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg mb-1">{mentor.name}</h3>
                        <p className="text-gray-600">{mentor.subject}</p>
                        <div className="flex items-center mt-2">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">{mentor.rating}</span>
                        </div>
                      </div>
                      <Badge
                        className={`${
                          mentor.statusColor === "green"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-yellow-50 text-yellow-700 border-yellow-200"
                        } font-medium`}
                      >
                        {mentor.status}
                      </Badge>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        {mentor.date} @ {mentor.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                        {mentor.duration}
                      </div>
                      <div className="flex items-center text-sm text-gray-900 font-semibold">
                        <DollarSign className="h-4 w-4 mr-2 text-gray-400" />${mentor.price}/session
                      </div>
                    </div>

                    <Button
                      className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                      disabled={mentor.status === "Busy"}
                    >
                      {mentor.status === "Busy" ? "Currently Unavailable" : "Book Session"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Booked Sessions Tab */}
          <TabsContent value="booked">
            {bookedSessions.length > 0 ? (
              <div className="space-y-6">
                {bookedSessions.map((session) => (
                  <Card
                    key={session.id}
                    className="border-0 bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] rounded-2xl overflow-hidden"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                            <Video className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-lg">{session.mentor}</h3>
                            <p className="text-gray-600">{session.subject}</p>
                            <div className="flex items-center mt-1 text-sm text-gray-600">
                              <Calendar className="h-4 w-4 mr-1" />
                              {session.date} @ {session.time}
                              <Clock className="h-4 w-4 ml-4 mr-1" />
                              {session.duration}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className="bg-blue-50 text-blue-700 border-blue-200 font-medium">
                            {session.status}
                          </Badge>
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
                            Join Session
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <BookOpen className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">No Sessions Yet</h3>
                <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
                  Your booked mentor sessions will appear here. Start by exploring our exceptional mentors.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("explore")}
                  className="px-8 py-3 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
                >
                  Explore Mentors
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
