// Eureka and Beyond component library. Every page uses these; nothing else defines buttons, fields or cards.

import { AlertCircle, CheckCircle2, ChevronRight, Info, Loader2, RotateCw, TriangleAlert, X } from "lucide-react";
import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { Link, type LinkProps } from "react-router";
import { LEVEL_LABELS, STATUS_LABELS, type CourseLevel, type CourseStatus } from "../../../shared/types";
import type { ApiRequestError } from "../../lib/api";
import { subjectStyle } from "../../lib/subjects";

export function cx(...parts: unknown[]) {
  return parts.filter((p): p is string => typeof p === "string" && p.length > 0).join(" ");
}

export function Container({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cx("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)} {...props} />;
}

// ---- Buttons -------------------------------------------------------------------

type Variant = "primary" | "secondary" | "ghost" | "danger" | "success";
type Size = "sm" | "md" | "lg";
const variants: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-ink shadow-[0_1px_2px_rgb(65_105_225/0.3)] dark:text-[#0d1424]",
  secondary: "bg-surface text-ink border border-line hover:border-ink/25 hover:bg-sunken",
  ghost: "text-ink hover:bg-sunken",
  danger: "bg-danger text-white hover:opacity-90",
  success: "bg-success text-white hover:opacity-90",
};
const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-sm gap-1.5 rounded-md",
  md: "h-10 px-4 text-sm gap-2 rounded-md",
  lg: "h-12 px-6 text-base gap-2 rounded-lg",
};
const base = "inline-flex shrink-0 items-center justify-center font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50";

export const Button = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<"button"> & { variant?: Variant; size?: Size; loading?: boolean }
>(function Button({ variant = "primary", size = "md", loading, className, children, disabled, ...props }, ref) {
  return (
    <button ref={ref} type="button" className={cx(base, variants[variant], sizes[size], className)} disabled={disabled || loading} {...props}>
      {loading && <Loader2 aria-hidden className="size-4 animate-spin" />}
      {children}
    </button>
  );
});

export function ButtonLink({ variant = "primary", size = "md", className, ...props }: LinkProps & { variant?: Variant; size?: Size }) {
  return <Link className={cx(base, variants[variant], sizes[size], className)} {...props} />;
}

export function IconButton({ label, className, children, ...props }: ComponentPropsWithoutRef<"button"> & { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cx("inline-flex size-9 items-center justify-center rounded-md text-muted hover:bg-sunken hover:text-ink", className)}
      {...props}
    >
      {children}
    </button>
  );
}

// ---- Badges --------------------------------------------------------------------

type Tone = "neutral" | "primary" | "success" | "warning" | "danger" | "math" | "physics" | "chemistry";
const tones: Record<Tone, string> = {
  neutral: "bg-sunken text-ink",
  primary: "bg-primary-soft text-primary-ink",
  success: "bg-success-soft text-ink",
  warning: "bg-warning-soft text-ink",
  danger: "bg-danger-soft text-ink",
  math: "bg-math-soft text-ink",
  physics: "bg-physics-soft text-ink",
  chemistry: "bg-chem-soft text-ink",
};

export function Badge({ tone = "neutral", dot, className, children }: { tone?: Tone; dot?: string; className?: string; children: ReactNode }) {
  return (
    <span className={cx("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold", tones[tone], className)}>
      {dot && <span aria-hidden className={cx("size-1.5 rounded-full", dot)} />}
      {children}
    </span>
  );
}

export function LevelBadge({ level }: { level: CourseLevel }) {
  return <Badge tone={level === "ap" ? "primary" : "neutral"}>{LEVEL_LABELS[level]}</Badge>;
}

export function StatusBadge({ status, lessons }: { status: CourseStatus; lessons?: number }) {
  const map: Record<CourseStatus, { tone: Tone; dot: string }> = {
    published: { tone: "success", dot: "bg-success" },
    in_development: { tone: "primary", dot: "bg-primary" },
    planned: { tone: "neutral", dot: "bg-muted" },
    archived: { tone: "neutral", dot: "bg-muted" },
  };
  const label = status === "in_development" && lessons !== undefined ? `${lessons} ${lessons === 1 ? "lesson" : "lessons"} ready` : STATUS_LABELS[status];
  return (
    <Badge tone={map[status].tone} dot={map[status].dot}>
      {label}
    </Badge>
  );
}

