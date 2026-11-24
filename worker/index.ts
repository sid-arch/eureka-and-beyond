// Eureka and Beyond API (Hono). Served at /api/* by the Pages Function in
// functions/api/[[path]].ts; can also run as a standalone Worker.

import { Hono } from "hono";
import type { AppEnv, Env } from "./env";
import { ApiHttpError } from "./lib/http";
import { loadSession } from "./lib/session";
import { admin } from "./routes/admin";
import { auth } from "./routes/auth";
import { me } from "./routes/me";
import { publicRoutes } from "./routes/public";

export type { Env } from "./env";

export const app = new Hono<AppEnv>().basePath("/api");

// Security and caching headers for every API response.
app.use("*", async (c, next) => {
  await next();
  const h = c.res.headers;
  h.set("X-Content-Type-Options", "nosniff");
  h.set("Referrer-Policy", "strict-origin-when-cross-origin");
  h.set("X-Frame-Options", "DENY");
  h.set("Content-Security-Policy", "default-src 'none'; frame-ancestors 'none'");
  if (!h.has("Cache-Control")) {
    const cacheable = c.req.method === "GET" && c.res.ok && !c.get("user");
    h.set("Cache-Control", cacheable ? "public, max-age=60" : "no-store");
    h.set("Vary", "Cookie");
  }
});

// CSRF defence for state-changing requests: JSON only, and same origin when the browser says where it came from.
app.use("*", async (c, next) => {
  if (!["GET", "HEAD", "OPTIONS"].includes(c.req.method)) {
    const ct = c.req.header("Content-Type") ?? "";
    const hasBody = c.req.method !== "DELETE" || (c.req.header("Content-Length") ?? "0") !== "0";
    if (hasBody && !ct.startsWith("application/json")) {
      throw new ApiHttpError(415, "unsupported_media_type", "Send requests as JSON.");
    }
    const origin = c.req.header("Origin");
    if (origin && origin !== new URL(c.req.url).origin) {
      throw new ApiHttpError(403, "cross_origin", "Cross-site requests are not allowed.");
    }
  }
  await next();
});

app.use("*", loadSession);

app.route("/", publicRoutes);
app.route("/auth", auth);
app.route("/", me);
app.route("/admin", admin);

app.notFound((c) => c.json({ error: { code: "not_found", message: "No API route matches this request." } }, 404));

app.onError((err, c) => {
  if (err instanceof ApiHttpError) {
    return c.json({ error: { code: err.code, message: err.message, ...(err.fields ? { fields: err.fields } : {}) } }, err.status);
  }
  console.error("Unhandled API error", err);
  return c.json({ error: { code: "internal_error", message: "Something went wrong on our side." } }, 500);
});

export default {
  fetch(request, env, ctx) {
    return app.fetch(request, env, ctx);
  },
} satisfies ExportedHandler<Env>;
