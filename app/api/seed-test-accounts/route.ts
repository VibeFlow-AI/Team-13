import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/lib/database.types";
import { exec } from "child_process";
import { promisify } from "util";

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

    // Use the promisify version of exec to run the seed script
    const execPromise = promisify(exec);

    try {
      // Run the seed script
      const { stdout, stderr } = await execPromise('node ./scripts/seed.js');

      if (stderr) {
        console.error('Seed script stderr:', stderr);
      }

      console.log('Seed script stdout:', stdout);

      return NextResponse.json(
        { message: "Test accounts seeded successfully", output: stdout },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error running seed script:', error);
      return NextResponse.json(
        { error: "Failed to seed test accounts", details: error },
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
