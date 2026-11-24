// Chemistry simulations, part 2: VSEPR shapes, titration curves, equilibrium shifts and kinetics.
// Each computes its results from the stated equations.

import { useMemo, useState, type ReactNode } from "react";
import { fmt, num, scale, Segmented, SimShell, Slider, type SimProps } from "./shell";

const W = 480;

// ---------------------------------------------------------------------------
// VSEPR molecular geometry
// ---------------------------------------------------------------------------

type V3 = [number, number, number];
const norm = (v: V3): V3 => { const m = Math.hypot(...v); return [v[0] / m, v[1] / m, v[2] / m]; };
const DOMAINS: Record<number, V3[]> = {
  2: [[1, 0, 0], [-1, 0, 0]],
  3: [0, 1, 2].map((i) => { const a = Math.PI / 2 + (i * 2 * Math.PI) / 3; return [Math.cos(a), Math.sin(a), 0] as V3; }),
  4: [norm([1, 1, 1]), norm([-1, -1, 1]), norm([-1, 1, -1]), norm([1, -1, -1])],
  // trigonal bipyramid: equatorial first (lone pairs go there), then axial
  5: [[1, 0, 0], [-0.5, 0, 0.866], [-0.5, 0, -0.866], [0, 1, 0], [0, -1, 0]],
  // octahedron: opposite positions paired so two lone pairs sit trans
  6: [[0, 0, 1], [0, 0, -1], [1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0]],
};
// Which domain indices hold lone pairs, by (domains, lone pairs).
const LONE_IDX: Record<string, number[]> = {
  "3,1": [0], "4,1": [0], "4,2": [0, 2], "5,1": [0], "5,2": [0, 1], "5,3": [0, 1, 2], "6,1": [0], "6,2": [0, 1],
};
const SHAPES: Record<string, { electron: string; molecular: string; angle: string; example: string }> = {
  "2,0": { electron: "Linear", molecular: "Linear", angle: "180°", example: "CO₂, BeCl₂" },
  "3,0": { electron: "Trigonal planar", molecular: "Trigonal planar", angle: "120°", example: "BF₃, SO₃" },
  "3,1": { electron: "Trigonal planar", molecular: "Bent", angle: "slightly less than 120°", example: "SO₂, O₃" },
  "4,0": { electron: "Tetrahedral", molecular: "Tetrahedral", angle: "109.5°", example: "CH₄, CCl₄" },
  "4,1": { electron: "Tetrahedral", molecular: "Trigonal pyramidal", angle: "about 107°", example: "NH₃, PCl₃" },
  "4,2": { electron: "Tetrahedral", molecular: "Bent", angle: "about 104.5°", example: "H₂O, H₂S" },
  "5,0": { electron: "Trigonal bipyramidal", molecular: "Trigonal bipyramidal", angle: "90° and 120°", example: "PCl₅" },
  "5,1": { electron: "Trigonal bipyramidal", molecular: "Seesaw", angle: "under 90° and 120°", example: "SF₄" },
  "5,2": { electron: "Trigonal bipyramidal", molecular: "T-shaped", angle: "under 90°", example: "ClF₃" },
  "5,3": { electron: "Trigonal bipyramidal", molecular: "Linear", angle: "180°", example: "XeF₂, I₃⁻" },
  "6,0": { electron: "Octahedral", molecular: "Octahedral", angle: "90°", example: "SF₆" },
  "6,1": { electron: "Octahedral", molecular: "Square pyramidal", angle: "under 90°", example: "BrF₅" },
  "6,2": { electron: "Octahedral", molecular: "Square planar", angle: "90°", example: "XeF₄" },
};
const MAX_LONE: Record<number, number> = { 2: 0, 3: 1, 4: 2, 5: 3, 6: 2 };

