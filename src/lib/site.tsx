import { createContext, useContext, type ReactNode } from "react";
import type { SiteConfig } from "../../shared/types";
import { useApi } from "./api";

const fallback: SiteConfig = {
  announcement: { enabled: false, message: "", tone: "info" },
  registrationOpen: false,
  registrationMessage: null,
  turnstileSiteKey: null,
};

const Ctx = createContext<{ config: SiteConfig; reload: () => void }>({ config: fallback, reload: () => {} });

export function SiteProvider({ children }: { children: ReactNode }) {
  const s = useApi<SiteConfig>("/site");
  return <Ctx.Provider value={{ config: s.data ?? fallback, reload: s.reload }}>{children}</Ctx.Provider>;
}

export const useSite = () => useContext(Ctx);
