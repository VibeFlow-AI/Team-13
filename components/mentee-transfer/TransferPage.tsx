"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowRightLeft,
  Calendar,
  Clock,
  Star,
  MapPin,
  Users,
  Video,
  MessageSquare,
  Search,
  Filter,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  User,
  Award,
  Globe,
  BookOpen,
  RefreshCw,
  XCircle,
  Info,
  Heart,
  DollarSign
} from "lucide-react";

interface CurrentMentor {
  id: string;
  name: string;
  title: string;
  rating: number;
  reviews: number;
  price: number;
  subjects: string[];
  sessionCount: number;
  joinDate: string;
  nextSession: string;
  avatar: string;
  reason?: string;
}

interface TransferRequest {
  id: string;
  status: "pending" | "approved" | "rejected";
  requestDate: string;
  reason: string;
  currentMentor: string;
  newMentor: string;
  adminNotes?: string;
}

interface NewMentor {
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
  location: string;
  isOnline: boolean;
  description: string;
  specialties: string[];
}

export default function TransferPage() {
  const [activeTab, setActiveTab] = useState<"current" | "request" | "history">("current");
  const [selectedNewMentor, setSelectedNewMentor] = useState<NewMentor | null>(null);
  const [transferReason, setTransferReason] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [showTransferForm, setShowTransferForm] = useState(false);

  // Mock current mentor data
  const currentMentor: CurrentMentor = {
    id: "1",
    name: "Dr. Sarah Chen",
    title: "Mathematics Professor",
    rating: 4.9,
    reviews: 127,
    price: 45,
    subjects: ["Calculus", "Linear Algebra", "Statistics"],
    sessionCount: 12,
    joinDate: "2024-01-15",
    nextSession: "2025-01-22T14:00:00Z",
    avatar: "/avatars/sarah-chen.jpg"
  };

  // Mock transfer requests
  const transferRequests: TransferRequest[] = [
    {
      id: "1",
      status: "pending",
      requestDate: "2025-01-20",
      reason: "Need help with advanced programming concepts",
      currentMentor: "Dr. Sarah Chen",
      newMentor: "Prof. James Wilson"
    },
    {
      id: "2",
      status: "approved",
      requestDate: "2025-01-15",
      reason: "Schedule conflicts with current mentor",
      currentMentor: "Dr. Emily Rodriguez",
      newMentor: "Dr. Sarah Chen",
      adminNotes: "Transfer approved. New mentor assigned."
    }
  ];

  // Mock available mentors for transfer
  const availableMentors: NewMentor[] = [
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
      location: "Online Only",
      isOnline: true,
      description: "Making complex physics concepts simple and understandable.",
      specialties: ["Quantum Physics", "Thermodynamics", "Problem Solving"]
    }
  ];

  const subjects = ["Mathematics", "Physics", "Computer Science", "Engineering", "Statistics"];

  const filteredMentors = availableMentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSubject = !selectedSubject || mentor.subjects.some(subject =>
      subject.toLowerCase().includes(selectedSubject.toLowerCase()));

    return matchesSearch && matchesSubject;
  });

  const handleRequestTransfer = () => {
    if (!selectedNewMentor || !transferReason.trim()) return;

    console.log("Transfer request submitted:", {
      newMentor: selectedNewMentor.name,
      reason: transferReason
    });

    // Reset form
    setSelectedNewMentor(null);
    setTransferReason("");
    setShowTransferForm(false);

    // Show success message
    alert("Transfer request submitted successfully!");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
            <ArrowRightLeft className="h-4 w-4" />
            Mentor Transfer Center
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Manage Your Mentor Relationship
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Request a mentor transfer if your current mentor isn't the perfect fit for your learning needs
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white dark:bg-gray-900 p-1 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            {[
              { key: "current", label: "Current Mentor", icon: User },
              { key: "request", label: "Request Transfer", icon: ArrowRightLeft },
              { key: "history", label: "Transfer History", icon: RefreshCw }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200
                  ${activeTab === key
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                  }
                `}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Current Mentor Tab */}
        {activeTab === "current" && (
          <div className="space-y-8">
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <User className="h-6 w-6 text-blue-600" />
                  Your Current Mentor
                </CardTitle>
                <CardDescription>
                  Here's information about your current mentor relationship
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Mentor Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-6 mb-6">
                      <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-2xl shadow-lg">
                        {currentMentor.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                          {currentMentor.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">{currentMentor.title}</p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{currentMentor.rating}</span>
                            <span className="text-sm text-gray-500">({currentMentor.reviews} reviews)</span>
                          </div>
                          <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                            <DollarSign className="h-4 w-4" />
                            <span className="font-semibold">{currentMentor.price}/hr</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Subjects */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Subjects</h4>
                      <div className="flex flex-wrap gap-2">
                        {currentMentor.subjects.map((subject) => (
                          <span
                            key={subject}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="lg:w-80">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl">
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{currentMentor.sessionCount}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Sessions Completed</p>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl">
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">{formatDate(currentMentor.joinDate)}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Partnership Started</p>
                      </div>
                    </div>

                    <div className="mt-4 p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Next Session</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {new Date(currentMentor.nextSession).toLocaleString()}
                      </p>
                    </div>

                    <Button
                      onClick={() => setActiveTab("request")}
                      className="w-full mt-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                    >
                      <ArrowRightLeft className="h-4 w-4 mr-2" />
                      Request Transfer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Request Transfer Tab */}
        {activeTab === "request" && (
          <div className="space-y-8">
            {!showTransferForm ? (
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <ArrowRightLeft className="h-6 w-6 text-purple-600" />
                    Request Mentor Transfer
                  </CardTitle>
                  <CardDescription>
                    Browse available mentors and request a transfer if needed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Warning Notice */}
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 mb-6">
                    <div className="flex gap-3">
                      <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                          Important Notice
                        </h4>
                        <p className="text-sm text-yellow-700 dark:text-yellow-300">
                          Transfer requests are reviewed by our team and may take 1-2 business days to process.
                          Please provide a clear reason for your request to help us assist you better.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Search and Filters */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search mentors..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 h-12"
                      />
                    </div>
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="h-12 px-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
                    >
                      <option value="">All Subjects</option>
                      {subjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                    <Button
                      onClick={() => setShowTransferForm(true)}
                      disabled={!selectedNewMentor}
                      className="h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      Continue with Selected
                    </Button>
                  </div>

                  {/* Available Mentors */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredMentors.map((mentor) => (
                      <Card
                        key={mentor.id}
                        className={`cursor-pointer transition-all duration-300 border-2 ${
                          selectedNewMentor?.id === mentor.id
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                        }`}
                        onClick={() => setSelectedNewMentor(mentor)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-semibold">
                              {mentor.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                                {mentor.name}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">{mentor.title}</p>
                              <div className="flex items-center gap-4 mt-2">
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm font-medium">{mentor.rating}</span>
                                </div>
                                <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                                  <DollarSign className="h-4 w-4" />
                                  <span className="font-semibold">{mentor.price}/hr</span>
                                </div>
                              </div>
                            </div>
                            {selectedNewMentor?.id === mentor.id && (
                              <CheckCircle className="h-6 w-6 text-blue-600" />
                            )}
                          </div>

                          <div className="space-y-3">
                            <div className="flex flex-wrap gap-2">
                              {mentor.subjects.slice(0, 3).map((subject) => (
                                <span
                                  key={subject}
                                  className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                                >
                                  {subject}
                                </span>
                              ))}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                              {mentor.description}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <ArrowRightLeft className="h-6 w-6 text-purple-600" />
                    Complete Transfer Request
                  </CardTitle>
                  <CardDescription>
                    Provide details for your mentor transfer request
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Selected Mentor */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Selected New Mentor</h3>
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-semibold">
                          {selectedNewMentor?.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{selectedNewMentor?.name}</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{selectedNewMentor?.title}</p>
                        </div>
                      </div>
                    </div>

                    {/* Reason */}
                    <div className="space-y-2">
                      <Label htmlFor="reason" className="text-sm font-medium">
                        Reason for Transfer Request *
                      </Label>
                      <textarea
                        id="reason"
                        value={transferReason}
                        onChange={(e) => setTransferReason(e.target.value)}
                        placeholder="Please explain why you'd like to transfer to this mentor..."
                        className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                        required
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                      <Button
                        onClick={() => setShowTransferForm(false)}
                        variant="outline"
                        className="flex-1"
                      >
                        Back to Selection
                      </Button>
                      <Button
                        onClick={handleRequestTransfer}
                        disabled={!transferReason.trim()}
                        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                      >
                        Submit Request
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Transfer History Tab */}
        {activeTab === "history" && (
          <div className="space-y-6">
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <RefreshCw className="h-6 w-6 text-green-600" />
                  Transfer History
                </CardTitle>
                <CardDescription>
                  View all your previous transfer requests and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transferRequests.map((request) => (
                    <Card key={request.id} className="border border-gray-200 dark:border-gray-700">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              {getStatusIcon(request.status)}
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                              </span>
                              <span className="text-sm text-gray-500">{formatDate(request.requestDate)}</span>
                            </div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                              Transfer from {request.currentMentor} to {request.newMentor}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                              Reason: {request.reason}
                            </p>
                            {request.adminNotes && (
                              <p className="text-blue-600 dark:text-blue-400 text-sm">
                                Admin Notes: {request.adminNotes}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {transferRequests.length === 0 && (
                    <div className="text-center py-12">
                      <RefreshCw className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        No Transfer History
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        You haven't made any transfer requests yet.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
