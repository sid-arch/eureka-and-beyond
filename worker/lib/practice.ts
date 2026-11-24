// Server-side answer checking. Answer keys never leave the server.

export interface MultipleChoiceKey { choices: string[]; answer: number; explanations?: string[] }
export interface NumericKey { answer: number; tolerance?: number; relative?: boolean; unit?: string; sigFigs?: number }
export interface ShortTextKey { accept: string[]; caseSensitive?: boolean }

export type AnswerKey = MultipleChoiceKey | NumericKey | ShortTextKey;

/** Parses "3", "-2.5", "1/4", "-3/2", "6.02e23", "6.02×10^23", "1,250". Returns null if not a number. */
export function parseNumber(input: string): number | null {
  let s = input.trim().replace(/[−–]/g, "-").replace(/,/g, "").replace(/\s+/g, "");
  if (!s) return null;
  s = s.replace(/[×x*]10\^?\(?(-?\d+)\)?$/i, "e$1");
  const frac = /^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/.exec(s);
  if (frac) {
    const d = Number(frac[2]);
    return d === 0 ? null : Number(frac[1]) / d;
  }
  if (!/^-?(\d+\.?\d*|\.\d+)(e-?\d+)?$/i.test(s)) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

export function normalizeText(s: string, caseSensitive = false) {
  let t = s.normalize("NFKC").replace(/[−–]/g, "-").replace(/\s+/g, "");
  if (!caseSensitive) t = t.toLowerCase();
  return t;
}

export function formatNumber(n: number) {
  if (n !== 0 && (Math.abs(n) >= 1e6 || Math.abs(n) < 1e-3)) return n.toExponential(3).replace(/\.?0+e/, "e");
  return String(Number(n.toPrecision(6)));
}

export function checkAnswer(
  kind: "multiple_choice" | "numeric" | "short_text",
  key: AnswerKey,
  submitted: string,
): { correct: boolean; feedback: string; answerDisplay: string; valid: boolean } {
  if (kind === "multiple_choice") {
    const k = key as MultipleChoiceKey;
    const idx = Number(submitted);
    if (!Number.isInteger(idx) || idx < 0 || idx >= k.choices.length) {
      return { correct: false, valid: false, feedback: "Choose one of the options.", answerDisplay: k.choices[k.answer] };
    }
    const correct = idx === k.answer;
    const why = k.explanations?.[idx];
    return {
      correct,
      valid: true,
      feedback: why ?? (correct ? "Correct." : "Not quite. Look at the hint or the worked solution."),
      answerDisplay: k.choices[k.answer],
    };
  }
  if (kind === "numeric") {
    const k = key as NumericKey;
    const n = parseNumber(submitted);
    const display = `${formatNumber(k.answer)}${k.unit ? ` ${k.unit}` : ""}`;
    if (n === null) return { correct: false, valid: false, feedback: "Enter a number, such as 4.5, -2 or 3/4.", answerDisplay: display };
    const tol = k.tolerance ?? (k.relative ? 0.01 : 1e-9);
    const diff = Math.abs(n - k.answer);
    const correct = k.relative ? diff <= Math.abs(k.answer) * tol + 1e-12 : diff <= tol + 1e-12;
    let feedback = correct ? "Correct." : "Not quite.";
    if (!correct && k.answer !== 0 && Math.abs(n + k.answer) <= Math.max(tol, Math.abs(k.answer) * 1e-6)) {
      feedback = "Check your sign: the size is right but the direction isn't.";
    } else if (!correct && k.answer !== 0 && n !== 0) {
      const ratio = n / k.answer;
      for (const p of [10, 100, 1000, 0.1, 0.01, 0.001]) {
        if (Math.abs(ratio - p) / p < 0.01) {
          feedback = "You're off by a power of ten. Check your unit conversions.";
          break;
        }
      }
    }
    return { correct, valid: true, feedback, answerDisplay: display };
  }
  const k = key as ShortTextKey;
  const norm = normalizeText(submitted, k.caseSensitive);
  if (!norm) return { correct: false, valid: false, feedback: "Enter an answer.", answerDisplay: k.accept[0] };
  const correct = k.accept.some((a) => normalizeText(a, k.caseSensitive) === norm);
  return { correct, valid: true, feedback: correct ? "Correct." : "Not quite.", answerDisplay: k.accept[0] };
}
