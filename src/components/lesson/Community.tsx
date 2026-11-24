// Lesson discussion (pre-moderated public posts) and the contextual private feedback dialog.

import { Flag, MessageCircle, ShieldCheck } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import { api, useAction, useApi } from "../../lib/api";
import { useAuth } from "../../lib/auth";
import { fmtDate } from "../../lib/subjects";
import { Alert, Badge, Button, Dialog, EmptyState, Field, FormError, Input, Select, Textarea, cx } from "../ui";

interface Post {
  id: string; parentId: string | null; kind: "question" | "comment"; body: string; pending: boolean; isStaff: boolean;
  contextLabel: string; createdAt: string; author: string; mine: boolean;
}

export function Discussion({ lessonId, lessonTitle }: { lessonId: string; lessonTitle: string }) {
  const { user } = useAuth();
  const data = useApi<{ posts: Post[] }>(`/lessons/${lessonId}/discussion`);
  const [kind, setKind] = useState<"question" | "comment">("question");
  const [text, setText] = useState("");
  const [sent, setSent] = useState<string | null>(null);
  const [reporting, setReporting] = useState<Post | null>(null);
  const post = useAction(async (e: FormEvent) => {
    e.preventDefault();
    const r = await api.post<{ status: string }>("/discussions", { lessonId, kind, body: text, contextLabel: lessonTitle });
    setText("");
    setSent(r.status === "pending" ? "Thanks. A moderator will review your post before it's public. You can see it below in the meantime." : "Posted.");
    data.reload();
  });
  const posts = data.data?.posts ?? [];
  const top = posts.filter((p) => !p.parentId);
  return (
    <section aria-labelledby="discussion-heading" className="space-y-4">
      <div className="flex items-center gap-2">
        <MessageCircle aria-hidden className="size-5 text-primary" />
        <h2 id="discussion-heading" className="text-xl">Questions and discussion</h2>
      </div>
      <p className="text-sm text-muted">Posts are reviewed by moderators before they appear. Be kind, stay on topic, and don't share personal information.</p>
      {user?.emailVerified ? (
        <form onSubmit={post.run} className="card space-y-3 p-4">
          <div className="flex flex-wrap gap-3">
            <Select aria-label="Post type" value={kind} onChange={(e) => setKind(e.target.value as "question" | "comment")} className="w-40">
              <option value="question">Question</option>
              <option value="comment">Comment</option>
            </Select>
          </div>
          <Textarea aria-label="Your post" value={text} onChange={(e) => setText(e.target.value)} maxLength={3000} placeholder={kind === "question" ? "What are you stuck on?" : "Share something helpful about this lesson"} />
          <FormError error={post.error} />
          {sent && <Alert tone="success">{sent}</Alert>}
          <Button type="submit" loading={post.pending} disabled={text.trim().length < 5}>Submit for review</Button>
        </form>
      ) : (
        <p className="card p-4 text-sm">
          {user ? "Verify your email to join the discussion." : <><Link className="link" to="/login">Sign in</Link> or <Link className="link" to="/register">create a free account</Link> to ask a question.</>}
        </p>
      )}
      {data.status === "success" && top.length === 0 && <EmptyState title="No questions yet" icon={<MessageCircle />}>Be the first to ask about this lesson.</EmptyState>}
      <ul className="space-y-3">
        {top.map((p) => (
          <li key={p.id} className={cx("card p-4", p.pending && "border-dashed")}>
            <PostView post={p} onReport={user?.emailVerified && !p.mine && !p.pending ? () => setReporting(p) : undefined} />
            {posts.filter((r) => r.parentId === p.id).map((r) => (
              <div key={r.id} className="ml-4 mt-3 border-l-2 border-line pl-4">
                <PostView post={r} onReport={user?.emailVerified && !r.mine && !r.isStaff ? () => setReporting(r) : undefined} />
              </div>
            ))}
          </li>
        ))}
      </ul>
      <ReportDialog post={reporting} onClose={() => setReporting(null)} />
    </section>
  );
}

