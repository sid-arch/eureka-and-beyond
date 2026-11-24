import katex from "katex";
import { Fragment, useMemo } from "react";

/** Renders LaTeX with KaTeX, including MathML so screen readers can read it. */
export function Math({ latex, display = false, className }: { latex: string; display?: boolean; className?: string }) {
  const html = useMemo(
    () => katex.renderToString(latex, { displayMode: display, throwOnError: false, output: "htmlAndMathml", strict: "ignore", trust: false }),
    [latex, display],
  );
  const Tag = display ? "div" : "span";
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

export function splitMath(text: string): { math: boolean; value: string }[] {
  const out: { math: boolean; value: string }[] = [];
  const re = /\$([^$]+)\$/g;
  let last = 0;
  for (let m = re.exec(text); m; m = re.exec(text)) {
    if (m.index > last) out.push({ math: false, value: text.slice(last, m.index) });
    out.push({ math: true, value: m[1] });
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push({ math: false, value: text.slice(last) });
  return out;
}

/** Plain text with inline math between single dollar signs. Text is rendered as text, never HTML. */
export function RichText({ text }: { text: string }) {
  const parts = useMemo(() => splitMath(text), [text]);
  return <>{parts.map((p, i) => (p.math ? <Math key={i} latex={p.value} /> : <Fragment key={i}>{p.value}</Fragment>))}</>;
}
