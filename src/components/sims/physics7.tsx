// Physics simulations, part 7: collisions, energy on a track, PV diagrams, charges in magnetic
// fields and motional induction. Each computes its results from the stated equations.

import { Pause, Play, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "../ui";
import { fmt, num, scale, Segmented, SimShell, Slider, useAnimation, usePrefersReducedMotion, type SimProps } from "./shell";

const W = 480;
const G = 9.8;

function PlayButton({ running, done, onToggle, onRestart }: { running: boolean; done: boolean; onToggle: () => void; onRestart: () => void }) {
  return done ? (
    <Button variant="secondary" onClick={onRestart}><RotateCcw aria-hidden className="size-4" /> Replay</Button>
  ) : (
    <Button onClick={onToggle}>{running ? <><Pause aria-hidden className="size-4" /> Pause</> : <><Play aria-hidden className="size-4" /> Play</>}</Button>
  );
}

// ---------------------------------------------------------------------------
// One-dimensional collisions
// ---------------------------------------------------------------------------

/** Final velocities for a 1-D collision with coefficient of restitution e (1 elastic, 0 perfectly inelastic). */
export function collide(m1: number, m2: number, v1: number, v2: number, e: number) {
  const p = m1 * v1 + m2 * v2;
  const u1 = (p + m2 * e * (v2 - v1)) / (m1 + m2);
  const u2 = (p + m1 * e * (v1 - v2)) / (m1 + m2);
  const ke0 = 0.5 * m1 * v1 * v1 + 0.5 * m2 * v2 * v2;
  const ke1 = 0.5 * m1 * u1 * u1 + 0.5 * m2 * u2 * u2;
  return { u1, u2, p, ke0, ke1 };
}

export function Collisions({ params }: SimProps) {
  const [m1, setM1] = useState(num(params, "m1", 2, 0.5, 5));
  const [m2, setM2] = useState(num(params, "m2", 3, 0.5, 5));
  const [v1, setV1] = useState(num(params, "v1", 5, -6, 6));
  const [v2, setV2] = useState(num(params, "v2", 0, -6, 6));
  const [e, setE] = useState(num(params, "e", 1, 0, 1));
  const [t, setT] = useState(-1.5);
  const [running, setRunning] = useState(false);
  const reduce = usePrefersReducedMotion();
  const c = collide(m1, m2, v1, v2, e);
  const hits = v1 > v2;
  const T = 1.5;
  useAnimation(running, (dt) => setT((x) => { const n = x + dt * 0.75; if (n >= T) { setRunning(false); return T; } return n; }));
  const reset = (fn: (v: number) => void) => (v: number) => { fn(v); setRunning(false); setT(-T); };
  const w1 = 24 + m1 * 6, w2 = 24 + m2 * 6;
  const pos = (tt: number) => {
    if (!hits) return { x1: v1 * tt - 1, x2: v2 * tt + 1 };
    return tt < 0 ? { x1: v1 * tt, x2: v2 * tt } : { x1: c.u1 * tt, x2: c.u2 * tt };
  };
  const p = pos(t);
  const sx = scale(-10, 10, 20, W - 20);
  const H = 190;
  const after = hits && t >= 0;
  const cart = (x: number, w: number, m: number, side: -1 | 1, color: string, v: number) => {
    const cx = sx(x) + (side * w) / 2;
    return (
      <g>
        <rect x={cx - w / 2} y={96 - w * 0.55} width={w} height={w * 0.55} rx={4} fill={color} />
        <circle cx={cx - w * 0.28} cy={100} r={5} fill="var(--ink)" />
        <circle cx={cx + w * 0.28} cy={100} r={5} fill="var(--ink)" />
        <text x={cx} y={96 - w * 0.55 - 6} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--ink)">{fmt(m, 1)} kg</text>
        {Math.abs(v) > 0.05 && <line x1={cx} y1={128} x2={cx + v * 8} y2={128} stroke={color} strokeWidth={3} markerEnd="url(#col-arrow)" />}
        <text x={cx} y={148} textAnchor="middle" fontSize="11" fill="var(--muted)">{fmt(v, 2)} m/s</text>
      </g>
    );
  };
  return (
    <SimShell
      subject="physics"
      title="Collisions in one dimension"
      onReset={() => { setM1(2); setM2(3); setV1(5); setV2(0); setE(1); setT(-T); setRunning(false); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={hits ? `After the collision the carts move at ${fmt(c.u1, 2)} and ${fmt(c.u2, 2)} m/s; kinetic energy goes from ${fmt(c.ke0, 1)} to ${fmt(c.ke1, 1)} J.` : "The carts never meet: the left cart is not faster than the right one."} className="block h-auto w-full select-none">
          <defs><marker id="col-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="var(--muted)" /></marker></defs>
          <line x1={10} y1={106} x2={W - 10} y2={106} stroke="var(--muted)" strokeWidth={2} />
          {cart(p.x1, w1, m1, -1, "var(--physics)", after ? c.u1 : v1)}
          {cart(p.x2, w2, m2, 1, "var(--math)", after ? c.u2 : v2)}
          <text x={W / 2} y={176} textAnchor="middle" fontSize="12" fill="var(--muted)">{!hits ? "No collision: the left cart must be moving faster than the right one" : t < 0 ? "before" : "after"}</text>
        </svg>
      }
      controls={
        <>
          <div className="grid grid-cols-2 gap-3">
            <Slider label="Mass 1" value={m1} min={0.5} max={5} step={0.5} unit="kg" onChange={reset(setM1)} />
            <Slider label="Mass 2" value={m2} min={0.5} max={5} step={0.5} unit="kg" onChange={reset(setM2)} />
            <Slider label="Velocity 1" value={v1} min={-6} max={6} step={0.5} unit="m/s" onChange={reset(setV1)} />
            <Slider label="Velocity 2" value={v2} min={-6} max={6} step={0.5} unit="m/s" onChange={reset(setV2)} />
          </div>
          <Slider label="Bounciness e" value={e} min={0} max={1} step={0.05} format={(v) => (v === 1 ? "1 (elastic)" : v === 0 ? "0 (stick)" : fmt(v, 2))} onChange={reset(setE)} />
          <div className="flex flex-wrap items-center gap-2">
            <PlayButton running={running} done={t >= T} onToggle={() => { if (reduce) { setT(T); return; } setRunning((r) => !r); }} onRestart={() => { setT(-T); setRunning(!reduce); if (reduce) setT(T); }} />
          </div>
        </>
      }
      readouts={[
        { label: "Final velocities", value: hits ? `${fmt(c.u1, 2)}, ${fmt(c.u2, 2)} m/s` : "—", emphasis: true },
        { label: "Momentum before → after", value: `${fmt(c.p, 2)} → ${fmt(hits ? m1 * c.u1 + m2 * c.u2 : c.p, 2)} kg·m/s` },
        { label: "Kinetic energy before → after", value: hits ? `${fmt(c.ke0, 2)} → ${fmt(c.ke1, 2)} J` : `${fmt(c.ke0, 2)} J` },
        { label: "Kinetic energy lost", value: hits ? `${fmt(100 * (1 - c.ke1 / (c.ke0 || 1)), 1)}%` : "0%" },
      ]}
      assumptions={[
        "Frictionless track and an instantaneous collision: no external horizontal force, so momentum is conserved exactly.",
        "Bounciness is the coefficient of restitution e = (relative speed after)/(relative speed before): 1 is elastic, 0 means the carts stick together.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Energy on a U-shaped track
// ---------------------------------------------------------------------------

const TRACK_L = 5;
const trackY = (x: number, h: number) => h * (x / TRACK_L) ** 2;
const trackSlope = (x: number, h: number) => (2 * h * x) / (TRACK_L * TRACK_L);

export function EnergyTrack({ params }: SimProps) {
  const [h, setH] = useState(num(params, "height", 4, 1, 6));
  const [mass, setMass] = useState(num(params, "mass", 2, 0.5, 5));
  const [mu, setMu] = useState(num(params, "friction", 0, 0, 0.2));
  const [state, setState] = useState({ x: -TRACK_L, v: 0, t: 0 });
  const [running, setRunning] = useState(false);
  const reduce = usePrefersReducedMotion();
  const E0 = mass * G * h;
  // Integrate the motion along the track in small steps (speed along the track, v; position x).
  const step = (s: { x: number; v: number; t: number }, dt: number) => {
    let { x, v } = s;
    const n = 20;
    const d = dt / n;
    for (let k = 0; k < n; k++) {
      const th = Math.atan(trackSlope(x, h));
      let a = -G * Math.sin(th);
      if (Math.abs(v) > 1e-3) a -= Math.sign(v) * mu * G * Math.cos(th);
      else if (Math.abs(Math.tan(th)) <= mu) { a = 0; v = 0; } // static: stays put
      v += a * d;
      x += v * Math.cos(th) * d;
      if (x < -TRACK_L) { x = -TRACK_L; v = 0; }
      if (x > TRACK_L) { x = TRACK_L; v = 0; }
    }
    return { x, v, t: s.t + dt };
  };
  useAnimation(running, (dt) => setState((s) => {
    const n = step(s, Math.min(dt, 0.05));
    if (n.t > 60 || (Math.abs(n.v) < 1e-3 && Math.abs(Math.tan(Math.atan(trackSlope(n.x, h)))) <= mu && n.t > 0.5)) setRunning(false);
    return n;
  }));
  const ke = 0.5 * mass * state.v * state.v;
  const pe = mass * G * trackY(state.x, h);
  const thermal = Math.max(0, E0 - ke - pe);
  const restart = () => { setState({ x: -TRACK_L, v: 0, t: 0 }); setRunning(!reduce); };
  const change = (fn: (v: number) => void) => (v: number) => { fn(v); setRunning(false); setState({ x: -TRACK_L, v: 0, t: 0 }); };
  const H = 250;
  const sx = scale(-TRACK_L, TRACK_L, 20, 300), sy = scale(0, 6, 220, 30);
  let path = "";
  for (let i = 0; i <= 80; i++) { const x = -TRACK_L + (2 * TRACK_L * i) / 80; path += `${i ? "L" : "M"}${sx(x)},${sy(trackY(x, h))}`; }
  const bx = 330, bw = 36, by = scale(0, Math.max(E0, 1), 220, 40);
  const bars = [{ label: "KE", v: ke, c: "var(--physics)" }, { label: "PE", v: pe, c: "var(--math)" }, { label: "Heat", v: thermal, c: "var(--chem)" }];
  return (
    <SimShell
      subject="physics"
      title="Energy on a track"
      onReset={() => { setH(4); setMass(2); setMu(0); setState({ x: -TRACK_L, v: 0, t: 0 }); setRunning(false); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Kinetic ${fmt(ke, 0)} J, potential ${fmt(pe, 0)} J, thermal ${fmt(thermal, 0)} J; total ${fmt(E0, 0)} J.`} className="block h-auto w-full select-none">
          <path d={path} fill="none" stroke="var(--muted)" strokeWidth={4} strokeLinecap="round" />
          <circle cx={sx(state.x)} cy={sy(trackY(state.x, h)) - 9} r={9} fill="var(--physics)" />
          <text x={sx(0)} y={240} textAnchor="middle" fontSize="11" fill="var(--muted)">speed {fmt(Math.abs(state.v), 2)} m/s</text>
          {bars.map((b, i) => (
            <g key={b.label}>
              <rect x={bx + i * (bw + 10)} y={by(b.v)} width={bw} height={Math.max(0, 220 - by(b.v))} fill={b.c} rx={3} />
              <text x={bx + i * (bw + 10) + bw / 2} y={236} textAnchor="middle" fontSize="11" fill="var(--muted)">{b.label}</text>
            </g>
          ))}
          <line x1={bx - 6} y1={by(E0)} x2={bx + 3 * (bw + 10) - 4} y2={by(E0)} stroke="var(--ink)" strokeDasharray="4 3" />
          <text x={bx - 6} y={by(E0) - 6} fontSize="10" fill="var(--muted)">total {fmt(E0, 0)} J</text>
        </svg>
      }
      controls={
        <>
          <div className="grid grid-cols-2 gap-3">
            <Slider label="Start height" value={h} min={1} max={6} step={0.5} unit="m" onChange={change(setH)} />
            <Slider label="Mass" value={mass} min={0.5} max={5} step={0.5} unit="kg" onChange={change(setMass)} />
          </div>
          <Slider label="Friction coefficient μ" value={mu} min={0} max={0.2} step={0.01} onChange={change(setMu)} />
          <div className="flex flex-wrap gap-2">
            {state.t === 0 && !running ? <Button onClick={restart}><Play aria-hidden className="size-4" /> Release</Button> : <Button variant="secondary" onClick={() => setRunning((r) => !r)}>{running ? <><Pause aria-hidden className="size-4" /> Pause</> : <><Play aria-hidden className="size-4" /> Resume</>}</Button>}
            <Button variant="secondary" onClick={() => { setRunning(false); setState({ x: -TRACK_L, v: 0, t: 0 }); }}><RotateCcw aria-hidden className="size-4" /> Reset ball</Button>
          </div>
        </>
      }
      readouts={[
        { label: "Kinetic ½mv²", value: `${fmt(ke, 1)} J` },
        { label: "Potential mgh", value: `${fmt(pe, 1)} J` },
        { label: "Thermal (friction)", value: `${fmt(thermal, 1)} J` },
        { label: "Total", value: `${fmt(ke + pe + thermal, 1)} J`, emphasis: true },
      ]}
      assumptions={[
        "The track is y = h(x/5)²; the ball slides without rolling, with kinetic friction μmg cos θ along the track.",
        "The normal force from the track's curvature is ignored in the friction term, so friction losses are slightly underestimated near the bottom.",
        "Thermal energy is whatever the total has lost; with μ = 0 the ball returns to its starting height.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// PV diagram for an ideal monatomic gas
// ---------------------------------------------------------------------------

type Process = "isothermal" | "isobaric" | "isochoric" | "adiabatic";
const GAMMA = 5 / 3;

/** 1 mol of monatomic ideal gas from (P1 kPa, V1 L). Energies in J (kPa·L = J). */
export function pvProcess(kind: Process, P1: number, V1: number, target: number) {
  let P2 = P1, V2 = V1, Wby = 0;
  if (kind === "isothermal") { V2 = target; P2 = (P1 * V1) / V2; Wby = P1 * V1 * Math.log(V2 / V1); }
  else if (kind === "isobaric") { V2 = target; Wby = P1 * (V2 - V1); }
  else if (kind === "isochoric") { P2 = target; Wby = 0; }
  else { V2 = target; P2 = P1 * Math.pow(V1 / V2, GAMMA); Wby = (P1 * V1 - P2 * V2) / (GAMMA - 1); }
  const dU = 1.5 * (P2 * V2 - P1 * V1);
  const R = 8.314;
  return { P2, V2, W: Wby, dU, Q: dU + Wby, T1: (P1 * V1) / R, T2: (P2 * V2) / R };
}

export function PVDiagram({ params }: SimProps) {
  const [kind, setKind] = useState<Process>((["isothermal", "isobaric", "isochoric", "adiabatic"] as const).find((k) => k === params?.process) ?? "isothermal");
  const P1 = 200, V1 = 10;
  const [target, setTarget] = useState(num(params, "target", 20, 4, 30));
  const tgt = kind === "isochoric" ? Math.min(Math.max(target * 10, 40), 300) : Math.min(Math.max(target, 4), 30);
  const r = pvProcess(kind, P1, V1, tgt);
  const H = 260;
  const sx = scale(0, 32, 50, W - 15), sy = scale(0, 320, H - 30, 15);
  const pts: [number, number][] = [];
  for (let i = 0; i <= 60; i++) {
    const f = i / 60;
    if (kind === "isochoric") pts.push([V1, P1 + (r.P2 - P1) * f]);
    else {
      const V = V1 + (r.V2 - V1) * f;
      const P = kind === "isothermal" ? (P1 * V1) / V : kind === "isobaric" ? P1 : P1 * Math.pow(V1 / V, GAMMA);
      pts.push([V, P]);
    }
  }
  const path = pts.map(([V, P], i) => `${i ? "L" : "M"}${sx(V)},${sy(P)}`).join("");
  const area = kind === "isochoric" ? "" : `${path} L${sx(r.V2)},${sy(0)} L${sx(V1)},${sy(0)} Z`;
  const iso = (T: number) => { let d = ""; for (let i = 0; i <= 40; i++) { const V = 2 + (30 * i) / 40; const P = (8.314 * T) / V; d += `${i ? "L" : "M"}${sx(V)},${sy(Math.min(P, 330))}`; } return d; };
  const sign = (x: number) => (Math.abs(x) < 0.5 ? "0" : x > 0 ? "+" : "−");
  return (
    <SimShell
      subject="physics"
      title="PV diagrams"
      onReset={() => { setKind("isothermal"); setTarget(20); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${kind} process from ${P1} kPa, ${V1} L to ${fmt(r.P2, 0)} kPa, ${fmt(r.V2, 1)} L. Work by gas ${fmt(r.W, 0)} J, heat ${fmt(r.Q, 0)} J, ΔU ${fmt(r.dU, 0)} J.`} className="block h-auto w-full select-none">
          <path d={iso(r.T1)} fill="none" stroke="var(--line)" strokeDasharray="3 4" />
          {Math.abs(r.T2 - r.T1) > 1 && <path d={iso(r.T2)} fill="none" stroke="var(--line)" strokeDasharray="3 4" />}
          {area && <path d={area} fill={r.W >= 0 ? "var(--physics)" : "var(--math)"} opacity={0.18} />}
          <line x1={sx(0)} y1={sy(0)} x2={sx(32)} y2={sy(0)} stroke="var(--muted)" />
          <line x1={sx(0)} y1={sy(0)} x2={sx(0)} y2={sy(320)} stroke="var(--muted)" />
          {[0, 10, 20, 30].map((v) => <text key={v} x={sx(v)} y={H - 14} textAnchor="middle" fontSize="10" fill="var(--muted)">{v}</text>)}
          {[100, 200, 300].map((p) => <text key={p} x={sx(0) - 5} y={sy(p) + 4} textAnchor="end" fontSize="10" fill="var(--muted)">{p}</text>)}
          <text x={sx(16)} y={H - 1} textAnchor="middle" fontSize="11" fill="var(--muted)">volume (L)</text>
          <text x={14} y={sy(160)} fontSize="11" fill="var(--muted)" transform={`rotate(-90 14 ${sy(160)})`} textAnchor="middle">pressure (kPa)</text>
          <path d={path} fill="none" stroke="var(--physics)" strokeWidth={3} markerEnd="url(#pv-arrow)" />
          <defs><marker id="pv-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--physics)" /></marker></defs>
          <circle cx={sx(V1)} cy={sy(P1)} r={5} fill="var(--ink)" />
          <text x={sx(V1) + 8} y={sy(P1) - 8} fontSize="11" fill="var(--ink)">1</text>
          <circle cx={sx(r.V2)} cy={sy(r.P2)} r={5} fill="var(--physics)" />
          <text x={sx(r.V2) + 8} y={sy(r.P2) - 8} fontSize="11" fill="var(--ink)">2</text>
          <text x={W - 16} y={26} textAnchor="end" fontSize="10" fill="var(--muted)">dashed: isotherms at T₁{Math.abs(r.T2 - r.T1) > 1 ? " and T₂" : ""}</text>
        </svg>
      }
      controls={
        <>
          <Segmented label="Process" value={kind} options={[{ value: "isothermal", label: "Isothermal" }, { value: "isobaric", label: "Isobaric" }, { value: "isochoric", label: "Isochoric" }, { value: "adiabatic", label: "Adiabatic" }]} onChange={setKind} />
          {kind === "isochoric"
            ? <Slider label="Final pressure" value={tgt} min={40} max={300} step={10} unit="kPa" onChange={(v) => setTarget(v / 10)} />
            : <Slider label="Final volume" value={tgt} min={4} max={30} step={0.5} unit="L" onChange={setTarget} />}
        </>
      }
      readouts={[
        { label: "Work by gas W = ∫P dV", value: `${fmt(r.W, 0)} J`, emphasis: true },
        { label: "ΔU = (3/2)nRΔT", value: `${fmt(r.dU, 0)} J` },
        { label: "Heat in Q = ΔU + W", value: `${fmt(r.Q, 0)} J` },
        { label: "T₁ → T₂", value: `${fmt(r.T1, 0)} → ${fmt(r.T2, 0)} K` },
        { label: "Signs (Q, W, ΔU)", value: `${sign(r.Q)}, ${sign(r.W)}, ${sign(r.dU)}` },
      ]}
      assumptions={[
        "One mole of monatomic ideal gas (γ = 5/3) starting at 200 kPa and 10 L; 1 kPa·L = 1 J.",
        "Processes are quasi-static. W is the work done by the gas (the shaded area), so the first law reads ΔU = Q − W.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Charged particle in a uniform magnetic field
// ---------------------------------------------------------------------------

const SPECIES = {
  proton: { label: "Proton", m: 1.673e-27, q: 1.602e-19 },
  deuteron: { label: "Deuteron", m: 3.344e-27, q: 1.602e-19 },
  alpha: { label: "Alpha", m: 6.645e-27, q: 3.204e-19 },
} as const;
type Species = keyof typeof SPECIES;

export function MagneticOrbit({ params }: SimProps) {
  const [sp, setSp] = useState<Species>((Object.keys(SPECIES) as Species[]).find((k) => k === params?.species) ?? "proton");
  const [v, setV] = useState(num(params, "speed", 10, 1, 20)); // 10⁵ m/s
  const [B, setB] = useState(num(params, "field", 0.1, 0.05, 1)); // T
  const [phase, setPhase] = useState(0);
  const [running, setRunning] = useState(true);
  const reduce = usePrefersReducedMotion();
  const s = SPECIES[sp];
  const r = (s.m * v * 1e5) / (s.q * B); // m
  const T = (2 * Math.PI * s.m) / (s.q * B);
  useAnimation(running && !reduce, (dt) => setPhase((p) => (p + dt * 1.2) % (2 * Math.PI)));
  const H = 270;
  const view = 0.3; // m, half-width of the picture
  const sc = scale(-view, view, 20, 250);
  const scY = scale(-view, view, 250, 20);
  // B into the page; a positive charge moving +x at the bottom of its circle feels qv × B upward,
  // so the centre is above it and the motion is counterclockwise.
  const cx = 0, cy = r - 0.18;
  const ang = -Math.PI / 2 + phase;
  const px = cx + r * Math.cos(ang), py = cy + r * Math.sin(ang);
  const vx = -Math.sin(ang), vy = Math.cos(ang);
  const dots = [];
  for (let i = -3; i <= 3; i++) for (let j = -3; j <= 3; j++) dots.push([i * 0.08, j * 0.08]);
  return (
    <SimShell
      subject="physics"
      title="Charges in a magnetic field"
      onReset={() => { setSp("proton"); setV(10); setB(0.1); setPhase(0); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${s.label} at ${fmt(v)}×10⁵ m/s in ${fmt(B)} T: circle of radius ${fmt(r * 100, 1)} cm, period ${fmt(T * 1e9, 1)} ns.`} className="block h-auto w-full select-none">
          <defs>
            <clipPath id="mo-clip"><rect x={20} y={20} width={230} height={230} /></clipPath>
            <marker id="mo-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="context-stroke" /></marker>
          </defs>
          <rect x={20} y={20} width={230} height={230} fill="var(--sunken)" stroke="var(--line)" />
          {dots.map(([x, y], k) => <text key={k} x={sc(x)} y={scY(y) + 4} textAnchor="middle" fontSize="12" fill="var(--muted)">×</text>)}
          <g clipPath="url(#mo-clip)">
            <circle cx={sc(cx)} cy={scY(cy)} r={(r / (2 * view)) * 230} fill="none" stroke="var(--physics)" strokeDasharray="5 4" />
            <circle cx={sc(px)} cy={scY(py)} r={7} fill="var(--physics)" />
            <line x1={sc(px)} y1={scY(py)} x2={sc(px) + vx * 34} y2={scY(py) - vy * 34} stroke="var(--math)" strokeWidth={2.5} markerEnd="url(#mo-arrow)" />
            <line x1={sc(px)} y1={scY(py)} x2={sc(px) + ((cx - px) / r) * 30} y2={scY(py) - ((cy - py) / r) * 30} stroke="var(--chem)" strokeWidth={2.5} markerEnd="url(#mo-arrow)" />
          </g>
          <text x={270} y={50} fontSize="12" fill="var(--ink)">B into the page (×)</text>
          <text x={270} y={74} fontSize="12" fill="var(--math)">— velocity</text>
          <text x={270} y={96} fontSize="12" fill="var(--chem)">— force qv × B</text>
          <line x1={270} y1={130} x2={270 + (0.1 / (2 * view)) * 230} y2={130} stroke="var(--ink)" strokeWidth={2} />
          <text x={270} y={148} fontSize="11" fill="var(--muted)">10 cm</text>
          {r > 0.5 && <text x={270} y={180} fontSize="11" fill="var(--muted)">radius larger than the view</text>}
        </svg>
      }
      controls={
        <>
          <Segmented label="Particle" value={sp} options={(Object.keys(SPECIES) as Species[]).map((k) => ({ value: k, label: SPECIES[k].label }))} onChange={setSp} />
          <div className="grid grid-cols-2 gap-3">
            <Slider label="Speed" value={v} min={1} max={20} step={0.5} unit="×10⁵ m/s" onChange={setV} />
            <Slider label="Field B" value={B} min={0.05} max={1} step={0.05} unit="T" onChange={setB} />
          </div>
          {!reduce && <Button variant="secondary" onClick={() => setRunning((x) => !x)}>{running ? <><Pause aria-hidden className="size-4" /> Pause</> : <><Play aria-hidden className="size-4" /> Resume</>}</Button>}
        </>
      }
      readouts={[
        { label: "Radius r = mv/(qB)", value: `${fmt(r * 100, 2)} cm`, emphasis: true },
        { label: "Period T = 2πm/(qB)", value: `${fmt(T * 1e9, 2)} ns` },
        { label: "Force qvB", value: `${(s.q * v * 1e5 * B).toExponential(2)} N` },
      ]}
      assumptions={[
        "Uniform field perpendicular to the velocity; the magnetic force is always perpendicular to the motion, so speed and kinetic energy stay constant.",
        "Non-relativistic speeds. The animation is slowed enormously: real periods are nanoseconds.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Loop moving through a field region: flux and induced emf
// ---------------------------------------------------------------------------

const LOOP = 0.2; // m, side of the square loop
const REGION = 0.4; // m, width of the field region

/** Overlap length of the loop [x, x + LOOP] with the field region [0, REGION]. */
const overlap = (x: number) => Math.max(0, Math.min(x + LOOP, REGION) - Math.max(x, 0));

export function LoopInduction({ params }: SimProps) {
  const [B, setB] = useState(num(params, "field", 0.5, 0.1, 1));
  const [v, setV] = useState(num(params, "speed", 2, 0.5, 4));
  const [R, setR] = useState(num(params, "resistance", 2, 0.5, 10));
  const xStart = -0.3, xEnd = 0.5;
  const tEnd = (xEnd - xStart) / v;
  const [t, setT] = useState(0);
  const [running, setRunning] = useState(false);
  const reduce = usePrefersReducedMotion();
  useAnimation(running, (dt) => setT((x) => { const n = x + dt * 0.25; if (n >= tEnd) { setRunning(false); return tEnd; } return n; }));
  const x = xStart + v * t;
  const flux = (xx: number) => B * LOOP * overlap(xx);
  const dPhi = (flux(x + 1e-6) - flux(x - 1e-6)) / 2e-6; // per metre
  const emf = -dPhi * v;
  const I = emf / R;
  const series = useMemo(() => Array.from({ length: 161 }, (_, k) => { const tt = (tEnd * k) / 160; const xx = xStart + v * tt; const d = (flux(xx + 1e-6) - flux(xx - 1e-6)) / 2e-6; return { tt, phi: flux(xx), emf: -d * v }; }), [B, v, tEnd]); // eslint-disable-line react-hooks/exhaustive-deps
  const H = 290;
  const sx = scale(-0.35, 0.55, 20, W - 20);
  const gx = scale(0, tEnd, 60, W - 20);
  const phiMax = B * LOOP * LOOP;
  const emfMax = B * LOOP * v;
  const gy1 = scale(0, phiMax, 190, 150), gy2 = scale(-emfMax, emfMax, 280, 210);
  const line = (sel: (p: (typeof series)[number]) => number, sy: (n: number) => number) => series.map((p, k) => `${k ? "L" : "M"}${gx(p.tt)},${sy(sel(p))}`).join("");
  const dir = Math.abs(emf) < 1e-9 ? "no current" : emf > 0 ? "clockwise" : "counterclockwise";
  return (
    <SimShell
      subject="physics"
      title="Motional emf and Lenz's law"
      onReset={() => { setB(0.5); setV(2); setR(2); setT(0); setRunning(false); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Loop at x = ${fmt(x, 2)} m; flux ${fmt(flux(x) * 1000, 1)} mWb, emf ${fmt(emf, 3)} V, current ${fmt(I, 3)} A ${dir}.`} className="block h-auto w-full select-none">
          <rect x={sx(0)} y={20} width={sx(REGION) - sx(0)} height={110} fill="var(--physics)" opacity={0.12} />
          {Array.from({ length: 5 }, (_, i) => Array.from({ length: 4 }, (_, j) => <text key={`${i}-${j}`} x={sx(0.04 + i * 0.08)} y={40 + j * 26} textAnchor="middle" fontSize="13" fill="var(--physics)">×</text>))}
          <text x={sx(REGION / 2)} y={146} textAnchor="middle" fontSize="11" fill="var(--muted)">B into the page</text>
          <rect x={sx(x)} y={45} width={sx(LOOP) - sx(0)} height={sx(LOOP) - sx(0)} fill="none" stroke={Math.abs(I) > 1e-9 ? "var(--chem)" : "var(--ink)"} strokeWidth={3.5} />
          <text x={sx(x) + (sx(LOOP) - sx(0)) / 2} y={40} textAnchor="middle" fontSize="11" fill="var(--ink)">{dir}</text>
          <line x1={gx(0)} y1={gy1(0)} x2={gx(tEnd)} y2={gy1(0)} stroke="var(--line)" />
          <path d={line((p) => p.phi, gy1)} fill="none" stroke="var(--physics)" strokeWidth={2} />
          <text x={8} y={gy1(phiMax / 2) + 4} fontSize="10" fill="var(--muted)">flux Φ</text>
          <line x1={gx(0)} y1={gy2(0)} x2={gx(tEnd)} y2={gy2(0)} stroke="var(--line)" />
          <path d={line((p) => p.emf, gy2)} fill="none" stroke="var(--chem)" strokeWidth={2} />
          <text x={8} y={gy2(0) + 4} fontSize="10" fill="var(--muted)">emf ε</text>
          <line x1={gx(t)} y1={150} x2={gx(t)} y2={284} stroke="var(--ink)" strokeDasharray="3 3" />
        </svg>
      }
      controls={
        <>
          <div className="grid grid-cols-3 gap-3">
            <Slider label="Field B" value={B} min={0.1} max={1} step={0.05} unit="T" onChange={setB} />
            <Slider label="Speed" value={v} min={0.5} max={4} step={0.5} unit="m/s" onChange={(n) => { setV(n); setT(0); setRunning(false); }} />
            <Slider label="Resistance" value={R} min={0.5} max={10} step={0.5} unit="Ω" onChange={setR} />
          </div>
          <Slider label="Time" value={t} min={0} max={Math.round(tEnd * 1000) / 1000} step={0.005} unit="s" onChange={(n) => { setT(n); setRunning(false); }} />
          <PlayButton running={running} done={t >= tEnd} onToggle={() => { if (reduce) { setT(tEnd); return; } setRunning((r) => !r); }} onRestart={() => { setT(0); setRunning(!reduce); }} />
        </>
      }
      readouts={[
        { label: "Flux Φ = BA_inside", value: `${fmt(flux(x) * 1000, 2)} mWb` },
        { label: "emf ε = −dΦ/dt", value: `${fmt(emf, 3)} V`, emphasis: true },
        { label: "Current I = ε/R", value: `${fmt(Math.abs(I), 3)} A, ${dir}` },
        { label: "Peak emf BLv", value: `${fmt(emfMax, 3)} V` },
      ]}
      assumptions={[
        "A 20 cm square loop moves at constant speed through a 40 cm wide uniform field region; outside the region B = 0.",
        "Flux into the page counts as positive, so a positive emf drives a clockwise current. By Lenz's law the current is counterclockwise while the loop enters (flux into the page growing) and clockwise while it leaves.",
      ]}
    />
  );
}
