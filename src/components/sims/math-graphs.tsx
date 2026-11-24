// Mathematics simulations built on a shared coordinate grid.

import { useMemo, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { clamp, evaluate, snap, standardLatex, vertexLatex, zeros, type VertexForm } from "../../lib/quadratic";
import { Math as Tex } from "../ui/Math";
import { Button } from "../ui";
import { fmt, num, scale, Segmented, SimShell, Slider, type SimProps } from "./shell";

const W = 480;
const H = 400;

/** Coordinate plane with gridlines, axes and integer labels. */
export function Plane({ xMin, xMax, yMin, yMax, children, label, svgRef, onPointerMove, onPointerUp, step = 1 }: {
  xMin: number; xMax: number; yMin: number; yMax: number; children: ReactNode; label: string; step?: number;
  svgRef?: React.Ref<SVGSVGElement>; onPointerMove?: (e: PointerEvent<SVGSVGElement>) => void; onPointerUp?: () => void;
}) {
  const sx = scale(xMin, xMax, 0, W);
  const sy = scale(yMin, yMax, H, 0);
  const xs: number[] = [];
  for (let x = Math.ceil(xMin / step) * step; x <= xMax; x += step) xs.push(Number(x.toFixed(6)));
  const ys: number[] = [];
  for (let y = Math.ceil(yMin / step) * step; y <= yMax; y += step) ys.push(Number(y.toFixed(6)));
  return (
    <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} className="block h-auto w-full touch-none select-none" onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}>
      {xs.map((x) => <line key={`gx${x}`} x1={sx(x)} x2={sx(x)} y1={0} y2={H} stroke="var(--line)" strokeWidth={x === 0 ? 0 : 1} />)}
      {ys.map((y) => <line key={`gy${y}`} y1={sy(y)} y2={sy(y)} x1={0} x2={W} stroke="var(--line)" strokeWidth={y === 0 ? 0 : 1} />)}
      {yMin <= 0 && yMax >= 0 && <line x1={0} x2={W} y1={sy(0)} y2={sy(0)} stroke="var(--muted)" strokeWidth={1.5} />}
      {xMin <= 0 && xMax >= 0 && <line y1={0} y2={H} x1={sx(0)} x2={sx(0)} stroke="var(--muted)" strokeWidth={1.5} />}
      {xs.filter((x) => x !== 0 && Math.abs(x) % (step * 2) === 0).map((x) => (
        <text key={`lx${x}`} x={sx(x)} y={Math.min(H - 4, Math.max(12, sy(0) + 15))} textAnchor="middle" fontSize="11" fill="var(--muted)">{x}</text>
      ))}
      {ys.filter((y) => y !== 0 && Math.abs(y) % (step * 2) === 0).map((y) => (
        <text key={`ly${y}`} x={Math.max(14, Math.min(W - 14, sx(0) - 8))} y={sy(y) + 4} textAnchor="end" fontSize="11" fill="var(--muted)">{y}</text>
      ))}
      {children}
    </svg>
  );
}

export function curvePath(f: (x: number) => number, x0: number, x1: number, sx: (x: number) => number, sy: (y: number) => number, yClip: [number, number], n = 240) {
  let d = "";
  let pen = false;
  for (let i = 0; i <= n; i++) {
    const x = x0 + ((x1 - x0) * i) / n;
    const y = f(x);
    if (!Number.isFinite(y) || y < yClip[0] - 50 || y > yClip[1] + 50) {
      pen = false;
      continue;
    }
    d += `${pen ? "L" : "M"}${sx(x).toFixed(1)},${sy(y).toFixed(1)}`;
    pen = true;
  }
  return d;
}

// ---------------------------------------------------------------------------
// Parabola (vertex form) explorer
// ---------------------------------------------------------------------------

