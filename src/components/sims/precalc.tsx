// Precalculus simulations: vectors and the dot product, conic sections, and
// polar graphs.

import { useState } from "react";
import { Math as Tex } from "../ui/Math";
import { curvePath, Plane } from "./math-graphs";
import { fmt, num, scale, Segmented, SimShell, Slider, type Params, type SimProps } from "./shell";

const W = 480, H = 400;
const str = (p: Params | undefined, key: string, fallback: string, allowed: string[]) => {
  const v = p?.[key];
  return typeof v === "string" && allowed.includes(v) ? v : fallback;
};

function Arrow({ x1, y1, x2, y2, color, label }: { x1: number; y1: number; x2: number; y2: number; color: string; label?: string }) {
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const len = Math.hypot(x2 - x1, y2 - y1);
  if (len < 1) return null;
  const hx = x2 - 12 * Math.cos(ang), hy = y2 - 12 * Math.sin(ang);
  return (
    <g>
      <line x1={x1} y1={y1} x2={hx} y2={hy} stroke={color} strokeWidth={3} />
      <polygon points={`${x2},${y2} ${hx + 6 * Math.sin(ang)},${hy - 6 * Math.cos(ang)} ${hx - 6 * Math.sin(ang)},${hy + 6 * Math.cos(ang)}`} fill={color} />
      {label && <text x={(x1 + x2) / 2 + 8} y={(y1 + y2) / 2 - 8} fontSize="14" fontWeight="700" fill={color}>{label}</text>}
    </g>
  );
}

// ---------------------------------------------------------------------------
// Vectors: sum, difference, magnitude, direction, dot product and angle
// ---------------------------------------------------------------------------

