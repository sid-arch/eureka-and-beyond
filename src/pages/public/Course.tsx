import { ArrowLeft, ArrowRight, BookmarkCheck, BookmarkPlus, CheckCircle2, ChevronDown, Circle, CircleDashed, Clock, ExternalLink, MessageSquareWarning, PlayCircle } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import type { CourseDetail, UnitDetail } from "../../../shared/types";
import { FeedbackDialog } from "../../components/lesson/Community";
import { Alert, Badge, Button, ButtonLink, Container, ErrorState, LevelBadge, Loading, PageHeader, ProgressBar, SubjectMark, cx } from "../../components/ui";
import { api, useApi } from "../../lib/api";
import { useAuth } from "../../lib/auth";
import { subjectStyle } from "../../lib/subjects";
import { NotFoundPage } from "./NotFound";
import { useTitle } from "../usePageTitle";

function useCourseProgress(course: string) {
  const { user } = useAuth();
  const progress = useApi<Record<string, "started" | "completed">>(user ? `/me/progress/${course}` : null);
  const enrolled = useApi<string[]>(user ? "/me/enrollments" : null);
  return { progress: progress.data ?? {}, enrolled: enrolled.data?.includes(course) ?? false, reloadEnroll: enrolled.reload };
}

export function CoursePage() {
  const { course: slug = "" } = useParams();
  const course = useApi<CourseDetail>(`/courses/${encodeURIComponent(slug)}`);
  useTitle(course.data?.title);
  if (course.status === "error" && course.error.status === 404) return <NotFoundPage />;
  if (course.status === "loading") return <Container><Loading rows={5} /></Container>;
  if (course.status === "error") return <Container><ErrorState error={course.error} onRetry={course.retry} /></Container>;
  return <CourseBody c={course.data} />;
}

