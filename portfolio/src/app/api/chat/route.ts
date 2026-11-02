import { NextResponse } from "next/server";
import { getLocalFallbackAnswer } from "@/lib/portfolioContext";
import {
  callNvidiaChat,
  trimHistory,
  type ChatMessage,
} from "@/lib/nvidiaChat";
import {
  checkDailyRateLimit,
  getRateLimitHeaders,
} from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    // 1. Check daily rate limit (10 requests/day per IP)
    const rateLimit = checkDailyRateLimit(req);
    const rateLimitHeaders = getRateLimitHeaders(rateLimit);

    if (!rateLimit.allowed) {
      const quotaExhaustedReply =
        "You've reached your daily limit of 10 questions! 🎯\n\n" +
        "- Browse his enterprise experience and live projects below.\n" +
        "- Grab his verified [Résumé PDF](/resume.pdf).\n" +
        "- Reach out directly at [aritradutta049@gmail.com](mailto:aritradutta049@gmail.com).\n\n" +
        "⚡ Daily quota resets at midnight UTC. Thank you for visiting!";

      return NextResponse.json(
        {
          reply: quotaExhaustedReply,
          provider: "rate-limited",
          rateLimited: true,
          remaining: 0,
          limit: rateLimit.limit,
          resetAt: rateLimit.resetAt,
        },
        {
          status: 429,
          headers: rateLimitHeaders,
        }
      );
    }

    const body = await req.json();
    const rawMessages = Array.isArray(body?.messages) ? body.messages : [];
    const messages: ChatMessage[] = trimHistory(rawMessages);

    if (!messages.length) {
      return NextResponse.json(
        { error: "No messages provided." },
        { status: 400, headers: rateLimitHeaders }
      );
    }

    const latestUser =
      [...messages].reverse().find((m) => m.role === "user")?.content || "";

    const apiKey = process.env.NVIDIA_API_KEY;

    // 2. Primary engine: NVIDIA LLM Inference.
    // Gracefully degrades to local engine if key has entitlement or network limits.
    if (apiKey) {
      try {
        const reply = await callNvidiaChat(messages, apiKey);
        return NextResponse.json(
          {
            reply,
            provider: "nvidia",
            remaining: rateLimit.remaining,
            limit: rateLimit.limit,
            resetAt: rateLimit.resetAt,
          },
          { headers: rateLimitHeaders }
        );
      } catch (nvidiaError) {
        console.warn(
          "[API/Chat] NVIDIA call failed, using local fallback:",
          nvidiaError instanceof Error ? nvidiaError.message : nvidiaError
        );
      }
    }

    // 3. Fallback: Ultra-compact, grounded local knowledge responder.
    const fallbackAnswer = getLocalFallbackAnswer(latestUser);
    return NextResponse.json(
      {
        reply: fallbackAnswer,
        provider: "local",
        remaining: rateLimit.remaining,
        limit: rateLimit.limit,
        resetAt: rateLimit.resetAt,
      },
      { headers: rateLimitHeaders }
    );
  } catch (error) {
    console.error("[API/Chat] Error in chat handler:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
