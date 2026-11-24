import { ArrowLeft, ArrowRight, BookmarkCheck, BookmarkPlus, BookOpenCheck, CheckCircle2, Clock, Eye, Hand, MessageSquareWarning, PenLine, Target } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import { LESSON_MODES, type LessonDetail, type LessonMode } from "../../../shared/types";
import { LessonBlockView } from "../../components/lesson/blocks";
import { Discussion, FeedbackDialog } from "../../components/lesson/Community";
import { PracticeSet, type Solved } from "../../components/lesson/Practice";
import { Badge, Breadcrumbs, Button, Container, EmptyState, ErrorState, Loading, Tabs, cx } from "../../components/ui";
import { Math as Tex } from "../../components/ui/Math";
import { api, useApi } from "../../lib/api";
import { useAuth } from "../../lib/auth";
import { subjectStyle } from "../../lib/subjects";
import { NotFoundPage } from "./NotFound";
import { useTitle } from "../usePageTitle";

// Lessons show three modes. Blocks stored with the older "watch" mode (guided walkthroughs)
// appear under Experiment.
const SHOWN = ["learn", "experiment", "practice"] as const;
type ShownMode = (typeof SHOWN)[number];
const shownMode = (m: LessonMode): ShownMode => (m === "watch" ? "experiment" : m);

const MODE: Record<ShownMode, { label: string; Icon: typeof Eye; empty: string }> = {
  learn: { label: "Learn", Icon: BookOpenCheck, empty: "The explanation for this lesson isn't published yet." },
  experiment: { label: "Experiment", Icon: Hand, empty: "This lesson doesn't have an interactive simulation yet." },
  practice: { label: "Practice", Icon: PenLine, empty: "Practice questions for this lesson aren't published yet." },
};

export function LessonPage() {
  const { course = "", unit = "", lesson = "" } = useParams();
  const data = useApi<LessonDetail>(`/courses/${encodeURIComponent(course)}/units/${encodeURIComponent(unit)}/lessons/${encodeURIComponent(lesson)}`);
  useTitle(data.data?.title);
  if (data.status === "error" && data.error.status === 404) return <NotFoundPage />;
  if (data.status === "loading") return <Container><Loading rows={6} label="Loading lesson" /></Container>;
  if (data.status === "error") return <Container><ErrorState error={data.error} onRetry={data.retry} /></Container>;
  return <LessonView key={data.data.id + data.data.context.course.slug} lesson={data.data} />;
}

