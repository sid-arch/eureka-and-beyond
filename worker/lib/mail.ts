import type { Env } from "../env";
import { newId } from "./crypto";

export type MailMode = "resend" | "log" | "disabled";

/** Which mail transport is usable. "log" never runs in production. */
export function mailMode(env: Env): MailMode {
  const driver = env.MAIL_DRIVER ?? (env.RESEND_API_KEY ? "resend" : "disabled");
  if (driver === "resend" && env.RESEND_API_KEY && env.EMAIL_FROM) return "resend";
  if (driver === "log" && env.APP_ENV !== "production") return "log";
  return "disabled";
}

export async function sendMail(env: Env, msg: { to: string; subject: string; text: string }): Promise<boolean> {
  const mode = mailMode(env);
  if (mode === "disabled") return false;
  if (mode === "log") {
    await env.DB.prepare(`INSERT INTO email_outbox (id, to_address, subject, body, status) VALUES (?, ?, ?, ?, 'logged')`)
      .bind(newId("eml"), msg.to, msg.subject, msg.text)
      .run();
    return true;
  }
  let ok = false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: env.EMAIL_FROM, to: [msg.to], subject: msg.subject, text: msg.text }),
    });
    ok = res.ok;
    if (!ok) console.error("Email provider rejected message", res.status);
  } catch (err) {
    console.error("Email send failed", err);
  }
  // Production keeps no message bodies: they can contain single-use links.
  await env.DB.prepare(`INSERT INTO email_outbox (id, to_address, subject, body, status) VALUES (?, ?, ?, NULL, ?)`)
    .bind(newId("eml"), msg.to, msg.subject, ok ? "sent" : "failed")
    .run();
  return ok;
}

export function siteUrl(env: Env, path: string) {
  return `${env.PUBLIC_SITE_URL.replace(/\/$/, "")}${path}`;
}
