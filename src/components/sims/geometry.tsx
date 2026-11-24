// Geometry simulations: transformations, triangle explorer, right-triangle
// trigonometry, and circle angles.

import { useRef, useState, type PointerEvent } from "react";
import { Math as Tex } from "../ui/Math";
import { Plane } from "./math-graphs";
import { fmt, num, scale, Segmented, SimShell, Slider, type Params, type SimProps } from "./shell";

const str = (p: Params | undefined, key: string, fallback: string, allowed: string[]) => {
  const v = p?.[key];
  return typeof v === "string" && allowed.includes(v) ? v : fallback;
};
type Pt = { x: number; y: number };
const DEG = Math.PI / 180;
const r2 = (n: number) => Math.round(n * 100) / 100;

// ---------------------------------------------------------------------------
// Transformations of a triangle on the coordinate plane
// ---------------------------------------------------------------------------

type Kind = "translate" | "reflect" | "rotate" | "dilate";

export function Transformations({ params }: SimProps) {
  const initKind = str(params, "kind", "translate", ["translate", "reflect", "rotate", "dilate"]) as Kind;
  const [kind, setKind] = useState<Kind>(initKind);
  const [a, setA] = useState(3);
  const [b, setB] = useState(-2);
  const [line, setLine] = useState<"x-axis" | "y-axis" | "y=x" | "y=-x">("y-axis");
  const [angle, setAngle] = useState(90);
  const [k, setK] = useState(2);
  const pre: Pt[] = [{ x: 1, y: 1 }, { x: 4, y: 1 }, { x: 1, y: 3 }];
  const map = (p: Pt): Pt => {
    switch (kind) {
      case "translate": return { x: p.x + a, y: p.y + b };
      case "reflect": return line === "x-axis" ? { x: p.x, y: -p.y } : line === "y-axis" ? { x: -p.x, y: p.y } : line === "y=x" ? { x: p.y, y: p.x } : { x: -p.y, y: -p.x };
      case "rotate": { const t = angle * DEG; return { x: r2(p.x * Math.cos(t) - p.y * Math.sin(t)), y: r2(p.x * Math.sin(t) + p.y * Math.cos(t)) }; }
      case "dilate": return { x: r2(k * p.x), y: r2(k * p.y) };
    }
  };
  const img = pre.map(map);
  const sx = scale(-8, 8, 0, 480);
  const sy = scale(-7, 7, 400, 0);
  const poly = (ps: Pt[]) => ps.map((p) => `${sx(p.x)},${sy(p.y)}`).join(" ");
  const names = ["A", "B", "C"];
  const rule =
    kind === "translate" ? `(x, y) \\to (x ${a < 0 ? "-" : "+"} ${Math.abs(a)},\\ y ${b < 0 ? "-" : "+"} ${Math.abs(b)})`
    : kind === "reflect" ? { "x-axis": "(x, y) \\to (x, -y)", "y-axis": "(x, y) \\to (-x, y)", "y=x": "(x, y) \\to (y, x)", "y=-x": "(x, y) \\to (-y, -x)" }[line]
    : kind === "rotate" ? ({ 90: "(x, y) \\to (-y, x)", 180: "(x, y) \\to (-x, -y)", 270: "(x, y) \\to (y, -x)" } as Record<number, string>)[angle] ?? `\\text{rotate } ${angle}^\\circ \\text{ about } O`
    : `(x, y) \\to (${k}x,\\ ${k}y)`;
  const side = (p: Pt, q: Pt) => Math.hypot(p.x - q.x, p.y - q.y);
  return (
    <SimShell
      subject="mathematics"
      title="Transformations"
      onReset={() => { setKind(initKind); setA(3); setB(-2); setLine("y-axis"); setAngle(90); setK(2); }}
      visual={
        <Plane xMin={-8} xMax={8} yMin={-7} yMax={7} label={`Triangle ABC and its image under a ${kind}`}>
          {kind === "reflect" && line.startsWith("y=") && <line x1={sx(-7)} y1={sy(line === "y=x" ? -7 : 7)} x2={sx(7)} y2={sy(line === "y=x" ? 7 : -7)} stroke="var(--chem)" strokeWidth={2} strokeDasharray="6 5" />}
          {kind === "reflect" && line === "x-axis" && <line x1={0} x2={480} y1={sy(0)} y2={sy(0)} stroke="var(--chem)" strokeWidth={3} strokeDasharray="6 5" />}
          {kind === "reflect" && line === "y-axis" && <line y1={0} y2={400} x1={sx(0)} x2={sx(0)} stroke="var(--chem)" strokeWidth={3} strokeDasharray="6 5" />}
          {(kind === "rotate" || kind === "dilate") && <circle cx={sx(0)} cy={sy(0)} r={5} fill="var(--chem)" />}
          {kind === "dilate" && pre.map((_, i) => <line key={i} x1={sx(0)} y1={sy(0)} x2={sx(img[i].x)} y2={sy(img[i].y)} stroke="var(--muted)" strokeDasharray="3 4" />)}
          <polygon points={poly(pre)} fill="var(--math)" fillOpacity={0.2} stroke="var(--math)" strokeWidth={2.5} />
          <polygon points={poly(img)} fill="var(--physics)" fillOpacity={0.2} stroke="var(--physics)" strokeWidth={2.5} />
          {pre.map((p, i) => <text key={i} x={sx(p.x) + 6} y={sy(p.y) - 6} fontSize="12" fontWeight="700" fill="var(--math)">{names[i]}</text>)}
          {img.map((p, i) => <text key={i} x={sx(p.x) + 6} y={sy(p.y) - 6} fontSize="12" fontWeight="700" fill="var(--physics)">{names[i]}′</text>)}
        </Plane>
      }
      controls={
        <>
          <Segmented label="Transformation" value={kind} onChange={setKind} options={[{ value: "translate", label: "Translate" }, { value: "reflect", label: "Reflect" }, { value: "rotate", label: "Rotate" }, { value: "dilate", label: "Dilate" }]} />
          {kind === "translate" && <><Slider label="Horizontal shift a" value={a} min={-6} max={4} step={1} onChange={setA} /><Slider label="Vertical shift b" value={b} min={-6} max={4} step={1} onChange={setB} /></>}
          {kind === "reflect" && <Segmented label="Line of reflection" value={line} onChange={setLine} options={[{ value: "x-axis", label: "x-axis" }, { value: "y-axis", label: "y-axis" }, { value: "y=x", label: "y = x" }, { value: "y=-x", label: "y = −x" }]} />}
          {kind === "rotate" && <Slider label="Counterclockwise angle about O" value={angle} min={0} max={360} step={15} unit="°" onChange={setAngle} />}
          {kind === "dilate" && <Slider label="Scale factor k (center O)" value={k} min={0.5} max={2} step={0.25} onChange={setK} />}
          <div className="rounded-lg bg-math-soft px-3 py-2"><Tex latex={rule} /></div>
        </>
      }
      readouts={[
        { label: "A′", value: `(${fmt(img[0].x)}, ${fmt(img[0].y)})`, emphasis: true },
        { label: "B′", value: `(${fmt(img[1].x)}, ${fmt(img[1].y)})` },
        { label: "C′", value: `(${fmt(img[2].x)}, ${fmt(img[2].y)})` },
        { label: "A′B′ ÷ AB", value: fmt(side(img[0], img[1]) / side(pre[0], pre[1]), 2) },
      ]}
      assumptions={[
        "The preimage is A(1, 1), B(4, 1), C(1, 3). Rotations and dilations are about the origin O.",
        "Translations, reflections and rotations are rigid motions: lengths and angles are preserved, so the ratio A′B′ ÷ AB is 1.",
        "A dilation multiplies every length by |k| and keeps angles, so the image is similar but not congruent unless k = 1.",
        "Rotated coordinates are rounded to two decimals for angles that aren't multiples of 90°.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Triangle explorer: angles, sides, exterior angle and special segments
// ---------------------------------------------------------------------------

const dist = (p: Pt, q: Pt) => Math.hypot(p.x - q.x, p.y - q.y);
const angleAt = (v: Pt, p: Pt, q: Pt) => {
  const a = dist(v, p), b = dist(v, q), c = dist(p, q);
  return Math.acos(Math.max(-1, Math.min(1, (a * a + b * b - c * c) / (2 * a * b)))) / DEG;
};

export function TriangleExplorer({ params }: SimProps) {
  const initShow = str(params, "show", "angles", ["angles", "medians", "altitudes", "bisectors", "perpendicular"]) as "angles" | "medians" | "altitudes" | "bisectors" | "perpendicular";
  const init: Pt[] = [{ x: -4, y: -3 }, { x: 5, y: -3 }, { x: 1, y: 4 }];
  const [P, setP] = useState<Pt[]>(init);
  const [show, setShow] = useState(initShow);
  const svgRef = useRef<SVGSVGElement>(null);
  const drag = useRef<number | null>(null);
  const sx = scale(-8, 8, 0, 480);
  const sy = scale(-7, 7, 400, 0);
  const [A, B, C] = P;
  const angA = angleAt(A, B, C), angB = angleAt(B, A, C), angC = 180 - angA - angB;
  const a = dist(B, C), b = dist(A, C), c = dist(A, B);
  const area = Math.abs((B.x - A.x) * (C.y - A.y) - (C.x - A.x) * (B.y - A.y)) / 2;
  const kindSides = Math.abs(a - b) < 0.01 && Math.abs(b - c) < 0.01 ? "equilateral" : Math.abs(a - b) < 0.01 || Math.abs(b - c) < 0.01 || Math.abs(a - c) < 0.01 ? "isosceles" : "scalene";
  const maxAng = Math.max(angA, angB, angC);
  const kindAngles = Math.abs(maxAng - 90) < 0.05 ? "right" : maxAng > 90 ? "obtuse" : "acute";
  const onMove = (e: PointerEvent<SVGSVGElement>) => {
    if (drag.current === null || !svgRef.current) return;
    const rc = svgRef.current.getBoundingClientRect();
    const x = Math.round(sx.invert(((e.clientX - rc.left) / rc.width) * 480));
    const y = Math.round(sy.invert(((e.clientY - rc.top) / rc.height) * 400));
    setP((ps) => {
      const next = ps.map((p, i) => (i === drag.current ? { x: Math.max(-7, Math.min(7, x)), y: Math.max(-6, Math.min(6, y)) } : p));
      const ar = Math.abs((next[1].x - next[0].x) * (next[2].y - next[0].y) - (next[2].x - next[0].x) * (next[1].y - next[0].y));
      return ar === 0 ? ps : next; // keep a real triangle
    });
  };
  const mid = (p: Pt, q: Pt) => ({ x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 });
  const foot = (v: Pt, p: Pt, q: Pt) => { const dx = q.x - p.x, dy = q.y - p.y; const t = ((v.x - p.x) * dx + (v.y - p.y) * dy) / (dx * dx + dy * dy); return { x: p.x + t * dx, y: p.y + t * dy }; };
  const bisFoot = (v: Pt, p: Pt, q: Pt) => { const dp = dist(v, p), dq = dist(v, q); const t = dp / (dp + dq); return { x: p.x + t * (q.x - p.x), y: p.y + t * (q.y - p.y) }; };
  const centroid = { x: (A.x + B.x + C.x) / 3, y: (A.y + B.y + C.y) / 3 };
  const incenter = { x: (a * A.x + b * B.x + c * C.x) / (a + b + c), y: (a * A.y + b * B.y + c * C.y) / (a + b + c) };
  const D = 2 * (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y));
  const sq = (p: Pt) => p.x * p.x + p.y * p.y;
  const circum = { x: (sq(A) * (B.y - C.y) + sq(B) * (C.y - A.y) + sq(C) * (A.y - B.y)) / D, y: (sq(A) * (C.x - B.x) + sq(B) * (A.x - C.x) + sq(C) * (B.x - A.x)) / D };
  const ortho = { x: A.x + B.x + C.x - 2 * circum.x, y: A.y + B.y + C.y - 2 * circum.y };
  const seg = (p: Pt, q: Pt, key: string, dash = false) => <line key={key} x1={sx(p.x)} y1={sy(p.y)} x2={sx(q.x)} y2={sy(q.y)} stroke="var(--chem)" strokeWidth={2} strokeDasharray={dash ? "5 4" : undefined} />;
  const segs: React.ReactNode[] = [];
  let center: { p: Pt; name: string } | null = null;
  if (show === "medians") { segs.push(seg(A, mid(B, C), "m1"), seg(B, mid(A, C), "m2"), seg(C, mid(A, B), "m3")); center = { p: centroid, name: "Centroid" }; }
  if (show === "altitudes") { segs.push(seg(A, foot(A, B, C), "h1", true), seg(B, foot(B, A, C), "h2", true), seg(C, foot(C, A, B), "h3", true)); center = { p: ortho, name: "Orthocenter" }; }
  if (show === "bisectors") { segs.push(seg(A, bisFoot(A, B, C), "b1"), seg(B, bisFoot(B, A, C), "b2"), seg(C, bisFoot(C, A, B), "b3")); center = { p: incenter, name: "Incenter" }; }
  if (show === "perpendicular") { for (const [p, q, k] of [[A, B, "p1"], [B, C, "p2"], [A, C, "p3"]] as const) segs.push(seg(mid(p, q), circum, k, true)); center = { p: circum, name: "Circumcenter" }; }
  const labels = ["A", "B", "C"];
  return (
    <SimShell
      subject="mathematics"
      title="Triangle explorer"
      onReset={() => { setP(init); setShow(initShow); }}
      visual={
        <Plane xMin={-8} xMax={8} yMin={-7} yMax={7} label={`Triangle with angles ${fmt(angA, 1)}, ${fmt(angB, 1)}, ${fmt(angC, 1)} degrees`} svgRef={svgRef} onPointerMove={onMove} onPointerUp={() => (drag.current = null)}>
          {show === "perpendicular" && <circle cx={sx(circum.x)} cy={sy(circum.y)} r={sx(dist(circum, A)) - sx(0)} fill="none" stroke="var(--physics)" strokeDasharray="4 4" />}
          {show === "bisectors" && (() => { const rr = (2 * area) / (a + b + c); return <circle cx={sx(incenter.x)} cy={sy(incenter.y)} r={sx(rr) - sx(0)} fill="none" stroke="var(--physics)" strokeDasharray="4 4" />; })()}
          <polygon points={P.map((p) => `${sx(p.x)},${sy(p.y)}`).join(" ")} fill="var(--math)" fillOpacity={0.15} stroke="var(--math)" strokeWidth={3} />
          {segs}
          {center && <><circle cx={sx(center.p.x)} cy={sy(center.p.y)} r={5} fill="var(--ink)" /><text x={sx(center.p.x) + 8} y={sy(center.p.y) + 16} fontSize="12" fontWeight="700" fill="var(--ink)">{center.name}</text></>}
          {P.map((p, i) => (
            <g key={i} tabIndex={0} role="button" aria-label={`Vertex ${labels[i]} at ${p.x}, ${p.y}`} className="cursor-grab outline-none"
              onPointerDown={(e) => { drag.current = i; svgRef.current?.setPointerCapture(e.pointerId); }}
              onKeyDown={(e) => {
                const d = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, 1], ArrowDown: [0, -1] }[e.key];
                if (!d) return; e.preventDefault();
                setP((ps) => { const next = ps.map((q, j) => (j === i ? { x: Math.max(-7, Math.min(7, q.x + d[0])), y: Math.max(-6, Math.min(6, q.y + d[1])) } : q)); const ar = Math.abs((next[1].x - next[0].x) * (next[2].y - next[0].y) - (next[2].x - next[0].x) * (next[1].y - next[0].y)); return ar === 0 ? ps : next; });
              }}>
              <circle cx={sx(p.x)} cy={sy(p.y)} r={14} fill="var(--math)" fillOpacity={0.15} />
              <circle cx={sx(p.x)} cy={sy(p.y)} r={7} fill="var(--math)" />
              <text x={sx(p.x) + 10} y={sy(p.y) - 10} fontSize="14" fontWeight="700" fill="var(--math)">{labels[i]}</text>
            </g>
          ))}
        </Plane>
      }
      controls={
        <>
          <p className="text-sm text-muted">Drag a vertex, or focus it and use the arrow keys. Vertices snap to grid points.</p>
          <label className="block text-sm font-semibold">
            Show
            <select className="mt-1 h-10 w-full rounded-lg border border-line bg-surface px-3" value={show} onChange={(e) => setShow(e.target.value as typeof show)}>
              <option value="angles">Angles and sides only</option>
              <option value="medians">Medians (centroid)</option>
              <option value="altitudes">Altitudes (orthocenter)</option>
              <option value="bisectors">Angle bisectors (incenter)</option>
              <option value="perpendicular">Perpendicular bisectors (circumcenter)</option>
            </select>
          </label>
          <div className="rounded-lg bg-math-soft px-3 py-2"><Tex latex={`${fmt(angA, 1)}^\\circ + ${fmt(angB, 1)}^\\circ + ${fmt(angC, 1)}^\\circ = 180^\\circ`} /></div>
        </>
      }
      readouts={[
        { label: "∠A, ∠B, ∠C", value: `${fmt(angA, 1)}°, ${fmt(angB, 1)}°, ${fmt(angC, 1)}°`, emphasis: true },
        { label: "Exterior angle at C", value: `${fmt(180 - angC, 1)}° = ∠A + ∠B` },
        { label: "BC, AC, AB", value: `${fmt(a)}, ${fmt(b)}, ${fmt(c)}` },
        { label: "Type", value: `${kindAngles}, ${kindSides}` },
        { label: "Area", value: fmt(area) },
        ...(center ? [{ label: center.name, value: `(${fmt(center.p.x)}, ${fmt(center.p.y)})` }] : []),
      ]}
      assumptions={[
        "Angles are computed from the coordinates with the Law of Cosines and rounded to 0.1°; their exact sum is always 180°.",
        "The exterior angle at a vertex equals the sum of the two remote interior angles.",
        "Medians meet at the centroid, altitudes at the orthocenter, angle bisectors at the incenter (center of the inscribed circle), and perpendicular bisectors at the circumcenter (center of the circumscribed circle).",
        "A vertex can't be dragged onto the line through the other two, because that wouldn't be a triangle.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Right-triangle trigonometry
// ---------------------------------------------------------------------------

export function RightTriangleTrig({ params }: SimProps) {
  const init = { angle: num(params, "angle", 35, 5, 85), hyp: num(params, "hyp", 10, 2, 20) };
  const [t, setT] = useState(init.angle);
  const [h, setH] = useState(init.hyp);
  const opp = h * Math.sin(t * DEG), adj = h * Math.cos(t * DEG);
  const W = 480, H = 320;
  const s = 360 / Math.max(adj, opp * 1.6, 1);
  const ox = 50, oy = 280;
  const Bx = ox + adj * s, Cy = oy - opp * s;
  return (
    <SimShell
      subject="mathematics"
      title="Right-triangle trigonometry"
      onReset={() => { setT(init.angle); setH(init.hyp); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Right triangle with angle ${t} degrees and hypotenuse ${h}`} className="block h-auto w-full">
          <polygon points={`${ox},${oy} ${Bx},${oy} ${Bx},${Cy}`} fill="var(--math)" fillOpacity={0.15} stroke="var(--math)" strokeWidth={3} strokeLinejoin="round" />
          <rect x={Bx - 14} y={oy - 14} width={14} height={14} fill="none" stroke="var(--ink)" />
          <path d={`M${ox + 40},${oy} A40,40 0 0 0 ${ox + 40 * Math.cos(t * DEG)},${oy - 40 * Math.sin(t * DEG)}`} fill="none" stroke="var(--chem)" strokeWidth={2.5} />
          <text x={ox + 48} y={oy - 10} fontSize="13" fontWeight="700" fill="var(--chem)">θ = {t}°</text>
          <text x={(ox + Bx) / 2} y={oy + 22} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--physics)">adjacent = {fmt(adj)}</text>
          <text x={Bx + 8} y={(oy + Cy) / 2} fontSize="13" fontWeight="700" fill="var(--chem)">opposite = {fmt(opp)}</text>
          <text x={(ox + Bx) / 2 - 20} y={(oy + Cy) / 2 - 12} textAnchor="end" fontSize="13" fontWeight="700" fill="var(--math)">hypotenuse = {fmt(h)}</text>
        </svg>
      }
      controls={
        <>
          <Slider label="Angle θ" value={t} min={5} max={85} step={1} unit="°" onChange={setT} />
          <Slider label="Hypotenuse" value={h} min={2} max={20} step={0.5} onChange={setH} />
          <div className="space-y-1 rounded-lg bg-math-soft px-3 py-2 text-sm">
            <Tex latex={`\\sin\\theta = \\tfrac{\\text{opp}}{\\text{hyp}} = ${fmt(Math.sin(t * DEG), 4)}`} />
            <div><Tex latex={`\\cos\\theta = \\tfrac{\\text{adj}}{\\text{hyp}} = ${fmt(Math.cos(t * DEG), 4)}`} /></div>
            <div><Tex latex={`\\tan\\theta = \\tfrac{\\text{opp}}{\\text{adj}} = ${fmt(Math.tan(t * DEG), 4)}`} /></div>
          </div>
          <p className="text-sm text-muted">Change only the hypotenuse: the sides change, but the ratios stay the same. They depend only on the angle.</p>
        </>
      }
      readouts={[
        { label: "Opposite", value: fmt(opp), emphasis: true },
        { label: "Adjacent", value: fmt(adj), emphasis: true },
        { label: "Other acute angle", value: `${90 - t}°` },
        { label: "opp² + adj²", value: `${fmt(opp * opp + adj * adj)} = ${fmt(h * h)}` },
      ]}
      assumptions={[
        "Sides are named relative to the angle θ: the opposite side faces θ, the adjacent side touches it, and the hypotenuse faces the right angle.",
        "All right triangles with the same acute angle are similar, which is why the ratios depend only on θ.",
        "Values are rounded; the triangle is drawn to scale but fitted to the window.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Circle angles: central and inscribed angles, arc length, sector area
// ---------------------------------------------------------------------------

export function CircleAngles({ params }: SimProps) {
  const init = { arc: num(params, "arc", 100, 10, 340), p: num(params, "p", 230, 0, 360), r: num(params, "r", 5, 1, 10) };
  const [arc, setArc] = useState(init.arc);
  const [pAng, setPAng] = useState(init.p);
  const [r, setR] = useState(init.r);
  const W = 480, H = 360, cx = 240, cy = 180, R = 140;
  const A = { x: cx + R * Math.cos(0), y: cy - R * Math.sin(0) };
  const B = { x: cx + R * Math.cos(arc * DEG), y: cy - R * Math.sin(arc * DEG) };
  const onMajor = pAng > arc && pAng < 360; // P must be on the other arc for the inscribed-angle theorem in this form
  const P = { x: cx + R * Math.cos(pAng * DEG), y: cy - R * Math.sin(pAng * DEG) };
  const inscribed = onMajor ? arc / 2 : (360 - arc) / 2;
  return (
    <SimShell
      subject="mathematics"
      title="Central and inscribed angles"
      onReset={() => { setArc(init.arc); setPAng(init.p); setR(init.r); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Arc of ${arc} degrees with inscribed angle ${fmt(inscribed, 1)} degrees`} className="block h-auto w-full">
          <circle cx={cx} cy={cy} r={R} fill="none" stroke="var(--muted)" strokeWidth={2} />
          <path d={`M${cx},${cy} L${A.x},${A.y} A${R},${R} 0 ${arc > 180 ? 1 : 0} 0 ${B.x},${B.y} Z`} fill="var(--math)" fillOpacity={0.15} />
          <path d={`M${A.x},${A.y} A${R},${R} 0 ${arc > 180 ? 1 : 0} 0 ${B.x},${B.y}`} fill="none" stroke="var(--math)" strokeWidth={5} />
          <line x1={cx} y1={cy} x2={A.x} y2={A.y} stroke="var(--math)" strokeWidth={2} />
          <line x1={cx} y1={cy} x2={B.x} y2={B.y} stroke="var(--math)" strokeWidth={2} />
          <line x1={P.x} y1={P.y} x2={A.x} y2={A.y} stroke="var(--chem)" strokeWidth={2.5} />
          <line x1={P.x} y1={P.y} x2={B.x} y2={B.y} stroke="var(--chem)" strokeWidth={2.5} />
          {[[A, "A"], [B, "B"], [P, "P"]].map(([pt, n]) => { const q = pt as { x: number; y: number }; return <g key={n as string}><circle cx={q.x} cy={q.y} r={6} fill="var(--ink)" /><text x={q.x + (q.x > cx ? 10 : -20)} y={q.y + (q.y > cy ? 18 : -8)} fontSize="14" fontWeight="700" fill="var(--ink)">{n as string}</text></g>; })}
          <circle cx={cx} cy={cy} r={4} fill="var(--ink)" />
          <text x={cx + 8} y={cy + 18} fontSize="12" fill="var(--ink)">O</text>
        </svg>
      }
      controls={
        <>
          <Slider label="Arc AB (central angle)" value={arc} min={10} max={340} step={5} unit="°" onChange={setArc} />
          <Slider label="Position of P on the circle" value={pAng} min={0} max={359} step={1} unit="°" onChange={setPAng} />
          <Slider label="Radius r" value={r} min={1} max={10} step={0.5} onChange={setR} />
          <div className="rounded-lg bg-math-soft px-3 py-2"><Tex latex={`\\angle APB = \\tfrac{1}{2}\\,m\\overset{\\frown}{AB}${onMajor ? "" : "\\text{ (other arc)}"}`} /></div>
        </>
      }
      readouts={[
        { label: "Central ∠AOB", value: `${arc}°`, emphasis: true },
        { label: "Inscribed ∠APB", value: `${fmt(inscribed, 1)}°`, emphasis: true },
        { label: "Arc length", value: `${fmt((arc / 360) * 2 * Math.PI * r)}` },
        { label: "Sector area", value: `${fmt((arc / 360) * Math.PI * r * r)}` },
        { label: "Arc in radians", value: fmt(arc * DEG, 4) },
      ]}
      assumptions={[
        "The central angle equals the measure of its intercepted arc.",
        "An inscribed angle is half its intercepted arc. If P moves onto arc AB itself, the angle intercepts the other arc, 360° − m(AB).",
        "Arc length = (θ/360°)·2πr and sector area = (θ/360°)·πr². The radius slider changes these lengths; the drawing stays the same size.",
      ]}
    />
  );
}
