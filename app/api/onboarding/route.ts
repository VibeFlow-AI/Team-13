import { NextRequest, NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase-server"
import { 
  studentOnboardingSchema, 
  mentorOnboardingSchema,
  onboardingProgressSchema 
} from "@/lib/validations/onboarding"

// POST - Complete onboarding
export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient()
    const body = await request.json()
    const { role, ...formData } = body

    // Validate based on role
    let validatedData
    if (role === "STUDENT") {
      validatedData = studentOnboardingSchema.parse(formData)
    } else if (role === "MENTOR") {
      validatedData = mentorOnboardingSchema.parse(formData)
    } else {
      return NextResponse.json(
        { error: "Invalid role specified" },
        { status: 400 }
      )
    }

    // Get current user (you'll need to implement auth)
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      )
    }

    // Save user data to database
    const userData = {
      email: user.email!,
      role: role as "STUDENT" | "MENTOR",
      isOnboarded: true,
      ...validatedData,
    }

    const { data, error } = await supabase
      .from("users")
      .upsert(userData, { onConflict: "email" })
      .select()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json(
        { error: "Failed to save onboarding data" },
        { status: 500 }
      )
    }

    // Clean up progress data
    await supabase
      .from("onboarding_progress")
      .delete()
      .eq("userId", data[0].id)

    return NextResponse.json({ 
      success: true, 
      message: "Onboarding completed successfully",
      user: data[0]
    })

  } catch (error) {
    console.error("Onboarding error:", error)
    
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// GET - Get current onboarding status
export async function GET(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      )
    }

    // Get user data
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("email", user.email!)
      .single()

    if (userError && userError.code !== "PGRST116") {
      console.error("Database error:", userError)
      return NextResponse.json(
        { error: "Failed to fetch user data" },
        { status: 500 }
      )
    }

    // Get progress data if exists
    let progressData = null
    if (userData) {
      const { data: progress } = await supabase
        .from("onboarding_progress")
        .select("*")
        .eq("userId", userData.id)
        .single()
      
      progressData = progress
    }

    return NextResponse.json({
      user: userData,
      progress: progressData,
      isOnboarded: userData?.isOnboarded || false
    })

  } catch (error) {
    console.error("Get onboarding error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
