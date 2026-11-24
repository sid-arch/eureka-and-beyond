// Calculus simulations, part 2: limits approached numerically and graphically.

import { useState } from "react";
import { fmt, scale, Segmented, SimShell, Slider, type SimProps } from "./shell";

const W = 480;

type Case = "hole" | "jump" | "vertical" | "sinx" | "oscillate";

export const LIMIT_CASES: Record<Case, { label: string; formula: string; a: number; f: (x: number) => number; left: number | null; right: number | null; note: string; xr: [number, number]; yr: [number, number]; valueAtA: number | null }> = {
  hole: { label: "Hole", formula: "f(x) = (x² − 1)/(x − 1)", a: 1, f: (x) => (x * x - 1) / (x - 1), left: 2, right: 2, valueAtA: null, xr: [-1, 3], yr: [-0.5, 4.5], note: "f(1) is undefined, but both sides approach 2: the limit exists and equals 2." },
  jump: { label: "Jump", formula: "f(x) = x + 1 for x < 1, x − 1 for x ≥ 1", a: 1, f: (x) => (x < 1 ? x + 1 : x - 1), left: 2, right: 0, valueAtA: 0, xr: [-1, 3], yr: [-1.5, 3.5], note: "The one-sided limits are 2 and 0. They differ, so the two-sided limit does not exist." },
  vertical: { label: "Asymptote", formula: "f(x) = 1/(x − 2)²", a: 2, f: (x) => 1 / ((x - 2) * (x - 2)), left: Infinity, right: Infinity, valueAtA: null, xr: [0, 4], yr: [-1, 20], note: "Both sides grow without bound: the limit is +∞ (it does not exist as a number)." },
  sinx: { label: "sin x / x", formula: "f(x) = sin x / x", a: 0, f: (x) => Math.sin(x) / x, left: 1, right: 1, valueAtA: null, xr: [-8, 8], yr: [-0.5, 1.3], note: "Undefined at 0, yet both sides approach 1. This limit is the basis of the derivative of sin x." },
  oscillate: { label: "sin(1/x)", formula: "f(x) = sin(1/x)", a: 0, f: (x) => Math.sin(1 / x), left: null, right: null, valueAtA: null, xr: [-0.5, 0.5], yr: [-1.4, 1.4], note: "The values keep swinging between −1 and 1 however close you get: no limit." },
};

const show = (y: number) => (!Number.isFinite(y) ? "undefined" : Math.abs(y) >= 1e5 ? y.toExponential(2) : fmt(y, 6));
const limText = (v: number | null) => (v === null ? "does not exist" : v === Infinity ? "+∞" : fmt(v, 4));

