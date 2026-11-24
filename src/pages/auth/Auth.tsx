import { CheckCircle2, KeyRound, MailCheck } from "lucide-react";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { Logo } from "../../components/layout/SiteLayout";
import { Alert, Button, ButtonLink, Checkbox, Field, FormError, Input, Textarea } from "../../components/ui";
import { api, useAction } from "../../lib/api";
import { useAuth } from "../../lib/auth";
import { useSite } from "../../lib/site";
import { useTitle } from "../usePageTitle";

function AuthCard({ title, lead, children, footer }: { title: string; lead?: ReactNode; children: ReactNode; footer?: ReactNode }) {
  return (
    <div className="flex min-h-[calc(100dvh-4rem)] items-center justify-center bg-canvas px-4 py-12">
      <div className="w-full max-w-md">
        <div className="card p-7 sm:p-8">
          <Logo className="mb-6" />
          <h1 className="text-2xl">{title}</h1>
          {lead && <p className="mt-1.5 text-sm text-muted">{lead}</p>}
          <div className="mt-6">{children}</div>
        </div>
        {footer && <div className="mt-5 text-center text-sm text-muted">{footer}</div>}
      </div>
    </div>
  );
}

/** Only allow same-site relative redirects after sign-in. */
function safeNext(next: string | null) {
  return next && next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";
}

export function LoginPage() {
  useTitle("Sign in");
  const { refresh, user } = useAuth();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const next = safeNext(params.get("next"));
  useEffect(() => { if (user) navigate(next, { replace: true }); }, [user, next, navigate]);
  const login = useAction(async (e: FormEvent) => {
    e.preventDefault();
    await api.post("/auth/login", { email, password });
    await refresh();
  });
  return (
    <AuthCard title="Welcome back" lead="Sign in to pick up where you left off." footer={<>New here? <Link className="link" to="/register">Create a free account</Link></>}>
      <form onSubmit={login.run} className="space-y-4">
        <Field label="Email">{(p) => <Input {...p} type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />}</Field>
        <Field label="Password">{(p) => <Input {...p} type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />}</Field>
        <FormError error={login.error} />
        <Button type="submit" className="w-full" size="lg" loading={login.pending}>Sign in</Button>
        <p className="text-center text-sm"><Link className="link" to="/forgot-password">Forgot your password?</Link></p>
      </form>
    </AuthCard>
  );
}

