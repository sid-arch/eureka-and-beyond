// Pure math for the vertex-form explorer: y = a(x − h)² + k.
// Kept free of React so it can be unit-tested directly.

export interface VertexForm {
  a: number;
  h: number;
  k: number;
}

export const round = (n: number, places = 2) => {
  const f = 10 ** places;
  const r = Math.round(n * f) / f;
  return Object.is(r, -0) ? 0 : r;
};

export const snap = (n: number, step = 0.5) => round(Math.round(n / step) * step, 4);

export const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

export function evaluate({ a, h, k }: VertexForm, x: number): number {
  return a * (x - h) ** 2 + k;
}

/** Expanded form coefficients: a(x−h)² + k = ax² − 2ahx + (ah² + k). */
export function toStandard({ a, h, k }: VertexForm): { a: number; b: number; c: number } {
  return { a: round(a, 4), b: round(-2 * a * h, 4), c: round(a * h * h + k, 4) };
}

/** Real zeros, sorted ascending. a must be nonzero. */
export function zeros({ a, h, k }: VertexForm): number[] {
  if (a === 0) throw new Error("a must be nonzero");
  const r = -k / a;
  if (r < 0) return [];
  if (r === 0) return [round(h, 4)];
  const d = Math.sqrt(r);
  return [round(h - d, 4), round(h + d, 4)];
}

const num = (n: number) => {
  const r = round(n, 2);
  return Number.isInteger(r) ? String(r) : r.toFixed(2).replace(/0$/, "");
};

/** LaTeX for the vertex form with signs simplified, e.g. y = -2(x + 1)^2 + 3. */
export function vertexLatex({ a, h, k }: VertexForm): string {
  const aPart = a === 1 ? "" : a === -1 ? "-" : num(a);
  const hPart = h === 0 ? "x" : h > 0 ? `(x - ${num(h)})` : `(x + ${num(-h)})`;
  const square = h === 0 ? "x^2" : `${hPart}^2`;
  const kPart = k === 0 ? "" : k > 0 ? ` + ${num(k)}` : ` - ${num(-k)}`;
  return `y = ${aPart}${square}${kPart}`;
}

/** Plain-text version for screen-reader announcements. */
export function vertexSpeech(v: VertexForm): string {
  return vertexLatex(v)
    .replace("^2", " squared")
    .replace(/-/g, "minus ")
    .replace(/\+/g, "plus ")
    .replace(/\s+/g, " ");
}

export { num as formatNumber };

/** LaTeX for the expanded form ax² + bx + c, omitting zero terms and unit coefficients. */
export function standardLatex(v: VertexForm): string {
  const { a, b, c } = toStandard(v);
  const coef = (n: number, first: boolean) => {
    const sign = n < 0 ? "-" : first ? "" : "+";
    const abs = Math.abs(n);
    return { sign, abs };
  };
  const terms: string[] = [];
  const push = (n: number, suffix: string) => {
    if (n === 0) return;
    const { sign, abs } = coef(n, terms.length === 0);
    const body = suffix && abs === 1 ? suffix : `${num(abs)}${suffix}`;
    terms.push(terms.length === 0 ? `${sign}${body}` : ` ${sign} ${body}`);
  };
  push(a, "x^2");
  push(b, "x");
  push(c, "");
  return `y = ${terms.join("") || "0"}`;
}
