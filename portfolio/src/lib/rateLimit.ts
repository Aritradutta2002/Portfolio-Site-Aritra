/**
 * Server-side Daily Rate Limiter for AI Chatbot queries.
 *
 * Enforces a strict quota of 10 requests per calendar day (UTC) per client IP.
 * Includes automated cleanup of expired daily entries to prevent memory growth.
 */

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  limit: number;
  resetAt: number;
  clientIp: string;
}

interface RateLimitRecord {
  count: number;
  dateStr: string;
}

const DAILY_LIMIT = 10;
const ipStore = new Map<string, RateLimitRecord>();

/** Get current UTC date string YYYY-MM-DD */
function getUtcDateStr(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Get next midnight UTC in milliseconds timestamp */
function getNextUtcMidnight(): number {
  const now = new Date();
  const tomorrow = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1,
    0, 0, 0, 0
  ));
  return tomorrow.getTime();
}

/** Prune records from previous calendar days */
function pruneExpiredRecords(currentDateStr: string) {
  if (ipStore.size > 5000) {
    for (const [ip, record] of ipStore.entries()) {
      if (record.dateStr !== currentDateStr) {
        ipStore.delete(ip);
      }
    }
  }
}

/** Extract reliable client IP from common proxy/CDN headers */
export function getClientIp(req: Request): string {
  const headers = req.headers;
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const firstIp = forwarded.split(",")[0]?.trim();
    if (firstIp) return firstIp;
  }
  const realIp = headers.get("x-real-ip");
  if (realIp?.trim()) return realIp.trim();

  const cfIp = headers.get("cf-connecting-ip");
  if (cfIp?.trim()) return cfIp.trim();

  return "127.0.0.1";
}

/**
 * Check and increment daily rate limit for a client request.
 *
 * @param req The incoming Request object
 * @param maxRequests Maximum requests allowed per day (default: 10)
 */
export function checkDailyRateLimit(
  req: Request,
  maxRequests: number = DAILY_LIMIT
): RateLimitResult {
  const clientIp = getClientIp(req);
  const currentDateStr = getUtcDateStr();
  const resetAt = getNextUtcMidnight();

  pruneExpiredRecords(currentDateStr);

  let record = ipStore.get(clientIp);

  if (!record || record.dateStr !== currentDateStr) {
    record = { count: 0, dateStr: currentDateStr };
  }

  if (record.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      limit: maxRequests,
      resetAt,
      clientIp,
    };
  }

  record.count += 1;
  ipStore.set(clientIp, record);

  const remaining = Math.max(0, maxRequests - record.count);

  return {
    allowed: true,
    remaining,
    limit: maxRequests,
    resetAt,
    clientIp,
  };
}

/**
 * Generate standard HTTP RateLimit headers.
 */
export function getRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  const resetSeconds = Math.max(0, Math.ceil((result.resetAt - Date.now()) / 1000));
  return {
    "X-RateLimit-Limit": String(result.limit),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(resetSeconds),
  };
}

/** Reset helper for testing */
export function _resetRateLimitsForTesting() {
  ipStore.clear();
}
