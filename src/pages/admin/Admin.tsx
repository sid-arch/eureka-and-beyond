import { AlertTriangle, BookOpen, CheckCircle2, ClipboardList, FileWarning, KeyRound, LifeBuoy, MessageSquare, Mail, Target, UserPlus, Users } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router";
import { assignableRoles, canManageRole, ROLE_LABELS, ROLES, type Role } from "../../../shared/permissions";
import { RequirePermission } from "../../components/layout/Shells";
import { Alert, Badge, Button, Checkbox, Dialog, EmptyState, ErrorState, Field, FormError, Input, Loading, PageHeader, Section, Select, Stat, Table, Textarea } from "../../components/ui";
import { api, useAction, useApi } from "../../lib/api";
import { useAuth } from "../../lib/auth";
import { fmtDate, fmtDateTime } from "../../lib/subjects";
import { useTitle } from "../usePageTitle";

type Overview = Record<string, number> & { mailMode: string };

export function AdminOverviewPage() {
  useTitle("Admin overview");
  const { can } = useAuth();
  const d = useApi<Overview>("/admin/overview");
  if (d.status === "loading") return <Loading rows={4} />;
  if (d.status === "error") return <ErrorState error={d.error} onRetry={d.retry} />;
  const o = d.data;
  return (
    <div className="space-y-6">
      <PageHeader className="!pt-0" title="Overview" lead="Live counts from the database." />
      {o.mailMode === "disabled" && <Alert tone="warning" title="Email delivery isn't configured">New sign-ups are closed and password-reset emails can't be sent until an email provider is set up. See the deployment guide.</Alert>}
      {o.mailMode === "log" && <Alert tone="info" title="Email is in log mode">Messages are stored in the database instead of being sent. Use this only for development or staging.</Alert>}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat icon={<Users />} label="Registered users" value={o.users} hint={`${o.verified_users} verified · ${o.new_users_7d} new this week`} />
        <Stat icon={<Target />} tone="success" label="Active learners (7 days)" value={o.active_learners_7d} hint={`${o.attempts_7d} practice attempts`} />
        <Stat icon={<BookOpen />} tone="math" label="Published lessons" value={o.lessons_published} hint={`${o.lessons_draft} drafts · ${o.lessons_unwritten} planned, unwritten`} />
        <Stat icon={<ClipboardList />} tone="physics" label="Courses" value={o.courses_published + o.courses_in_development + o.courses_planned} hint={`${o.courses_in_development} in development · ${o.courses_planned} planned`} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {can("community.moderate") && <Link to="/admin/moderation"><Stat icon={<MessageSquare />} tone={o.pending_posts ? "warning" : "primary"} label="Posts awaiting review" value={o.pending_posts} /></Link>}
        {can("community.moderate") && <Link to="/admin/moderation?tab=reports"><Stat icon={<FileWarning />} tone={o.open_reports ? "danger" : "primary"} label="Open reports" value={o.open_reports} /></Link>}
        {can("feedback.manage") && <Link to="/admin/feedback"><Stat icon={<LifeBuoy />} tone="chemistry" label="Open feedback tickets" value={o.open_tickets} /></Link>}
        {can("support.password") && <Link to="/admin/feedback?category=password_assistance"><Stat icon={<KeyRound />} tone={o.open_password_requests ? "warning" : "primary"} label="Password help requests" value={o.open_password_requests} /></Link>}
      </div>
    </div>
  );
}

interface UserRow { id: string; email: string; display_name: string; role: Role; status: string; verified: number; created_at: string; last_login_at: string | null }

export function AdminUsersPage() {
  useTitle("Users");
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const qs = new URLSearchParams(params);
  const d = useApi<{ users: UserRow[]; total: number; page: number; pageSize: number }>(`/admin/users?${qs}`);
  const [open, setOpen] = useState<string | null>(null);
  const set = (k: string, v: string) => { const n = new URLSearchParams(params); if (v) n.set(k, v); else n.delete(k); if (k !== "page") n.delete("page"); setParams(n, { replace: true }); };
  return (
    <RequirePermission perm="users.view">
      <PageHeader className="!pt-0" title="Users" lead="Account information is limited to what you need to help. Passwords are never visible." />
      <form onSubmit={(e) => { e.preventDefault(); set("q", q); }} className="card mb-4 flex flex-wrap gap-2 p-3">
        <Input aria-label="Search by name or email" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name or email" className="min-w-52 flex-1" />
        <Select aria-label="Role" value={params.get("role") ?? ""} onChange={(e) => set("role", e.target.value)} className="w-44"><option value="">All roles</option>{ROLES.map((r) => <option key={r} value={r}>{ROLE_LABELS[r]}</option>)}</Select>
        <Select aria-label="Status" value={params.get("status") ?? ""} onChange={(e) => set("status", e.target.value)} className="w-36"><option value="">Any status</option><option value="active">Active</option><option value="suspended">Suspended</option></Select>
        <Button type="submit">Search</Button>
      </form>
      {d.status === "loading" && <Loading />}
      {d.status === "error" && <ErrorState error={d.error} onRetry={d.retry} />}
      {d.data && (d.data.users.length === 0 ? <EmptyState icon={<UserPlus />} title="No users match" /> : (
        <>
          <Table>
            <thead><tr><th>User</th><th>Role</th><th>Status</th><th>Joined</th><th>Last sign-in</th><th><span className="sr-only">Actions</span></th></tr></thead>
            <tbody>{d.data.users.map((u) => (
              <tr key={u.id}>
                <td><p className="font-semibold">{u.display_name}</p><p className="text-xs text-muted">{u.email}{!u.verified && " · unverified"}</p></td>
                <td><Badge tone={u.role === "student" ? "neutral" : "primary"}>{ROLE_LABELS[u.role]}</Badge></td>
                <td>{u.status === "active" ? <Badge tone="success">Active</Badge> : <Badge tone="danger">Suspended</Badge>}</td>
                <td className="text-xs text-muted">{fmtDate(u.created_at)}</td>
                <td className="text-xs text-muted">{u.last_login_at ? fmtDate(u.last_login_at) : "Never"}</td>
                <td><Button variant="secondary" size="sm" onClick={() => setOpen(u.id)}>Manage</Button></td>
              </tr>
            ))}</tbody>
          </Table>
          <div className="mt-3 flex items-center justify-between text-sm text-muted">
            <span>{d.data.total} users</span>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" disabled={d.data.page <= 1} onClick={() => set("page", String(d.data!.page - 1))}>Previous</Button>
              <Button variant="secondary" size="sm" disabled={d.data.page * d.data.pageSize >= d.data.total} onClick={() => set("page", String(d.data!.page + 1))}>Next</Button>
            </div>
          </div>
        </>
      ))}
      {open && <UserDialog id={open} onClose={() => { setOpen(null); d.reload(); }} />}
    </RequirePermission>
  );
}

function UserDialog({ id, onClose }: { id: string; onClose: () => void }) {
  const { user: me, can } = useAuth();
  const d = useApi<UserRow & { email_verified_at: string | null; enrollments: number; completed_lessons: number; attempts: number; posts: number; tickets: number; active_sessions: number; history: { action: string; created_at: string; actor: string; metadata: string }[] }>(`/admin/users/${id}`);
  const [reason, setReason] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const act = useAction(async (fn: () => Promise<unknown>, done: string) => { await fn(); setMsg(done); d.reload(); });
  const u = d.data;
  const manageable = !!u && !!me && me.id !== u.id && canManageRole(me.role, u.role) && can("users.manage");
  return (
    <Dialog open onClose={onClose} title={u?.display_name ?? "User"} description={u?.email} size="lg">
      {!u ? <Loading rows={2} /> : (
        <div className="space-y-5">
          <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            {[["Role", ROLE_LABELS[u.role]], ["Status", u.status], ["Email", u.email_verified_at ? "Verified" : "Unverified"], ["Joined", fmtDate(u.created_at)], ["Courses", u.enrollments], ["Lessons completed", u.completed_lessons], ["Practice attempts", u.attempts], ["Active sessions", u.active_sessions]].map(([k, v]) => (
              <div key={k as string} className="rounded-lg bg-sunken p-2.5"><dt className="text-xs text-muted">{k}</dt><dd className="font-semibold capitalize">{v}</dd></div>
            ))}
          </dl>
          {msg && <Alert tone="success">{msg}</Alert>}
          <FormError error={act.error} />
          {manageable ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Role">{(p) => (
                <Select {...p} value={u.role} onChange={(e) => act.run(() => api.patch(`/admin/users/${u.id}/role`, { role: e.target.value }), "Role updated.")}>
                  {[u.role, ...assignableRoles(me!.role).filter((r) => r !== u.role)].map((r) => <option key={r} value={r}>{ROLE_LABELS[r]}</option>)}
                </Select>
              )}</Field>
              <div className="space-y-2">
                {u.status === "active" ? (
                  <>
                    <Field label="Suspension reason">{(p) => <Input {...p} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Recorded in the audit log" />}</Field>
                    <Button variant="danger" disabled={reason.trim().length < 3} loading={act.pending} onClick={() => act.run(() => api.post(`/admin/users/${u.id}/suspend`, { reason }), "Account suspended and signed out.")}>Suspend account</Button>
                  </>
                ) : <Button variant="success" loading={act.pending} onClick={() => act.run(() => api.post(`/admin/users/${u.id}/reactivate`), "Account reactivated.")}>Reactivate account</Button>}
              </div>
            </div>
          ) : <p className="text-sm text-muted">{me?.id === u.id ? "You can't change your own role or status." : "Your role can view this account but not change it."}</p>}
          {can("support.password") && u.role !== "owner" && (
            <div className="rounded-lg border border-line p-4 text-sm">
              <p className="font-semibold">Password reset</p>
              <p className="mt-1 text-muted">Sends the standard single-use reset link to the account's own email address. You won't see the link.</p>
              <Button variant="secondary" size="sm" className="mt-3" loading={act.pending} onClick={() => act.run(() => api.post(`/admin/users/${u.id}/send-reset`), "Reset email sent to the address on file.")}><Mail aria-hidden className="size-4" /> Send reset email</Button>
            </div>
          )}
          <div>
            <h3 className="text-sm font-bold">Account history</h3>
            {u.history.length === 0 ? <p className="mt-1 text-sm text-muted">No administrative actions recorded.</p> : (
              <ul className="mt-2 space-y-1 text-sm">{u.history.map((h, i) => <li key={i} className="flex justify-between gap-3"><span><span className="font-mono text-xs">{h.action}</span> by {h.actor ?? "system"}</span><span className="text-xs text-muted">{fmtDateTime(h.created_at)}</span></li>)}</ul>
            )}
          </div>
        </div>
      )}
    </Dialog>
  );
}