function CourseBody({ c }: { c: CourseDetail }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const st = subjectStyle(c.subject.slug);
  const { progress, enrolled, reloadEnroll } = useCourseProgress(c.slug);
  const [openUnits, setOpenUnits] = useState<Record<string, boolean>>(() => Object.fromEntries(c.units.map((u) => [u.slug, u.lessonCount > 0])));
  const [feedback, setFeedback] = useState(false);
  const completed = Object.values(progress).filter((s) => s === "completed").length;
  const firstReady = c.units.flatMap((u) => u.chapters.flatMap((ch) => ch.lessons.filter((l) => l.slug).map((l) => ({ unit: u.slug, slug: l.slug! }))));
  const next = firstReady.find((l) => progress[l.slug] !== "completed") ?? firstReady[0];

  const toggleEnroll = async () => {
    if (!user) return navigate(`/login?next=/courses/${c.slug}`);
    if (enrolled) await api.del(`/me/enrollments/${c.slug}`);
    else await api.put(`/me/enrollments/${c.slug}`);
    reloadEnroll();
  };

  return (
    <>
      <div className={cx("border-b border-line", st.soft)}>
        <Container>
          <PageHeader
            crumbs={[{ label: "Courses", to: "/courses" }, { label: c.subject.name, to: `/subjects/${c.subject.slug}` }, { label: c.title }]}
            title={<span className="flex items-center gap-4"><SubjectMark slug={c.subject.slug} size="lg" /> {c.title}</span>}
            lead={c.overview || c.summary}
            actions={
              <>
                {next && <ButtonLink to={`/courses/${c.slug}/units/${next.unit}/lessons/${next.slug}`} size="lg"><PlayCircle aria-hidden className="size-5" /> {completed ? "Continue" : "Start learning"}</ButtonLink>}
                <Button variant="secondary" size="lg" onClick={toggleEnroll} disabled={!!user && !user.emailVerified} title={user && !user.emailVerified ? "Verify your email to enroll" : undefined}>
                  {enrolled ? <BookmarkCheck aria-hidden className="size-5" /> : <BookmarkPlus aria-hidden className="size-5" />}
                  {enrolled ? "Enrolled" : "Enroll"}
                </Button>
              </>
            }
          >
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <LevelBadge level={c.level} />
              <Badge>{c.units.length} units · {c.plannedLessonCount} lessons</Badge>
            </div>
            {user && firstReady.length > 0 && (
              <div className="mt-5 max-w-xl">
                <div className="mb-1.5 text-xs text-muted">You've completed {completed} of {c.plannedLessonCount} lessons</div>
                <ProgressBar value={completed} max={c.plannedLessonCount || 1} tone={c.subject.slug === "physics" ? "physics" : c.subject.slug === "chemistry" ? "chemistry" : "math"} label="Your progress" />
              </div>
            )}
          </PageHeader>
        </Container>
      </div>

      <Container className="grid gap-8 py-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="space-y-6">
          {c.status === "planned" && <Alert tone="info" title="This course is outlined but not written yet">Browse the full outline below. Lessons will appear here as they're written and checked; nothing is marked ready until it is.</Alert>}
          <section aria-labelledby="outline" className="space-y-3">
            <h2 id="outline" className="text-2xl">Course outline</h2>
            {c.units.map((u, i) => {
              const open = openUnits[u.slug];
              return (
                <div key={u.slug} className="card overflow-hidden">
                  <button type="button" onClick={() => setOpenUnits((o) => ({ ...o, [u.slug]: !o[u.slug] }))} aria-expanded={open} className="flex w-full items-center gap-4 p-4 text-left hover:bg-sunken sm:p-5">
                    <span className={cx("flex size-10 shrink-0 items-center justify-center rounded-lg font-display text-lg font-bold", st.soft)}>{i + 1}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-lg font-semibold leading-tight">{u.title}</span>
                      <span className="mt-0.5 block text-sm text-muted">{u.summary}</span>
                    </span>
                    <span className="hidden shrink-0 text-right text-xs text-muted sm:block">{u.plannedLessonCount} {u.plannedLessonCount === 1 ? "lesson" : "lessons"}</span>
                    <ChevronDown aria-hidden className={cx("size-5 shrink-0 text-muted transition-transform", open && "rotate-180")} />
                  </button>
                  {open && (
                    <div className="border-t border-line px-4 pb-4 sm:px-5">
                      {u.chapters.map((ch) => (
                        <div key={ch.slug} className="mt-4">
                          <h3 className="text-sm font-bold text-muted">{ch.title}</h3>
                          <ul className="mt-1.5 space-y-1">
                            {ch.lessons.map((l, k) => (
                              <li key={k}>
                                {l.slug ? (
                                  <Link to={`/courses/${c.slug}/units/${u.slug}/lessons/${l.slug}`} className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm font-semibold hover:bg-sunken">
                                    {progress[l.slug] === "completed" ? <CheckCircle2 aria-label="Completed" className="size-4 text-success" /> : <Circle aria-hidden className={cx("size-4", st.text)} />}
                                    {l.title}
                                    <ArrowRight aria-hidden className="ml-auto size-4 text-muted" />
                                  </Link>
                                ) : (
                                  <span className="flex items-center gap-2.5 px-2 py-1.5 text-sm text-muted">
                                    <CircleDashed aria-hidden className="size-4" /> {l.title} <span className="ml-auto text-xs">Planned</span>
                                  </span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <Link to={`/courses/${c.slug}/units/${u.slug}`} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-ink">Unit overview <ArrowRight aria-hidden className="size-4" /></Link>
                    </div>
                  )}
                </div>
              );
            })}
          </section>
        </div>
        <aside className="space-y-5">
          <div className="card p-5">
            <h2 className="text-base">Builds on</h2>
            {c.prerequisites.length ? (
              <ul className="mt-2 space-y-1.5 text-sm">{c.prerequisites.map((p) => <li key={p.slug}><Link className="link" to={`/courses/${p.slug}`}>{p.title}</Link></li>)}</ul>
            ) : <p className="mt-2 text-sm text-muted">No prerequisites; this is a starting point.</p>}
            <p className="mt-2 text-xs text-muted">Typical sequencing; schools vary.</p>
          </div>
          {c.objectives.length > 0 && (
            <div className="card p-5">
              <h2 className="text-base">By the end you'll be able to</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">{c.objectives.map((o) => <li key={o}>{o}</li>)}</ul>
            </div>
          )}
          {c.level === "ap" && c.framework && (
            <div className="card p-5">
              <h2 className="text-base">About AP alignment</h2>
              <p className="mt-2 text-sm text-muted">
                {c.alignmentStatus === "verified"
                  ? `Checked against the ${c.framework.name}.`
                  : `The units follow the structure of the ${c.framework.name}. A full topic-by-topic review hasn't been completed, so use the official course framework for exam preparation.`}
              </p>
              {c.framework.sourceUrl && <a href={c.framework.sourceUrl} target="_blank" rel="noopener noreferrer" className="link mt-2 inline-flex items-center gap-1 text-sm">AP Central <ExternalLink aria-hidden className="size-3.5" /><span className="sr-only">(opens in a new tab)</span></a>}
            </div>
          )}
          <button type="button" onClick={() => setFeedback(true)} className="flex w-full items-center gap-2 rounded-lg border border-dashed border-line p-3 text-sm text-muted hover:text-ink">
            <MessageSquareWarning aria-hidden className="size-4" /> Suggest something for this course
          </button>
          <FeedbackDialog open={feedback} onClose={() => setFeedback(false)} context={{ type: "course", id: c.id, label: c.title }} />
        </aside>
      </Container>
    </>
  );
}

export function UnitPage() {
  const { course = "", unit = "" } = useParams();
  const data = useApi<UnitDetail>(`/courses/${encodeURIComponent(course)}/units/${encodeURIComponent(unit)}`);
  const { progress } = useCourseProgress(course);
  useTitle(data.data ? `${data.data.title}, ${data.data.course.title}` : undefined);
  if (data.status === "error" && data.error.status === 404) return <NotFoundPage />;
  if (data.status === "loading") return <Container><Loading rows={4} /></Container>;
  if (data.status === "error") return <Container><ErrorState error={data.error} onRetry={data.retry} /></Container>;
  const u = data.data;
  const st = subjectStyle(u.course.subject.slug);
  return (
    <Container>
      <PageHeader crumbs={[{ label: "Courses", to: "/courses" }, { label: u.course.title, to: `/courses/${u.course.slug}` }, { label: `Unit ${u.position}` }]} title={u.title} lead={u.summary} />
      <div className="space-y-8 pb-6">
        {u.chapters.map((ch, i) => (
          <section key={ch.slug} aria-labelledby={`ch-${ch.slug}`}>
            <p className="text-sm font-semibold text-muted">Chapter {i + 1}</p>
            <h2 id={`ch-${ch.slug}`} className="text-2xl">{ch.title}</h2>
            <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {ch.items.map((it, k) => (
                <li key={k}>
                  {it.lesson ? (
                    <Link to={`/courses/${u.course.slug}/units/${u.slug}/lessons/${it.lesson.slug}`} className="card group flex h-full flex-col p-5 transition-shadow hover:shadow-[var(--shadow-lift)]">
                      <div className="flex items-center justify-between">
                        <span className={cx("text-xs font-bold", st.text)}>Lesson {k + 1}</span>
                        {progress[it.lesson.slug] === "completed" ? <Badge tone="success" dot="bg-success">Completed</Badge> : progress[it.lesson.slug] ? <Badge tone="primary">In progress</Badge> : <Badge tone="success">Ready</Badge>}
                      </div>
                      <h3 className="mt-2 text-lg group-hover:text-primary-ink">{it.title}</h3>
                      <p className="mt-1 flex-1 text-sm text-muted">{it.lesson.summary}</p>
                      {it.lesson.estimatedMinutes && <p className="mt-3 flex items-center gap-1.5 text-xs text-muted"><Clock aria-hidden className="size-3.5" /> About {it.lesson.estimatedMinutes} min</p>}
                    </Link>
                  ) : (
                    <div className="flex h-full flex-col rounded-xl border border-dashed border-line p-5">
                      <span className="text-xs font-bold text-muted">Lesson {k + 1}</span>
                      <h3 className="mt-2 text-lg text-muted">{it.title}</h3>
                      <p className="mt-auto pt-3 text-xs text-muted">Planned; not written yet</p>
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </section>
        ))}
        <nav aria-label="Units" className="flex flex-wrap justify-between gap-4 border-t border-line pt-6 text-sm">
          {u.previous ? <Link to={`/courses/${u.course.slug}/units/${u.previous.slug}`} className="link inline-flex items-center gap-1"><ArrowLeft aria-hidden className="size-4" /> {u.previous.title}</Link> : <span />}
          {u.next ? <Link to={`/courses/${u.course.slug}/units/${u.next.slug}`} className="link inline-flex items-center gap-1">{u.next.title} <ArrowRight aria-hidden className="size-4" /></Link> : <Link to={`/courses/${u.course.slug}`} className="link">Back to course</Link>}
        </nav>
      </div>
    </Container>
  );
}