export function RegisterPage() {
  useTitle("Create an account");
  const { refresh } = useAuth();
  const { config } = useSite();
  const navigate = useNavigate();
  const [f, setF] = useState({ displayName: "", email: "", password: "", ageConfirmed: false });
  const reg = useAction(async (e: FormEvent) => {
    e.preventDefault();
    await api.post("/auth/register", f);
    await refresh();
    navigate("/dashboard?welcome=1");
  });
  if (!config.registrationOpen) {
    return (
      <AuthCard title="Sign-up isn't open right now">
        <Alert tone="info">{config.registrationMessage ?? "Account sign-up is currently closed."}</Alert>
        <ButtonLink to="/courses" className="mt-5 w-full">Start learning without an account</ButtonLink>
      </AuthCard>
    );
  }
  const fe = reg.error?.fields ?? {};
  return (
    <AuthCard title="Create your free account" lead="Save progress, bookmark lessons, track practice and ask questions. Everything stays free." footer={<>Already have an account? <Link className="link" to="/login">Sign in</Link></>}>
      <form onSubmit={reg.run} className="space-y-4" noValidate>
        <Field label="Display name" hint="Shown on any discussion posts. Don't use your full name." error={fe.displayName}>{(p) => <Input {...p} autoComplete="nickname" maxLength={60} value={f.displayName} onChange={(e) => setF({ ...f, displayName: e.target.value })} />}</Field>
        <Field label="Email" error={fe.email}>{(p) => <Input {...p} type="email" autoComplete="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />}</Field>
        <Field label="Password" hint="At least 10 characters. A short phrase works well." error={fe.password}>{(p) => <Input {...p} type="password" autoComplete="new-password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} />}</Field>
        <div>
          <Checkbox label={<>I'm 13 or older and agree to the <Link className="link" to="/terms">terms</Link> and <Link className="link" to="/privacy">privacy policy</Link>.</>} checked={f.ageConfirmed} onChange={(e) => setF({ ...f, ageConfirmed: e.target.checked })} />
          {fe.ageConfirmed && <p className="mt-1 text-xs font-medium text-danger">{fe.ageConfirmed}</p>}
          <p className="mt-2 text-xs text-muted">Under 13? You can use every lesson without an account.</p>
        </div>
        {reg.error && !Object.keys(fe).length && <FormError error={reg.error} />}
        <Button type="submit" className="w-full" size="lg" loading={reg.pending}>Create account</Button>
      </form>
    </AuthCard>
  );
}

export function VerifyEmailPage() {
  useTitle("Confirm email");
  const [params] = useSearchParams();
  const { refresh } = useAuth();
  const [state, setState] = useState<"working" | "ok" | "error">("working");
  const [message, setMessage] = useState("");
  useEffect(() => {
    const token = params.get("token") ?? "";
    api.post("/auth/verify-email", { token }).then(
      async () => { setState("ok"); await refresh(); },
      (e: Error) => { setState("error"); setMessage(e.message); },
    );
  }, [params, refresh]);
  return (
    <AuthCard title={state === "ok" ? "Email confirmed" : state === "error" ? "That link didn't work" : "Confirming…"}>
      {state === "ok" && <><Alert tone="success" title="You're all set">Your progress and practice will now be saved.</Alert><ButtonLink to="/dashboard" className="mt-5 w-full"><CheckCircle2 aria-hidden className="size-4" /> Go to your dashboard</ButtonLink></>}
      {state === "error" && <><Alert tone="danger">{message}</Alert><p className="mt-4 text-sm text-muted">Sign in and use "Send a new link" on your dashboard.</p></>}
    </AuthCard>
  );
}

export function ForgotPasswordPage() {
  useTitle("Reset your password");
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const send = useAction(async (e: FormEvent) => {
    e.preventDefault();
    await api.post("/auth/forgot-password", { email });
    setDone(true);
  });
  return (
    <AuthCard title="Reset your password" lead="We'll email you a link to choose a new password." footer={<Link className="link" to="/login">Back to sign in</Link>}>
      {done ? (
        <div className="space-y-4">
          <Alert tone="success" title="Check your email"><MailCheck aria-hidden className="mr-1 inline size-4" /> If an account uses {email}, a reset link is on its way. It works once and expires in an hour.</Alert>
          <p className="text-sm text-muted">No email after a few minutes? Check spam, or <Link className="link" to="/password-help">ask our team for help</Link>.</p>
        </div>
      ) : (
        <form onSubmit={send.run} className="space-y-4">
          <Field label="Email" error={send.error?.fields.email}>{(p) => <Input {...p} type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />}</Field>
          {send.error && !send.error.fields.email && <FormError error={send.error} />}
          <Button type="submit" className="w-full" size="lg" loading={send.pending}>Send reset link</Button>
        </form>
      )}
    </AuthCard>
  );
}

export function ResetPasswordPage() {
  useTitle("Choose a new password");
  const [params] = useSearchParams();
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);
  const reset = useAction(async (e: FormEvent) => {
    e.preventDefault();
    await api.post("/auth/reset-password", { token: params.get("token") ?? "", password });
    setDone(true);
  });
  return (
    <AuthCard title="Choose a new password">
      {done ? (
        <><Alert tone="success" title="Password changed">For your security, every device has been signed out.</Alert><ButtonLink to="/login" className="mt-5 w-full"><KeyRound aria-hidden className="size-4" /> Sign in</ButtonLink></>
      ) : (
        <form onSubmit={reset.run} className="space-y-4">
          <Field label="New password" hint="At least 10 characters." error={reset.error?.fields.password}>{(p) => <Input {...p} type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />}</Field>
          {reset.error && !reset.error.fields.password && <FormError error={reset.error} />}
          <Button type="submit" className="w-full" size="lg" loading={reset.pending}>Save new password</Button>
          {reset.error?.code === "invalid_token" && <p className="text-center text-sm"><Link className="link" to="/forgot-password">Request a new link</Link></p>}
        </form>
      )}
    </AuthCard>
  );
}

export function PasswordHelpPage() {
  useTitle("Password help");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [done, setDone] = useState(false);
  const send = useAction(async (e: FormEvent) => {
    e.preventDefault();
    await api.post("/auth/password-assistance", { email, details });
    setDone(true);
  });
  return (
    <AuthCard title="Can't reset your password?" lead="If the reset email isn't reaching you, tell us what's happening. An administrator will review it." footer={<Link className="link" to="/forgot-password">Try the reset email again</Link>}>
      {done ? (
        <Alert tone="success" title="Request received">We'll reply by email. For your security, we can only send reset links to the address on the account, and we never ask for your password.</Alert>
      ) : (
        <form onSubmit={send.run} className="space-y-4">
          <Field label="Account email" error={send.error?.fields.email}>{(p) => <Input {...p} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />}</Field>
          <Field label="What's happening?" error={send.error?.fields.details}>{(p) => <Textarea {...p} value={details} onChange={(e) => setDetails(e.target.value)} maxLength={2000} placeholder="For example: I requested a reset twice but no email arrived." />}</Field>
          {send.error && !Object.keys(send.error.fields).length && <FormError error={send.error} />}
          <Button type="submit" className="w-full" loading={send.pending}>Send request</Button>
        </form>
      )}
    </AuthCard>
  );
}
