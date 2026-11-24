// Geometry simulations, part 2: compass-and-straightedge constructions, step by step.

import { useRef, useState, type PointerEvent, type ReactNode } from "react";
import { Plane } from "./math-graphs";
import { fmt, scale, Segmented, SimShell, Slider, type SimProps } from "./shell";

type Pt = { x: number; y: number };
const dist = (p: Pt, q: Pt) => Math.hypot(q.x - p.x, q.y - p.y);

/** Intersections of two circles (centre, radius). Returns 0, 1 or 2 points. */
export function circleIntersect(c1: Pt, r1: number, c2: Pt, r2: number): Pt[] {
  const d = dist(c1, c2);
  if (d === 0 || d > r1 + r2 + 1e-12 || d < Math.abs(r1 - r2) - 1e-12) return [];
  const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
  const h = Math.sqrt(Math.max(0, r1 * r1 - a * a));
  const mx = c1.x + (a * (c2.x - c1.x)) / d, my = c1.y + (a * (c2.y - c1.y)) / d;
  const ox = (h * (c2.y - c1.y)) / d, oy = (h * (c2.x - c1.x)) / d;
  return h < 1e-12 ? [{ x: mx, y: my }] : [{ x: mx + ox, y: my - oy }, { x: mx - ox, y: my + oy }];
}

const angleDeg = (v: Pt, p: Pt, q: Pt) => {
  const a1 = Math.atan2(p.y - v.y, p.x - v.x), a2 = Math.atan2(q.y - v.y, q.x - v.x);
  let d = Math.abs(a1 - a2) * 180 / Math.PI;
  if (d > 180) d = 360 - d;
  return d;
};

type Kind = "perpendicular" | "angle" | "equilateral";
const STEPS: Record<Kind, string[]> = {
  perpendicular: ["Draw segment AB.", "Open the compass wider than half of AB. Draw an arc centred at A.", "Keep the same opening. Draw an arc centred at B.", "Mark the two points where the arcs cross, P and Q.", "Draw line PQ. It is the perpendicular bisector of AB."],
  angle: ["Start with the angle at vertex V.", "Draw an arc centred at V that crosses both rays, at D and E.", "From D, draw an arc inside the angle.", "With the same opening, draw an arc from E. Mark where it crosses the first arc: F.", "Draw ray VF. It bisects the angle."],
  equilateral: ["Draw segment AB.", "Draw a circle centred at A through B.", "Draw a circle centred at B through A.", "Mark C, where the circles cross.", "Join C to A and B. All three sides equal AB."],
};

