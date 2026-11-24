import type { Context } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import type { z } from "zod";

export class ApiHttpError extends Error {
  constructor(
    public status: ContentfulStatusCode,
    public code: string,
    message: string,
    public fields?: Record<string, string>,
  ) {
    super(message);
  }
}

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Slugs are lowercase words joined by single hyphens, at most 120 characters. */
export function isSlug(value: string): boolean {
  return value.length <= 120 && SLUG.test(value);
}

/** Parses and validates a JSON body; responds 400 with per-field messages on failure. */
export async function body<S extends z.ZodType>(c: Context, schema: S): Promise<z.infer<S>> {
  let raw: unknown;
  try {
    raw = await c.req.json();
  } catch {
    throw new ApiHttpError(400, "invalid_json", "The request body must be JSON.");
  }
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".") || "_";
      fields[key] ??= issue.message;
    }
    throw new ApiHttpError(400, "validation_failed", "Some fields need attention.", fields);
  }
  return parsed.data;
}

export const now = () => new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
export const inFuture = (ms: number) => new Date(Date.now() + ms).toISOString().replace(/\.\d{3}Z$/, "Z");
