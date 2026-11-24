// Algebra simulations: systems of equations and inequalities, linear versus
// exponential models, and an area model for multiplying and factoring.

import { useState } from "react";
import { Math as Tex } from "../ui/Math";
import { curvePath, Plane } from "./math-graphs";
import { fmt, num, scale, Segmented, SimShell, Slider, type Params, type SimProps } from "./shell";

const str = (p: Params | undefined, key: string, fallback: string, allowed: string[]) => {
  const v = p?.[key];
  return typeof v === "string" && allowed.includes(v) ? v : fallback;
};
const bool = (p: Params | undefined, key: string, fallback: boolean) => (typeof p?.[key] === "boolean" ? (p[key] as boolean) : fallback);

/** "y = mx + b" with tidy signs. */
export function lineTex(m: number, b: number, y = "y") {
  const mt = m === 0 ? "" : m === 1 ? "x" : m === -1 ? "-x" : `${fmt(m)}x`;
  if (!mt) return `${y} = ${fmt(b)}`;
  return `${y} = ${mt}${b === 0 ? "" : b > 0 ? ` + ${fmt(b)}` : ` - ${fmt(-b)}`}`;
}

// ---------------------------------------------------------------------------
// Systems of linear equations / inequalities
// ---------------------------------------------------------------------------

type Shade = "none" | "above" | "below";

