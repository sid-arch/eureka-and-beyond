// Algebra II simulations: polynomials from zeros, rational functions,
// exponentials and logarithms as inverses, and sinusoids.

import { useState } from "react";
import { Math as Tex } from "../ui/Math";
import { curvePath, Plane } from "./math-graphs";
import { fmt, num, scale, Segmented, SimShell, Slider, type SimProps } from "./shell";

const W = 480, H = 400;
const signed = (v: number) => (v === 0 ? "" : v > 0 ? ` - ${fmt(v)}` : ` + ${fmt(-v)}`);

// ---------------------------------------------------------------------------
// Polynomial from zeros and multiplicities
// ---------------------------------------------------------------------------

export function PolynomialZeros({ params }: SimProps) {
  const init = { a: num(params, "a", 0.25, -2, 2), r1: num(params, "r1", -3, -5, 5), m1: num(params, "m1", 1, 1, 3), r2: num(params, "r2", 1, -5, 5), m2: num(params, "m2", 2, 1, 3), r3: num(params, "r3", 4, -5, 5), m3: num(params, "m3", 1, 0, 3) };
  const [a, setA] = useState(init.a);
  const [r, setR] = useState([init.r1, init.r2, init.r3]);
  const [m, setM] = useState([init.m1, init.m2, init.m3]);
  const f = (x: number) => a * r.reduce((p, ri, i) => p * (x - ri) ** m[i], 1);
  const deg = m.reduce((s, v) => s + v, 0);
  const lead = a; // leading coefficient of the expanded polynomial
  const [X0, X1, Y0, Y1] = [-6, 6, -8, 8];
  const sx = scale(X0, X1, 0, W), sy = scale(Y0, Y1, H, 0);
  const end = (x: number) => (Math.sign(lead) * Math.sign(x) ** deg > 0 ? "↑" : "↓");
  const factor = r.map((ri, i) => (m[i] === 0 ? "" : `(x${signed(ri)})${m[i] > 1 ? `^${m[i]}` : ""}`)).join("");
  // turning points by sign changes of a numerical derivative
  let turns = 0;
  let prev = f(X0 + 0.001) - f(X0);
  for (let x = X0 + 0.01; x <= X1; x += 0.01) { const d = f(x + 0.001) - f(x); if (Math.sign(d) !== Math.sign(prev) && d !== 0) turns++; prev = d; }
  const setRi = (i: number, v: number) => setR((rs) => rs.map((q, j) => (j === i ? v : q)));
  const setMi = (i: number, v: number) => setM((ms) => ms.map((q, j) => (j === i ? v : q)));
  return (
    <SimShell
      subject="mathematics"
      title="Polynomial from its zeros"
      onReset={() => { setA(init.a); setR([init.r1, init.r2, init.r3]); setM([init.m1, init.m2, init.m3]); }}
      visual={
        <Plane xMin={X0} xMax={X1} yMin={Y0} yMax={Y1} step={1} label={`Graph of y = ${fmt(a)}${factor}`}>
          <path d={curvePath(f, X0, X1, sx, sy, [Y0, Y1], 600)} fill="none" stroke="var(--math)" strokeWidth={3} />
          {r.map((ri, i) => m[i] > 0 && <circle key={i} cx={sx(ri)} cy={sy(0)} r={6} fill={m[i] % 2 ? "var(--surface)" : "var(--chem)"} stroke="var(--chem)" strokeWidth={2.5} />)}
        </Plane>
      }
      controls={
        <>
          <div className="overflow-x-auto rounded-lg bg-math-soft px-3 py-2"><Tex latex={`f(x) = ${fmt(a)}${factor}`} /></div>
          <Slider label="Leading factor a" value={a} min={-2} max={2} step={0.05} onChange={(v) => setA(v === 0 ? 0.05 : v)} />
          {[0, 1, 2].map((i) => (
            <div key={i} className="grid grid-cols-2 gap-3">
              <Slider label={`Zero ${i + 1}`} value={r[i]} min={-5} max={5} step={0.5} onChange={(v) => setRi(i, v)} />
              <Slider label="Multiplicity" value={m[i]} min={i === 0 ? 1 : 0} max={3} step={1} onChange={(v) => setMi(i, v)} />
            </div>
          ))}
          <p className="text-sm text-muted">Hollow dots: the graph crosses (odd multiplicity). Filled dots: it touches and turns (even multiplicity).</p>
        </>
      }
      readouts={[
        { label: "Degree", value: deg, emphasis: true },
        { label: "End behavior", value: `x→−∞: ${end(-1)}   x→∞: ${end(1)}` },
        { label: "Turning points in view", value: `${turns} (at most ${deg - 1})` },
        { label: "y-intercept", value: fmt(f(0)) },
      ]}
      assumptions={[
        "f(x) = a(x − r₁)^m₁ (x − r₂)^m₂ (x − r₃)^m₃; setting a multiplicity to 0 removes that factor.",
        "The degree is the sum of the multiplicities and the leading coefficient is a, which together fix the end behavior.",
        "Turning points are counted numerically inside the window, so very flat turns or ones off-screen may be missed.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Rational function: y = a / (x − h) + k, or a ratio of linear factors
// ---------------------------------------------------------------------------

export function RationalGraph({ params }: SimProps) {
  const init = { a: num(params, "a", 2, -6, 6), h: num(params, "h", 1, -4, 4), k: num(params, "k", -1, -4, 4) };
  const [a, setA] = useState(init.a);
  const [h, setH] = useState(init.h);
  const [k, setK] = useState(init.k);
  const f = (x: number) => a / (x - h) + k;
  const [X0, X1, Y0, Y1] = [-8, 8, -7, 7];
  const sx = scale(X0, X1, 0, W), sy = scale(Y0, Y1, H, 0);
  const xInt = k !== 0 ? h - a / k : null;
  return (
    <SimShell
      subject="mathematics"
      title="Rational functions and asymptotes"
      onReset={() => { setA(init.a); setH(init.h); setK(init.k); }}
      visual={
        <Plane xMin={X0} xMax={X1} yMin={Y0} yMax={Y1} label={`Graph of y = ${a}/(x − ${h}) + ${k}`}>
          <line x1={sx(h)} x2={sx(h)} y1={0} y2={H} stroke="var(--chem)" strokeWidth={2} strokeDasharray="6 5" />
          <line x1={0} x2={W} y1={sy(k)} y2={sy(k)} stroke="var(--chem)" strokeWidth={2} strokeDasharray="6 5" />
          <path d={curvePath(f, X0, h - 0.001, sx, sy, [Y0, Y1], 300)} fill="none" stroke="var(--math)" strokeWidth={3} />
          <path d={curvePath(f, h + 0.001, X1, sx, sy, [Y0, Y1], 300)} fill="none" stroke="var(--math)" strokeWidth={3} />
        </Plane>
      }
      controls={
        <>
          <div className="rounded-lg bg-math-soft px-3 py-2"><Tex latex={`f(x) = \\dfrac{${fmt(a)}}{x${signed(h)}}${k === 0 ? "" : k > 0 ? ` + ${fmt(k)}` : ` - ${fmt(-k)}`}`} /></div>
          <Slider label="Stretch a" value={a} min={-6} max={6} step={0.5} onChange={(v) => setA(v === 0 ? 0.5 : v)} />
          <Slider label="Horizontal shift h" value={h} min={-4} max={4} step={0.5} onChange={setH} />
          <Slider label="Vertical shift k" value={k} min={-4} max={4} step={0.5} onChange={setK} />
        </>
      }
      readouts={[
        { label: "Vertical asymptote", value: `x = ${fmt(h)}`, emphasis: true },
        { label: "Horizontal asymptote", value: `y = ${fmt(k)}`, emphasis: true },
        { label: "Domain", value: `x ≠ ${fmt(h)}` },
        { label: "Range", value: `y ≠ ${fmt(k)}` },
        { label: "x-intercept", value: xInt === null ? "none" : fmt(xInt) },
        { label: "y-intercept", value: h === 0 ? "none" : fmt(f(0)) },
      ]}
      assumptions={[
        "f(x) = a/(x − h) + k is the reciprocal function 1/x stretched by a and shifted.",
        "Near x = h the denominator approaches 0, so |f(x)| grows without bound: a vertical asymptote.",
        "As |x| grows, a/(x − h) approaches 0, so the graph approaches y = k: a horizontal asymptote.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Exponential and logarithm as inverses
// ---------------------------------------------------------------------------

export function ExpLog({ params }: SimProps) {
  const init = { b: num(params, "b", 2, 0.2, 5) };
  const [b, setB] = useState(init.b);
  const [showLog, setShowLog] = useState(true);
  const [x, setX] = useState(1);
  const [X0, X1, Y0, Y1] = [-6, 6, -5, 5];
  const sx = scale(X0, X1, 0, W), sy = scale(Y0, Y1, H, 0);
  const lb = (t: number) => Math.log(t) / Math.log(b);
  const bb = Math.abs(b - 1) < 0.01 ? 1.01 : b;
  return (
    <SimShell
      subject="mathematics"
      title="Exponential and logarithmic functions"
      onReset={() => { setB(init.b); setShowLog(true); setX(1); }}
      visual={
        <Plane xMin={X0} xMax={X1} yMin={Y0} yMax={Y1} label={`y = ${b}^x and its inverse y = log base ${b} of x`}>
          <line x1={sx(-5)} y1={sy(-5)} x2={sx(5)} y2={sy(5)} stroke="var(--muted)" strokeDasharray="5 5" />
          <path d={curvePath((t) => bb ** t, X0, X1, sx, sy, [Y0, Y1], 400)} fill="none" stroke="var(--math)" strokeWidth={3} />
          {showLog && <path d={curvePath((t) => Math.log(t) / Math.log(bb), 0.001, X1, sx, sy, [Y0, Y1], 600)} fill="none" stroke="var(--physics)" strokeWidth={3} />}
          <circle cx={sx(x)} cy={sy(bb ** x)} r={6} fill="var(--math)" />
          {showLog && <circle cx={sx(bb ** x)} cy={sy(x)} r={6} fill="var(--physics)" />}
        </Plane>
      }
      controls={
        <>
          <div className="space-y-1 rounded-lg bg-math-soft px-3 py-2"><Tex latex={`y = ${fmt(bb)}^x`} />{showLog && <div><Tex latex={`y = \\log_{${fmt(bb)}} x`} /></div>}</div>
          <Slider label="Base b" value={b} min={0.2} max={5} step={0.1} onChange={setB} />
          <Slider label="Point at x" value={x} min={-3} max={2} step={0.25} onChange={setX} />
          <Segmented label="Show inverse" value={showLog ? "on" : "off"} onChange={(v) => setShowLog(v === "on")} options={[{ value: "on", label: "On" }, { value: "off", label: "Off" }]} />
        </>
      }
      readouts={[
        { label: "Point on exponential", value: `(${fmt(x)}, ${fmt(bb ** x, 3)})`, emphasis: true },
        { label: "Matching point on log", value: `(${fmt(bb ** x, 3)}, ${fmt(x)})` },
        { label: `log_${fmt(bb)}(10)`, value: fmt(lb(10), 4) },
        { label: "Type", value: bb > 1 ? "growth" : "decay" },
      ]}
      assumptions={[
        "The logarithm log_b x is the inverse of b^x: it answers \"what power of b gives x?\"",
        "Inverse graphs are reflections across y = x, so each point (x, y) on one matches (y, x) on the other.",
        "b must be positive and not 1. The exponential has domain all reals and range y > 0; the log has domain x > 0.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Sinusoid: y = A sin(B(x − C)) + D
// ---------------------------------------------------------------------------

export function Sinusoid({ params }: SimProps) {
  const init = { A: num(params, "A", 2, -4, 4), B: num(params, "B", 1, 0.25, 4), C: num(params, "C", 0, -3.2, 3.2), D: num(params, "D", 0, -3, 3) };
  const [A, setA] = useState(init.A);
  const [B, setB] = useState(init.B);
  const [C, setC] = useState(init.C);
  const [D, setD] = useState(init.D);
  const [fn, setFn] = useState<"sin" | "cos">("sin");
  const g = fn === "sin" ? Math.sin : Math.cos;
  const f = (x: number) => A * g(B * (x - C)) + D;
  const [X0, X1, Y0, Y1] = [-2 * Math.PI, 2 * Math.PI, -6, 6];
  const sx = scale(X0, X1, 0, W), sy = scale(Y0, Y1, H, 0);
  const ticks = [-2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2];
  return (
    <SimShell
      subject="mathematics"
      title="Sine and cosine graphs"
      onReset={() => { setA(init.A); setB(init.B); setC(init.C); setD(init.D); setFn("sin"); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`y = ${A} ${fn}(${B}(x − ${C})) + ${D}`} className="block h-auto w-full">
          {Array.from({ length: 13 }, (_, i) => -6 + i).map((y) => <line key={y} x1={0} x2={W} y1={sy(y)} y2={sy(y)} stroke="var(--line)" strokeWidth={y === 0 ? 0 : 1} />)}
          {ticks.map((t) => <g key={t}><line x1={sx(t * Math.PI)} x2={sx(t * Math.PI)} y1={0} y2={H} stroke="var(--line)" /><text x={sx(t * Math.PI)} y={sy(0) + 16} textAnchor="middle" fontSize="11" fill="var(--muted)">{t === 1 ? "π" : t === -1 ? "−π" : `${t}π`.replace("-", "−")}</text></g>)}
          <line x1={0} x2={W} y1={sy(0)} y2={sy(0)} stroke="var(--muted)" strokeWidth={1.5} />
          <line x1={sx(0)} x2={sx(0)} y1={0} y2={H} stroke="var(--muted)" strokeWidth={1.5} />
          {[2, 4, -2, -4].map((y) => <text key={y} x={sx(0) - 6} y={sy(y) + 4} textAnchor="end" fontSize="11" fill="var(--muted)">{y}</text>)}
          <line x1={0} x2={W} y1={sy(D)} y2={sy(D)} stroke="var(--chem)" strokeDasharray="6 5" />
          <path d={curvePath((x) => g(x), X0, X1, sx, sy, [Y0, Y1], 400)} fill="none" stroke="var(--muted)" strokeWidth={1.5} strokeDasharray="4 4" />
          <path d={curvePath(f, X0, X1, sx, sy, [Y0, Y1], 800)} fill="none" stroke="var(--math)" strokeWidth={3} />
        </svg>
      }
      controls={
        <>
          <Segmented label="Function" value={fn} onChange={setFn} options={[{ value: "sin", label: "sin" }, { value: "cos", label: "cos" }]} />
          <div className="overflow-x-auto rounded-lg bg-math-soft px-3 py-2"><Tex latex={`y = ${fmt(A)}\\${fn}\\left(${fmt(B)}(x ${C < 0 ? "+" : "-"} ${fmt(Math.abs(C))})\\right) ${D < 0 ? "-" : "+"} ${fmt(Math.abs(D))}`} /></div>
          <Slider label="Amplitude factor A" value={A} min={-4} max={4} step={0.5} onChange={setA} />
          <Slider label="Frequency B" value={B} min={0.25} max={4} step={0.25} onChange={setB} />
          <Slider label="Phase shift C" value={C} min={-3.2} max={3.2} step={0.1} onChange={setC} format={(v) => `${fmt(v / Math.PI, 2)}π`} />
          <Slider label="Midline D" value={D} min={-3} max={3} step={0.5} onChange={setD} />
        </>
      }
      readouts={[
        { label: "Amplitude", value: fmt(Math.abs(A)), emphasis: true },
        { label: "Period", value: `${fmt(2 / B, 3)}π ≈ ${fmt((2 * Math.PI) / B)}`, emphasis: true },
        { label: "Phase shift", value: `${fmt(C)} (${C >= 0 ? "right" : "left"})` },
        { label: "Midline", value: `y = ${fmt(D)}` },
        { label: "Max / min", value: `${fmt(D + Math.abs(A))} / ${fmt(D - Math.abs(A))}` },
      ]}
      assumptions={[
        "y = A sin(B(x − C)) + D: |A| is the amplitude, 2π/B the period, C the horizontal shift and D the midline.",
        "A negative A reflects the graph across its midline. The dashed gray curve is the parent function for comparison.",
        "x is in radians; the window shows −2π to 2π.",
      ]}
    />
  );
}
