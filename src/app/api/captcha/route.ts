import { NextRequest, NextResponse } from "next/server";

interface CloudflareTurnstileResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
}

export async function POST(req: NextRequest) {
  try {
    const { token }: { token: string } = await req.json();

    if (!token) {
      console.error("Turnstile verification failed: Missing token");
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const turnstileSecretKey = process.env.NODE_ENV === 'development'
      ? '1x0000000000000000000000000000000AA'
      : process.env.TURNSTILE_SECRET_KEY!;

    if (!turnstileSecretKey) {
      console.error("Turnstile verification failed: Missing secret key");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const turnstileRequest = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: `secret=${encodeURIComponent(turnstileSecretKey)}&response=${encodeURIComponent(token)}`,
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (!turnstileRequest.ok) {
      console.error("Turnstile API request failed:", turnstileRequest.statusText);
      return NextResponse.json({ error: "Failed to verify token" }, { status: 500 });
    }

    const turnstileResponse = (await turnstileRequest.json()) as CloudflareTurnstileResponse;

    if (!turnstileResponse.success) {
      console.error("Turnstile verification failed:", turnstileResponse["error-codes"]);
      return NextResponse.json({ 
        error: "Invalid token", 
        details: turnstileResponse["error-codes"] 
      }, { status: 400 });
    }

    console.log("Turnstile verification successful");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Unexpected error during Turnstile verification:", error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}