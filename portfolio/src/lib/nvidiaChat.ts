/**
 * NVIDIA chat-completions client (OpenAI-compatible).
 *
 * Talks to NVIDIA's hosted inference endpoint. Kept isolated from the route
 * handler so the request/response shape can be unit-tested in isolation and
 * the model can be swapped from a single place (or via NVIDIA_CHAT_MODEL).
 */

import { SYSTEM_PROMPT } from "./portfolioContext";

export const NVIDIA_CHAT_URL =
  "https://integrate.api.nvidia.com/v1/chat/completions";

/** Default model. Override with NVIDIA_CHAT_MODEL for your key's entitlements. */
export const DEFAULT_NVIDIA_MODEL = "nvidia/llama-3.1-nemotron-70b-instruct";

/** Cap how much history we forward to bound latency and token cost. */
export const MAX_HISTORY_TURNS = 10;

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export class NvidiaChatError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "NvidiaChatError";
    this.status = status;
  }
}

/** Trim history to the most recent turns, keeping role/content only. */
export function trimHistory(
  messages: ChatMessage[],
  max: number = MAX_HISTORY_TURNS
): ChatMessage[] {
  return messages
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && m.content)
    .slice(-max)
    .map((m) => ({ role: m.role, content: m.content }));
}

/**
 * Call NVIDIA with the portfolio system prompt prepended to the history.
 * Returns the assistant reply text, or throws NvidiaChatError on failure.
 *
 * @param messages conversation history (user/assistant turns)
 * @param apiKey   NVIDIA API key (injected so this stays env-agnostic/testable)
 * @param model    model id (defaults to env override or DEFAULT_NVIDIA_MODEL)
 */
export async function callNvidiaChat(
  messages: ChatMessage[],
  apiKey: string,
  model: string = process.env.NVIDIA_CHAT_MODEL || DEFAULT_NVIDIA_MODEL
): Promise<string> {
  if (!apiKey) {
    throw new NvidiaChatError("Missing NVIDIA API key");
  }

  const payload = {
    model,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      ...trimHistory(messages),
    ],
    temperature: 0.3,
    top_p: 0.85,
    max_tokens: 350,
    stream: false,
  };

  let res: Response;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    res = await fetch(NVIDIA_CHAT_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } catch (networkErr) {
    throw new NvidiaChatError(
      `Network error calling NVIDIA: ${(networkErr as Error).message}`
    );
  } finally {
    clearTimeout(timeoutId);
  }

  if (!res.ok) {
    let detail = "";
    try {
      detail = await res.text();
    } catch {
      /* ignore body read failure */
    }
    throw new NvidiaChatError(
      `NVIDIA API returned ${res.status}${detail ? `: ${detail}` : ""}`,
      res.status
    );
  }

  const data = await res.json();
  const reply: string | undefined = data?.choices?.[0]?.message?.content;

  if (!reply || !reply.trim()) {
    throw new NvidiaChatError("NVIDIA API returned an empty reply");
  }

  return reply.trim();
}
