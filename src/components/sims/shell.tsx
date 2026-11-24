// Shared frame for every simulation: visual, controls, live readouts and an
// always-available statement of the model's assumptions and limits.

import { ChevronDown, Pause, Play, RotateCcw, SkipBack, SkipForward } from "lucide-react";
import { useEffect, useId, useRef, useState, type ComponentType, type ReactNode } from "react";
import { subjectStyle } from "../../lib/subjects";
import { Button, cx } from "../ui";

export type Params = Record<string, number | boolean | string>;
export interface SimProps {
  params?: Params;
}

export function num(p: Params | undefined, key: string, fallback: number, min = -Infinity, max = Infinity) {
  const v = p?.[key];
  const n = typeof v === "number" && Number.isFinite(v) ? v : fallback;
  return Math.min(max, Math.max(min, n));
}

export const fmt = (n: number, digits = 2) => {
  if (!Number.isFinite(n)) return "—";
  const r = Number(n.toFixed(digits));
  return (Object.is(r, -0) ? 0 : r).toLocaleString(undefined, { maximumFractionDigits: digits });
};

export function SimShell({
  subject,
  title,
  visual,
  controls,
  readouts,
  assumptions,
  onReset,
  footer,
}: {
  subject: string;
  title: string;
  visual: ReactNode;
  controls: ReactNode;
  readouts: { label: ReactNode; value: ReactNode; emphasis?: boolean }[];
  assumptions: string[];
  onReset?: () => void;
  footer?: ReactNode;
}) {
  const s = subjectStyle(subject);
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <figure className="card overflow-clip" style={{ ["--accent" as string]: s.cssVar }} aria-label={title}>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_19rem]">
        <div className="grid-paper sim-visual relative flex min-w-0 items-center border-b border-line bg-canvas lg:border-b-0 lg:border-r"><div className="w-full">{visual}</div></div>
        <div className="flex flex-col gap-4 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <span className={cx("inline-flex items-center gap-1.5 text-xs font-bold", s.text)}>
              <s.Icon aria-hidden className="size-3.5" /> Simulation
            </span>
            {onReset && (
              <Button variant="ghost" size="sm" onClick={onReset}>
                <RotateCcw aria-hidden className="size-3.5" /> Reset
              </Button>
            )}
          </div>
          <div className="space-y-4">{controls}</div>
          <dl className="grid grid-cols-2 gap-2" aria-live="polite">
            {readouts.map((r, i) => (
              <div key={i} className={cx("rounded-lg px-3 py-2", r.emphasis ? s.soft : "bg-sunken")}>
                <dt className="text-xs text-muted">{r.label}</dt>
                <dd className="font-display text-base font-semibold tabular-nums">{r.value}</dd>
              </div>
            ))}
          </dl>
          {footer}
        </div>
      </div>
      <figcaption className="border-t border-line">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold hover:bg-sunken sm:px-5"
        >
          Model, assumptions and limits
          <ChevronDown aria-hidden className={cx("size-4 transition-transform", open && "rotate-180")} />
        </button>
        <ul id={id} hidden={!open} className="list-disc space-y-1 px-9 pb-4 text-sm text-muted">
          {assumptions.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}

export function Slider({ label, value, min, max, step, unit, onChange, format, disabled }: {
  label: ReactNode; value: number; min: number; max: number; step: number; unit?: string; onChange: (v: number) => void; format?: (v: number) => string; disabled?: boolean;
}) {
  const id = useId();
  const shown = format ? format(value) : fmt(value, step < 0.01 ? 3 : step < 1 ? 2 : 0);
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between gap-2 text-sm">
        <label htmlFor={id} className="font-semibold">
          {label}
        </label>
        <output htmlFor={id} className="tabular-nums text-muted">
          {shown}
          {unit && ` ${unit}`}
        </output>
      </div>
      <input
        id={id}
        className="range disabled:cursor-not-allowed disabled:opacity-50"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuetext={`${shown}${unit ? ` ${unit}` : ""}`}
      />
    </div>
  );
}

export function Segmented<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: { value: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <fieldset>
      <legend className="mb-1 text-sm font-semibold">{label}</legend>
      <div className="flex flex-wrap gap-1 rounded-lg bg-sunken p-1">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={value === o.value}
            onClick={() => onChange(o.value)}
            className={cx("flex-1 rounded-md px-2.5 py-1 text-sm font-semibold", value === o.value ? "bg-surface shadow-[var(--shadow-card)]" : "text-muted hover:text-ink")}
          >
            {o.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

/** requestAnimationFrame loop that respects reduced motion (callers get dt in seconds). */
export function useAnimation(running: boolean, tick: (dt: number) => void) {
  const ref = useRef(tick);
  ref.current = tick;
  useEffect(() => {
    if (!running) return;
    let last = performance.now();
    let id = requestAnimationFrame(function loop(t) {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      ref.current(dt);
      id = requestAnimationFrame(loop);
    });
    return () => cancelAnimationFrame(id);
  }, [running]);
}

export function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduce(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduce;
}

/** Linear scale helper for SVG plots. */
export function scale(d0: number, d1: number, r0: number, r1: number) {
  const f = (v: number) => r0 + ((v - d0) / (d1 - d0)) * (r1 - r0);
  f.invert = (p: number) => d0 + ((p - r0) / (r1 - r0)) * (d1 - d0);
  return f as ((v: number) => number) & { invert: (p: number) => number };
}

/**
 * Guided demonstration for the Watch mode: steps through preset parameter sets
 * with captions, with play/pause and previous/next controls.
 */
export function Walkthrough({ Sim, steps, title }: { Sim: ComponentType<SimProps>; steps: { title: string; body: string; params?: Params }[]; title?: string }) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => {
      if (i < steps.length - 1) setI(i + 1);
      else setPlaying(false);
    }, 7000);
    return () => clearTimeout(t);
  }, [playing, i, steps.length]);
  const step = steps[i];
  return (
    <div className="space-y-3">
      <div className="card flex flex-wrap items-center gap-3 p-3">
        <div className="flex gap-1">
          <Button variant="secondary" size="sm" onClick={() => setI(Math.max(0, i - 1))} disabled={i === 0} aria-label="Previous step">
            <SkipBack aria-hidden className="size-4" />
          </Button>
          <Button size="sm" onClick={() => (i === steps.length - 1 && !playing ? (setI(0), setPlaying(true)) : setPlaying((p) => !p))} aria-label={playing ? "Pause" : "Play"}>
            {playing ? <Pause aria-hidden className="size-4" /> : <Play aria-hidden className="size-4" />}
          </Button>
          <Button variant="secondary" size="sm" onClick={() => setI(Math.min(steps.length - 1, i + 1))} disabled={i === steps.length - 1} aria-label="Next step">
            <SkipForward aria-hidden className="size-4" />
          </Button>
        </div>
        <div className="min-w-0 flex-1" aria-live="polite">
          <p className="text-xs font-semibold text-muted">
            {title ? `${title} · ` : ""}Step {i + 1} of {steps.length}
          </p>
          <p className="font-semibold">{step.title}</p>
        </div>
        <div className="flex gap-1" aria-hidden>
          {steps.map((_, k) => (
            <span key={k} className={cx("h-1.5 w-6 rounded-full", k <= i ? "bg-primary" : "bg-sunken")} />
          ))}
        </div>
      </div>
      <p className="prose-lesson">{step.body}</p>
      <Sim key={i} params={step.params} />
    </div>
  );
}
