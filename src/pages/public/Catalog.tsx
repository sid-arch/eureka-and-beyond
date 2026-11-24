import { ArrowRight, SearchX } from "lucide-react";
import { Link, useParams, useSearchParams } from "react-router";
import { LEVEL_LABELS, type CourseLevel, type CourseSummary, type Subject } from "../../../shared/types";
import { Container, EmptyState, ErrorState, LevelBadge, Loading, PageHeader, SubjectMark, cx } from "../../components/ui";
import { useApi } from "../../lib/api";
import { subjectStyle, type SubjectSlug } from "../../lib/subjects";
import { NotFoundPage } from "./NotFound";
import { useTitle } from "../usePageTitle";

const LEVELS: CourseLevel[] = ["foundational", "on_level", "honors", "ap"];

export function CourseCard({ course }: { course: CourseSummary }) {
  const st = subjectStyle(course.subject.slug);
  return (
    <Link to={`/courses/${course.slug}`} className="card group flex h-full flex-col p-5 transition-shadow hover:shadow-[var(--shadow-lift)]">
      <div className="flex items-start justify-between gap-3">
        <SubjectMark slug={course.subject.slug} size="sm" />
        <LevelBadge level={course.level} />
      </div>
      <h3 className="mt-3 text-lg leading-snug group-hover:text-primary-ink">{course.title}</h3>
      <p className="mt-1 line-clamp-2 flex-1 text-sm text-muted">{course.summary}</p>
      <p className="mt-4 text-xs font-semibold text-muted">{course.plannedLessonCount} lessons</p>
      <span className={cx("sr-only", st.text)}>{course.subject.name}</span>
    </Link>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" aria-pressed={active} onClick={onClick} className={cx("rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors", active ? "border-primary bg-primary text-white dark:text-[#0d1424]" : "border-line bg-surface text-muted hover:text-ink")}>
      {children}
    </button>
  );
}

export function CatalogPage() {
  useTitle("Course catalog");
  const [params, setParams] = useSearchParams();
  const subject = params.get("subject") ?? "";
  const level = params.get("level") ?? "";
  const courses = useApi<CourseSummary[]>("/courses");
  const set = (k: string, v: string) => {
    const n = new URLSearchParams(params);
    if (v) n.set(k, v); else n.delete(k);
    setParams(n, { replace: true });
  };
  const list = (courses.data ?? []).filter((c) => (!subject || c.subject.slug === subject) && (!level || c.level === level));
  return (
    <Container>
      <PageHeader title="Course catalog" lead="All 24 pathways in mathematics, physics and chemistry, each with lessons, simulations and practice." />
      <div className="card mb-6 flex flex-col gap-3 p-4" role="group" aria-label="Filters">
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-14 text-sm font-semibold">Subject</span>
          <Chip active={!subject} onClick={() => set("subject", "")}>All</Chip>
          {(["mathematics", "physics", "chemistry"] as SubjectSlug[]).map((s) => <Chip key={s} active={subject === s} onClick={() => set("subject", s)}>{subjectStyle(s).name}</Chip>)}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-14 text-sm font-semibold">Level</span>
          <Chip active={!level} onClick={() => set("level", "")}>All</Chip>
          {LEVELS.map((l) => <Chip key={l} active={level === l} onClick={() => set("level", l)}>{LEVEL_LABELS[l]}</Chip>)}
        </div>
      </div>
      {courses.status === "loading" && <Loading rows={6} />}
      {courses.status === "error" && <ErrorState error={courses.error} onRetry={courses.retry} />}
      {courses.status === "success" && (
        <>
          <p className="mb-4 text-sm text-muted" aria-live="polite">{list.length} {list.length === 1 ? "pathway" : "pathways"}</p>
          {list.length === 0 ? (
            <EmptyState icon={<SearchX />} title="No courses match these filters">Try a different subject or level.</EmptyState>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{list.map((c) => <CourseCard key={c.slug} course={c} />)}</div>
          )}
        </>
      )}
    </Container>
  );
}

export function SubjectsPage() {
  useTitle("Subjects");
  const subjects = useApi<Subject[]>("/subjects");
  const courses = useApi<CourseSummary[]>("/courses");
  return (
    <Container>
      <PageHeader title="Explore subjects" lead="Each subject runs from first foundations to AP, with On-level, Honors and AP versions." />
      {subjects.status === "error" && <ErrorState error={subjects.error} onRetry={subjects.retry} />}
      <div className="space-y-10">
        {(subjects.data ?? []).map((s) => {
          const st = subjectStyle(s.slug);
          const mine = (courses.data ?? []).filter((c) => c.subject.slug === s.slug);
          return (
            <section key={s.slug} aria-labelledby={`s-${s.slug}`}>
              <div className={cx("mb-4 flex flex-wrap items-center gap-4 rounded-xl p-5", st.soft)}>
                <SubjectMark slug={s.slug} size="lg" />
                <div className="flex-1">
                  <h2 id={`s-${s.slug}`} className="text-2xl"><Link to={`/subjects/${s.slug}`} className="hover:underline">{s.name}</Link></h2>
                  <p className="text-sm text-muted">{s.description}</p>
                </div>
                <Link to={`/subjects/${s.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-primary-ink">View subject <ArrowRight aria-hidden className="size-4" /></Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{mine.map((c) => <CourseCard key={c.slug} course={c} />)}</div>
            </section>
          );
        })}
      </div>
    </Container>
  );
}

export function SubjectPage() {
  const { subject = "" } = useParams();
  const subjects = useApi<Subject[]>("/subjects");
  const courses = useApi<CourseSummary[]>(`/courses?subject=${encodeURIComponent(subject)}`);
  const s = subjects.data?.find((x) => x.slug === subject);
  useTitle(s?.name);
  if (subjects.status === "success" && !s) return <NotFoundPage />;
  const st = subjectStyle(subject);
  return (
    <>
      <div className={cx("border-b border-line", st.soft)}>
        <Container>
          <PageHeader crumbs={[{ label: "Subjects", to: "/subjects" }, { label: s?.name ?? "…" }]} title={<span className="flex items-center gap-4"><SubjectMark slug={subject} size="lg" />{s?.name ?? "Loading…"}</span>} lead={s?.description} />
        </Container>
      </div>
      <Container className="py-8">
        {courses.status === "loading" && <Loading rows={4} />}
        {courses.status === "error" && <ErrorState error={courses.error} onRetry={courses.retry} />}
        {LEVELS.map((lvl) => {
          const items = (courses.data ?? []).filter((c) => c.level === lvl);
          if (!items.length) return null;
          return (
            <section key={lvl} className="mb-10" aria-labelledby={`lvl-${lvl}`}>
              <h2 id={`lvl-${lvl}`} className="mb-4 text-xl">{LEVEL_LABELS[lvl]}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map((c) => <CourseCard key={c.slug} course={c} />)}</div>
            </section>
          );
        })}
      </Container>
    </>
  );
}
