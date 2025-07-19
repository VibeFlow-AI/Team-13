import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // create new svix instance with secret
  const wh = new Webhook(WEBHOOK_SECRET);

  // Get the headers
  const svix_id = req.headers.get("svix-id");
  const svix_timestamp = req.headers.get("svix-timestamp");
  const svix_signature = req.headers.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  const eventType = evt.type;

  try {
    switch (eventType) {
      case "user.created": {
        const {
          id: clerkId,
          email_addresses,
          first_name,
          last_name,
        } = evt.data;
        const email = email_addresses[0]?.email_address;
        if (!clerkId || !email) {
          return NextResponse.json({ error: "Missing data" }, { status: 400 });
        }

        // create user in supabase

        break;
      }
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`${eventType} webhook error:`, error);
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 },
    );
  }
}
