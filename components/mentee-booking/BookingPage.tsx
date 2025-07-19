"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Calendar,
  Clock,
  Star,
  MapPin,
  Users,
  Video,
  MessageSquare,
  Filter,
  Search,
  Heart,
  Award,
  BookOpen,
  Globe,
  ChevronRight,
  User,
  DollarSign
} from "lucide-react";

interface Mentor {
  id: string;
  name: string;
  title: string;
  rating: number;
  reviews: number;
  price: number;
  subjects: string[];
  languages: string[];
  experience: string;
  avatar: string;
  availability: string[];
  sessionTypes: ("1-on-1" | "group" | "workshop")[];
  location: string;
  isOnline: boolean;
  description: string;
  specialties: string[];
}

export default function BookingPage() {
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Mock data - replace with real API data
  const mentors: Mentor[] = [
    {
      id: "1",
      name: "Dr. Sarah Chen",
      title: "Mathematics Professor",
      rating: 4.9,
      reviews: 127,
      price: 45,
      subjects: ["Calculus", "Linear Algebra", "Statistics"],
      languages: ["English", "Mandarin"],
      experience: "8 years",
      avatar: "/avatars/sarah-chen.jpg",
      availability: ["Mon 2-6pm", "Wed 10am-2pm", "Fri 1-5pm"],
      sessionTypes: ["1-on-1", "group"],
      location: "San Francisco, CA",
      isOnline: true,
      description: "Passionate about making mathematics accessible and engaging for all students.",
      specialties: ["Advanced Calculus", "Test Prep", "Research Methods"]
    },
    {
      id: "2",
      name: "Prof. James Wilson",
      title: "Computer Science Expert",
      rating: 4.8,
      reviews: 89,
      price: 60,
      subjects: ["Programming", "Data Structures", "Algorithms"],
      languages: ["English", "Spanish"],
      experience: "12 years",
      avatar: "/avatars/james-wilson.jpg",
      availability: ["Tue 3-7pm", "Thu 9am-1pm", "Sat 10am-4pm"],
      sessionTypes: ["1-on-1", "workshop"],
      location: "Austin, TX",
      isOnline: true,
      description: "Former Google engineer helping students master programming fundamentals.",
      specialties: ["Python", "JavaScript", "System Design"]
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      title: "Physics & Engineering",
      rating: 4.7,
      reviews: 156,
      price: 50,
      subjects: ["Physics", "Engineering", "Mathematics"],
      languages: ["English", "Spanish", "French"],
      experience: "6 years",
      avatar: "/avatars/emily-rodriguez.jpg",
      availability: ["Mon 1-5pm", "Wed 3-7pm", "Sun 11am-3pm"],
      sessionTypes: ["1-on-1", "group", "workshop"],
      location: "Online Only",
      isOnline: true,
      description: "Making complex physics concepts simple and understandable.",
      specialties: ["Quantum Physics", "Thermodynamics", "Problem Solving"]
    }
  ];

  const subjects = ["Mathematics", "Physics", "Computer Science", "Engineering", "Statistics"];
  const priceRanges = ["Under $30", "$30-$50", "$50-$75", "Over $75"];

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSubject = !selectedSubject || mentor.subjects.some(subject =>
      subject.toLowerCase().includes(selectedSubject.toLowerCase()));
    const matchesPrice = !priceRange || (
      (priceRange === "Under $30" && mentor.price < 30) ||
      (priceRange === "$30-$50" && mentor.price >= 30 && mentor.price <= 50) ||
      (priceRange === "$50-$75" && mentor.price >= 50 && mentor.price <= 75) ||
      (priceRange === "Over $75" && mentor.price > 75)
    );

    return matchesSearch && matchesSubject && matchesPrice;
  });

  const handleBookSession = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    // Here you would typically open a booking modal or navigate to booking page
    console.log("Booking session with:", mentor.name);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-16">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-light text-gray-900 mb-4">
            Find Your Perfect Mentor
          </h1>
          <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
            Connect with expert mentors who will guide you to academic success
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-12 border border-gray-200 shadow-sm bg-gray-50">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search mentors or subjects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 border-gray-300 focus:border-blue-600"
                />
              </div>

              {/* Subject Filter */}
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="h-12 px-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-blue-600"
              >
                <option value="">All Subjects</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>

              {/* Price Filter */}
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="h-12 px-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-blue-600"
              >
                <option value="">All Prices</option>
                {priceRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>

              {/* Favorites Toggle */}
              <Button
                variant={showFavoritesOnly ? "default" : "outline"}
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`h-12 gap-2 font-medium ${showFavoritesOnly ? 'bg-blue-600 hover:bg-blue-700' : 'border-gray-300 hover:bg-gray-50'}`}
              >
                <Heart className={`h-4 w-4 ${showFavoritesOnly ? 'fill-current' : ''}`} />
                Favorites Only
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-light text-gray-900">
            Available Mentors ({filteredMentors.length})
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Filter className="h-4 w-4" />
            Filtered results
          </div>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredMentors.map((mentor) => (
            <Card key={mentor.id} className="group hover:shadow-md transition-shadow duration-200 border border-gray-200 bg-white overflow-hidden">
              {/* Header */}
              <div className="relative p-8 pb-6">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="h-14 w-14 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-lg">
                      {mentor.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    {mentor.isOnline && (
                      <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <div className="h-2 w-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-lg text-gray-900">
                      {mentor.name}
                    </h3>
                    <p className="text-gray-600 text-sm font-light">{mentor.title}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{mentor.rating}</span>
                        <span className="text-xs text-gray-500">({mentor.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-900">
                        <DollarSign className="h-4 w-4" />
                        <span className="font-medium">${mentor.price}/hr</span>
                      </div>
                    </div>
                  </div>

                  {/* Favorite Button */}
                  <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-50">
                    <Heart className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <CardContent className="px-8 pb-8">
                {/* Subjects */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {mentor.subjects.slice(0, 3).map((subject) => (
                      <span
                        key={subject}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md"
                      >
                        {subject}
                      </span>
                    ))}
                    {mentor.subjects.length > 3 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
                        +{mentor.subjects.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-6 line-clamp-2 font-light">
                  {mentor.description}
                </p>

                {/* Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-3 w-3" />
                    {mentor.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Award className="h-3 w-3" />
                    {mentor.experience} experience
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Globe className="h-3 w-3" />
                    {mentor.languages.join(", ")}
                  </div>
                </div>

                {/* Session Types */}
                <div className="flex gap-2 mb-6">
                  {mentor.sessionTypes.map((type) => (
                    <div key={type} className="flex items-center gap-1 px-3 py-1 bg-gray-50 rounded-md border border-gray-200">
                      {type === "1-on-1" && <User className="h-3 w-3" />}
                      {type === "group" && <Users className="h-3 w-3" />}
                      {type === "workshop" && <BookOpen className="h-3 w-3" />}
                      <span className="text-xs font-medium text-gray-700">{type}</span>
                    </div>
                  ))}
                </div>

                {/* Availability Preview */}
                <div className="mb-6">
                  <p className="text-xs text-gray-500 mb-1">Next available:</p>
                  <p className="text-sm font-medium text-gray-900">
                    {mentor.availability[0]}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    onClick={() => handleBookSession(mentor)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                  >
                    Book Session
                  </Button>
                  <Button variant="outline" size="sm" className="px-3 border-gray-300 hover:bg-gray-50">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="px-3 border-gray-300 hover:bg-gray-50">
                    <Video className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredMentors.length === 0 && (
          <Card className="border border-dashed border-gray-300">
            <CardContent className="flex flex-col items-center justify-center py-20 text-center">
              <Search className="h-12 w-12 text-gray-400 mb-6" />
              <h3 className="text-xl font-light text-gray-900 mb-2">
                No mentors found
              </h3>
              <p className="text-gray-600 mb-8 max-w-md font-light">
                We couldn't find any mentors matching your criteria. Try adjusting your filters or search terms.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedSubject("");
                  setPriceRange("");
                  setShowFavoritesOnly(false);
                }}
                variant="outline"
                className="border-gray-300 hover:bg-gray-50 font-medium"
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Load More */}
        {filteredMentors.length > 0 && (
          <div className="text-center mt-16">
            <Button variant="outline" className="px-8 border-gray-300 hover:bg-gray-50 font-medium">
              Load More Mentors
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
