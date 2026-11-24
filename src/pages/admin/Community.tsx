import { Check, Inbox, KeyRound, MessageSquare, ShieldAlert, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import { RequirePermission } from "../../components/layout/Shells";
import { Alert, Badge, Button, EmptyState, ErrorState, Field, FormError, Input, Loading, PageHeader, Section, Select, Tabs, Textarea, cx } from "../../components/ui";
import { api, useAction, useApi } from "../../lib/api";
import { useAuth } from "../../lib/auth";
import { fmtDateTime } from "../../lib/subjects";
import { CATEGORY, TicketStatus } from "../account/Account";
import { useTitle } from "../usePageTitle";

interface TicketRow { id: string; category: string; subject: string; status: string; context_type: string; context_label: string; created_at: string; updated_at: string; requester: string | null; assignee: string | null }

export function AdminFeedbackPage() {
  useTitle("Feedback inbox");
  const { can } = useAuth();
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const qs = new URLSearchParams(params);
  if (!qs.has("status")) qs.set("status", "active");
  const d = useApi<TicketRow[]>(`/admin/tickets?${qs}`);
  const set = (k: string, v: string) => { const n = new URLSearchParams(params); if (v) n.set(k, v); else n.delete(k); setParams(n, { replace: true }); };
  return (
    <RequirePermission perm="feedback.manage">
      <PageHeader className="!pt-0" title="Feedback inbox" lead="Private feedback, questions, bug reports and support requests." />
      <form onSubmit={(e) => { e.preventDefault(); set("q", q); }} className="card mb-4 flex flex-wrap gap-2 p-3">
        <Input aria-label="Search messages" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search subjects and messages" className="min-w-52 flex-1" />
        <Input aria-label="Filter by course or lesson" defaultValue={params.get("context") ?? ""} onBlur={(e) => set("context", e.target.value)} placeholder="Course or lesson" className="w-48" />
        <Select aria-label="Type" value={params.get("category") ?? ""} onChange={(e) => set("category", e.target.value)} className="w-44">
          <option value="">All types</option>
          {Object.entries(CATEGORY).filter(([k]) => k !== "password_assistance" || can("support.password")).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </Select>
        <Select aria-label="Status" value={params.get("status") ?? "active"} onChange={(e) => set("status", e.target.value)} className="w-44">
          <option value="active">Needs attention</option><option value="open">Open</option><option value="in_progress">In progress</option><option value="waiting_on_user">Waiting on user</option><option value="resolved">Resolved</option><option value="closed">Closed</option>
        </Select>
        <Button type="submit">Search</Button>
      </form>
      {d.status === "loading" && <Loading />}
      {d.status === "error" && <ErrorState error={d.error} onRetry={d.retry} />}
      {d.data && (d.data.length === 0 ? <EmptyState icon={<Inbox />} title="Inbox zero">Nothing matches these filters.</EmptyState> : (
        <ul className="card divide-y divide-line">{d.data.map((t) => (
          <li key={t.id}>
            <Link to={`/admin/feedback/${t.id}`} className="flex flex-wrap items-center gap-3 px-4 py-3 hover:bg-sunken">
              {t.category === "password_assistance" ? <KeyRound aria-label="Password help" className="size-4 text-warning" /> : <MessageSquare aria-hidden className="size-4 text-muted" />}
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{t.subject}</p>
                <p className="text-xs text-muted">{CATEGORY[t.category]} · {t.requester ?? "Deleted user"}{t.context_label && ` · ${t.context_label}`}</p>
              </div>
              {t.assignee && <Badge>{t.assignee}</Badge>}
              <TicketStatus s={t.status} />
              <span className="text-xs text-muted">{fmtDateTime(t.updated_at)}</span>
            </Link>
          </li>
        ))}</ul>
      ))}
    </RequirePermission>
  );
}

export function AdminTicketPage() {
  const { id = "" } = useParams();
  const { can } = useAuth();
  const d = useApi<{ ticket: Record<string, string | null>; messages: { id: string; body: string; is_staff: number; created_at: string; author: string | null }[]; matchedAccount: { id: string; status: string; verified: boolean } | null; staff: { id: string; display_name: string }[] }>(`/admin/tickets/${id}`);
  useTitle(d.data ? `Ticket: ${d.data.ticket.subject}` : "Ticket");
  const [text, setText] = useState("");
  const [nextStatus, setNextStatus] = useState("waiting_on_user");
  const [msg, setMsg] = useState<string | null>(null);
  const reply = useAction(async (e: FormEvent) => { e.preventDefault(); await api.post(`/admin/tickets/${id}/messages`, { body: text, status: nextStatus }); setText(""); setMsg("Reply sent. The requester has been notified."); d.reload(); });
  const update = useAction(async (body: Record<string, unknown>) => { await api.patch(`/admin/tickets/${id}`, body); d.reload(); });
  const reset = useAction(async () => { await api.post(`/admin/tickets/${id}/send-reset`); setMsg("A reset link was emailed to the address on the account. You can't see the link, by design."); d.reload(); });
  if (d.status === "loading") return <Loading />;
  if (d.status === "error") return <ErrorState error={d.error} onRetry={d.retry} />;
  const t = d.data.ticket;
  const pw = t.category === "password_assistance";
  return (
    <RequirePermission perm="feedback.manage">
      <PageHeader className="!pt-0" crumbs={[{ label: "Feedback inbox", to: "/admin/feedback" }, { label: t.subject ?? "" }]} title={t.subject}>
        <div className="mt-3 flex flex-wrap gap-2"><TicketStatus s={t.status!} /><Badge>{CATEGORY[t.category!]}</Badge>{t.context_label && <Badge tone="primary">{t.context_label}</Badge>}</div>
      </PageHeader>
      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-4">
          {msg && <Alert tone="success">{msg}</Alert>}
          <ol className="space-y-3">{d.data.messages.map((m) => (
            <li key={m.id} className={cx("card p-4", m.is_staff && "border-primary/40 bg-primary-soft")}>
              <p className="text-sm font-semibold">{m.author ?? (pw ? t.contact_email : "Requester")}{m.is_staff ? " (staff)" : ""}<span className="ml-2 text-xs font-normal text-muted">{fmtDateTime(m.created_at)}</span></p>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed">{m.body}</p>
            </li>
          ))}</ol>
          <form onSubmit={reply.run} className="card space-y-3 p-4">
            <Field label="Reply" hint={pw ? "Sent by email to the requester. Don't include account details or links." : "The requester is notified in the app."}>{(p) => <Textarea {...p} className="min-h-28" value={text} onChange={(e) => setText(e.target.value)} maxLength={5000} />}</Field>
            <div className="flex flex-wrap items-center gap-2">
              <Select aria-label="Status after reply" value={nextStatus} onChange={(e) => setNextStatus(e.target.value)} className="w-56"><option value="waiting_on_user">Then: waiting on user</option><option value="in_progress">Then: in progress</option><option value="resolved">Then: resolved</option><option value="closed">Then: closed</option></Select>
              <Button type="submit" loading={reply.pending} disabled={!text.trim()}>Send reply</Button>
            </div>
            <FormError error={reply.error} />
          </form>
        </div>
        <aside className="space-y-4">
          <Section title="Details">
            <dl className="space-y-2 text-sm">
              <div><dt className="text-xs text-muted">From</dt><dd>{t.requester_name ?? t.contact_email ?? "Deleted user"}</dd></div>
              <div><dt className="text-xs text-muted">Opened</dt><dd>{fmtDateTime(t.created_at)}</dd></div>
              <div><dt className="text-xs text-muted">Context</dt><dd>{t.context_type}{t.context_label ? `: ${t.context_label}` : ""}</dd></div>
            </dl>
            <Field label="Status" className="mt-4">{(p) => <Select {...p} value={t.status!} onChange={(e) => update.run({ status: e.target.value })}><option value="open">Open</option><option value="in_progress">In progress</option><option value="waiting_on_user">Waiting on user</option><option value="resolved">Resolved</option><option value="closed">Closed</option></Select>}</Field>
            <Field label="Assigned to" className="mt-3">{(p) => <Select {...p} value={t.assigned_to ?? ""} onChange={(e) => update.run({ assignedTo: e.target.value || null })}><option value="">Unassigned</option>{d.data!.staff.map((s) => <option key={s.id} value={s.id}>{s.display_name}</option>)}</Select>}</Field>
            <FormError error={update.error} />
          </Section>
          {pw && can("support.password") && (
            <Section title="Password recovery">
              {d.data.matchedAccount ? (
                <>
                  <p className="text-sm">An {d.data.matchedAccount.status} account uses this address{d.data.matchedAccount.verified ? "" : " (email not verified)"}.</p>
                  <Alert tone="warning" className="mt-3">Before sending, consider whether the request is plausible. The link only goes to the account's own address; you never see it, and you can't change the password yourself.</Alert>
                  <Button className="mt-3 w-full" onClick={reset.run} loading={reset.pending}><KeyRound aria-hidden className="size-4" /> Email a reset link</Button>
                  <FormError error={reset.error} />
                </>
              ) : <p className="text-sm text-muted">No account uses this email address. Reply to let them know which address to try.</p>}
            </Section>
          )}
        </aside>
      </div>
    </RequirePermission>
  );
}

interface PostRow { id: string; kind: string; body: string; status: string; context_label: string; created_at: string; parent_id: string | null; author: string; lesson_title: string; lesson_id: string; open_reports: number }

export function AdminModerationPage() {
  useTitle("Moderation");
  const [params, setParams] = useSearchParams();
  const tab = (params.get("tab") ?? "queue") as "queue" | "reports" | "published" | "history";
  return (
    <RequirePermission perm="community.moderate">
      <PageHeader className="!pt-0" title="Discussion moderation" lead="Every student post waits here until a moderator approves it." />
      <Tabs className="mb-5" label="Moderation view" value={tab} onChange={(v) => setParams({ tab: v })} items={[{ value: "queue", label: "Awaiting review" }, { value: "reports", label: "Reports" }, { value: "published", label: "Published" }, { value: "history", label: "History" }]} />
      {tab === "queue" && <PostList status="pending" />}
      {tab === "published" && <PostList status="approved" />}
      {tab === "reports" && <Reports />}
      {tab === "history" && <History />}
    </RequirePermission>
  );
}

function PostList({ status }: { status: string }) {
  const d = useApi<PostRow[]>(`/admin/moderation/posts?status=${status}`);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [text, setText] = useState("");
  const act = useAction(async (id: string, action: string) => { const note = action !== "approve" ? prompt("Note to the author (optional)") ?? undefined : undefined; await api.post(`/admin/moderation/posts/${id}`, { action, note: note || undefined }); d.reload(); });
  const reply = useAction(async (e: FormEvent) => { e.preventDefault(); await api.post(`/admin/moderation/posts/${replyTo}/reply`, { body: text }); setReplyTo(null); setText(""); d.reload(); });
  if (d.status === "loading") return <Loading />;
  if (d.status === "error") return <ErrorState error={d.error} onRetry={d.retry} />;
  if (d.data.length === 0) return <EmptyState icon={<Check />} title={status === "pending" ? "Nothing waiting for review" : "No posts"} />;
  return (
    <div className="space-y-3">
      <FormError error={act.error ?? reply.error} />
      {d.data.map((p) => (
        <article key={p.id} className="card p-4">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="font-semibold">{p.author}</span><Badge>{p.kind}</Badge>{p.parent_id && <Badge>Reply</Badge>}
            <span className="text-muted">on {p.lesson_title}</span>
            {p.open_reports > 0 && <Badge tone="danger">{p.open_reports} open reports</Badge>}
            <span className="ml-auto text-xs text-muted">{fmtDateTime(p.created_at)}</span>
          </div>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed">{p.body}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {status === "pending" && <><Button size="sm" variant="success" onClick={() => act.run(p.id, "approve")}><Check aria-hidden className="size-4" /> Approve</Button><Button size="sm" variant="secondary" onClick={() => act.run(p.id, "reject")}><X aria-hidden className="size-4" /> Reject</Button></>}
            {status === "approved" && <><Button size="sm" variant="secondary" onClick={() => setReplyTo(p.id)}>Reply as staff</Button><Button size="sm" variant="danger" onClick={() => act.run(p.id, "remove")}>Remove</Button></>}
          </div>
          {replyTo === p.id && (
            <form onSubmit={reply.run} className="mt-3 space-y-2">
              <Textarea aria-label="Staff reply" value={text} onChange={(e) => setText(e.target.value)} maxLength={3000} />
              <div className="flex gap-2"><Button type="submit" size="sm" loading={reply.pending} disabled={text.trim().length < 2}>Post reply</Button><Button size="sm" variant="ghost" onClick={() => setReplyTo(null)}>Cancel</Button></div>
            </form>
          )}
        </article>
      ))}
    </div>
  );
}

function Reports() {
  const d = useApi<{ id: string; reason: string; status: string; created_at: string; post_id: string; post_body: string; post_status: string; reporter: string; author: string; lesson_title: string }[]>("/admin/moderation/reports");
  const act = useAction(async (fn: () => Promise<unknown>) => { await fn(); d.reload(); });
  if (d.status === "loading") return <Loading />;
  if (d.data?.length === 0) return <EmptyState icon={<ShieldAlert />} title="No open reports" />;
  return (
    <div className="space-y-3">
      {d.data?.map((r) => (
        <article key={r.id} className="card p-4">
          <p className="text-sm"><span className="font-semibold">{r.reporter}</span> reported a post by <span className="font-semibold">{r.author}</span> on {r.lesson_title}</p>
          <p className="mt-1 text-sm text-danger">Reason: {r.reason}</p>
          <blockquote className="mt-2 border-l-2 border-line pl-3 text-sm text-muted">{r.post_body}</blockquote>
          <div className="mt-3 flex gap-2">
            <Button size="sm" variant="danger" onClick={() => act.run(() => api.post(`/admin/moderation/posts/${r.post_id}`, { action: "remove", note: "Removed after a report" }))}>Remove post</Button>
            <Button size="sm" variant="secondary" onClick={() => act.run(() => api.post(`/admin/moderation/reports/${r.id}`, { action: "dismiss" }))}>Dismiss report</Button>
          </div>
        </article>
      ))}
    </div>
  );
}

function History() {
  const d = useApi<{ action: string; entity_id: string; metadata: string; created_at: string; actor: string | null }[]>("/admin/moderation/history");
  if (d.status === "loading") return <Loading />;
  if (d.data?.length === 0) return <EmptyState title="No moderation actions yet" />;
  return (
    <ul className="card divide-y divide-line">{d.data?.map((h, i) => (
      <li key={i} className="flex flex-wrap items-center gap-3 px-4 py-2.5 text-sm">
        <span className="font-mono text-xs">{h.action}</span><span>by {h.actor ?? "system"}</span>
        {h.metadata !== "{}" && <span className="truncate text-xs text-muted">{h.metadata}</span>}
        <span className="ml-auto text-xs text-muted">{fmtDateTime(h.created_at)}</span>
      </li>
    ))}</ul>
  );
}