export function VectorSim({ params }: SimProps) {
  const init = { ux: num(params, "ux", 3, -6, 6), uy: num(params, "uy", 1, -6, 6), vx: num(params, "vx", 1, -6, 6), vy: num(params, "vy", 3, -6, 6) };
  const [u, setU] = useState({ x: init.ux, y: init.uy });
  const [v, setV] = useState({ x: init.vx, y: init.vy });
  const [show, setShow] = useState<"sum" | "difference" | "dot">("sum");
  const sx = scale(-8, 8, 0, W), sy = scale(-7, 7, H, 0);
  const mag = (w: { x: number; y: number }) => Math.hypot(w.x, w.y);
  const dir = (w: { x: number; y: number }) => ((Math.atan2(w.y, w.x) * 180) / Math.PI + 360) % 360;
  const dot = u.x * v.x + u.y * v.y;
  const angle = mag(u) && mag(v) ? (Math.acos(Math.max(-1, Math.min(1, dot / (mag(u) * mag(v))))) * 180) / Math.PI : NaN;
  const proj = mag(u) ? dot / (mag(u) * mag(u)) : 0;
  return (
    <SimShell
      subject="mathematics"
      title="Vectors in the plane"
      onReset={() => { setU({ x: init.ux, y: init.uy }); setV({ x: init.vx, y: init.vy }); setShow("sum"); }}
      visual={
        <Plane xMin={-8} xMax={8} yMin={-7} yMax={7} label={`u = ⟨${u.x}, ${u.y}⟩, v = ⟨${v.x}, ${v.y}⟩`}>
          {show === "sum" && <>
            <Arrow x1={sx(u.x)} y1={sy(u.y)} x2={sx(u.x + v.x)} y2={sy(u.y + v.y)} color="var(--physics)" />
            <Arrow x1={sx(0)} y1={sy(0)} x2={sx(u.x + v.x)} y2={sy(u.y + v.y)} color="var(--chem)" label="u + v" />
          </>}
          {show === "difference" && <Arrow x1={sx(v.x)} y1={sy(v.y)} x2={sx(u.x)} y2={sy(u.y)} color="var(--chem)" label="u − v" />}
          {show === "dot" && <line x1={sx(v.x)} y1={sy(v.y)} x2={sx(proj * u.x)} y2={sy(proj * u.y)} stroke="var(--chem)" strokeDasharray="5 4" strokeWidth={2} />}
          {show === "dot" && <circle cx={sx(proj * u.x)} cy={sy(proj * u.y)} r={5} fill="var(--chem)" />}
          <Arrow x1={sx(0)} y1={sy(0)} x2={sx(u.x)} y2={sy(u.y)} color="var(--math)" label="u" />
          <Arrow x1={sx(0)} y1={sy(0)} x2={sx(v.x)} y2={sy(v.y)} color="var(--physics)" label="v" />
        </Plane>
      }
      controls={
        <>
          <Segmented label="Show" value={show} onChange={setShow} options={[{ value: "sum", label: "u + v" }, { value: "difference", label: "u − v" }, { value: "dot", label: "Dot product" }]} />
          <div className="grid grid-cols-2 gap-3">
            <Slider label="u: x" value={u.x} min={-6} max={6} step={1} onChange={(x) => setU({ ...u, x })} />
            <Slider label="u: y" value={u.y} min={-6} max={6} step={1} onChange={(y) => setU({ ...u, y })} />
            <Slider label="v: x" value={v.x} min={-6} max={6} step={1} onChange={(x) => setV({ ...v, x })} />
            <Slider label="v: y" value={v.y} min={-6} max={6} step={1} onChange={(y) => setV({ ...v, y })} />
          </div>
          <div className="rounded-lg bg-math-soft px-3 py-2"><Tex latex={`\\mathbf{u}\\cdot\\mathbf{v} = (${u.x})(${v.x}) + (${u.y})(${v.y}) = ${dot}`} /></div>
        </>
      }
      readouts={[
        { label: "u + v", value: `⟨${u.x + v.x}, ${u.y + v.y}⟩`, emphasis: true },
        { label: "u − v", value: `⟨${u.x - v.x}, ${u.y - v.y}⟩` },
        { label: "|u|, |v|", value: `${fmt(mag(u))}, ${fmt(mag(v))}` },
        { label: "Direction of u", value: `${fmt(dir(u), 1)}°` },
        { label: "u · v", value: dot, emphasis: true },
        { label: "Angle between", value: Number.isFinite(angle) ? `${fmt(angle, 1)}°${dot === 0 ? " (orthogonal)" : ""}` : "—" },
      ]}
      assumptions={[
        "Vectors are drawn from the origin; u + v is shown tip-to-tail (parallelogram rule).",
        "The dot product u·v = u₁v₁ + u₂v₂ = |u||v|cos θ. It's zero exactly when the vectors are perpendicular.",
        "In dot-product view, the dashed line drops from v perpendicular to u, marking the projection of v onto u.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Conic sections centered at (h, k)
// ---------------------------------------------------------------------------

export function ConicExplorer({ params }: SimProps) {
  const initKind = str(params, "kind", "ellipse", ["ellipse", "hyperbola", "circle"]) as "ellipse" | "hyperbola" | "circle";
  const [kind, setKind] = useState(initKind);
  const [a, setA] = useState(num(params, "a", 5, 1, 7));
  const [b, setB] = useState(num(params, "b", 3, 1, 6));
  const [h, setH] = useState(0);
  const [k, setK] = useState(0);
  const sx = scale(-8, 8, 0, W), sy = scale(-7, 7, H, 0);
  const bb = kind === "circle" ? a : b;
  const c = kind === "hyperbola" ? Math.sqrt(a * a + bb * bb) : Math.sqrt(Math.abs(a * a - bb * bb));
  const fociOnX = kind === "hyperbola" || a >= bb;
  const foci = kind === "circle" ? [] : fociOnX ? [[h - c, k], [h + c, k]] : [[h, k - c], [h, k + c]];
  let path = "";
  if (kind !== "hyperbola") {
    for (let i = 0; i <= 200; i++) { const t = (i / 200) * 2 * Math.PI; path += `${i ? "L" : "M"}${sx(h + a * Math.cos(t))},${sy(k + bb * Math.sin(t))}`; }
  }
  const eq = kind === "hyperbola" ? `\\frac{(x - ${h})^2}{${a * a}} - \\frac{(y - ${k})^2}{${bb * bb}} = 1` : `\\frac{(x - ${h})^2}{${a * a}} + \\frac{(y - ${k})^2}{${bb * bb}} = 1`;
  return (
    <SimShell
      subject="mathematics"
      title="Conic sections"
      onReset={() => { setKind(initKind); setA(5); setB(3); setH(0); setK(0); }}
      visual={
        <Plane xMin={-8} xMax={8} yMin={-7} yMax={7} label={`${kind} with a = ${a}, b = ${bb}`}>
          {kind === "hyperbola" ? (
            <>
              <line x1={sx(-8)} y1={sy(k + (bb / a) * (-8 - h))} x2={sx(8)} y2={sy(k + (bb / a) * (8 - h))} stroke="var(--muted)" strokeDasharray="5 5" />
              <line x1={sx(-8)} y1={sy(k - (bb / a) * (-8 - h))} x2={sx(8)} y2={sy(k - (bb / a) * (8 - h))} stroke="var(--muted)" strokeDasharray="5 5" />
              {[1, -1].map((s) => [1, -1].map((t) => (
                <path key={`${s}${t}`} d={curvePath((x) => k + t * bb * Math.sqrt(Math.max(0, ((x - h) / a) ** 2 - 1)), s > 0 ? h + a : -8, s > 0 ? 8 : h - a, sx, sy, [-7, 7], 300)} fill="none" stroke="var(--math)" strokeWidth={3} />
              )))}
            </>
          ) : (
            <path d={path} fill="var(--math)" fillOpacity={0.08} stroke="var(--math)" strokeWidth={3} />
          )}
          <circle cx={sx(h)} cy={sy(k)} r={4} fill="var(--ink)" />
          {foci.map(([x, y], i) => <circle key={i} cx={sx(x)} cy={sy(y)} r={6} fill="var(--chem)" />)}
        </Plane>
      }
      controls={
        <>
          <Segmented label="Conic" value={kind} onChange={setKind} options={[{ value: "circle", label: "Circle" }, { value: "ellipse", label: "Ellipse" }, { value: "hyperbola", label: "Hyperbola" }]} />
          <div className="overflow-x-auto rounded-lg bg-math-soft px-3 py-2"><Tex latex={kind === "circle" ? `(x - ${h})^2 + (y - ${k})^2 = ${a * a}` : eq} /></div>
          <Slider label={kind === "circle" ? "Radius r" : "a (horizontal)"} value={a} min={1} max={7} step={0.5} onChange={setA} />
          {kind !== "circle" && <Slider label="b (vertical)" value={b} min={1} max={6} step={0.5} onChange={setB} />}
          <div className="grid grid-cols-2 gap-3">
            <Slider label="Center h" value={h} min={-3} max={3} step={1} onChange={setH} />
            <Slider label="Center k" value={k} min={-3} max={3} step={1} onChange={setK} />
          </div>
        </>
      }
      readouts={[
        { label: "c (center to focus)", value: kind === "circle" ? "0" : fmt(c), emphasis: true },
        { label: "Foci", value: foci.length ? foci.map(([x, y]) => `(${fmt(x)}, ${fmt(y)})`).join(", ") : "center" },
        { label: "Eccentricity", value: kind === "circle" ? "0" : fmt(c / Math.max(a, kind === "hyperbola" ? a : bb), 3) },
        ...(kind === "hyperbola" ? [{ label: "Asymptote slopes", value: `±${fmt(bb / a, 3)}` }] : []),
      ]}
      assumptions={[
        "Ellipse: c² = |a² − b²|, and the foci lie on the longer axis. The sum of distances from any point to the foci is constant.",
        "Hyperbola: c² = a² + b², and the difference of distances to the foci is constant. Asymptotes have slopes ±b/a.",
        "Eccentricity e = c / (semi-major axis): 0 for a circle, between 0 and 1 for an ellipse, greater than 1 for a hyperbola.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Polar graphs: r = a + b·cos(nθ) and roses
// ---------------------------------------------------------------------------

export function PolarGraph({ params }: SimProps) {
  const initKind = str(params, "kind", "limacon", ["limacon", "rose", "circle", "spiral"]) as "limacon" | "rose" | "circle" | "spiral";
  const [kind, setKind] = useState(initKind);
  const [a, setA] = useState(num(params, "a", 2, 0, 4));
  const [b, setB] = useState(num(params, "b", 2, 0, 4));
  const [n, setN] = useState(num(params, "n", 3, 1, 8));
  const [theta, setTheta] = useState(60);
  const sx = scale(-6, 6, 0, W), sy = scale(-5, 5, H, 0);
  const rf = (t: number) => (kind === "limacon" ? a + b * Math.cos(t) : kind === "rose" ? b * Math.cos(n * t) : kind === "circle" ? 2 * b * Math.cos(t) : 0.25 * t);
  const tMax = kind === "spiral" ? 6 * Math.PI : 2 * Math.PI;
  let d = "";
  for (let i = 0; i <= 720; i++) { const t = (i / 720) * tMax; const r = rf(t); d += `${i ? "L" : "M"}${sx(r * Math.cos(t))},${sy(r * Math.sin(t))}`; }
  const t0 = (theta * Math.PI) / 180, r0 = rf(t0);
  const eq = kind === "limacon" ? `r = ${a} + ${b}\\cos\\theta` : kind === "rose" ? `r = ${b}\\cos(${n}\\theta)` : kind === "circle" ? `r = ${2 * b}\\cos\\theta` : `r = 0.25\\,\\theta`;
  return (
    <SimShell
      subject="mathematics"
      title="Polar graphs"
      onReset={() => { setKind(initKind); setA(2); setB(2); setN(3); setTheta(60); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Polar graph ${eq.replace(/\\/g, "")}`} className="block h-auto w-full">
          {[1, 2, 3, 4, 5].map((rr) => <circle key={rr} cx={sx(0)} cy={sy(0)} r={sx(rr) - sx(0)} fill="none" stroke="var(--line)" />)}
          {Array.from({ length: 12 }, (_, i) => (i * Math.PI) / 6).map((t, i) => <line key={i} x1={sx(0)} y1={sy(0)} x2={sx(6 * Math.cos(t))} y2={sy(6 * Math.sin(t))} stroke="var(--line)" />)}
          <path d={d} fill="none" stroke="var(--math)" strokeWidth={3} />
          <line x1={sx(0)} y1={sy(0)} x2={sx(r0 * Math.cos(t0))} y2={sy(r0 * Math.sin(t0))} stroke="var(--chem)" strokeWidth={2.5} />
          <circle cx={sx(r0 * Math.cos(t0))} cy={sy(r0 * Math.sin(t0))} r={6} fill="var(--chem)" />
        </svg>
      }
      controls={
        <>
          <Segmented label="Curve" value={kind} onChange={setKind} options={[{ value: "limacon", label: "Limaçon" }, { value: "rose", label: "Rose" }, { value: "circle", label: "Circle" }, { value: "spiral", label: "Spiral" }]} />
          <div className="rounded-lg bg-math-soft px-3 py-2"><Tex latex={eq} /></div>
          {kind === "limacon" && <Slider label="a" value={a} min={0} max={4} step={0.5} onChange={setA} />}
          {kind !== "spiral" && <Slider label={kind === "circle" ? "Radius" : "b"} value={b} min={0.5} max={4} step={0.5} onChange={setB} />}
          {kind === "rose" && <Slider label="n (petal number)" value={n} min={1} max={8} step={1} onChange={setN} />}
          <Slider label="θ" value={theta} min={0} max={360} step={5} unit="°" onChange={setTheta} />
        </>
      }
      readouts={[
        { label: "r at θ", value: fmt(r0, 3), emphasis: true },
        { label: "Rectangular point", value: `(${fmt(r0 * Math.cos(t0))}, ${fmt(r0 * Math.sin(t0))})` },
        ...(kind === "rose" ? [{ label: "Petals", value: n % 2 ? n : 2 * n }] : []),
        ...(kind === "limacon" ? [{ label: "Shape", value: a === 0 ? "circle" : a < b ? "inner loop" : a === b ? "cardioid" : a < 2 * b ? "dimpled" : "convex" }] : []),
      ]}
      assumptions={[
        "A polar point (r, θ) is at distance r from the pole in direction θ; x = r cos θ and y = r sin θ.",
        "When r is negative, the point is plotted in the opposite direction, which is how inner loops and rose petals form.",
        "Roses r = b cos(nθ) have n petals when n is odd and 2n petals when n is even.",
      ]}
    />
  );
}
