import { useCallback, useEffect, useRef, useState } from "react";
import type { ApiError } from "../../shared/types";

export class ApiRequestError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public fields: Record<string, string> = {},
  ) {
    super(message);
  }
}

async function request<T>(method: string, path: string, body?: unknown, signal?: AbortSignal): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`/api${path}`, {
      method,
      signal,
      credentials: "same-origin",
      headers: { Accept: "application/json", ...(body !== undefined ? { "Content-Type": "application/json" } : {}) },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (err) {
    if ((err as Error).name === "AbortError") throw err;
    throw new ApiRequestError(0, "network_error", "Couldn't reach the server. Check your connection and try again.");
  }
  if (!res.ok) {
    let data: (ApiError & { error: { fields?: Record<string, string> } }) | null = null;
    try {
      data = await res.json();
    } catch {
      /* non-JSON */
    }
    throw new ApiRequestError(res.status, data?.error.code ?? "http_error", data?.error.message ?? `Request failed (${res.status}).`, data?.error.fields ?? {});
  }
  const text = await res.text();
  return (text ? JSON.parse(text) : null) as T;
}

export const api = {
  get: <T>(path: string, signal?: AbortSignal) => request<T>("GET", path, undefined, signal),
  post: <T = { ok: true }>(path: string, body: unknown = {}) => request<T>("POST", path, body),
  put: <T = { ok: true }>(path: string, body: unknown = {}) => request<T>("PUT", path, body),
  patch: <T = { ok: true }>(path: string, body: unknown = {}) => request<T>("PATCH", path, body),
  del: <T = { ok: true }>(path: string, body?: unknown) => request<T>("DELETE", path, body),
};

export type ApiState<T> =
  | { status: "loading"; data?: T; error?: undefined }
  | { status: "error"; data?: undefined; error: ApiRequestError }
  | { status: "success"; data: T; error?: undefined };

/** Fetches `path` (relative to /api); pass null to skip. `reload` refetches without a loading flash. */
export function useApi<T>(path: string | null) {
  const [state, setState] = useState<ApiState<T>>({ status: "loading" });
  const [version, setVersion] = useState(0);
  const quiet = useRef(false);

  useEffect(() => {
    if (path === null) return;
    const ctrl = new AbortController();
    if (!quiet.current) setState({ status: "loading" });
    quiet.current = false;
    api.get<T>(path, ctrl.signal).then(
      (data) => setState({ status: "success", data }),
      (err: unknown) => {
        if ((err as Error).name === "AbortError") return;
        setState({ status: "error", error: err instanceof ApiRequestError ? err : new ApiRequestError(0, "unknown", "Something went wrong.") });
      },
    );
    return () => ctrl.abort();
  }, [path, version]);

  const retry = useCallback(() => setVersion((v) => v + 1), []);
  const reload = useCallback(() => {
    quiet.current = true;
    setVersion((v) => v + 1);
  }, []);
  return { ...state, retry, reload };
}

/** Wraps an async action with pending + error state for forms and buttons. */
export function useAction<A extends unknown[], R>(fn: (...args: A) => Promise<R>) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<ApiRequestError | null>(null);
  const run = useCallback(
    async (...args: A): Promise<R | undefined> => {
      setPending(true);
      setError(null);
      try {
        return await fn(...args);
      } catch (e) {
        setError(e instanceof ApiRequestError ? e : new ApiRequestError(0, "unknown", "Something went wrong."));
        return undefined;
      } finally {
        setPending(false);
      }
    },
    [fn],
  );
  return { run, pending, error, setError };
}
