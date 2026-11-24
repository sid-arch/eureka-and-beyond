// Calculus simulations: linked f / f′ / f″ graphs, the accumulation function,
// slope fields with solution curves, and Taylor polynomials.

import { useState, type ReactNode } from "react";
import { Math as Tex } from "../ui/Math";
import { curvePath } from "./math-graphs";
import { fmt, num, scale, Segmented, SimShell, Slider, type Params, type SimProps } from "./shell";

const W = 480;
const str = (p: Params | undefined, key: string, fallback: string, allowed: string[]) => {
  const v = p?.[key];
  return typeof v === "string" && allowed.includes(v) ? v : fallback;
};

// A compact coordinate plane whose height can be chosen, so two graphs can
// be stacked (f above f′, or f above its accumulation function).
function Panel({ xMin, xMax, yMin, yMax, h, label, title, children }: {
  xMin: number; xMax: number; yMin: number; yMax: number; h: number; label: string; title: ReactNode; children: ReactNode;
}) {
  const sx = scale(xMin, xMax, 0, W);
  const sy = scale(yMin, yMax, h, 0);
  const xStep = xMax - xMin > 10 ? 2 : 1;
  const yStep = niceStep(yMax - yMin);
  const xs: number[] = [];
  for (let x = Math.ceil(xMin / xStep) * xStep; x <= xMax; x += xStep) xs.push(Number(x.toFixed(6)));
  const ys: number[] = [];
  for (let y = Math.ceil(yMin / yStep) * yStep; y <= yMax; y += yStep) ys.push(Number(y.toFixed(6)));
  return (
    <div className="relative">
      <div className="pointer-events-none absolute left-2 top-1.5 rounded bg-surface/85 px-1.5 py-0.5 text-sm">{title}</div>
      <svg viewBox={`0 0 ${W} ${h}`} role="img" aria-label={label} className="block h-auto w-full touch-none select-none">
        {xs.map((x) => <line key={`gx${x}`} x1={sx(x)} x2={sx(x)} y1={0} y2={h} stroke="var(--line)" strokeWidth={x === 0 ? 0 : 1} />)}
        {ys.map((y) => <line key={`gy${y}`} y1={sy(y)} y2={sy(y)} x1={0} x2={W} stroke="var(--line)" strokeWidth={y === 0 ? 0 : 1} />)}
        {yMin <= 0 && yMax >= 0 && <line x1={0} x2={W} y1={sy(0)} y2={sy(0)} stroke="var(--muted)" strokeWidth={1.5} />}
        {xMin <= 0 && xMax >= 0 && <line y1={0} y2={h} x1={sx(0)} x2={sx(0)} stroke="var(--muted)" strokeWidth={1.5} />}
        {xs.filter((x) => x !== 0 && x > xMin && x < xMax).map((x) => (
          <text key={`lx${x}`} x={sx(x)} y={Math.min(h - 4, Math.max(12, sy(0) + 15))} textAnchor="middle" fontSize="11" fill="var(--muted)">{x}</text>
        ))}
        {ys.filter((y) => y !== 0 && y > yMin && y < yMax).map((y) => (
          <text key={`ly${y}`} x={sx(0) < 30 ? sx(0) + 5 : Math.min(W - 4, sx(0) - 6)} y={sy(y) + 4} textAnchor={sx(0) < 30 ? "start" : "end"} fontSize="11" fill="var(--muted)">{y}</text>
        ))}
        {children}
      </svg>
    </div>
  );
}

function niceStep(range: number) {
  const raw = range / 6;
  const p = 10 ** Math.floor(Math.log10(raw));
  const m = raw / p;
  return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * p;
}

// ---------------------------------------------------------------------------
// f, f′ and f″ linked
// ---------------------------------------------------------------------------

type DFn = { tex: string; dtex: string; f: (x: number) => number; d: (x: number) => number; d2: (x: number) => number; x: [number, number]; y: [number, number]; dy: [number, number] };
const DFUNCS: Record<string, DFn> = {
  cubic: { tex: "x^3 - 3x", dtex: "3x^2 - 3", f: (x) => x ** 3 - 3 * x, d: (x) => 3 * x * x - 3, d2: (x) => 6 * x, x: [-3, 3], y: [-6, 6], dy: [-6, 12] },
  quartic: { tex: "\\tfrac{1}{4}x^4 - x^2", dtex: "x^3 - 2x", f: (x) => x ** 4 / 4 - x * x, d: (x) => x ** 3 - 2 * x, d2: (x) => 3 * x * x - 2, x: [-2.5, 2.5], y: [-2, 4], dy: [-6, 6] },
  sin: { tex: "\\sin x", dtex: "\\cos x", f: Math.sin, d: Math.cos, d2: (x) => -Math.sin(x), x: [-6.5, 6.5], y: [-1.6, 1.6], dy: [-1.6, 1.6] },
  exp: { tex: "e^x", dtex: "e^x", f: Math.exp, d: Math.exp, d2: Math.exp, x: [-3, 2], y: [-1, 7], dy: [-1, 7] },
  ln: { tex: "\\ln x", dtex: "\\tfrac{1}{x}", f: Math.log, d: (x) => 1 / x, d2: (x) => -1 / (x * x), x: [0, 5], y: [-3, 2], dy: [-1, 5] },
};
const DLABEL: Record<string, string> = { cubic: "x³ − 3x", quartic: "¼x⁴ − x²", sin: "sin x", exp: "eˣ", ln: "ln x" };

