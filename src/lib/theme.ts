import { useCallback, useEffect, useState } from "react";

export type ThemePreference = "light" | "dark" | "system";
const KEY = "eab-theme";

function readPreference(): ThemePreference {
  try {
    const v = localStorage.getItem(KEY);
    return v === "light" || v === "dark" ? v : "system";
  } catch {
    return "system";
  }
}

function resolve(pref: ThemePreference): "light" | "dark" {
  if (pref !== "system") return pref;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function useTheme() {
  const [preference, setPreference] = useState<ThemePreference>(readPreference);
  const [resolved, setResolved] = useState<"light" | "dark">(() => resolve(readPreference()));

  useEffect(() => {
    const apply = () => {
      const r = resolve(preference);
      setResolved(r);
      document.documentElement.dataset.theme = r;
    };
    apply();
    if (preference !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [preference]);

  const set = useCallback((pref: ThemePreference) => {
    setPreference(pref);
    try {
      if (pref === "system") localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, pref);
    } catch {
      /* storage unavailable: preference lasts for this visit */
    }
  }, []);

  return { preference, resolved, setPreference: set };
}
