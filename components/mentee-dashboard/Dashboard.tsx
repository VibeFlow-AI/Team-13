import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, BookOpen } from "lucide-react";

export default function MenteeDashboard() {
  // TODO: Replace with real data once backend is connected
  const upcomingSessions = [
    {
      id: 1,
      date: "2025-07-20T14:00:00Z",
      mentor: "Dr. Jane Smith",
      subject: "Calculus I",
    },
    {
      id: 2,
      date: "2025-07-22T16:30:00Z",
      mentor: "Prof. Alan Turing",
      subject: "Discrete Mathematics",
    },
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
    <div className="space-y-8">
      <header className="flex items-center gap-3">
        <BookOpen className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">My Dashboard</h1>
      </header>

      {/* Upcoming Sessions */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">Upcoming Sessions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {upcomingSessions.map((session) => (
            <Card key={session.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  {formatDate(session.date)}
                </CardTitle>
                <CardDescription>{session.subject}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Mentor: <span className="font-medium">{session.mentor}</span>
                </p>
                <Button size="sm" className="mt-4 w-full">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
          {upcomingSessions.length === 0 && (
            <Card className="sm:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle>No upcoming sessions</CardTitle>
                <CardDescription>
                  You don&apos;t have any sessions scheduled. Browse mentors to
                  book your first session.
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
} 