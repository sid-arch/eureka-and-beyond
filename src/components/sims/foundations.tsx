// Foundations simulations: number line, fraction bars, ratios, data,
// area and volume, inequalities and the coordinate plane.

import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Math as Tex } from "../ui/Math";
import { Button, Select } from "../ui";
import { Plane } from "./math-graphs";
import { fmt, num, scale, Segmented, SimShell, Slider, type Params, type SimProps } from "./shell";

const str = (p: Params | undefined, key: string, fallback: string, allowed: string[]) => {
  const v = p?.[key];
  return typeof v === "string" && allowed.includes(v) ? v : fallback;
};
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
const lcm = (a: number, b: number) => Math.abs(a * b) / gcd(a, b);
const fracTex = (n: number, d: number) => {
  if (d < 0) { n = -n; d = -d; }
  const g = gcd(n, d) || 1;
  const [a, b] = [n / g, d / g];
  if (b === 1) return String(a);
  return `${a < 0 ? "-" : ""}\\tfrac{${Math.abs(a)}}{${b}}`;
};

/** A horizontal number line drawn into an SVG. */
function NumberAxis({ x0, x1, y, sx, every = 1, labelEvery = 5 }: { x0: number; x1: number; y: number; sx: (v: number) => number; every?: number; labelEvery?: number }) {
  const ticks: number[] = [];
  for (let v = Math.ceil(x0 / every) * every; v <= x1 + 1e-9; v += every) ticks.push(Number(v.toFixed(6)));
  return (
    <g>
      <line x1={sx(x0) - 8} x2={sx(x1) + 8} y1={y} y2={y} stroke="var(--muted)" strokeWidth={2} />
      {ticks.map((v) => {
        const major = Math.abs(v / labelEvery - Math.round(v / labelEvery)) < 1e-9;
        return (
          <g key={v}>
            <line x1={sx(v)} x2={sx(v)} y1={y - (major ? 8 : 4)} y2={y + (major ? 8 : 4)} stroke="var(--muted)" strokeWidth={v === 0 ? 2.5 : 1.25} />
            {major && <text x={sx(v)} y={y + 24} textAnchor="middle" fontSize="12" fill="var(--muted)">{v}</text>}
          </g>
        );
      })}
    </g>
  );
}

// ---------------------------------------------------------------------------
// Integer number line
// ---------------------------------------------------------------------------

