import { NextRequest, NextResponse } from "next/server";

interface CloudflareTurnstileResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
}

export async function POST(req: NextRequest) {
  const { token }: { token: string } = await req.json();

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const turnstileRequest = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: `secret=${encodeURIComponent(process.env.TURNSTILE_SECRET_KEY!)}&response=${encodeURIComponent(token)}`,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    }
  );

  const turnstileResponse = (await turnstileRequest.json()) as CloudflareTurnstileResponse;

  if (!turnstileResponse.success) {
    console.error("Turnstile verification failed:", turnstileResponse["error-codes"]);
    return NextResponse.json({ 
      error: "Invalid token", 
      details: turnstileResponse["error-codes"] 
    }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}