export function Constructions({ params }: SimProps) {
  const [kind, setKind] = useState<Kind>((["perpendicular", "angle", "equilateral"] as const).find((k) => k === params?.kind) ?? "perpendicular");
  const [step, setStep] = useState(5);
  const [pts, setPts] = useState<Pt[]>([{ x: -3, y: -1 }, { x: 3, y: 1 }, { x: -3, y: -3 }]);
  const svgRef = useRef<SVGSVGElement>(null);
  const drag = useRef<number | null>(null);
  const sx = scale(-8, 8, 0, 480), sy = scale(-7, 7, 400, 0);
  const onMove = (e: PointerEvent<SVGSVGElement>) => {
    if (drag.current === null || !svgRef.current) return;
    const rc = svgRef.current.getBoundingClientRect();
    const x = Math.round(sx.invert(((e.clientX - rc.left) / rc.width) * 480) * 2) / 2;
    const y = Math.round(sy.invert(((e.clientY - rc.top) / rc.height) * 400) * 2) / 2;
    setPts((ps) => ps.map((p, i) => (i === drag.current ? { x: Math.max(-7, Math.min(7, x)), y: Math.max(-6, Math.min(6, y)) } : p)));
  };
  const arc = (c: Pt, r: number, key: string, color = "var(--muted)") => <circle key={key} cx={sx(c.x)} cy={sy(c.y)} r={sx(r) - sx(0)} fill="none" stroke={color} strokeWidth={1.5} strokeDasharray="5 4" />;
  const line = (p: Pt, q: Pt, key: string, color = "var(--math)", extend = 0) => {
    const dx = q.x - p.x, dy = q.y - p.y;
    return <line key={key} x1={sx(p.x - dx * extend)} y1={sy(p.y - dy * extend)} x2={sx(q.x + dx * extend)} y2={sy(q.y + dy * extend)} stroke={color} strokeWidth={2.5} />;
  };
  const dot = (p: Pt, label: string, key: string, color = "var(--ink)") => <g key={key}><circle cx={sx(p.x)} cy={sy(p.y)} r={5} fill={color} /><text x={sx(p.x) + 8} y={sy(p.y) - 8} fontSize="13" fontWeight="700" fill={color}>{label}</text></g>;
  const handles: { i: number; label: string }[] = [];
  const els: ReactNode[] = [];
  const readouts: { label: string; value: string; emphasis?: boolean }[] = [];
  const [A, B, C] = pts;
  if (kind === "perpendicular" || kind === "equilateral") {
    els.push(line(A, B, "ab", "var(--ink)"));
    handles.push({ i: 0, label: "A" }, { i: 1, label: "B" });
    const d = dist(A, B);
    if (kind === "perpendicular") {
      const r = 0.75 * d;
      if (step >= 2) els.push(arc(A, r, "a1"));
      if (step >= 3) els.push(arc(B, r, "a2"));
      const [P, Q] = circleIntersect(A, r, B, r);
      if (step >= 4 && P && Q) els.push(dot(P, "P", "p", "var(--physics)"), dot(Q, "Q", "q", "var(--physics)"));
      if (step >= 5 && P && Q) { els.push(line(P, Q, "pq", "var(--math)", 0.4)); els.push(dot({ x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 }, "M", "m", "var(--math)")); }
      const M = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };
      readouts.push({ label: "AM and MB", value: `${fmt(dist(A, M), 2)} and ${fmt(dist(M, B), 2)}`, emphasis: true });
      if (P && Q) readouts.push({ label: "Angle between PQ and AB", value: `${fmt(angleDeg(M, P, A), 1)}°` }, { label: "PA = PB", value: `${fmt(dist(P, A), 2)} = ${fmt(dist(P, B), 2)}` });
    } else {
      if (step >= 2) els.push(arc(A, d, "c1"));
      if (step >= 3) els.push(arc(B, d, "c2"));
      const Cs = circleIntersect(A, d, B, d)[0];
      if (step >= 4 && Cs) els.push(dot(Cs, "C", "c", "var(--physics)"));
      if (step >= 5 && Cs) els.push(line(A, Cs, "ac"), line(B, Cs, "bc"), line(A, B, "ab2"));
      if (Cs) readouts.push({ label: "AB, BC, CA", value: `${fmt(d, 2)}, ${fmt(dist(B, Cs), 2)}, ${fmt(dist(Cs, A), 2)}`, emphasis: true }, { label: "Angle at C", value: `${fmt(angleDeg(Cs, A, B), 1)}°` });
    }
  } else {
    const V = A, P1 = B, P2 = C;
    els.push(line(V, P1, "r1", "var(--ink)", 0), line(V, P2, "r2", "var(--ink)", 0));
    handles.push({ i: 0, label: "V" }, { i: 1, label: "" }, { i: 2, label: "" });
    const r = Math.min(dist(V, P1), dist(V, P2)) * 0.6;
    const D = { x: V.x + ((P1.x - V.x) * r) / dist(V, P1), y: V.y + ((P1.y - V.y) * r) / dist(V, P1) };
    const E = { x: V.x + ((P2.x - V.x) * r) / dist(V, P2), y: V.y + ((P2.y - V.y) * r) / dist(V, P2) };
    const s2 = dist(D, E) * 0.8;
    if (step >= 2) els.push(arc(V, r, "a0"), dot(D, "D", "d", "var(--physics)"), dot(E, "E", "e", "var(--physics)"));
    if (step >= 3) els.push(arc(D, s2, "a1"));
    if (step >= 4) els.push(arc(E, s2, "a2"));
    const F = circleIntersect(D, s2, E, s2).sort((p, q) => dist(V, q) - dist(V, p))[0];
    if (step >= 4 && F) els.push(dot(F, "F", "f", "var(--physics)"));
    if (step >= 5 && F) els.push(line(V, F, "vf", "var(--math)", 1));
    if (F) readouts.push({ label: "Angle D V F and angle F V E", value: `${fmt(angleDeg(V, D, F), 1)}° and ${fmt(angleDeg(V, F, E), 1)}°`, emphasis: true }, { label: "Whole angle", value: `${fmt(angleDeg(V, P1, P2), 1)}°` });
  }
  return (
    <SimShell
      subject="mathematics"
      title="Compass-and-straightedge constructions"
      onReset={() => { setPts([{ x: -3, y: -1 }, { x: 3, y: 1 }, { x: -3, y: -3 }]); setStep(5); }}
      visual={
        <Plane xMin={-8} xMax={8} yMin={-7} yMax={7} label={`${kind} construction, step ${step}: ${STEPS[kind][step - 1]}`} svgRef={svgRef} onPointerMove={onMove} onPointerUp={() => (drag.current = null)}>
          {els}
          {handles.map(({ i, label }) => (
            <g key={i} tabIndex={0} role="button" aria-label={`Point ${label || i + 1} at ${pts[i].x}, ${pts[i].y}; arrow keys move it`} className="cursor-grab outline-none" onPointerDown={(e) => { drag.current = i; svgRef.current?.setPointerCapture(e.pointerId); }}
              onKeyDown={(e) => {
                const d = ({ ArrowLeft: [-0.5, 0], ArrowRight: [0.5, 0], ArrowUp: [0, 0.5], ArrowDown: [0, -0.5] } as Record<string, number[]>)[e.key];
                if (!d) return; e.preventDefault();
                setPts((ps) => ps.map((p, j) => (j === i ? { x: Math.max(-7, Math.min(7, p.x + d[0])), y: Math.max(-6, Math.min(6, p.y + d[1])) } : p)));
              }}>
              <circle cx={sx(pts[i].x)} cy={sy(pts[i].y)} r={15} fill="var(--math)" fillOpacity={0.15} />
              <circle cx={sx(pts[i].x)} cy={sy(pts[i].y)} r={7} fill="var(--math)" />
              {label && <text x={sx(pts[i].x) - 10} y={sy(pts[i].y) + 22} textAnchor="end" fontSize="14" fontWeight="700" fill="var(--math)">{label}</text>}
            </g>
          ))}
        </Plane>
      }
      controls={
        <>
          <Segmented label="Construction" value={kind} options={[{ value: "perpendicular", label: "Perpendicular bisector" }, { value: "angle", label: "Angle bisector" }, { value: "equilateral", label: "Equilateral triangle" }]} onChange={(k) => { setKind(k); setStep(1); setPts(k === "angle" ? [{ x: -4, y: -3 }, { x: 5, y: -2 }, { x: 1, y: 5 }] : [{ x: -3, y: -1 }, { x: 3, y: 1 }, { x: -3, y: -3 }]); }} />
          <Slider label="Step" value={step} min={1} max={5} step={1} format={(v) => `${v} of 5`} onChange={setStep} />
          <p className="min-h-[3rem] text-sm">{STEPS[kind][step - 1]}</p>
          <p className="text-xs text-muted">Drag the large points to change the starting figure; the construction still works.</p>
        </>
      }
      readouts={readouts}
      assumptions={[
        "Only two tools: a compass (circles of any radius) and an unmarked straightedge (lines through two points).",
        "Each new point is an intersection of circles, computed exactly; the readouts check the result's defining property.",
      ]}
    />
  );
}