export function DerivativeGraph({ params }: SimProps) {
  const initFn = str(params, "fn", "cubic", Object.keys(DFUNCS));
  const [fn, setFn] = useState(initFn);
  const F = DFUNCS[fn];
  const lo = F.x[0] + (fn === "ln" ? 0.15 : 0);
  const [a0, setA] = useState(num(params, "a", 1.5, -6, 6));
  const a = Math.min(F.x[1], Math.max(lo, a0));
  const [showTangent, setShowTangent] = useState(true);
  const sx = scale(F.x[0], F.x[1], 0, W);
  const H1 = 260, H2 = 200;
  const sy1 = scale(F.y[0], F.y[1], H1, 0);
  const sy2 = scale(F.dy[0], F.dy[1], H2, 0);
  const fa = F.f(a), da = F.d(a), d2a = F.d2(a);
  const tangent = (x: number) => fa + da * (x - a);
  const near0 = (v: number) => Math.abs(v) < 1e-9;
  const trend = near0(da) ? "horizontal tangent" : da > 0 ? "increasing" : "decreasing";
  const bend = near0(d2a) ? "possible inflection" : d2a > 0 ? "concave up" : "concave down";
  const start = fn === "ln" ? 0.02 : F.x[0];
  return (
    <SimShell
      subject="mathematics"
      title="A function and its derivative"
      onReset={() => { setFn(initFn); setA(1.5); setShowTangent(true); }}
      visual={
        <div className="divide-y divide-line">
          <Panel xMin={F.x[0]} xMax={F.x[1]} yMin={F.y[0]} yMax={F.y[1]} h={H1} title={<Tex latex={`f(x) = ${F.tex}`} />}
            label={`Graph of f(x) = ${DLABEL[fn]} with the tangent line at x = ${fmt(a)}; slope ${fmt(da)}.`}>
            {showTangent && <path d={curvePath(tangent, F.x[0], F.x[1], sx, sy1, F.y, 2)} stroke="var(--chem)" strokeWidth={2.5} fill="none" />}
            <path d={curvePath(F.f, start, F.x[1], sx, sy1, F.y)} stroke="var(--math)" strokeWidth={3.5} fill="none" />
            <line x1={sx(a)} x2={sx(a)} y1={0} y2={H1} stroke="var(--muted)" strokeDasharray="4 4" />
            <circle cx={sx(a)} cy={sy1(fa)} r={6} fill="var(--math)" />
          </Panel>
          <Panel xMin={F.x[0]} xMax={F.x[1]} yMin={F.dy[0]} yMax={F.dy[1]} h={H2} title={<Tex latex={`f'(x) = ${F.dtex}`} />}
            label={`Graph of the derivative f′(x); at x = ${fmt(a)} its value is ${fmt(da)}.`}>
            <path d={curvePath(F.d, start, F.x[1], sx, sy2, F.dy)} stroke="var(--physics)" strokeWidth={3} fill="none" />
            <line x1={sx(a)} x2={sx(a)} y1={0} y2={H2} stroke="var(--muted)" strokeDasharray="4 4" />
            <circle cx={sx(a)} cy={sy2(da)} r={6} fill="var(--chem)" />
          </Panel>
        </div>
      }
      controls={
        <>
          <Segmented label="Function f(x)" value={fn} options={Object.keys(DFUNCS).map((k) => ({ value: k, label: DLABEL[k] }))} onChange={(v) => { setFn(v); setA(DFUNCS[v].x[0] < 1 && DFUNCS[v].x[1] > 1 ? 1 : 1.5); }} />
          <Slider label={<>Point <Tex latex="x = a" /></>} value={a} min={lo} max={F.x[1]} step={0.05} onChange={setA} />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={showTangent} onChange={(e) => setShowTangent(e.target.checked)} className="size-4" /> Show the tangent line</label>
          <p className="text-xs text-muted">The orange dot on the lower graph sits at height equal to the slope of the orange tangent line above.</p>
        </>
      }
      readouts={[
        { label: "f(a)", value: fmt(fa, 3) },
        { label: "f′(a), slope", value: fmt(da, 3), emphasis: true },
        { label: "f″(a)", value: fmt(d2a, 3) },
        { label: "At x = a, f is", value: `${trend}, ${bend}` },
      ]}
      assumptions={[
        "Each derivative is the exact formula shown, not a numerical estimate.",
        "Where f′ > 0, f increases; where f′ < 0, f decreases; a sign change of f′ marks a relative extremum.",
        "Where f″ > 0 the graph is concave up (f′ increasing); where f″ < 0 it is concave down.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Accumulation function F(x) = ∫ₐˣ f(t) dt
// ---------------------------------------------------------------------------

type AFn = { tex: string; label: string; f: (x: number) => number; F: (x: number) => number; x: [number, number]; y: [number, number]; Fy: [number, number] };
const AFUNCS: Record<string, AFn> = {
  linear: { tex: "2 - t", label: "2 − t", f: (t) => 2 - t, F: (x) => 2 * x - (x * x) / 2, x: [0, 5], y: [-3, 2.5], Fy: [-3, 2.5] },
  sin: { tex: "\\sin t", label: "sin t", f: Math.sin, F: (x) => 1 - Math.cos(x), x: [0, 7], y: [-1.3, 1.3], Fy: [-0.5, 2.5] },
  parabola: { tex: "t^2 - 1", label: "t² − 1", f: (t) => t * t - 1, F: (x) => (x ** 3) / 3 - x, x: [0, 2.5], y: [-1.5, 5.5], Fy: [-1, 3] },
  velocity: { tex: "3 - t", label: "3 − t", f: (t) => 3 - t, F: (x) => 3 * x - (x * x) / 2, x: [0, 7], y: [-4.5, 3.5], Fy: [-3.5, 5] },
};

export function AccumulationSim({ params }: SimProps) {
  const initFn = str(params, "fn", "linear", Object.keys(AFUNCS));
  const [fn, setFn] = useState(initFn);
  const A = AFUNCS[fn];
  const [x0, setX] = useState(num(params, "x", 3, 0, 7));
  const x = Math.min(A.x[1], Math.max(A.x[0], x0));
  const H1 = 240, H2 = 200;
  const sx = scale(A.x[0], A.x[1], 0, W);
  const sy1 = scale(A.y[0], A.y[1], H1, 0);
  const sy2 = scale(A.Fy[0], A.Fy[1], H2, 0);
  // Shade the signed area from 0 to x as thin vertical strips coloured by sign.
  const strips: ReactNode[] = [];
  const n = 120;
  for (let i = 0; i < n; i++) {
    const t0 = (x * i) / n, t1 = (x * (i + 1)) / n;
    const v = A.f((t0 + t1) / 2);
    strips.push(<rect key={i} x={sx(t0)} width={Math.max(0.5, sx(t1) - sx(t0) + 0.4)} y={v >= 0 ? sy1(v) : sy1(0)} height={Math.abs(sy1(v) - sy1(0))} fill={v >= 0 ? "var(--math)" : "var(--chem)"} opacity={0.28} />);
  }
  const Fx = A.F(x);
  return (
    <SimShell
      subject="mathematics"
      title="The accumulation function"
      onReset={() => { setFn(initFn); setX(3); }}
      visual={
        <div className="divide-y divide-line">
          <Panel xMin={A.x[0]} xMax={A.x[1]} yMin={A.y[0]} yMax={A.y[1]} h={H1} title={<Tex latex={`f(t) = ${A.tex}`} />}
            label={`Graph of f(t) = ${A.label} with the signed area from 0 to ${fmt(x)} shaded; the signed area is ${fmt(Fx)}.`}>
            {strips}
            <path d={curvePath(A.f, A.x[0], A.x[1], sx, sy1, A.y)} stroke="var(--math)" strokeWidth={3.5} fill="none" />
            <line x1={sx(x)} x2={sx(x)} y1={0} y2={H1} stroke="var(--muted)" strokeDasharray="4 4" />
          </Panel>
          <Panel xMin={A.x[0]} xMax={A.x[1]} yMin={A.Fy[0]} yMax={A.Fy[1]} h={H2} title={<Tex latex={`F(x) = \\int_0^x f(t)\\,dt`} />}
            label={`Graph of the accumulation function F; F(${fmt(x)}) = ${fmt(Fx)}.`}>
            <path d={curvePath(A.F, A.x[0], x, sx, sy2, A.Fy)} stroke="var(--physics)" strokeWidth={3.5} fill="none" />
            <path d={curvePath(A.F, x, A.x[1], sx, sy2, A.Fy)} stroke="var(--physics)" strokeWidth={1.5} strokeDasharray="4 5" fill="none" opacity={0.6} />
            <circle cx={sx(x)} cy={sy2(Fx)} r={6} fill="var(--physics)" />
          </Panel>
        </div>
      }
      controls={
        <>
          <Segmented label="Integrand f(t)" value={fn} options={Object.keys(AFUNCS).map((k) => ({ value: k, label: AFUNCS[k].label }))} onChange={setFn} />
          <Slider label={<>Upper limit <Tex latex="x" /></>} value={x} min={A.x[0]} max={A.x[1]} step={0.05} onChange={setX} />
          <p className="text-xs text-muted"><span className="font-semibold text-math">Purple</span> area counts as positive and <span className="font-semibold text-chem">orange</span> area (below the axis) as negative. The lower graph records their total.</p>
        </>
      }
      readouts={[
        { label: "F(x), signed area", value: fmt(Fx, 3), emphasis: true },
        { label: "F′(x) = f(x)", value: fmt(A.f(x), 3) },
        { label: "F is", value: Math.abs(A.f(x)) < 1e-9 ? "at a critical point" : A.f(x) > 0 ? "increasing" : "decreasing" },
      ]}
      assumptions={[
        "F(x) is computed exactly from an antiderivative; the shading is drawn with thin strips.",
        "By the Fundamental Theorem of Calculus, F′(x) = f(x): F rises where f is positive and falls where f is negative.",
        "With f(t) = 3 − t read as a velocity, F(x) is the displacement from the start, not the total distance traveled.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Slope fields and solution curves
// ---------------------------------------------------------------------------

type DE = { tex: string; label: string; f: (x: number, y: number) => number };
const DES: Record<string, DE> = {
  growth: { tex: "\\frac{dy}{dx} = 0.5y", label: "0.5y", f: (_x, y) => 0.5 * y },
  x: { tex: "\\frac{dy}{dx} = x", label: "x", f: (x) => x },
  "x+y": { tex: "\\frac{dy}{dx} = x + y", label: "x + y", f: (x, y) => x + y },
  "x-y": { tex: "\\frac{dy}{dx} = x - y", label: "x − y", f: (x, y) => x - y },
  circle: { tex: "\\frac{dy}{dx} = -\\frac{x}{y}", label: "−x/y", f: (x, y) => -x / y },
  logistic: { tex: "\\frac{dy}{dx} = 0.8y\\left(1 - \\frac{y}{4}\\right)", label: "logistic", f: (_x, y) => 0.8 * y * (1 - y / 4) },
};

function rk4Path(f: DE["f"], x0: number, y0: number, dir: 1 | -1, xLim: number, yLim: number) {
  const pts: [number, number][] = [[x0, y0]];
  let x = x0, y = y0;
  const h = 0.02 * dir;
  for (let i = 0; i < 600; i++) {
    const k1 = f(x, y), k2 = f(x + h / 2, y + (h / 2) * k1), k3 = f(x + h / 2, y + (h / 2) * k2), k4 = f(x + h, y + h * k3);
    const ny = y + (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
    if (!Number.isFinite(ny) || Math.abs(ny) > yLim * 1.5 || Math.abs(x + h) > xLim) break;
    x += h; y = ny;
    pts.push([x, y]);
  }
  return pts;
}

export function SlopeField({ params }: SimProps) {
  const initEq = str(params, "eq", "x-y", Object.keys(DES));
  const [eq, setEq] = useState(initEq);
  const [x0, setX0] = useState(num(params, "x0", 0, -5, 5));
  const [y0, setY0] = useState(num(params, "y0", 1, -5, 5));
  const D = DES[eq];
  const L = 5, Hh = 400;
  const sx = scale(-L, L, 0, W), sy = scale(-L * (Hh / W) * 1.2, L * (Hh / W) * 1.2, Hh, 0);
  const yMax = L * (Hh / W) * 1.2;
  const segs: ReactNode[] = [];
  for (let gx = -L + 0.5; gx < L; gx += 0.5) {
    for (let gy = -Math.floor(yMax * 2) / 2; gy <= yMax; gy += 0.5) {
      const m = D.f(gx, gy);
      if (!Number.isFinite(m)) continue;
      // Draw a short segment of fixed screen length with slope m.
      const dxs = 1, dys = m * (sx(1) - sx(0)) / (sy(0) - sy(1));
      const len = Math.hypot(dxs, dys);
      const ux = (9 * dxs) / len, uy = (9 * dys) / len;
      segs.push(<line key={`${gx},${gy}`} x1={sx(gx) - ux} y1={sy(gy) + uy} x2={sx(gx) + ux} y2={sy(gy) - uy} stroke="var(--muted)" strokeWidth={1.4} strokeLinecap="round" />);
    }
  }
  const valid = Number.isFinite(D.f(x0, y0));
  const path = valid ? [...rk4Path(D.f, x0, y0, -1, L, yMax).reverse(), ...rk4Path(D.f, x0, y0, 1, L, yMax).slice(1)] : [];
  const d = path.map(([x, y], i) => `${i ? "L" : "M"}${sx(x).toFixed(1)},${sy(y).toFixed(1)}`).join("");
  const slope = D.f(x0, y0);
  return (
    <SimShell
      subject="mathematics"
      title="Slope fields"
      onReset={() => { setEq(initEq); setX0(0); setY0(1); }}
      visual={
        <div className="relative">
          <div className="pointer-events-none absolute left-2 top-1.5 rounded bg-surface/85 px-1.5 py-0.5 text-sm"><Tex latex={D.tex} /></div>
          <svg viewBox={`0 0 ${W} ${Hh}`} role="img" aria-label={`Slope field for dy/dx = ${D.label}, with the solution curve through (${fmt(x0)}, ${fmt(y0)}).`} className="block h-auto w-full select-none">
            <line x1={0} x2={W} y1={sy(0)} y2={sy(0)} stroke="var(--line)" strokeWidth={1.5} />
            <line y1={0} y2={Hh} x1={sx(0)} x2={sx(0)} stroke="var(--line)" strokeWidth={1.5} />
            {segs}
            {d && <path d={d} stroke="var(--math)" strokeWidth={3.5} fill="none" />}
            <circle cx={sx(x0)} cy={sy(y0)} r={6} fill="var(--chem)" />
          </svg>
        </div>
      }
      controls={
        <>
          <Segmented label="Differential equation" value={eq} options={Object.keys(DES).map((k) => ({ value: k, label: DES[k].label }))} onChange={setEq} />
          <Slider label={<>Start <Tex latex="x_0" /></>} value={x0} min={-4.5} max={4.5} step={0.25} onChange={setX0} />
          <Slider label={<>Start <Tex latex="y_0" /></>} value={y0} min={-4} max={4} step={0.25} onChange={setY0} />
          <p className="text-xs text-muted">Each short segment has the slope the equation gives at that point. The curve follows the segments through the orange starting point.</p>
        </>
      }
      readouts={[
        { label: "Slope at start", value: valid ? fmt(slope, 3) : "undefined", emphasis: true },
        { label: "Start point", value: `(${fmt(x0)}, ${fmt(y0)})` },
      ]}
      assumptions={[
        "Segments are drawn every 0.5 units, each with slope dy/dx evaluated at its center.",
        "The solution curve is computed numerically (fourth-order Runge–Kutta, step 0.02) forward and backward from the start point.",
        "For dy/dx = −x/y, solutions are circles; the slope is undefined on the x-axis, where the curve stops.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Taylor polynomials about x = 0
// ---------------------------------------------------------------------------

type TFn = { tex: string; label: string; f: (x: number) => number; coef: (k: number) => number; x: [number, number]; y: [number, number]; radius: number };
const fact = (k: number) => { let p = 1; for (let i = 2; i <= k; i++) p *= i; return p; };
const TFUNCS: Record<string, TFn> = {
  sin: { tex: "\\sin x", label: "sin x", f: Math.sin, coef: (k) => (k % 2 === 0 ? 0 : (k % 4 === 1 ? 1 : -1) / fact(k)), x: [-8, 8], y: [-3, 3], radius: Infinity },
  cos: { tex: "\\cos x", label: "cos x", f: Math.cos, coef: (k) => (k % 2 === 1 ? 0 : (k % 4 === 0 ? 1 : -1) / fact(k)), x: [-8, 8], y: [-3, 3], radius: Infinity },
  exp: { tex: "e^x", label: "eˣ", f: Math.exp, coef: (k) => 1 / fact(k), x: [-4, 3], y: [-2, 12], radius: Infinity },
  ln: { tex: "\\ln(1 + x)", label: "ln(1 + x)", f: (x) => Math.log(1 + x), coef: (k) => (k === 0 ? 0 : (k % 2 === 1 ? 1 : -1) / k), x: [-1.5, 2.5], y: [-3, 2], radius: 1 },
  geo: { tex: "\\frac{1}{1 - x}", label: "1/(1 − x)", f: (x) => 1 / (1 - x), coef: () => 1, x: [-2, 1.5], y: [-2, 8], radius: 1 },
};

const polyTex = (T: TFn, n: number) => {
  const terms: string[] = [];
  for (let k = 0; k <= n; k++) {
    const c = T.coef(k);
    if (Math.abs(c) < 1e-15) continue;
    const den = Math.round(1 / Math.abs(c));
    const xp = k === 0 ? "1" : k === 1 ? "x" : `x^{${k}}`;
    const body = den === 1 ? xp : `\\tfrac{${xp}}{${den}}`;
    terms.push(`${c < 0 ? "-" : terms.length ? "+" : ""} ${body}`);
  }
  if (terms.length > 4) return `${terms.slice(0, 3).join(" ")} + \\cdots`;
  return terms.join(" ") || "0";
};

export function TaylorSim({ params }: SimProps) {
  const initFn = str(params, "fn", "sin", Object.keys(TFUNCS));
  const [fn, setFn] = useState(initFn);
  const [n, setN] = useState(num(params, "n", 3, 0, 15));
  const [xe, setXe] = useState(num(params, "x", 1, -6, 6));
  const T = TFUNCS[fn];
  const P = (x: number) => { let s = 0; for (let k = 0; k <= n; k++) s += T.coef(k) * x ** k; return s; };
  const xEval = Math.min(T.x[1], Math.max(T.x[0], xe));
  const sx = scale(T.x[0], T.x[1], 0, W);
  const Hh = 380;
  const sy = scale(T.y[0], T.y[1], Hh, 0);
  const fv = T.f(xEval), pv = P(xEval);
  const domainLo = fn === "ln" ? -0.999 : T.x[0];
  const fEnd = fn === "geo" ? 0.995 : T.x[1];
  return (
    <SimShell
      subject="mathematics"
      title="Taylor polynomials"
      onReset={() => { setFn(initFn); setN(3); setXe(1); }}
      visual={
        <Panel xMin={T.x[0]} xMax={T.x[1]} yMin={T.y[0]} yMax={T.y[1]} h={Hh} title={<Tex latex={`f(x) = ${T.tex}`} />}
          label={`Graph of f(x) = ${T.label} and its degree-${n} Taylor polynomial about 0. At x = ${fmt(xEval)}, f = ${fmt(fv)} and P = ${fmt(pv)}.`}>
          {Number.isFinite(T.radius) && <rect x={sx(-T.radius)} width={sx(T.radius) - sx(-T.radius)} y={0} height={Hh} fill="var(--success)" opacity={0.08} />}
          <path d={curvePath(T.f, domainLo, fEnd, sx, sy, T.y, 400)} stroke="var(--math)" strokeWidth={3.5} fill="none" />
          {fn === "geo" && <path d={curvePath(T.f, 1.005, T.x[1], sx, sy, T.y)} stroke="var(--math)" strokeWidth={3.5} fill="none" />}
          <path d={curvePath(P, T.x[0], T.x[1], sx, sy, T.y, 400)} stroke="var(--chem)" strokeWidth={2.5} fill="none" />
          <line x1={sx(xEval)} x2={sx(xEval)} y1={0} y2={Hh} stroke="var(--muted)" strokeDasharray="4 4" />
          {Number.isFinite(fv) && <circle cx={sx(xEval)} cy={sy(Math.max(T.y[0] - 1, Math.min(T.y[1] + 1, fv)))} r={5} fill="var(--math)" />}
          <circle cx={sx(xEval)} cy={sy(Math.max(T.y[0] - 1, Math.min(T.y[1] + 1, pv)))} r={5} fill="var(--chem)" />
        </Panel>
      }
      controls={
        <>
          <Segmented label="Function" value={fn} options={Object.keys(TFUNCS).map((k) => ({ value: k, label: TFUNCS[k].label }))} onChange={setFn} />
          <Slider label="Degree n" value={n} min={0} max={15} step={1} onChange={setN} />
          <Slider label={<>Evaluate at <Tex latex="x" /></>} value={xEval} min={T.x[0]} max={T.x[1]} step={0.05} onChange={setXe} />
          <div className="overflow-x-auto rounded-lg bg-math-soft px-3 py-2 text-sm"><Tex latex={`P_{${n}}(x) = ${polyTex(T, n)}`} /></div>
          {Number.isFinite(T.radius) && <p className="text-xs text-muted">The green band is the interval of convergence, |x| &lt; {T.radius}. Outside it, adding terms makes the polynomial worse.</p>}
        </>
      }
      readouts={[
        { label: "f(x)", value: Number.isFinite(fv) ? fmt(fv, 5) : "undefined" },
        { label: `P${n}(x)`, value: fmt(pv, 5), emphasis: true },
        { label: "Error |f − P|", value: Number.isFinite(fv) ? fmt(Math.abs(fv - pv), 5) : "—" },
      ]}
      assumptions={[
        "All polynomials are centered at x = 0 (Maclaurin polynomials), with exact coefficients f⁽ᵏ⁾(0)/k!.",
        "sin x, cos x and eˣ have series that converge for every x; ln(1 + x) and 1/(1 − x) converge only for |x| < 1 (and ln(1 + x) also at x = 1).",
        "Near the center, a higher degree means a better approximation; far from it, many terms may be needed.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Optimization: the open box cut from a rectangular sheet
// ---------------------------------------------------------------------------

export function OptimizationBox({ params }: SimProps) {
  const [L, setL] = useState(num(params, "length", 12, 6, 20));
  const [Wd, setWd] = useState(num(params, "width", 12, 6, 20));
  const [x0, setX] = useState(num(params, "x", 1, 0, 10));
  const xMax = Math.min(L, Wd) / 2;
  const x = Math.min(xMax, Math.max(0, x0));
  const V = (t: number) => t * (L - 2 * t) * (Wd - 2 * t);
  const dV = (t: number) => 12 * t * t - 4 * (L + Wd) * t + L * Wd;
  const xStar = (L + Wd - Math.sqrt(L * L - L * Wd + Wd * Wd)) / 6;
  const vStar = V(xStar);
  // Sheet drawing: fit the sheet into a 480 × 210 box.
  const SH = 210;
  const k = Math.min((W - 40) / L, (SH - 30) / Wd);
  const ox = (W - L * k) / 2, oy = (SH - Wd * k) / 2;
  const cut = x * k;
  const yTop = Math.max(10, vStar * 1.4); // headroom so the title doesn't cover the peak
  const sx = scale(0, xMax, 0, W), sy = scale(-yTop * 0.08, yTop, 220, 0);
  return (
    <SimShell
      subject="mathematics"
      title="Optimizing an open box"
      onReset={() => { setL(12); setWd(12); setX(1); }}
      visual={
        <div className="divide-y divide-line">
          <svg viewBox={`0 0 ${W} ${SH}`} role="img" aria-label={`A ${L} by ${Wd} sheet with ${fmt(x)}-unit squares cut from each corner; the sides fold up to make an open box.`} className="block h-auto w-full">
            <rect x={ox} y={oy} width={L * k} height={Wd * k} fill="var(--math)" opacity={0.16} stroke="var(--math)" strokeWidth={2} />
            {[[ox, oy], [ox + L * k - cut, oy], [ox, oy + Wd * k - cut], [ox + L * k - cut, oy + Wd * k - cut]].map(([cx, cy], i) => (
              <rect key={i} x={cx} y={cy} width={cut} height={cut} fill="var(--surface)" stroke="var(--chem)" strokeWidth={2} strokeDasharray="5 4" />
            ))}
            {cut > 1 && <rect x={ox + cut} y={oy + cut} width={Math.max(0, L * k - 2 * cut)} height={Math.max(0, Wd * k - 2 * cut)} fill="none" stroke="var(--math)" strokeDasharray="6 5" />}
            <text x={ox + L * k / 2} y={oy - 6} textAnchor="middle" fontSize="13" fill="var(--muted)">{L}</text>
            <text x={ox - 8} y={oy + Wd * k / 2} textAnchor="end" fontSize="13" fill="var(--muted)">{Wd}</text>
            {cut > 14 && <text x={ox + cut / 2} y={oy + cut / 2 + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--chem)">x</text>}
          </svg>
          <Panel xMin={0} xMax={xMax} yMin={-yTop * 0.08} yMax={yTop} h={220} title={<Tex latex={`V(x) = x(${L} - 2x)(${Wd} - 2x)`} />}
            label={`Graph of box volume against cut size. At x = ${fmt(x)} the volume is ${fmt(V(x))}; the maximum is ${fmt(vStar)} at x = ${fmt(xStar, 3)}.`}>
            <path d={curvePath(V, 0, xMax, sx, sy, [-yTop * 0.08, yTop])} stroke="var(--math)" strokeWidth={3.5} fill="none" />
            <line x1={sx(xStar)} x2={sx(xStar)} y1={0} y2={220} stroke="var(--success)" strokeDasharray="5 4" />
            <circle cx={sx(x)} cy={sy(V(x))} r={6} fill="var(--chem)" />
          </Panel>
        </div>
      }
      controls={
        <>
          <Slider label={<>Cut size <Tex latex="x" /></>} value={x} min={0} max={xMax} step={0.05} onChange={setX} />
          <div className="grid grid-cols-2 gap-3">
            <Slider label="Sheet length" value={L} min={6} max={20} step={1} onChange={setL} />
            <Slider label="Sheet width" value={Wd} min={6} max={20} step={1} onChange={setWd} />
          </div>
          <p className="text-xs text-muted">The green dashed line marks where V′(x) = 0 inside the allowed interval 0 &lt; x &lt; {fmt(xMax)}.</p>
        </>
      }
      readouts={[
        { label: "Volume V(x)", value: fmt(V(x), 2), emphasis: true },
        { label: "V′(x)", value: fmt(dV(x), 2) },
        { label: "Best cut x*", value: fmt(xStar, 3) },
        { label: "Maximum volume", value: fmt(vStar, 2), emphasis: true },
      ]}
      assumptions={[
        "Squares of side x are cut from all four corners and the flaps fold up; there is no lid.",
        "The volume x(L − 2x)(W − 2x) is only meaningful for 0 < x < half the shorter side.",
        "The best cut solves V′(x) = 12x² − 4(L + W)x + LW = 0, taking the smaller root (the other root lies outside the allowed interval).",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Volumes: discs, washers and known cross sections
// ---------------------------------------------------------------------------

type VMode = "disc" | "washer" | "squares" | "semicircles";
const VMODES: Record<VMode, { label: string; tex: string; area: (x: number) => number; exact: number; exactTex: string; note: string }> = {
  disc: { label: "Discs", tex: "y = \\sqrt{x}", area: (x) => Math.PI * x, exact: 8 * Math.PI, exactTex: "\\pi\\int_0^4 (\\sqrt{x})^2\\,dx = 8\\pi", note: "Region under y = √x on [0, 4], revolved about the x-axis." },
  washer: { label: "Washers", tex: "y = \\sqrt{x},\\ y = \\tfrac{x}{2}", area: (x) => Math.PI * (x - (x * x) / 4), exact: (8 * Math.PI) / 3, exactTex: "\\pi\\int_0^4 \\left(x - \\tfrac{x^2}{4}\\right)dx = \\tfrac{8\\pi}{3}", note: "Region between y = √x (outer) and y = x/2 (inner), revolved about the x-axis." },
  squares: { label: "Squares", tex: "y = \\sqrt{x}", area: (x) => x, exact: 8, exactTex: "\\int_0^4 (\\sqrt{x})^2\\,dx = 8", note: "Base: the region under y = √x on [0, 4]. Cross sections perpendicular to the x-axis are squares." },
  semicircles: { label: "Semicircles", tex: "y = \\sqrt{x}", area: (x) => (Math.PI * x) / 8, exact: Math.PI, exactTex: "\\int_0^4 \\tfrac{\\pi}{8}(\\sqrt{x})^2\\,dx = \\pi", note: "Same base; cross sections are semicircles with diameter √x." },
};

export function VolumeSim({ params }: SimProps) {
  const initMode = str(params, "mode", "disc", Object.keys(VMODES)) as VMode;
  const [mode, setMode] = useState<VMode>(initMode);
  const [n, setN] = useState(num(params, "n", 8, 2, 40));
  const [xs, setXs] = useState(num(params, "x", 2, 0, 4));
  const M = VMODES[mode];
  const H = 330, MAIN = 330;
  const sx = scale(-0.3, 4.4, 10, MAIN - 6);
  const revolve = mode === "disc" || mode === "washer";
  const sy = revolve ? scale(-2.6, 2.6, H - 10, 10) : scale(-0.4, 2.4, H - 20, 20);
  const outer = Math.sqrt, inner = (x: number) => (mode === "washer" ? x / 2 : 0);
  const dx = 4 / n;
  // Right-endpoint slices (a midpoint sum would be exact for the linear A(x) of the disc and square cases).
  const approx = Array.from({ length: n }, (_, i) => M.area((i + 1) * dx) * dx).reduce((a, b) => a + b, 0);
  const slices: ReactNode[] = [];
  for (let i = 0; i < n; i++) {
    const xm = (i + 0.5) * dx, xr = (i + 1) * dx;
    const R = outer(xr), rIn = inner(xr);
    if (revolve) {
      const rxO = Math.max(1, (sx(R * 0.32) - sx(0)));
      slices.push(<ellipse key={`o${i}`} cx={sx(xm)} cy={sy(0)} rx={rxO} ry={sy(0) - sy(R)} fill="var(--math)" opacity={0.18} stroke="var(--math)" strokeWidth={1} />);
      if (rIn > 0) slices.push(<ellipse key={`i${i}`} cx={sx(xm)} cy={sy(0)} rx={Math.max(1, sx(rIn * 0.32) - sx(0))} ry={sy(0) - sy(rIn)} fill="var(--surface)" stroke="var(--physics)" strokeWidth={1} />);
    } else {
      slices.push(<rect key={`s${i}`} x={sx(i * dx)} width={sx(dx) - sx(0)} y={sy(R)} height={sy(0) - sy(R)} fill="var(--math)" opacity={0.15} stroke="var(--math)" strokeWidth={0.8} />);
    }
  }
  const Rs = outer(xs), ri = inner(xs);
  const curve = (f: (x: number) => number, sign = 1) => curvePath((x) => sign * f(x), 0, 4, sx, sy, revolve ? [-2.6, 2.6] : [-0.4, 2.4]);
  // Face-on view of the highlighted cross section, drawn at a fixed scale (1 unit = 34 px).
  const cx = MAIN + (W - MAIN) / 2, cy = H / 2, u = 34;
  let face: ReactNode;
  if (mode === "disc") face = <circle cx={cx} cy={cy} r={Rs * u} fill="var(--math)" opacity={0.35} stroke="var(--math)" strokeWidth={2} />;
  else if (mode === "washer") face = <g><circle cx={cx} cy={cy} r={Rs * u} fill="var(--math)" opacity={0.35} stroke="var(--math)" strokeWidth={2} /><circle cx={cx} cy={cy} r={ri * u} fill="var(--surface)" stroke="var(--physics)" strokeWidth={2} /></g>;
  else if (mode === "squares") face = <rect x={cx - (Rs * u) / 2} y={cy - (Rs * u) / 2} width={Rs * u} height={Rs * u} fill="var(--math)" opacity={0.35} stroke="var(--math)" strokeWidth={2} />;
  else { const rr = (Rs * u) / 2; face = <path d={`M${cx - rr},${cy + rr / 2} A${rr},${rr} 0 0 1 ${cx + rr},${cy + rr / 2} Z`} fill="var(--math)" opacity={0.35} stroke="var(--math)" strokeWidth={2} />; }
  return (
    <SimShell
      subject="mathematics"
      title="Volumes by slicing"
      onReset={() => { setMode(initMode); setN(8); setXs(2); }}
      visual={
        <div className="relative">
          <div className="pointer-events-none absolute left-2 top-1.5 rounded bg-surface/85 px-1.5 py-0.5 text-sm"><Tex latex={M.tex} /></div>
          <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${M.note} ${n} slices approximate the volume as ${fmt(approx, 3)}; the exact volume is ${fmt(M.exact, 3)}. The highlighted slice at x = ${fmt(xs)} has area ${fmt(M.area(xs), 3)}.`} className="block h-auto w-full select-none">
            <line x1={sx(-0.3)} x2={sx(4.4)} y1={sy(0)} y2={sy(0)} stroke="var(--muted)" strokeWidth={1.5} />
            {slices}
            <path d={curve(outer)} stroke="var(--math)" strokeWidth={3} fill="none" />
            {revolve && <path d={curve(outer, -1)} stroke="var(--math)" strokeWidth={2} strokeDasharray="5 4" fill="none" />}
            {mode === "washer" && <path d={curve(inner)} stroke="var(--physics)" strokeWidth={3} fill="none" />}
            {mode === "washer" && <path d={curve(inner, -1)} stroke="var(--physics)" strokeWidth={2} strokeDasharray="5 4" fill="none" />}
            <line x1={sx(xs)} x2={sx(xs)} y1={revolve ? sy(-Rs) : sy(0)} y2={sy(Rs)} stroke="var(--chem)" strokeWidth={3} />
            {[0, 1, 2, 3, 4].map((t) => <text key={t} x={sx(t)} y={sy(0) + 15} textAnchor="middle" fontSize="11" fill="var(--muted)">{t}</text>)}
            <line x1={MAIN} x2={MAIN} y1={10} y2={H - 10} stroke="var(--line)" />
            <text x={cx} y={24} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--muted)">Slice at x = {fmt(xs)}</text>
            {face}
            <text x={cx} y={H - 16} textAnchor="middle" fontSize="12" fill="var(--muted)">A(x) = {fmt(M.area(xs), 3)}</text>
          </svg>
        </div>
      }
      controls={
        <>
          <Segmented label="Method" value={mode} options={(Object.keys(VMODES) as VMode[]).map((k) => ({ value: k, label: VMODES[k].label }))} onChange={setMode} />
          <Slider label="Number of slices" value={n} min={2} max={40} step={1} onChange={setN} />
          <Slider label={<>Highlighted slice at <Tex latex="x" /></>} value={xs} min={0} max={4} step={0.05} onChange={setXs} />
          <div className="overflow-x-auto rounded-lg bg-math-soft px-3 py-2 text-sm"><Tex latex={`V = ${M.exactTex}`} /></div>
        </>
      }
      readouts={[
        { label: `Sum of ${n} slices`, value: fmt(approx, 4), emphasis: true },
        { label: "Exact volume", value: fmt(M.exact, 4), emphasis: true },
        { label: "Slice area A(x)", value: fmt(M.area(xs), 4) },
      ]}
      assumptions={[
        M.note,
        "Each slice has thickness Δx = 4/n and uses the cross-sectional area at its right edge; as n grows, the sum approaches the integral of A(x).",
        "In the revolution views, circular slices are drawn as ellipses (an oblique view); the panel on the right shows one slice face-on.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Infinite series: terms and partial sums
// ---------------------------------------------------------------------------

type SFn = { label: string; tex: string; term: (k: number) => number; limit: number | null; limitTex: string; note: string };
const SERIES: Record<string, SFn> = {
  geometric: { label: "Σ (1/2)ⁿ", tex: "\\sum_{n=1}^{\\infty} \\left(\\tfrac{1}{2}\\right)^n", term: (k) => 0.5 ** k, limit: 1, limitTex: "1", note: "Geometric with r = 1/2: converges to a/(1 − r) = (1/2)/(1/2) = 1." },
  harmonic: { label: "Σ 1/n", tex: "\\sum_{n=1}^{\\infty} \\frac{1}{n}", term: (k) => 1 / k, limit: null, limitTex: "\\infty", note: "Harmonic series: the terms go to 0, but the partial sums grow without bound (about ln n)." },
  p2: { label: "Σ 1/n²", tex: "\\sum_{n=1}^{\\infty} \\frac{1}{n^2}", term: (k) => 1 / (k * k), limit: (Math.PI * Math.PI) / 6, limitTex: "\\tfrac{\\pi^2}{6}", note: "A p-series with p = 2 > 1: converges, to π²/6 ≈ 1.645." },
  alternating: { label: "Σ (−1)ⁿ⁺¹/n", tex: "\\sum_{n=1}^{\\infty} \\frac{(-1)^{n+1}}{n}", term: (k) => (k % 2 === 1 ? 1 : -1) / k, limit: Math.LN2, limitTex: "\\ln 2", note: "Alternating harmonic series: converges conditionally, to ln 2 ≈ 0.693. Partial sums zigzag around the limit." },
  factorial: { label: "Σ 1/n!", tex: "\\sum_{n=0}^{\\infty} \\frac{1}{n!}", term: (k) => { let p = 1; for (let i = 2; i < k; i++) p *= i; return 1 / p; }, limit: Math.E, limitTex: "e", note: "Terms 1/0!, 1/1!, 1/2!, …: converges very fast, to e ≈ 2.718." },
};

export function SeriesSim({ params }: SimProps) {
  const initS = str(params, "series", "geometric", Object.keys(SERIES));
  const [key, setKey] = useState(initS);
  const [N, setN] = useState(num(params, "n", 10, 1, 60));
  const S = SERIES[key];
  const terms = Array.from({ length: N }, (_, i) => S.term(i + 1));
  const sums: number[] = [];
  terms.reduce((acc, t) => { const v = acc + t; sums.push(v); return v; }, 0);
  const sN = sums[N - 1];
  const tMax = Math.max(...terms.map(Math.abs), 0.1);
  const sMax = Math.max(...sums, S.limit ?? 0) * 1.15;
  const sMin = Math.min(0, ...sums);
  const H1 = 170, H2 = 230;
  const sx = scale(0, N + 1, 0, W);
  const tLo = Math.min(-tMax * 0.08, Math.min(...terms) * 1.15);
  const sy1 = scale(tLo, tMax * 1.15, H1, 0);
  const sy2 = scale(sMin, sMax, H2, 0);
  const bw = Math.max(1.5, Math.min(18, (W / (N + 1)) * 0.6));
  return (
    <SimShell
      subject="mathematics"
      title="Infinite series"
      onReset={() => { setKey(initS); setN(10); }}
      visual={
        <div className="divide-y divide-line">
          <Panel xMin={0} xMax={N + 1} yMin={tLo} yMax={tMax * 1.15} h={H1} title={<span className="text-xs">Terms <Tex latex="a_n" /></span>}
            label={`Bar chart of the first ${N} terms of ${S.label}.`}>
            {terms.map((t, i) => <rect key={i} x={sx(i + 1) - bw / 2} width={bw} y={Math.min(sy1(t), sy1(0))} height={Math.abs(sy1(t) - sy1(0))} fill={t >= 0 ? "var(--math)" : "var(--chem)"} opacity={0.75} />)}
          </Panel>
          <Panel xMin={0} xMax={N + 1} yMin={sMin} yMax={sMax} h={H2} title={<span className="text-xs">Partial sums <Tex latex="S_n" /></span>}
            label={`Partial sums of ${S.label} for n up to ${N}; S_${N} = ${fmt(sN, 4)}${S.limit !== null ? `, approaching ${fmt(S.limit, 4)}` : ", growing without bound"}.`}>
            {S.limit !== null && <line x1={0} x2={W} y1={sy2(S.limit)} y2={sy2(S.limit)} stroke="var(--success)" strokeWidth={2} strokeDasharray="6 5" />}
            <path d={sums.map((v, i) => `${i ? "L" : "M"}${sx(i + 1).toFixed(1)},${sy2(v).toFixed(1)}`).join("")} stroke="var(--physics)" strokeWidth={1.5} fill="none" opacity={0.6} />
            {sums.map((v, i) => <circle key={i} cx={sx(i + 1)} cy={sy2(v)} r={N > 30 ? 2.5 : 4} fill="var(--physics)" />)}
          </Panel>
        </div>
      }
      controls={
        <>
          <Segmented label="Series" value={key} options={Object.keys(SERIES).map((k) => ({ value: k, label: SERIES[k].label }))} onChange={setKey} />
          <Slider label="Number of terms n" value={N} min={1} max={60} step={1} onChange={setN} />
          <div className="overflow-x-auto rounded-lg bg-math-soft px-3 py-2 text-sm"><Tex latex={`${S.tex} = ${S.limitTex}`} /></div>
        </>
      }
      readouts={[
        { label: `Partial sum S${N}`, value: fmt(sN, 5), emphasis: true },
        { label: "Limit", value: S.limit === null ? "diverges" : fmt(S.limit, 5) },
        { label: "Error |limit − Sₙ|", value: S.limit === null ? "—" : fmt(Math.abs(S.limit - sN), 5) },
        { label: "Last term aₙ", value: fmt(terms[N - 1], 5) },
      ]}
      assumptions={[
        S.note,
        "Partial sums are computed exactly by adding the terms; the green dashed line is the known sum.",
        "A series converges when its partial sums approach a finite limit; terms going to 0 is necessary but not sufficient.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Motion graphs: constant acceleration in one dimension (physics)
// ---------------------------------------------------------------------------

export function MotionGraphs({ params }: SimProps) {
  const [x0, setX0] = useState(num(params, "x0", 0, -20, 20));
  const [v0, setV0] = useState(num(params, "v0", 8, -15, 15));
  const [a, setA] = useState(num(params, "a", -2, -5, 5));
  const [t, setT] = useState(num(params, "t", 2, 0, 10));
  const T = 10;
  const x = (s: number) => x0 + v0 * s + 0.5 * a * s * s;
  const v = (s: number) => v0 + a * s;
  // Total distance: integrate |v| exactly by splitting at the turning time.
  const turn = a !== 0 ? -v0 / a : -1;
  const dist = (s: number) => (turn > 0 && turn < s ? Math.abs(x(turn) - x(0)) + Math.abs(x(s) - x(turn)) : Math.abs(x(s) - x(0)));
  const xs = Array.from({ length: 101 }, (_, i) => x((T * i) / 100));
  const xLo = Math.min(...xs, -5), xHi = Math.max(...xs, 5);
  const pad = (xHi - xLo) * 0.1;
  const vLo = Math.min(v(0), v(T), 0) - 2, vHi = Math.max(v(0), v(T), 0) + 2;
  const sxT = scale(0, T, 0, W);
  const TRACK = 70;
  const sTrack = scale(xLo - pad, xHi + pad, 20, W - 20);
  return (
    <SimShell
      subject="physics"
      title="Motion graphs"
      onReset={() => { setX0(0); setV0(8); setA(-2); setT(2); }}
      visual={
        <div className="divide-y divide-line">
          <svg viewBox={`0 0 ${W} ${TRACK}`} role="img" aria-label={`A cart on a track at position ${fmt(x(t))} m, moving with velocity ${fmt(v(t))} m/s.`} className="block h-auto w-full">
            <line x1={10} x2={W - 10} y1={50} y2={50} stroke="var(--muted)" strokeWidth={2} />
            {sTrack(0) > 10 && sTrack(0) < W - 10 && <line x1={sTrack(0)} x2={sTrack(0)} y1={44} y2={58} stroke="var(--muted)" strokeWidth={2} />}
            {sTrack(0) > 10 && sTrack(0) < W - 10 && <text x={sTrack(0)} y={68} textAnchor="middle" fontSize="11" fill="var(--muted)">0 m</text>}
            <rect x={sTrack(x(t)) - 16} y={26} width={32} height={18} rx={4} fill="var(--physics)" />
            <circle cx={sTrack(x(t)) - 9} cy={47} r={4} fill="var(--ink)" /><circle cx={sTrack(x(t)) + 9} cy={47} r={4} fill="var(--ink)" />
            {Math.abs(v(t)) > 0.05 && <line x1={sTrack(x(t))} x2={sTrack(x(t)) + Math.sign(v(t)) * Math.min(80, 6 + 4 * Math.abs(v(t)))} y1={16} y2={16} stroke="var(--chem)" strokeWidth={3} markerEnd="" />}
            {Math.abs(v(t)) > 0.05 && <polygon points={`${sTrack(x(t)) + Math.sign(v(t)) * (Math.min(80, 6 + 4 * Math.abs(v(t))) + 8)},16 ${sTrack(x(t)) + Math.sign(v(t)) * Math.min(80, 6 + 4 * Math.abs(v(t)))},11 ${sTrack(x(t)) + Math.sign(v(t)) * Math.min(80, 6 + 4 * Math.abs(v(t)))},21`} fill="var(--chem)" />}
          </svg>
          <Panel xMin={0} xMax={T} yMin={xLo - pad} yMax={xHi + pad} h={170} title={<span className="text-xs">Position x (m) vs time (s)</span>} label={`Position-time graph; at t = ${fmt(t)} s the position is ${fmt(x(t))} m.`}>
            <path d={curvePath(x, 0, T, sxT, scale(xLo - pad, xHi + pad, 170, 0), [xLo - pad, xHi + pad])} stroke="var(--physics)" strokeWidth={3} fill="none" />
            <circle cx={sxT(t)} cy={scale(xLo - pad, xHi + pad, 170, 0)(x(t))} r={5} fill="var(--chem)" />
          </Panel>
          <Panel xMin={0} xMax={T} yMin={vLo} yMax={vHi} h={150} title={<span className="text-xs">Velocity v (m/s) vs time (s)</span>} label={`Velocity-time graph; a straight line with slope ${fmt(a)} m/s².`}>
            <path d={curvePath(v, 0, T, sxT, scale(vLo, vHi, 150, 0), [vLo, vHi], 2)} stroke="var(--math)" strokeWidth={3} fill="none" />
            <circle cx={sxT(t)} cy={scale(vLo, vHi, 150, 0)(v(t))} r={5} fill="var(--chem)" />
          </Panel>
        </div>
      }
      controls={
        <>
          <Slider label="Time t" value={t} min={0} max={T} step={0.05} unit="s" onChange={setT} />
          <Slider label={<>Initial velocity <Tex latex="v_0" /></>} value={v0} min={-15} max={15} step={0.5} unit="m/s" onChange={setV0} />
          <Slider label={<>Acceleration <Tex latex="a" /></>} value={a} min={-5} max={5} step={0.25} unit="m/s²" onChange={setA} />
          <Slider label={<>Initial position <Tex latex="x_0" /></>} value={x0} min={-20} max={20} step={1} unit="m" onChange={setX0} />
        </>
      }
      readouts={[
        { label: "Position x", value: `${fmt(x(t), 2)} m`, emphasis: true },
        { label: "Velocity v", value: `${fmt(v(t), 2)} m/s`, emphasis: true },
        { label: "Displacement", value: `${fmt(x(t) - x0, 2)} m` },
        { label: "Distance traveled", value: `${fmt(dist(t), 2)} m` },
      ]}
      assumptions={[
        "Acceleration is constant, so x = x₀ + v₀t + ½at² and v = v₀ + at.",
        "The slope of the position graph is the velocity; the slope of the velocity graph is the acceleration.",
        "Distance traveled counts every meter covered, including after turning around; displacement is only the net change in position.",
      ]}
    />
  );
}
