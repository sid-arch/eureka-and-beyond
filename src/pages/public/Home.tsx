import { ArrowRight, BadgeCheck, BookOpenCheck, ChartNoAxesCombined, FlaskConical, Hand, HeartHandshake, Lock, PenLine, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { ACTIVITY_DEFS } from "../../../shared/activities";
import type { CourseSummary, PlatformStats, Subject } from "../../../shared/types";
import { Sim } from "../../components/sims/registry";
import { Badge, ButtonLink, Container, Skeleton, SubjectMark, Tabs, cx } from "../../components/ui";
import { useApi } from "../../lib/api";
import { subjectStyle, type SubjectSlug } from "../../lib/subjects";
import { useTitle } from "../usePageTitle";

const DEMOS: { value: SubjectSlug; label: string; sim: string; caption: string }[] = [
  { value: "physics", label: "Physics", sim: "projectile", caption: "Change the angle and launch. Range, peak height and flight time are calculated from the equations of motion." },
  { value: "mathematics", label: "Mathematics", sim: "vertex-explorer", caption: "Drag the vertex. The equation, the zeros and the expanded form all update together." },
  { value: "chemistry", label: "Chemistry", sim: "ideal-gas", caption: "Hold one variable steady and change another. Pressure comes straight from PV = nRT." },
];

const MODES = [
  { name: "Learn", Icon: BookOpenCheck, text: "Clear explanations, definitions, derivations and worked examples with every step shown.", tone: "bg-primary-soft text-primary" },
  { name: "Experiment", Icon: Hand, text: "Simulations you control. Every number is calculated, and every model states its limits.", tone: "bg-physics-soft text-physics" },
  { name: "Practice", Icon: PenLine, text: "Questions with hints, instant feedback and full solutions, checked on our server.", tone: "bg-chem-soft text-chem" },
];

const FEATURED = [
  { title: "Projectile motion", subject: "physics", course: "Physics", href: "/courses/physics/units/kinematics/lessons/projectile-motion", blurb: "Split a launch into two independent motions and predict where it lands." },
  { title: "The unit circle", subject: "mathematics", course: "Precalculus", href: "/courses/precalculus/units/trigonometry/lessons/unit-circle", blurb: "Sine and cosine as coordinates you can drag around a circle." },
  { title: "The ideal gas law", subject: "chemistry", course: "Chemistry", href: "/courses/chemistry/units/gases/lessons/ideal-gas-law", blurb: "Squeeze, heat and fill a container and watch PV = nRT respond." },
  { title: "From average to instantaneous rate", subject: "mathematics", course: "AP Calculus AB", href: "/courses/ap-calculus-ab/units/unit-1/lessons/secant-to-tangent", blurb: "Shrink a secant line until it becomes the derivative." },
  { title: "Series and parallel circuits", subject: "physics", course: "Physics", href: "/courses/physics/units/electricity/lessons/series-parallel-circuits", blurb: "Rewire two resistors and read every current and voltage." },
  { title: "Limiting reactant", subject: "chemistry", course: "Chemistry", href: "/courses/chemistry/units/mole-stoichiometry/lessons/limiting-reactant", blurb: "Mix hydrogen and oxygen and find which one runs out first." },
];

const SHOWCASE = ["projectile", "unit-circle", "titration", "double-slit", "slope-field", "free-energy"];

const MATH_PATH = ["algebra-readiness", "algebra-1", "geometry", "algebra-2", "precalculus", "ap-calculus-ab", "ap-calculus-bc"];

const BENEFITS = [
  { Icon: HeartHandshake, title: "Free, completely", text: "Every lesson, simulation and practice set. No trials, no premium tier, no ads." },
  { Icon: ChartNoAxesCombined, title: "Progress that's real", text: "Mastery comes from the questions you've actually answered correctly, nothing else." },
  { Icon: Lock, title: "Private by default", text: "No public profiles or leaderboards. We collect only what an account needs." },
  { Icon: BadgeCheck, title: "Checked, not just written", text: "Every worked example and practice answer is recomputed, and every simulation states its assumptions." },
];

export function HomePage() {
  useTitle(null);
  const [demo, setDemo] = useState<SubjectSlug>("physics");
  const subjects = useApi<Subject[]>("/subjects");
  const courses = useApi<CourseSummary[]>("/courses");
  const stats = useApi<PlatformStats>("/stats");
  const d = DEMOS.find((x) => x.value === demo)!;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-surface">
        <div aria-hidden className="pointer-events-none absolute inset-0 grid-paper opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
        <Container className="relative pb-10 pt-12 sm:pt-16">
          <div className="grid items-end gap-8 lg:grid-cols-[1.25fr_1fr]">
            <div>
              <Badge tone="success" dot="bg-success" className="mb-5">100% free · no account needed to learn</Badge>
              <h1 className="text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[4.25rem]">
                Discover. Understand.
                <br />
                Go Beyond.
              </h1>
              <p className="mt-5 max-w-xl text-lg text-muted">
                Interactive mathematics, physics and chemistry for high school and beyond, from algebra readiness to AP. Read it, try it, then prove you've got it.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink to="/courses" size="lg">Explore courses <ArrowRight aria-hidden className="size-4" /></ButtonLink>
                <ButtonLink to="/labs" size="lg" variant="secondary"><FlaskConical aria-hidden className="size-4" /> Open the labs</ButtonLink>
              </div>
            </div>
            <dl className="grid grid-cols-3 gap-3 lg:mb-2">
              {(["mathematics", "physics", "chemistry"] as SubjectSlug[]).map((slug) => {
                const s = subjects.data?.find((x) => x.slug === slug);
                const st = subjectStyle(slug);
                return (
                  <Link key={slug} to={`/subjects/${slug}`} className="card group flex flex-col gap-2 p-3 transition-shadow hover:shadow-[var(--shadow-lift)] sm:p-4">
                    <SubjectMark slug={slug} size="sm" />
                    <dt className="text-sm font-semibold">{st.name}</dt>
                    <dd className="font-display text-2xl font-bold">{s ? s.courseCount : "–"}<span className="ml-1 text-xs font-medium text-muted">pathways</span></dd>
                  </Link>
                );
              })}
            </dl>
          </div>

          <div className="mt-10">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <Tabs label="Live demo subject" value={demo} onChange={setDemo} items={DEMOS.map((x) => ({ value: x.value, label: <span className="flex items-center gap-2"><SubjectMark slug={x.value} size="sm" className="!size-5 [&>svg]:!size-3" />{x.label}</span> }))} />
              <p className="flex items-center gap-1.5 text-sm text-muted"><Sparkles aria-hidden className="size-4 text-chem" /> Live, not a video. Try it.</p>
            </div>
            <div role="tabpanel" id={`panel-${demo}`} aria-labelledby={`tab-${demo}`}>
              <Sim key={demo} id={d.sim} />
              <p className="mt-2 text-sm text-muted">{d.caption}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Subjects */}
      <section aria-labelledby="subjects-h" className="py-16">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="subjects-h" className="text-3xl sm:text-4xl">Three subjects, 24 pathways</h2>
              <p className="mt-2 max-w-2xl text-muted">On-level, Honors and AP versions of each course. Honors and AP pathways add depth and harder problems; core lessons are shared, so moving between levels doesn't mean starting over.</p>
            </div>
            <ButtonLink to="/courses" variant="secondary">See the full catalog</ButtonLink>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {(["mathematics", "physics", "chemistry"] as SubjectSlug[]).map((slug) => {
              const st = subjectStyle(slug);
              const list = courses.data?.filter((c) => c.subject.slug === slug) ?? [];
              const subj = subjects.data?.find((s) => s.slug === slug);
              return (
                <article key={slug} className="card flex flex-col overflow-hidden">
                  <div className={cx("flex items-center gap-3 p-5", st.soft)}>
                    <SubjectMark slug={slug} size="lg" />
                    <div>
                      <h3 className="text-2xl">{st.name}</h3>
                      <p className="text-sm text-muted">{list.length || "–"} pathways · {list.reduce((a, c) => a + c.plannedLessonCount, 0)} lesson placements</p>
                    </div>
                  </div>
                  <p className="px-5 pt-4 text-sm text-muted">{subj?.description}</p>
                  <ul className="flex-1 divide-y divide-line px-5 py-3">
                    {courses.status !== "success"
                      ? [0, 1, 2, 3].map((i) => <li key={i} className="py-2"><Skeleton className="h-5" /></li>)
                      : list.slice(0, 6).map((c) => (
                          <li key={c.slug}>
                            <Link to={`/courses/${c.slug}`} className="flex items-center justify-between gap-2 py-2 text-sm hover:text-primary-ink">
                              <span className="font-semibold">{c.title}</span>
                              <span className="text-xs text-muted">{c.plannedLessonCount} lessons</span>
                            </Link>
                          </li>
                        ))}
                  </ul>
                  <Link to={`/subjects/${slug}`} className="flex items-center gap-1 border-t border-line px-5 py-3 text-sm font-semibold text-primary-ink hover:bg-sunken">
                    All {st.name.toLowerCase()} pathways <ArrowRight aria-hidden className="size-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Modes */}
      <section aria-labelledby="modes-h" className="border-y border-line bg-surface py-16">
        <Container>
          <h2 id="modes-h" className="text-3xl sm:text-4xl">Every lesson, four ways in</h2>
          <p className="mt-2 max-w-2xl text-muted">Switch between modes whenever you like. Lessons show which modes they include.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {MODES.map((m) => (
              <div key={m.name} className="rounded-xl border border-line p-5">
                <div className={cx("flex size-11 items-center justify-center rounded-lg", m.tone)}><m.Icon aria-hidden className="size-5" /></div>
                <h3 className="mt-4 text-xl">{m.name}</h3>
                <p className="mt-1.5 text-sm text-muted">{m.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured lessons */}
      <section aria-labelledby="featured-h" className="py-16">
        <Container>
          <h2 id="featured-h" className="text-3xl sm:text-4xl">Start with a favorite</h2>
          <p className="mt-2 text-muted">Complete lessons with a simulation, worked examples and checked practice.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED.map((f) => {
              const st = subjectStyle(f.subject);
              return (
                <Link key={f.href} to={f.href} className="card group flex gap-4 p-5 transition-shadow hover:shadow-[var(--shadow-lift)]">
                  <SubjectMark slug={f.subject} />
                  <div className="min-w-0">
                    <p className={cx("text-xs font-bold", st.text)}>{f.course}</p>
                    <h3 className="mt-0.5 text-lg group-hover:text-primary-ink">{f.title}</h3>
                    <p className="mt-1 text-sm text-muted">{f.blurb}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Simulation showcase */}
      <section aria-labelledby="labs-h" className="border-y border-line bg-surface py-16">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="labs-h" className="text-3xl sm:text-4xl">{ACTIVITY_DEFS.length} working simulations</h2>
              <p className="mt-2 max-w-2xl text-muted">A few favorites. Each one computes its results from the underlying equations and lists its assumptions.</p>
            </div>
            <ButtonLink to="/labs" variant="secondary">See all {ACTIVITY_DEFS.length} simulations</ButtonLink>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SHOWCASE.map((id) => ACTIVITY_DEFS.find((a) => a.id === id)).filter((a) => a !== undefined).map((a) => {
              const st = subjectStyle(a.subject);
              return (
                <li key={a.id}>
                  <Link to={`/labs?sim=${a.id}`} className="flex h-full items-start gap-3 rounded-lg border border-line p-3 hover:bg-sunken">
                    <span aria-hidden className={cx("mt-1.5 size-2.5 shrink-0 rounded-full", st.bg)} />
                    <span>
                      <span className="block text-sm font-semibold">{a.title}</span>
                      <span className="mt-0.5 block text-xs text-muted">{a.summary}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Pathway preview */}
      <section aria-labelledby="path-h" className="py-16">
        <Container>
          <h2 id="path-h" className="text-3xl sm:text-4xl">A path from algebra to calculus</h2>
          <p className="mt-2 max-w-2xl text-muted">Typical sequencing; schools vary. Each course lists what it builds on.</p>
          <ol className="mt-8 flex gap-3 overflow-x-auto pb-2">
            {MATH_PATH.map((slug, i) => {
              const c = courses.data?.find((x) => x.slug === slug);
              return (
                <li key={slug} className="flex shrink-0 items-center gap-3">
                  <Link to={`/courses/${slug}`} className="card block w-52 p-4 hover:shadow-[var(--shadow-lift)]">
                    <p className="text-xs font-bold text-math">Step {i + 1}</p>
                    <p className="mt-1 font-display text-lg font-semibold leading-tight">{c?.title ?? "…"}</p>
                    <p className="mt-1 text-xs text-muted">{c ? `${c.plannedLessonCount} lessons` : ""}</p>
                  </Link>
                  {i < MATH_PATH.length - 1 && <ArrowRight aria-hidden className="size-5 shrink-0 text-muted" />}
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      {/* Benefits + honest status */}
      <section aria-labelledby="why-h" className="border-t border-line bg-surface py-16">
        <Container className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 id="why-h" className="text-3xl sm:text-4xl">Built for students</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {BENEFITS.map((b) => (
                <div key={b.title} className="flex gap-3">
                  <b.Icon aria-hidden className="mt-0.5 size-6 shrink-0 text-primary" />
                  <div>
                    <h3 className="text-lg">{b.title}</h3>
                    <p className="mt-1 text-sm text-muted">{b.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-primary p-7 text-white dark:text-[#0d1424]">
            <h3 className="text-2xl">The whole curriculum, free</h3>
            <p className="mt-2 text-sm opacity-90">Counted live from the database.</p>
            <dl className="mt-6 grid grid-cols-2 gap-5">
              {[
                ["Lessons", stats.data?.publishedLessons],
                ["Courses", stats.data?.courses],
                ["Formulas", stats.data?.publishedFormulas],
                ["Simulations", ACTIVITY_DEFS.length],
              ].map(([label, value]) => (
                <div key={label as string} className="flex flex-col-reverse">
                  <dt className="text-sm opacity-85">{label}</dt>
                  <dd className="font-display text-3xl font-bold">{value ?? "–"}</dd>
                </div>
              ))}
            </dl>
            <ButtonLink to="/register" variant="secondary" className="mt-7 !text-ink">Create a free account</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
