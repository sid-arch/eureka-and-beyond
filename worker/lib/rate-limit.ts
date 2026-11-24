import { ApiHttpError } from "./http";

/**
 * Fixed-window counter in D1. `key` should combine the action and the subject,
 * e.g. "login:ip:<hash>" or "login:email:<hash>".
 */
export async function rateLimit(db: D1Database, key: string, limit: number, windowSeconds: number) {
  const nowSec = Math.floor(Date.now() / 1000);
  const windowStart = nowSec - (nowSec % windowSeconds);
  const row = await db
    .prepare(
      `INSERT INTO rate_limits (key, window_start, count) VALUES (?1, ?2, 1)
       ON CONFLICT(key) DO UPDATE SET
         count = CASE WHEN rate_limits.window_start = ?2 THEN rate_limits.count + 1 ELSE 1 END,
         window_start = ?2
       RETURNING count`,
    )
    .bind(key, windowStart)
    .first<{ count: number }>();
  if ((row?.count ?? 0) > limit) {
    throw new ApiHttpError(429, "rate_limited", "Too many attempts. Wait a few minutes and try again.");
  }
}

export function clientIp(req: Request): string {
  return req.headers.get("CF-Connecting-IP") ?? req.headers.get("X-Forwarded-For")?.split(",")[0].trim() ?? "local";
}
