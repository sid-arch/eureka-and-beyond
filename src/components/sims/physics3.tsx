// Physics simulations, part 3: torque, buoyancy, radioactive decay, pendulum and rolling.
// Each computes its results from the stated equations.

import { useMemo, useState } from "react";
import { Button } from "../ui";
import { fmt, num, scale, Segmented, SimShell, Slider, type SimProps } from "./shell";

const W = 480;
const G = 9.8;

// ---------------------------------------------------------------------------
// Torque balance: two masses on a beam pivoted at its center
// ---------------------------------------------------------------------------

export function TorqueBalance({ params }: SimProps) {
  const [m1, setM1] = useState(num(params, "m1", 4, 0, 10));
  const [d1, setD1] = useState(num(params, "d1", 1.5, 0, 2));
  const [m2, setM2] = useState(num(params, "m2", 6, 0, 10));
  const [d2, setD2] = useState(num(params, "d2", 1, 0, 2));
  const tL = m1 * G * d1, tR = m2 * G * d2;
  const net = tR - tL; // positive: clockwise (right side goes down)
  const balanced = Math.abs(net) < 1e-9;
  const tilt = balanced ? 0 : Math.sign(net) * Math.min(12, 3 + Math.abs(net) / 4);
  const H = 240, cx = W / 2, cy = 120, px = 90; // 90 px per meter
  const box = (m: number, d: number, side: -1 | 1, color: string, key: string) => {
    if (m === 0) return null;
    const s = 18 + m * 2.6;
    return (
      <g key={key}>
        <rect x={cx + side * d * px - s / 2} y={cy - 6 - s} width={s} height={s} rx={3} fill={color} />
        <text x={cx + side * d * px} y={cy - 6 - s / 2 + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">{fmt(m)}</text>
      </g>
    );
  };
  return (
    <SimShell
      subject="physics"
      title="Torque and balance"
      onReset={() => { setM1(4); setD1(1.5); setM2(6); setD2(1); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Seesaw: ${fmt(m1)} kg at ${fmt(d1)} m left of the pivot, ${fmt(m2)} kg at ${fmt(d2)} m right. Net torque ${fmt(Math.abs(net), 1)} N·m; ${balanced ? "balanced" : net > 0 ? "the right side goes down" : "the left side goes down"}.`} className="block h-auto w-full select-none">
          <g transform={`rotate(${tilt} ${cx} ${cy})`}>
            <rect x={cx - 2 * px - 6} y={cy - 6} width={4 * px + 12} height={10} rx={3} fill="var(--muted)" />
            {[-2, -1, 1, 2].map((t) => (
              <text key={t} x={cx + t * px} y={cy + 22} textAnchor="middle" fontSize="11" fill="var(--muted)">{Math.abs(t)} m</text>
            ))}
            {box(m1, d1, -1, "var(--math)", "L")}
            {box(m2, d2, 1, "var(--chem)", "R")}
          </g>
          <path d={`M${cx},${cy + 4} L${cx - 22},${cy + 60} L${cx + 22},${cy + 60} Z`} fill="var(--physics)" />
          <line x1={40} y1={cy + 60} x2={W - 40} y2={cy + 60} stroke="var(--line)" strokeWidth={2} />
        </svg>
      }
      controls={
        <>
          <div className="grid grid-cols-2 gap-3">
            <Slider label="Left mass" value={m1} min={0} max={10} step={0.5} unit="kg" onChange={setM1} />
            <Slider label="Left distance" value={d1} min={0} max={2} step={0.1} unit="m" onChange={setD1} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Slider label="Right mass" value={m2} min={0} max={10} step={0.5} unit="kg" onChange={setM2} />
            <Slider label="Right distance" value={d2} min={0} max={2} step={0.1} unit="m" onChange={setD2} />
          </div>
        </>
      }
      readouts={[
        { label: "Left torque (counterclockwise)", value: `${fmt(tL, 1)} N·m` },
        { label: "Right torque (clockwise)", value: `${fmt(tR, 1)} N·m` },
        { label: "Result", value: balanced ? "balanced" : net > 0 ? `tips right, net ${fmt(net, 1)} N·m` : `tips left, net ${fmt(-net, 1)} N·m`, emphasis: true },
      ]}
      assumptions={[
        "Torque τ = r F sin θ with the weight mg acting straight down; g = 9.8 m/s².",
        "The beam is uniform and pivoted at its center, so its own weight adds no torque.",
        "The tilt angle drawn only shows which way the beam turns, not how far it would swing.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Buoyancy: a block in a fluid
// ---------------------------------------------------------------------------

const FLUIDS = { water: 1000, seawater: 1025, oil: 920, glycerin: 1260 } as const;
type Fluid = keyof typeof FLUIDS;

export function Buoyancy({ params }: SimProps) {
  const [rho, setRho] = useState(num(params, "density", 600, 100, 3000));
  const [vol, setVol] = useState(num(params, "volume", 2, 0.5, 5));
  const initFluid = (typeof params?.fluid === "string" && params.fluid in FLUIDS ? params.fluid : "water") as Fluid;
  const [fluid, setFluid] = useState<Fluid>(initFluid);
  const rf = FLUIDS[fluid];
  const V = vol / 1000; // liters to m³
  const weight = rho * V * G;
  const floats = rho < rf;
  const frac = floats ? rho / rf : 1;
  const Fb = rf * V * G * frac;
  const apparent = weight - Fb;
  const H = 280, surface = 90, bottom = 260;
  const side = 50 + 16 * Math.cbrt(vol);
  const bx = W / 2 - side / 2;
  const by = floats ? surface - side * (1 - frac) : bottom - side;
  return (
    <SimShell
      subject="physics"
      title="Buoyancy"
      onReset={() => { setRho(600); setVol(2); setFluid("water"); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`A ${fmt(vol)} liter block of density ${fmt(rho)} kg/m³ in ${fluid} (${rf} kg/m³). It ${floats ? `floats with ${fmt(frac * 100, 0)}% submerged` : "sinks"}.`} className="block h-auto w-full select-none">
          <rect x={60} y={surface} width={W - 120} height={bottom - surface} fill="var(--physics)" opacity={0.18} />
          <line x1={60} y1={surface} x2={W - 60} y2={surface} stroke="var(--physics)" strokeWidth={2} />
          <path d={`M60,40 V${bottom} H${W - 60} V40`} fill="none" stroke="var(--muted)" strokeWidth={3} />
          <rect x={bx} y={by} width={side} height={side} rx={3} fill="var(--chem)" opacity={0.9} />
          {(() => {
            const len = (F: number) => 16 + Math.min(70, F * 2.2);
            const cyb = by + side / 2, xr = W / 2 + side / 2 + 22, xl = W / 2 - side / 2 - 22;
            const lw = len(weight), lb = len(Fb);
            return (
              <>
                <line x1={xr} y1={cyb} x2={xr} y2={cyb + lw} stroke="var(--danger)" strokeWidth={3} />
                <path d={`M${xr - 6},${cyb + lw - 8} L${xr},${cyb + lw} L${xr + 6},${cyb + lw - 8}`} fill="none" stroke="var(--danger)" strokeWidth={3} />
                <text x={xr + 8} y={cyb + lw} fontSize="13" fill="var(--danger)">W</text>
                {Fb > 0 && <line x1={xl} y1={cyb} x2={xl} y2={cyb - lb} stroke="var(--success)" strokeWidth={3} />}
                {Fb > 0 && <path d={`M${xl - 6},${cyb - lb + 8} L${xl},${cyb - lb} L${xl + 6},${cyb - lb + 8}`} fill="none" stroke="var(--success)" strokeWidth={3} />}
                <text x={xl - 8} y={cyb - lb + 10} textAnchor="end" fontSize="13" fill="var(--success)">F_b</text>
              </>
            );
          })()}
        </svg>
      }
      controls={
        <>
          <Segmented label="Fluid" value={fluid} options={[{ value: "water", label: "Water" }, { value: "seawater", label: "Seawater" }, { value: "oil", label: "Oil" }, { value: "glycerin", label: "Glycerin" }]} onChange={setFluid} />
          <Slider label="Block density" value={rho} min={100} max={3000} step={50} unit="kg/m³" onChange={setRho} />
          <Slider label="Block volume" value={vol} min={0.5} max={5} step={0.5} unit="L" onChange={setVol} />
        </>
      }
      readouts={[
        { label: "Weight", value: `${fmt(weight, 2)} N` },
        { label: "Buoyant force", value: `${fmt(Fb, 2)} N`, emphasis: true },
        { label: floats ? "Fraction submerged" : "Apparent weight", value: floats ? `${fmt(frac * 100, 1)}%` : `${fmt(apparent, 2)} N` },
      ]}
      assumptions={[
        "Archimedes' principle: F_b = ρ_fluid V_submerged g, with g = 9.8 m/s².",
        "A floating block sinks until F_b equals its weight, so the fraction submerged is ρ_block/ρ_fluid.",
        "A block denser than the fluid rests on the bottom; its apparent weight is weight − F_b.",
        "Arrows: W is the weight, F_b the buoyant force; their lengths grow with force but are capped to fit.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Radioactive decay: a sample of 400 nuclei
// ---------------------------------------------------------------------------

const N0 = 400;
function lifetimes(seed: number, halfLife: number) {
  let s = seed >>> 0 || 1;
  const rand = () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return (s + 0.5) / 4294967296; };
  return Array.from({ length: N0 }, () => (-halfLife / Math.LN2) * Math.log(rand()));
}

export function HalfLife({ params }: SimProps) {
  const [T, setT] = useState(num(params, "halfLife", 5, 1, 20));
  const [t, setTime] = useState(num(params, "time", 0, 0, 60));
  const [seed, setSeed] = useState(7);
  const life = useMemo(() => lifetimes(seed, T), [seed, T]);
  const left = life.filter((L) => L > t).length;
  const expected = N0 * Math.pow(0.5, t / T);
  const H = 250, gx0 = 250;
  const sx = scale(0, 60, gx0 + 30, W - 10), sy = scale(0, N0, 210, 20);
  const curve = Array.from({ length: 121 }, (_, i) => `${i ? "L" : "M"}${sx(i / 2).toFixed(1)},${sy(N0 * Math.pow(0.5, i / 2 / T)).toFixed(1)}`).join("");
  return (
    <SimShell
      subject="physics"
      title="Radioactive decay and half-life"
      onReset={() => { setT(5); setTime(0); setSeed(7); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Half-life ${fmt(T)} years, time ${fmt(t)} years: ${left} of ${N0} nuclei remain; the exponential model predicts ${fmt(expected, 0)}.`} className="block h-auto w-full select-none">
          {life.map((L, i) => (
            <circle key={i} cx={14 + (i % 20) * 11.5} cy={18 + Math.floor(i / 20) * 11.5} r={4.3} fill={L > t ? "var(--chem)" : "var(--line)"} />
          ))}
          <line x1={sx(0)} y1={sy(0)} x2={sx(60)} y2={sy(0)} stroke="var(--muted)" />
          <line x1={sx(0)} y1={sy(0)} x2={sx(0)} y2={sy(N0)} stroke="var(--muted)" />
          {[0, 20, 40, 60].map((v) => <text key={v} x={sx(v)} y={sy(0) + 16} textAnchor="middle" fontSize="10" fill="var(--muted)">{v}</text>)}
          <text x={sx(0) - 4} y={sy(N0) + 4} textAnchor="end" fontSize="10" fill="var(--muted)">400</text>
          <text x={sx(30)} y={sy(0) + 32} textAnchor="middle" fontSize="11" fill="var(--muted)">time (years)</text>
          <path d={curve} fill="none" stroke="var(--physics)" strokeWidth={2} />
          <circle cx={sx(t)} cy={sy(left)} r={5} fill="var(--chem)" />
        </svg>
      }
      controls={
        <>
          <Slider label="Half-life" value={T} min={1} max={20} step={1} unit="yr" onChange={setT} />
          <Slider label="Time elapsed" value={t} min={0} max={60} step={0.5} unit="yr" onChange={setTime} />
          <Button variant="secondary" size="sm" onClick={() => setSeed((s) => (s * 48271) % 2147483647)}>New random sample</Button>
        </>
      }
      readouts={[
        { label: "Nuclei left in this sample", value: `${left} of ${N0}`, emphasis: true },
        { label: "Model N₀(½)^(t/T)", value: fmt(expected, 1) },
        { label: "Half-lives elapsed", value: fmt(t / T, 2) },
      ]}
      assumptions={[
        "Each nucleus decays at random with a constant probability per unit time; its lifetime is drawn from an exponential distribution with mean T/ln 2.",
        "The curve is the expected count N = N₀(½)^(t/T). A real sample scatters around it, more so when few nuclei remain.",
        "Decay products are shown as grey dots; they are not tracked further.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Pendulum: period, amplitude and gravity
// ---------------------------------------------------------------------------

const GRAVITY = { earth: 9.8, moon: 1.62, mars: 3.71 } as const;
type Planet = keyof typeof GRAVITY;

export function Pendulum({ params }: SimProps) {
  const [L, setL] = useState(num(params, "length", 1, 0.25, 2));
  const [amp, setAmp] = useState(num(params, "amplitude", 10, 5, 60));
  const [t, setTime] = useState(num(params, "time", 0, 0, 10));
  const initPlanet = (typeof params?.planet === "string" && params.planet in GRAVITY ? params.planet : "earth") as Planet;
  const [planet, setPlanet] = useState<Planet>(initPlanet);
  const g = GRAVITY[planet];
  const th0 = (amp * Math.PI) / 180;
  const T0 = 2 * Math.PI * Math.sqrt(L / g);
  const T = T0 * (1 + th0 ** 2 / 16 + (11 * th0 ** 4) / 3072);
  const theta = (tt: number) => amp * Math.cos((2 * Math.PI * tt) / T);
  const vmax = Math.sqrt(2 * g * L * (1 - Math.cos(th0)));
  const H = 260, px = 110, py = 24, len = 100 * L;
  const a = (theta(t) * Math.PI) / 180;
  const bx = px + len * Math.sin(a), by = py + len * Math.cos(a);
  const sx = scale(0, 10, 240, W - 12), sy = scale(-60, 60, 230, 30);
  const curve = Array.from({ length: 401 }, (_, i) => `${i ? "L" : "M"}${sx(i / 40).toFixed(1)},${sy(theta(i / 40)).toFixed(1)}`).join("");
  return (
    <SimShell
      subject="physics"
      title="Simple pendulum"
      onReset={() => { setL(1); setAmp(10); setTime(0); setPlanet("earth"); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`A ${fmt(L)} m pendulum on ${planet} with a ${fmt(amp)}° amplitude; period ${fmt(T, 3)} s. At t = ${fmt(t)} s the angle is ${fmt(theta(t), 1)}°.`} className="block h-auto w-full select-none">
          <line x1={px - 50} y1={py} x2={px + 50} y2={py} stroke="var(--muted)" strokeWidth={3} />
          <line x1={px} y1={py} x2={px} y2={py + len + 14} stroke="var(--line)" strokeDasharray="4 4" />
          <line x1={px} y1={py} x2={bx} y2={by} stroke="var(--ink)" strokeWidth={2} />
          <circle cx={bx} cy={by} r={11} fill="var(--physics)" />
          <line x1={sx(0)} y1={sy(0)} x2={sx(10)} y2={sy(0)} stroke="var(--muted)" />
          <line x1={sx(0)} y1={sy(-60)} x2={sx(0)} y2={sy(60)} stroke="var(--muted)" />
          {[0, 5, 10].map((v) => <text key={v} x={sx(v)} y={sy(-60) + 16} textAnchor="middle" fontSize="10" fill="var(--muted)">{v} s</text>)}
          <text x={sx(0) - 4} y={sy(60) + 4} textAnchor="end" fontSize="10" fill="var(--muted)">60°</text>
          <text x={sx(0) - 4} y={sy(-60) + 4} textAnchor="end" fontSize="10" fill="var(--muted)">−60°</text>
          <path d={curve} fill="none" stroke="var(--physics)" strokeWidth={2} />
          <circle cx={sx(t)} cy={sy(theta(t))} r={5} fill="var(--chem)" />
        </svg>
      }
      controls={
        <>
          <Segmented label="Gravity" value={planet} options={[{ value: "earth", label: "Earth" }, { value: "moon", label: "Moon" }, { value: "mars", label: "Mars" }]} onChange={setPlanet} />
          <Slider label="Length" value={L} min={0.25} max={2} step={0.05} unit="m" onChange={setL} />
          <Slider label="Amplitude" value={amp} min={5} max={60} step={5} unit="°" onChange={setAmp} />
          <Slider label="Time" value={t} min={0} max={10} step={0.05} unit="s" onChange={setTime} />
        </>
      }
      readouts={[
        { label: "Period (small-angle)", value: `${fmt(T0, 3)} s`, emphasis: true },
        { label: "Period at this amplitude", value: `${fmt(T, 3)} s` },
        { label: "Speed at the bottom", value: `${fmt(vmax, 2)} m/s` },
      ]}
      assumptions={[
        "Point mass on a massless string, no air resistance.",
        "Small-angle period T = 2π√(L/g), independent of mass and amplitude.",
        "The motion drawn uses the period corrected for amplitude, T ≈ T₀(1 + θ₀²/16 + 11θ₀⁴/3072), with a cosine shape; at large amplitudes the true shape differs slightly.",
        "Speed at the bottom from energy conservation: v = √(2gL(1 − cos θ₀)).",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Rolling race: sphere, disk, hoop and a frictionless sliding block
// ---------------------------------------------------------------------------

const RACERS = [
  { name: "Sliding block (no friction)", beta: 0, color: "var(--muted)" },
  { name: "Solid sphere", beta: 0.4, color: "var(--physics)" },
  { name: "Solid disk", beta: 0.5, color: "var(--chem)" },
  { name: "Hoop", beta: 1, color: "var(--math)" },
];

export function RollingRace({ params }: SimProps) {
  const [h, setH] = useState(num(params, "height", 1, 0.25, 5));
  const [ang, setAng] = useState(num(params, "angle", 20, 5, 45));
  const [t, setTime] = useState(0);
  const s = Math.sin((ang * Math.PI) / 180);
  const d = h / s;
  const racers = RACERS.map((r) => {
    const a = (G * s) / (1 + r.beta);
    const tb = Math.sqrt((2 * d) / a);
    return { ...r, a, tb, v: Math.sqrt((2 * G * h) / (1 + r.beta)), pos: Math.min(d, 0.5 * a * t * t) };
  });
  const tMax = racers[3].tb;
  const H = 200, x0 = 20, x1 = W - 20;
  const sx = scale(0, d, x0, x1);
  return (
    <SimShell
      subject="physics"
      title="Rolling race down a ramp"
      onReset={() => { setH(1); setAng(20); setTime(0); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Ramp ${fmt(h)} m high at ${fmt(ang)}°. Finish times: ${racers.map((r) => `${r.name} ${fmt(r.tb, 2)} s`).join(", ")}.`} className="block h-auto w-full select-none">
          {racers.map((r, i) => {
            const y = 30 + i * 44;
            return (
              <g key={r.name}>
                <line x1={x0} y1={y} x2={x1} y2={y} stroke="var(--line)" strokeWidth={2} />
                <line x1={x1} y1={y - 14} x2={x1} y2={y + 6} stroke="var(--ink)" strokeWidth={2} />
                <text x={x0} y={y + 20} fontSize="11" fill="var(--muted)">{r.name}</text>
                {r.beta === 0 ? <rect x={sx(r.pos) - 9} y={y - 18} width={18} height={18} fill={r.color} /> : <circle cx={sx(r.pos)} cy={y - 9} r={9} fill={r.beta === 1 ? "none" : r.color} stroke={r.color} strokeWidth={r.beta === 1 ? 4 : 0} />}
              </g>
            );
          })}
        </svg>
      }
      controls={
        <>
          <Slider label="Ramp height" value={h} min={0.25} max={5} step={0.25} unit="m" onChange={(v) => { setH(v); setTime(0); }} />
          <Slider label="Ramp angle" value={ang} min={5} max={45} step={1} unit="°" onChange={(v) => { setAng(v); setTime(0); }} />
          <Slider label="Time" value={Math.min(t, tMax)} min={0} max={Math.ceil(tMax * 20) / 20} step={0.01} unit="s" onChange={setTime} />
        </>
      }
      readouts={racers.map((r) => ({ label: r.name, value: `${fmt(r.tb, 2)} s, ${fmt(r.v, 2)} m/s at the bottom`, emphasis: r.beta === 0.4 }))}
      assumptions={[
        "Lanes are drawn straight; each shows distance traveled along the ramp.",
        "Objects roll without slipping, so v = Rω and KE = ½mv²(1 + β) with β = I/(mR²): sphere 2/5, disk 1/2, hoop 1.",
        "Acceleration down the ramp a = g sin θ/(1 + β); final speed v = √(2gh/(1 + β)), independent of mass and radius.",
        "The block slides without friction (β = 0) for comparison. No air resistance or rolling resistance.",
      ]}
    />
  );
}
