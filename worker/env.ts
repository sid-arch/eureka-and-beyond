import type { Role } from "../shared/permissions";

export interface Env {
  DB: D1Database;
  /** development | staging | production */
  APP_ENV: string;
  PUBLIC_SITE_URL: string;
  /** resend | log | disabled. "log" is refused in production. */
  MAIL_DRIVER?: string;
  RESEND_API_KEY?: string;
  EMAIL_FROM?: string;
  TURNSTILE_SECRET_KEY?: string;
  TURNSTILE_SITE_KEY?: string;
}

export interface SessionUser {
  id: string;
  email: string;
  displayName: string;
  role: Role;
  emailVerified: boolean;
  status: "active" | "suspended";
}

export type AppEnv = {
  Bindings: Env;
  Variables: { user: SessionUser | null; sessionId: string | null };
};
