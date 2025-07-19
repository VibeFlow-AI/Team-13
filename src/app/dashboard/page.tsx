
"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, BookOpen, Calendar, CalendarX, Clock, DollarSign, Eye, Filter, Search, SortAsc, Star } from "lucide-react";

const mentors = [
  {
    name: "Dr. Evelyn Reed",
    subject: "Advanced Physics & Quantum Mechanics",
    status: "Available",
    rating: 4.9,
    reviews: 127,
    date: "July 22, 2025",
    time: "4:00 PM",
    duration: "60 minutes",
    price: "50",
    avatar: "https://placehold.co/56x56.png",
    avatarFallback: "ER",
    aiHint: "woman scientist",
    tags: [
      { label: "Physics", color: "blue" },
      { label: "Quantum", color: "purple" },
      { label: "A-Level", color: "gray" },
    ],
  },
  {
    name: "Prof. James Harrison",
    subject: "Pure Mathematics & Calculus",
    status: "Online",
    rating: 4.8,
    reviews: 93,
    date: "July 23, 2025",
    time: "2:00 PM",
    duration: "90 minutes",
    price: "65",
    avatar: "https://placehold.co/56x56.png",
    avatarFallback: "JH",
    aiHint: "man mathematician",
    tags: [
      { label: "Mathematics", color: "green" },
      { label: "Calculus", color: "yellow" },
      { label: "A-Level", color: "gray" },
    ],
  },
  {
    name: "Dr. Sarah Chen",
    subject: "Organic & Analytical Chemistry",
    status: "Popular",
    rating: 5.0,
    reviews: 78,
    date: "July 24, 2025",
    time: "6:00 PM",
    duration: "75 minutes",
    price: "55",
    avatar: "https://placehold.co/56x56.png",
    avatarFallback: "SC",
    aiHint: "woman chemist",
    tags: [
      { label: "Chemistry", color: "red" },
      { label: "Organic", color: "pink" },
      { label: "A-Level", color: "gray" },
    ],
  },
];

const tagColorClasses: { [key: string]: string } = {
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  purple: "bg-purple-50 text-purple-700 border-purple-200",
  gray: "bg-gray-50 text-gray-700 border-gray-200",
  green: "bg-green-50 text-green-700 border-green-200",
  yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
  red: "bg-red-50 text-red-700 border-red-200",
  pink: "bg-pink-50 text-pink-700 border-pink-200",
};

const statusColorClasses: { [key: string]: string } = {
    Available: "bg-green-50 text-green-700 border-green-200",
    Online: "bg-blue-50 text-blue-700 border-blue-200",
    Popular: "bg-orange-50 text-orange-700 border-orange-200",
    Booked: "bg-yellow-50 text-yellow-700 border-yellow-200",
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('explore');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const savedTab = localStorage.getItem('dashboard-active-tab');
    if (savedTab) setActiveTab(savedTab);
    
    const savedSearch = localStorage.getItem('dashboard-search');
    if (savedSearch) setSearchQuery(savedSearch);
  }, []);

  useEffect(() => {
    localStorage.setItem('dashboard-active-tab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('dashboard-search', searchQuery);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-light text-gray-900 mb-2 tracking-tight">
                Welcome back, Maya
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Your learning journey continues here.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="px-4 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200">
                <Bell className="h-4 w-4" />
              </Button>
              <Avatar className="h-10 w-10 ring-2 ring-gray-100">
                <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="woman student" />
                <AvatarFallback className="bg-blue-50 text-blue-600 font-semibold">M</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-fit grid-cols-2 bg-gray-100 rounded-lg p-1 mb-8">
            <TabsTrigger value="explore" className="px-6 py-3 rounded-md font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200">
              <Search className="h-4 w-4 mr-2" />
              Explore Mentors
            </TabsTrigger>
            <TabsTrigger value="booked" className="px-6 py-3 rounded-md font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200">
              <Calendar className="h-4 w-4 mr-2" />
              My Sessions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="explore" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  className="h-12 pl-12 pr-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 bg-white" 
                  placeholder="Search mentors by subject, name, or expertise..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="px-6 py-3 h-12 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Button variant="outline" className="px-6 py-3 h-12 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200">
                  <SortAsc className="h-4 w-4 mr-2" />
                  Sort
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentors.map((mentor, index) => (
                <Card key={index} className="group border-0 bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] hover:shadow-[0_8px_25px_-5px_rgba(0,0,0,0.1)] transition-all duration-300 rounded-2xl overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-6">
                      <Avatar className="h-14 w-14 ring-2 ring-gray-100">
                        <AvatarImage src={mentor.avatar} alt={mentor.name} data-ai-hint={mentor.aiHint} />
                        <AvatarFallback className="bg-blue-50 text-blue-600 font-semibold text-lg">{mentor.avatarFallback}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-lg mb-1 truncate">{mentor.name}</h3>
                        <p className="text-gray-600 mb-2 text-sm">{mentor.subject}</p>
                        <div className="flex items-center">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-4 w-4 ${i < Math.floor(mentor.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 ml-2">{mentor.rating.toFixed(1)} ({mentor.reviews})</span>
                        </div>
                      </div>
                      <Badge className={`${statusColorClasses[mentor.status] || 'bg-gray-100 text-gray-800'} font-medium text-xs px-2 py-1`}>
                        {mentor.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3 mb-6 bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-3 text-gray-400 flex-shrink-0" />
                        <span className="font-medium">Next Available:</span>
                        <span className="ml-2">{mentor.date} @ {mentor.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-3 text-gray-400 flex-shrink-0" />
                        <span className="font-medium">Duration:</span>
                        <span className="ml-2">{mentor.duration}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <DollarSign className="h-4 w-4 mr-3 text-gray-400 flex-shrink-0" />
                        <span className="font-medium text-gray-600">Price:</span>
                        <span className="ml-2 font-bold text-gray-900">${mentor.price}/session</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {mentor.tags.map((tag) => (
                        <Badge key={tag.label} variant="secondary" className={`text-xs ${tagColorClasses[tag.color]}`}>
                          {tag.label}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md group-hover:bg-blue-700">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Book Session
                      </Button>
                      <Button variant="outline" className="h-11 px-3 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <Button variant="outline" className="px-8 py-3 h-auto border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-all duration-200">
                Load More Mentors
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="booked">
            <div className="flex flex-col items-center justify-center py-20 text-center max-w-lg mx-auto">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8">
                <CalendarX className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
                No Sessions Booked Yet
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                Your booked mentor sessions will appear here once you start scheduling sessions. Explore our exceptional mentors and book your first learning session.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="px-8 py-3 h-auto bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                  onClick={() => setActiveTab('explore')}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Explore Mentors
                </Button>
                <Button variant="outline" className="px-8 py-3 h-auto border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-all duration-200">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Schedule
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

    