import { useEffect } from "react";

const BASE = "Eureka and Beyond";

/** Sets document.title; null for the home page, undefined to leave it unchanged while loading. */
export function useTitle(title: string | null | undefined) {
  useEffect(() => {
    if (title === undefined) return;
    document.title = title ? `${title} | ${BASE}` : `${BASE}: Discover. Understand. Go Beyond.`;
  }, [title]);
}
