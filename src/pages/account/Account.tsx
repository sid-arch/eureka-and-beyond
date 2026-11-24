import { Bell, BookMarked, BookOpen, CheckCircle2, Download, Flame, LifeBuoy, MessageSquare, PlayCircle, Target, Trash2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router";
import { LevelBadge, Alert, Badge, Button, ButtonLink, Dialog, EmptyState, ErrorState, Field, FormError, Input, Loading, PageHeader, ProgressBar, Section, Select, Stat, SubjectMark, Table, Textarea, cx } from "../../components/ui";
import { Math as Tex, RichText } from "../../components/ui/Math";
import { api, useAction, useApi } from "../../lib/api";
import { useAuth } from "../../lib/auth";
import { fmtDate, fmtDateTime } from "../../lib/subjects";
import { useTitle } from "../usePageTitle";
import type { CourseLevel } from "../../../shared/types";

interface Dashboard {
  enrollments: { id: string; slug: string; title: string; level: CourseLevel; subject: { slug: string; name: string }; totalLessons: number; completedLessons: number }[];
  recent: { status: string; updatedAt: string; title: string; courseTitle: string; href: string }[];
  practice: { attempts: number; correct: number; questions: number };
  masteredLessons: number;
  unreadNotifications: number;
  bookmarkCount: number;
}

export function DashboardPage() {
  useTitle("Dashboard");
  const { user } = useAuth();
  const [params] = useSearchParams();
  const d = useApi<Dashboard>("/me/dashboard");
  if (d.status === "loading") return <Loading rows={4} />;
  if (d.status === "error") return <ErrorState error={d.error} onRetry={d.retry} />;
  const x = d.data;
  const cont = x.recent.find((r) => r.status !== "completed") ?? x.recent[0];
  return (
    <div className="space-y-6">
      <PageHeader className="!pt-0" title={`Hi, ${user?.displayName}`} lead={params.get("welcome") ? "Your account is ready. Confirm your email, then pick a course to start." : "Here's where you left off."} />
      {cont && (
        <Link to={cont.href} className="card flex items-center gap-4 border-primary/40 bg-primary-soft p-5 hover:shadow-[var(--shadow-lift)]">
          <PlayCircle aria-hidden className="size-10 shrink-0 text-primary" />
          <div className="min-w-0">
            <p className="text-sm text-muted">Continue learning · {cont.courseTitle}</p>
            <p className="truncate font-display text-xl font-semibold">{cont.title}</p>
          </div>
        </Link>
      )}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat icon={<BookOpen />} label="Courses" value={x.enrollments.length} />
        <Stat icon={<CheckCircle2 />} tone="success" label="Lessons completed" value={x.enrollments.reduce((a, e) => a + e.completedLessons, 0)} />
        <Stat icon={<Target />} tone="chemistry" label="Practice accuracy" value={x.practice.attempts ? `${Math.round((x.practice.correct / x.practice.attempts) * 100)}%` : "–"} hint={`${x.practice.attempts} attempts on ${x.practice.questions} questions`} />
        <Stat icon={<Flame />} tone="math" label="Lessons mastered" value={x.masteredLessons} hint="Every practice question answered correctly" />
      </div>
      <Section title="My courses" actions={<ButtonLink to="/courses" variant="secondary" size="sm">Find a course</ButtonLink>}>
        {x.enrollments.length === 0 ? (
          <EmptyState icon={<BookOpen />} title="You haven't enrolled in a course yet" action={<ButtonLink to="/courses">Browse courses</ButtonLink>}>Enroll from any course page, or just start a lesson; we'll add the course for you.</EmptyState>
        ) : (
          <ul className="grid gap-3 md:grid-cols-2">
            {x.enrollments.map((e) => (
              <li key={e.id}>
                <Link to={`/courses/${e.slug}`} className="flex items-center gap-4 rounded-lg border border-line p-4 hover:bg-sunken">
                  <SubjectMark slug={e.subject.slug} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2"><p className="truncate font-semibold">{e.title}</p><LevelBadge level={e.level} /></div>
                    <ProgressBar className="mt-2" value={e.completedLessons} max={e.totalLessons || 1} tone="success" label={`${e.completedLessons} of ${e.totalLessons} lessons completed`} />
                    <p className="mt-1 text-xs text-muted">{e.completedLessons} of {e.totalLessons} lessons completed</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Section>
      <div className="grid gap-6 lg:grid-cols-2">
        <Section title="Recent activity">
          {x.recent.length === 0 ? <p className="text-sm text-muted">Lessons you open will appear here.</p> : (
            <ul className="divide-y divide-line">
              {x.recent.map((r) => (
                <li key={r.href} className="flex items-center gap-3 py-2.5 text-sm">
                  {r.status === "completed" ? <CheckCircle2 aria-label="Completed" className="size-4 text-success" /> : <PlayCircle aria-label="In progress" className="size-4 text-primary" />}
                  <Link to={r.href} className="flex-1 truncate font-semibold hover:underline">{r.title}</Link>
                  <span className="text-xs text-muted">{fmtDate(r.updatedAt)}</span>
                </li>
              ))}
            </ul>
          )}
        </Section>
        <Section title="Shortcuts">
          <div className="grid grid-cols-2 gap-2">
            <ButtonLink to="/bookmarks" variant="secondary"><BookMarked aria-hidden className="size-4" /> Saved ({x.bookmarkCount})</ButtonLink>
            <ButtonLink to="/practice-history" variant="secondary"><Target aria-hidden className="size-4" /> Practice</ButtonLink>
            <ButtonLink to="/notifications" variant="secondary"><Bell aria-hidden className="size-4" /> Notifications{x.unreadNotifications ? ` (${x.unreadNotifications})` : ""}</ButtonLink>
            <ButtonLink to="/support" variant="secondary"><LifeBuoy aria-hidden className="size-4" /> Support</ButtonLink>
          </div>
        </Section>
      </div>
    </div>
  );
}

export function MyCoursesPage() {
  useTitle("My courses");
  const d = useApi<Dashboard>("/me/dashboard");
  return (
    <div>
      <PageHeader className="!pt-0" title="My courses" />
      {d.status === "loading" && <Loading />}
      {d.status === "error" && <ErrorState error={d.error} onRetry={d.retry} />}
      {d.data && (d.data.enrollments.length === 0 ? (
        <EmptyState icon={<BookOpen />} title="No courses yet" action={<ButtonLink to="/courses">Browse courses</ButtonLink>} />
      ) : (
        <ul className="space-y-3">
          {d.data.enrollments.map((e) => (
            <li key={e.id} className="card flex flex-wrap items-center gap-4 p-4">
              <SubjectMark slug={e.subject.slug} />
              <div className="min-w-0 flex-1">
                <Link to={`/courses/${e.slug}`} className="font-semibold hover:underline">{e.title}</Link>
                <ProgressBar className="mt-2 max-w-sm" value={e.completedLessons} max={e.totalLessons || 1} tone="success" label="Progress" />
                <p className="mt-1 text-xs text-muted">{e.completedLessons} of {e.totalLessons} lessons completed</p>
              </div>
              <Button variant="ghost" size="sm" onClick={async () => { await api.del(`/me/enrollments/${e.slug}`); d.reload(); }}>Leave course</Button>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export function BookmarksPage() {
  useTitle("Saved");
  const d = useApi<{ lessons: { id: string; title: string; summary: string; href: string | null }[]; formulas: { id: string; title: string; latex: string; slug: string }[] }>("/me/bookmarks");
  const remove = async (kind: string, id: string) => { await api.del(`/me/bookmarks/${kind}/${id}`); d.reload(); };
  return (
    <div className="space-y-6">
      <PageHeader className="!pt-0" title="Saved lessons and formulas" />
      {d.status === "loading" && <Loading />}
      {d.status === "error" && <ErrorState error={d.error} onRetry={d.retry} />}
      {d.data && (
        <>
          <Section title="Lessons">
            {d.data.lessons.length === 0 ? <p className="text-sm text-muted">Use "Save lesson" on any lesson.</p> : (
              <ul className="divide-y divide-line">{d.data.lessons.map((l) => (
                <li key={l.id} className="flex items-center gap-3 py-3">
                  <div className="min-w-0 flex-1">{l.href ? <Link to={l.href} className="font-semibold hover:underline">{l.title}</Link> : <span className="font-semibold">{l.title}</span>}<p className="truncate text-sm text-muted">{l.summary}</p></div>
                  <Button variant="ghost" size="sm" onClick={() => remove("lesson", l.id)}>Remove</Button>
                </li>
              ))}</ul>
            )}
          </Section>
          <Section title="Formulas">
            {d.data.formulas.length === 0 ? <p className="text-sm text-muted">Save formulas from the <Link to="/formulas" className="link">formula library</Link>.</p> : (
              <ul className="grid gap-3 sm:grid-cols-2">{d.data.formulas.map((f) => (
                <li key={f.id} className="rounded-lg border border-line p-4">
                  <div className="flex items-start justify-between"><Link to={`/formulas#${f.slug}`} className="font-semibold hover:underline">{f.title}</Link><Button variant="ghost" size="sm" onClick={() => remove("formula", f.id)}>Remove</Button></div>
                  <div className="mt-2 overflow-x-auto"><Tex latex={f.latex} /></div>
                </li>
              ))}</ul>
            )}
          </Section>
        </>
      )}
    </div>
  );
}

export function PracticeHistoryPage() {
  useTitle("Practice history");
  const d = useApi<{ history: { id: string; correct: number; answer: string; created_at: string; prompt: string; lesson_title: string }[]; lessons: { id: string; title: string; total: number; correct: number; attempts: number; mastery: number }[] }>("/me/practice");
  return (
    <div className="space-y-6">
      <PageHeader className="!pt-0" title="Practice and mastery" lead="Mastery is the share of a lesson's questions you've answered correctly at least once." />
      {d.status === "loading" && <Loading />}
      {d.status === "error" && <ErrorState error={d.error} onRetry={d.retry} />}
      {d.data && (d.data.lessons.length === 0 ? <EmptyState icon={<Target />} title="No practice yet" action={<ButtonLink to="/courses">Find a lesson</ButtonLink>}>Answer questions in any lesson's Practice tab.</EmptyState> : (
        <>
          <Section title="Mastery by lesson">
            <ul className="space-y-3">{d.data.lessons.map((l) => (
              <li key={l.id}>
                <div className="flex justify-between text-sm"><span className="font-semibold">{l.title}</span><span className="text-muted">{l.correct} of {l.total} · {Math.round(l.mastery * 100)}%</span></div>
                <ProgressBar className="mt-1.5" value={l.correct} max={l.total} tone={l.mastery === 1 ? "success" : "primary"} label={`${l.title} mastery`} />
              </li>
            ))}</ul>
          </Section>
          <Section title="Recent attempts">
            <Table>
              <thead><tr><th>Result</th><th>Question</th><th>Your answer</th><th>When</th></tr></thead>
              <tbody>{d.data.history.map((h) => (
                <tr key={h.id}>
                  <td>{h.correct ? <Badge tone="success">Correct</Badge> : <Badge tone="danger">Incorrect</Badge>}</td>
                  <td className="max-w-md"><p className="line-clamp-2"><RichText text={h.prompt} /></p><p className="text-xs text-muted">{h.lesson_title}</p></td>
                  <td className="font-mono text-xs">{h.answer}</td>
                  <td className="whitespace-nowrap text-xs text-muted">{fmtDateTime(h.created_at)}</td>
                </tr>
              ))}</tbody>
            </Table>
          </Section>
        </>
      ))}
    </div>
  );
}

export function NotificationsPage() {
  useTitle("Notifications");
  const d = useApi<{ id: string; title: string; body: string; link: string | null; read_at: string | null; created_at: string }[]>("/me/notifications");
  const markAll = async () => { await api.post("/me/notifications/read", {}); d.reload(); };
  return (
    <div>
      <PageHeader className="!pt-0" title="Notifications" actions={d.data?.some((n) => !n.read_at) && <Button variant="secondary" size="sm" onClick={markAll}>Mark all as read</Button>} />
      {d.status === "loading" && <Loading />}
      {d.data && (d.data.length === 0 ? <EmptyState icon={<Bell />} title="Nothing new">Replies to your questions and requests show up here.</EmptyState> : (
        <ul className="space-y-2">{d.data.map((n) => (
          <li key={n.id} className={cx("card flex gap-3 p-4", !n.read_at && "border-primary/40")}>
            <span aria-hidden className={cx("mt-1.5 size-2 shrink-0 rounded-full", n.read_at ? "bg-transparent" : "bg-primary")} />
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{n.link ? <Link to={n.link} className="hover:underline" onClick={() => api.post("/me/notifications/read", { ids: [n.id] })}>{n.title}</Link> : n.title}{!n.read_at && <span className="sr-only"> (unread)</span>}</p>
              <p className="text-sm text-muted">{n.body}</p>
            </div>
            <span className="text-xs text-muted">{fmtDateTime(n.created_at)}</span>
          </li>
        ))}</ul>
      ))}
    </div>
  );
}

export function SettingsPage() {
  useTitle("Settings");
  const { user, refresh, logout } = useAuth();
  const navigate = useNavigate();
  const profile = useApi<{ displayName: string; emailNotifications: boolean; createdAt: string }>("/me/profile");
  const sessions = useApi<{ handle: string; userAgent: string; createdAt: string; lastSeenAt: string; current: boolean }[]>("/me/sessions");
  const [name, setName] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [pw, setPw] = useState({ currentPassword: "", newPassword: "" });
  const [pwDone, setPwDone] = useState(false);
  const [del, setDel] = useState(false);
  const [delPw, setDelPw] = useState("");
  const saveProfile = useAction(async (e: FormEvent) => {
    e.preventDefault();
    await api.patch("/me/profile", { displayName: name ?? profile.data?.displayName });
    await refresh();
    setSaved(true);
  });
  const changePw = useAction(async (e: FormEvent) => {
    e.preventDefault();
    await api.post("/me/password", pw);
    setPw({ currentPassword: "", newPassword: "" });
    setPwDone(true);
    sessions.reload();
  });
  const deleteAccount = useAction(async (e: FormEvent) => {
    e.preventDefault();
    await api.del("/me/account", { password: delPw });
    await logout().catch(() => {});
    navigate("/?deleted=1");
  });
  const exportData = async () => {
    const data = await api.get("/me/export");
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: "eureka-and-beyond-data.json" });
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div className="space-y-6">
      <PageHeader className="!pt-0" title="Account settings" lead={`Signed in as ${user?.email}`} />
      <Section title="Profile" description="Your display name appears on discussion posts. Profiles are private; nobody can browse them.">
        <form onSubmit={saveProfile.run} className="flex flex-wrap items-end gap-3">
          <Field label="Display name" className="min-w-60 flex-1" error={saveProfile.error?.fields.displayName}>{(p) => <Input {...p} maxLength={60} value={name ?? profile.data?.displayName ?? ""} onChange={(e) => { setName(e.target.value); setSaved(false); }} />}</Field>
          <Button type="submit" loading={saveProfile.pending}>Save</Button>
        </form>
        {saved && <p className="mt-2 text-sm text-success">Saved.</p>}
        <label className="mt-4 flex items-center gap-2 text-sm">
          <input type="checkbox" className="size-4 accent-[var(--primary)]" checked={profile.data?.emailNotifications ?? true} onChange={async (e) => { await api.patch("/me/profile", { emailNotifications: e.target.checked }); profile.reload(); }} />
          Email me when staff reply to my questions or requests
        </label>
      </Section>
      <Section title="Password" description="Changing your password signs out your other devices.">
        <form onSubmit={changePw.run} className="grid max-w-md gap-3">
          <Field label="Current password" error={changePw.error?.fields.currentPassword}>{(p) => <Input {...p} type="password" autoComplete="current-password" value={pw.currentPassword} onChange={(e) => setPw({ ...pw, currentPassword: e.target.value })} />}</Field>
          <Field label="New password" hint="At least 10 characters." error={changePw.error?.fields.newPassword}>{(p) => <Input {...p} type="password" autoComplete="new-password" value={pw.newPassword} onChange={(e) => setPw({ ...pw, newPassword: e.target.value })} />}</Field>
          {pwDone && <Alert tone="success">Password changed.</Alert>}
          <Button type="submit" loading={changePw.pending} className="justify-self-start">Change password</Button>
        </form>
      </Section>
      <Section title="Signed-in devices">
        <ul className="divide-y divide-line">
          {sessions.data?.map((s) => (
            <li key={s.handle} className="flex flex-wrap items-center gap-3 py-3 text-sm">
              <div className="min-w-0 flex-1"><p className="truncate font-semibold">{s.userAgent || "Unknown browser"}</p><p className="text-xs text-muted">Last active {fmtDateTime(s.lastSeenAt)}</p></div>
              {s.current ? <Badge tone="success">This device</Badge> : <Button variant="ghost" size="sm" onClick={async () => { await api.del(`/me/sessions/${s.handle}`); sessions.reload(); }}>Sign out</Button>}
            </li>
          ))}
        </ul>
      </Section>
      <Section title="Your data">
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={exportData}><Download aria-hidden className="size-4" /> Download my data</Button>
          <Button variant="danger" onClick={() => setDel(true)}><Trash2 aria-hidden className="size-4" /> Delete account</Button>
        </div>
      </Section>
      <Dialog open={del} onClose={() => setDel(false)} title="Delete your account?" description="This permanently removes your progress, practice history, bookmarks, posts and support requests. It can't be undone.">
        <form onSubmit={deleteAccount.run} className="space-y-4">
          <Field label="Enter your password to confirm" error={deleteAccount.error?.fields.password}>{(p) => <Input {...p} type="password" value={delPw} onChange={(e) => setDelPw(e.target.value)} />}</Field>
          {deleteAccount.error && !deleteAccount.error.fields.password && <FormError error={deleteAccount.error} />}
          <Button type="submit" variant="danger" loading={deleteAccount.pending}>Delete permanently</Button>
        </form>
      </Dialog>
    </div>
  );
}

// ---- Support ---------------------------------------------------------------------

const CATEGORY: Record<string, string> = { question: "Question", bug: "Bug", concern: "Concern", suggestion: "Suggestion", account: "Account help", password_assistance: "Password help", other: "Other" };
const STATUS: Record<string, { label: string; tone: "neutral" | "primary" | "warning" | "success" }> = {
  open: { label: "Open", tone: "primary" }, in_progress: { label: "In progress", tone: "primary" }, waiting_on_user: { label: "Waiting on you", tone: "warning" }, resolved: { label: "Resolved", tone: "success" }, closed: { label: "Closed", tone: "neutral" },
};
export const TicketStatus = ({ s }: { s: string }) => <Badge tone={STATUS[s]?.tone ?? "neutral"}>{STATUS[s]?.label ?? s}</Badge>;
export { CATEGORY };

export function SupportListPage() {
  useTitle("Feedback and support");
  const d = useApi<{ id: string; category: string; subject: string; status: string; context_label: string; updated_at: string; staff_replies: number }[]>("/me/tickets");
  const posts = useApi<{ id: string; kind: string; body: string; status: string; created_at: string; lesson_title: string }[]>("/me/discussions");
  return (
    <div className="space-y-6">
      <PageHeader className="!pt-0" title="Feedback and support" lead="Private requests to our team. Only you and staff can see them." actions={<ButtonLink to="/support/new">New request</ButtonLink>} />
      <Section title="Your requests">
        {d.status === "loading" && <Loading rows={2} />}
        {d.data && (d.data.length === 0 ? <EmptyState icon={<LifeBuoy />} title="No requests yet">Report a problem from any lesson, or start a new request.</EmptyState> : (
          <ul className="divide-y divide-line">{d.data.map((t) => (
            <li key={t.id}>
              <Link to={`/support/${t.id}`} className="flex flex-wrap items-center gap-3 py-3 hover:bg-sunken">
                <TicketStatus s={t.status} />
                <div className="min-w-0 flex-1"><p className="font-semibold">{t.subject}</p><p className="text-xs text-muted">{CATEGORY[t.category]}{t.context_label && ` · ${t.context_label}`}</p></div>
                {t.staff_replies > 0 && <Badge tone="primary">{t.staff_replies} {t.staff_replies === 1 ? "reply" : "replies"}</Badge>}
                <span className="text-xs text-muted">{fmtDate(t.updated_at)}</span>
              </Link>
            </li>
          ))}</ul>
        ))}
      </Section>
      <Section title="Your discussion posts" description="Public posts are reviewed by moderators before they appear.">
        {posts.data?.length ? (
          <ul className="divide-y divide-line">{posts.data.map((p) => (
            <li key={p.id} className="flex items-start gap-3 py-3 text-sm">
              <MessageSquare aria-hidden className="mt-0.5 size-4 text-muted" />
              <div className="min-w-0 flex-1"><p className="line-clamp-2">{p.body}</p><p className="text-xs text-muted">{p.lesson_title} · {fmtDate(p.created_at)}</p></div>
              <Badge tone={p.status === "approved" ? "success" : p.status === "pending" ? "warning" : "danger"}>{{ approved: "Published", pending: "Awaiting review", rejected: "Not published", removed: "Removed" }[p.status]}</Badge>
            </li>
          ))}</ul>
        ) : <p className="text-sm text-muted">You haven't posted yet.</p>}
      </Section>
    </div>
  );
}

export function SupportNewPage() {
  useTitle("New request");
  const navigate = useNavigate();
  const [f, setF] = useState({ category: "question", subject: "", body: "" });
  const send = useAction(async (e: FormEvent) => {
    e.preventDefault();
    const r = await api.post<{ id: string }>("/me/tickets", { ...f, contextType: "general", contextLabel: "" });
    navigate(`/support/${r.id}`);
  });
  return (
    <div className="max-w-2xl">
      <PageHeader className="!pt-0" crumbs={[{ label: "Support", to: "/support" }, { label: "New request" }]} title="New request" />
      <form onSubmit={send.run} className="card space-y-4 p-6">
        <Field label="Type">{(p) => (
          <Select {...p} value={f.category} onChange={(e) => setF({ ...f, category: e.target.value })}>
            {["question", "bug", "concern", "suggestion", "account", "other"].map((c) => <option key={c} value={c}>{CATEGORY[c]}</option>)}
          </Select>
        )}</Field>
        <Field label="Subject" error={send.error?.fields.subject}>{(p) => <Input {...p} maxLength={140} value={f.subject} onChange={(e) => setF({ ...f, subject: e.target.value })} />}</Field>
        <Field label="Details" error={send.error?.fields.body} hint="For problems with a specific lesson, it's quickest to use 'Report a problem' on that lesson.">{(p) => <Textarea {...p} className="min-h-40" maxLength={5000} value={f.body} onChange={(e) => setF({ ...f, body: e.target.value })} />}</Field>
        {send.error && !Object.keys(send.error.fields).length && <FormError error={send.error} />}
        <Alert tone="info">Never include your password. Our team will never ask for it.</Alert>
        <Button type="submit" loading={send.pending}>Send request</Button>
      </form>
    </div>
  );
}

export function SupportDetailPage() {
  const { id = "" } = useParams();
  const d = useApi<{ id: string; category: string; subject: string; status: string; context_label: string; created_at: string; messages: { id: string; body: string; is_staff: number; created_at: string; author: string }[] }>(`/me/tickets/${id}`);
  useTitle(d.data?.subject ?? "Request");
  const [text, setText] = useState("");
  const reply = useAction(async (e: FormEvent) => {
    e.preventDefault();
    await api.post(`/me/tickets/${id}/messages`, { body: text });
    setText("");
    d.reload();
  });
  if (d.status === "loading") return <Loading />;
  if (d.status === "error") return <ErrorState error={d.error} onRetry={d.retry} />;
  const t = d.data;
  return (
    <div className="max-w-3xl space-y-5">
      <PageHeader className="!pt-0" crumbs={[{ label: "Support", to: "/support" }, { label: t.subject }]} title={t.subject}>
        <div className="mt-3 flex flex-wrap gap-2"><TicketStatus s={t.status} /><Badge>{CATEGORY[t.category]}</Badge>{t.context_label && <Badge tone="primary">{t.context_label}</Badge>}</div>
      </PageHeader>
      <ol className="space-y-3">{t.messages.map((m) => (
        <li key={m.id} className={cx("card p-4", m.is_staff ? "border-primary/40 bg-primary-soft" : "")}>
          <p className="text-sm font-semibold">{m.author}<span className="ml-2 text-xs font-normal text-muted">{fmtDateTime(m.created_at)}</span></p>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed">{m.body}</p>
        </li>
      ))}</ol>
      {t.status !== "closed" ? (
        <form onSubmit={reply.run} className="card space-y-3 p-4">
          <Field label="Add a reply">{(p) => <Textarea {...p} value={text} onChange={(e) => setText(e.target.value)} maxLength={5000} />}</Field>
          <FormError error={reply.error} />
          <Button type="submit" loading={reply.pending} disabled={!text.trim()}>Send reply</Button>
        </form>
      ) : <Alert tone="info">This request is closed. Start a new one if you still need help.</Alert>}
    </div>
  );
}