export function AdminAnalyticsPage() {
  useTitle("Analytics");
  const d = useApi<{ engagement: { title: string; slug: string; enrollments: number; active_30d: number }[]; completion: { title: string; started: number; completed: number }[]; practice: { title: string; attempts: number; accuracy: number; learners: number }[]; difficulties: { label: string; category: string; n: number }[]; feedbackTrends: { week: string; category: string; n: number }[] }>("/admin/analytics");
  return (
    <RequirePermission perm="analytics.view">
      <PageHeader className="!pt-0" title="Analytics" lead="Aggregates only. No individual student's data appears here." />
      {d.status === "loading" && <Loading />}
      {d.status === "error" && <ErrorState error={d.error} onRetry={d.retry} />}
      {d.data && (
        <div className="grid grid-cols-[minmax(0,1fr)] gap-6 xl:grid-cols-2">
          <Section title="Course engagement">
            <Table><thead><tr><th>Course</th><th>Enrolled</th><th>Active (30 days)</th></tr></thead>
              <tbody>{d.data.engagement.map((r) => <tr key={r.slug}><td>{r.title}</td><td>{r.enrollments}</td><td>{r.active_30d}</td></tr>)}</tbody></Table>
          </Section>
          <Section title="Lesson completion">
            {d.data.completion.length === 0 ? <p className="text-sm text-muted">No lesson activity yet.</p> : (
              <Table><thead><tr><th>Lesson</th><th>In progress</th><th>Completed</th></tr></thead>
                <tbody>{d.data.completion.map((r) => <tr key={r.title}><td>{r.title}</td><td>{r.started}</td><td>{r.completed}</td></tr>)}</tbody></Table>
            )}
          </Section>
          <Section title="Practice performance" description="Lowest accuracy first: candidates for better explanations or hints.">
            {d.data.practice.length === 0 ? <p className="text-sm text-muted">No practice attempts yet.</p> : (
              <Table><thead><tr><th>Lesson</th><th>Attempts</th><th>Accuracy</th><th>Learners</th></tr></thead>
                <tbody>{d.data.practice.map((r) => <tr key={r.title}><td>{r.title}</td><td>{r.attempts}</td><td>{r.accuracy}%</td><td>{r.learners}</td></tr>)}</tbody></Table>
            )}
          </Section>
          <Section title="Commonly reported difficulties" description="Questions, bugs and concerns grouped by where they were reported.">
            {d.data.difficulties.length === 0 ? <p className="text-sm text-muted">No reports yet.</p> : (
              <ul className="divide-y divide-line text-sm">{d.data.difficulties.map((r, i) => <li key={i} className="flex justify-between gap-3 py-2"><span>{r.label} <Badge>{r.category}</Badge></span><span className="font-semibold">{r.n}</span></li>)}</ul>
            )}
          </Section>
          <Section title="Feedback over the last 8 weeks" className="xl:col-span-2">
            {d.data.feedbackTrends.length === 0 ? <p className="text-sm text-muted">No feedback yet.</p> : (
              <Table><thead><tr><th>Week</th><th>Category</th><th>Tickets</th></tr></thead>
                <tbody>{d.data.feedbackTrends.map((r, i) => <tr key={i}><td>{r.week}</td><td>{r.category}</td><td>{r.n}</td></tr>)}</tbody></Table>
            )}
          </Section>
        </div>
      )}
    </RequirePermission>
  );
}