export function Vsepr({ params }: SimProps) {
  const [n, setN] = useState(num(params, "domains", 4, 2, 6));
  const [lp, setLp] = useState(num(params, "lonePairs", 0, 0, 3));
  const [rot, setRot] = useState(num(params, "rotation", 30, 0, 360));
  const lone = Math.min(lp, MAX_LONE[n]);
  const key = `${n},${lone}`;
  const shape = SHAPES[key];
  const loneIdx = LONE_IDX[key] ?? [];
  const H = 280, cx = W / 2, cy = H / 2, R = 95;
  const a = (rot * Math.PI) / 180, tilt = 0.35;
  const project = ([x, y, z]: V3) => {
    const x1 = x * Math.cos(a) + z * Math.sin(a), z1 = -x * Math.sin(a) + z * Math.cos(a);
    const y1 = y * Math.cos(tilt) - z1 * Math.sin(tilt), z2 = y * Math.sin(tilt) + z1 * Math.cos(tilt);
    return { x: cx + R * x1, y: cy - R * y1, z: z2 };
  };
  const items = DOMAINS[n].map((d, i) => ({ ...project(d), lone: loneIdx.includes(i), i }));
  const sorted = [...items].sort((p, q) => p.z - q.z);
  const nodes: ReactNode[] = [];
  const centralZ = 0;
  let centralDrawn = false;
  const central = <circle key="c" cx={cx} cy={cy} r={22} fill="var(--chem)" />;
  for (const it of sorted) {
    if (!centralDrawn && it.z > centralZ) { nodes.push(central); centralDrawn = true; }
    const scaleZ = 1 + it.z * 0.18;
    if (it.lone) {
      const mx = cx + (it.x - cx) * 0.62, my = cy + (it.y - cy) * 0.62;
      const ang = (Math.atan2(it.y - cy, it.x - cx) * 180) / Math.PI;
      nodes.push(<ellipse key={`l${it.i}`} cx={mx} cy={my} rx={34 * scaleZ} ry={18 * scaleZ} transform={`rotate(${ang} ${mx} ${my})`} fill="var(--math)" opacity={0.28} stroke="var(--math)" strokeOpacity={0.6} />);
      nodes.push(<g key={`d${it.i}`}><circle cx={mx - 4} cy={my} r={3} fill="var(--math)" /><circle cx={mx + 4} cy={my} r={3} fill="var(--math)" /></g>);
    } else {
      nodes.push(<line key={`b${it.i}`} x1={cx} y1={cy} x2={it.x} y2={it.y} stroke="var(--ink)" strokeOpacity={0.55} strokeWidth={5 * scaleZ} strokeLinecap="round" />);
      nodes.push(<circle key={`a${it.i}`} cx={it.x} cy={it.y} r={15 * scaleZ} fill="var(--physics)" stroke="#fff" strokeWidth={2} />);
    }
  }
  if (!centralDrawn) nodes.push(central);
  return (
    <SimShell
      subject="chemistry"
      title="Molecular geometry (VSEPR)"
      onReset={() => { setN(4); setLp(0); setRot(30); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${n} electron domains with ${lone} lone pair${lone === 1 ? "" : "s"}: ${shape.molecular} molecule, bond angle ${shape.angle}, for example ${shape.example}.`} className="block h-auto w-full select-none">
          {nodes}
          <text x={12} y={H - 12} fontSize="11" fill="var(--muted)">orange: central atom · teal: bonded atoms · purple: lone pairs</text>
        </svg>
      }
      controls={
        <>
          <Slider label="Electron domains around the central atom" value={n} min={2} max={6} step={1} onChange={(v) => { setN(v); setLp((l) => Math.min(l, MAX_LONE[v])); }} />
          <Slider label="Lone pairs" value={lone} min={0} max={MAX_LONE[n]} step={1} disabled={MAX_LONE[n] === 0} onChange={setLp} />
          <Slider label="Rotate view" value={rot} min={0} max={360} step={5} unit="°" onChange={setRot} />
        </>
      }
      readouts={[
        { label: "Molecular geometry", value: shape.molecular, emphasis: true },
        { label: "Electron geometry", value: shape.electron },
        { label: "Bond angle", value: shape.angle },
        { label: "Examples", value: shape.example },
      ]}
      assumptions={[
        "Electron domains (bonds, counting a double or triple bond once, and lone pairs) spread as far apart as possible.",
        "Lone pairs repel more strongly than bonding pairs, squeezing bond angles; in five-domain shapes they sit in equatorial positions.",
        "The drawing is a rotating 3D projection; nearer atoms are drawn larger.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Titration curves
// ---------------------------------------------------------------------------

const KW = 1e-14;
type Acid = "strong" | "weak";

export function phAfter(acid: Acid, Ca: number, Va: number, Cb: number, Vb: number, Ka = 1.8e-5) {
  const V = Va + Vb, na = (Ca * Va) / V, nb = (Cb * Vb) / V;
  if (acid === "strong") {
    const d = na - nb;
    const h = (d + Math.sqrt(d * d + 4 * KW)) / 2;
    return -Math.log10(h);
  }
  // charge balance: h + Na = Ka*C/(Ka + h) + Kw/h; solve by bisection on log h
  const f = (h: number) => h + nb - (Ka * na) / (Ka + h) - KW / h;
  let lo = -14, hi = 0;
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    if (f(10 ** mid) > 0) hi = mid; else lo = mid;
  }
  return -(lo + hi) / 2;
}

export function Titration({ params }: SimProps) {
  const [acid, setAcid] = useState<Acid>(params?.acid === "weak" ? "weak" : "strong");
  const [Ca, setCa] = useState(num(params, "acidConc", 0.1, 0.01, 0.5));
  const [Cb, setCb] = useState(num(params, "baseConc", 0.1, 0.01, 0.5));
  const [Vb, setVb] = useState(num(params, "baseVolume", 12.5, 0, 60));
  const Va = 25;
  const Veq = (Ca * Va) / Cb;
  const vMax = Math.min(60, Math.max(10, Math.ceil((Veq * 2) / 5) * 5));
  const vb = Math.min(Vb, vMax);
  const pts = useMemo(() => Array.from({ length: 401 }, (_, i) => { const v = (vMax * i) / 400; return [v, phAfter(acid, Ca, Va, Cb, v)] as const; }), [acid, Ca, Cb, vMax]);
  const H = 260;
  const sx = scale(0, vMax, 46, W - 12), sy = scale(0, 14, 225, 12);
  const curve = pts.map(([v, p], i) => `${i ? "L" : "M"}${sx(v).toFixed(1)},${sy(p).toFixed(1)}`).join("");
  const ph = phAfter(acid, Ca, Va, Cb, vb);
  const phEq = phAfter(acid, Ca, Va, Cb, Veq);
  return (
    <SimShell
      subject="chemistry"
      title="Titration curve"
      onReset={() => { setAcid("strong"); setCa(0.1); setCb(0.1); setVb(12.5); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Titrating 25 mL of ${fmt(Ca, 3)} M ${acid === "strong" ? "HCl" : "acetic acid"} with ${fmt(Cb, 3)} M NaOH: equivalence at ${fmt(Veq, 1)} mL (pH ${fmt(phEq, 2)}); after ${fmt(vb, 1)} mL the pH is ${fmt(ph, 2)}.`} className="block h-auto w-full select-none">
          <line x1={sx(0)} y1={sy(0)} x2={sx(vMax)} y2={sy(0)} stroke="var(--muted)" />
          <line x1={sx(0)} y1={sy(0)} x2={sx(0)} y2={sy(14)} stroke="var(--muted)" />
          {[0, 7, 14].map((p) => <text key={p} x={sx(0) - 6} y={sy(p) + 4} textAnchor="end" fontSize="10" fill="var(--muted)">pH {p}</text>)}
          {[0, vMax / 2, vMax].map((v) => <text key={v} x={sx(v)} y={sy(0) + 16} textAnchor="middle" fontSize="10" fill="var(--muted)">{fmt(v)} mL</text>)}
          <line x1={sx(0)} y1={sy(7)} x2={sx(vMax)} y2={sy(7)} stroke="var(--line)" strokeDasharray="2 4" />
          {Veq <= vMax && <line x1={sx(Veq)} y1={sy(0)} x2={sx(Veq)} y2={sy(14)} stroke="var(--line)" strokeDasharray="4 4" />}
          {Veq <= vMax && <text x={sx(Veq) + 4} y={sy(13)} fontSize="11" fill="var(--muted)">equivalence</text>}
          <path d={curve} fill="none" stroke="var(--chem)" strokeWidth={2.5} />
          <circle cx={sx(vb)} cy={sy(ph)} r={5} fill="var(--physics)" />
          <text x={W - 12} y={sy(0) + 32} textAnchor="end" fontSize="11" fill="var(--muted)">pH against volume of NaOH added</text>
        </svg>
      }
      controls={
        <>
          <Segmented label="Acid (25.0 mL)" value={acid} options={[{ value: "strong", label: "HCl (strong)" }, { value: "weak", label: "Acetic acid (weak)" }]} onChange={setAcid} />
          <div className="grid grid-cols-2 gap-3">
            <Slider label="Acid concentration" value={Ca} min={0.01} max={0.5} step={0.01} unit="M" onChange={setCa} />
            <Slider label="NaOH concentration" value={Cb} min={0.01} max={0.5} step={0.01} unit="M" onChange={setCb} />
          </div>
          <Slider label="NaOH added" value={vb} min={0} max={vMax} step={0.1} unit="mL" onChange={setVb} />
        </>
      }
      readouts={[
        { label: "pH now", value: fmt(ph, 2), emphasis: true },
        { label: "Equivalence volume", value: `${fmt(Veq, 2)} mL` },
        { label: "pH at equivalence", value: fmt(phEq, 2) },
        ...(acid === "weak" ? [{ label: "pH at half-equivalence (= pKa)", value: fmt(phAfter(acid, Ca, Va, Cb, Veq / 2), 2) }] : []),
      ]}
      assumptions={[
        "25.0 mL of acid titrated with NaOH at 25 °C; Kw = 1.0 × 10⁻¹⁴; acetic acid Ka = 1.8 × 10⁻⁵ (pKa 4.74).",
        "pH is found from the exact charge balance, so it stays correct near equivalence and in the very dilute limit.",
        "Activities are taken equal to concentrations.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Equilibrium and Le Châtelier: A + B ⇌ C
// ---------------------------------------------------------------------------

export function solveEq(K: number, A: number, B: number, C: number) {
  // shift x toward products: (C + x) / ((A − x)(B − x)) = K
  const a = K, b = -(K * (A + B) + 1), c = K * A * B - C;
  const disc = Math.sqrt(Math.max(0, b * b - 4 * a * c));
  const roots = [(-b - disc) / (2 * a), (-b + disc) / (2 * a)];
  const x = roots.find((r) => A - r >= -1e-12 && B - r >= -1e-12 && C + r >= -1e-12) ?? 0;
  return { A: A - x, B: B - x, C: C + x };
}

type Stress = "addA" | "removeC" | "addC";

export function Equilibrium({ params }: SimProps) {
  const [K, setK] = useState(num(params, "K", 4, 0.1, 50));
  const [A0, setA0] = useState(num(params, "A0", 1, 0.1, 2));
  const [B0, setB0] = useState(num(params, "B0", 1, 0.1, 2));
  const [stress, setStress] = useState<Stress>("addA");
  const [amount, setAmount] = useState(num(params, "amount", 0.5, 0.1, 1));
  const eq1 = solveEq(K, A0, B0, 0);
  const after = stress === "addA" ? { ...eq1, A: eq1.A + amount } : stress === "addC" ? { ...eq1, C: eq1.C + amount } : { ...eq1, C: eq1.C / 2 };
  const Q = after.C / (after.A * after.B);
  const eq2 = solveEq(K, after.A, after.B, after.C);
  const dir = Math.abs(Q - K) < 1e-9 ? "no shift" : Q < K ? "shifts right (toward C)" : "shifts left (toward A and B)";
  const H = 240;
  const groups = [{ label: "Equilibrium", d: eq1 }, { label: "Right after stress", d: after }, { label: "New equilibrium", d: eq2 }];
  const yMax = Math.max(0.5, ...groups.flatMap((g) => [g.d.A, g.d.B, g.d.C])) * 1.15;
  const sy = scale(0, yMax, 200, 20);
  const colors = ["var(--chem)", "var(--math)", "var(--physics)"];
  return (
    <SimShell
      subject="chemistry"
      title="Equilibrium and Le Châtelier's principle"
      onReset={() => { setK(4); setA0(1); setB0(1); setStress("addA"); setAmount(0.5); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`A + B ⇌ C with K = ${fmt(K)}: after the stress Q = ${fmt(Q, 3)}, so the reaction ${dir}.`} className="block h-auto w-full select-none">
          <line x1={20} y1={sy(0)} x2={W - 10} y2={sy(0)} stroke="var(--muted)" />
          {groups.map((g, gi) => {
            const x0 = 40 + gi * 150;
            return (
              <g key={g.label}>
                {(["A", "B", "C"] as const).map((s, si) => (
                  <g key={s}>
                    <rect x={x0 + si * 36} y={sy(g.d[s])} width={28} height={sy(0) - sy(g.d[s])} fill={colors[si]} rx={3} />
                    <text x={x0 + si * 36 + 14} y={sy(0) + 14} textAnchor="middle" fontSize="12" fill="var(--ink)">{s}</text>
                    <text x={x0 + si * 36 + 14} y={sy(g.d[s]) - 4} textAnchor="middle" fontSize="10" fill="var(--muted)">{fmt(g.d[s], 2)}</text>
                  </g>
                ))}
                <text x={x0 + 50} y={sy(0) + 32} textAnchor="middle" fontSize="11" fill="var(--muted)">{g.label}</text>
              </g>
            );
          })}
        </svg>
      }
      controls={
        <>
          <Slider label="Equilibrium constant K" value={K} min={0.1} max={50} step={0.1} onChange={setK} />
          <div className="grid grid-cols-2 gap-3">
            <Slider label="Starting [A]" value={A0} min={0.1} max={2} step={0.1} unit="M" onChange={setA0} />
            <Slider label="Starting [B]" value={B0} min={0.1} max={2} step={0.1} unit="M" onChange={setB0} />
          </div>
          <Segmented label="Stress" value={stress} options={[{ value: "addA", label: "Add A" }, { value: "addC", label: "Add C" }, { value: "removeC", label: "Remove half of C" }]} onChange={setStress} />
          {stress !== "removeC" && <Slider label="Amount added" value={amount} min={0.1} max={1} step={0.1} unit="M" onChange={setAmount} />}
        </>
      }
      readouts={[
        { label: "Q right after the stress", value: fmt(Q, 3) },
        { label: "Response", value: dir, emphasis: true },
        { label: "New [C]", value: `${fmt(eq2.C, 3)} M` },
      ]}
      assumptions={[
        "A + B ⇌ C in solution at constant temperature, with K = [C]/([A][B]) fixed.",
        "Equilibrium is found exactly by solving the quadratic for the shift x.",
        "A temperature change would change K itself; that's not shown here.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Reaction kinetics: rate laws and the Arrhenius equation
// ---------------------------------------------------------------------------

type Order = "0" | "1" | "2";

export function Kinetics({ params }: SimProps) {
  const [order, setOrder] = useState<Order>(params?.order === "0" || params?.order === "2" ? (params.order as Order) : "1");
  const [k298, setK298] = useState(num(params, "k", 0.1, 0.01, 0.5));
  const [A0, setA0] = useState(num(params, "A0", 1, 0.2, 2));
  const [T, setT] = useState(num(params, "temperature", 298, 273, 373));
  const [Ea, setEa] = useState(num(params, "Ea", 50, 10, 100)); // kJ/mol
  const k = k298 * Math.exp(((-Ea * 1000) / 8.314) * (1 / T - 1 / 298));
  const conc = (t: number) => order === "0" ? Math.max(0, A0 - k * t) : order === "1" ? A0 * Math.exp(-k * t) : 1 / (1 / A0 + k * t);
  const half = order === "0" ? A0 / (2 * k) : order === "1" ? Math.LN2 / k : 1 / (k * A0);
  const tMax = [10, 20, 50, 100, 200, 500].find((x) => x >= 3 * half) ?? 500;
  const H = 240;
  const sx = scale(0, tMax, 46, W - 12), sy = scale(0, Math.max(A0, 0.1) * 1.1, 205, 15);
  const curve = Array.from({ length: 301 }, (_, i) => `${i ? "L" : "M"}${sx((i * tMax) / 300).toFixed(1)},${sy(conc((i * tMax) / 300)).toFixed(1)}`).join("");
  const rate0 = order === "0" ? k : order === "1" ? k * A0 : k * A0 * A0;
  return (
    <SimShell
      subject="chemistry"
      title="Reaction rates"
      onReset={() => { setOrder("1"); setK298(0.1); setA0(1); setT(298); setEa(50); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Order ${order} reaction at ${fmt(T)} K: k = ${fmt(k, 4)}, half-life ${fmt(half, 2)} s.`} className="block h-auto w-full select-none">
          <line x1={sx(0)} y1={sy(0)} x2={sx(tMax)} y2={sy(0)} stroke="var(--muted)" />
          <line x1={sx(0)} y1={sy(0)} x2={sx(0)} y2={sy(A0 * 1.1)} stroke="var(--muted)" />
          {[0, tMax / 2, tMax].map((v) => <text key={v} x={sx(v)} y={sy(0) + 16} textAnchor="middle" fontSize="10" fill="var(--muted)">{fmt(v)} s</text>)}
          <text x={sx(0) - 6} y={sy(A0) + 4} textAnchor="end" fontSize="10" fill="var(--muted)">{fmt(A0, 1)} M</text>
          {half <= tMax && <line x1={sx(half)} y1={sy(0)} x2={sx(half)} y2={sy(A0 / 2)} stroke="var(--line)" strokeDasharray="4 4" />}
          {half <= tMax && <line x1={sx(0)} y1={sy(A0 / 2)} x2={sx(half)} y2={sy(A0 / 2)} stroke="var(--line)" strokeDasharray="4 4" />}
          {half <= tMax && <text x={sx(half) + 4} y={sy(A0 / 2) - 6} fontSize="11" fill="var(--muted)">first half-life</text>}
          <path d={curve} fill="none" stroke="var(--chem)" strokeWidth={2.5} />
          <text x={W - 12} y={sy(0) + 32} textAnchor="end" fontSize="11" fill="var(--muted)">[A] against time</text>
        </svg>
      }
      controls={
        <>
          <Segmented label="Order in A" value={order} options={[{ value: "0", label: "Zero" }, { value: "1", label: "First" }, { value: "2", label: "Second" }]} onChange={setOrder} />
          <div className="grid grid-cols-2 gap-3">
            <Slider label="k at 298 K" value={k298} min={0.01} max={0.5} step={0.01} onChange={setK298} />
            <Slider label="Starting [A]" value={A0} min={0.2} max={2} step={0.1} unit="M" onChange={setA0} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Slider label="Temperature" value={T} min={273} max={373} step={1} unit="K" onChange={setT} />
            <Slider label="Activation energy" value={Ea} min={10} max={100} step={5} unit="kJ/mol" onChange={setEa} />
          </div>
        </>
      }
      readouts={[
        { label: "Rate constant k at T", value: fmt(k, 4), emphasis: true },
        { label: "First half-life", value: `${fmt(half, 3)} s` },
        { label: "Initial rate", value: `${fmt(rate0, 4)} M/s` },
      ]}
      assumptions={[
        "A → products with rate = k[A]ⁿ. Integrated laws: [A] = [A]₀ − kt (n = 0), [A]₀e^(−kt) (n = 1), 1/[A] = 1/[A]₀ + kt (n = 2).",
        "Half-lives: [A]₀/(2k), ln 2/k and 1/(k[A]₀). Only the first-order half-life is constant.",
        "Arrhenius: k(T) = k(298)·exp[−(Ea/R)(1/T − 1/298)], R = 8.314 J/(mol·K). Units of k depend on the order.",
      ]}
    />
  );
}
