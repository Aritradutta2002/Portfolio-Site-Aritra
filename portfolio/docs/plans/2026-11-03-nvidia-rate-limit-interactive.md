# NVIDIA API Integration, Daily Rate Limiting & Interactive Compact Chatbot Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Configure the provided NVIDIA API key in environment variables, enforce a strict daily rate limit of 10 requests per user/day with client feedback, and tune both the NVIDIA prompt and local fallback engine to deliver ultra-compact, metric-dense, interactive answers with clickable next steps.

**Architecture:** 
1. **API Key & Engine Selection**: Store the complete NVIDIA API key (`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`) in `portfolio/.env.local`. When NVIDIA inference is enabled, requests route to NVIDIA NIM; otherwise they seamlessly degrade to the local grounded responder without user-facing failures.
2. **Server-Side Daily Rate Limiter**: Implement a memory-efficient rate limiter (`portfolio/src/lib/rateLimit.ts`) tracking client IPs / identifiers with a 10 requests/day ceiling, calendar day / 24h reset, and standardized HTTP headers (`X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`).
3. **Ultra-Compact, Interactive Knowledge Engine**: Re-engineer `SYSTEM_PROMPT` and `TOPIC_CATALOG` in `portfolio/src/lib/portfolioContext.ts` to enforce a strict brevity limit (max 2–3 bullets, ~60 words), bolded measurable metrics, and a proactive follow-up prompt on every turn.
4. **Interactive UI Quota & Follow-up Badging**: Update `HeroChatbot.tsx` to surface remaining daily queries (`e.g., 9/10 queries remaining today`), display polite quota-exhaustion banners with resume/contact shortcuts, and render interactive follow-up chips.

**Tech Stack:** Next.js 14+ (App Router), TypeScript, Tailwind CSS, NVIDIA NIM API (`integrate.api.nvidia.com`), Node.js crypto/headers.

---

## Global Constraints

- **Daily Quota Ceiling:** Exactly 10 requests per IP/client per calendar day (UTC). Exceeding requests must return HTTP 429 or structured quota-exhausted responses without throwing 500 errors.
- **Answer Brevity & Compactness:** Answers must not exceed 3 bullet points or 75 words. Zero conversational filler or generic disclaimers.
- **Interactivity:** Every response must provide at least one clear next step or clickable follow-up action.
- **Zero Downtime Fallback:** If NVIDIA API returns entitlement errors (e.g. 404 Function not found for personal account tier) or network timeouts, the app must transparently fall back to the grounded local responder.
- **Security:** Do not expose the NVIDIA API key to the client bundle (`NEXT_PUBLIC_`); keep strictly in server-side `process.env`.

---

## Review Focus

1. **IP Detection Edge Cases:** When behind proxies/CDNs, `x-forwarded-for` may contain comma-separated IPs; rate limiter must extract the first non-private client IP.
2. **Rate Limit Boundary Crossing:** On the 10th request, remaining must be 0; on the 11th request, it must reject with 429 and helpful contact links.
3. **Daily Reset Rollover:** Keys must reset at midnight UTC so returning users get 10 fresh queries the next day.
4. **NVIDIA Inference Error Handling:** If NVIDIA responds with 404/403/429, the error must be logged quietly on the server and the response must fall back to local knowledge with `provider: "local"`.
5. **Mobile Responsiveness of Quota Badge:** The quota indicator in `zro-ask-topline` must fit comfortably alongside existing status badges on 320px–420px viewports without wrapping awkwardly.

---

## Task Decomposition

### Task 1: Environment & NVIDIA Secret Configuration

**Files:**
- Modify: `portfolio/.env.local`
- Modify: `portfolio/.env.example`

**Interfaces:**
- Consumes: User-provided key `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`
- Produces: `process.env.NVIDIA_API_KEY` available to server routes

- [ ] **Step 1: Update `portfolio/.env.local` with the complete NVIDIA API key**
  Replace the truncated key with `NVIDIA_API_KEY=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`.
- [ ] **Step 2: Update `portfolio/.env.example`**
  Ensure documentation and variable names match.
- [ ] **Step 3: Verification**
  Run test script to verify `process.env.NVIDIA_API_KEY` is loaded and validates against NVIDIA's `/v1/models` endpoint with status 200.

---

### Task 2: Server-Side Daily Rate Limiter (`rateLimit.ts`)

**Files:**
- Create: `portfolio/src/lib/rateLimit.ts`
- Create: `portfolio/src/lib/__tests__/rateLimit.test.ts` (or standalone verification script)

**Interfaces:**
- Consumes: Next.js `Request` or client IP string
- Produces: `checkDailyRateLimit(req: Request): { allowed: boolean; remaining: number; limit: number; resetAt: number }`

- [ ] **Step 1: Write test cases for rate limiter**
  Verify 10 sequential calls pass, the 11th is rejected, and counter resets after expiration.
- [ ] **Step 2: Implement `portfolio/src/lib/rateLimit.ts`**
  - Extract client IP from headers (`x-forwarded-for`, `x-real-ip`, `cf-connecting-ip`) or fallback to `127.0.0.1`.
  - Maintain an in-memory sliding or calendar-day map (`Map<string, { count: number; dateStr: string }>`).
  - Calculate remaining requests: `Math.max(0, 10 - count)`.
  - Expose helper `checkDailyRateLimit(req: Request)`.
