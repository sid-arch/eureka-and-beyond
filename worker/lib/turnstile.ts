import type { Env } from "../env";
import { ApiHttpError } from "./http";

/** Verifies a Turnstile token when Turnstile is configured; no-op otherwise. */
export async function checkTurnstile(env: Env, token: string | undefined, ip: string) {
  if (!env.TURNSTILE_SECRET_KEY) return;
  if (!token) throw new ApiHttpError(400, "challenge_required", "Complete the verification check and try again.");
  const form = new FormData();
  form.append("secret", env.TURNSTILE_SECRET_KEY);
  form.append("response", token);
  form.append("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: form });
  const data = (await res.json()) as { success: boolean };
  if (!data.success) throw new ApiHttpError(400, "challenge_failed", "The verification check failed. Try again.");
}
