import { ArrowDown, ArrowUp, Copy, Eye, FilePlus2, History, Pencil, Plus, Save, ShieldCheck, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router";
import { ACTIVITY_DEFS } from "../../../shared/activities";
import { LEVEL_LABELS, STATUS_LABELS, type CourseLevel, type LessonDetail, type LessonMode } from "../../../shared/types";
import { RequirePermission } from "../../components/layout/Shells";
import { Sim } from "../../components/sims/registry";
import { Alert, Badge, Button, Checkbox, Dialog, EmptyState, ErrorState, Field, FormError, Input, Loading, PageHeader, Section, Select, SubjectMark, Table, Tabs, Textarea, cx } from "../../components/ui";
import { Math as Tex } from "../../components/ui/Math";
import { api, useAction, useApi } from "../../lib/api";
import { useAuth } from "../../lib/auth";
import { fmtDateTime } from "../../lib/subjects";
import { LessonView } from "../public/Lesson";
import { useTitle } from "../usePageTitle";

const STATUS_TONE: Record<string, "neutral" | "primary" | "success" | "warning"> = { draft: "warning", in_review: "primary", published: "success", archived: "neutral", planned: "neutral", in_development: "primary" };
const StatusPill = ({ s }: { s: string }) => <Badge tone={STATUS_TONE[s] ?? "neutral"}>{(STATUS_LABELS as Record<string, string>)[s] ?? s.replace("_", " ")}</Badge>;
const slugify = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/[\s_]+/g, "-").replace(/-+/g, "-").slice(0, 80);

// ===========================================================================
// Curriculum overview
// ===========================================================================

export function AdminCurriculumPage() {
  useTitle("Curriculum manager");
  const d = useApi<{ subjects: { id: string; slug: string; name: string }[]; courses: { id: string; subject_id: string; slug: string; title: string; level: CourseLevel; status: string; units: number; planned: number; published: number }[] }>("/admin/curriculum");
  const [creating, setCreating] = useState(false);
  return (
    <RequirePermission perm="content.edit">
      <PageHeader className="!pt-0" title="Curriculum manager" lead="Courses, units, chapters, outlines and lessons. Changes are saved as drafts until you publish them." actions={<Button onClick={() => setCreating(true)}><Plus aria-hidden className="size-4" /> New course</Button>} />
      {d.status === "loading" && <Loading />}
      {d.status === "error" && <ErrorState error={d.error} onRetry={d.retry} />}
      {d.data?.subjects.map((s) => (
        <Section key={s.id} className="mb-6" title={<span className="flex items-center gap-2"><SubjectMark slug={s.slug} size="sm" /> {s.name}</span>}>
          <Table>
            <thead><tr><th>Course</th><th>Level</th><th>Status</th><th>Units</th><th>Lessons written</th></tr></thead>
            <tbody>{d.data!.courses.filter((c) => c.subject_id === s.id).map((c) => (
              <tr key={c.id}>
                <td><Link to={`/admin/curriculum/${c.id}`} className="font-semibold text-primary-ink hover:underline">{c.title}</Link><p className="text-xs text-muted">/{c.slug}</p></td>
                <td>{LEVEL_LABELS[c.level]}</td>
                <td><StatusPill s={c.status} /></td>
                <td>{c.units}</td>
                <td>{c.published} / {c.planned}</td>
              </tr>
            ))}</tbody>
          </Table>
        </Section>
      ))}
      {creating && d.data && <NewCourseDialog subjects={d.data.subjects} onClose={() => setCreating(false)} />}
    </RequirePermission>
  );
}