export function SubjectMark({ slug, size = "md", className }: { slug: string; size?: "sm" | "md" | "lg"; className?: string }) {
  const s = subjectStyle(slug);
  const dims = { sm: "size-7 rounded-md [&>svg]:size-4", md: "size-10 rounded-lg [&>svg]:size-5", lg: "size-14 rounded-xl [&>svg]:size-7" }[size];
  return (
    <span aria-hidden className={cx("inline-flex shrink-0 items-center justify-center text-white", s.bg, dims, className)}>
      <s.Icon strokeWidth={2.2} />
    </span>
  );
}

export function ProgressBar({ value, max = 1, tone = "primary", label, className }: { value: number; max?: number; tone?: "primary" | "success" | "math" | "physics" | "chemistry"; label: string; className?: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  const color = { primary: "bg-primary", success: "bg-success", math: "bg-math", physics: "bg-physics", chemistry: "bg-chem" }[tone];
  return (
    <div role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} className={cx("h-2 overflow-hidden rounded-full bg-sunken", className)}>
      <div className={cx("h-full rounded-full transition-[width] duration-500", color)} style={{ width: `${pct}%` }} />
    </div>
  );
}

// ---- Layout helpers ---------------------------------------------------------------

export interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((c, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight aria-hidden className="size-3.5 opacity-60" />}
            {c.to && i < items.length - 1 ? (
              <Link to={c.to} className="rounded hover:text-ink hover:underline underline-offset-2">
                {c.label}
              </Link>
            ) : (
              <span aria-current={i === items.length - 1 ? "page" : undefined} className="font-medium text-ink">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHeader({ crumbs, title, lead, actions, children, className }: {
  crumbs?: Crumb[]; title: ReactNode; lead?: ReactNode; actions?: ReactNode; children?: ReactNode; className?: string;
}) {
  return (
    <header className={cx("pb-6 pt-8 sm:pt-10", className)}>
      {crumbs && <Breadcrumbs items={crumbs} />}
      <div className={cx("flex flex-wrap items-end justify-between gap-4", crumbs && "mt-4")}>
        <div className="min-w-0">
          <h1 className="text-3xl sm:text-4xl">{title}</h1>
          {lead && <p className="mt-3 max-w-2xl text-lg text-muted">{lead}</p>}
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>
      {children}
    </header>
  );
}

export function Section({ title, description, actions, children, className }: { title: ReactNode; description?: ReactNode; actions?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cx("card p-5 sm:p-6", className)}>
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg">{title}</h2>
          {description && <p className="mt-1 text-sm text-muted">{description}</p>}
        </div>
        {actions}
      </div>
      {children}
    </section>
  );
}

// ---- States ----------------------------------------------------------------------

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cx("animate-pulse rounded-lg bg-sunken", className)} />;
}

export function Loading({ rows = 3, label = "Loading" }: { rows?: number; label?: string }) {
  return (
    <div role="status" aria-live="polite" className="space-y-3 py-6">
      <span className="sr-only">{label}…</span>
      {Array.from({ length: rows }, (_, i) => (
        <Skeleton key={i} className="h-16 w-full" />
      ))}
    </div>
  );
}

export function ErrorState({ error, onRetry }: { error: ApiRequestError; onRetry?: () => void }) {
  return (
    <div role="alert" className="my-6 flex items-start gap-3 rounded-lg border border-danger/30 bg-danger-soft p-5">
      <AlertCircle aria-hidden className="mt-0.5 size-5 shrink-0 text-danger" />
      <div>
        <p className="font-semibold">This couldn't load.</p>
        <p className="mt-1 text-sm text-muted">{error.message}</p>
        {onRetry && (
          <Button variant="secondary" size="sm" className="mt-3" onClick={onRetry}>
            <RotateCw aria-hidden className="size-4" /> Try again
          </Button>
        )}
      </div>
    </div>
  );
}

