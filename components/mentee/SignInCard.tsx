import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github } from "lucide-react";
import React from "react";

export default function SignInCard() {
  return (
    <Card className="w-full max-w-sm border-0 shadow-lg bg-white">
      <CardHeader className="gap-1 text-center">
        <CardTitle className="text-2xl font-semibold">Sign in to EduVibe</CardTitle>
        <CardDescription className="text-base">Welcome back! please sign in to continue</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {/* Social auth buttons */}
        <div className="flex justify-center gap-4">
          <Button size="icon" className="bg-black hover:bg-black/80 text-white">
            G
          </Button>
          <Button size="icon" className="bg-black hover:bg-black/80 text-white">
            f
          </Button>
          <Button size="icon" className="bg-black hover:bg-black/80 text-white">
            <Github className="size-5" />
          </Button>
        </div>

        <div className="relative flex items-center justify-center">
          <span className="text-sm text-muted-foreground">— or —</span>
        </div>

        {/* Email form */}
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 text-left">
            <Label htmlFor="email" className="text-sm font-medium text-gray-900">Email address</Label>
            <Input id="email" type="email" placeholder="you@example.com" required />
          </div>
          <Button type="submit" className="w-full bg-black hover:bg-black/90 text-white">Continue</Button>
        </form>
      </CardContent>
    </Card>
  );
} 