function NewCourseDialog({ subjects, onClose }: { subjects: { id: string; name: string }[]; onClose: () => void }) {
  const navigate = useNavigate();
  const [f, setF] = useState({ subjectId: subjects[0].id, title: "", slug: "", level: "on_level", summary: "" });
  const create = useAction(async (e: FormEvent) => { e.preventDefault(); const r = await api.post<{ id: string }>("/admin/courses", f); navigate(`/admin/curriculum/${r.id}`); });
  return (
    <Dialog open onClose={onClose} title="New course">
      <form onSubmit={create.run} className="space-y-4">
        <Field label="Subject">{(p) => <Select {...p} value={f.subjectId} onChange={(e) => setF({ ...f, subjectId: e.target.value })}>{subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</Select>}</Field>
        <Field label="Title" error={create.error?.fields.title}>{(p) => <Input {...p} value={f.title} onChange={(e) => setF({ ...f, title: e.target.value, slug: slugify(e.target.value) })} />}</Field>
        <Field label="Address" hint="Lowercase words joined by hyphens." error={create.error?.fields.slug}>{(p) => <Input {...p} value={f.slug} onChange={(e) => setF({ ...f, slug: e.target.value })} />}</Field>
        <Field label="Level">{(p) => <Select {...p} value={f.level} onChange={(e) => setF({ ...f, level: e.target.value })}>{Object.entries(LEVEL_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</Select>}</Field>
        <Field label="Summary">{(p) => <Textarea {...p} value={f.summary} onChange={(e) => setF({ ...f, summary: e.target.value })} />}</Field>
        {create.error && !Object.keys(create.error.fields).length && <FormError error={create.error} />}
        <Button type="submit" loading={create.pending}>Create course</Button>
      </form>
    </Dialog>
  );
}

// ===========================================================================
// Course editor: details, outline, structure
// ===========================================================================

interface CourseData {
  course: { id: string; slug: string; title: string; level: CourseLevel; summary: string; overview: string; status: string; alignment_status: string };
  objectives: { id: string; text: string }[];
  units: { id: string; slug: string; title: string; summary: string; position: number; status: string }[];
  chapters: { id: string; unit_id: string; slug: string; title: string; summary: string; position: number; status: string }[];
  plans: { id: string; chapter_id: string; title: string; position: number; lesson_id: string | null }[];
  lessons: { chapter_id: string; position: number; id: string; slug: string; title: string; status: string; updated_at: string }[];
}

export function AdminCourseEditorPage() {
  const { id = "" } = useParams();
  const { can } = useAuth();
  const navigate = useNavigate();
  const d = useApi<CourseData>(`/admin/courses/${id}`);
  useTitle(d.data ? `Edit ${d.data.course.title}` : "Edit course");
  const [details, setDetails] = useState(false);
  const [node, setNode] = useState<{ kind: "unit" | "chapter"; parent?: string; existing?: { id: string; slug: string; title: string; summary: string } } | null>(null);
  const act = useAction(async (fn: () => Promise<unknown>) => { await fn(); d.reload(); });
  if (d.status === "loading") return <Loading />;
  if (d.status === "error") return <ErrorState error={d.error} onRetry={d.retry} />;
  const c = d.data;
  const move = (kind: "units" | "chapters" | "plans", parentId: string, ids: string[], i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= ids.length) return;
    const next = [...ids];
    [next[i], next[j]] = [next[j], next[i]];
    void act.run(() => api.post("/admin/reorder", { kind, parentId, ids: next }));
  };
  const setStatus = (kind: string, itemId: string, status: string) => act.run(() => api.patch(`/admin/${kind}/${itemId}/status`, { status }));
  const writeLesson = async (plan: { id: string; title: string }, chapterId: string) => {
    const r = await api.post<{ id: string }>(`/admin/chapters/${chapterId}/lessons`, { slug: slugify(plan.title), title: plan.title, planId: plan.id }).catch((e: Error) => { act.setError(e as never); return null; });
    if (r) navigate(`/admin/lessons/${r.id}`);
  };
  return (
    <RequirePermission perm="content.edit">
      <PageHeader className="!pt-0" crumbs={[{ label: "Curriculum", to: "/admin/curriculum" }, { label: c.course.title }]} title={c.course.title}
        actions={<>
          <Button variant="secondary" onClick={() => setDetails(true)}><Pencil aria-hidden className="size-4" /> Course details</Button>
          <Link to={`/courses/${c.course.slug}`} className="inline-flex h-10 items-center gap-2 rounded-md border border-line px-4 text-sm font-semibold hover:bg-sunken"><Eye aria-hidden className="size-4" /> View public page</Link>
        </>}>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <StatusPill s={c.course.status} />
          {can("content.publish") && (
            <Select aria-label="Course status" value={c.course.status} onChange={(e) => setStatus("courses", c.course.id, e.target.value)} className="h-8 w-48">
              {["planned", "in_development", "published", "archived"].map((s) => <option key={s} value={s}>{STATUS_LABELS[s as keyof typeof STATUS_LABELS]}</option>)}
            </Select>
          )}
        </div>
      </PageHeader>
      <FormError error={act.error} />
      <div className="space-y-4">
        {c.units.map((u, ui) => {
          const chs = c.chapters.filter((x) => x.unit_id === u.id);
          return (
            <section key={u.id} className="card p-4" aria-label={u.title}>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-display text-lg font-bold text-muted">{ui + 1}</span>
                <h2 className="flex-1 text-lg">{u.title}</h2>
                <StatusPill s={u.status} />
                <NodeControls onUp={() => move("units", c.course.id, c.units.map((x) => x.id), ui, -1)} onDown={() => move("units", c.course.id, c.units.map((x) => x.id), ui, 1)}
                  onEdit={() => setNode({ kind: "unit", existing: u })} status={u.status} onStatus={can("content.publish") ? (s) => setStatus("units", u.id, s) : undefined} />
              </div>
              <div className="mt-3 space-y-3 pl-6">
                {chs.map((ch, ci) => {
                  const plans = c.plans.filter((p) => p.chapter_id === ch.id);
                  const loose = c.lessons.filter((l) => l.chapter_id === ch.id && !plans.some((p) => p.lesson_id === l.id));
                  return (
                    <div key={ch.id} className="rounded-lg border border-line p-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="flex-1 text-base">{ch.title}</h3>
                        <StatusPill s={ch.status} />
                        <NodeControls onUp={() => move("chapters", u.id, chs.map((x) => x.id), ci, -1)} onDown={() => move("chapters", u.id, chs.map((x) => x.id), ci, 1)}
                          onEdit={() => setNode({ kind: "chapter", parent: u.id, existing: ch })} status={ch.status} onStatus={can("content.publish") ? (s) => setStatus("chapters", ch.id, s) : undefined} />
                      </div>
                      <ol className="mt-2 space-y-1">
                        {plans.map((p, pi) => {
                          const l = c.lessons.find((x) => x.id === p.lesson_id);
                          return (
                            <li key={p.id} className="flex flex-wrap items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-sunken">
                              <span className="w-5 text-xs text-muted">{pi + 1}</span>
                              <span className="flex-1">{l ? <Link to={`/admin/lessons/${l.id}`} className="font-semibold text-primary-ink hover:underline">{p.title}</Link> : p.title}</span>
                              {l ? <StatusPill s={l.status} /> : <Badge>Planned</Badge>}
                              <div className="flex gap-0.5">
                                <IconBtn label="Move up" onClick={() => move("plans", ch.id, plans.map((x) => x.id), pi, -1)}><ArrowUp className="size-3.5" /></IconBtn>
                                <IconBtn label="Move down" onClick={() => move("plans", ch.id, plans.map((x) => x.id), pi, 1)}><ArrowDown className="size-3.5" /></IconBtn>
                                <IconBtn label="Rename" onClick={() => { const t = prompt("Lesson title", p.title); if (t && t.trim()) void act.run(() => api.patch(`/admin/plans/${p.id}`, { title: t.trim() })); }}><Pencil className="size-3.5" /></IconBtn>
                                {!l && <IconBtn label="Remove from outline" onClick={() => confirm(`Remove "${p.title}" from the outline?`) && act.run(() => api.del(`/admin/plans/${p.id}`))}><Trash2 className="size-3.5" /></IconBtn>}
                              </div>
                              {!l && <Button size="sm" variant="secondary" onClick={() => writeLesson(p, ch.id)}><FilePlus2 aria-hidden className="size-3.5" /> Write lesson</Button>}
                            </li>
                          );
                        })}
                        {loose.map((l) => (
                          <li key={l.id} className="flex items-center gap-2 px-2 py-1.5 text-sm">
                            <span className="w-5" /><Link to={`/admin/lessons/${l.id}`} className="flex-1 font-semibold text-primary-ink hover:underline">{l.title}</Link><StatusPill s={l.status} /><Badge>Not in outline</Badge>
                          </li>
                        ))}
                      </ol>
                      <Button size="sm" variant="ghost" className="mt-1" onClick={() => { const t = prompt("Planned lesson title"); if (t && t.trim()) void act.run(() => api.post(`/admin/chapters/${ch.id}/plans`, { title: t.trim() })); }}><Plus aria-hidden className="size-3.5" /> Add planned lesson</Button>
                    </div>
                  );
                })}
                <Button size="sm" variant="secondary" onClick={() => setNode({ kind: "chapter", parent: u.id })}><Plus aria-hidden className="size-3.5" /> Add chapter</Button>
              </div>
            </section>
          );
        })}
        <Button onClick={() => setNode({ kind: "unit" })}><Plus aria-hidden className="size-4" /> Add unit</Button>
      </div>
      {details && <CourseDetailsDialog data={c} onClose={() => { setDetails(false); d.reload(); }} />}
      {node && <NodeDialog courseId={c.course.id} node={node} onClose={() => { setNode(null); d.reload(); }} />}
    </RequirePermission>
  );
}

function IconBtn({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return <button type="button" aria-label={label} title={label} onClick={onClick} className="inline-flex size-7 items-center justify-center rounded text-muted hover:bg-surface hover:text-ink">{children}</button>;
}

function NodeControls({ onUp, onDown, onEdit, status, onStatus }: { onUp: () => void; onDown: () => void; onEdit: () => void; status: string; onStatus?: (s: string) => void }) {
  return (
    <div className="flex items-center gap-0.5">
      <IconBtn label="Move up" onClick={onUp}><ArrowUp className="size-4" /></IconBtn>
      <IconBtn label="Move down" onClick={onDown}><ArrowDown className="size-4" /></IconBtn>
      <IconBtn label="Edit" onClick={onEdit}><Pencil className="size-4" /></IconBtn>
      {onStatus && <Button size="sm" variant="ghost" onClick={() => onStatus(status === "published" ? "draft" : "published")}>{status === "published" ? "Unpublish" : "Publish"}</Button>}
    </div>
  );
}

function NodeDialog({ courseId, node, onClose }: { courseId: string; node: { kind: "unit" | "chapter"; parent?: string; existing?: { id: string; slug: string; title: string; summary: string } }; onClose: () => void }) {
  const [f, setF] = useState({ title: node.existing?.title ?? "", slug: node.existing?.slug ?? "", summary: node.existing?.summary ?? "" });
  const save = useAction(async (e: FormEvent) => {
    e.preventDefault();
    if (node.existing) await api.patch(`/admin/${node.kind}s/${node.existing.id}`, f);
    else if (node.kind === "unit") await api.post(`/admin/courses/${courseId}/units`, f);
    else await api.post(`/admin/units/${node.parent}/chapters`, f);
    onClose();
  });
  return (
    <Dialog open onClose={onClose} title={`${node.existing ? "Edit" : "New"} ${node.kind}`} description={node.existing ? undefined : "New units and chapters start as drafts."}>
      <form onSubmit={save.run} className="space-y-4">
        <Field label="Title" error={save.error?.fields.title}>{(p) => <Input {...p} value={f.title} onChange={(e) => setF({ ...f, title: e.target.value, slug: node.existing ? f.slug : slugify(e.target.value) })} />}</Field>
        <Field label="Address" error={save.error?.fields.slug}>{(p) => <Input {...p} value={f.slug} onChange={(e) => setF({ ...f, slug: e.target.value })} />}</Field>
        <Field label="Summary">{(p) => <Textarea {...p} value={f.summary} onChange={(e) => setF({ ...f, summary: e.target.value })} />}</Field>
        {save.error && !Object.keys(save.error.fields).length && <FormError error={save.error} />}
        <Button type="submit" loading={save.pending}>Save</Button>
      </form>
    </Dialog>
  );
}

function CourseDetailsDialog({ data, onClose }: { data: CourseData; onClose: () => void }) {
  const { can } = useAuth();
  const c = data.course;
  const [f, setF] = useState({ title: c.title, slug: c.slug, level: c.level, summary: c.summary, overview: c.overview, alignmentStatus: c.alignment_status, objectives: data.objectives.map((o) => o.text).join("\n") });
  const save = useAction(async (e: FormEvent) => {
    e.preventDefault();
    await api.patch(`/admin/courses/${c.id}`, { ...f, objectives: f.objectives.split("\n").map((s) => s.trim()).filter(Boolean) });
    onClose();
  });
  return (
    <Dialog open onClose={onClose} title="Course details" size="lg">
      <form onSubmit={save.run} className="grid gap-4 sm:grid-cols-2">
        <Field label="Title" className="sm:col-span-2">{(p) => <Input {...p} value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} />}</Field>
        <Field label="Address" error={save.error?.fields.slug}>{(p) => <Input {...p} value={f.slug} onChange={(e) => setF({ ...f, slug: e.target.value })} />}</Field>
        <Field label="Level">{(p) => <Select {...p} value={f.level} onChange={(e) => setF({ ...f, level: e.target.value as CourseLevel })}>{Object.entries(LEVEL_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</Select>}</Field>
        <Field label="Summary" className="sm:col-span-2" hint="One or two sentences for catalog cards.">{(p) => <Textarea {...p} className="min-h-16" value={f.summary} onChange={(e) => setF({ ...f, summary: e.target.value })} />}</Field>
        <Field label="Overview" className="sm:col-span-2">{(p) => <Textarea {...p} value={f.overview} onChange={(e) => setF({ ...f, overview: e.target.value })} />}</Field>
        <Field label="Learning objectives" className="sm:col-span-2" hint="One per line.">{(p) => <Textarea {...p} value={f.objectives} onChange={(e) => setF({ ...f, objectives: e.target.value })} />}</Field>
        {c.level === "ap" && (
          <Field label="AP alignment" hint={can("settings.manage") ? "Mark verified only after a full topic-by-topic review against the current CED." : "Only administrators can mark alignment verified."}>
            {(p) => <Select {...p} value={f.alignmentStatus} onChange={(e) => setF({ ...f, alignmentStatus: e.target.value })}>
              <option value="unverified">Unverified</option><option value="in_review">In review</option>{can("settings.manage") && <option value="verified">Verified</option>}
            </Select>}
          </Field>
        )}
        <div className="sm:col-span-2"><FormError error={save.error} /></div>
        <Button type="submit" loading={save.pending} className="justify-self-start">Save details</Button>
      </form>
    </Dialog>
  );
}

// ===========================================================================
// Lesson content studio
// ===========================================================================

type Block = { kind: string; mode: LessonMode; data: Record<string, unknown> };
interface LessonAdmin {
  lesson: { id: string; slug: string; title: string; summary: string; estimated_minutes: number | null; status: string; revision: number; updated_at: string };
  objectives: string[];
  blocks: (Block & { id: string })[];
  questions: Question[];
  placements: { course_id: string; course_slug: string; course_title: string; unit_slug: string; unit_title: string; unit_status: string; chapter_title: string; chapter_status: string }[];
}
interface Question { id?: string; purpose: "practice" | "review"; kind: "multiple_choice" | "numeric" | "short_text"; difficulty: number; prompt: string; data: Record<string, unknown>; hints: string[]; solution: string; status: string }

const BLOCK_KINDS: { kind: string; label: string; empty: Record<string, unknown> }[] = [
  { kind: "text", label: "Text", empty: { body: "" } },
  { kind: "definition", label: "Definition", empty: { term: "", body: "" } },
  { kind: "formula", label: "Formula", empty: { title: "", latex: "", note: "" } },
  { kind: "worked_example", label: "Worked example", empty: { title: "", steps: [{ latex: "", explanation: "" }], check: "" } },
  { kind: "callout", label: "Callout", empty: { tone: "tip", title: "", body: "" } },
  { kind: "activity", label: "Interactive activity", empty: { activity: ACTIVITY_DEFS[0].id, title: "" } },
  { kind: "figure", label: "Image", empty: { src: "", alt: "", caption: "" } },
  { kind: "references", label: "References", empty: { items: [] } },
];

export function AdminLessonStudioPage() {
  const { id = "" } = useParams();
  const { can } = useAuth();
  const d = useApi<LessonAdmin>(`/admin/lessons/${id}`);
  useTitle(d.data ? `Edit: ${d.data.lesson.title}` : "Lesson studio");
  const [meta, setMeta] = useState<{ title: string; summary: string; estimatedMinutes: number | null; objectives: string } | null>(null);
  const [blocks, setBlocks] = useState<Block[] | null>(null);
  const [dirty, setDirty] = useState(false);
  const [tab, setTab] = useState<"content" | "practice" | "preview">("content");
  const [note, setNote] = useState("");
  const [revisions, setRevisions] = useState(false);
  const [problems, setProblems] = useState<{ level: string; message: string }[] | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!d.data || meta) return;
    setMeta({ title: d.data.lesson.title, summary: d.data.lesson.summary, estimatedMinutes: d.data.lesson.estimated_minutes, objectives: d.data.objectives.join("\n") });
    setBlocks(d.data.blocks.map(({ kind, mode, data }) => ({ kind, mode, data })));
  }, [d.data, meta]);
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const save = useAction(async () => {
    const r = await api.put<{ revision: number }>(`/admin/lessons/${id}`, { title: meta!.title, summary: meta!.summary, estimatedMinutes: meta!.estimatedMinutes, objectives: meta!.objectives.split("\n").map((s) => s.trim()).filter(Boolean), blocks, note });
    setDirty(false);
    setNote("");
    setMsg(`Saved as revision ${r.revision}.`);
    d.reload();
  });
  const validate = useAction(async () => setProblems((await api.get<{ problems: { level: string; message: string }[] }>(`/admin/lessons/${id}/validate`)).problems));
  const setStatus = useAction(async (status: string) => { await api.patch(`/admin/lessons/${id}/status`, { status }); setMsg(status === "published" ? "Published." : `Status set to ${status}.`); d.reload(); });

  if (d.status === "loading" || !meta || !blocks) return <Loading />;
  if (d.status === "error") return <ErrorState error={d.error} onRetry={d.retry} />;
  const L = d.data!;
  const update = (fn: (b: Block[]) => Block[]) => { setBlocks(fn(blocks)); setDirty(true); setMsg(null); };
  const p0 = L.placements[0];
  const preview: LessonDetail = {
    id: L.lesson.id, slug: L.lesson.slug, title: meta.title, summary: meta.summary, estimatedMinutes: meta.estimatedMinutes, publishedAt: null,
    context: { course: { slug: p0?.course_slug ?? "", title: p0?.course_title ?? "Unplaced", subject: { slug: "mathematics", name: "" } }, unit: { slug: p0?.unit_slug ?? "", title: p0?.unit_title ?? "" }, chapter: { slug: "", title: p0?.chapter_title ?? "" } },
    objectives: meta.objectives.split("\n").filter(Boolean),
    blocks: blocks.map((b, i) => ({ ...b, id: `p${i}` })) as unknown as LessonDetail["blocks"],
    practice: L.questions.filter((q) => q.status !== "archived").map((q) => ({ id: q.id!, purpose: q.purpose, kind: q.kind, difficulty: q.difficulty as 1, prompt: q.prompt, choices: q.data.choices as string[] | undefined, unit: q.data.unit as string | undefined, hints: q.hints })),
    concepts: [], formulas: [], references: [], previous: null, next: null,
  };

  return (
    <RequirePermission perm="content.edit">
      <PageHeader className="!pt-0" crumbs={[{ label: "Curriculum", to: "/admin/curriculum" }, ...(p0 ? [{ label: p0.course_title, to: `/admin/curriculum/${p0.course_id}` }] : []), { label: meta.title }]} title="Lesson studio"
        actions={<>
          <Button variant="secondary" onClick={() => setRevisions(true)}><History aria-hidden className="size-4" /> Revisions ({L.lesson.revision})</Button>
          <Button variant="secondary" onClick={validate.run} loading={validate.pending}><ShieldCheck aria-hidden className="size-4" /> Check</Button>
          {can("content.publish") && (L.lesson.status === "published"
            ? <Button variant="secondary" onClick={() => setStatus.run("draft")}>Unpublish</Button>
            : <Button variant="success" onClick={() => setStatus.run("published")} disabled={dirty} title={dirty ? "Save first" : undefined}>Publish</Button>)}
        </>}>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted">
          <StatusPill s={L.lesson.status} /> <span>/{L.lesson.slug}</span> <span>Last saved {fmtDateTime(L.lesson.updated_at)}</span>
          {L.placements.map((p) => <Badge key={p.course_slug + p.unit_slug} tone="primary">{p.course_title} › {p.unit_title}{(p.unit_status !== "published" || p.chapter_status !== "published") && " (unit or chapter unpublished)"}</Badge>)}
        </div>
      </PageHeader>
      {msg && <Alert tone="success" className="mb-4">{msg}</Alert>}
      <FormError error={save.error ?? setStatus.error} />
      {problems && (
        <Alert tone={problems.some((p) => p.level === "error") ? "danger" : problems.length ? "warning" : "success"} title={problems.length ? "Checks" : "No problems found"} className="mb-4">
          <ul className="list-disc pl-4">{problems.map((p, i) => <li key={i}>{p.level === "error" ? "Error: " : ""}{p.message}</li>)}</ul>
        </Alert>
      )}
      <Tabs className="mb-5" label="Studio section" value={tab} onChange={setTab} items={[{ value: "content", label: "Content" }, { value: "practice", label: `Practice (${L.questions.length})` }, { value: "preview", label: "Preview" }]} />

      {tab === "content" && (
        <div className="space-y-5">
          <Section title="Lesson details">
            <div className="grid gap-4 sm:grid-cols-[1fr_10rem]">
              <Field label="Title">{(p) => <Input {...p} value={meta.title} onChange={(e) => { setMeta({ ...meta, title: e.target.value }); setDirty(true); }} />}</Field>
              <Field label="Minutes">{(p) => <Input {...p} type="number" min={1} max={240} value={meta.estimatedMinutes ?? ""} onChange={(e) => { setMeta({ ...meta, estimatedMinutes: e.target.value ? Number(e.target.value) : null }); setDirty(true); }} />}</Field>
              <Field label="Summary" className="sm:col-span-2">{(p) => <Textarea {...p} className="min-h-16" value={meta.summary} onChange={(e) => { setMeta({ ...meta, summary: e.target.value }); setDirty(true); }} />}</Field>
              <Field label="Learning objectives" hint="One per line." className="sm:col-span-2">{(p) => <Textarea {...p} value={meta.objectives} onChange={(e) => { setMeta({ ...meta, objectives: e.target.value }); setDirty(true); }} />}</Field>
            </div>
          </Section>
          <p className="text-sm text-muted">Use <code className="rounded bg-sunken px-1">$…$</code> for inline math in text, for example <code className="rounded bg-sunken px-1">$x^2 + 1$</code>. Formula and example steps take LaTeX directly.</p>
          {blocks.map((b, i) => (
            <BlockEditor key={i} index={i} block={b} count={blocks.length}
              onChange={(nb) => update((bs) => bs.map((x, k) => (k === i ? nb : x)))}
              onMove={(dir) => update((bs) => { const n = [...bs]; const j = i + dir; if (j < 0 || j >= n.length) return n; [n[i], n[j]] = [n[j], n[i]]; return n; })}
              onDuplicate={() => update((bs) => [...bs.slice(0, i + 1), structuredClone(b), ...bs.slice(i + 1)])}
              onDelete={() => confirm("Delete this block?") && update((bs) => bs.filter((_, k) => k !== i))} />
          ))}
          <div className="card flex flex-wrap items-center gap-2 border-dashed p-4">
            <span className="text-sm font-semibold">Add block:</span>
            {BLOCK_KINDS.map((k) => <Button key={k.kind} size="sm" variant="secondary" onClick={() => update((bs) => [...bs, { kind: k.kind, mode: k.kind === "activity" ? "experiment" : "learn", data: structuredClone(k.empty) }])}><Plus aria-hidden className="size-3.5" /> {k.label}</Button>)}
          </div>
          <div className="sticky bottom-4 z-10 card flex flex-wrap items-center gap-3 p-3 shadow-[var(--shadow-lift)]">
            <Input aria-label="Revision note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Revision note (optional): what changed?" className="min-w-60 flex-1" maxLength={300} />
            {dirty && <span className="text-sm font-semibold text-warning">Unsaved changes</span>}
            <Button onClick={save.run} loading={save.pending} disabled={!dirty}><Save aria-hidden className="size-4" /> Save draft revision</Button>
          </div>
        </div>
      )}
      {tab === "practice" && <QuestionsEditor lessonId={id} questions={L.questions} onChanged={d.reload} />}
      {tab === "preview" && (
        <div className="overflow-hidden rounded-xl border border-line bg-canvas">
          <Alert tone="info" className="m-3">Preview of your current edits, saved or not. Practice shows saved questions.</Alert>
          <LessonView lesson={preview} preview />
        </div>
      )}
      {revisions && <RevisionsDialog lessonId={id} onClose={() => setRevisions(false)} onLoad={(snap) => { setMeta({ title: snap.title, summary: snap.summary, estimatedMinutes: snap.estimatedMinutes, objectives: snap.objectives.join("\n") }); setBlocks(snap.blocks); setDirty(true); setRevisions(false); setMsg("Revision loaded into the editor. Save to make it the current version."); setTab("content"); }} />}
    </RequirePermission>
  );
}

function BlockEditor({ block, index, count, onChange, onMove, onDuplicate, onDelete }: { block: Block; index: number; count: number; onChange: (b: Block) => void; onMove: (d: -1 | 1) => void; onDuplicate: () => void; onDelete: () => void }) {
  const set = (k: string, v: unknown) => onChange({ ...block, data: { ...block.data, [k]: v } });
  const s = (k: string) => (block.data[k] as string) ?? "";
  const label = BLOCK_KINDS.find((k) => k.kind === block.kind)?.label ?? block.kind;
  const ta = (k: string, lbl: string, hint?: string, rows = "min-h-24") => <Field label={lbl} hint={hint}>{(p) => <Textarea {...p} className={rows} value={s(k)} onChange={(e) => set(k, e.target.value)} />}</Field>;
  const inp = (k: string, lbl: string, hint?: string) => <Field label={lbl} hint={hint}>{(p) => <Input {...p} value={s(k)} onChange={(e) => set(k, e.target.value)} />}</Field>;
  const def = ACTIVITY_DEFS.find((a) => a.id === block.data.activity);
  return (
    <section className="card overflow-hidden" aria-label={`Block ${index + 1}: ${label}`}>
      <div className="flex flex-wrap items-center gap-2 border-b border-line bg-sunken px-4 py-2">
        <span className="text-xs font-bold text-muted">{index + 1}</span>
        <span className="font-semibold">{label}</span>
        <Select aria-label="Mode" value={block.mode} onChange={(e) => onChange({ ...block, mode: e.target.value as LessonMode })} className="h-8 w-36">
          <option value="learn">Learn</option><option value="watch">Walkthrough (shown in Experiment)</option><option value="experiment">Experiment</option><option value="practice">Practice</option>
        </Select>
        <div className="ml-auto flex gap-0.5">
          <IconBtn label="Move up" onClick={() => onMove(-1)}><ArrowUp className={cx("size-4", index === 0 && "opacity-30")} /></IconBtn>
          <IconBtn label="Move down" onClick={() => onMove(1)}><ArrowDown className={cx("size-4", index === count - 1 && "opacity-30")} /></IconBtn>
          <IconBtn label="Duplicate" onClick={onDuplicate}><Copy className="size-4" /></IconBtn>
          <IconBtn label="Delete" onClick={onDelete}><Trash2 className="size-4" /></IconBtn>
        </div>
      </div>
      <div className="grid gap-4 p-4">
        {block.kind === "text" && ta("body", "Text", "Separate paragraphs with a blank line.", "min-h-32")}
        {block.kind === "definition" && <>{inp("term", "Term")}{ta("body", "Definition")}</>}
        {block.kind === "formula" && <>{inp("title", "Title")}{inp("latex", "LaTeX")}<div className="rounded-lg bg-sunken p-3 text-lg"><Tex display latex={s("latex") || "\\text{Preview}"} /></div>{ta("note", "Note", undefined, "min-h-16")}</>}
        {block.kind === "callout" && <>
          <Field label="Style">{(p) => <Select {...p} value={s("tone")} onChange={(e) => set("tone", e.target.value)} className="w-48"><option value="tip">Tip</option><option value="warning">Watch out</option><option value="application">Real world</option><option value="note">Note</option></Select>}</Field>
          {inp("title", "Title")}{ta("body", "Text")}
        </>}
        {block.kind === "figure" && <>{inp("src", "Image URL", "https:// or a site-relative path")}{inp("alt", "Alternative text", "Describe what the image shows for screen-reader users.")}{inp("caption", "Caption")}</>}
        {block.kind === "references" && (
          <Field label="References" hint="One per line: Citation | https://link (link optional)">{(p) => (
            <Textarea {...p} value={((block.data.items as { citation: string; url?: string }[]) ?? []).map((r) => (r.url ? `${r.citation} | ${r.url}` : r.citation)).join("\n")}
              onChange={(e) => set("items", e.target.value.split("\n").filter((l) => l.trim()).map((l) => { const [c2, u] = l.split("|").map((x) => x.trim()); return u ? { citation: c2, url: u } : { citation: c2 }; }))} />
          )}</Field>
        )}
        {block.kind === "worked_example" && <>
          {inp("title", "Problem", "Inline math with $…$")}
          {((block.data.steps as { latex: string; explanation: string }[]) ?? []).map((st, k, arr) => (
            <div key={k} className="grid gap-2 rounded-lg border border-line p-3 sm:grid-cols-[1fr_1fr_auto]">
              <Input aria-label={`Step ${k + 1} LaTeX`} value={st.latex} placeholder="LaTeX" onChange={(e) => set("steps", arr.map((x, j) => (j === k ? { ...x, latex: e.target.value } : x)))} />
              <Input aria-label={`Step ${k + 1} explanation`} value={st.explanation} placeholder="Explanation" onChange={(e) => set("steps", arr.map((x, j) => (j === k ? { ...x, explanation: e.target.value } : x)))} />
              <IconBtn label="Remove step" onClick={() => set("steps", arr.filter((_, j) => j !== k))}><Trash2 className="size-4" /></IconBtn>
              {st.latex && <div className="text-sm sm:col-span-3"><Tex latex={st.latex} /></div>}
            </div>
          ))}
          <Button size="sm" variant="secondary" className="justify-self-start" onClick={() => set("steps", [...((block.data.steps as unknown[]) ?? []), { latex: "", explanation: "" }])}><Plus aria-hidden className="size-3.5" /> Add step</Button>
          {ta("check", "Check (optional)", undefined, "min-h-16")}
        </>}
        {block.kind === "activity" && <>
          <Field label="Activity">{(p) => <Select {...p} value={s("activity")} onChange={(e) => onChange({ ...block, data: { activity: e.target.value, title: block.data.title } })}>{ACTIVITY_DEFS.map((a) => <option key={a.id} value={a.id}>{a.title} ({a.subject})</option>)}</Select>}</Field>
          {inp("title", "Heading (optional)")}
          {def?.params.map((pdef) => (
            <Field key={pdef.key} label={pdef.label}>{(p) => pdef.type === "select" ? (
              <Select {...p} value={String((block.data.params as Record<string, unknown>)?.[pdef.key] ?? pdef.default)} onChange={(e) => set("params", { ...(block.data.params as object), [pdef.key]: e.target.value })}>{pdef.options!.map((o) => <option key={o}>{o}</option>)}</Select>
            ) : pdef.type === "boolean" ? (
              <Checkbox label="On" checked={Boolean((block.data.params as Record<string, unknown>)?.[pdef.key] ?? pdef.default)} onChange={(e) => set("params", { ...(block.data.params as object), [pdef.key]: e.target.checked })} />
            ) : (
              <Input {...p} type="number" min={pdef.min} max={pdef.max} step={pdef.step} value={String((block.data.params as Record<string, unknown>)?.[pdef.key] ?? pdef.default)} onChange={(e) => set("params", { ...(block.data.params as object), [pdef.key]: Number(e.target.value) })} />
            )}</Field>
          ))}
          <Field label="Walkthrough steps (optional, JSON)" hint='For walkthroughs: [{"title": "…", "body": "…", "params": {…}}]. Leave empty for a free-play simulation.'>
            {(p) => <Textarea {...p} className="min-h-20 font-mono text-xs" defaultValue={block.data.steps ? JSON.stringify(block.data.steps, null, 1) : ""} onBlur={(e) => { const v = e.target.value.trim(); if (!v) { const { steps: _s, ...rest } = block.data; void _s; onChange({ ...block, data: rest }); return; } try { set("steps", JSON.parse(v)); } catch { alert("That isn't valid JSON; steps weren't changed."); } }} />}
          </Field>
          <details><summary className="cursor-pointer text-sm font-semibold">Try the activity</summary><div className="mt-3"><Sim id={s("activity")} params={block.data.params as Record<string, number>} /></div></details>
        </>}
      </div>
    </section>
  );
}

function RevisionsDialog({ lessonId, onClose, onLoad }: { lessonId: string; onClose: () => void; onLoad: (snap: { title: string; summary: string; estimatedMinutes: number | null; objectives: string[]; blocks: Block[] }) => void }) {
  const d = useApi<{ revision: number; note: string; created_at: string; author: string | null }[]>(`/admin/lessons/${lessonId}/revisions`);
  const load = useAction(async (rev: number) => onLoad(await api.get(`/admin/lessons/${lessonId}/revisions/${rev}`)));
  return (
    <Dialog open onClose={onClose} title="Version history" description="Each save creates a revision. Loading one puts it in the editor; nothing changes until you save." size="lg">
      {d.status === "loading" && <Loading rows={2} />}
      {d.data?.length === 0 && <p className="text-sm text-muted">No saved revisions yet. Content from the original import is revision 1.</p>}
      <FormError error={load.error} />
      <ul className="divide-y divide-line">{d.data?.map((r) => (
        <li key={r.revision} className="flex flex-wrap items-center gap-3 py-2.5 text-sm">
          <Badge tone="primary">r{r.revision}</Badge>
          <div className="min-w-0 flex-1"><p className="font-semibold">{r.note || "No note"}</p><p className="text-xs text-muted">{r.author ?? "Unknown"} · {fmtDateTime(r.created_at)}</p></div>
          <Button size="sm" variant="secondary" onClick={() => load.run(r.revision)}>Load</Button>
        </li>
      ))}</ul>
    </Dialog>
  );
}

function QuestionsEditor({ lessonId, questions, onChanged }: { lessonId: string; questions: Question[]; onChanged: () => void }) {
  const [editing, setEditing] = useState<Question | null>(null);
  const blank: Question = { purpose: "practice", kind: "multiple_choice", difficulty: 1, prompt: "", data: { choices: ["", ""], answer: 0 }, hints: [], solution: "", status: "published" };
  return (
    <div className="space-y-3">
      <div className="flex justify-between"><p className="text-sm text-muted">Answers are checked on the server; students never receive the answer key.</p><Button onClick={() => setEditing(blank)}><Plus aria-hidden className="size-4" /> Add question</Button></div>
      {questions.length === 0 && <EmptyState title="No questions yet" />}
      {questions.map((q, i) => (
        <div key={q.id} className="card flex flex-wrap items-start gap-3 p-4">
          <span className="font-display text-sm font-bold text-muted">Q{i + 1}</span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap gap-1.5"><Badge>{q.kind.replace("_", " ")}</Badge><Badge tone="primary">{q.purpose}</Badge><Badge>Difficulty {q.difficulty}</Badge><StatusPill s={q.status} /></div>
            <p className="mt-2 text-sm">{q.prompt}</p>
          </div>
          <Button size="sm" variant="secondary" onClick={() => setEditing(q)}>Edit</Button>
          <Button size="sm" variant="ghost" onClick={async () => { if (confirm("Archive this question? It stays in students' history.")) { await api.del(`/admin/questions/${q.id}`); onChanged(); } }}>Archive</Button>
        </div>
      ))}
      {editing && <QuestionDialog lessonId={lessonId} q={editing} onClose={() => { setEditing(null); onChanged(); }} />}
    </div>
  );
}

function QuestionDialog({ lessonId, q, onClose }: { lessonId: string; q: Question; onClose: () => void }) {
  const [f, setF] = useState<Question>(structuredClone(q));
  const d = f.data as Record<string, unknown>;
  const setData = (k: string, v: unknown) => setF({ ...f, data: { ...f.data, [k]: v } });
  const save = useAction(async (e: FormEvent) => {
    e.preventDefault();
    const body = { purpose: f.purpose, kind: f.kind, difficulty: f.difficulty, prompt: f.prompt, data: f.data, hints: f.hints.filter(Boolean), solution: f.solution, status: f.status === "draft" ? "draft" : "published" };
    if (f.id) await api.put(`/admin/questions/${f.id}`, body); else await api.post(`/admin/lessons/${lessonId}/questions`, body);
    onClose();
  });
  const changeKind = (kind: Question["kind"]) => setF({ ...f, kind, data: kind === "multiple_choice" ? { choices: ["", ""], answer: 0 } : kind === "numeric" ? { answer: 0, tolerance: 0 } : { accept: [""] } });
  const choices = useMemo(() => (d.choices as string[]) ?? [], [d.choices]);
  return (
    <Dialog open onClose={onClose} title={f.id ? "Edit question" : "New question"} size="lg">
      <form onSubmit={save.run} className="grid gap-4 sm:grid-cols-3">
        <Field label="Type">{(p) => <Select {...p} value={f.kind} onChange={(e) => changeKind(e.target.value as Question["kind"])}><option value="multiple_choice">Multiple choice</option><option value="numeric">Numeric</option><option value="short_text">Short answer</option></Select>}</Field>
        <Field label="Section">{(p) => <Select {...p} value={f.purpose} onChange={(e) => setF({ ...f, purpose: e.target.value as "practice" })}><option value="practice">Practice</option><option value="review">Review / challenge</option></Select>}</Field>
        <Field label="Difficulty">{(p) => <Select {...p} value={f.difficulty} onChange={(e) => setF({ ...f, difficulty: Number(e.target.value) })}><option value={1}>1 · Foundational</option><option value={2}>2 · Core</option><option value={3}>3 · Challenge</option></Select>}</Field>
        <Field label="Prompt" hint="Inline math with $…$" className="sm:col-span-3">{(p) => <Textarea {...p} value={f.prompt} onChange={(e) => setF({ ...f, prompt: e.target.value })} />}</Field>
        {f.kind === "multiple_choice" && (
          <fieldset className="space-y-2 sm:col-span-3">
            <legend className="mb-1 text-sm font-semibold">Choices (select the correct one)</legend>
            {choices.map((c, i) => (
              <div key={i} className="flex items-center gap-2">
                <input type="radio" name="correct" aria-label={`Choice ${i + 1} is correct`} checked={d.answer === i} onChange={() => setData("answer", i)} className="size-4 accent-[var(--success)]" />
                <Input aria-label={`Choice ${i + 1}`} value={c} onChange={(e) => setData("choices", choices.map((x, j) => (j === i ? e.target.value : x)))} />
                <IconBtn label="Remove choice" onClick={() => { setData("choices", choices.filter((_, j) => j !== i)); if ((d.answer as number) >= choices.length - 1) setData("answer", 0); }}><Trash2 className="size-4" /></IconBtn>
              </div>
            ))}
            <Button size="sm" variant="secondary" onClick={() => setData("choices", [...choices, ""])}>Add choice</Button>
          </fieldset>
        )}
        {f.kind === "numeric" && <>
          <Field label="Answer">{(p) => <Input {...p} type="number" step="any" value={String(d.answer ?? "")} onChange={(e) => setData("answer", Number(e.target.value))} />}</Field>
          <Field label="Tolerance" hint={d.relative ? "Fraction, e.g. 0.01 = 1%" : "Absolute, e.g. 0.01"}>{(p) => <Input {...p} type="number" step="any" min={0} value={String(d.tolerance ?? 0)} onChange={(e) => setData("tolerance", Number(e.target.value))} />}</Field>
          <Field label="Unit (shown)">{(p) => <Input {...p} value={(d.unit as string) ?? ""} onChange={(e) => setData("unit", e.target.value || undefined)} />}</Field>
          <Checkbox className="sm:col-span-3" label="Relative tolerance" checked={!!d.relative} onChange={(e) => setData("relative", e.target.checked)} />
        </>}
        {f.kind === "short_text" && (
          <Field label="Accepted answers" hint="One per line. Case and spaces are ignored." className="sm:col-span-3">{(p) => <Textarea {...p} value={((d.accept as string[]) ?? []).join("\n")} onChange={(e) => setData("accept", e.target.value.split("\n"))} />}</Field>
        )}
        <Field label="Hints" hint="One per line, shown in order." className="sm:col-span-3">{(p) => <Textarea {...p} value={f.hints.join("\n")} onChange={(e) => setF({ ...f, hints: e.target.value.split("\n") })} />}</Field>
        <Field label="Worked solution" className="sm:col-span-3">{(p) => <Textarea {...p} value={f.solution} onChange={(e) => setF({ ...f, solution: e.target.value })} />}</Field>
        <Checkbox className="sm:col-span-3" label="Save as draft (hidden from students)" checked={f.status === "draft"} onChange={(e) => setF({ ...f, status: e.target.checked ? "draft" : "published" })} />
        <div className="sm:col-span-3">{save.error && <Alert tone="danger">{Object.values(save.error.fields)[0] ?? save.error.message}</Alert>}</div>
        <Button type="submit" loading={save.pending} className="justify-self-start">Save question</Button>
      </form>
    </Dialog>
  );
}

// ===========================================================================
// Formulas and the activity registry
// ===========================================================================

interface FormulaRow { id: string; subject_id: string; slug: string; name: string; latex: string; description: string; variables: { symbol: string; meaning: string; unit?: string }[]; status: string; subject_name: string }

export function AdminFormulasPage() {
  useTitle("Formulas");
  const { can } = useAuth();
  const d = useApi<FormulaRow[]>("/admin/formulas");
  const [editing, setEditing] = useState<Partial<FormulaRow> | null>(null);
  return (
    <RequirePermission perm="content.edit">
      <PageHeader className="!pt-0" title="Formulas" actions={<Button onClick={() => setEditing({ subject_id: "subj_math", variables: [] })}><Plus aria-hidden className="size-4" /> New formula</Button>} />
      {d.status === "loading" && <Loading />}
      {d.data && (
        <Table>
          <thead><tr><th>Formula</th><th>Subject</th><th>Status</th><th><span className="sr-only">Actions</span></th></tr></thead>
          <tbody>{d.data.map((f) => (
            <tr key={f.id}>
              <td><p className="font-semibold">{f.name}</p><div className="text-sm"><Tex latex={f.latex} /></div></td>
              <td>{f.subject_name}</td>
              <td><StatusPill s={f.status} /></td>
              <td className="whitespace-nowrap">
                <Button size="sm" variant="secondary" onClick={() => setEditing(f)}>Edit</Button>{" "}
                {can("content.publish") && <Button size="sm" variant="ghost" onClick={async () => { await api.patch(`/admin/formulas/${f.id}/status`, { status: f.status === "published" ? "draft" : "published" }); d.reload(); }}>{f.status === "published" ? "Unpublish" : "Publish"}</Button>}
              </td>
            </tr>
          ))}</tbody>
        </Table>
      )}
      {editing && <FormulaDialog f={editing} onClose={() => { setEditing(null); d.reload(); }} />}
    </RequirePermission>
  );
}

function FormulaDialog({ f, onClose }: { f: Partial<FormulaRow>; onClose: () => void }) {
  const [x, setX] = useState({ subjectId: f.subject_id ?? "subj_math", slug: f.slug ?? "", name: f.name ?? "", latex: f.latex ?? "", description: f.description ?? "", variables: (f.variables ?? []).map((v) => `${v.symbol} | ${v.meaning}${v.unit ? ` | ${v.unit}` : ""}`).join("\n") });
  const save = useAction(async (e: FormEvent) => {
    e.preventDefault();
    const variables = x.variables.split("\n").filter((l) => l.trim()).map((l) => { const [symbol, meaning, unit] = l.split("|").map((s) => s.trim()); return unit ? { symbol, meaning, unit } : { symbol, meaning }; });
    const body = { ...x, variables };
    if (f.id) await api.put(`/admin/formulas/${f.id}`, body); else await api.post("/admin/formulas", body);
    onClose();
  });
  return (
    <Dialog open onClose={onClose} title={f.id ? "Edit formula" : "New formula"} description={f.id ? undefined : "New formulas start as drafts."} size="lg">
      <form onSubmit={save.run} className="grid gap-4 sm:grid-cols-2">
        <Field label="Name">{(p) => <Input {...p} value={x.name} onChange={(e) => setX({ ...x, name: e.target.value, slug: f.id ? x.slug : slugify(e.target.value) })} />}</Field>
        <Field label="Address" error={save.error?.fields.slug}>{(p) => <Input {...p} value={x.slug} onChange={(e) => setX({ ...x, slug: e.target.value })} />}</Field>
        <Field label="Subject">{(p) => <Select {...p} value={x.subjectId} onChange={(e) => setX({ ...x, subjectId: e.target.value })}><option value="subj_math">Mathematics</option><option value="subj_phys">Physics</option><option value="subj_chem">Chemistry</option></Select>}</Field>
        <Field label="LaTeX">{(p) => <Input {...p} value={x.latex} onChange={(e) => setX({ ...x, latex: e.target.value })} />}</Field>
        <div className="rounded-lg bg-sunken p-3 text-lg sm:col-span-2"><Tex display latex={x.latex || "\\text{Preview}"} /></div>
        <Field label="Description and conditions" className="sm:col-span-2">{(p) => <Textarea {...p} value={x.description} onChange={(e) => setX({ ...x, description: e.target.value })} />}</Field>
        <Field label="Variables" hint="One per line: symbol (LaTeX) | meaning | unit" className="sm:col-span-2">{(p) => <Textarea {...p} value={x.variables} onChange={(e) => setX({ ...x, variables: e.target.value })} />}</Field>
        <div className="sm:col-span-2"><FormError error={save.error} /></div>
        <Button type="submit" loading={save.pending} className="justify-self-start">Save</Button>
      </form>
    </Dialog>
  );
}

export function AdminActivitiesPage() {
  useTitle("Activities");
  const [params, setParams] = useSearchParams();
  const sel = params.get("id") ?? ACTIVITY_DEFS[0].id;
  const def = ACTIVITY_DEFS.find((a) => a.id === sel)!;
  return (
    <RequirePermission perm="content.edit">
      <PageHeader className="!pt-0" title="Interactive activities" lead="The simulations lessons can use. Place them with an 'Interactive activity' block in the lesson studio and set their parameters there. New simulation types are added in code." />
      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <ul className="space-y-1.5">{ACTIVITY_DEFS.map((a) => (
          <li key={a.id}><button type="button" onClick={() => setParams({ id: a.id })} aria-current={a.id === sel} className={cx("w-full rounded-lg border p-3 text-left text-sm", a.id === sel ? "border-primary bg-primary-soft" : "border-line bg-surface hover:bg-sunken")}>
            <span className="font-semibold">{a.title}</span><span className="block font-mono text-xs text-muted">{a.id}</span>
          </button></li>
        ))}</ul>
        <div className="space-y-4">
          <Section title={def.title} description={def.summary}>
            {def.params.length ? (
              <Table><thead><tr><th>Parameter</th><th>Type</th><th>Default</th><th>Range</th></tr></thead>
                <tbody>{def.params.map((p) => <tr key={p.key}><td>{p.label} <span className="font-mono text-xs text-muted">{p.key}</span></td><td>{p.type}</td><td>{String(p.default)}</td><td className="text-xs">{p.options?.join(", ") ?? (p.min !== undefined ? `${p.min} to ${p.max}` : "")}</td></tr>)}</tbody></Table>
            ) : <p className="text-sm text-muted">No configurable parameters.</p>}
          </Section>
          <Sim key={def.id} id={def.id} />
        </div>
      </div>
    </RequirePermission>
  );
}

