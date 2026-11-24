// Splits a worked-example step's LaTeX into prose and math segments.
// Top-level \text{...} runs become plain text so they wrap on narrow screens;
// everything else stays math. \text inside braces (fractions, subscripts) is left alone.

export type StepSegment = { kind: "text" | "math"; value: string };

const TEXT_CMD = "\\text{";

function unescapeText(t: string): string {
  return t.replace(/\\([%&$#_{}])/g, "$1").replace(/---/g, "—").replace(/--/g, "–").replace(/~/g, " ");
}

export function splitStep(latex: string): StepSegment[] {
  const out: StepSegment[] = [];
  let depth = 0; // brace depth
  let env = 0; // \left…\right and \begin…\end depth
  let math = "";
  let i = 0;
  const pushMath = () => {
    const spacing = /\\(?:[,;:! ]|quad|qquad)/g;
    const bare = math.replace(spacing, " ").trim();
    if (!bare) {
      if (math.length) out.push({ kind: "text", value: " " });
    } else if (/^[,;.:]+$/.test(bare)) {
      // Punctuation between text runs reads better as text.
      out.push({ kind: "text", value: bare + " " });
    } else {
      const edge = /^(?:\s|\\[,;:! ]|\\quad|\\qquad)+|(?:\s|\\[,;:! ]|\\quad|\\qquad)+$/g;
      const lead = /^(?:\s|\\[,;:! ]|\\quad|\\qquad)+/.test(math);
      const trail = /(?:\s|\\[,;:! ]|\\quad|\\qquad)+$/.test(math);
      if (lead) out.push({ kind: "text", value: " " });
      out.push({ kind: "math", value: math.replace(edge, "") });
      if (trail) out.push({ kind: "text", value: " " });
    }
    math = "";
  };
  while (i < latex.length) {
    if (depth === 0 && env === 0 && latex.startsWith(TEXT_CMD, i)) {
      // Find the matching closing brace.
      let j = i + TEXT_CMD.length;
      let d = 1;
      while (j < latex.length && d > 0) {
        if (latex[j] === "\\") { j += 2; continue; }
        if (latex[j] === "{") d++;
        else if (latex[j] === "}") d--;
        j++;
      }
      if (d !== 0) { math += latex.slice(i); break; } // unbalanced: leave as math
      const inner = latex.slice(i + TEXT_CMD.length, j - 1);
      if (inner.includes("$")) { math += latex.slice(i, j); i = j; continue; } // nested math in text: keep as math
      pushMath();
      out.push({ kind: "text", value: unescapeText(inner) });
      i = j;
      continue;
    }
    const c = latex[i];
    if (c === "\\") {
      const cmd = /^\\[a-zA-Z]+/.exec(latex.slice(i))?.[0] ?? latex.slice(i, i + 2);
      if (cmd === "\\left" || cmd === "\\begin") env++;
      else if (cmd === "\\right" || cmd === "\\end") env--;
      math += cmd;
      i += cmd.length;
      continue;
    }
    if (c === "{") depth++;
    else if (c === "}") depth--;
    math += c;
    i++;
  }
  pushMath();
  // Merge adjacent text runs and trim the ends.
  const merged: StepSegment[] = [];
  for (const seg of out) {
    const prev = merged[merged.length - 1];
    if (prev && prev.kind === "text" && seg.kind === "text") prev.value += seg.value;
    else merged.push({ ...seg });
  }
  for (const seg of merged) if (seg.kind === "text") seg.value = seg.value.replace(/ {2,}/g, " ");
  if (merged[0]?.kind === "text") merged[0].value = merged[0].value.trimStart();
  const last = merged[merged.length - 1];
  if (last?.kind === "text") last.value = last.value.trimEnd();
  out.length = 0;
  out.push(...merged.filter((x) => x.value !== ""));
  // A step with no text runs stays one math segment exactly as written.
  if (!out.some((s) => s.kind === "text")) return [{ kind: "math", value: latex }];
  return out;
}