export function LessonView({ lesson, preview = false }: { lesson: LessonDetail; preview?: boolean }) {
  const { user } = useAuth();
  const [params, setParams] = useSearchParams();
  const counts = Object.fromEntries(SHOWN.map((m) => [m, (m === "practice" ? lesson.practice.length : 0) + lesson.blocks.filter((b) => shownMode(b.mode) === m).length])) as Record<ShownMode, number>;
  const requested = params.get("mode") as LessonMode | null;
  const mode: ShownMode = requested && LESSON_MODES.includes(requested) ? shownMode(requested) : "learn";
  const setMode = (m: ShownMode) => {
    const n = new URLSearchParams(params);
    if (m === "learn") n.delete("mode"); else n.set("mode", m);
    setParams(n, { replace: true });
  };
  const { course, unit, chapter } = lesson.context;
  const st = subjectStyle(course.subject.slug);
  const canTrack = !!user?.emailVerified && !preview;
  const [status, setStatus] = useState<"started" | "completed" | null>(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [solved, setSolved] = useState<Solved>({});
  const [feedback, setFeedback] = useState<{ type: "lesson" | "activity" | "practice"; label: string } | null>(null);

  useEffect(() => {
    if (!canTrack) return;
    let alive = true;
    (async () => {
      const [prog, books, mine] = await Promise.all([
        api.get<Record<string, string>>(`/me/progress/${course.slug}`),
        api.get<{ lessons: { id: string }[] }>("/me/bookmarks"),
        api.get<Solved>(`/me/lessons/${lesson.id}/practice`),
      ]);
      if (!alive) return;
      const current = prog[lesson.slug] as "started" | "completed" | undefined;
      setStatus(current ?? "started");
      setBookmarked(books.lessons.some((b) => b.id === lesson.id));
      setSolved(mine);
      if (!current) void api.put(`/me/progress/${lesson.id}`, { course: course.slug, status: "started" });
    })().catch(() => {});
    return () => { alive = false; };
  }, [canTrack, course.slug, lesson.id, lesson.slug]);

  const complete = async () => {
    await api.put(`/me/progress/${lesson.id}`, { course: course.slug, status: "completed" });
    setStatus("completed");
  };
  const toggleBookmark = async () => {
    if (bookmarked) await api.del(`/me/bookmarks/lesson/${lesson.id}`);
    else await api.put("/me/bookmarks", { kind: "lesson", targetId: lesson.id });
    setBookmarked(!bookmarked);
  };

  const blocks = lesson.blocks.filter((b) => shownMode(b.mode) === mode);
  const practiceQs = lesson.practice.filter((q) => q.purpose === "practice");
  const reviewQs = lesson.practice.filter((q) => q.purpose === "review");
  const onResult = (id: string, correct: boolean) => setSolved((s) => ({ ...s, [id]: { solved: (s[id]?.solved ?? false) || correct, attempts: (s[id]?.attempts ?? 0) + 1 } }));
  const base = `/courses/${course.slug}/units`;

  return (
    <article>
      <div className={cx("border-b border-line", st.soft)}>
        <Container className="pb-6 pt-8">
          <Breadcrumbs items={[{ label: course.title, to: `/courses/${course.slug}` }, { label: unit.title, to: `${base}/${unit.slug}` }, { label: chapter.title }]} />
          <h1 className="mt-4 max-w-4xl text-3xl sm:text-[2.6rem]">{lesson.title}</h1>
          <p className="mt-3 max-w-3xl text-lg text-muted">{lesson.summary}</p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {lesson.estimatedMinutes && <Badge><Clock aria-hidden className="size-3" /> About {lesson.estimatedMinutes} min</Badge>}
            {status === "completed" && <Badge tone="success" dot="bg-success">Completed</Badge>}
            {preview && <Badge tone="warning">Preview: includes unpublished content</Badge>}
          </div>
        </Container>
      </div>

      <Container className="grid grid-cols-1 gap-8 py-6 lg:grid-cols-[minmax(0,1fr)_17rem]">
        <div className="min-w-0 space-y-6">
          <Tabs
            label="Lesson mode"
            value={mode}
            onChange={setMode}
            items={SHOWN.map((m) => {
              const M = MODE[m];
              return { value: m, label: <span className="flex flex-col items-center gap-0.5 text-xs sm:flex-row sm:gap-1.5 sm:text-sm"><M.Icon aria-hidden className="size-4" />{M.label}</span>, badge: counts[m] === 0 ? <span className="text-xs font-normal text-muted">soon</span> : undefined, disabledHint: counts[m] === 0 ? "not available yet" : undefined };
            })}
          />
          <div id={`panel-${mode}`} role="tabpanel" aria-labelledby={`tab-${mode}`} tabIndex={0} className="space-y-7 outline-none">
            {mode === "learn" && lesson.objectives.length > 0 && (
              <section className="rounded-xl border border-line bg-surface p-5" aria-labelledby="obj-h">
                <h2 id="obj-h" className="flex items-center gap-2 text-base"><Target aria-hidden className="size-4 text-primary" /> In this lesson you'll</h2>
                <ul className="mt-2 space-y-1.5 text-sm">{lesson.objectives.map((o) => <li key={o} className="flex gap-2"><CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-success" />{o}</li>)}</ul>
              </section>
            )}
            {blocks.map((b) => <LessonBlockView key={b.id} block={b} onFeedback={preview ? undefined : (label) => setFeedback({ type: "activity", label: `${lesson.title}: ${label}` })} />)}
            {mode === "practice" && practiceQs.length > 0 && <PracticeSet title="Practice" questions={practiceQs} solved={solved} onResult={onResult} />}
            {mode === "practice" && reviewQs.length > 0 && <PracticeSet title="Review and challenge" questions={reviewQs} solved={solved} onResult={onResult} />}
            {counts[mode] === 0 && <EmptyState title={`${MODE[mode].label} isn't available for this lesson yet`}>{MODE[mode].empty}</EmptyState>}
            {mode === "learn" && counts.experiment > 0 && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-primary-soft p-4">
                <p className="font-semibold">Ready to try it yourself?</p>
                <div className="flex gap-2">
                  <Button variant="secondary" onClick={() => setMode("experiment")}><Hand aria-hidden className="size-4" /> Experiment</Button>
                  {counts.practice > 0 && <Button onClick={() => setMode("practice")}><PenLine aria-hidden className="size-4" /> Practice</Button>}
                </div>
              </div>
            )}
          </div>

          <nav aria-label="Lessons" className="grid gap-3 border-t border-line pt-6 sm:grid-cols-2">
            {lesson.previous ? (
              <Link to={`${base}/${lesson.previous.unitSlug}/lessons/${lesson.previous.slug}`} className="card p-4 hover:bg-sunken">
                <span className="flex items-center gap-1 text-xs text-muted"><ArrowLeft aria-hidden className="size-3.5" /> Previous</span>
                <span className="mt-1 block font-semibold">{lesson.previous.title}</span>
              </Link>
            ) : <span />}
            {lesson.next ? (
              <Link to={`${base}/${lesson.next.unitSlug}/lessons/${lesson.next.slug}`} className="card p-4 text-right hover:bg-sunken">
                <span className="flex items-center justify-end gap-1 text-xs text-muted">Next lesson <ArrowRight aria-hidden className="size-3.5" /></span>
                <span className="mt-1 block font-semibold">{lesson.next.title}</span>
              </Link>
            ) : <p className="self-center text-sm text-muted sm:text-right">This is the last lesson in {course.title}.</p>}
          </nav>
          {!preview && <Discussion lessonId={lesson.id} lessonTitle={lesson.title} />}
        </div>

        <aside className="min-w-0 space-y-4 lg:sticky lg:top-20 lg:self-start">
          {!preview && (
            <div className="card space-y-2 p-4">
              {canTrack ? (
                <>
                  <Button className="w-full" variant={status === "completed" ? "success" : "primary"} onClick={complete} disabled={status === "completed"}>
                    <CheckCircle2 aria-hidden className="size-4" /> {status === "completed" ? "Completed" : "Mark as complete"}
                  </Button>
                  <Button className="w-full" variant="secondary" onClick={toggleBookmark}>
                    {bookmarked ? <BookmarkCheck aria-hidden className="size-4" /> : <BookmarkPlus aria-hidden className="size-4" />} {bookmarked ? "Saved" : "Save lesson"}
                  </Button>
                </>
              ) : (
                <p className="text-sm text-muted">{user ? "Verify your email to track progress." : <><Link to="/login" className="link">Sign in</Link> to save progress and bookmarks. Learning is free either way.</>}</p>
              )}
              <button type="button" onClick={() => setFeedback({ type: "lesson", label: lesson.title })} className="flex w-full items-center justify-center gap-1.5 pt-1 text-xs font-semibold text-muted hover:text-ink">
                <MessageSquareWarning aria-hidden className="size-3.5" /> Report a problem or ask privately
              </button>
            </div>
          )}
          {lesson.formulas.length > 0 && (
            <div className="card p-4">
              <h2 className="text-sm font-bold">Key formulas</h2>
              <ul className="mt-2 space-y-3">
                {lesson.formulas.map((f) => (
                  <li key={f.slug}>
                    <Link to={`/formulas#${f.slug}`} className="text-xs font-semibold text-primary-ink hover:underline">{f.name}</Link>
                    <div className="mt-1 overflow-x-auto text-sm"><Tex latex={f.latex} /></div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {lesson.concepts.length > 0 && (
            <div className="card p-4">
              <h2 className="text-sm font-bold">Concepts</h2>
              <ul className="mt-2 flex flex-wrap gap-1.5">{lesson.concepts.map((c) => <li key={c.slug}><Link to={`/search?q=${encodeURIComponent(c.name)}`}><Badge>{c.name}</Badge></Link></li>)}</ul>
            </div>
          )}
        </aside>
      </Container>
      {feedback && <FeedbackDialog open onClose={() => setFeedback(null)} context={{ type: feedback.type, id: lesson.id, label: feedback.label }} />}
    </article>
  );
}