export function AdminSettingsPage() {
  useTitle("Platform settings");
  const d = useApi<{ settings: { announcement?: { enabled: boolean; message: string; tone: string }; registration?: { open: boolean } }; mailMode: string; siteUrl: string }>("/admin/settings");
  const [ann, setAnn] = useState<{ enabled: boolean; message: string; tone: string } | null>(null);
  const [saved, setSaved] = useState(false);
  const a = ann ?? d.data?.settings.announcement ?? { enabled: false, message: "", tone: "info" };
  const save = useAction(async (e: FormEvent) => { e.preventDefault(); await api.put("/admin/settings", { announcement: a }); setSaved(true); d.reload(); });
  const reg = d.data?.settings.registration?.open !== false;
  return (
    <RequirePermission perm="settings.manage">
      <PageHeader className="!pt-0" title="Platform settings" />
      {d.status === "loading" && <Loading />}
      {d.data && (
        <div className="space-y-6">
          <Section title="Announcement banner" description="Shown at the top of every page.">
            <form onSubmit={save.run} className="space-y-3">
              <Checkbox label="Show the banner" checked={a.enabled} onChange={(e) => setAnn({ ...a, enabled: e.target.checked })} />
              <Field label="Message">{(p) => <Textarea {...p} className="min-h-16" maxLength={300} value={a.message} onChange={(e) => setAnn({ ...a, message: e.target.value })} />}</Field>
              <Field label="Style">{(p) => <Select {...p} value={a.tone} onChange={(e) => setAnn({ ...a, tone: e.target.value })} className="w-48"><option value="info">Information</option><option value="success">Good news</option><option value="warning">Warning</option></Select>}</Field>
              <FormError error={save.error} />
              {saved && <Alert tone="success">Saved.</Alert>}
              <Button type="submit" loading={save.pending}>Save banner</Button>
            </form>
          </Section>
          <Section title="Account sign-up">
            <div className="flex flex-wrap items-center gap-3">
              {reg ? <Badge tone="success" dot="bg-success">Open</Badge> : <Badge tone="warning">Paused</Badge>}
              <Button variant="secondary" onClick={async () => { await api.put("/admin/settings", { registration: { open: !reg } }); d.reload(); }}>{reg ? "Pause new sign-ups" : "Reopen sign-ups"}</Button>
            </div>
            <p className="mt-3 text-sm text-muted">Email delivery: <span className="font-semibold">{d.data.mailMode}</span>. When email is disabled, sign-up is closed regardless of this setting.</p>
          </Section>
          <Section title="Site address"><p className="text-sm">{d.data.siteUrl}</p><p className="mt-1 text-xs text-muted">Used in email links. Change PUBLIC_SITE_URL in the deployment configuration.</p></Section>
        </div>
      )}
    </RequirePermission>
  );
}