export function SystemsGraph({ params }: SimProps) {
  const init = {
    m1: num(params, "m1", 1, -5, 5), b1: num(params, "b1", 1, -6, 6),
    m2: num(params, "m2", -0.5, -5, 5), b2: num(params, "b2", 4, -6, 6),
    s1: str(params, "s1", "none", ["none", "above", "below"]) as Shade, s2: str(params, "s2", "none", ["none", "above", "below"]) as Shade,
    strict: bool(params, "strict", false),
  };
  const [m1, setM1] = useState(init.m1);
  const [b1, setB1] = useState(init.b1);
  const [m2, setM2] = useState(init.m2);
  const [b2, setB2] = useState(init.b2);
  const [s1, setS1] = useState<Shade>(init.s1);
  const [s2, setS2] = useState<Shade>(init.s2);
  const [X0, X1, Y0, Y1] = [-8, 8, -7, 7];
  const sx = scale(X0, X1, 0, 480);
  const sy = scale(Y0, Y1, 400, 0);
  const parallel = m1 === m2;
  const same = parallel && b1 === b2;
  const x = parallel ? NaN : (b2 - b1) / (m1 - m2);
  const y = m1 * x + b1;
  const kind = same ? "Infinitely many (same line)" : parallel ? "No solution (parallel)" : "Exactly one";
  const region = (m: number, b: number, s: Shade) => {
    if (s === "none") return "";
    const edge = s === "above" ? Y1 + 1 : Y0 - 1;
    return `M${sx(X0)},${sy(m * X0 + b)} L${sx(X1)},${sy(m * X1 + b)} L${sx(X1)},${sy(edge)} L${sx(X0)},${sy(edge)} Z`;
  };
  const shading = s1 !== "none" || s2 !== "none";
  const rel = (s: Shade) => (s === "above" ? (init.strict ? ">" : "\\ge") : s === "below" ? (init.strict ? "<" : "\\le") : "=");
  return (
    <SimShell
      subject="mathematics"
      title="Systems of linear equations"
      onReset={() => { setM1(init.m1); setB1(init.b1); setM2(init.m2); setB2(init.b2); setS1(init.s1); setS2(init.s2); }}
      visual={
        <Plane xMin={X0} xMax={X1} yMin={Y0} yMax={Y1} label={`Two lines; ${kind}`}>
          <defs>
            <clipPath id="sys-clip"><rect x={0} y={0} width={480} height={400} /></clipPath>
          </defs>
          <g clipPath="url(#sys-clip)">
            {s1 !== "none" && <path d={region(m1, b1, s1)} fill="var(--math)" fillOpacity={0.16} />}
            {s2 !== "none" && <path d={region(m2, b2, s2)} fill="var(--chem)" fillOpacity={0.16} />}
            <path d={curvePath((t) => m1 * t + b1, X0, X1, sx, sy, [Y0, Y1], 2)} stroke="var(--math)" strokeWidth={3} strokeDasharray={s1 !== "none" && init.strict ? "8 6" : undefined} fill="none" />
            <path d={curvePath((t) => m2 * t + b2, X0, X1, sx, sy, [Y0, Y1], 2)} stroke="var(--chem)" strokeWidth={3} strokeDasharray={s2 !== "none" && init.strict ? "8 6" : undefined} fill="none" />
          </g>
          {!parallel && x >= X0 && x <= X1 && y >= Y0 && y <= Y1 && (
            <>
              <circle cx={sx(x)} cy={sy(y)} r={7} fill="var(--ink)" />
              <text x={sx(x) + 10} y={sy(y) - 10} fontSize="13" fontWeight="700" fill="var(--ink)">({fmt(x)}, {fmt(y)})</text>
            </>
          )}
        </Plane>
      }
      controls={
        <>
          <div className="rounded-lg bg-math-soft px-3 py-2"><Tex latex={lineTex(m1, b1).replace("=", rel(s1))} /></div>
          <div className="grid grid-cols-2 gap-3">
            <Slider label="Slope 1" value={m1} min={-5} max={5} step={0.5} onChange={setM1} />
            <Slider label="Intercept 1" value={b1} min={-6} max={6} step={0.5} onChange={setB1} />
          </div>
          <div className="rounded-lg bg-chem-soft px-3 py-2"><Tex latex={lineTex(m2, b2).replace("=", rel(s2))} /></div>
          <div className="grid grid-cols-2 gap-3">
            <Slider label="Slope 2" value={m2} min={-5} max={5} step={0.5} onChange={setM2} />
            <Slider label="Intercept 2" value={b2} min={-6} max={6} step={0.5} onChange={setB2} />
          </div>
          <Segmented label="Shade for line 1" value={s1} onChange={setS1} options={[{ value: "none", label: "Equation" }, { value: "above", label: "y ≥" }, { value: "below", label: "y ≤" }]} />
          <Segmented label="Shade for line 2" value={s2} onChange={setS2} options={[{ value: "none", label: "Equation" }, { value: "above", label: "y ≥" }, { value: "below", label: "y ≤" }]} />
        </>
      }
      readouts={[
        { label: "Solutions", value: kind, emphasis: true },
        { label: "Intersection", value: parallel ? "—" : `(${fmt(x)}, ${fmt(y)})` },
        ...(shading ? [{ label: "Overlap", value: "Shaded twice = satisfies both" }] : []),
      ]}
      assumptions={[
        "Each line is written in slope-intercept form, y = mx + b.",
        "Lines with equal slopes and different intercepts are parallel and never meet; equal slopes and equal intercepts are the same line.",
        "Intersection values are computed exactly and rounded to two decimals, so a graph alone may not show the exact point.",
        "For inequalities, a solid boundary means points on the line are included (≤ or ≥). Shading above means y is greater than the line's value.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Linear versus exponential growth
// ---------------------------------------------------------------------------

export function GrowthModels({ params }: SimProps) {
  const init = { a: num(params, "a", 2, 0.5, 20), d: num(params, "d", 3, -5, 10), b: num(params, "b", 1.5, 0.25, 3), compare: bool(params, "compare", true) };
  const [a, setA] = useState(init.a);
  const [d, setD] = useState(init.d);
  const [b, setB] = useState(init.b);
  const [compare, setCompare] = useState(init.compare);
  const [x, setX] = useState(4);
  const lin = (t: number) => a + d * t;
  const exp = (t: number) => a * b ** t;
  const X1 = 10;
  const yMax = Math.max(10, Math.min(400, Math.max(...Array.from({ length: X1 + 1 }, (_, t) => Math.max(exp(t), compare ? lin(t) : 0)))));
  const yMin = Math.min(0, compare ? lin(X1) : 0, 0);
  const W = 480, H = 320;
  const sx = scale(0, X1, 40, W - 16);
  const sy = scale(yMin, yMax * 1.05, H - 30, 14);
  let cross: number | null = null;
  for (let t = 0.01; t <= X1 && compare; t += 0.01) if (exp(t) > lin(t) && exp(t - 0.01) <= lin(t - 0.01)) { cross = t; break; }
  // "Nice" tick spacing: 1, 2 or 5 times a power of ten, about 5 ticks.
  const span = yMax * 1.05 - yMin;
  const raw = span / 5;
  const pow = 10 ** Math.floor(Math.log10(raw));
  const tick = [1, 2, 5, 10].map((m) => m * pow).find((t) => t >= raw)!;
  const ticks: number[] = [];
  for (let v = Math.ceil(yMin / tick) * tick; v <= yMax * 1.05; v += tick) ticks.push(Number(v.toFixed(6)));
  return (
    <SimShell
      subject="mathematics"
      title="Linear vs exponential"
      onReset={() => { setA(init.a); setD(init.d); setB(init.b); setCompare(init.compare); setX(4); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Exponential y = ${a}·${b}^x${compare ? ` and linear y = ${a} + ${d}x` : ""}`} className="block h-auto w-full">
          {ticks.map((v) => (
            <g key={v}>
              <line x1={sx(0)} x2={sx(X1)} y1={sy(v)} y2={sy(v)} stroke="var(--line)" />
              <text x={sx(0) - 6} y={sy(v) + 4} textAnchor="end" fontSize="11" fill="var(--muted)">{fmt(v, 0)}</text>
            </g>
          ))}
          {Array.from({ length: X1 + 1 }, (_, t) => <text key={t} x={sx(t)} y={H - 12} textAnchor="middle" fontSize="11" fill="var(--muted)">{t}</text>)}
          <line x1={sx(0)} x2={sx(X1)} y1={sy(0)} y2={sy(0)} stroke="var(--muted)" strokeWidth={1.5} />
          {compare && <path d={curvePath(lin, 0, X1, sx, sy, [yMin, yMax * 1.05], 2)} stroke="var(--physics)" strokeWidth={3} fill="none" />}
          <path d={curvePath(exp, 0, X1, sx, sy, [yMin, yMax * 1.05])} stroke="var(--math)" strokeWidth={3.5} fill="none" />
          {Array.from({ length: X1 + 1 }, (_, t) => t).filter((t) => exp(t) <= yMax * 1.05).map((t) => <circle key={t} cx={sx(t)} cy={sy(exp(t))} r={3.5} fill="var(--math)" />)}
          <line x1={sx(x)} x2={sx(x)} y1={sy(yMin)} y2={14} stroke="var(--ink)" strokeDasharray="4 4" />
          {cross !== null && <circle cx={sx(cross)} cy={sy(exp(cross))} r={6} fill="none" stroke="var(--ink)" strokeWidth={2} />}
        </svg>
      }
      controls={
        <>
          <div className="space-y-1 rounded-lg bg-math-soft px-3 py-2">
            <Tex latex={`f(x) = ${fmt(a)} \\cdot ${fmt(b)}^x`} />
            {compare && <div><Tex latex={`g(x) = ${fmt(a)} ${d < 0 ? "-" : "+"} ${fmt(Math.abs(d))}x`} /></div>}
          </div>
          <Slider label="Starting value a" value={a} min={0.5} max={20} step={0.5} onChange={setA} />
          <Slider label="Growth factor b" value={b} min={0.25} max={3} step={0.05} onChange={setB} />
          <Segmented label="Compare with a line" value={compare ? "on" : "off"} onChange={(v) => setCompare(v === "on")} options={[{ value: "on", label: "On" }, { value: "off", label: "Off" }]} />
          {compare && <Slider label="Constant change d" value={d} min={-5} max={10} step={0.5} onChange={setD} />}
          <Slider label="Read at x" value={x} min={0} max={X1} step={1} onChange={setX} />
        </>
      }
      readouts={[
        { label: `f(${x}) exponential`, value: fmt(exp(x)), emphasis: true },
        ...(compare ? [{ label: `g(${x}) linear`, value: fmt(lin(x)) }] : []),
        { label: "Type", value: b > 1 ? `Growth, ${fmt((b - 1) * 100, 1)}% per step` : b < 1 ? `Decay, ${fmt((1 - b) * 100, 1)}% per step` : "Constant" },
        ...(compare ? [{ label: "Exponential passes linear", value: cross === null ? (exp(0.01) > lin(0.01) ? "Ahead from the start" : "Not by x = 10") : `near x = ${fmt(cross, 1)}` }] : []),
      ]}
      assumptions={[
        "Exponential: each step multiplies by the same factor b. Linear: each step adds the same amount d.",
        "A growth factor b > 1 means growth; 0 < b < 1 means decay. The percent rate is |b − 1| × 100%.",
        "The vertical axis rescales to fit the data and is capped at 400, so very fast growth leaves the window.",
        "With any b > 1, an exponential eventually passes any linear function, though it may take more than 10 steps.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Area model for (ax + b)(cx + d)
// ---------------------------------------------------------------------------

export function polyTex(c2: number, c1: number, c0: number) {
  const parts: string[] = [];
  const term = (c: number, v: string) => {
    if (c === 0) return;
    const sign = c < 0 ? "-" : "+";
    const mag = Math.abs(c) === 1 && v ? "" : String(Math.abs(c));
    parts.push(`${parts.length ? ` ${sign} ` : c < 0 ? "-" : ""}${mag}${v}`);
  };
  term(c2, "x^2");
  term(c1, "x");
  term(c0, "");
  return parts.join("") || "0";
}

export function AreaModel({ params }: SimProps) {
  const init = { a: num(params, "a", 1, 1, 3), b: num(params, "b", 3, -6, 6), c: num(params, "c", 1, 1, 3), d: num(params, "d", 2, -6, 6) };
  const [a, setA] = useState(init.a);
  const [b, setB] = useState(init.b);
  const [c, setC] = useState(init.c);
  const [d, setD] = useState(init.d);
  const W = 480, H = 330;
  const X = 70, Y = 50, big = 150, unit = 22;
  const cw = [big, Math.abs(b) * unit || 4];
  const rh = [big, Math.abs(d) * unit || 4];
  // Row factor: (cx + d) runs down the side; column factor: (ax + b) runs across the top.
  const cells = [
    { r: 0, k: 0, tex: `${a * c === 1 ? "" : a * c}x^2`, v: a * c },
    { r: 0, k: 1, tex: `${b * c}x`, v: b * c },
    { r: 1, k: 0, tex: `${a * d}x`, v: a * d },
    { r: 1, k: 1, tex: `${b * d}`, v: b * d },
  ];
  const left = (k: number) => X + (k ? cw[0] : 0);
  const top = (r: number) => Y + (r ? rh[0] : 0);
  const fac = (p: number, q: number) => `(${p === 1 ? "" : p}x ${q < 0 ? "-" : "+"} ${Math.abs(q)})`;
  return (
    <SimShell
      subject="mathematics"
      title="Area model"
      onReset={() => { setA(init.a); setB(init.b); setC(init.c); setD(init.d); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Area model for ${fac(a, b)}${fac(c, d)} = ${polyTex(a * c, a * d + b * c, b * d)}`} className="block h-auto w-full">
          <text x={X + cw[0] / 2} y={Y - 14} textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--math)">{a === 1 ? "" : a}x</text>
          <text x={X + cw[0] + cw[1] / 2} y={Y - 14} textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--math)">{b}</text>
          <text x={X - 14} y={Y + rh[0] / 2 + 5} textAnchor="end" fontSize="15" fontWeight="700" fill="var(--chem)">{c === 1 ? "" : c}x</text>
          <text x={X - 14} y={Y + rh[0] + rh[1] / 2 + 5} textAnchor="end" fontSize="15" fontWeight="700" fill="var(--chem)">{d}</text>
          {cells.map((cell) => (
            <g key={`${cell.r}${cell.k}`}>
              <rect x={left(cell.k)} y={top(cell.r)} width={cw[cell.k]} height={rh[cell.r]} fill={cell.v < 0 ? "var(--danger)" : cell.r + cell.k === 0 ? "var(--math)" : cell.r + cell.k === 1 ? "var(--physics)" : "var(--chem)"} fillOpacity={0.22} stroke="var(--ink)" strokeWidth={2} />
              {cw[cell.k] > 18 && rh[cell.r] > 14 && (
                <text x={left(cell.k) + cw[cell.k] / 2} y={top(cell.r) + rh[cell.r] / 2 + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink)">{cell.tex.replace("x^2", "x²")}</text>
              )}
            </g>
          ))}
        </svg>
      }
      controls={
        <>
          <div className="rounded-lg bg-math-soft px-3 py-2 text-lg"><Tex latex={`${fac(a, b)}${fac(c, d)}`} /></div>
          <div className="grid grid-cols-2 gap-3">
            <Slider label="a (top x)" value={a} min={1} max={3} step={1} onChange={setA} />
            <Slider label="b (top number)" value={b} min={-6} max={6} step={1} onChange={setB} />
            <Slider label="c (side x)" value={c} min={1} max={3} step={1} onChange={setC} />
            <Slider label="d (side number)" value={d} min={-6} max={6} step={1} onChange={setD} />
          </div>
          <p className="text-sm text-muted">Red cells are negative. The two middle cells are like terms and combine.</p>
        </>
      }
      readouts={[
        { label: "Product", value: <Tex latex={polyTex(a * c, a * d + b * c, b * d)} />, emphasis: true },
        { label: <>Middle term <Tex latex={`${b * c}x ${a * d < 0 ? "-" : "+"} ${Math.abs(a * d)}x`} /></>, value: <Tex latex={`${a * d + b * c}x`} /> },
        { label: "Constant", value: b * d },
        { label: "Leading coefficient", value: a * c },
      ]}
      assumptions={[
        "Each cell's area is the product of its row and column labels; the total area is the product of the two binomials.",
        "Cell sizes are only a picture: the x-cells are drawn a fixed size, and negative lengths are drawn as positive with red shading.",
        "Reading the model backwards is factoring: given the four cells, find the labels on the edges.",
      ]}
    />
  );
}