- [ ] **Step 3: Run verification test**
  Run test script to confirm 10 requests allowed, 11th blocked with `allowed: false` and `remaining: 0`.

---

### Task 3: API Route Integration & Quota Headers (`/api/chat/route.ts`)

**Files:**
- Modify: `portfolio/src/app/api/chat/route.ts`

**Interfaces:**
- Consumes: `checkDailyRateLimit` from `portfolio/src/lib/rateLimit.ts`
- Produces: JSON response with `{ reply: string; provider: string; remaining: number; limit: number; rateLimited?: boolean }` and standard rate limit headers.

- [ ] **Step 1: Add rate limit check to `POST /api/chat`**
  If `!rateLimit.allowed`:
  Return HTTP 429 (or HTTP 200 with `rateLimited: true`) and a concise, friendly assistant reply:
  > *"You've used your 10 daily questions! 🎯 To learn more about Aritra's work, browse the sections below, download his [Résumé PDF](/resume.pdf), or email him directly at [aritradutta049@gmail.com](mailto:aritradutta049@gmail.com)."*
- [ ] **Step 2: Include quota details in successful responses**
  Add `remaining: rateLimit.remaining` and `limit: 10` to the response body and set response headers `X-RateLimit-Remaining`.
- [ ] **Step 3: Test route with mock requests**
  Verify rate limit response format and headers via curl or fetch test script.

---

### Task 4: Compact & Interactive Prompt Engineering (`portfolioContext.ts`)

**Files:**
- Modify: `portfolio/src/lib/portfolioContext.ts`
- Modify: `portfolio/src/lib/nvidiaChat.ts` (adjust max_tokens to 300 to enforce punchy answers)

**Interfaces:**
- Consumes: System prompt instructions
- Produces: Highly concise, metric-focused LLM generation and local fallback answers

- [ ] **Step 1: Refactor `SYSTEM_PROMPT` in `portfolioContext.ts`**
  Add strict rules:
  1. **Strict Brevity**: Answer in 2–3 compact bullet points (maximum 60–75 words). Never include throat-clearing intros ("As an AI assistant...", "Certainly!").
  2. **Bolded Metrics**: Highlight quantifiable achievements (**20× API speedup**, **Java 21**, **700+ LeetCode**, **8.79 CGPA**).
  3. **Interactive Closer**: Always end with a one-line interactive prompt (e.g. `👉 Ask about his TCS optimization, AlgoGuru, or grab his [Résumé PDF](/resume.pdf)!`).
- [ ] **Step 2: Refactor `TOPIC_CATALOG` in `portfolioContext.ts`**
  Trim all fallback answers to be equally compact (max 3 punchy bullets + interactive closer) so local fallback matches NVIDIA's concise, high-end persona.
- [ ] **Step 3: Adjust `max_tokens` in `nvidiaChat.ts`**
  Reduce `max_tokens` from 800 to 350 to enforce brevity and reduce token latency.

---

### Task 5: UI Quota Counter & Interactive Enhancement (`HeroChatbot.tsx`)

**Files:**
- Modify: `portfolio/src/components/zro/HeroChatbot.tsx`
- Modify: `portfolio/src/styles/datasheet.css` (if badge styling needed)

**Interfaces:**
- Consumes: `remaining` from `/api/chat` response
- Produces: Daily quota pill in the topline bar, interactive follow-up buttons, and clean disabled state when quota is 0.

- [ ] **Step 1: Add quota state to `HeroChatbot.tsx`**
  - Track `remainingQueries: number | null` (defaults to 10 or reads from localStorage cache).
  - Update `remainingQueries` on every API response.
- [ ] **Step 2: Render quota badge in `zro-ask-topline`**
  Display a subtle, elegant badge:
  `⚡ 10/10 today` or `⚡ 8 left today`.
- [ ] **Step 3: Disable input when quota exhausted**
  When `remainingQueries === 0`, show a friendly exhausted state on the input placeholder ("Daily 10-query limit reached · View resume or email Aritra") and keep interactive links accessible.
- [ ] **Step 4: Enhance interactive follow-up chips**
  Ensure the dynamic follow-up chips under the last assistant message trigger immediate queries when clicked.

---

### Task 6: Verification & End-to-End Testing

**Files:**
- Test scripts in scratch directory
- Playwright screenshot visual verification

- [ ] **Step 1: Run linter and type-checker**
  `npm --prefix portfolio run lint` and `npx tsc --noEmit`.
- [ ] **Step 2: Automated rate limit test**
  Send 11 queries in succession: verify queries 1–10 succeed with decrementing `remaining` (9 down to 0), and query 11 triggers quota limit message.
- [ ] **Step 3: Verification of answer compactness**
  Verify answers are under 75 words, formatted with bullets, bold metrics, and clickable next steps.
- [ ] **Step 4: Playwright visual capture**
  Capture desktop and mobile screenshots showing the quota badge, compact response, and follow-up chips.

---

## Execution Handoff

Please review this implementation plan. Does it capture all your requirements, and would you like to proceed with execution?