function PostView({ post, onReport }: { post: Post; onReport?: () => void }) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="font-semibold">{post.author}</span>
        {post.isStaff && <Badge tone="primary"><ShieldCheck aria-hidden className="size-3" /> Team</Badge>}
        <Badge>{post.kind === "question" ? "Question" : "Comment"}</Badge>
        {post.pending && <Badge tone="warning">Awaiting review (only you can see this)</Badge>}
        <span className="text-xs text-muted">{fmtDate(post.createdAt)}</span>
        {onReport && (
          <button type="button" onClick={onReport} className="ml-auto inline-flex items-center gap-1 text-xs text-muted hover:text-danger">
            <Flag aria-hidden className="size-3.5" /> Report
          </button>
        )}
      </div>
      <p className="mt-2 whitespace-pre-wrap text-[0.95rem] leading-relaxed">{post.body}</p>
    </div>
  );
}

function ReportDialog({ post, onClose }: { post: Post | null; onClose: () => void }) {
  const [reason, setReason] = useState("");
  const [done, setDone] = useState(false);
  const report = useAction(async (e: FormEvent) => {
    e.preventDefault();
    await api.post(`/discussions/${post!.id}/report`, { reason });
    setDone(true);
  });
  const close = () => { setReason(""); setDone(false); onClose(); };
  return (
    <Dialog open={!!post} onClose={close} title="Report this post" description="Moderators will review it. Reports are anonymous to the author.">
      {done ? (
        <div className="space-y-4"><Alert tone="success">Thanks. A moderator will take a look.</Alert><Button onClick={close}>Done</Button></div>
      ) : (
        <form onSubmit={report.run} className="space-y-4">
          <Field label="What's wrong?">{(p) => <Textarea {...p} value={reason} onChange={(e) => setReason(e.target.value)} maxLength={500} placeholder="Spam, unkind, incorrect, off-topic…" />}</Field>
          <FormError error={report.error} />
          <Button type="submit" variant="danger" loading={report.pending} disabled={reason.trim().length < 3}>Send report</Button>
        </form>
      )}
    </Dialog>
  );
}

/** Private feedback tied to a specific lesson, activity, block or question. */
export function FeedbackDialog({ open, onClose, context }: { open: boolean; onClose: () => void; context: { type: "lesson" | "activity" | "block" | "practice" | "formula" | "course"; id?: string; label: string } }) {
  const { user } = useAuth();
  const [category, setCategory] = useState("bug");
  const [subject, setSubject] = useState("");
  const [bodyText, setBody] = useState("");
  const [doneId, setDoneId] = useState<string | null>(null);
  const send = useAction(async (e: FormEvent) => {
    e.preventDefault();
    const r = await api.post<{ id: string }>("/me/tickets", { category, subject, body: bodyText, contextType: context.type, contextId: context.id, contextLabel: context.label });
    setDoneId(r.id);
  });
  const close = () => { setDoneId(null); setSubject(""); setBody(""); send.setError(null); onClose(); };
  return (
    <Dialog open={open} onClose={close} title="Send feedback" description={<>About: <span className="font-semibold text-ink">{context.label}</span>. Only our team sees this.</>}>
      {!user?.emailVerified ? (
        <p className="text-sm">{user ? "Verify your email to send feedback." : <><Link className="link" to="/login">Sign in</Link> to send feedback and follow its status.</>}</p>
      ) : doneId ? (
        <div className="space-y-4">
          <Alert tone="success" title="Sent">You can follow replies in <Link className="link" to={`/support/${doneId}`}>your support requests</Link>.</Alert>
          <Button onClick={close}>Done</Button>
        </div>
      ) : (
        <form onSubmit={send.run} className="space-y-4">
          <Field label="Type">{(p) => (
            <Select {...p} value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="bug">Something's broken</option>
              <option value="concern">Content may be incorrect</option>
              <option value="question">I have a question</option>
              <option value="suggestion">Suggestion</option>
            </Select>
          )}</Field>
          <Field label="Subject" error={send.error?.fields.subject}>{(p) => <Input {...p} value={subject} onChange={(e) => setSubject(e.target.value)} maxLength={140} />}</Field>
          <Field label="Details" error={send.error?.fields.body} hint="What did you expect, and what happened instead?">{(p) => <Textarea {...p} value={bodyText} onChange={(e) => setBody(e.target.value)} maxLength={5000} />}</Field>
          {send.error && !Object.keys(send.error.fields).length && <FormError error={send.error} />}
          <Button type="submit" loading={send.pending}>Send feedback</Button>
        </form>
      )}
    </Dialog>
  );
}
