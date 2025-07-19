import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";

export default function MentorOnboarding() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <Card className="max-w-2xl w-full bg-white border-0 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] rounded-2xl overflow-hidden">
        <CardContent className="p-12 text-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <span className="text-2xl">🎓</span>
          </div>
          <CardTitle className="text-3xl font-light text-gray-900 mb-4 tracking-tight">Mentor Onboarding</CardTitle>
          <CardDescription className="text-lg text-gray-600 leading-relaxed mb-8">
            Thank you for your interest in becoming a mentor. The mentor onboarding flow will be implemented in the next
            phase.
          </CardDescription>
          <Button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md">
            Coming Soon
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
