// Lesson rendering engine: one renderer per block kind. Lessons are data.

import { AlertTriangle, Globe2, Info, Lightbulb, MessageSquareWarning } from "lucide-react";
import { useMemo, type ComponentType } from "react";
import type { LessonBlock, LessonBlockKind } from "../../../shared/types";
import { Walkthrough, type Params, type SimProps } from "../sims/shell";
import { activityDef, Sim } from "../sims/registry";
import { Math as Tex, RichText } from "../ui/Math";
import { cx } from "../ui";
import { splitStep } from "../../../shared/step-segments";

type BlockOf<K extends LessonBlockKind> = Extract<LessonBlock, { kind: K }>;
type Renderers = { [K in LessonBlockKind]: ComponentType<{ block: BlockOf<K>; onFeedback?: (label: string) => void }> };

const CALLOUT = {
  tip: { Icon: Lightbulb, label: "Tip", cls: "bg-primary-soft", icon: "text-primary" },
  warning: { Icon: AlertTriangle, label: "Watch out", cls: "bg-warning-soft", icon: "text-warning" },
  application: { Icon: Globe2, label: "In the real world", cls: "bg-success-soft", icon: "text-success" },
  note: { Icon: Info, label: "Note", cls: "bg-sunken", icon: "text-muted" },
} as const;

const renderers: Renderers = {
  text: ({ block }) => (
    <div className="prose-lesson">
      {block.data.body.split(/\n{2,}/).map((p, i) => (
        <p key={i}>
          <RichText text={p} />
        </p>
      ))}
    </div>
  ),
  definition: ({ block }) => (
    <dl className="max-w-[70ch] rounded-xl border-l-4 border-math bg-surface p-5 shadow-[var(--shadow-card)]">
      <dt className="font-display text-lg font-semibold">{block.data.term}</dt>
      <dd className="mt-1 leading-relaxed">
        <RichText text={block.data.body} />
      </dd>
    </dl>
  ),
  formula: ({ block }) => (
    <div className="card max-w-[70ch] p-5">
      {block.data.title && <p className="text-sm font-semibold text-muted">{block.data.title}</p>}
      <Tex display latex={block.data.latex} className="mt-2 text-xl" />
      {block.data.note && (
        <p className="mt-2 text-sm text-muted">
          <RichText text={block.data.note} />
        </p>
      )}
    </div>
  ),
  worked_example: ({ block }) => (
    <section className="card max-w-[70ch] overflow-hidden">
      <div className="border-b border-line bg-sunken px-5 py-3">
        <p className="text-xs font-bold text-primary-ink">Worked example</p>
        <h3 className="mt-0.5 text-lg">
          <RichText text={block.data.title} />
        </h3>
      </div>
      <ol className="space-y-4 p-5">
        {block.data.steps.map((s, i) => (
          <li key={i} className="grid grid-cols-[1.75rem_1fr] gap-x-3">
            <span aria-hidden className="mt-1 inline-flex size-6 items-center justify-center rounded-full bg-primary-soft text-xs font-bold text-primary-ink">
              {i + 1}
            </span>
            <div className="min-w-0">
              <div className="scroll-x-hint text-[1.1rem]">
                {splitStep(s.latex).map((seg, k) =>
                  seg.kind === "math" ? <Tex key={k} latex={`\\displaystyle ${seg.value}`} /> : <span key={k}>{seg.value}</span>,
                )}
              </div>
              {s.explanation && <p className="mt-1 text-sm text-muted">{s.explanation}</p>}
            </div>
          </li>
        ))}
      </ol>
      {block.data.check && (
        <p className="border-t border-line bg-success-soft px-5 py-3 text-sm">
          <span className="font-semibold">Check. </span>
          <RichText text={block.data.check} />
        </p>
      )}
    </section>
  ),
  callout: ({ block }) => {
    const c = CALLOUT[block.data.tone] ?? CALLOUT.note;
    return (
      <aside className={cx("flex max-w-[70ch] gap-3 rounded-xl p-4", c.cls)}>
        <c.Icon aria-hidden className={cx("mt-0.5 size-5 shrink-0", c.icon)} />
        <div>
          <p className="font-semibold">{block.data.title ?? c.label}</p>
          <p className="mt-1 leading-relaxed">
            <RichText text={block.data.body} />
          </p>
        </div>
      </aside>
    );
  },
  figure: ({ block }) => (
    <figure className="max-w-[70ch]">
      <img src={block.data.src} alt={block.data.alt} className="w-full rounded-xl border border-line bg-white p-2" loading="lazy" />
      {block.data.caption && <figcaption className="mt-2 text-sm text-muted">{block.data.caption}</figcaption>}
    </figure>
  ),
  activity: ({ block, onFeedback }) => {
    const def = activityDef(block.data.activity);
    const title = block.data.title ?? def?.title ?? "Activity";
    const steps = (block.data as { steps?: { title: string; body: string; params?: Params }[] }).steps;
    const id = block.data.activity;
    const SimFor = useMemo<ComponentType<SimProps>>(() => (p) => <Sim id={id} params={p.params} />, [id]);
    return (
      <section aria-label={title} className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-lg">{title}</h3>
          {onFeedback && (
            <button type="button" onClick={() => onFeedback(title)} className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-ink">
              <MessageSquareWarning aria-hidden className="size-3.5" /> Report a problem with this activity
            </button>
          )}
        </div>
        {steps?.length ? <Walkthrough Sim={SimFor} steps={steps} /> : <Sim id={block.data.activity} params={block.data.params as Params | undefined} />}
      </section>
    );
  },
  references: ({ block }) => (
    <section className="max-w-[70ch]">
      <h3 className="text-base">References</h3>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
        {block.data.items.map((r, i) => (
          <li key={i}>{r.url ? <a className="link" href={r.url} rel="noopener noreferrer" target="_blank">{r.citation}</a> : r.citation}</li>
        ))}
      </ul>
    </section>
  ),
};

export function LessonBlockView({ block, onFeedback }: { block: LessonBlock; onFeedback?: (label: string) => void }) {
  const R = renderers[block.kind] as ComponentType<{ block: LessonBlock; onFeedback?: (label: string) => void }> | undefined;
  return R ? <R block={block} onFeedback={onFeedback} /> : null;
}
