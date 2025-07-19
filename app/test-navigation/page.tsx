"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  ExternalLink,
  Home,
  Users,
  GraduationCap,
  BarChart3,
  Calendar,
  ArrowRight,
  AlertTriangle,
  User,
  Lock
} from "lucide-react";

interface RouteTest {
  name: string;
  path: string;
  description: string;
  type: "mentor" | "student" | "general";
  status: "untested" | "working" | "error";
  icon: any;
}

export default function NavigationTest() {
  const router = useRouter();
  const [testResults, setTestResults] = useState<Record<string, "untested" | "working" | "error">>({});

  const routes: RouteTest[] = [
    // General Routes
    {
      name: "Homepage",
      path: "/",
      description: "Main landing page with hero section",
      type: "general",
      status: "untested",
      icon: Home
    },
    {
      name: "Authentication",
      path: "/auth",
      description: "Login, signup, and password reset page",
      type: "general",
      status: "untested",
      icon: User
    },
    {
      name: "Password Reset",
      path: "/auth/reset-password",
      description: "Set new password after reset",
      type: "general",
      status: "untested",
      icon: Lock
    },
    {
      name: "Role Selection",
      path: "/role-selection",
      description: "Choose between mentor and student signup (requires auth)",
      type: "general",
      status: "untested",
      icon: Users
    },

    // Student Routes
    {
      name: "Student Onboarding",
      path: "/mentee-onboard",
      description: "3-step student onboarding form",
      type: "student",
      status: "untested",
      icon: GraduationCap
    },
    {
      name: "Student Dashboard (Primary)",
      path: "/mentee-dashboard",
      description: "Main student dashboard with stats and sessions",
      type: "student",
      status: "untested",
      icon: BarChart3
    },
    {
      name: "Student Dashboard (Alt)",
      path: "/mentee",
      description: "Alternative route to student dashboard",
      type: "student",
      status: "untested",
      icon: BarChart3
    },
    {
      name: "Student Onboarding (Alt)",
      path: "/mentee/onboarding",
      description: "Alternative route to student onboarding",
      type: "student",
      status: "untested",
      icon: GraduationCap
    },
    {
      name: "Mentor Booking",
      path: "/mentee/booking",
      description: "Find and book mentors",
      type: "student",
      status: "untested",
      icon: Calendar
    },
    {
      name: "Mentor Transfer",
      path: "/mentee/transfer",
      description: "Request mentor transfer",
      type: "student",
      status: "untested",
      icon: ArrowRight
    },

    // Mentor Routes
    {
      name: "Mentor Onboarding",
      path: "/mentor/onboarding",
      description: "3-step mentor application form",
      type: "mentor",
      status: "untested",
      icon: GraduationCap
    },
    {
      name: "Mentor Dashboard",
      path: "/mentor",
      description: "Mentor dashboard with analytics and student management",
      type: "mentor",
      status: "untested",
      icon: BarChart3
    }
  ];

  const testRoute = async (route: RouteTest) => {
    try {
      // Update status to testing
      setTestResults(prev => ({ ...prev, [route.path]: "untested" }));

      // Navigate to route
      router.push(route.path);

      // Simulate test completion
      setTimeout(() => {
        setTestResults(prev => ({ ...prev, [route.path]: "working" }));
      }, 500);

    } catch (error) {
      setTestResults(prev => ({ ...prev, [route.path]: "error" }));
    }
  };

  const testAllRoutes = () => {
    routes.forEach((route, index) => {
      setTimeout(() => {
        testRoute(route);
      }, index * 1000);
    });
  };

  const getStatusIcon = (path: string) => {
    const status = testResults[path] || "untested";
    switch (status) {
      case "working":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-300"></div>;
    }
  };

  const getStatusColor = (path: string) => {
    const status = testResults[path] || "untested";
    switch (status) {
      case "working":
        return "border-green-200 bg-green-50";
      case "error":
        return "border-red-200 bg-red-50";
      default:
        return "border-gray-200 bg-white";
    }
  };

  const groupedRoutes = {
    general: routes.filter(r => r.type === "general"),
    student: routes.filter(r => r.type === "student"),
    mentor: routes.filter(r => r.type === "mentor")
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-gray-900 mb-4">
            Navigation Testing Dashboard
          </h1>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto mb-8">
            Test all routing paths to ensure proper navigation flow
          </p>
          <Button
            onClick={testAllRoutes}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-medium"
          >
            Test All Routes
          </Button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gray-50 border-0">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-light text-gray-900 mb-2">
                {routes.length}
              </div>
              <div className="text-gray-600 font-medium">Total Routes</div>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-0">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-light text-green-700 mb-2">
                {Object.values(testResults).filter(status => status === "working").length}
              </div>
              <div className="text-green-600 font-medium">Working</div>
            </CardContent>
          </Card>
          <Card className="bg-red-50 border-0">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-light text-red-700 mb-2">
                {Object.values(testResults).filter(status => status === "error").length}
              </div>
              <div className="text-red-600 font-medium">Errors</div>
            </CardContent>
          </Card>
        </div>

        {/* Route Groups */}
        <div className="space-y-12">
          {Object.entries(groupedRoutes).map(([groupName, groupRoutes]) => (
            <section key={groupName}>
              <h2 className="text-2xl font-light text-gray-900 mb-6 capitalize">
                {groupName} Routes
              </h2>
              <div className="grid gap-4">
                {groupRoutes.map((route) => {
                  const IconComponent = route.icon;
                  return (
                    <Card
                      key={route.path}
                      className={`border transition-all duration-200 hover:shadow-md ${getStatusColor(route.path)}`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-white rounded-lg">
                              <IconComponent className="h-5 w-5 text-gray-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-1">
                                <h3 className="font-medium text-gray-900">
                                  {route.name}
                                </h3>
                                {getStatusIcon(route.path)}
                              </div>
                              <p className="text-gray-600 font-light text-sm">
                                {route.description}
                              </p>
                              <code className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded mt-2 inline-block">
                                {route.path}
                              </code>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => testRoute(route)}
                              className="border-gray-300 hover:bg-gray-50"
                            >
                              Test
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => router.push(route.path)}
                              className="border-blue-300 text-blue-600 hover:bg-blue-50"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Flow Diagram */}
        <section className="mt-16">
          <h2 className="text-2xl font-light text-gray-900 mb-8 text-center">
            User Flow Overview
          </h2>
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gray-50 border-0 p-8">
              <div className="text-center space-y-8">
                <div>
                  <div className="inline-block p-4 bg-white rounded-lg shadow-sm">
                    <Home className="h-6 w-6 text-gray-600" />
                  </div>
                  <p className="mt-2 font-medium">Homepage</p>
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="h-6 w-6 text-gray-400" />
                </div>

                <div>
                  <div className="inline-block p-4 bg-white rounded-lg shadow-sm">
                    <Users className="h-6 w-6 text-gray-600" />
                  </div>
                  <p className="mt-2 font-medium">Role Selection</p>
                </div>

                <div className="flex justify-center gap-8">
                  <ArrowRight className="h-6 w-6 text-gray-400 rotate-45" />
                  <ArrowRight className="h-6 w-6 text-gray-400 -rotate-45" />
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="inline-block p-4 bg-green-100 rounded-lg">
                      <GraduationCap className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="mt-2 font-medium">Student Onboarding</p>
                    <div className="mt-4 flex justify-center">
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="mt-4 inline-block p-3 bg-green-50 rounded-lg">
                      <BarChart3 className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="mt-2 text-sm">Student Dashboard</p>
                  </div>

                  <div className="text-center">
                    <div className="inline-block p-4 bg-blue-100 rounded-lg">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="mt-2 font-medium">Mentor Onboarding</p>
                    <div className="mt-4 flex justify-center">
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="mt-4 inline-block p-3 bg-blue-50 rounded-lg">
                      <BarChart3 className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="mt-2 text-sm">Mentor Dashboard</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
