// Types shared by the Worker API and the React client. The API returns these
// shapes; the client renders them. Keep this file free of runtime imports.

export type CourseLevel = "foundational" | "on_level" | "honors" | "ap";
export type CourseStatus = "planned" | "in_development" | "published" | "archived";
export type AlignmentStatus = "not_applicable" | "unverified" | "in_review" | "verified";
export type LessonMode = "learn" | "watch" | "experiment" | "practice";

export const LESSON_MODES: readonly LessonMode[] = ["learn", "watch", "experiment", "practice"];

export const LEVEL_LABELS: Record<CourseLevel, string> = {
  foundational: "Foundational",
  on_level: "On-level",
  honors: "Honors",
  ap: "AP",
};

export const STATUS_LABELS: Record<CourseStatus, string> = {
  planned: "Planned",
  in_development: "In development",
  published: "Published",
  archived: "Archived",
};

export interface Subject {
  id: string;
  slug: string;
  name: string;
  description: string;
  courseCount: number;
  coursesWithContent: number;
}

export interface CourseSummary {
  id: string;
  plannedLessonCount: number;
  slug: string;
  title: string;
  level: CourseLevel;
  summary: string;
  status: CourseStatus;
  alignmentStatus: AlignmentStatus;
  subject: { slug: string; name: string };
  publishedUnitCount: number;
  publishedLessonCount: number;
}

export interface LessonStub {
  slug: string;
  title: string;
  summary: string;
  estimatedMinutes: number | null;
}

export interface ChapterWithLessons {
  slug: string;
  title: string;
  summary: string;
  /** Planned lessons in order; `lesson` is set once the lesson is published. */
  items: { title: string; lesson: LessonStub | null }[];
}

export interface UnitSummary {
  slug: string;
  title: string;
  summary: string;
  chapterCount: number;
  /** Lessons published and readable now. */
  lessonCount: number;
  /** Lessons in the unit outline, published or not. */
  plannedLessonCount: number;
  chapters: { slug: string; title: string; lessons: { title: string; slug: string | null }[] }[];
}

export interface CourseDetail extends CourseSummary {
  overview: string;
  framework: { name: string; sourceUrl: string | null } | null;
  prerequisites: { slug: string; title: string; kind: "required" | "recommended" }[];
  objectives: string[];
  units: UnitSummary[];
}

export interface UnitDetail {
  course: { slug: string; title: string; subject: { slug: string; name: string } };
  slug: string;
  title: string;
  summary: string;
  position: number;
  chapters: ChapterWithLessons[];
  previous: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
}

// ---- Lesson content blocks ------------------------------------------------

export interface TextBlockData { body: string }
export interface DefinitionBlockData { term: string; body: string }
export interface FormulaBlockData { title?: string; latex: string; note?: string }
export interface WorkedExampleBlockData {
  title: string;
  steps: { latex: string; explanation: string }[];
  check?: string;
}
export interface CalloutBlockData { tone: "tip" | "warning" | "application" | "note"; title?: string; body: string }
export interface FigureBlockData { src: string; alt: string; caption?: string }
export interface ActivityBlockData { activity: string; params?: Record<string, unknown>; title?: string }
export interface ReferencesBlockData { items: { citation: string; url?: string }[] }

export type LessonBlock =
  | { id: string; mode: LessonMode; kind: "text"; data: TextBlockData }
  | { id: string; mode: LessonMode; kind: "definition"; data: DefinitionBlockData }
  | { id: string; mode: LessonMode; kind: "formula"; data: FormulaBlockData }
  | { id: string; mode: LessonMode; kind: "worked_example"; data: WorkedExampleBlockData }
  | { id: string; mode: LessonMode; kind: "callout"; data: CalloutBlockData }
  | { id: string; mode: LessonMode; kind: "figure"; data: FigureBlockData }
  | { id: string; mode: LessonMode; kind: "activity"; data: ActivityBlockData }
  | { id: string; mode: LessonMode; kind: "references"; data: ReferencesBlockData };

export type LessonBlockKind = LessonBlock["kind"];

export interface PracticeQuestionPublic {
  id: string;
  purpose: "practice" | "review";
  kind: "multiple_choice" | "numeric" | "short_text";
  difficulty: 1 | 2 | 3;
  prompt: string;
  choices?: string[];
  unit?: string;
  hints: string[];
}

export interface PracticeCheckResult {
  correct: boolean;
  feedback: string;
  solution: string;
  /** Shown after an attempt so students can compare. */
  answerDisplay: string;
  recorded: boolean;
}

export interface LessonDetail {
  id: string;
  slug: string;
  title: string;
  summary: string;
  estimatedMinutes: number | null;
  publishedAt: string | null;
  context: {
    course: { slug: string; title: string; subject: { slug: string; name: string } };
    unit: { slug: string; title: string };
    chapter: { slug: string; title: string };
  };
  objectives: string[];
  blocks: LessonBlock[];
  practice: PracticeQuestionPublic[];
  concepts: { slug: string; name: string }[];
  formulas: Formula[];
  references: { citation: string; url: string | null }[];
  previous: { slug: string; title: string; unitSlug: string } | null;
  next: { slug: string; title: string; unitSlug: string } | null;
}

export interface Formula {
  id: string;
  slug: string;
  name: string;
  latex: string;
  description: string;
  variables: { symbol: string; meaning: string; unit?: string }[];
  subject: { slug: string; name: string };
}

export interface PlatformStats {
  subjects: number;
  courses: number;
  coursesWithContent: number;
  publishedLessons: number;
  publishedFormulas: number;
}

export type SearchResultType = "course" | "lesson" | "formula" | "concept";

export interface SearchResult {
  type: SearchResultType;
  title: string;
  summary: string;
  href: string;
  subject: { slug: string; name: string };
  level?: CourseLevel;
}

export interface ApiError {
  error: { code: string; message: string };
}

export interface SiteConfig {
  announcement: { enabled: boolean; message: string; tone: "info" | "success" | "warning" };
  registrationOpen: boolean;
  registrationMessage: string | null;
  turnstileSiteKey: string | null;
}
