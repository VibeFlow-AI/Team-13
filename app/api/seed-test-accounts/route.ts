import { NextResponse } from "next/server";
import { seedTestAccounts } from "@/lib/seedTestAccounts";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/lib/database.types";

// Secure API route with a secret key to prevent unauthorized access
const API_SECRET_KEY = process.env.SEED_API_SECRET || "development_seed_key";

export async function POST(request: Request) {
  try {
    // Verify authorization
    const authorization = request.headers.get("Authorization");
    if (!authorization || authorization !== `Bearer ${API_SECRET_KEY}`) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    // Only allow in development or staging environments
    const environment = process.env.NODE_ENV;
    if (environment === "production") {
      return NextResponse.json(
        { error: "Seeding not allowed in production environment" },
        { status: 403 }
      );
    }

    // Seed the test accounts
    // Use the latest Supabase JS client with proper typing
    const supabaseAdmin = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        }
      }
    );

    const result = await seedTestAccounts();

    if (result.success) {
      return NextResponse.json(
        { message: "Test accounts seeded successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Failed to seed test accounts", details: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in seed-test-accounts API route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Also allow GET for easier testing in development
export async function GET(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "GET method only allowed in development" },
      { status: 403 }
    );
  }

  return POST(request);
}
