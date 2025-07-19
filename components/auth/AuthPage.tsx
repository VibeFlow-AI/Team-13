"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "@/lib/database.types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  User,
  Github,
  Chrome,
  Users,
  GraduationCap
} from "lucide-react";

type AuthMode = "login" | "signup" | "reset";

interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
  fullName?: string;
}

interface QuickLoginUser {
  label: string;
  email: string;
  password: string;
  role: 'MENTOR' | 'STUDENT';
}

export default function AuthPage() {
  const router = useRouter();
  const supabase = useSupabaseClient<Database>();

  const [mode, setMode] = useState<AuthMode>("login");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: ""
  });

  // Sample login credentials for quick access
  const quickLoginUsers: QuickLoginUser[] = [
    {
      label: "Login as Mentor",
      email: "mentor@example.com",
      password: "mentor123",
      role: "MENTOR"
    },
    {
      label: "Login as Mentee",
      email: "mentee@example.com",
      password: "mentee123",
      role: "STUDENT"
    }
  ];

  // Debug mode - log any auth errors
  useEffect(() => {
    if (message?.type === "error") {
      console.log("Auth error:", message.text);
    }
  }, [message]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setMessage(null);
  };

  const validateForm = (): boolean => {
    if (!formData.email || !formData.email.includes("@")) {
      setMessage({ type: "error", text: "Please enter a valid email address" });
      return false;
    }

    if (mode !== "reset" && !formData.password) {
      setMessage({ type: "error", text: "Password is required" });
      return false;
    }

    if (mode === "signup") {
      if (!formData.fullName?.trim()) {
        setMessage({ type: "error", text: "Full name is required" });
        return false;
      }

      if (formData.password.length < 6) {
        setMessage({ type: "error", text: "Password must be at least 6 characters" });
        return false;
      }

      if (formData.password !== formData.confirmPassword) {
        setMessage({ type: "error", text: "Passwords do not match" });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setMessage(null);

    try {
      if (mode === "login") {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          setMessage({ type: "error", text: error.message });
        } else {
          setMessage({ type: "success", text: "Login successful! Redirecting..." });
          // Let middleware handle the redirection based on user role
          setTimeout(() => {
            router.refresh();
          }, 1000);
        }
      } else if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
              role: 'STUDENT' // Default role for new signups
            },
          },
        });

        if (error) {
          setMessage({ type: "error", text: error.message });
        } else {
          setMessage({
            type: "success",
            text: "Account created! Please check your email to verify your account."
          });
          setMode("login");
        }
      } else if (mode === "reset") {
        const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
          redirectTo: `${window.location.origin}/auth/reset-password`,
        });

        if (error) {
          setMessage({ type: "error", text: error.message });
        } else {
          setMessage({
            type: "success",
            text: "Password reset email sent! Please check your inbox."
          });
        }
      }
    } catch (error) {
      setMessage({ type: "error", text: "An unexpected error occurred" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: "google" | "github") => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            prompt: 'login'  // Force new sign-in to prevent session conflicts
          }
        },
      });

      if (error) {
        setMessage({ type: "error", text: error.message });
        setIsLoading(false);
      }
    } catch (error) {
      setMessage({ type: "error", text: "OAuth login failed" });
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async (user: QuickLoginUser) => {
    // Fill the form fields with the quick login credentials
    setFormData({
      ...formData,
      email: user.email,
      password: user.password
    });

    setMessage({
      type: "success",
      text: `Credentials filled for ${user.role === 'MENTOR' ? 'Mentor' : 'Student'} account. Click "Welcome Back" to log in.`
    });

    // Auto-submit after a brief pause
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const { data, error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: user.password,
      });

      if (error) {
        setMessage({ type: "error", text: error.message });
      } else {
        setMessage({
          type: "success",
          text: `Login successful! Redirecting to ${user.role === 'MENTOR' ? 'Mentor' : 'Student'} dashboard...`
        });

        setTimeout(() => {
          if (user.role === 'MENTOR') {
            router.push("/mentor/dashboard");
          } else {
            router.push("/mentee/dashboard");
          }
        }, 1000);
      }
    } catch (error) {
      setMessage({ type: "error", text: "An unexpected error occurred" });
    } finally {
      setIsLoading(false);
    }
  };

  const getTitle = () => {
    switch (mode) {
      case "login": return "Welcome Back";
      case "signup": return "Create Account";
      case "reset": return "Reset Password";
    }
  };

  const getDescription = () => {
    switch (mode) {
      case "login": return "Sign in to your account to continue your learning journey";
      case "signup": return "Join our community of learners and mentors";
      case "reset": return "Enter your email to receive a password reset link";
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Button>
        </div>

        {/* Main Auth Card */}
        <Card className="border border-gray-200 shadow-lg bg-white">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-2xl font-light text-gray-900">
              {getTitle()}
            </CardTitle>
            <CardDescription className="text-base text-gray-600 font-light">
              {getDescription()}
            </CardDescription>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            {/* Message Display */}
            {message && (
              <div className={`mb-6 p-4 rounded-lg border ${
                message.type === "success"
                  ? "bg-green-50 border-green-200 text-green-800"
                  : "bg-red-50 border-red-200 text-red-800"
              }`}>
                <div className="flex items-center gap-2">
                  {message.type === "success" ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <span className="text-sm font-medium">{message.text}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name (Signup only) */}
              {mode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium text-gray-900">
                    Full Name *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="h-12 pl-10 border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-900">
                  Email Address *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="h-12 pl-10 border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              {mode !== "reset" && (
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-900">
                    Password *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      className="h-12 pl-10 pr-10 border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Confirm Password (Signup only) */}
              {mode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-900">
                    Confirm Password *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      className="h-12 pl-10 pr-10 border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Processing...
                  </div>
                ) : (
                  getTitle()
                )}
              </Button>
            </form>

            {/* Quick Login Options (Login only) */}
            {mode === "login" && (
              <>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Quick Login (For Development)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 text-xs text-center text-gray-500 mb-2">
                    Click a button to auto-fill and sign in with test credentials
                  </div>
                  {quickLoginUsers.map((user, index) => (
                    <Button
                      key={index}
                      type="button"
                      variant="outline"
                      onClick={() => handleQuickLogin(user)}
                      disabled={isLoading}
                      className={`h-11 border-gray-300 hover:bg-gray-50 ${
                        user.role === 'MENTOR' ? 'hover:bg-blue-50' : 'hover:bg-green-50'
                      }`}
                    >
                      {user.role === 'MENTOR' ? (
                        <Users className="h-4 w-4 mr-2" />
                      ) : (
                        <GraduationCap className="h-4 w-4 mr-2" />
                      )}
                      {user.label}
                    </Button>
                  ))}
                </div>
              </>
            )}

            {/* OAuth Options (Login and Signup only) */}
            {mode !== "reset" && (
              <>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleOAuthLogin("google")}
                    disabled={isLoading}
                    className="h-11 border-gray-300 hover:bg-gray-50"
                  >
                    <Chrome className="h-4 w-4 mr-2" />
                    Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleOAuthLogin("github")}
                    disabled={isLoading}
                    className="h-11 border-gray-300 hover:bg-gray-50"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Button>
                </div>
              </>
            )}

            {/* Mode Switch Links */}
            <div className="mt-8 text-center space-y-3">
              {mode === "login" && (
                <>
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setMode("signup")}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Create account
                    </button>
                  </p>
                  <p className="text-sm text-gray-600">
                    Forgot your password?{" "}
                    <button
                      type="button"
                      onClick={() => setMode("reset")}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Reset password
                    </button>
                  </p>
                </>
              )}

              {mode === "signup" && (
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Sign in
                  </button>
                </p>
              )}

              {mode === "reset" && (
                <p className="text-sm text-gray-600">
                  Remember your password?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            By continuing, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700">Terms of Service</a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}
