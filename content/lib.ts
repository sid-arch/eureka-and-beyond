// Authoring helpers for lesson source files (content/lessons/*.ts).
// scripts/build-content.ts turns these into SQL migrations.

export type Mode = "learn" | "watch" | "experiment" | "practice";

export interface Block { mode: Mode; kind: string; data: Record<string, unknown> }

export interface Question {
  purpose?: "practice" | "review";
  kind: "multiple_choice" | "numeric" | "short_text";
  difficulty: 1 | 2 | 3;
  prompt: string;
  data: Record<string, unknown>;
  hints: string[];
  solution: string;
}

export interface Concept { slug: string; name: string; description: string; subject: "subj_math" | "subj_phys" | "subj_chem" }

export interface LessonSource {
  slug: string;
  /** Set for lessons that already exist in production: only additions are emitted. */
  existingId?: string;
  title: string;
  summary: string;
  minutes: number;
  objectives: string[];
  concepts?: Concept[];
  formulas?: string[];
  blocks: Block[];
  questions: Question[];
  references?: { citation: string; url?: string }[];
}

export const lesson = (l: LessonSource) => l;

// Block constructors. `m` defaults to the Learn mode.
export const text = (body: string, m: Mode = "learn"): Block => ({ mode: m, kind: "text", data: { body } });
export const def = (term: string, body: string, m: Mode = "learn"): Block => ({ mode: m, kind: "definition", data: { term, body } });
export const formula = (latex: string, title?: string, note?: string, m: Mode = "learn"): Block => ({
  mode: m, kind: "formula", data: { latex, ...(title ? { title } : {}), ...(note ? { note } : {}) },
});
export const example = (title: string, steps: [string, string][], check?: string, m: Mode = "learn"): Block => ({
  mode: m, kind: "worked_example", data: { title, steps: steps.map(([latex, explanation]) => ({ latex, explanation })), ...(check ? { check } : {}) },
});
export const callout = (tone: "tip" | "warning" | "application" | "note", title: string, body: string, m: Mode = "learn"): Block => ({
  mode: m, kind: "callout", data: { tone, title, body },
});
// A static diagram stored under public/figures/. Alt text is required; describe what the picture shows.
export const figure = (src: string, alt: string, caption?: string, m: Mode = "learn"): Block => ({
  mode: m, kind: "figure", data: { src, alt, ...(caption ? { caption } : {}) },
});
export const activity = (
  id: string,
  opts: { title?: string; params?: Record<string, number | boolean | string>; steps?: { title: string; body: string; params?: Record<string, number | boolean | string> }[] } = {},
  m: Mode = "experiment",
): Block => ({ mode: m, kind: "activity", data: { activity: id, ...opts } });

// Question constructors.
export const mc = (difficulty: 1 | 2 | 3, prompt: string, choices: string[], answer: number, hints: string[], solution: string, purpose: "practice" | "review" = "practice"): Question => ({
  kind: "multiple_choice", difficulty, prompt, data: { choices, answer }, hints, solution, purpose,
});
export const num = (difficulty: 1 | 2 | 3, prompt: string, answer: number, opts: { tolerance?: number; relative?: boolean; unit?: string }, hints: string[], solution: string, purpose: "practice" | "review" = "practice"): Question => ({
  kind: "numeric", difficulty, prompt, data: { answer, ...opts }, hints, solution, purpose,
});
export const short = (difficulty: 1 | 2 | 3, prompt: string, accept: string[], hints: string[], solution: string, purpose: "practice" | "review" = "practice"): Question => ({
  kind: "short_text", difficulty, prompt, data: { accept }, hints, solution, purpose,
});
