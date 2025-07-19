import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Calendar, Clock, DollarSign } from "lucide-react";

const mentors = [
  {
    name: "Dr. Evelyn Reed",
    subject: "Advanced Physics",
    status: "Available",
    date: "July 22, 2025",
    time: "4:00 PM",
    duration: "60 minutes",
    price: "50",
    avatar: "https://placehold.co/48x48.png",
    avatarFallback: "ER",
    aiHint: "woman scientist"
  },
  {
    name: "Dr. Marcus Chen",
    subject: "Quantum Computing",
    status: "Available",
    date: "July 23, 2025",
    time: "10:00 AM",
    duration: "90 minutes",
    price: "75",
    avatar: "https://placehold.co/48x48.png",
    avatarFallback: "MC",
    aiHint: "man scientist"
  },
  {
    name: "Prof. Sofia Rossi",
    subject: "Ancient History",
    status: "Booked",
    date: "July 24, 2025",
    time: "2:00 PM",
    duration: "45 minutes",
    price: "40",
    avatar: "https://placehold.co/48x48.png",
    avatarFallback: "SR",
    aiHint: "woman historian"
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <h1 className="text-4xl font-light text-gray-900 mb-2 tracking-tight">
            Welcome back, Maya
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Your learning journey continues here.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        <Tabs defaultValue="explore" className="w-full">
          <TabsList className="grid w-fit grid-cols-2 bg-gray-100 rounded-lg p-1 mb-8">
            <TabsTrigger value="explore" className="px-6 py-3 rounded-md font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-300">
              Explore Mentors
            </TabsTrigger>
            <TabsTrigger value="booked" className="px-6 py-3 rounded-md font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-300">
              My Sessions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="explore">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mentors.map((mentor, index) => (
                <Card key={index} className="group border-0 bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] transition-all duration-300 rounded-2xl overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-6">
                      <Avatar className="h-12 w-12 ring-2 ring-white/50 group-hover:ring-blue-100 transition-all duration-300">
                        <AvatarImage src={mentor.avatar} alt={mentor.name} data-ai-hint={mentor.aiHint} />
                        <AvatarFallback className="bg-blue-50 text-blue-600 font-semibold">{mentor.avatarFallback}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg mb-1">{mentor.name}</h3>
                        <p className="text-gray-600">{mentor.subject}</p>
                      </div>
                      <Badge className={`${mentor.status === 'Available' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'} font-medium`}>
                        {mentor.status}
                      </Badge>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2.5 text-gray-400" />
                        {mentor.date} @ {mentor.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2.5 text-gray-400" />
                        {mentor.duration}
                      </div>
                      <div className="flex items-center text-sm text-gray-900 font-medium">
                        <DollarSign className="h-4 w-4 mr-2.5 text-gray-400" />
                        ${mentor.price}/session
                      </div>
                    </div>

                    <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md">
                      Book Session
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="booked">
            <div className="flex flex-col items-center justify-center py-24 text-center bg-gray-50 rounded-2xl">
              <div className="w-20 h-20 bg-white border border-gray-200 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">
                No Sessions Yet
              </h3>
              <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
                Your booked mentor sessions will appear here. Start by exploring our exceptional mentors.
              </p>
              <Button variant="outline" className="px-8 py-3 h-auto border-gray-300 text-gray-700 hover:bg-white rounded-lg font-medium">
                Explore Mentors
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
