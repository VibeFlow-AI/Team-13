import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, BookOpen, Users, Clock, Award, TrendingUp, Star, Plus } from "lucide-react";

export default function MenteeDashboard() {
  // TODO: Replace with real data once backend is connected
  const upcomingSessions = [
    {
      id: 1,
      date: "2025-07-20T14:00:00Z",
      mentor: "Dr. Jane Smith",
      subject: "Calculus I",
      type: "1-on-1",
      duration: "60 min",
      avatar: "/avatars/jane-smith.jpg"
    },
    {
      id: 2,
      date: "2025-07-22T16:30:00Z",
      mentor: "Prof. Alan Turing",
      subject: "Discrete Mathematics",
      type: "Group",
      duration: "90 min",
      avatar: "/avatars/alan-turing.jpg"
    },
  ];

  const stats = [
    { label: "Sessions Completed", value: "24", icon: Calendar, trend: "+12%", color: "bg-gradient-to-br from-blue-500 to-cyan-500" },
    { label: "Hours Learned", value: "36", icon: Clock, trend: "+8%", color: "bg-gradient-to-br from-purple-500 to-pink-500" },
    { label: "Subjects", value: "8", icon: BookOpen, trend: "+2", color: "bg-gradient-to-br from-green-500 to-emerald-500" },
    { label: "Average Rating", value: "4.8", icon: Star, trend: "+0.2", color: "bg-gradient-to-br from-orange-500 to-red-500" }
  ];

  const recentAchievements = [
    { title: "Math Wizard", description: "Completed 10 calculus sessions", icon: "🧮" },
    { title: "Consistent Learner", description: "7 days streak", icon: "🔥" },
    { title: "Top Performer", description: "95% assignment completion", icon: "⭐" }
  ];

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-12 space-y-12">
        {/* Hero Header - Minimalist Welcome */}
        <header className="bg-white border-b border-gray-200 pb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-gray-900 mb-2">
                Welcome back, Alex
              </h1>
              <p className="text-gray-600 text-lg font-light">Ready to continue your learning journey?</p>
            </div>
            <div className="flex gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 font-medium shadow-sm">
                <Plus className="h-4 w-4 mr-2" />
                Book Session
              </Button>
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2">
                View Schedule
              </Button>
            </div>
          </div>
        </header>

        {/* Stats Grid - Minimal Cards */}
        <section>
          <h2 className="text-2xl font-light text-gray-900 mb-8">Your Progress</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={stat.label} className="bg-gray-50 border-0 hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className="h-6 w-6 text-gray-600" />
                    <span className="text-sm font-medium text-gray-500 bg-white px-2 py-1 rounded-md">
                      {stat.trend}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-light text-gray-900">{stat.value}</p>
                    <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Upcoming Sessions - Clean Cards */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-light text-gray-900">Upcoming Sessions</h2>
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 gap-2">
              <Calendar className="h-4 w-4" />
              View All
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {upcomingSessions.map((session) => (
              <Card key={session.id} className="bg-gray-50 border-0 hover:shadow-md transition-shadow duration-200">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                        {session.mentor.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <CardTitle className="text-lg font-medium text-gray-900">
                          {session.subject}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1 text-gray-600">
                          <Calendar className="h-3 w-3" />
                          {formatDate(session.date)}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs px-3 py-1 bg-white text-gray-700 rounded-full border border-gray-200">
                        {session.type}
                      </span>
                      <span className="text-xs text-gray-500">{session.duration}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      Mentor: <span className="font-medium text-gray-900">{session.mentor}</span>
                    </p>
                    <div className="flex gap-3">
                      <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium">
                        Join Session
                      </Button>
                      <Button size="sm" variant="outline" className="px-3 border-gray-300 hover:bg-gray-50">
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {upcomingSessions.length === 0 && (
              <Card className="col-span-full border border-dashed border-gray-200">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <Calendar className="h-12 w-12 text-gray-400 mb-6" />
                  <CardTitle className="text-xl font-light text-gray-900 mb-2">No upcoming sessions</CardTitle>
                  <CardDescription className="mb-8 max-w-md text-gray-600">
                    You don&apos;t have any sessions scheduled. Browse our amazing mentors to book your first session.
                  </CardDescription>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 font-medium">
                    <Plus className="h-4 w-4 mr-2" />
                    Browse Mentors
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* Recent Achievements - Subtle Recognition */}
        <section>
          <h2 className="text-2xl font-light text-gray-900 mb-8">Recent Achievements</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentAchievements.map((achievement, index) => (
              <Card key={index} className="bg-gray-50 border-0 hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{achievement.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Actions - Minimalist Grid */}
        <section>
          <h2 className="text-2xl font-light text-gray-900 mb-8">Quick Actions</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="group cursor-pointer hover:shadow-md transition-shadow duration-200 bg-gray-50 border-0">
              <CardContent className="p-8 text-center">
                <Users className="h-8 w-8 mx-auto mb-4 text-blue-600" />
                <h3 className="font-medium text-gray-900">Find Mentors</h3>
                <p className="text-sm text-gray-600 mt-2">Browse available mentors</p>
              </CardContent>
            </Card>
            <Card className="group cursor-pointer hover:shadow-md transition-shadow duration-200 bg-gray-50 border-0">
              <CardContent className="p-8 text-center">
                <Calendar className="h-8 w-8 mx-auto mb-4 text-blue-600" />
                <h3 className="font-medium text-gray-900">Schedule Session</h3>
                <p className="text-sm text-gray-600 mt-2">Book a new session</p>
              </CardContent>
            </Card>
            <Card className="group cursor-pointer hover:shadow-md transition-shadow duration-200 bg-gray-50 border-0">
              <CardContent className="p-8 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-4 text-blue-600" />
                <h3 className="font-medium text-gray-900">View Progress</h3>
                <p className="text-sm text-gray-600 mt-2">Track your learning</p>
              </CardContent>
            </Card>
            <Card className="group cursor-pointer hover:shadow-md transition-shadow duration-200 bg-gray-50 border-0">
              <CardContent className="p-8 text-center">
                <Award className="h-8 w-8 mx-auto mb-4 text-blue-600" />
                <h3 className="font-medium text-gray-900">Achievements</h3>
                <p className="text-sm text-gray-600 mt-2">View all badges</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
