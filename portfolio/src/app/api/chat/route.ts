import { NextResponse } from "next/server";
import { SYSTEM_PROMPT, getLocalFallbackAnswer } from "@/lib/portfolioContext";

export const runtime = "nodejs";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages: ChatMessage[] = body.messages || [];

    if (!messages.length) {
      return NextResponse.json(
        { error: "No messages provided." },
        { status: 400 }
      );
    }

    const latestMessage = messages[messages.length - 1];
    const userQuery = latestMessage.content || "";

    const apiKey = process.env.GEMINI_API_KEY;

    // If API key is present, attempt to call Google Gemini API
    if (apiKey) {
      try {
        const contents = messages.map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        }));

        // Try gemini-2.5-flash first, then gemini-1.5-flash if needed
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

        const res = await fetch(geminiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: SYSTEM_PROMPT }],
            },
            contents,
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 800,
            },
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const candidate = data.candidates?.[0];
          const text =
            candidate?.content?.parts?.[0]?.text ||
            candidate?.parts?.[0]?.text;

          if (text) {
            return NextResponse.json({
              reply: text,
              provider: "gemini",
            });
          }
        } else {
          console.warn(
            `[API/Chat] Gemini API returned status ${res.status}. Falling back to local responder.`
          );
        }
      } catch (geminiError) {
        console.warn(
          "[API/Chat] Gemini call failed, using local fallback:",
          geminiError
        );
      }
    }

    // Fallback: Intelligent portfolio knowledge base
    const fallbackAnswer = getLocalFallbackAnswer(userQuery);
    return NextResponse.json({
      reply: fallbackAnswer,
      provider: "local",
    });
  } catch (error) {
    console.error("[API/Chat] Error in chat handler:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
