// Cloudflare Pages Function: routes every /api/* request into the Hono app.
// Static files (the React app) are served by Pages itself, with SPA fallback.
import { app, type Env } from "../../worker/index";

export const onRequest: PagesFunction<Env> = (context) =>
  app.fetch(context.request, context.env, context as unknown as ExecutionContext);