export function VertexExplorer({ params }: SimProps) {
  const init: VertexForm = { a: num(params, "a", 1, -4, 4) || 1, h: num(params, "h", -1, -5, 5), k: num(params, "k", -3, -4.5, 4.5) };
  const [v, setV] = useState<VertexForm>(init);
  const svgRef = useRef<SVGSVGElement>(null);
  const drag = useRef<"vertex" | "shape" | null>(null);
  const [X0, X1, Y0, Y1] = [-6, 6, -5, 5];
  const sx = scale(X0, X1, 0, W);
  const sy = scale(Y0, Y1, H, 0);
  const roots = zeros(v);
  const nz = (a: number, prev: number) => (a === 0 ? (prev > 0 ? -0.5 : 0.5) : a);

  const move = (which: "vertex" | "shape", x: number, y: number) =>
    setV((p) => (which === "vertex" ? { ...p, h: clamp(snap(x), -5, 5), k: clamp(snap(y), -4.5, 4.5) } : { ...p, a: nz(clamp(snap(y - p.k), -4, 4), p.a) }));

  const onMove = (e: PointerEvent<SVGSVGElement>) => {
    if (!drag.current || !svgRef.current) return;
    const r = svgRef.current.getBoundingClientRect();
    move(drag.current, sx.invert(((e.clientX - r.left) / r.width) * W), sy.invert(((e.clientY - r.top) / r.height) * H));
  };
  const key = (which: "vertex" | "shape") => (e: KeyboardEvent) => {
    const s = e.shiftKey ? 1 : 0.5;
    const d = { ArrowLeft: [-s, 0], ArrowRight: [s, 0], ArrowUp: [0, s], ArrowDown: [0, -s] }[e.key];
    if (!d) return;
    e.preventDefault();
    setV((p) => (which === "vertex" ? { ...p, h: clamp(p.h + d[0], -5, 5), k: clamp(p.k + d[1], -4.5, 4.5) } : { ...p, a: nz(clamp(p.a + d[1], -4, 4), p.a) }));
  };
  const shapeY = v.k + v.a;

  return (
    <SimShell
      subject="mathematics"
      title="Parabola explorer"
      onReset={() => setV(init)}
      visual={
        <Plane xMin={X0} xMax={X1} yMin={Y0} yMax={Y1} label={`Graph of ${vertexLatex(v)}`} svgRef={svgRef} onPointerMove={onMove} onPointerUp={() => (drag.current = null)}>
          <line x1={sx(v.h)} x2={sx(v.h)} y1={0} y2={H} stroke="var(--math)" strokeOpacity={0.45} strokeDasharray="5 5" />
          <path d={curvePath((x) => evaluate(v, x), X0, X1, sx, sy, [Y0, Y1])} fill="none" stroke="var(--math)" strokeWidth={3.5} strokeLinecap="round" />
          {roots.map((r) => <circle key={r} cx={sx(r)} cy={sy(0)} r={5} fill="var(--surface)" stroke="var(--math)" strokeWidth={2.5} />)}
          {shapeY >= Y0 && shapeY <= Y1 && (
            <g tabIndex={0} role="slider" aria-label="Shape point; sets a" aria-valuenow={v.a} aria-valuemin={-4} aria-valuemax={4} className="cursor-grab outline-none [&:focus-visible>circle]:stroke-primary"
              onPointerDown={(e) => { drag.current = "shape"; svgRef.current?.setPointerCapture(e.pointerId); }} onKeyDown={key("shape")}>
              <circle cx={sx(v.h + 1)} cy={sy(shapeY)} r={14} fill="transparent" stroke="transparent" strokeWidth={3} />
              <circle cx={sx(v.h + 1)} cy={sy(shapeY)} r={7} fill="var(--surface)" stroke="var(--math)" strokeWidth={3} />
            </g>
          )}
          <g tabIndex={0} role="button" aria-label={`Vertex at ${v.h}, ${v.k}. Use arrow keys to move.`} className="cursor-grab outline-none [&:focus-visible>circle]:stroke-primary"
            onPointerDown={(e) => { drag.current = "vertex"; svgRef.current?.setPointerCapture(e.pointerId); }} onKeyDown={key("vertex")}>
            <circle cx={sx(v.h)} cy={sy(v.k)} r={16} fill="var(--math)" fillOpacity={0.15} stroke="transparent" strokeWidth={3} />
            <circle cx={sx(v.h)} cy={sy(v.k)} r={8} fill="var(--math)" />
          </g>
        </Plane>
      }
      controls={
        <>
          <div className="rounded-lg bg-math-soft px-3 py-2 text-lg"><Tex latex={vertexLatex(v)} /></div>
          <p className="text-sm text-muted">Drag the filled vertex or the hollow point, or focus one and use the arrow keys (Shift for bigger steps).</p>
        </>
      }
      readouts={[
        { label: "Vertex", value: `(${fmt(v.h)}, ${fmt(v.k)})`, emphasis: true },
        { label: "Opens", value: v.a > 0 ? "Up (minimum)" : "Down (maximum)" },
        { label: "Zeros", value: roots.length ? roots.map((r) => fmt(r)).join(", ") : "None (real)" },
        { label: "Expanded", value: <Tex latex={standardLatex(v).replace("y = ", "")} /> },
      ]}
      assumptions={[
        "Exact algebra: zeros come from solving a(x − h)² + k = 0, so they're real only when −k/a ≥ 0.",
        "Values snap to steps of 0.5 so the numbers stay readable; the graph window is −6 ≤ x ≤ 6, −5 ≤ y ≤ 5.",
        "a can't be 0 because then the function is no longer quadratic.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Slope-intercept explorer
// ---------------------------------------------------------------------------

export function LinearGraph({ params }: SimProps) {
  const init = { m: num(params, "m", 1, -5, 5), b: num(params, "b", 0, -5, 5) };
  const [m, setM] = useState(init.m);
  const [b, setB] = useState(init.b);
  const [X0, X1, Y0, Y1] = [-6, 6, -6, 6];
  const sx = scale(X0, X1, 0, W);
  const sy = scale(Y0, Y1, H, 0);
  const f = (x: number) => m * x + b;
  const runX = Math.abs(b + m) <= 6 ? 0 : -1;
  const xInt = m !== 0 ? -b / m : null;
  const eq = `y = ${m === 0 ? "" : m === 1 ? "x" : m === -1 ? "-x" : `${fmt(m)}x`}${b === 0 ? (m === 0 ? "0" : "") : `${m === 0 ? "" : b > 0 ? " + " : " - "}${fmt(m === 0 ? b : Math.abs(b))}`}`;
  return (
    <SimShell
      subject="mathematics"
      title="Slope and intercept"
      onReset={() => { setM(init.m); setB(init.b); }}
      visual={
        <Plane xMin={X0} xMax={X1} yMin={Y0} yMax={Y1} label={`Graph of ${eq}`}>
          <path d={`M${sx(runX)},${sy(f(runX))} L${sx(runX + 1)},${sy(f(runX))} L${sx(runX + 1)},${sy(f(runX + 1))}`} fill="none" stroke="var(--chem)" strokeWidth={2.5} strokeDasharray="6 4" />
          <text x={sx(runX + 0.5)} y={sy(f(runX)) + (m >= 0 ? 16 : -8)} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--ink)">run 1</text>
          <text x={sx(runX + 1) + 6} y={sy(f(runX) + m / 2) + 4} fontSize="12" fontWeight="600" fill="var(--ink)">rise {fmt(m)}</text>
          <path d={curvePath(f, X0, X1, sx, sy, [Y0, Y1], 2)} stroke="var(--math)" strokeWidth={3.5} fill="none" />
          <circle cx={sx(0)} cy={sy(b)} r={6} fill="var(--math)" />
          {xInt !== null && xInt >= X0 && xInt <= X1 && <circle cx={sx(xInt)} cy={sy(0)} r={5} fill="var(--surface)" stroke="var(--math)" strokeWidth={2.5} />}
        </Plane>
      }
      controls={
        <>
          <div className="rounded-lg bg-math-soft px-3 py-2 text-lg"><Tex latex={eq} /></div>
          <Slider label={<>Slope <Tex latex="m" /></>} value={m} min={-5} max={5} step={0.5} onChange={setM} />
          <Slider label={<>Intercept <Tex latex="b" /></>} value={b} min={-5} max={5} step={0.5} onChange={setB} />
        </>
      }
      readouts={[
        { label: "Slope", value: fmt(m), emphasis: true },
        { label: "y-intercept", value: `(0, ${fmt(b)})` },
        { label: "x-intercept", value: xInt === null ? (b === 0 ? "Every x" : "None") : `(${fmt(xInt)}, 0)` },
        { label: "Direction", value: m > 0 ? "Rising" : m < 0 ? "Falling" : "Horizontal" },
      ]}
      assumptions={["Exact: every point satisfies y = mx + b.", "The dashed triangle shows the change in y for a run of 1, which equals the slope.", "Vertical lines (undefined slope) can't be written as y = mx + b."]}
    />
  );
}

// ---------------------------------------------------------------------------
// Equation balance: solve ax + b = c with legal moves only
// ---------------------------------------------------------------------------

type Eq = { a: number; b: number; c: number };
export function BalanceEquation({ params }: SimProps) {
  const init: Eq = { a: num(params, "a", 3, -9, 9) || 1, b: num(params, "b", 5, -40, 40), c: num(params, "c", 20, -60, 60) };
  const [eq, setEq] = useState<Eq>(init);
  const [history, setHistory] = useState<string[]>([]);
  const term = (a: number, b: number) => {
    const ax = a === 1 ? "x" : a === -1 ? "-x" : `${fmt(a, 3)}x`;
    if (a === 0) return fmt(b, 3);
    return b === 0 ? ax : `${ax} ${b > 0 ? "+" : "-"} ${fmt(Math.abs(b), 3)}`;
  };
  const latex = `${term(eq.a, eq.b)} = ${fmt(eq.c, 3)}`;
  const solved = eq.a === 1 && eq.b === 0;
  const solution = (init.c - init.b) / init.a;
  const apply = (label: string, next: Eq) => {
    setHistory((h) => [...h, `${label}: ${latex} → ${term(next.a, next.b)} = ${fmt(next.c, 3)}`]);
    setEq(next);
  };
  const tilt = Math.max(-12, Math.min(12, (eq.a * solution + eq.b - eq.c) * 2));
  return (
    <SimShell
      subject="mathematics"
      title="Equation balance"
      onReset={() => { setEq(init); setHistory([]); }}
      visual={
        <svg viewBox="0 0 480 300" role="img" aria-label={`Balance showing ${latex}`} className="block h-auto w-full">
          <g transform={`rotate(${tilt} 240 150)`}>
            <rect x={60} y={140} width={360} height={10} rx={5} fill="var(--muted)" />
            <rect x={70} y={70} width={150} height={70} rx={12} fill="var(--math-soft)" stroke="var(--math)" strokeWidth={2} />
            <rect x={260} y={70} width={150} height={70} rx={12} fill="var(--math-soft)" stroke="var(--math)" strokeWidth={2} />
            <foreignObject x={70} y={70} width={150} height={70}><div className="flex h-full items-center justify-center text-xl"><Tex latex={term(eq.a, eq.b)} /></div></foreignObject>
            <foreignObject x={260} y={70} width={150} height={70}><div className="flex h-full items-center justify-center text-xl"><Tex latex={fmt(eq.c, 3)} /></div></foreignObject>
          </g>
          <path d="M240 155 L210 250 L270 250 Z" fill="var(--line)" stroke="var(--muted)" />
          <text x={240} y={285} textAnchor="middle" fontSize="13" fill="var(--muted)">Both sides stay equal at every step</text>
        </svg>
      }
      controls={
        <>
          <div className="rounded-lg bg-math-soft px-3 py-2 text-lg"><Tex latex={latex} /></div>
          <div className="grid gap-2">
            <Button variant="secondary" disabled={eq.b === 0} onClick={() => apply(`Subtract ${fmt(eq.b, 3)}`, { ...eq, b: 0, c: eq.c - eq.b })}>
              {eq.b >= 0 ? "Subtract" : "Add"} {fmt(Math.abs(eq.b), 3)} on both sides
            </Button>
            <Button variant="secondary" disabled={eq.b !== 0 || eq.a === 1} onClick={() => apply(`Divide by ${fmt(eq.a, 3)}`, { a: 1, b: 0, c: eq.c / eq.a })}>
              Divide both sides by {fmt(eq.a, 3)}
            </Button>
            <Button variant="ghost" disabled={eq.b === 0 || eq.a === 1} onClick={() => apply(`Divide by ${fmt(eq.a, 3)}`, { a: 1, b: eq.b / eq.a, c: eq.c / eq.a })}>
              Divide first (try it)
            </Button>
          </div>
          {solved && <p className="rounded-lg bg-success-soft p-3 text-sm font-semibold">Solved: x = {fmt(eq.c, 3)}. Check: {fmt(init.a)}({fmt(eq.c, 3)}) + {fmt(init.b)} = {fmt(init.a * eq.c + init.b, 3)} ✓</p>}
          {history.length > 0 && (
            <ol className="list-decimal space-y-1 pl-5 text-xs text-muted">{history.map((h, i) => <li key={i}>{h}</li>)}</ol>
          )}
        </>
      }
      readouts={[{ label: "Steps taken", value: history.length }, { label: "Solution", value: solved ? `x = ${fmt(eq.c, 3)}` : "Not yet", emphasis: solved }]}
      assumptions={["Only operations that keep both sides equal are offered: adding/subtracting the same number, or dividing both sides by the same nonzero number.", "Dividing first is legal but divides every term, which can create fractions.", "The tilt of the beam is decorative; it levels out when both sides are written equivalently."]}
    />
  );
}

// ---------------------------------------------------------------------------
// Unit circle
// ---------------------------------------------------------------------------

const SPECIAL: Record<number, [string, string]> = {
  0: ["1", "0"], 30: ["\\tfrac{\\sqrt3}{2}", "\\tfrac12"], 45: ["\\tfrac{\\sqrt2}{2}", "\\tfrac{\\sqrt2}{2}"], 60: ["\\tfrac12", "\\tfrac{\\sqrt3}{2}"], 90: ["0", "1"],
};
function exactFor(deg: number): [string, string] | null {
  const d = ((deg % 360) + 360) % 360;
  const q = Math.floor(d / 90);
  const ref = [d, 180 - d, d - 180, 360 - d][q];
  const base = SPECIAL[ref];
  if (!base) return null;
  const sign = (s: string, neg: boolean) => (s === "0" ? "0" : neg ? `-${s}` : s);
  return [sign(base[0], q === 1 || q === 2), sign(base[1], q === 2 || q === 3)];
}
const RAD: Record<number, string> = { 0: "0", 30: "\\tfrac{\\pi}{6}", 45: "\\tfrac{\\pi}{4}", 60: "\\tfrac{\\pi}{3}", 90: "\\tfrac{\\pi}{2}", 120: "\\tfrac{2\\pi}{3}", 135: "\\tfrac{3\\pi}{4}", 150: "\\tfrac{5\\pi}{6}", 180: "\\pi", 210: "\\tfrac{7\\pi}{6}", 225: "\\tfrac{5\\pi}{4}", 240: "\\tfrac{4\\pi}{3}", 270: "\\tfrac{3\\pi}{2}", 300: "\\tfrac{5\\pi}{3}", 315: "\\tfrac{7\\pi}{4}", 330: "\\tfrac{11\\pi}{6}" };

export function UnitCircle({ params }: SimProps) {
  const init = num(params, "angle", 30, 0, 360);
  const [deg, setDeg] = useState(init);
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);
  const t = (deg * Math.PI) / 180;
  const c = Math.cos(t);
  const s = Math.sin(t);
  const R = 120;
  const cx0 = 150;
  const cy0 = 160;
  const px = cx0 + R * c;
  const py = cy0 - R * s;
  const exact = exactFor(deg);
  const tanUndefined = Math.abs(c) < 1e-9;
  const gx = scale(0, 360, 300, 470);
  const gy = scale(-1.2, 1.2, 250, 70);
  const onMove = (e: PointerEvent<SVGSVGElement>) => {
    if (!dragging.current || !svgRef.current) return;
    const r = svgRef.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 480 - cx0;
    const y = cy0 - ((e.clientY - r.top) / r.height) * 320;
    let a = (Math.atan2(y, x) * 180) / Math.PI;
    if (a < 0) a += 360;
    setDeg(Math.round(a / 5) * 5 % 360);
  };
  return (
    <SimShell
      subject="mathematics"
      title="Unit circle"
      onReset={() => setDeg(init)}
      visual={
        <svg ref={svgRef} viewBox="0 0 480 320" role="img" aria-label={`Unit circle at ${deg} degrees`} className="block h-auto w-full touch-none select-none" onPointerMove={onMove} onPointerUp={() => (dragging.current = false)}>
          <line x1={20} x2={280} y1={cy0} y2={cy0} stroke="var(--muted)" />
          <line x1={cx0} x2={cx0} y1={25} y2={295} stroke="var(--muted)" />
          <circle cx={cx0} cy={cy0} r={R} fill="none" stroke="var(--line)" strokeWidth={2} />
          <path d={`M${cx0 + 28},${cy0} A28,28 0 ${deg > 180 ? 1 : 0},0 ${cx0 + 28 * c},${cy0 - 28 * s}`} fill="none" stroke="var(--math)" strokeWidth={2} />
          <line x1={cx0} y1={cy0} x2={px} y2={py} stroke="var(--ink)" strokeWidth={2} />
          <line x1={cx0} y1={cy0} x2={px} y2={cy0} stroke="var(--physics)" strokeWidth={5} strokeLinecap="round" />
          <line x1={px} y1={cy0} x2={px} y2={py} stroke="var(--chem)" strokeWidth={5} strokeLinecap="round" />
          {!tanUndefined && Math.abs(s / c) < 2.2 && <line x1={cx0 + R} y1={cy0} x2={cx0 + R} y2={cy0 - R * (s / c)} stroke="var(--math)" strokeWidth={3} strokeDasharray="5 4" />}
          <g tabIndex={0} role="slider" aria-label="Angle" aria-valuenow={deg} aria-valuemin={0} aria-valuemax={360} aria-valuetext={`${deg} degrees`}
            onKeyDown={(e) => { const d = e.key === "ArrowUp" || e.key === "ArrowRight" ? 5 : e.key === "ArrowDown" || e.key === "ArrowLeft" ? -5 : 0; if (d) { e.preventDefault(); setDeg((x) => (x + d + 360) % 360); } }}
            onPointerDown={(e) => { dragging.current = true; svgRef.current?.setPointerCapture(e.pointerId); }} className="cursor-grab outline-none [&:focus-visible>circle]:stroke-primary">
            <circle cx={px} cy={py} r={14} fill="var(--math)" fillOpacity={0.15} stroke="transparent" strokeWidth={3} />
            <circle cx={px} cy={py} r={7} fill="var(--math)" />
          </g>
          {/* sine and cosine graphs */}
          <line x1={300} x2={470} y1={gy(0)} y2={gy(0)} stroke="var(--muted)" />
          <path d={curvePath((x) => Math.sin((x * Math.PI) / 180), 0, 360, gx, gy, [-2, 2], 90)} fill="none" stroke="var(--chem)" strokeWidth={2.5} />
          <path d={curvePath((x) => Math.cos((x * Math.PI) / 180), 0, 360, gx, gy, [-2, 2], 90)} fill="none" stroke="var(--physics)" strokeWidth={2.5} />
          <line x1={gx(deg)} x2={gx(deg)} y1={60} y2={260} stroke="var(--math)" strokeDasharray="4 4" />
          <circle cx={gx(deg)} cy={gy(s)} r={4.5} fill="var(--chem)" />
          <circle cx={gx(deg)} cy={gy(c)} r={4.5} fill="var(--physics)" />
          <text x={300} y={290} fontSize="12" fill="var(--muted)">0°</text>
          <text x={470} y={290} fontSize="12" fill="var(--muted)" textAnchor="end">360°</text>
          <text x={305} y={52} fontSize="12" fontWeight="600" fill="var(--chem)">sin θ</text>
          <text x={355} y={52} fontSize="12" fontWeight="600" fill="var(--physics)">cos θ</text>
        </svg>
      }
      controls={
        <>
          <Slider label="Angle θ" value={deg} min={0} max={360} step={5} unit="°" onChange={(v) => setDeg(v % 360 === 0 && v === 360 ? 0 : v)} />
          <p className="text-sm text-muted">Radians: {RAD[deg] ? <Tex latex={RAD[deg]} /> : fmt(t, 3)}. Drag the point on the circle or use the arrow keys.</p>
        </>
      }
      readouts={[
        { label: <span className="text-physics">cos θ (x)</span>, value: exact ? <Tex latex={exact[0]} /> : fmt(c, 3), emphasis: true },
        { label: <span className="text-chem">sin θ (y)</span>, value: exact ? <Tex latex={exact[1]} /> : fmt(s, 3), emphasis: true },
        { label: "tan θ", value: tanUndefined ? "Undefined" : fmt(s / c, 3) },
        { label: "Quadrant", value: deg % 90 === 0 ? "On an axis" : ["I", "II", "III", "IV"][Math.floor(deg / 90)] },
      ]}
      assumptions={["The circle has radius 1, so the point's coordinates are exactly (cos θ, sin θ).", "Exact values are shown for multiples of 30° and 45°; other angles show decimals to 3 places.", "The angle moves in 5° steps; tangent is drawn as the segment on the line x = 1 when it fits the view."]}
    />
  );
}

// ---------------------------------------------------------------------------
// Secant → tangent
// ---------------------------------------------------------------------------

const FUNCS: Record<string, { f: (x: number) => number; d: (x: number) => number; tex: string; dtex: string; y: [number, number] }> = {
  "x^2": { f: (x) => x * x, d: (x) => 2 * x, tex: "x^2", dtex: "2x", y: [-2, 9] },
  "x^3": { f: (x) => x ** 3, d: (x) => 3 * x * x, tex: "x^3", dtex: "3x^2", y: [-8, 8] },
  "sin x": { f: Math.sin, d: Math.cos, tex: "\\sin x", dtex: "\\cos x", y: [-2, 2] },
  "e^x": { f: Math.exp, d: Math.exp, tex: "e^x", dtex: "e^x", y: [-1, 9] },
};

export function TangentLine({ params }: SimProps) {
  const initFn = typeof params?.fn === "string" && FUNCS[params.fn] ? params.fn : "x^2";
  const [fn, setFn] = useState(initFn);
  const [a, setA] = useState(num(params, "a", 1, -2.5, 2.5));
  const [h, setH] = useState(num(params, "h", 1, -2, 2) || 1);
  const F = FUNCS[fn];
  const [X0, X1] = [-3, 3];
  const sx = scale(X0, X1, 0, W);
  const sy = scale(F.y[0], F.y[1], H, 0);
  const sec = (F.f(a + h) - F.f(a)) / h;
  const der = F.d(a);
  const line = (m: number) => (x: number) => F.f(a) + m * (x - a);
  return (
    <SimShell
      subject="mathematics"
      title="Secant to tangent"
      onReset={() => { setFn(initFn); setA(1); setH(1); }}
      visual={
        <Plane xMin={X0} xMax={X1} yMin={F.y[0]} yMax={F.y[1]} label={`f(x) = ${fn}, secant slope ${fmt(sec, 4)}`}>
          <path d={curvePath(line(der), X0, X1, sx, sy, F.y, 2)} stroke="var(--success)" strokeWidth={2} strokeDasharray="6 5" fill="none" />
          <path d={curvePath(line(sec), X0, X1, sx, sy, F.y, 2)} stroke="var(--chem)" strokeWidth={2.5} fill="none" />
          <path d={curvePath(F.f, X0, X1, sx, sy, F.y)} stroke="var(--math)" strokeWidth={3.5} fill="none" />
          <circle cx={sx(a)} cy={sy(F.f(a))} r={6} fill="var(--math)" />
          <circle cx={sx(a + h)} cy={sy(F.f(a + h))} r={6} fill="var(--chem)" />
        </Plane>
      }
      controls={
        <>
          <Segmented label="Function f(x)" value={fn} options={Object.keys(FUNCS).map((k) => ({ value: k, label: k }))} onChange={setFn} />
          <Slider label={<>Point <Tex latex="a" /></>} value={a} min={-2.5} max={2.5} step={0.1} onChange={setA} />
          <Slider label={<>Gap <Tex latex="h" /></>} value={h} min={-2} max={2} step={0.01} onChange={(v) => setH(v === 0 ? 0.01 : v)} />
          <p className="text-xs text-muted"><span className="font-semibold text-chem">Orange</span>: secant through a and a + h. <span className="font-semibold text-success">Green dashed</span>: tangent at a.</p>
        </>
      }
      readouts={[
        { label: "Secant slope", value: fmt(sec, 4), emphasis: true },
        { label: <>f′(a) = <Tex latex={F.dtex.replace(/x/g, `(${fmt(a, 2)})`)} /></>, value: fmt(der, 4) },
        { label: "Difference", value: fmt(sec - der, 4) },
        { label: "h", value: fmt(h, 2) },
      ]}
      assumptions={["Secant slope is computed exactly as (f(a + h) − f(a)) / h.", "The tangent slope uses the known derivative of each function, so you can compare the two.", "h can't be exactly 0 (that would divide by zero); the limit is what the slopes approach as h shrinks."]}
    />
  );
}

// ---------------------------------------------------------------------------
// Riemann sums
// ---------------------------------------------------------------------------

const RFUNCS: Record<string, { f: (x: number) => number; F: (x: number) => number; tex: string; a: number; b: number; y: [number, number] }> = {
  "x^2": { f: (x) => x * x, F: (x) => x ** 3 / 3, tex: "x^2", a: 0, b: 2, y: [-0.5, 4.5] },
  "sin x": { f: Math.sin, F: (x) => -Math.cos(x), tex: "\\sin x", a: 0, b: Math.PI, y: [-0.25, 1.25] },
  "1/x": { f: (x) => 1 / x, F: Math.log, tex: "\\tfrac{1}{x}", a: 1, b: 3, y: [-0.2, 1.2] },
};
type Method = "left" | "right" | "mid" | "trap";

export function riemann(f: (x: number) => number, a: number, b: number, n: number, m: Method) {
  const dx = (b - a) / n;
  let s = 0;
  for (let i = 0; i < n; i++) {
    const x0 = a + i * dx;
    if (m === "left") s += f(x0);
    else if (m === "right") s += f(x0 + dx);
    else if (m === "mid") s += f(x0 + dx / 2);
    else s += (f(x0) + f(x0 + dx)) / 2;
  }
  return s * dx;
}

export function RiemannSum({ params }: SimProps) {
  const initFn = typeof params?.fn === "string" && RFUNCS[params.fn] ? params.fn : "x^2";
  const [fn, setFn] = useState(initFn);
  const [n, setN] = useState(num(params, "n", 4, 1, 100));
  const [m, setM] = useState<Method>("left");
  const R = RFUNCS[fn];
  const pad = (R.b - R.a) * 0.15;
  const sx = scale(R.a - pad, R.b + pad, 0, W);
  const sy = scale(R.y[0], R.y[1], H, 0);
  const approx = riemann(R.f, R.a, R.b, n, m);
  const exact = R.F(R.b) - R.F(R.a);
  const dx = (R.b - R.a) / n;
  const shapes = useMemo(() => {
    const out: ReactNode[] = [];
    for (let i = 0; i < n; i++) {
      const x0 = R.a + i * dx;
      const x1 = x0 + dx;
      if (m === "trap") {
        out.push(<path key={i} d={`M${sx(x0)},${sy(0)} L${sx(x0)},${sy(R.f(x0))} L${sx(x1)},${sy(R.f(x1))} L${sx(x1)},${sy(0)} Z`} fill="var(--math)" fillOpacity={0.18} stroke="var(--math)" strokeWidth={1.2} />);
      } else {
        const hgt = R.f(m === "left" ? x0 : m === "right" ? x1 : x0 + dx / 2);
        out.push(<rect key={i} x={sx(x0)} width={sx(x1) - sx(x0)} y={Math.min(sy(hgt), sy(0))} height={Math.abs(sy(hgt) - sy(0))} fill="var(--math)" fillOpacity={0.18} stroke="var(--math)" strokeWidth={1.2} />);
      }
    }
    return out;
  }, [n, m, fn, dx, R, sx, sy]);
  return (
    <SimShell
      subject="mathematics"
      title="Riemann sums"
      onReset={() => { setFn(initFn); setN(4); setM("left"); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${m} Riemann sum with ${n} subintervals`} className="block h-auto w-full">
          <line x1={0} x2={W} y1={sy(0)} y2={sy(0)} stroke="var(--muted)" strokeWidth={1.5} />
          {shapes}
          <path d={curvePath(R.f, R.a - pad, R.b + pad, sx, sy, R.y)} stroke="var(--math)" strokeWidth={3} fill="none" />
          <text x={sx(R.a)} y={sy(0) + 16} textAnchor="middle" fontSize="12" fill="var(--muted)">{fmt(R.a, 2)}</text>
          <text x={sx(R.b)} y={sy(0) + 16} textAnchor="middle" fontSize="12" fill="var(--muted)">{fn === "sin x" ? "π" : fmt(R.b, 2)}</text>
        </svg>
      }
      controls={
        <>
          <Segmented label="Function" value={fn} options={Object.keys(RFUNCS).map((k) => ({ value: k, label: k }))} onChange={setFn} />
          <Segmented<Method> label="Method" value={m} options={[{ value: "left", label: "Left" }, { value: "right", label: "Right" }, { value: "mid", label: "Mid" }, { value: "trap", label: "Trap" }]} onChange={setM} />
          <Slider label="Subintervals n" value={n} min={1} max={100} step={1} onChange={setN} />
        </>
      }
      readouts={[
        { label: "Approximation", value: fmt(approx, 5), emphasis: true },
        { label: <>Exact <Tex latex={`\\int ${R.tex}\\,dx`} /></>, value: fmt(exact, 5) },
        { label: "Error", value: fmt(approx - exact, 5) },
        { label: "Δx", value: fmt(dx, 4) },
      ]}
      assumptions={["Sums are computed exactly from the formula for each method.", "The exact value comes from an antiderivative (Fundamental Theorem of Calculus).", "Intervals: x² on [0, 2], sin x on [0, π], 1/x on [1, 3]."]}
    />
  );
}

