"use client";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, User, Edit, LogOut } from "lucide-react";

const pieData = [
  { name: "Math", value: 40 },
  { name: "Science", value: 30 },
  { name: "English", value: 30 },
];

const barData = [
  { name: "Mon", sessions: 3 },
  { name: "Tue", sessions: 5 },
  { name: "Wed", sessions: 2 },
  { name: "Thu", sessions: 4 },
  { name: "Fri", sessions: 1 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const upcomingSessions = [
  {
    id: 1,
    name: "John Doe",
    subject: "Mathematics",
    time: "10:00 AM",
  },
  {
    id: 2,
    name: "Jane Smith",
    subject: "English Literature",
    time: "12:30 PM",
  },
];

export default function MentorDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Main Dashboard */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 px-8 py-6">
          <h1 className="text-3xl font-bold text-slate-800">Mentor Dashboard</h1>
          <p className="text-slate-600 mt-1">Manage your sessions and track your progress</p>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2">
          <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="h-[320px] p-6">
              <h2 className="mb-6 text-xl font-bold text-slate-800">Subjects Breakdown</h2>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="h-[320px] p-6">
              <h2 className="mb-6 text-xl font-bold text-slate-800">Weekly Sessions</h2>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sessions" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Sessions */}
        <div className="px-8 pb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Upcoming Sessions</h2>
            <div className="h-1 flex-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-6 rounded-full"></div>
          </div>
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <Card
                key={session.id}
                className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group"
              >
                <div className="flex items-center p-6">
                  <div className="flex items-center gap-6 flex-1">
                    <Avatar className="h-14 w-14 ring-4 ring-blue-100 group-hover:ring-blue-200 transition-all duration-300">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg">
                        {session.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300">
                        {session.name}
                      </h4>
                      <p className="text-sm text-slate-600 font-medium">{session.subject}</p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <p className="text-sm text-slate-500 font-medium">{session.time}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      Start Session
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