export function LimitsExplorer({ params }: SimProps) {
  const [k, setK] = useState<Case>((Object.keys(LIMIT_CASES) as Case[]).find((c) => c === params?.case) ?? "hole");
  const [p, setP] = useState(1); // h = 10^(-p)
  const c = LIMIT_CASES[k];
  const h = Math.pow(10, -p) * (c.xr[1] - c.xr[0]) / 4;
  const H = 260;
  const sx = scale(c.xr[0], c.xr[1], 40, W - 10), sy = scale(c.yr[0], c.yr[1], H - 25, 12);
  const clampY = (y: number) => Math.max(c.yr[0] - 1, Math.min(c.yr[1] + 1, y));
  const segs: string[] = [];
  let cur = "";
  const N = k === "oscillate" ? 2400 : 400;
  for (let i = 0; i <= N; i++) {
    const x = c.xr[0] + ((c.xr[1] - c.xr[0]) * i) / N;
    const y = c.f(x);
    const near = Math.abs(x - c.a) < 1e-9 || (k === "jump" && i > 0 && (c.xr[0] + ((c.xr[1] - c.xr[0]) * (i - 1)) / N < 1) !== (x < 1));
    if (!Number.isFinite(y) || near || y > c.yr[1] + 5 || y < c.yr[0] - 5) { if (cur) segs.push(cur); cur = ""; if (Number.isFinite(y) && !near) cur = `M${sx(x)},${sy(clampY(y))}`; continue; }
    cur += `${cur ? "L" : "M"}${sx(x)},${sy(clampY(y))}`;
  }
  if (cur) segs.push(cur);
  const xl = c.a - h, xr = c.a + h;
  const yl = c.f(xl), yr = c.f(xr);
  const rows = [1, 2, 3, 4].map((j) => { const hh = Math.pow(10, -j) * (c.xr[1] - c.xr[0]) / 4; return { hh, l: c.f(c.a - hh), r: c.f(c.a + hh) }; });
  const hole = (v: number | null) => v !== null && Number.isFinite(v);
  return (
    <SimShell
      subject="mathematics"
      title="Limits"
      onReset={() => { setK("hole"); setP(1); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${c.formula}. As x approaches ${c.a}: from the left ${limText(c.left)}, from the right ${limText(c.right)}.`} className="block h-auto w-full select-none">
          {c.yr[0] < 0 && c.yr[1] > 0 && <line x1={40} x2={W - 10} y1={sy(0)} y2={sy(0)} stroke="var(--line)" />}
          <line x1={sx(c.a)} x2={sx(c.a)} y1={12} y2={H - 25} stroke="var(--line)" strokeDasharray="4 4" />
          <text x={sx(c.a)} y={H - 8} textAnchor="middle" fontSize="11" fill="var(--muted)">x = {c.a}</text>
          {segs.map((d, i) => <path key={i} d={d} fill="none" stroke="var(--math)" strokeWidth={k === "oscillate" ? 1.2 : 2.5} />)}
          {hole(c.left) && <circle cx={sx(c.a)} cy={sy(c.left!)} r={5} fill="var(--surface)" stroke="var(--math)" strokeWidth={2} />}
          {hole(c.right) && c.right !== c.left && <circle cx={sx(c.a)} cy={sy(c.right!)} r={5} fill={c.valueAtA === c.right ? "var(--math)" : "var(--surface)"} stroke="var(--math)" strokeWidth={2} />}
          {Number.isFinite(yl) && <circle cx={sx(xl)} cy={sy(clampY(yl))} r={6} fill="var(--physics)" />}
          {Number.isFinite(yr) && <circle cx={sx(xr)} cy={sy(clampY(yr))} r={6} fill="var(--chem)" />}
          <text x={46} y={26} fontSize="12" fill="var(--ink)">{c.formula}</text>
        </svg>
      }
      controls={
        <>
          <Segmented label="Function" value={k} options={(Object.keys(LIMIT_CASES) as Case[]).map((v) => ({ value: v, label: LIMIT_CASES[v].label }))} onChange={(v) => { setK(v); setP(1); }} />
          <Slider label="How close: distance from a" value={p} min={0} max={4} step={0.1} format={() => `h = ${h < 0.001 ? h.toExponential(1) : fmt(h, 4)}`} onChange={setP} />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[18rem] text-sm tabular-nums">
              <thead><tr className="text-left text-muted"><th className="py-1 font-semibold">h</th><th className="font-semibold">f(a − h)</th><th className="font-semibold">f(a + h)</th></tr></thead>
              <tbody>{rows.map((r) => <tr key={r.hh} className="border-t border-line"><td className="py-1">{r.hh.toPrecision(2)}</td><td>{show(r.l)}</td><td>{show(r.r)}</td></tr>)}</tbody>
            </table>
          </div>
          <p className="text-sm text-muted">{c.note}</p>
        </>
      }
      readouts={[
        { label: "Left value f(a − h)", value: show(yl) },
        { label: "Right value f(a + h)", value: show(yr) },
        { label: "Left limit", value: limText(c.left) },
        { label: "Right limit", value: limText(c.right) },
        { label: "Two-sided limit", value: c.left !== null && c.left === c.right ? limText(c.left) : "does not exist", emphasis: true },
      ]}
      assumptions={[
        "The table and points evaluate f exactly at a ± h; the limits stated are the exact values, which the numbers approach.",
        "An open circle marks a point that is not on the graph; a filled circle marks the function's actual value at a.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// u-substitution: the same area before and after the change of variable
// ---------------------------------------------------------------------------

/** Composite Simpson's rule with n (even) subintervals. */
export function simpson(f: (x: number) => number, a: number, b: number, n = 400) {
  const h = (b - a) / n;
  let s = f(a) + f(b);
  for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(a + i * h);
  return (s * h) / 3;
}

type SubCase = "cos" | "exp" | "power";
export const SUB_CASES: Record<SubCase, { label: string; integrand: string; uSub: string; fu: string; f: (x: number) => number; g: (x: number) => number; fu_: (u: number) => number; a: number; bMax: number; bDefault: number; exact: (b: number) => number }> = {
  cos: { label: "2x cos(x²)", integrand: "2x cos(x²)", uSub: "u = x², du = 2x dx", fu: "cos u", f: (x) => 2 * x * Math.cos(x * x), g: (x) => x * x, fu_: (u) => Math.cos(u), a: 0, bMax: 2, bDefault: 1.2, exact: (b) => Math.sin(b * b) },
  exp: { label: "x e^(x²)", integrand: "x e^(x²)", uSub: "u = x², du = 2x dx", fu: "½ eᵘ", f: (x) => x * Math.exp(x * x), g: (x) => x * x, fu_: (u) => 0.5 * Math.exp(u), a: 0, bMax: 1.3, bDefault: 1, exact: (b) => 0.5 * (Math.exp(b * b) - 1) },
  power: { label: "3x²(x³ + 1)²", integrand: "3x²(x³ + 1)²", uSub: "u = x³ + 1, du = 3x² dx", fu: "u²", f: (x) => 3 * x * x * (x ** 3 + 1) ** 2, g: (x) => x ** 3 + 1, fu_: (u) => u * u, a: 0, bMax: 1.3, bDefault: 1, exact: (b) => ((b ** 3 + 1) ** 3 - 1) / 3 },
};

export function USubstitution({ params }: SimProps) {
  const [k, setK] = useState<SubCase>((Object.keys(SUB_CASES) as SubCase[]).find((c) => c === params?.case) ?? "cos");
  const c = SUB_CASES[k];
  const [b, setB] = useState(c.bDefault);
  const bb = Math.min(b, c.bMax);
  const ua = c.g(c.a), ub = c.g(bb);
  const areaX = simpson(c.f, c.a, bb), areaU = simpson(c.fu_, ua, ub);
  const H = 250, pw = 225;
  const panel = (f: (x: number) => number, x0: number, x1: number, lo: number, hi: number, ox: number, title: string, axis: string) => {
    const xs = Array.from({ length: 161 }, (_, i) => x0 + ((x1 - x0) * i) / 160);
    const ys = xs.map(f);
    const yMin = Math.min(0, ...ys), yMax = Math.max(0.5, ...ys);
    const sx = scale(x0, x1, ox + 10, ox + pw - 6), sy = scale(yMin, yMax * 1.08, H - 30, 30);
    const curve = xs.map((x, i) => `${i ? "L" : "M"}${sx(x)},${sy(ys[i])}`).join("");
    const sh = xs.filter((x) => x >= lo - 1e-9 && x <= hi + 1e-9);
    const shade = sh.length ? `M${sx(sh[0])},${sy(0)} ` + sh.map((x) => `L${sx(x)},${sy(f(x))}`).join(" ") + ` L${sx(sh[sh.length - 1])},${sy(0)} Z` : "";
    return (
      <g>
        <text x={ox + 10} y={16} fontSize="12" fontWeight="600" fill="var(--ink)">{title}</text>
        <path d={shade} fill="var(--math)" opacity={0.22} />
        <line x1={ox + 10} x2={ox + pw - 6} y1={sy(0)} y2={sy(0)} stroke="var(--muted)" />
        <path d={curve} fill="none" stroke="var(--math)" strokeWidth={2.5} />
        <line x1={sx(lo)} x2={sx(lo)} y1={sy(0)} y2={sy(f(lo))} stroke="var(--math)" strokeDasharray="3 3" />
        <line x1={sx(hi)} x2={sx(hi)} y1={sy(0)} y2={sy(f(hi))} stroke="var(--math)" strokeDasharray="3 3" />
        <text x={sx(lo)} y={H - 14} textAnchor="middle" fontSize="10" fill="var(--muted)">{fmt(lo, 2)}</text>
        <text x={sx(hi)} y={H - 14} textAnchor="middle" fontSize="10" fill="var(--muted)">{fmt(hi, 2)}</text>
        <text x={ox + pw / 2} y={H - 1} textAnchor="middle" fontSize="11" fill="var(--muted)">{axis}</text>
      </g>
    );
  };
  return (
    <SimShell
      subject="mathematics"
      title="u-substitution"
      onReset={() => { setK("cos"); setB(SUB_CASES.cos.bDefault); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Area under ${c.integrand} from ${c.a} to ${fmt(bb, 2)} is ${fmt(areaX, 4)}; area under ${c.fu} from ${fmt(ua, 2)} to ${fmt(ub, 2)} is ${fmt(areaU, 4)}.`} className="block h-auto w-full select-none">
          {panel(c.f, c.a, c.bMax, c.a, bb, 0, `y = ${c.integrand}`, "x")}
          {panel(c.fu_, c.g(c.a), c.g(c.bMax), ua, ub, 245, `y = ${c.fu}`, "u")}
        </svg>
      }
      controls={
        <>
          <Segmented label="Integrand" value={k} options={(Object.keys(SUB_CASES) as SubCase[]).map((v) => ({ value: v, label: SUB_CASES[v].label }))} onChange={(v) => { setK(v); setB(SUB_CASES[v].bDefault); }} />
          <Slider label="Upper limit b" value={bb} min={0.1} max={c.bMax} step={0.05} onChange={setB} />
          <p className="text-sm">Substitute <strong>{c.uSub}</strong>. The limits change too: x = {c.a} → u = {fmt(ua, 2)}, x = {fmt(bb, 2)} → u = {fmt(ub, 2)}.</p>
        </>
      }
      readouts={[
        { label: "Area in x", value: fmt(areaX, 4) },
        { label: "Area in u", value: fmt(areaU, 4) },
        { label: "Exact value", value: fmt(c.exact(bb), 4), emphasis: true },
      ]}
      assumptions={[
        "Both areas are computed numerically (Simpson's rule) and agree with the exact antiderivative, which is the point of the substitution: the shapes differ, the areas don't.",
        "Shaded regions below the axis count as negative area.",
      ]}
    />
  );
}
