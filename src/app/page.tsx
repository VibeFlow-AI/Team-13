"use client";

import * as React from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  const [open, setOpen] = React.useState(false);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white p-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold tracking-tighter text-gray-900 mb-4">
          Apex Onboard
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
          A Jony Ive-Inspired Premium Student Onboarding & Dashboard Experience.
        </p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 h-auto rounded-lg font-medium tracking-tight transition-all duration-300 shadow-sm hover:shadow-md">
              Get Started
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md mx-auto bg-white rounded-2xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)] border-0 p-0 overflow-hidden">
            <div className="px-8 pt-8 pb-6">
              <DialogTitle className="text-2xl font-semibold text-gray-900 mb-2 tracking-tight">
                Create Your Account
              </DialogTitle>
              <DialogDescription className="text-gray-600 mb-8 leading-relaxed">
                Begin your learning journey with carefully curated mentorship.
              </DialogDescription>
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium text-gray-900 mb-2 block">
                    Email Address
                  </Label>
                  <Input
                    placeholder="you@example.com"
                    className="h-12 px-4 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all bg-white"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-900 mb-2 block">
                    Password
                  </Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="h-12 px-4 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all bg-white"
                  />
                </div>
              </div>
            </div>
            <div className="px-8 pb-8 pt-2">
              <Link href="/role-selection" passHref>
                <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200">
                  Create Account
                </Button>
              </Link>
              <p className="text-center text-sm text-gray-500 mt-4">
                Already have an account?{" "}
                <span className="text-blue-600 cursor-pointer hover:underline">
                  Sign In
                </span>
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