export function NumberLine({ params }: SimProps) {
  const init = { a: num(params, "a", 3, -10, 10), b: num(params, "b", -7, -10, 10), op: str(params, "op", "add", ["add", "subtract"]) as "add" | "subtract" };
  const [a, setA] = useState(init.a);
  const [b, setB] = useState(init.b);
  const [op, setOp] = useState(init.op);
  const move = op === "add" ? b : -b;
  const result = a + move;
  const W = 480, H = 200;
  const sx = scale(-20, 20, 20, W - 20);
  const y = 120;
  const dir = Math.sign(move);
  const arrowY = 70;
  const sign = (v: number) => (v < 0 ? `(${v})` : String(v));
  return (
    <SimShell
      subject="mathematics"
      title="Integer number line"
      onReset={() => { setA(init.a); setB(init.b); setOp(init.op); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Start at ${a}, move ${Math.abs(move)} ${move >= 0 ? "right" : "left"}, land on ${result}`} className="block h-auto w-full">
          <NumberAxis x0={-20} x1={20} y={y} sx={sx} />
          {move !== 0 && (
            <>
              <path d={`M${sx(a)},${y - 10} Q${(sx(a) + sx(result)) / 2},${arrowY - 30} ${sx(result)},${y - 10}`} fill="none" stroke="var(--math)" strokeWidth={3} />
              <polygon points={`${sx(result)},${y - 8} ${sx(result) - 7 * dir},${y - 20} ${sx(result) + 3 * dir},${y - 22}`} fill="var(--math)" />
              <text x={(sx(a) + sx(result)) / 2} y={arrowY - 22} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--math)">
                {move > 0 ? `+${move}` : move} ({Math.abs(move)} {move > 0 ? "right" : "left"})
              </text>
            </>
          )}
          <circle cx={sx(a)} cy={y} r={7} fill="var(--surface)" stroke="var(--ink)" strokeWidth={2.5} />
          <circle cx={sx(result)} cy={y} r={7} fill="var(--math)" />
          <text x={sx(a)} y={y + 44} textAnchor="middle" fontSize="12" fill="var(--ink)">start</text>
          {result !== a && <text x={sx(result)} y={y + 44} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--math)">end</text>}
        </svg>
      }
      controls={
        <>
          <Segmented label="Operation" value={op} onChange={setOp} options={[{ value: "add", label: "Add" }, { value: "subtract", label: "Subtract" }]} />
          <Slider label="Start (first number)" value={a} min={-10} max={10} step={1} onChange={setA} />
          <Slider label={op === "add" ? "Number added" : "Number subtracted"} value={b} min={-10} max={10} step={1} onChange={setB} />
          <div className="rounded-lg bg-math-soft px-3 py-2 text-lg"><Tex latex={`${a} ${op === "add" ? "+" : "-"} ${sign(b)} = ${result}`} /></div>
          {op === "subtract" && <p className="text-sm text-muted">Subtracting {sign(b)} moves the same way as adding {sign(-b)}: <Tex latex={`${a} - ${sign(b)} = ${a} + ${sign(-b)}`} />.</p>}
        </>
      }
      readouts={[
        { label: "Result", value: result, emphasis: true },
        { label: "Movement", value: move === 0 ? "None" : `${Math.abs(move)} ${move > 0 ? "right" : "left"}` },
        { label: "|start|", value: Math.abs(a) },
        { label: "|result|", value: Math.abs(result) },
      ]}
      assumptions={[
        "Adding a positive number moves right; adding a negative number moves left.",
        "Subtracting a number is the same as adding its opposite, so the arrow direction flips.",
        "Absolute value is the distance from 0, so it is never negative.",
        "The line shows −20 to 20; inputs are whole numbers from −10 to 10.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Fraction bars
// ---------------------------------------------------------------------------

export function FractionBars({ params }: SimProps) {
  const init = {
    n1: num(params, "n1", 1, 0, 12), d1: num(params, "d1", 2, 1, 12),
    n2: num(params, "n2", 1, 0, 12), d2: num(params, "d2", 3, 1, 12),
    op: str(params, "op", "add", ["compare", "add", "subtract"]) as "compare" | "add" | "subtract",
  };
  const [n1, setN1] = useState(init.n1);
  const [d1, setD1] = useState(init.d1);
  const [n2, setN2] = useState(init.n2);
  const [d2, setD2] = useState(init.d2);
  const [op, setOp] = useState(init.op);
  const L = lcm(d1, d2);
  const e1 = n1 * (L / d1);
  const e2 = n2 * (L / d2);
  const rn = op === "subtract" ? e1 - e2 : e1 + e2;
  const W = 480, H = 260, X0 = 20, BW = 440;
  const maxWhole = Math.max(1, Math.ceil(Math.max(n1 / d1, n2 / d2, op === "add" ? rn / L : 0)));
  const unit = BW / maxWhole;
  const bar = (label: string, n: number, d: number, y: number, color: string) => (
    <g>
      <text x={X0} y={y - 6} fontSize="12" fill="var(--muted)">{label}</text>
      {Array.from({ length: maxWhole * L }, (_, i) => (
        <rect key={i} x={X0 + (i * unit) / L} y={y} width={unit / L} height={30} fill={i < n * (L / d) ? color : "var(--surface)"} fillOpacity={i < n * (L / d) ? 0.75 : 1} stroke="var(--line)" strokeWidth={1} />
      ))}
      {Array.from({ length: maxWhole * d + 1 }, (_, i) => <line key={i} x1={X0 + (i * unit) / d} x2={X0 + (i * unit) / d} y1={y} y2={y + 30} stroke="var(--ink)" strokeWidth={i % d === 0 ? 2.5 : 1.5} />)}
    </g>
  );
  const cmp = e1 === e2 ? "=" : e1 > e2 ? ">" : "<";
  return (
    <SimShell
      subject="mathematics"
      title="Fraction bars"
      onReset={() => { setN1(init.n1); setD1(init.d1); setN2(init.n2); setD2(init.d2); setOp(init.op); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${n1}/${d1} and ${n2}/${d2} drawn as bars cut into ${L} equal parts per whole`} className="block h-auto w-full">
          {bar(`${n1}/${d1} = ${e1}/${L}`, n1, d1, 40, "var(--math)")}
          {bar(`${n2}/${d2} = ${e2}/${L}`, n2, d2, 110, "var(--physics)")}
          {op !== "compare" && rn >= 0 && bar(`${op === "add" ? "Sum" : "Difference"} = ${rn}/${L}`, rn, L, 180, "var(--chem)")}
          {op === "subtract" && rn < 0 && <text x={X0} y={200} fontSize="13" fill="var(--danger)">The difference is negative: the second fraction is larger.</text>}
          {Array.from({ length: maxWhole + 1 }, (_, i) => <text key={i} x={X0 + i * unit} y={H - 10} textAnchor="middle" fontSize="12" fill="var(--muted)">{i}</text>)}
        </svg>
      }
      controls={
        <>
          <Segmented label="Show" value={op} onChange={setOp} options={[{ value: "compare", label: "Compare" }, { value: "add", label: "Add" }, { value: "subtract", label: "Subtract" }]} />
          <div className="grid grid-cols-2 gap-3">
            <Slider label="Numerator 1" value={n1} min={0} max={12} step={1} onChange={setN1} />
            <Slider label="Denominator 1" value={d1} min={1} max={12} step={1} onChange={setD1} />
            <Slider label="Numerator 2" value={n2} min={0} max={12} step={1} onChange={setN2} />
            <Slider label="Denominator 2" value={d2} min={1} max={12} step={1} onChange={setD2} />
          </div>
          <div className="rounded-lg bg-math-soft px-3 py-2 text-lg">
            <Tex latex={op === "compare" ? `\\tfrac{${n1}}{${d1}} ${cmp} \\tfrac{${n2}}{${d2}}` : `\\tfrac{${e1}}{${L}} ${op === "add" ? "+" : "-"} \\tfrac{${e2}}{${L}} = \\tfrac{${rn}}{${L}} = ${fracTex(rn, L)}`} />
          </div>
        </>
      }
      readouts={[
        { label: "Common denominator", value: L, emphasis: true },
        { label: "Result (simplest form)", value: <Tex latex={op === "compare" ? cmp : fracTex(rn, L)} /> },
        { label: "Fraction 1 as decimal", value: fmt(n1 / d1, 4) },
        { label: "Fraction 2 as decimal", value: fmt(n2 / d2, 4) },
      ]}
      assumptions={[
        "Each bar is one whole (or more) cut into equal parts; thick lines mark each fraction's own denominator.",
        "The thin cells use the least common denominator, so equal-sized pieces can be counted and combined.",
        "Fractions with different denominators can only be added after rewriting them with a common denominator.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Double number line for ratios and unit rates
// ---------------------------------------------------------------------------

export function RatioLine({ params }: SimProps) {
  const init = { a: num(params, "a", 3, 1, 20), b: num(params, "b", 12, 1, 100), k: num(params, "k", 1, 0, 10) };
  const [a, setA] = useState(init.a);
  const [b, setB] = useState(init.b);
  const [k, setK] = useState(init.k);
  const W = 480, H = 220;
  const sx = scale(0, 10, 30, W - 30);
  const yt = 70, yb = 160;
  const marks = Array.from({ length: 11 }, (_, i) => i);
  return (
    <SimShell
      subject="mathematics"
      title="Double number line"
      onReset={() => { setA(init.a); setB(init.b); setK(init.k); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Double number line for the ratio ${a} to ${b}; highlighted ${fmt(a * k)} to ${fmt(b * k)}`} className="block h-auto w-full">
          <text x={30} y={yt - 32} fontSize="12" fill="var(--math)" fontWeight="700">Quantity A</text>
          <text x={30} y={yb + 44} fontSize="12" fill="var(--physics)" fontWeight="700">Quantity B</text>
          {[yt, yb].map((y) => <line key={y} x1={sx(0) - 6} x2={sx(10) + 6} y1={y} y2={y} stroke="var(--muted)" strokeWidth={2} />)}
          {marks.map((i) => (
            <g key={i}>
              <line x1={sx(i)} x2={sx(i)} y1={yt - 6} y2={yt + 6} stroke="var(--muted)" />
              <line x1={sx(i)} x2={sx(i)} y1={yb - 6} y2={yb + 6} stroke="var(--muted)" />
              <text x={sx(i)} y={yt - 12} textAnchor="middle" fontSize="11" fill="var(--math)">{fmt(a * i)}</text>
              <text x={sx(i)} y={yb + 22} textAnchor="middle" fontSize="11" fill="var(--physics)">{fmt(b * i)}</text>
            </g>
          ))}
          <line x1={sx(k)} x2={sx(k)} y1={yt} y2={yb} stroke="var(--chem)" strokeWidth={3} />
          <circle cx={sx(k)} cy={yt} r={6} fill="var(--math)" />
          <circle cx={sx(k)} cy={yb} r={6} fill="var(--physics)" />
          <line x1={sx(1)} x2={sx(1)} y1={yt} y2={yb} stroke="var(--muted)" strokeDasharray="4 4" />
        </svg>
      }
      controls={
        <>
          <Slider label="A in the base ratio" value={a} min={1} max={20} step={1} onChange={setA} />
          <Slider label="B in the base ratio" value={b} min={1} max={100} step={1} onChange={setB} />
          <Slider label="Scale factor" value={k} min={0} max={10} step={0.25} onChange={setK} />
          <div className="rounded-lg bg-math-soft px-3 py-2 text-lg"><Tex latex={`${a} : ${b} = ${fmt(a * k)} : ${fmt(b * k)}`} /></div>
        </>
      }
      readouts={[
        { label: "Scaled pair", value: `${fmt(a * k)} : ${fmt(b * k)}`, emphasis: true },
        { label: "B per 1 A", value: fmt(b / a, 3) },
        { label: "A per 1 B", value: fmt(a / b, 4) },
        { label: "Simplest form", value: `${a / gcd(a, b)} : ${b / gcd(a, b)}` },
      ]}
      assumptions={[
        "Both lines start at 0 and are scaled by the same factor, so every vertical pair is an equivalent ratio.",
        "The unit rate is the value paired with 1 of the other quantity: B ÷ A or A ÷ B.",
        "The model assumes the relationship is proportional (it passes through 0 and has a constant rate).",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Data explorer: dot plot, center and spread, box plot or histogram
// ---------------------------------------------------------------------------

const DATASETS: Record<string, number[]> = {
  quiz: [6, 7, 7, 8, 8, 8, 9, 9, 10, 10],
  sleep: [5, 6, 6, 7, 7, 7, 7, 8, 8, 9, 10],
  outlier: [2, 3, 3, 4, 4, 4, 5, 5, 6, 19],
  skewed: [1, 1, 2, 2, 2, 3, 3, 4, 6, 9, 14],
};

export function quartiles(sorted: number[]) {
  const med = (xs: number[]) => (xs.length % 2 ? xs[(xs.length - 1) / 2] : (xs[xs.length / 2 - 1] + xs[xs.length / 2]) / 2);
  const n = sorted.length;
  const lower = sorted.slice(0, Math.floor(n / 2));
  const upper = sorted.slice(Math.ceil(n / 2));
  return { q1: lower.length ? med(lower) : sorted[0], median: med(sorted), q3: upper.length ? med(upper) : sorted[n - 1] };
}

export function DataExplorer({ params }: SimProps) {
  const initSet = str(params, "dataset", "quiz", Object.keys(DATASETS));
  const initView = str(params, "view", "box", ["box", "histogram", "none"]) as "box" | "histogram" | "none";
  const [data, setData] = useState<number[]>(DATASETS[initSet]);
  const [view, setView] = useState(initView);
  const [bin, setBin] = useState(2);
  const [sel, setSel] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const W = 480, H = 330, X0 = 0, X1 = 20;
  const sx = scale(X0, X1, 24, W - 24);
  const axisY = 170;
  const sorted = [...data].sort((p, q) => p - q);
  const n = data.length;
  const mean = data.reduce((s, v) => s + v, 0) / n;
  const { q1, median, q3 } = quartiles(sorted);
  const counts = new Map<number, number>();
  for (const v of data) counts.set(v, (counts.get(v) ?? 0) + 1);
  const top = Math.max(...counts.values());
  const modes = top > 1 ? [...counts].filter(([, c]) => c === top).map(([v]) => v).sort((p, q) => p - q) : [];
  const sd = Math.sqrt(data.reduce((s, v) => s + (v - mean) ** 2, 0) / n);
  const iqr = q3 - q1;
  const outliers = sorted.filter((v) => v < q1 - 1.5 * iqr || v > q3 + 1.5 * iqr);
  const inliers = sorted.filter((v) => !outliers.includes(v));
  // Stack dots by value (index order inside each value).
  const seen = new Map<number, number>();
  const dots = data.map((v, i) => { const s = seen.get(v) ?? 0; seen.set(v, s + 1); return { v, i, s }; });

  const setValue = (i: number, v: number) => setData((d) => d.map((x, j) => (j === i ? Math.max(X0, Math.min(X1, Math.round(v))) : x)));
  const onMove = (e: PointerEvent<SVGSVGElement>) => {
    if (sel === null || !svgRef.current || !(e.buttons & 1)) return;
    const r = svgRef.current.getBoundingClientRect();
    setValue(sel, sx.invert(((e.clientX - r.left) / r.width) * W));
  };
  const onKey = (i: number) => (e: KeyboardEvent) => {
    const d = { ArrowLeft: -1, ArrowRight: 1 }[e.key];
    if (d === undefined) return;
    e.preventDefault();
    setValue(i, data[i] + d);
  };
  const bins: { lo: number; c: number }[] = [];
  for (let lo = X0; lo < X1; lo += bin) bins.push({ lo, c: data.filter((v) => v >= lo && (v < lo + bin || (lo + bin >= X1 && v <= X1))).length });
  const binMax = Math.max(1, ...bins.map((b) => b.c));
  const histH = 90;
  return (
    <SimShell
      subject="mathematics"
      title="Data explorer"
      onReset={() => { setData(DATASETS[initSet]); setView(initView); }}
      visual={
        <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Dot plot of ${n} values. Mean ${fmt(mean)}, median ${fmt(median)}.`} className="block h-auto w-full touch-none select-none" onPointerMove={onMove} onPointerUp={() => setSel(null)}>
          <NumberAxis x0={X0} x1={X1} y={axisY} sx={sx} labelEvery={2} />
          {dots.map(({ v, i, s }) => (
            <circle key={i} tabIndex={0} role="slider" aria-label={`Value ${i + 1}`} aria-valuenow={v} aria-valuemin={X0} aria-valuemax={X1}
              cx={sx(v)} cy={axisY - 16 - s * 16} r={7} fill={outliers.includes(v) && view === "box" ? "var(--danger)" : "var(--math)"} stroke={sel === i ? "var(--ink)" : "none"} strokeWidth={2}
              className="cursor-grab outline-none focus-visible:stroke-[var(--ink)]" onPointerDown={(e) => { setSel(i); svgRef.current?.setPointerCapture(e.pointerId); }} onKeyDown={onKey(i)} />
          ))}
          <polygon points={`${sx(mean)},${axisY + 4} ${sx(mean) - 7},${axisY + 16} ${sx(mean) + 7},${axisY + 16}`} fill="var(--chem)" />
          <text x={sx(mean)} y={axisY + 40} textAnchor="middle" fontSize="11" fill="var(--chem)" fontWeight="700">mean</text>
          {view === "box" && (
            <g transform={`translate(0 ${axisY + 70})`}>
              <line x1={sx(inliers[0])} x2={sx(q1)} y1={30} y2={30} stroke="var(--ink)" strokeWidth={2} />
              <line x1={sx(q3)} x2={sx(inliers[inliers.length - 1])} y1={30} y2={30} stroke="var(--ink)" strokeWidth={2} />
              <rect x={sx(q1)} y={10} width={Math.max(1, sx(q3) - sx(q1))} height={40} fill="var(--math)" fillOpacity={0.18} stroke="var(--ink)" strokeWidth={2} />
              <line x1={sx(median)} x2={sx(median)} y1={10} y2={50} stroke="var(--ink)" strokeWidth={3} />
              {[inliers[0], inliers[inliers.length - 1]].map((v, k) => <line key={k} x1={sx(v)} x2={sx(v)} y1={18} y2={42} stroke="var(--ink)" strokeWidth={2} />)}
              {outliers.map((v, k) => <circle key={k} cx={sx(v)} cy={30} r={4} fill="none" stroke="var(--danger)" strokeWidth={2} />)}
            </g>
          )}
          {view === "histogram" && (
            <g transform={`translate(0 ${axisY + 50})`}>
              {bins.map((b) => (
                <g key={b.lo}>
                  <rect x={sx(b.lo)} y={histH - (b.c / binMax) * histH} width={sx(b.lo + bin) - sx(b.lo)} height={(b.c / binMax) * histH} fill="var(--physics)" fillOpacity={0.6} stroke="var(--surface)" strokeWidth={2} />
                  {b.c > 0 && <text x={(sx(b.lo) + sx(b.lo + bin)) / 2} y={histH - (b.c / binMax) * histH - 4} textAnchor="middle" fontSize="11" fill="var(--ink)">{b.c}</text>}
                </g>
              ))}
              <line x1={sx(X0)} x2={sx(X1)} y1={histH} y2={histH} stroke="var(--muted)" />
            </g>
          )}
        </svg>
      }
      controls={
        <>
          <Segmented label="Lower display" value={view} onChange={setView} options={[{ value: "box", label: "Box plot" }, { value: "histogram", label: "Histogram" }, { value: "none", label: "None" }]} />
          {view === "histogram" && <Slider label="Bin width" value={bin} min={1} max={5} step={1} onChange={setBin} />}
          <p className="text-sm text-muted">Drag a dot, or focus it and use the arrow keys. Watch which measures move.</p>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="secondary" disabled={n >= 20} onClick={() => setData((d) => [...d, Math.round(mean)])}>Add a value</Button>
            <Button size="sm" variant="secondary" disabled={n <= 3} onClick={() => setData((d) => d.slice(0, -1))}>Remove last</Button>
          </div>
        </>
      }
      readouts={[
        { label: "Mean", value: fmt(mean), emphasis: true },
        { label: "Median", value: fmt(median), emphasis: true },
        { label: "Mode", value: modes.length ? modes.join(", ") : "None" },
        { label: "Range", value: fmt(sorted[n - 1] - sorted[0]) },
        { label: "Q1 / Q3", value: `${fmt(q1)} / ${fmt(q3)}` },
        { label: "IQR", value: fmt(iqr) },
        { label: "Std. deviation (σ)", value: fmt(sd) },
        { label: "Count", value: n },
      ]}
      assumptions={[
        "Values are whole numbers from 0 to 20 so the dots stack cleanly.",
        "Quartiles use the median-of-halves method (the median is left out of both halves when n is odd), as in most US textbooks. Software may use other methods and give slightly different values.",
        "Outliers are values more than 1.5 × IQR below Q1 or above Q3; they are drawn separately on the box plot.",
        "The standard deviation shown is the population value σ (divide by n).",
        "Histogram bins include their left edge and exclude their right edge, except the last bin.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Area and volume
// ---------------------------------------------------------------------------

type ShapeId = "rectangle" | "parallelogram" | "triangle" | "trapezoid" | "circle" | "prism" | "cylinder";

export function AreaVolume({ params }: SimProps) {
  const initShape = str(params, "shape", "rectangle", ["rectangle", "parallelogram", "triangle", "trapezoid", "circle", "prism", "cylinder"]) as ShapeId;
  const [shape, setShape] = useState<ShapeId>(initShape);
  const [b, setB] = useState(6);
  const [b2, setB2] = useState(3);
  const [h, setH] = useState(4);
  const [d, setD] = useState(3);
  const [r, setR] = useState(3);
  const W = 480, H = 300;
  const u = 26; // px per unit
  const ox = 60, oy = 250;
  let area = 0, extraLabel = "", extra = 0, latex = "";
  let fig: React.ReactNode = null;
  const fill = { fill: "var(--math)", fillOpacity: 0.2, stroke: "var(--math)", strokeWidth: 3, strokeLinejoin: "round" as const };
  const dim = (x1: number, y1: number, x2: number, y2: number, t: string, dx = 0, dy = 0) => (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--ink)" strokeDasharray="4 3" />
      <text x={(x1 + x2) / 2 + dx} y={(y1 + y2) / 2 + dy} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)">{t}</text>
    </g>
  );
  switch (shape) {
    case "rectangle":
      area = b * h; extraLabel = "Perimeter"; extra = 2 * (b + h); latex = `A = bh = ${b} \\cdot ${h} = ${fmt(area)}`;
      fig = <><rect x={ox} y={oy - h * u} width={b * u} height={h * u} {...fill} />{dim(ox, oy + 16, ox + b * u, oy + 16, `b = ${b}`, 0, 16)}{dim(ox - 16, oy, ox - 16, oy - h * u, `h = ${h}`, -18, 4)}</>;
      break;
    case "parallelogram": {
      const s = 2;
      area = b * h; extraLabel = "Slanted side"; extra = Math.hypot(s, h); latex = `A = bh = ${b} \\cdot ${h} = ${fmt(area)}`;
      fig = <><polygon points={`${ox},${oy} ${ox + b * u},${oy} ${ox + (b + s) * u},${oy - h * u} ${ox + s * u},${oy - h * u}`} {...fill} />{dim(ox, oy + 16, ox + b * u, oy + 16, `b = ${b}`, 0, 16)}{dim(ox + s * u, oy, ox + s * u, oy - h * u, `h = ${h}`, 22, 4)}</>;
      break;
    }
    case "triangle": {
      const apex = b / 3;
      area = (b * h) / 2; extraLabel = "Matching rectangle"; extra = b * h; latex = `A = \\tfrac12 bh = \\tfrac12 \\cdot ${b} \\cdot ${h} = ${fmt(area)}`;
      fig = <><rect x={ox} y={oy - h * u} width={b * u} height={h * u} fill="none" stroke="var(--muted)" strokeDasharray="5 4" /><polygon points={`${ox},${oy} ${ox + b * u},${oy} ${ox + apex * u},${oy - h * u}`} {...fill} />{dim(ox, oy + 16, ox + b * u, oy + 16, `b = ${b}`, 0, 16)}{dim(ox + apex * u, oy, ox + apex * u, oy - h * u, `h = ${h}`, 22, 4)}</>;
      break;
    }
    case "trapezoid": {
      const off = (b - b2) / 2;
      area = ((b + b2) / 2) * h; extraLabel = "Average base"; extra = (b + b2) / 2; latex = `A = \\tfrac{b_1 + b_2}{2} h = \\tfrac{${b} + ${b2}}{2} \\cdot ${h} = ${fmt(area)}`;
      fig = <><polygon points={`${ox},${oy} ${ox + b * u},${oy} ${ox + (off + b2) * u},${oy - h * u} ${ox + off * u},${oy - h * u}`} {...fill} />{dim(ox, oy + 16, ox + b * u, oy + 16, `b₁ = ${b}`, 0, 16)}{dim(ox + off * u, oy - h * u - 14, ox + (off + b2) * u, oy - h * u - 14, `b₂ = ${b2}`, 0, -8)}{dim(ox + (off + b2) * u + 14, oy, ox + (off + b2) * u + 14, oy - h * u, `h = ${h}`, 26, 4)}</>;
      break;
    }
    case "circle":
      area = Math.PI * r * r; extraLabel = "Circumference"; extra = 2 * Math.PI * r; latex = `A = \\pi r^2 = \\pi \\cdot ${r}^2 \\approx ${fmt(area)}`;
      fig = <><circle cx={240} cy={150} r={r * u} {...fill} /><circle cx={240} cy={150} r={3} fill="var(--ink)" />{dim(240, 150, 240 + r * u, 150, `r = ${r}`, 0, -8)}</>;
      break;
    case "prism": {
      const k = 0.5, dx = d * u * k, dy = d * u * k;
      area = b * h * d; extraLabel = "Surface area"; extra = 2 * (b * h + b * d + h * d); latex = `V = Bh = (\\ell w) h = ${b} \\cdot ${d} \\cdot ${h} = ${fmt(area)}`;
      fig = (
        <>
          <polygon points={`${ox},${oy - h * u} ${ox + dx},${oy - h * u - dy} ${ox + b * u + dx},${oy - h * u - dy} ${ox + b * u},${oy - h * u}`} {...fill} fillOpacity={0.3} />
          <polygon points={`${ox + b * u},${oy} ${ox + b * u + dx},${oy - dy} ${ox + b * u + dx},${oy - h * u - dy} ${ox + b * u},${oy - h * u}`} {...fill} fillOpacity={0.12} />
          <rect x={ox} y={oy - h * u} width={b * u} height={h * u} {...fill} />
          {dim(ox, oy + 16, ox + b * u, oy + 16, `ℓ = ${b}`, 0, 16)}{dim(ox - 16, oy, ox - 16, oy - h * u, `h = ${h}`, -18, 4)}
          <text x={ox + b * u + dx / 2 + 14} y={oy - dy / 2 + 4} fontSize="13" fontWeight="700" fill="var(--ink)">w = {d}</text>
        </>
      );
      break;
    }
    case "cylinder": {
      const rx = r * u, ry = r * u * 0.3, cx = 240, top = 260 - h * u * 0.8 - ry, bot = 260 - ry;
      area = Math.PI * r * r * h; extraLabel = "Surface area"; extra = 2 * Math.PI * r * r + 2 * Math.PI * r * h; latex = `V = \\pi r^2 h = \\pi \\cdot ${r}^2 \\cdot ${h} \\approx ${fmt(area)}`;
      fig = (
        <>
          <path d={`M${cx - rx},${top} L${cx - rx},${bot} A${rx},${ry} 0 0 0 ${cx + rx},${bot} L${cx + rx},${top}`} {...fill} fillOpacity={0.15} />
          <ellipse cx={cx} cy={top} rx={rx} ry={ry} {...fill} fillOpacity={0.3} />
          {dim(cx, top, cx + rx, top, `r = ${r}`, 0, -8)}{dim(cx + rx + 16, bot, cx + rx + 16, top, `h = ${h}`, 24, 4)}
        </>
      );
      break;
    }
  }
  const solid = shape === "prism" || shape === "cylinder";
  const usesR = shape === "circle" || shape === "cylinder";
  return (
    <SimShell
      subject="mathematics"
      title="Area and volume"
      onReset={() => { setShape(initShape); setB(6); setB2(3); setH(4); setD(3); setR(3); }}
      visual={<svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${shape}: ${solid ? "volume" : "area"} ${fmt(area)}`} className="block h-auto w-full">{fig}</svg>}
      controls={
        <>
          <label className="block text-sm font-semibold">
            Shape
            <Select className="mt-1 w-full" value={shape} onChange={(e) => setShape(e.target.value as ShapeId)}>
              <option value="rectangle">Rectangle</option>
              <option value="parallelogram">Parallelogram</option>
              <option value="triangle">Triangle</option>
              <option value="trapezoid">Trapezoid</option>
              <option value="circle">Circle</option>
              <option value="prism">Rectangular prism</option>
              <option value="cylinder">Cylinder</option>
            </Select>
          </label>
          {!usesR && <Slider label={shape === "prism" ? "Length ℓ" : shape === "trapezoid" ? "Base b₁" : "Base b"} value={b} min={1} max={12} step={1} onChange={(v) => { setB(v); if (b2 > v) setB2(v); }} />}
          {shape === "trapezoid" && <Slider label="Base b₂" value={b2} min={1} max={b} step={1} onChange={setB2} />}
          {usesR && <Slider label="Radius r" value={r} min={1} max={4} step={0.5} onChange={setR} />}
          {shape !== "circle" && <Slider label="Height h" value={h} min={1} max={shape === "cylinder" ? 9 : 7} step={1} onChange={setH} />}
          {shape === "prism" && <Slider label="Width w" value={d} min={1} max={6} step={1} onChange={setD} />}
          <div className="overflow-x-auto rounded-lg bg-math-soft px-3 py-2"><Tex latex={latex} /></div>
        </>
      }
      readouts={[
        { label: solid ? "Volume (cubic units)" : "Area (square units)", value: fmt(area), emphasis: true },
        { label: extraLabel, value: fmt(extra) },
      ]}
      assumptions={[
        "Height is always measured perpendicular to the base, not along a slanted side.",
        "Lengths are in generic units; area is in square units and volume in cubic units.",
        "π is used to full precision; answers are rounded to two decimal places.",
        "Solids are drawn in a simple oblique view, so the depth is shortened on screen.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Inequalities on a number line
// ---------------------------------------------------------------------------

type Rel = "<" | "≤" | ">" | "≥";
const holds = (x: number, rel: Rel, c: number) => (rel === "<" ? x < c : rel === "≤" ? x <= c : rel === ">" ? x > c : x >= c);

export function InequalityLine({ params }: SimProps) {
  const init = {
    rel: str(params, "rel", "≥", ["<", "≤", ">", "≥"]) as Rel, c: num(params, "c", 2, -8, 8),
    mode: str(params, "mode", "single", ["single", "and", "or"]) as "single" | "and" | "or",
    rel2: str(params, "rel2", "<", ["<", "≤", ">", "≥"]) as Rel, c2: num(params, "c2", 6, -8, 8),
  };
  const [rel, setRel] = useState<Rel>(init.rel);
  const [c, setC] = useState(init.c);
  const [mode, setMode] = useState(init.mode);
  const [rel2, setRel2] = useState<Rel>(init.rel2);
  const [c2, setC2] = useState(init.c2);
  const [t, setT] = useState(0);
  const W = 480, H = 160;
  const sx = scale(-10, 10, 24, W - 24);
  const y = 80;
  const test = (x: number) => (mode === "single" ? holds(x, rel, c) : mode === "and" ? holds(x, rel, c) && holds(x, rel2, c2) : holds(x, rel, c) || holds(x, rel2, c2));
  // Shade by sampling: solid segments where the statement is true.
  const segs: [number, number][] = [];
  let start: number | null = null;
  const N = 800;
  for (let i = 0; i <= N; i++) {
    const x = -10 + (20 * i) / N;
    const ok = test(x) && !(Math.abs(x - c) < 1e-9 || Math.abs(x - c2) < 1e-9);
    if (ok && start === null) start = x;
    if ((!ok || i === N) && start !== null) { segs.push([start, ok ? x : x - 20 / N]); start = null; }
  }
  const ends = mode === "single" ? [{ c, rel }] : [{ c, rel }, { c: c2, rel: rel2 }];
  const iv = (r: Rel, v: number) => (r === "<" ? `(-\\infty, ${v})` : r === "≤" ? `(-\\infty, ${v}]` : r === ">" ? `(${v}, \\infty)` : `[${v}, \\infty)`);
  const tex = (r: Rel) => ({ "<": "<", "≤": "\\le", ">": ">", "≥": "\\ge" })[r];
  let interval = iv(rel, c);
  if (mode !== "single") {
    const lo = [rel, rel2].map((r, i) => ({ r, v: i ? c2 : c }));
    if (mode === "and") {
      const lower = lo.filter((x) => x.r === ">" || x.r === "≥").sort((p, q) => q.v - p.v)[0];
      const upper = lo.filter((x) => x.r === "<" || x.r === "≤").sort((p, q) => p.v - q.v)[0];
      if (lower && upper) interval = lower.v < upper.v || (lower.v === upper.v && lower.r === "≥" && upper.r === "≤")
        ? lower.v === upper.v ? `\\{${lower.v}\\}` : `${lower.r === "≥" ? "[" : "("}${lower.v}, ${upper.v}${upper.r === "≤" ? "]" : ")"}`
        : "\\varnothing";
      else interval = iv((lower ?? upper)!.r, (lower ?? upper)!.v);
    } else interval = `${iv(rel, c)} \\cup ${iv(rel2, c2)}`;
  }
  const relOpts = (["<", "≤", ">", "≥"] as Rel[]).map((r) => ({ value: r, label: r }));
  return (
    <SimShell
      subject="mathematics"
      title="Inequalities on a number line"
      onReset={() => { setRel(init.rel); setC(init.c); setMode(init.mode); setRel2(init.rel2); setC2(init.c2); setT(0); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Solution set ${interval.replace(/\\/g, "")}`} className="block h-auto w-full">
          <NumberAxis x0={-10} x1={10} y={y} sx={sx} labelEvery={2} />
          {segs.map(([a, b2], i) => <line key={i} x1={sx(a)} x2={sx(b2)} y1={y} y2={y} stroke="var(--math)" strokeWidth={7} strokeLinecap="butt" />)}
          {ends.map((e, i) => {
            const inSet = test(e.c);
            return <circle key={i} cx={sx(e.c)} cy={y} r={8} fill={inSet ? "var(--math)" : "var(--surface)"} stroke="var(--math)" strokeWidth={3} />;
          })}
          <g>
            <line x1={sx(t)} x2={sx(t)} y1={y - 44} y2={y - 14} stroke={test(t) ? "var(--success)" : "var(--danger)"} strokeWidth={2.5} />
            <text x={sx(t)} y={y - 50} textAnchor="middle" fontSize="12" fontWeight="700" fill={test(t) ? "var(--success)" : "var(--danger)"}>x = {t} {test(t) ? "✓" : "✗"}</text>
          </g>
        </svg>
      }
      controls={
        <>
          <Segmented label="Type" value={mode} onChange={setMode} options={[{ value: "single", label: "Single" }, { value: "and", label: "And" }, { value: "or", label: "Or" }]} />
          <Segmented label="First relation" value={rel} onChange={setRel} options={relOpts} />
          <Slider label="First boundary" value={c} min={-8} max={8} step={1} onChange={setC} />
          {mode !== "single" && (
            <>
              <Segmented label="Second relation" value={rel2} onChange={setRel2} options={relOpts} />
              <Slider label="Second boundary" value={c2} min={-8} max={8} step={1} onChange={setC2} />
            </>
          )}
          <Slider label="Test value" value={t} min={-10} max={10} step={0.5} onChange={setT} />
          <div className="rounded-lg bg-math-soft px-3 py-2 text-lg">
            <Tex latex={mode === "single" ? `x ${tex(rel)} ${c}` : `x ${tex(rel)} ${c} \\text{ ${mode} } x ${tex(rel2)} ${c2}`} />
          </div>
        </>
      }
      readouts={[
        { label: "Interval notation", value: <Tex latex={interval} />, emphasis: true },
        { label: `Is x = ${t} a solution?`, value: test(t) ? "Yes" : "No" },
      ]}
      assumptions={[
        "A closed (filled) circle means the boundary is included (≤ or ≥); an open circle means it is not (< or >).",
        "“And” keeps only values that satisfy both statements (the overlap); “or” keeps values that satisfy at least one.",
        "The line shows −10 to 10, but the shaded rays continue forever in the direction shown.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Coordinate plane: plot a point, quadrants and reflections
// ---------------------------------------------------------------------------

export function CoordinatePlotter({ params }: SimProps) {
  const init = { x: num(params, "x", 3, -8, 8), y: num(params, "y", 2, -6, 6) };
  const [p, setP] = useState(init);
  const [reflect, setReflect] = useState<"none" | "x" | "y" | "origin">("none");
  const svgRef = useRef<SVGSVGElement>(null);
  const drag = useRef(false);
  const [X0, X1, Y0, Y1] = [-8, 8, -7, 7];
  const sx = scale(X0, X1, 0, 480);
  const sy = scale(Y0, Y1, 400, 0);
  const quadrant = p.x === 0 && p.y === 0 ? "Origin" : p.x === 0 ? "On the y-axis" : p.y === 0 ? "On the x-axis" : p.x > 0 ? (p.y > 0 ? "I" : "IV") : p.y > 0 ? "II" : "III";
  const img = reflect === "x" ? { x: p.x, y: -p.y } : reflect === "y" ? { x: -p.x, y: p.y } : reflect === "origin" ? { x: -p.x, y: -p.y } : null;
  const onMove = (e: PointerEvent<SVGSVGElement>) => {
    if (!drag.current || !svgRef.current) return;
    const r = svgRef.current.getBoundingClientRect();
    setP({ x: Math.max(X0, Math.min(X1, Math.round(sx.invert(((e.clientX - r.left) / r.width) * 480)))), y: Math.max(Y0, Math.min(Y1, Math.round(sy.invert(((e.clientY - r.top) / r.height) * 400)))) });
  };
  const onKey = (e: KeyboardEvent) => {
    const d = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, 1], ArrowDown: [0, -1] }[e.key];
    if (!d) return;
    e.preventDefault();
    setP((q) => ({ x: Math.max(X0, Math.min(X1, q.x + d[0])), y: Math.max(Y0, Math.min(Y1, q.y + d[1])) }));
  };
  return (
    <SimShell
      subject="mathematics"
      title="Coordinate plane"
      onReset={() => { setP(init); setReflect("none"); }}
      visual={
        <Plane xMin={X0} xMax={X1} yMin={Y0} yMax={Y1} label={`Point at (${p.x}, ${p.y})`} svgRef={svgRef} onPointerMove={onMove} onPointerUp={() => (drag.current = false)}>
          {["I", "II", "III", "IV"].map((q, i) => (
            <text key={q} x={[sx(6), sx(-6), sx(-6), sx(6)][i]} y={[sy(5.5), sy(5.5), sy(-5.5), sy(-5.5)][i]} textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--muted)" fillOpacity={0.5}>{q}</text>
          ))}
          <line x1={sx(0)} x2={sx(p.x)} y1={sy(p.y)} y2={sy(p.y)} stroke="var(--math)" strokeDasharray="5 4" />
          <line x1={sx(p.x)} x2={sx(p.x)} y1={sy(0)} y2={sy(p.y)} stroke="var(--math)" strokeDasharray="5 4" />
          {img && (
            <>
              <line x1={sx(p.x)} y1={sy(p.y)} x2={sx(img.x)} y2={sy(img.y)} stroke="var(--chem)" strokeDasharray="3 4" />
              <circle cx={sx(img.x)} cy={sy(img.y)} r={7} fill="var(--chem)" />
              <text x={sx(img.x) + 10} y={sy(img.y) - 10} fontSize="13" fontWeight="700" fill="var(--chem)">P′({img.x}, {img.y})</text>
            </>
          )}
          <g tabIndex={0} role="button" aria-label={`Point P at ${p.x}, ${p.y}. Use arrow keys to move.`} className="cursor-grab outline-none [&:focus-visible>circle]:stroke-[var(--ink)]"
            onPointerDown={(e) => { drag.current = true; svgRef.current?.setPointerCapture(e.pointerId); }} onKeyDown={onKey}>
            <circle cx={sx(p.x)} cy={sy(p.y)} r={16} fill="var(--math)" fillOpacity={0.15} stroke="transparent" strokeWidth={3} />
            <circle cx={sx(p.x)} cy={sy(p.y)} r={8} fill="var(--math)" />
          </g>
          <text x={sx(p.x) + 12} y={sy(p.y) - 12} fontSize="13" fontWeight="700" fill="var(--math)">P({p.x}, {p.y})</text>
        </Plane>
      }
      controls={
        <>
          <p className="text-sm text-muted">Drag P, or focus it and use the arrow keys. The dashed lines show how far to move along each axis.</p>
          <Segmented label="Reflect P" value={reflect} onChange={setReflect} options={[{ value: "none", label: "Off" }, { value: "x", label: "x-axis" }, { value: "y", label: "y-axis" }, { value: "origin", label: "Origin" }]} />
        </>
      }
      readouts={[
        { label: "Ordered pair", value: `(${p.x}, ${p.y})`, emphasis: true },
        { label: "Quadrant", value: quadrant },
        { label: "Distance to x-axis", value: Math.abs(p.y) },
        { label: "Distance to y-axis", value: Math.abs(p.x) },
      ]}
      assumptions={[
        "An ordered pair (x, y) lists the horizontal move first, then the vertical move, starting at the origin.",
        "Quadrants are numbered I to IV counterclockwise starting from the upper right; points on an axis are in no quadrant.",
        "Reflecting over the x-axis changes the sign of y; over the y-axis changes the sign of x; through the origin changes both.",
      ]}
    />
  );
}