export function EmptyState({ icon, title, children, action }: { icon?: ReactNode; title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-line bg-surface/60 px-6 py-10 text-center">
      {icon && <div className="mx-auto mb-3 flex size-11 items-center justify-center rounded-full bg-sunken text-muted [&>svg]:size-5">{icon}</div>}
      <p className="font-display text-lg font-semibold">{title}</p>
      {children && <div className="mx-auto mt-1.5 max-w-md text-sm text-muted">{children}</div>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function Alert({ tone = "info", title, children, className }: { tone?: "info" | "success" | "warning" | "danger"; title?: ReactNode; children?: ReactNode; className?: string }) {
  const cfg = {
    info: { Icon: Info, cls: "bg-primary-soft border-primary/25", icon: "text-primary" },
    success: { Icon: CheckCircle2, cls: "bg-success-soft border-success/30", icon: "text-success" },
    warning: { Icon: TriangleAlert, cls: "bg-warning-soft border-warning/30", icon: "text-warning" },
    danger: { Icon: AlertCircle, cls: "bg-danger-soft border-danger/30", icon: "text-danger" },
  }[tone];
  return (
    <div role={tone === "danger" ? "alert" : "status"} className={cx("flex gap-3 rounded-lg border p-4 text-sm", cfg.cls, className)}>
      <cfg.Icon aria-hidden className={cx("mt-0.5 size-4.5 shrink-0", cfg.icon)} />
      <div className="min-w-0">
        {title && <p className="font-semibold">{title}</p>}
        {children && <div className={cx(title && "mt-0.5", "text-ink/85")}>{children}</div>}
      </div>
    </div>
  );
}

// ---- Forms -------------------------------------------------------------------------

const inputBase =
  "w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted/70 transition-colors focus-visible:border-primary focus-visible:outline-2 focus-visible:outline-primary/40 disabled:opacity-60 aria-[invalid=true]:border-danger";

export function Field({ label, hint, error, children, className, id }: { label: ReactNode; hint?: ReactNode; error?: string; children: (props: { id: string; "aria-describedby"?: string; "aria-invalid"?: boolean }) => ReactNode; className?: string; id?: string }) {
  const auto = useId();
  const fid = id ?? auto;
  const describedBy = [hint && `${fid}-hint`, error && `${fid}-error`].filter(Boolean).join(" ") || undefined;
  return (
    <div className={cx("space-y-1.5", className)}>
      <label htmlFor={fid} className="block text-sm font-semibold">
        {label}
      </label>
      {children({ id: fid, "aria-describedby": describedBy, "aria-invalid": error ? true : undefined })}
      {hint && !error && (
        <p id={`${fid}-hint`} className="text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${fid}-error`} className="text-xs font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export const Input = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<"input">>(function Input({ className, ...p }, ref) {
  return <input ref={ref} className={cx(inputBase, "h-10", className)} {...p} />;
});
export const Textarea = forwardRef<HTMLTextAreaElement, ComponentPropsWithoutRef<"textarea">>(function Textarea({ className, ...p }, ref) {
  return <textarea ref={ref} className={cx(inputBase, "min-h-24 leading-relaxed", className)} {...p} />;
});
export const Select = forwardRef<HTMLSelectElement, ComponentPropsWithoutRef<"select">>(function Select({ className, ...p }, ref) {
  return <select ref={ref} className={cx(inputBase, "h-10 pr-8", className)} {...p} />;
});

export function Checkbox({ label, className, ...p }: ComponentPropsWithoutRef<"input"> & { label: ReactNode }) {
  return (
    <label className={cx("flex cursor-pointer items-start gap-2.5 text-sm", className)}>
      <input type="checkbox" className="mt-0.5 size-4 shrink-0 accent-[var(--primary)]" {...p} />
      <span>{label}</span>
    </label>
  );
}

export function FormError({ error }: { error: { message: string } | null }) {
  if (!error) return null;
  return <Alert tone="danger">{error.message}</Alert>;
}

// ---- Tabs (ARIA, roving focus) ------------------------------------------------------

export function Tabs<T extends string>({ value, onChange, items, label, className }: {
  value: T; onChange: (v: T) => void; items: { value: T; label: ReactNode; badge?: ReactNode; disabledHint?: string }[]; label: string; className?: string;
}) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const onKey = (e: React.KeyboardEvent) => {
    const i = items.findIndex((t) => t.value === value);
    const next = e.key === "ArrowRight" ? (i + 1) % items.length : e.key === "ArrowLeft" ? (i - 1 + items.length) % items.length : e.key === "Home" ? 0 : e.key === "End" ? items.length - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    onChange(items[next].value);
    requestAnimationFrame(() => refs.current[items[next].value]?.focus());
  };
  return (
    <div role="tablist" aria-label={label} onKeyDown={onKey} className={cx("flex gap-1 overflow-x-auto rounded-lg bg-sunken p-1", className)}>
      {items.map((t) => {
        const sel = t.value === value;
        return (
          <button
            key={t.value}
            ref={(el) => {
              refs.current[t.value] = el;
            }}
            role="tab"
            id={`tab-${t.value}`}
            aria-selected={sel}
            aria-controls={`panel-${t.value}`}
            tabIndex={sel ? 0 : -1}
            type="button"
            onClick={() => onChange(t.value)}
            className={cx(
              "flex min-h-11 flex-1 shrink-0 items-center justify-center gap-2 rounded-md px-2 py-1.5 text-sm font-semibold transition-colors sm:min-h-0 sm:flex-none sm:px-3.5",
              sel ? "bg-surface text-ink shadow-[var(--shadow-card)]" : "text-muted hover:text-ink",
            )}
          >
            {t.label}
            {t.badge}
            {t.disabledHint && <span className="sr-only"> ({t.disabledHint})</span>}
          </button>
        );
      })}
    </div>
  );
}

// ---- Dialog -------------------------------------------------------------------------

export function Dialog({ open, onClose, title, description, children, size = "md" }: { open: boolean; onClose: () => void; title: string; description?: ReactNode; children: ReactNode; size?: "md" | "lg" | "xl" }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onCancel={onClose}
      aria-labelledby="dialog-title"
      className={cx(
        "m-auto w-[calc(100%-2rem)] rounded-xl border border-line bg-surface p-0 text-ink shadow-[var(--shadow-lift)] backdrop:bg-[#0d1424]/45 backdrop:backdrop-blur-[2px]",
        { md: "max-w-lg", lg: "max-w-2xl", xl: "max-w-4xl" }[size],
      )}
    >
      {open && (
        <div className="max-h-[85vh] overflow-y-auto p-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h2 id="dialog-title" className="text-xl">
                {title}
              </h2>
              {description && <p className="mt-1 text-sm text-muted">{description}</p>}
            </div>
            <IconButton label="Close" onClick={onClose} className="-mr-2 -mt-1">
              <X aria-hidden className="size-5" />
            </IconButton>
          </div>
          {children}
        </div>
      )}
    </dialog>
  );
}

// ---- Data display ---------------------------------------------------------------------

export function Stat({ label, value, hint, icon, tone = "primary" }: { label: string; value: ReactNode; hint?: ReactNode; icon?: ReactNode; tone?: "primary" | "success" | "math" | "physics" | "chemistry" | "warning" | "danger" }) {
  const t = { primary: "bg-primary-soft text-primary", success: "bg-success-soft text-success", math: "bg-math-soft text-math", physics: "bg-physics-soft text-physics", chemistry: "bg-chem-soft text-chem", warning: "bg-warning-soft text-warning", danger: "bg-danger-soft text-danger" }[tone];
  return (
    <div className="card flex items-start gap-4 p-5">
      {icon && <div className={cx("flex size-10 shrink-0 items-center justify-center rounded-lg [&>svg]:size-5", t)}>{icon}</div>}
      <div className="min-w-0">
        <p className="text-sm text-muted">{label}</p>
        <p className="mt-0.5 font-display text-2xl font-semibold">{value}</p>
        {hint && <p className="mt-0.5 text-xs text-muted">{hint}</p>}
      </div>
    </div>
  );
}

export function Table({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cx("relative overflow-x-auto rounded-lg border border-line", className)}>
      <table className="w-full min-w-[36rem] text-left text-sm [&_td]:px-4 [&_td]:py-3 [&_th]:bg-sunken [&_th]:px-4 [&_th]:py-2.5 [&_th]:text-xs [&_th]:font-semibold [&_th]:text-muted [&_tr]:border-b [&_tr]:border-line [&_tbody_tr:last-child]:border-0">
        {children}
      </table>
    </div>
  );
}