export function AdminAuditPage() {
  useTitle("Audit log");
  const [params, setParams] = useSearchParams();
  const page = Number(params.get("page") ?? 1);
  const action = params.get("action") ?? "";
  const d = useApi<{ entries: { id: string; action: string; entity_type: string | null; entity_id: string | null; metadata: string; created_at: string; actor: string | null; actor_email: string | null }[] }>(`/admin/audit?page=${page}&action=${encodeURIComponent(action)}`);
  return (
    <RequirePermission perm="audit.view">
      <PageHeader className="!pt-0" title="Audit log" lead="Append-only record of sensitive actions. Entries can't be edited or deleted." />
      <div className="mb-4 flex flex-wrap gap-2">
        {["", "user.", "lesson.", "course.", "post.", "ticket.", "settings.", "account."].map((a) => (
          <Button key={a || "all"} size="sm" variant={action === a ? "primary" : "secondary"} onClick={() => setParams(a ? { action: a } : {})}>{a ? a.slice(0, -1) : "All"}</Button>
        ))}
      </div>
      {d.status === "loading" && <Loading />}
      {d.data && (d.data.entries.length === 0 ? <EmptyState icon={<CheckCircle2 />} title="No entries" /> : (
        <Table>
          <thead><tr><th>When</th><th>Action</th><th>By</th><th>Target</th><th>Details</th></tr></thead>
          <tbody>{d.data.entries.map((e) => (
            <tr key={e.id}>
              <td className="whitespace-nowrap text-xs text-muted">{fmtDateTime(e.created_at)}</td>
              <td className="font-mono text-xs">{e.action}</td>
              <td className="text-sm">{e.actor ?? <span className="text-muted">system</span>}</td>
              <td className="font-mono text-xs text-muted">{e.entity_type}{e.entity_id ? `:${e.entity_id.slice(0, 18)}` : ""}</td>
              <td className="max-w-xs truncate font-mono text-xs text-muted" title={e.metadata}>{e.metadata !== "{}" ? e.metadata : ""}</td>
            </tr>
          ))}</tbody>
        </Table>
      ))}
      <div className="mt-3 flex gap-2">
        <Button variant="secondary" size="sm" disabled={page <= 1} onClick={() => setParams({ ...(action ? { action } : {}), page: String(page - 1) })}>Newer</Button>
        <Button variant="secondary" size="sm" disabled={(d.data?.entries.length ?? 0) < 50} onClick={() => setParams({ ...(action ? { action } : {}), page: String(page + 1) })}>Older</Button>
      </div>
      <Alert tone="info" className="mt-6"><AlertTriangle aria-hidden className="mr-1 inline size-4" /> Audit entries record IDs, not passwords or tokens.</Alert>
    </RequirePermission>
  );
}
