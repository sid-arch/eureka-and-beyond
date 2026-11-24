// Physics simulations. Each computes its results from the stated equations.

import { Pause, Play } from "lucide-react";
import { useState } from "react";
import { Math as Tex } from "../ui/Math";
import { Button } from "../ui";
import { fmt, num, scale, Segmented, SimShell, Slider, useAnimation, usePrefersReducedMotion, type SimProps } from "./shell";

// ---------------------------------------------------------------------------
// Projectile motion (no drag)
// ---------------------------------------------------------------------------

export function projectile(v0: number, deg: number, h0: number, g: number) {
  const t = (deg * Math.PI) / 180;
  const vx = v0 * Math.cos(t);
  const vy = v0 * Math.sin(t);
  const T = (vy + Math.sqrt(vy * vy + 2 * g * h0)) / g;
  return { vx, vy, T, range: vx * T, peak: h0 + (vy > 0 ? (vy * vy) / (2 * g) : 0), tPeak: vy > 0 ? vy / g : 0 };
}

export function Projectile({ params }: SimProps) {
  const init = { speed: num(params, "speed", 20, 1, 40), angle: num(params, "angle", 45, 0, 90), height: num(params, "height", 0, 0, 30), g: num(params, "g", 9.8, 1, 25) };
  const [v0, setV0] = useState(init.speed);
  const [deg, setDeg] = useState(init.angle);
  const [h0, setH0] = useState(init.height);
  const [g, setG] = useState(init.g);
  const [t, setT] = useState(0);
  const [running, setRunning] = useState(false);
  const reduce = usePrefersReducedMotion();
  const p = projectile(v0, deg, h0, g);
  useAnimation(running, (dt) => setT((x) => {
    const n = x + dt * 1.0;
    if (n >= p.T) { setRunning(false); return p.T; }
    return n;
  }));
  const launch = () => { if (reduce) { setT(p.T); return; } setT(0); setRunning(true); };
  const change = (fn: (v: number) => void) => (v: number) => { fn(v); setRunning(false); setT(0); };

  const W = 480;
  const H = 320;
  const xMax = Math.max(10, Math.ceil((projectile(v0, 45, h0, g).range * 1.1) / 10) * 10);
  const yMax = Math.max(5, Math.ceil((Math.max(p.peak, h0) * 1.25) / 5) * 5, xMax * 0.45);
  const sx = scale(0, xMax, 40, W - 15);
  const sy = scale(0, yMax, H - 30, 15);
  const pos = (tt: number) => ({ x: p.vx * tt, y: h0 + p.vy * tt - 0.5 * g * tt * tt });
  let path = "";
  for (let i = 0; i <= 120; i++) { const q = pos((p.T * i) / 120); path += `${i ? "L" : "M"}${sx(q.x)},${sy(q.y)}`; }
  const now = pos(t);
  const vyNow = p.vy - g * t;
  const xticks = Array.from({ length: 6 }, (_, i) => Math.round((xMax * i) / 5));
  return (
    <SimShell
      subject="physics"
      title="Projectile motion"
      onReset={() => { setV0(init.speed); setDeg(init.angle); setH0(init.height); setG(init.g); setT(0); setRunning(false); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Projectile launched at ${v0} m/s and ${deg} degrees; range ${fmt(p.range, 1)} m`} className="block h-auto w-full">
          <line x1={40} x2={W - 10} y1={sy(0)} y2={sy(0)} stroke="var(--muted)" strokeWidth={2} />
          {xticks.map((x) => <text key={x} x={sx(x)} y={H - 12} fontSize="11" textAnchor="middle" fill="var(--muted)">{x} m</text>)}
          {h0 > 0 && <rect x={sx(0) - 18} y={sy(h0)} width={18} height={sy(0) - sy(h0)} fill="var(--sunken)" stroke="var(--line)" />}
          <path d={path} fill="none" stroke="var(--physics)" strokeWidth={2.5} strokeDasharray="6 5" />
          <circle cx={sx(p.vx * p.tPeak)} cy={sy(p.peak)} r={4} fill="var(--physics)" />
          <text x={sx(p.vx * p.tPeak)} y={sy(p.peak) - 8} textAnchor="middle" fontSize="11" fill="var(--ink)">peak {fmt(p.peak, 1)} m</text>
          <line x1={sx(0)} y1={sy(h0)} x2={sx(0) + 40 * Math.cos((deg * Math.PI) / 180)} y2={sy(h0) - 40 * Math.sin((deg * Math.PI) / 180)} stroke="var(--ink)" strokeWidth={4} strokeLinecap="round" />
          {/* velocity components at the current instant */}
          <line x1={sx(now.x)} y1={sy(now.y)} x2={sx(now.x) + p.vx * 2} y2={sy(now.y)} stroke="var(--primary)" strokeWidth={2.5} markerEnd="url(#arr)" />
          <line x1={sx(now.x)} y1={sy(now.y)} x2={sx(now.x)} y2={sy(now.y) - vyNow * 2} stroke="var(--chem)" strokeWidth={2.5} markerEnd="url(#arr)" />
          <circle cx={sx(now.x)} cy={sy(now.y)} r={8} fill="var(--physics)" stroke="var(--surface)" strokeWidth={2} />
          <defs><marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="var(--ink)" /></marker></defs>
          <text x={sx(p.range)} y={sy(0) - 8} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--ink)">{fmt(p.range, 1)} m</text>
        </svg>
      }
      controls={
        <>
          <Slider label="Launch speed" value={v0} min={1} max={40} step={0.5} unit="m/s" onChange={change(setV0)} />
          <Slider label="Launch angle" value={deg} min={0} max={90} step={1} unit="°" onChange={change(setDeg)} />
          <Slider label="Launch height" value={h0} min={0} max={30} step={0.5} unit="m" onChange={change(setH0)} />
          <Slider label="Gravity g" value={g} min={1} max={25} step={0.1} unit="m/s²" onChange={change(setG)} />
          <Button onClick={running ? () => setRunning(false) : launch}>
            {running ? <Pause aria-hidden className="size-4" /> : <Play aria-hidden className="size-4" />} {running ? "Pause" : t > 0 && t < p.T ? "Restart" : "Launch"}
          </Button>
          <p className="text-xs text-muted"><span className="font-semibold text-primary">Blue</span>: horizontal velocity (constant). <span className="font-semibold text-chem">Orange</span>: vertical velocity (changes by −g each second).</p>
        </>
      }
      readouts={[
        { label: "Range", value: `${fmt(p.range, 2)} m`, emphasis: true },
        { label: "Flight time", value: `${fmt(p.T, 2)} s` },
        { label: "Peak height", value: `${fmt(p.peak, 2)} m` },
        { label: <>v<sub>x</sub>, v<sub>y0</sub></>, value: `${fmt(p.vx, 1)}, ${fmt(p.vy, 1)} m/s` },
        { label: "Time", value: `${fmt(t, 2)} s` },
        { label: "Position", value: `(${fmt(now.x, 1)}, ${fmt(Math.max(0, now.y), 1)}) m` },
      ]}
      assumptions={[
        "No air resistance: horizontal velocity is constant and vertical acceleration is −g.",
        "The ground is flat; flight time solves h₀ + v₀ sin θ · t − ½gt² = 0 for the positive root.",
        "The projectile is treated as a point; spin and lift are ignored.",
        "Animation runs in real time (1 simulated second per second); with reduced motion enabled it jumps to the landing point.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Forces on an incline
// ---------------------------------------------------------------------------

export function incline(m: number, deg: number, mus: number, muk: number, g = 9.8) {
  const t = (deg * Math.PI) / 180;
  const along = m * g * Math.sin(t);
  const normal = m * g * Math.cos(t);
  const maxStatic = mus * normal;
  const slides = along > maxStatic + 1e-9;
  const friction = slides ? muk * normal : along;
  const a = slides ? (along - muk * normal) / m : 0;
  return { along, normal, friction, slides, a, weight: m * g, critical: (Math.atan(mus) * 180) / Math.PI };
}

export function ForcesIncline({ params }: SimProps) {
  const init = { mass: num(params, "mass", 5, 0.5, 50), angle: num(params, "angle", 30, 0, 60), mus: num(params, "mus", 0.4, 0, 1), muk: num(params, "muk", 0.3, 0, 1) };
  const [m, setM] = useState(init.mass);
  const [deg, setDeg] = useState(init.angle);
  const [mus, setMus] = useState(init.mus);
  const [muk, setMuk] = useState(Math.min(init.muk, init.mus));
  const r = incline(m, deg, mus, muk);
  const W = 480;
  const H = 320;
  const t = (deg * Math.PI) / 180;
  const base = { x: 40, y: 280 };
  const L = 380;
  const top = { x: base.x + L * Math.cos(t), y: base.y - L * Math.sin(t) };
  const mid = { x: base.x + 0.55 * L * Math.cos(t), y: base.y - 0.55 * L * Math.sin(t) };
  const nx = -Math.sin(t);
  const ny = -Math.cos(t);
  const c = { x: mid.x + nx * 22, y: mid.y + ny * 22 };
  const k = 70 / Math.max(r.weight, 1);
  const arrow = (dx: number, dy: number, color: string, label: string) => (
    <g>
      <line x1={c.x} y1={c.y} x2={c.x + dx} y2={c.y + dy} stroke={color} strokeWidth={3.5} markerEnd={`url(#arrow-${label})`} />
      <defs><marker id={`arrow-${label}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill={color} /></marker></defs>
      <text x={c.x + dx * 1.12} y={c.y + dy * 1.12 + 4} fontSize="12" fontWeight="700" fill={color} textAnchor="middle">{label}</text>
    </g>
  );
  return (
    <SimShell
      subject="physics"
      title="Forces on an incline"
      onReset={() => { setM(init.mass); setDeg(init.angle); setMus(init.mus); setMuk(init.muk); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Free-body diagram: ${r.slides ? "box slides" : "box at rest"}`} className="block h-auto w-full">
          <path d={`M${base.x},${base.y} L${top.x},${top.y} L${top.x},${base.y} Z`} fill="var(--sunken)" stroke="var(--muted)" strokeWidth={1.5} />
          <text x={base.x + 50} y={base.y - 8} fontSize="12" fill="var(--muted)">{deg}°</text>
          <g transform={`rotate(${-deg} ${mid.x} ${mid.y})`}>
            <rect x={mid.x - 26} y={mid.y - 44} width={52} height={44} rx={6} fill="var(--physics-soft)" stroke="var(--physics)" strokeWidth={2} />
          </g>
          {arrow(0, r.weight * k, "var(--ink)", "mg")}
          {arrow(nx * r.normal * k, ny * r.normal * k, "var(--primary)", "N")}
          {r.friction > 0.01 && arrow(Math.cos(t) * r.friction * k, -Math.sin(t) * r.friction * k, "var(--chem)", "f")}
        </svg>
      }
      controls={
        <>
          <Slider label="Angle" value={deg} min={0} max={60} step={1} unit="°" onChange={setDeg} />
          <Slider label="Mass" value={m} min={0.5} max={50} step={0.5} unit="kg" onChange={setM} />
          <Slider label={<>Static friction <Tex latex="\mu_s" /></>} value={mus} min={0} max={1} step={0.01} onChange={(v) => { setMus(v); setMuk((k2) => Math.min(k2, v)); }} />
          <Slider label={<>Kinetic friction <Tex latex="\mu_k" /></>} value={muk} min={0} max={mus} step={0.01} onChange={setMuk} />
        </>
      }
      readouts={[
        { label: "State", value: r.slides ? "Sliding down" : "At rest", emphasis: true },
        { label: "Acceleration", value: `${fmt(r.a, 2)} m/s²`, emphasis: true },
        { label: <>mg sin θ (down slope)</>, value: `${fmt(r.along, 1)} N` },
        { label: "Normal force", value: `${fmt(r.normal, 1)} N` },
        { label: "Friction", value: `${fmt(r.friction, 1)} N ${r.slides ? "(kinetic)" : "(static)"}` },
        { label: "Slips above", value: `${fmt(r.critical, 1)}°` },
      ]}
      assumptions={[
        "g = 9.8 m/s². The box starts at rest; it slides only if mg sin θ exceeds the maximum static friction μₛN.",
        "Once sliding, friction is kinetic: f = μₖN, with μₖ ≤ μₛ.",
        "Arrow lengths are proportional to force magnitudes. Air resistance and the ramp's own motion are ignored.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Mass on a spring (SHM)
// ---------------------------------------------------------------------------

export function SpringOscillator({ params }: SimProps) {
  const init = { mass: num(params, "mass", 0.5, 0.1, 5), k: num(params, "k", 20, 1, 200), amplitude: num(params, "amplitude", 0.3, 0.05, 0.5) };
  const [m, setM] = useState(init.mass);
  const [k, setK] = useState(init.k);
  const [A, setA] = useState(init.amplitude);
  const [damping, setDamping] = useState<"off" | "on">("off");
  const [state, setState] = useState({ x: init.amplitude, v: 0, t: 0 });
  const [running, setRunning] = useState(true);
  const reduce = usePrefersReducedMotion();
  const b = damping === "on" ? 0.15 * Math.sqrt(k * m) : 0;
  useAnimation(running && !reduce, (dt) =>
    setState((s) => {
      // Semi-implicit Euler with substeps: stable for this range of k/m.
      let { x, v } = s;
      const n = 20;
      const h = dt / n;
      for (let i = 0; i < n; i++) {
        v += ((-k * x - b * v) / m) * h;
        x += v * h;
      }
      return { x, v, t: s.t + dt };
    }),
  );
  const restart = (aa = A) => setState({ x: aa, v: 0, t: 0 });
  const T = 2 * Math.PI * Math.sqrt(m / k);
  const KE = 0.5 * m * state.v ** 2;
  const PE = 0.5 * k * state.x ** 2;
  const E0 = 0.5 * k * A * A;
  const W = 480;
  const H = 320;
  const px = scale(-0.5, 0.5, 120, 400);
  const mx = px(state.x);
  const coils = 14;
  let spring = `M40,140`;
  for (let i = 1; i <= coils; i++) spring += `L${40 + ((mx - 70) * i) / coils},${i % 2 ? 120 : 160}`;
  spring += `L${mx - 30},140`;
  const bar = (v: number, color: string, label: string, x: number) => {
    const h = E0 > 0 ? (v / E0) * 90 : 0;
    return (
      <g>
        <rect x={x} y={300 - h} width={40} height={h} rx={4} fill={color} />
        <text x={x + 20} y={316} textAnchor="middle" fontSize="11" fill="var(--muted)">{label}</text>
      </g>
    );
  };
  return (
    <SimShell
      subject="physics"
      title="Mass on a spring"
      onReset={() => { setM(init.mass); setK(init.k); setA(init.amplitude); setDamping("off"); restart(init.amplitude); setRunning(true); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Mass on a spring, period ${fmt(T, 2)} seconds`} className="block h-auto w-full">
          <rect x={20} y={90} width={20} height={100} fill="var(--muted)" />
          <line x1={20} x2={460} y1={190} y2={190} stroke="var(--muted)" />
          <line x1={px(0)} x2={px(0)} y1={80} y2={200} stroke="var(--physics)" strokeDasharray="4 4" />
          <text x={px(0)} y={74} textAnchor="middle" fontSize="11" fill="var(--muted)">equilibrium</text>
          <path d={spring} fill="none" stroke="var(--ink)" strokeWidth={2.5} strokeLinejoin="round" />
          <rect x={mx - 30} y={110} width={60} height={60} rx={8} fill="var(--physics)" />
          <text x={mx} y={145} textAnchor="middle" fontSize="13" fontWeight="700" fill="white">{fmt(m, 1)} kg</text>
          {bar(KE, "var(--chem)", "Kinetic", 150)}
          {bar(PE, "var(--physics)", "Elastic", 220)}
          {bar(KE + PE, "var(--primary)", "Total", 290)}
          <text x={150} y={205} fontSize="11" fill="var(--muted)">Energy (relative to starting energy)</text>
        </svg>
      }
      controls={
        <>
          <Slider label="Mass" value={m} min={0.1} max={5} step={0.1} unit="kg" onChange={(v) => { setM(v); restart(); }} />
          <Slider label="Spring constant k" value={k} min={1} max={200} step={1} unit="N/m" onChange={(v) => { setK(v); restart(); }} />
          <Slider label="Amplitude" value={A} min={0.05} max={0.5} step={0.01} unit="m" onChange={(v) => { setA(v); setState({ x: v, v: 0, t: 0 }); }} />
          <Segmented label="Damping" value={damping} options={[{ value: "off", label: "Off (ideal)" }, { value: "on", label: "On" }]} onChange={(v) => { setDamping(v); restart(); }} />
          {!reduce && <Button variant="secondary" onClick={() => setRunning((r) => !r)}>{running ? "Pause" : "Resume"}</Button>}
          {reduce && <p className="text-xs text-muted">Animation is off because your device asks for reduced motion. The readouts still show the computed values.</p>}
        </>
      }
      readouts={[
        { label: "Period T", value: `${fmt(T, 3)} s`, emphasis: true },
        { label: "Frequency", value: `${fmt(1 / T, 2)} Hz` },
        { label: "Max speed (ideal)", value: `${fmt(A * Math.sqrt(k / m), 2)} m/s` },
        { label: "Position", value: `${fmt(state.x, 3)} m` },
        { label: "Kinetic energy", value: `${fmt(KE, 3)} J` },
        { label: "Elastic energy", value: `${fmt(PE, 3)} J` },
      ]}
      assumptions={[
        "Ideal spring obeying Hooke's law; the spring's own mass is ignored.",
        "Motion is integrated numerically in small time steps; T = 2π√(m/k) is the exact ideal period.",
        "Damping, when on, adds a drag force proportional to velocity (−bv), so total energy decreases.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Series / parallel circuit
// ---------------------------------------------------------------------------

export function circuit(V: number, R1: number, R2: number, mode: "series" | "parallel") {
  if (mode === "series") {
    const R = R1 + R2;
    const I = V / R;
    return { R, I, I1: I, I2: I, V1: I * R1, V2: I * R2, P: V * I };
  }
  const R = (R1 * R2) / (R1 + R2);
  const I1 = V / R1;
  const I2 = V / R2;
  return { R, I: I1 + I2, I1, I2, V1: V, V2: V, P: V * (I1 + I2) };
}

export function CircuitBuilder({ params }: SimProps) {
  const init = { V: num(params, "V", 12, 1, 24), R1: num(params, "R1", 4, 1, 100), R2: num(params, "R2", 8, 1, 100) };
  const [V, setV] = useState(init.V);
  const [R1, setR1] = useState(init.R1);
  const [R2, setR2] = useState(init.R2);
  const [mode, setMode] = useState<"series" | "parallel">(params?.mode === "parallel" ? "parallel" : "series");
  const c = circuit(V, R1, R2, mode);
  const W = 480;
  const H = 300;
  const resistor = (x: number, y: number, vertical: boolean, label: string, I: number, Vd: number) => {
    const zig = vertical
      ? `M${x},${y - 40} L${x},${y - 28} ${[...Array(6)].map((_, i) => `L${x + (i % 2 ? -10 : 10)},${y - 24 + i * 9}`).join(" ")} L${x},${y + 30} L${x},${y + 40}`
      : `M${x - 40},${y} L${x - 28},${y} ${[...Array(6)].map((_, i) => `L${x - 24 + i * 9},${y + (i % 2 ? -10 : 10)}`).join(" ")} L${x + 30},${y} L${x + 40},${y}`;
    return (
      <g>
        <path d={zig} fill="none" stroke="var(--chem)" strokeWidth={3} strokeLinejoin="round" />
        <text x={vertical ? x + 18 : x} y={vertical ? y - 4 : y - 18} fontSize="12" fontWeight="700" fill="var(--ink)" textAnchor={vertical ? "start" : "middle"}>{label}</text>
        <text x={vertical ? x + 18 : x} y={vertical ? y + 12 : y + 28} fontSize="11" fill="var(--muted)" textAnchor={vertical ? "start" : "middle"}>{fmt(I, 2)} A · {fmt(Vd, 2)} V</text>
      </g>
    );
  };
  const flow = Math.min(4, c.I) / 4;
  return (
    <SimShell
      subject="physics"
      title="Series and parallel resistors"
      onReset={() => { setV(init.V); setR1(init.R1); setR2(init.R2); setMode("series"); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${mode} circuit: total current ${fmt(c.I, 2)} amps`} className="block h-auto w-full">
          <style>{`@keyframes flow{to{stroke-dashoffset:-24}} .wire{animation:flow ${1.6 - flow}s linear infinite}`}</style>
          <rect x={60} y={50} width={360} height={200} fill="none" stroke="var(--ink)" strokeWidth={2.5} />
          <rect x={60} y={50} width={360} height={200} fill="none" stroke="var(--primary)" strokeWidth={2.5} strokeDasharray="4 20" className="wire" />
          {/* battery on the left side */}
          <rect x={45} y={128} width={30} height={44} fill="var(--canvas)" />
          <line x1={40} x2={80} y1={135} y2={135} stroke="var(--ink)" strokeWidth={3} />
          <line x1={50} x2={70} y1={150} y2={150} stroke="var(--ink)" strokeWidth={3} />
          <text x={24} y={146} textAnchor="end" fontSize="13" fontWeight="700" fill="var(--ink)">{fmt(V, 1)} V</text>
          {mode === "series" ? (
            <>
              <rect x={150} y={40} width={100} height={20} fill="var(--canvas)" />
              <rect x={290} y={40} width={100} height={20} fill="var(--canvas)" />
              {resistor(200, 50, false, `R₁ = ${R1} Ω`, c.I1, c.V1)}
              {resistor(340, 50, false, `R₂ = ${R2} Ω`, c.I2, c.V2)}
            </>
          ) : (
            <>
              <line x1={240} x2={240} y1={50} y2={250} stroke="var(--ink)" strokeWidth={2.5} />
              <rect x={410} y={110} width={20} height={80} fill="var(--canvas)" />
              <rect x={230} y={110} width={20} height={80} fill="var(--canvas)" />
              {resistor(240, 150, true, `R₁ = ${R1} Ω`, c.I1, c.V1)}
              {resistor(420, 150, true, `R₂ = ${R2} Ω`, c.I2, c.V2)}
            </>
          )}
        </svg>
      }
      controls={
        <>
          <Segmented label="Arrangement" value={mode} options={[{ value: "series", label: "Series" }, { value: "parallel", label: "Parallel" }]} onChange={setMode} />
          <Slider label="Battery voltage" value={V} min={1} max={24} step={0.5} unit="V" onChange={setV} />
          <Slider label="R₁" value={R1} min={1} max={100} step={1} unit="Ω" onChange={setR1} />
          <Slider label="R₂" value={R2} min={1} max={100} step={1} unit="Ω" onChange={setR2} />
        </>
      }
      readouts={[
        { label: "Equivalent resistance", value: `${fmt(c.R, 2)} Ω`, emphasis: true },
        { label: "Total current", value: `${fmt(c.I, 3)} A`, emphasis: true },
        { label: "R₁: current, voltage", value: `${fmt(c.I1, 3)} A, ${fmt(c.V1, 2)} V` },
        { label: "R₂: current, voltage", value: `${fmt(c.I2, 3)} A, ${fmt(c.V2, 2)} V` },
        { label: "Power from battery", value: `${fmt(c.P, 2)} W` },
        { label: "Check", value: mode === "series" ? `${fmt(c.V1 + c.V2, 2)} V = ${fmt(V, 2)} V` : `${fmt(c.I1 + c.I2, 3)} A total` },
      ]}
      assumptions={["Ideal battery (no internal resistance) and ideal wires (no resistance).", "Resistors are ohmic: V = IR at constant temperature.", "Series: same current, voltages add. Parallel: same voltage, currents add. The moving dashes only indicate that current flows; their speed is not to scale."]}
    />
  );
}

