import { Atom, FlaskConical, Sigma, type LucideIcon } from "lucide-react";

export type SubjectSlug = "mathematics" | "physics" | "chemistry";

export interface SubjectStyle {
  name: string;
  Icon: LucideIcon;
  /** Tailwind classes. Accent colors are for fills and marks; text stays in ink for contrast. */
  text: string;
  bg: string;
  soft: string;
  border: string;
  ring: string;
  cssVar: string;
}

export const SUBJECTS: Record<SubjectSlug, SubjectStyle> = {
  mathematics: { name: "Mathematics", Icon: Sigma, text: "text-math", bg: "bg-math", soft: "bg-math-soft", border: "border-math", ring: "ring-math", cssVar: "var(--math)" },
  physics: { name: "Physics", Icon: Atom, text: "text-physics", bg: "bg-physics", soft: "bg-physics-soft", border: "border-physics", ring: "ring-physics", cssVar: "var(--physics)" },
  chemistry: { name: "Chemistry", Icon: FlaskConical, text: "text-chem", bg: "bg-chem", soft: "bg-chem-soft", border: "border-chem", ring: "ring-chem", cssVar: "var(--chem)" },
};

export function subjectStyle(slug: string | undefined): SubjectStyle {
  return SUBJECTS[(slug ?? "mathematics") as SubjectSlug] ?? SUBJECTS.mathematics;
}

export const fmtDate = (iso: string | null | undefined) =>
  iso ? new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "";
export const fmtDateTime = (iso: string | null | undefined) =>
  iso ? new Date(iso).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) : "";
